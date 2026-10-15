import { runExec } from "openclaw/plugin-sdk/process-runtime";

const GWS_BINARY = "/opt/homebrew/bin/gws";
const GWS_TIMEOUT_MS = 15_000;
const GWS_MAX_BUFFER_BYTES = 1_000_000;
const MAX_QUERY_CHARS = 500;
const MAX_RESULTS = 20;
const MESSAGE_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

const SAFE_SYSTEM_LABELS = new Set([
  "INBOX",
  "UNREAD",
  "STARRED",
  "IMPORTANT",
  "SENT",
  "DRAFT",
  "SPAM",
  "TRASH",
  "CATEGORY_PERSONAL",
  "CATEGORY_SOCIAL",
  "CATEGORY_PROMOTIONS",
  "CATEGORY_UPDATES",
  "CATEGORY_FORUMS",
]);

export type GmailSearchResult = {
  messages: Array<{ id: string; threadId: string }>;
  resultSizeEstimate: number;
};

export type GmailMetadataResult = {
  id: string;
  threadId: string;
  internalDate: string | null;
  systemLabels: string[];
  sizeEstimate: number | null;
  senderDomain: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseJsonObject(stdout: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(stdout);
  if (!isRecord(parsed)) {
    throw new Error("invalid_json_shape");
  }
  return parsed;
}

async function runGws(args: string[]): Promise<Record<string, unknown>> {
  const { stdout } = await runExec(GWS_BINARY, args, {
    timeoutMs: GWS_TIMEOUT_MS,
    maxBuffer: GWS_MAX_BUFFER_BYTES,
  });
  return parseJsonObject(stdout);
}

export function normalizeGmailQuery(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("query_required");
  }
  const query = value.trim();
  if (!query) {
    throw new Error("query_required");
  }
  if (query.length > MAX_QUERY_CHARS) {
    throw new Error("query_too_long");
  }
  return query;
}

export function normalizeMaxResults(value: unknown): number {
  if (value === undefined) {
    return 10;
  }
  if (!Number.isInteger(value) || typeof value !== "number" || value < 1 || value > MAX_RESULTS) {
    throw new Error("max_results_out_of_range");
  }
  return value;
}

export function normalizeMessageId(value: unknown): string {
  if (typeof value !== "string" || !MESSAGE_ID_PATTERN.test(value)) {
    throw new Error("invalid_message_id");
  }
  return value;
}

function toSafeString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toSafeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function extractSenderDomain(headers: unknown): string | null {
  if (!Array.isArray(headers)) {
    return null;
  }
  const from = headers.find(
    (header) =>
      isRecord(header) && typeof header.name === "string" && header.name.toLowerCase() === "from",
  );
  if (!isRecord(from) || typeof from.value !== "string") {
    return null;
  }
  const match = from.value.match(/@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/);
  return match?.[1]?.toLowerCase() ?? null;
}

export function minimizeGmailMessage(raw: unknown): GmailMetadataResult {
  if (!isRecord(raw)) {
    throw new Error("invalid_gmail_message");
  }
  const id = toSafeString(raw.id);
  const threadId = toSafeString(raw.threadId);
  if (!id || !threadId) {
    throw new Error("gmail_message_missing_identity");
  }

  const labelIds = Array.isArray(raw.labelIds)
    ? raw.labelIds.filter(
        (label): label is string => typeof label === "string" && SAFE_SYSTEM_LABELS.has(label),
      )
    : [];

  return {
    id,
    threadId,
    internalDate: toSafeString(raw.internalDate),
    systemLabels: labelIds,
    sizeEstimate: toSafeNumber(raw.sizeEstimate),
    senderDomain: extractSenderDomain(isRecord(raw.payload) ? raw.payload.headers : undefined),
  };
}

export async function searchGmailReadonly(
  queryValue: unknown,
  maxResultsValue: unknown,
): Promise<GmailSearchResult> {
  const query = normalizeGmailQuery(queryValue);
  const maxResults = normalizeMaxResults(maxResultsValue);
  const params = JSON.stringify({ userId: "me", q: query, maxResults });
  const raw = await runGws(["gmail", "users", "messages", "list", "--params", params]);

  const messages = Array.isArray(raw.messages)
    ? raw.messages.flatMap((message) => {
        if (!isRecord(message)) {
          return [];
        }
        const id = toSafeString(message.id);
        const threadId = toSafeString(message.threadId);
        return id && threadId ? [{ id, threadId }] : [];
      })
    : [];

  return {
    messages,
    resultSizeEstimate: toSafeNumber(raw.resultSizeEstimate) ?? messages.length,
  };
}

export async function getGmailMetadataReadonly(
  messageIdValue: unknown,
): Promise<GmailMetadataResult> {
  const messageId = normalizeMessageId(messageIdValue);
  const params = JSON.stringify({
    userId: "me",
    id: messageId,
    format: "metadata",
    metadataHeaders: ["From"],
  });
  const raw = await runGws(["gmail", "users", "messages", "get", "--params", params]);
  return minimizeGmailMessage(raw);
}
