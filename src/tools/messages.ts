import { z } from "zod";
import { zernioRequest } from "../client.js";

export const messageTools = [
  {
    name: "zernio_list_conversations",
    description: "List all DM conversations across connected social media accounts. Returns sender info, last message preview, and conversation IDs.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by specific account ID"),
      platform: z.string().optional().describe("Filter by platform: facebook, instagram, twitter, etc."),
      limit: z.number().optional().describe("Max conversations to return (default 20)"),
    }),
    handler: async (args: { accountId?: string; platform?: string; limit?: number }) => {
      return zernioRequest("GET", "/v1/inbox/conversations", undefined, {
        accountId: args.accountId,
        platform: args.platform,
        limit: args.limit,
      });
    },
  },
  {
    name: "zernio_get_conversation",
    description: "Get details and metadata for a specific conversation.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/inbox/conversations/${args.conversationId}`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_list_messages",
    description: "Read the messages in a specific conversation thread.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
      limit: z.number().optional().describe("Max messages to return (default 50)"),
    }),
    handler: async (args: { conversationId: string; accountId: string; limit?: number }) => {
      return zernioRequest("GET", `/v1/inbox/conversations/${args.conversationId}/messages`, undefined, {
        accountId: args.accountId,
        limit: args.limit,
      });
    },
  },
  {
    name: "zernio_send_message",
    description: "Send a DM or reply in a conversation on a social media platform.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID to reply to"),
      accountId: z.string().describe("The Zernio account ID to send from"),
      message: z.string().describe("The message text to send"),
      messagingType: z
        .enum(["RESPONSE", "UPDATE", "MESSAGE_TAG"])
        .optional()
        .describe("Facebook messaging type. Required when using messageTag (set it to MESSAGE_TAG)."),
      messageTag: z
        .enum(["CONFIRMED_EVENT_UPDATE", "POST_PURCHASE_UPDATE", "ACCOUNT_UPDATE", "HUMAN_AGENT"])
        .optional()
        .describe(
          "Facebook and Instagram message tag. To reply after the 24h window, send HUMAN_AGENT with messagingType MESSAGE_TAG: it works up to 7 days after the person's last message, for replies typed by a person only. Meta retired the other tags, so they fail."
        ),
    }),
    handler: async (args: {
      conversationId: string;
      accountId: string;
      message: string;
      messagingType?: "RESPONSE" | "UPDATE" | "MESSAGE_TAG";
      messageTag?: "CONFIRMED_EVENT_UPDATE" | "POST_PURCHASE_UPDATE" | "ACCOUNT_UPDATE" | "HUMAN_AGENT";
    }) => {
      return zernioRequest("POST", `/v1/inbox/conversations/${args.conversationId}/messages`, {
        accountId: args.accountId,
        message: args.message,
        ...(args.messagingType !== undefined && { messagingType: args.messagingType }),
        ...(args.messageTag !== undefined && { messageTag: args.messageTag }),
      });
    },
  },
  {
    name: "zernio_create_conversation",
    description: "Start a new DM conversation by sending a first message to a contact on a connected social account.",
    inputSchema: z.object({
      accountId: z.string().describe("The social account ID to send from"),
      participantId: z
        .string()
        .optional()
        .describe(
          "Recipient identifier: X numeric user ID, WhatsApp/SMS phone number in international format, Slack member ID, or iMessage phone/email. Provide exactly one of participantId or participantUsername"
        ),
      participantUsername: z
        .string()
        .optional()
        .describe(
          "Recipient handle: X or Bluesky handle (with or without @) or Reddit username (with or without u/). Provide exactly one of participantId or participantUsername"
        ),
      message: z.string().describe("The opening message to send"),
    }),
    handler: async (args: { accountId: string; participantId?: string; participantUsername?: string; message: string }) => {
      // The API takes exactly one recipient field. Checked here because the server registers the
      // schema's shape only, which drops object-level refinements.
      if ((args.participantId === undefined) === (args.participantUsername === undefined)) {
        throw new Error("Provide exactly one of participantId or participantUsername");
      }
      return zernioRequest("POST", "/v1/inbox/conversations", {
        accountId: args.accountId,
        ...(args.participantId !== undefined && { participantId: args.participantId }),
        ...(args.participantUsername !== undefined && { participantUsername: args.participantUsername }),
        message: args.message,
      });
    },
  },
  {
    name: "zernio_send_typing_indicator",
    description: "Send a typing indicator in a conversation to show the user that you are composing a reply.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/inbox/conversations/${args.conversationId}/typing`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_react_to_message",
    description: "Add or remove a reaction (emoji) to a message in a conversation.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      messageId: z.string().describe("The message ID to react to"),
      emoji: z.string().describe("The emoji reaction to add"),
      action: z.enum(["add", "remove"]).describe("Whether to add or remove the reaction"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; messageId: string; emoji: string; action: string; accountId: string }) => {
      const path = `/v1/inbox/conversations/${args.conversationId}/messages/${args.messageId}/reactions`;
      // The API takes accountId in the body on POST and as a query parameter on DELETE.
      if (args.action === "remove") {
        return zernioRequest("DELETE", path, undefined, { accountId: args.accountId });
      }
      return zernioRequest("POST", path, { accountId: args.accountId, emoji: args.emoji });
    },
  },
  {
    name: "zernio_update_conversation_status",
    description: "Archive a conversation or set it back to active.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      status: z.enum(["active", "archived"]).describe("New status: archived, or active to unarchive"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; status: string; accountId: string }) => {
      return zernioRequest("PUT", `/v1/inbox/conversations/${args.conversationId}`, {
        accountId: args.accountId,
        status: args.status,
      });
    },
  },
  {
    name: "zernio_edit_message",
    description: "Edit a message in a conversation.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      messageId: z.string().describe("The message ID to edit"),
      message: z.string().describe("The updated message text"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; messageId: string; message: string; accountId: string }) => {
      // The API's field for the new text is `text`.
      return zernioRequest("PATCH", `/v1/inbox/conversations/${args.conversationId}/messages/${args.messageId}`, {
        accountId: args.accountId,
        text: args.message,
      });
    },
  },
  {
    name: "zernio_delete_message",
    description: "Delete a message from a conversation.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      messageId: z.string().describe("The message ID to delete"),
      accountId: z.string().describe("The Zernio account ID the conversation belongs to (accountId from zernio_list_conversations); the API requires it"),
    }),
    handler: async (args: { conversationId: string; messageId: string; accountId: string }) => {
      // The API takes accountId as a query parameter on DELETE.
      return zernioRequest("DELETE", `/v1/inbox/conversations/${args.conversationId}/messages/${args.messageId}`, undefined, {
        accountId: args.accountId,
      });
    },
  },
];
