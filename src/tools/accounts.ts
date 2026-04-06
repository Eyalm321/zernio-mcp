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
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/follower-stats`);
    },
  },
];
