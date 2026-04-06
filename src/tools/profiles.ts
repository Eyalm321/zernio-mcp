import { z } from "zod";
import { zernioRequest } from "../client.js";

export const profileTools = [
  {
    name: "zernio_get_profile",
    description: "Get the current user's Zernio profile and account settings.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/profile");
    },
  },
  {
    name: "zernio_update_profile",
    description: "Update the current user's Zernio profile information.",
    inputSchema: z.object({
      name: z.string().optional().describe("Updated display name"),
      email: z.string().optional().describe("Updated email address"),
      timezone: z.string().optional().describe("Updated timezone (e.g. 'America/New_York')"),
    }),
    handler: async (args: { name?: string; email?: string; timezone?: string }) => {
      return zernioRequest("PUT", "/v1/profile", { name: args.name, email: args.email, timezone: args.timezone });
    },
  },
  {
    name: "zernio_list_account_groups",
    description: "List all account groups used to organize social media accounts.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/account-groups");
    },
  },
  {
    name: "zernio_create_account_group",
    description: "Create a new account group to organize social media accounts.",
    inputSchema: z.object({
      name: z.string().describe("Name of the account group"),
      accountIds: z.array(z.string()).optional().describe("Account IDs to add to this group"),
    }),
    handler: async (args: { name: string; accountIds?: string[] }) => {
      return zernioRequest("POST", "/v1/account-groups", { name: args.name, accountIds: args.accountIds });
    },
  },
  {
    name: "zernio_update_account_group",
    description: "Update an existing account group's name or members.",
    inputSchema: z.object({
      groupId: z.string().describe("The account group ID"),
      name: z.string().optional().describe("Updated group name"),
      accountIds: z.array(z.string()).optional().describe("Updated list of account IDs in this group"),
    }),
    handler: async (args: { groupId: string; name?: string; accountIds?: string[] }) => {
      return zernioRequest("PUT", `/v1/account-groups/${args.groupId}`, { name: args.name, accountIds: args.accountIds });
    },
  },
  {
    name: "zernio_delete_account_group",
    description: "Delete an account group.",
    inputSchema: z.object({
      groupId: z.string().describe("The account group ID to delete"),
    }),
    handler: async (args: { groupId: string }) => {
      return zernioRequest("DELETE", `/v1/account-groups/${args.groupId}`);
    },
  },
  {
    name: "zernio_list_users",
    description: "List all users in the Zernio workspace (team members).",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/users");
    },
  },
  {
    name: "zernio_invite_user",
    description: "Invite a new team member to the Zernio workspace.",
    inputSchema: z.object({
      email: z.string().describe("Email address of the person to invite"),
      role: z.string().describe("Role to assign: admin, editor, viewer"),
    }),
    handler: async (args: { email: string; role: string }) => {
      return zernioRequest("POST", "/v1/users/invite", { email: args.email, role: args.role });
    },
  },
  {
    name: "zernio_remove_user",
    description: "Remove a team member from the Zernio workspace.",
    inputSchema: z.object({
      userId: z.string().describe("The user ID to remove"),
    }),
    handler: async (args: { userId: string }) => {
      return zernioRequest("DELETE", `/v1/users/${args.userId}`);
    },
  },
  {
    name: "zernio_get_usage_stats",
    description: "Get usage statistics for the workspace: posts published, messages sent, contacts, etc.",
    inputSchema: z.object({
      dateFrom: z.string().optional().describe("Start date for usage stats (ISO format)"),
      dateTo: z.string().optional().describe("End date for usage stats (ISO format)"),
    }),
    handler: async (args: { dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/usage", undefined, { dateFrom: args.dateFrom, dateTo: args.dateTo });
    },
  },
  // Zernio Profiles (brand/project containers)
  {
    name: "zernio_list_profiles",
    description: "List all Zernio profiles (brand/project containers that group social accounts together).",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/profiles");
    },
  },
  {
    name: "zernio_create_zernio_profile",
    description: "Create a new Zernio profile -- a container that groups social accounts together (like a brand, project, or client).",
    inputSchema: z.object({
      name: z.string().describe("Profile name (e.g. 'My Brand', 'Client XYZ')"),
      description: z.string().optional().describe("Optional profile description"),
    }),
    handler: async (args: { name: string; description?: string }) => {
      return zernioRequest("POST", "/v1/profiles", { name: args.name, description: args.description });
    },
  },
  // API Key management
  {
    name: "zernio_list_api_keys",
    description: "List all API keys for the Zernio account (shows key names and creation dates, not the actual key values).",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/api-keys");
    },
  },
  {
    name: "zernio_create_api_key",
    description: "Create a new API key for the Zernio account. The key is only shown once at creation.",
    inputSchema: z.object({
      name: z.string().describe("A descriptive name for this API key (e.g. 'Production App', 'CI/CD Pipeline')"),
    }),
    handler: async (args: { name: string }) => {
      return zernioRequest("POST", "/v1/api-keys", { name: args.name });
    },
  },
  {
    name: "zernio_delete_api_key",
    description: "Revoke and permanently delete an API key.",
    inputSchema: z.object({
      keyId: z.string().describe("The API key ID to revoke"),
    }),
    handler: async (args: { keyId: string }) => {
      return zernioRequest("DELETE", `/v1/api-keys/${args.keyId}`);
    },
  },
];
