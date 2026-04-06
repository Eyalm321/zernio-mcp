import { z } from "zod";
import { zernioRequest } from "../client.js";

export const messageTools = [
  {
    name: "zernio_list_conversations",
    description:
      "List all DM conversations across connected social media accounts (Facebook, Instagram, etc.). Returns sender info, last message preview, and conversation IDs needed to read or reply.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by specific account ID"),
      platform: z
        .string()
        .optional()
        .describe("Filter by platform: facebook, instagram, twitter, etc."),
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
    }),
    handler: async (args: { conversationId: string }) => {
      return zernioRequest("GET", `/v1/inbox/conversations/${args.conversationId}`);
    },
  },
  {
    name: "zernio_list_messages",
    description:
      "Read the messages in a specific conversation thread. Use after zernio_list_conversations to read the full DM history.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      limit: z.number().optional().describe("Max messages to return (default 50)"),
    }),
    handler: async (args: { conversationId: string; limit?: number }) => {
      return zernioRequest(
        "GET",
        `/v1/inbox/conversations/${args.conversationId}/messages`,
        undefined,
        { limit: args.limit }
      );
    },
  },
  {
    name: "zernio_send_message",
    description:
      "Send a DM or reply to a conversation on a social media platform. Works for Facebook Messenger, Instagram DMs, and other supported platforms.",
    inputSchema: z.object({
      conversationId: z
        .string()
        .optional()
        .describe("Existing conversation ID to reply to"),
      accountId: z.string().describe("The Zernio account ID to send from"),
      message: z.string().describe("The message text to send"),
      recipientId: z
        .string()
        .optional()
        .describe("Recipient user ID for starting a new conversation"),
    }),
    handler: async (args: {
      conversationId?: string;
      accountId: string;
      message: string;
      recipientId?: string;
    }) => {
      const path = args.conversationId
        ? `/v1/inbox/conversations/${args.conversationId}/messages`
        : "/v1/inbox/conversations";
      return zernioRequest("POST", path, {
        accountId: args.accountId,
        message: args.message,
        recipientId: args.recipientId,
      });
    },
  },
  {
    name: "zernio_send_typing_indicator",
    description:
      "Send a typing indicator in a conversation to show the user that you are composing a reply.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
    }),
    handler: async (args: { conversationId: string }) => {
      return zernioRequest("POST", `/v1/inbox/conversations/${args.conversationId}/typing`);
    },
  },
  {
    name: "zernio_react_to_message",
    description:
      "Add or remove a reaction (emoji) to a message in a conversation.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      messageId: z.string().describe("The message ID to react to"),
      emoji: z.string().describe("The emoji reaction to add (e.g. '❤️', '👍', '😂')"),
      action: z.enum(["add", "remove"]).describe("Whether to add or remove the reaction"),
    }),
    handler: async (args: { conversationId: string; messageId: string; emoji: string; action: string }) => {
      return zernioRequest(
        args.action === "remove" ? "DELETE" : "POST",
        `/v1/inbox/conversations/${args.conversationId}/messages/${args.messageId}/reactions`,
        { emoji: args.emoji }
      );
    },
  },
  {
    name: "zernio_update_conversation_status",
    description:
      "Update a conversation's status — mark as read, archive, or unarchive it.",
    inputSchema: z.object({
      conversationId: z.string().describe("The conversation ID"),
      status: z
        .enum(["read", "unread", "archived", "unarchived"])
        .describe("New status for the conversation"),
    }),
    handler: async (args: { conversationId: string; status: string }) => {
      return zernioRequest("PUT", `/v1/inbox/conversations/${args.conversationId}`, {
        status: args.status,
      });
    },
  },
];
