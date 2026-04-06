import { z } from "zod";
import { zernioRequest } from "../client.js";

export const automationTools = [
  {
    name: "zernio_list_automations",
    description: "List all comment automations (auto-reply rules for comments).",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by account ID"),
      status: z.string().optional().describe("Filter by status: active, inactive"),
    }),
    handler: async (args: { accountId?: string; status?: string }) => {
      return zernioRequest("GET", "/v1/automations", undefined, { accountId: args.accountId, status: args.status });
    },
  },
  {
    name: "zernio_get_automation",
    description: "Get details for a specific comment automation rule.",
    inputSchema: z.object({
      automationId: z.string().describe("The automation ID"),
    }),
    handler: async (args: { automationId: string }) => {
      return zernioRequest("GET", `/v1/automations/${args.automationId}`);
    },
  },
  {
    name: "zernio_create_automation",
    description: "Create a new comment automation rule to auto-reply to comments matching certain keywords.",
    inputSchema: z.object({
      accountId: z.string().describe("The account ID to create the automation for"),
      name: z.string().describe("Automation rule name"),
      triggerKeywords: z.array(z.string()).describe("Keywords that trigger this automation"),
      replyMessage: z.string().describe("Message to reply with when triggered"),
      isActive: z.boolean().optional().describe("Whether the automation is active (default true)"),
    }),
    handler: async (args: { accountId: string; name: string; triggerKeywords: string[]; replyMessage: string; isActive?: boolean }) => {
      return zernioRequest("POST", "/v1/automations", {
        accountId: args.accountId,
        name: args.name,
        triggerKeywords: args.triggerKeywords,
        replyMessage: args.replyMessage,
        isActive: args.isActive,
      });
    },
  },
  {
    name: "zernio_update_automation",
    description: "Update an existing comment automation rule.",
    inputSchema: z.object({
      automationId: z.string().describe("The automation ID to update"),
      name: z.string().optional().describe("Updated name"),
      triggerKeywords: z.array(z.string()).optional().describe("Updated trigger keywords"),
      replyMessage: z.string().optional().describe("Updated reply message"),
      isActive: z.boolean().optional().describe("Enable or disable the automation"),
    }),
    handler: async (args: { automationId: string; name?: string; triggerKeywords?: string[]; replyMessage?: string; isActive?: boolean }) => {
      return zernioRequest("PUT", `/v1/automations/${args.automationId}`, {
        name: args.name,
        triggerKeywords: args.triggerKeywords,
        replyMessage: args.replyMessage,
        isActive: args.isActive,
      });
    },
  },
  {
    name: "zernio_delete_automation",
    description: "Delete a comment automation rule.",
    inputSchema: z.object({
      automationId: z.string().describe("The automation ID to delete"),
    }),
    handler: async (args: { automationId: string }) => {
      return zernioRequest("DELETE", `/v1/automations/${args.automationId}`);
    },
  },
  {
    name: "zernio_get_automation_logs",
    description: "Get execution logs for a specific automation to see when and how it triggered.",
    inputSchema: z.object({
      automationId: z.string().describe("The automation ID"),
      limit: z.number().optional().describe("Max log entries to return"),
    }),
    handler: async (args: { automationId: string; limit?: number }) => {
      return zernioRequest("GET", `/v1/automations/${args.automationId}/logs`, undefined, { limit: args.limit });
    },
  },
];
