import { z } from "zod";
import { zernioRequest } from "../client.js";

export const broadcastTools = [
  {
    name: "zernio_list_broadcasts",
    description: "List all broadcasts (mass messages sent to contact lists).",
    inputSchema: z.object({
      limit: z.number().optional().describe("Max broadcasts to return"),
      status: z.string().optional().describe("Filter by status: draft, scheduled, sent, cancelled"),
    }),
    handler: async (args: { limit?: number; status?: string }) => {
      return zernioRequest("GET", "/v1/broadcasts", undefined, { limit: args.limit, status: args.status });
    },
  },
  {
    name: "zernio_get_broadcast",
    description: "Get details for a specific broadcast.",
    inputSchema: z.object({
      broadcastId: z.string().describe("The broadcast ID"),
    }),
    handler: async (args: { broadcastId: string }) => {
      return zernioRequest("GET", `/v1/broadcasts/${args.broadcastId}`);
    },
  },
  {
    name: "zernio_create_broadcast",
    description: "Create a new broadcast message to send to a contact list.",
    inputSchema: z.object({
      name: z.string().describe("Broadcast name"),
      message: z.string().describe("The message content to send"),
      accountId: z.string().describe("The social account to send from"),
      audienceType: z.string().optional().describe("Target audience type: all, segment, tag"),
      tag: z.string().optional().describe("Tag to filter contacts by"),
    }),
    handler: async (args: { name: string; message: string; accountId: string; audienceType?: string; tag?: string }) => {
      return zernioRequest("POST", "/v1/broadcasts", {
        name: args.name,
        message: args.message,
        accountId: args.accountId,
        audienceType: args.audienceType,
        tag: args.tag,
      });
    },
  },
  {
    name: "zernio_schedule_broadcast",
    description: "Schedule a broadcast to be sent at a specific date and time.",
    inputSchema: z.object({
      broadcastId: z.string().describe("The broadcast ID to schedule"),
      scheduledAt: z.string().describe("ISO datetime string for when to send the broadcast"),
    }),
    handler: async (args: { broadcastId: string; scheduledAt: string }) => {
      return zernioRequest("POST", `/v1/broadcasts/${args.broadcastId}/schedule`, {
        scheduledAt: args.scheduledAt,
      });
    },
  },
  {
    name: "zernio_send_broadcast",
    description: "Send a broadcast immediately.",
    inputSchema: z.object({
      broadcastId: z.string().describe("The broadcast ID to send now"),
    }),
    handler: async (args: { broadcastId: string }) => {
      return zernioRequest("POST", `/v1/broadcasts/${args.broadcastId}/send`);
    },
  },
  {
    name: "zernio_cancel_broadcast",
    description: "Cancel a scheduled broadcast before it is sent.",
    inputSchema: z.object({
      broadcastId: z.string().describe("The broadcast ID to cancel"),
    }),
    handler: async (args: { broadcastId: string }) => {
      return zernioRequest("POST", `/v1/broadcasts/${args.broadcastId}/cancel`);
    },
  },
  {
    name: "zernio_get_broadcast_recipients",
    description: "Get the list of recipients for a specific broadcast.",
    inputSchema: z.object({
      broadcastId: z.string().describe("The broadcast ID"),
      limit: z.number().optional().describe("Max recipients to return"),
    }),
    handler: async (args: { broadcastId: string; limit?: number }) => {
      return zernioRequest("GET", `/v1/broadcasts/${args.broadcastId}/recipients`, undefined, { limit: args.limit });
    },
  },
];
