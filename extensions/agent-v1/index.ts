import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import { Type } from "typebox";
import { getGmailMetadataReadonly, searchGmailReadonly } from "./gmail-readonly.js";

const connectorUnavailable = {
  status: "error",
  reason: "connector_unavailable",
  readOnly: true,
} as const;

export default defineToolPlugin({
  id: "agent-v1",
  name: "Agent V1",
  description: "Downstream capability layer for local-first Agent V1 domains.",
  tools: (tool) => [
    tool({
      name: "agent_v1_gmail_search",
      label: "Gmail Search (Read-only)",
      description:
        "Search the authorized Gmail mailbox in read-only mode. Returns only message/thread IDs and a result estimate; never returns email body, snippet, subject, or sender address.",
      parameters: Type.Object(
        {
          query: Type.String({ minLength: 1, maxLength: 500 }),
          maxResults: Type.Optional(Type.Integer({ minimum: 1, maximum: 20 })),
        },
        { additionalProperties: false },
      ),
      optional: true,
      workspaceAccess: false,
      async execute({ query, maxResults }) {
        try {
          const result = await searchGmailReadonly(query, maxResults);
          return {
            status: "ok",
            ...result,
            privacy: "metadata_only",
            readOnly: true,
          };
        } catch {
          return {
            ...connectorUnavailable,
            privacy: "metadata_only",
          };
        }
      },
    }),
    tool({
      name: "agent_v1_gmail_get_metadata",
      label: "Gmail Metadata (Read-only)",
      description:
        "Read minimized metadata for one authorized Gmail message. Returns IDs, internal timestamp, safe system labels, size estimate, and sender domain only. It never returns body, snippet, subject, sender address, recipient address, or attachments.",
      parameters: Type.Object(
        {
          messageId: Type.String({ minLength: 8, maxLength: 64 }),
        },
        { additionalProperties: false },
      ),
      optional: true,
      workspaceAccess: false,
      async execute({ messageId }) {
        try {
          const result = await getGmailMetadataReadonly(messageId);
          return {
            status: "ok",
            ...result,
            privacy: "minimized_metadata",
            readOnly: true,
          };
        } catch {
          return {
            ...connectorUnavailable,
            privacy: "minimized_metadata",
          };
        }
      },
    }),
  ],
});
