import { z } from "zod";
import { zernioRequest } from "../client.js";

export const queueTools = [
  {
    name: "zernio_list_queue_slots",
    description: "List all queue slots for scheduled posting. Optionally filter by date or accounts.",
    inputSchema: z.object({
      date: z.string().optional().describe("Filter by date (ISO format, e.g. 2024-01-15)"),
      accountIds: z.string().optional().describe("Comma-separated account IDs to filter by"),
    }),
    handler: async (args: { date?: string; accountIds?: string }) => {
      return zernioRequest("GET", "/v1/queue/slots", undefined, {
        date: args.date,
        accountIds: args.accountIds,
      });
    },
  },
  {
    name: "zernio_create_queue_slot",
    description: "Create new queue slots for scheduled posting at specific times.",
    inputSchema: z.object({
      accountIds: z.array(z.string()).describe("Account IDs to create queue slots for"),
      times: z.array(z.string()).describe("Times to schedule slots (ISO format or HH:MM)"),
    }),
    handler: async (args: { accountIds: string[]; times: string[] }) => {
      return zernioRequest("POST", "/v1/queue/slots", {
        accountIds: args.accountIds,
        times: args.times,
      });
    },
  },
  {
    name: "zernio_update_queue_slot",
    description: "Update the time of an existing queue slot.",
    inputSchema: z.object({
      slotId: z.string().describe("The queue slot ID to update"),
      time: z.string().describe("New time for the slot (ISO format or HH:MM)"),
    }),
    handler: async (args: { slotId: string; time: string }) => {
      return zernioRequest("PUT", "/v1/queue/slots", {
        slotId: args.slotId,
        time: args.time,
      });
    },
  },
  {
    name: "zernio_delete_queue_slot",
    description: "Delete a queue slot.",
    inputSchema: z.object({
      slotId: z.string().describe("The queue slot ID to delete"),
    }),
    handler: async (args: { slotId: string }) => {
      return zernioRequest("DELETE", "/v1/queue/slots", { slotId: args.slotId });
    },
  },
  {
    name: "zernio_preview_queue",
    description: "Preview the upcoming queue showing what posts will be published and when.",
    inputSchema: z.object({
      days: z.number().optional().describe("Number of days to preview (default varies by plan)"),
      accountIds: z.string().optional().describe("Comma-separated account IDs to filter by"),
    }),
    handler: async (args: { days?: number; accountIds?: string }) => {
      return zernioRequest("GET", "/v1/queue/preview", undefined, {
        days: args.days,
        accountIds: args.accountIds,
      });
    },
  },
  {
    name: "zernio_get_next_queue_slot",
    description: "Get the next available queue slot for posting.",
    inputSchema: z.object({
      accountIds: z.string().optional().describe("Comma-separated account IDs to filter by"),
    }),
    handler: async (args: { accountIds?: string }) => {
      return zernioRequest("GET", "/v1/queue/next-slot", undefined, {
        accountIds: args.accountIds,
      });
    },
  },
];
