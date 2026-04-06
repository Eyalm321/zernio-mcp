import { z } from "zod";
import { zernioRequest } from "../client.js";

export const accountTools = [
  {
    name: "zernio_list_accounts",
    description:
      "List all connected social media accounts in Zernio with their platform, username, follower count, and account ID.",
    inputSchema: z.object({
      platform: z
        .string()
        .optional()
        .describe(
          "Filter by platform: facebook, instagram, tiktok, twitter, youtube, googlebusiness, linkedin, etc."
        ),
    }),
    handler: async (args: { platform?: string }) => {
      const data = await zernioRequest<{ accounts: unknown[] }>(
        "GET",
        "/v1/accounts",
        undefined,
        { platform: args.platform }
      );
      return data;
    },
  },
  {
    name: "zernio_get_follower_stats",
    description:
      "Get follower count and basic stats for a specific connected account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/follower-stats`, undefined, {
        accountIds: args.accountId,
      });
    },
  },
  {
    name: "zernio_get_linkedin_mentions",
    description:
      "Get LinkedIn mentions — posts and comments where your LinkedIn page was tagged or mentioned.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-mentions`, undefined, {
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
];
