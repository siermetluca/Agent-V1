import { describe, expect, it } from "vitest";
import {
  minimizeGmailMessage,
  normalizeGmailQuery,
  normalizeMaxResults,
  normalizeMessageId,
} from "./gmail-readonly.js";

describe("Agent V1 Gmail read-only privacy boundary", () => {
  it("bounds search input", () => {
    expect(normalizeGmailQuery("  is:unread ")).toBe("is:unread");
    expect(normalizeMaxResults(undefined)).toBe(10);
    expect(normalizeMaxResults(20)).toBe(20);
    expect(() => normalizeMaxResults(21)).toThrow("max_results_out_of_range");
    expect(() => normalizeGmailQuery(" ")).toThrow("query_required");
  });

  it("accepts bounded Gmail message IDs", () => {
    expect(normalizeMessageId("1a141058b4fde858")).toBe("1a141058b4fde858");
    expect(() => normalizeMessageId("x; rm -rf /")).toThrow("invalid_message_id");
  });

  it("drops content-bearing fields and full sender identity", () => {
    const raw = {
      id: "1a141058b4fde858",
      threadId: "1a141058b4fde858",
      internalDate: "1792100000000",
      labelIds: ["INBOX", "UNREAD", "Label_123"],
      sizeEstimate: 2048,
      snippet: "PRIVATE BODY PREVIEW",
      payload: {
        headers: [
          { name: "From", value: "Private Person <secret.person@example.com>" },
          { name: "Subject", value: "CONFIDENTIAL SUBJECT" },
        ],
        body: { data: "PRIVATE_BODY_DATA" },
      },
    };

    const minimized = minimizeGmailMessage(raw);
    expect(minimized).toEqual({
      id: "1a141058b4fde858",
      threadId: "1a141058b4fde858",
      internalDate: "1792100000000",
      systemLabels: ["INBOX", "UNREAD"],
      sizeEstimate: 2048,
      senderDomain: "example.com",
    });
    expect(JSON.stringify(minimized)).not.toContain("PRIVATE");
    expect(JSON.stringify(minimized)).not.toContain("secret.person");
    expect(JSON.stringify(minimized)).not.toContain("CONFIDENTIAL");
  });
});
