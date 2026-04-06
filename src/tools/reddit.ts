import { z } from "zod";
import { zernioRequest } from "../client.js";

export const redditTools = [
  {
    name: "zernio_search_reddit",
    description: "Search Reddit for posts matching a query, optionally within a specific subreddit.",
    inputSchema: z.object({
      accountId: z.string().describe("The Reddit account ID"),
      query: z.string().describe("Search query string"),
      subreddit: z.string().optional().describe("Subreddit to search within (without r/)"),
      limit: z.number().optional().describe("Max results to return"),
    }),
    handler: async (args: { accountId: string; query: string; subreddit?: string; limit?: number }) => {
      return zernioRequest("GET", "/v1/reddit/search", undefined, {
        accountId: args.accountId,
        query: args.query,
        subreddit: args.subreddit,
        limit: args.limit,
      });
    },
  },
  {
    name: "zernio_get_reddit_feed",
    description: "Get the post feed from a specific subreddit.",
    inputSchema: z.object({
      accountId: z.string().describe("The Reddit account ID"),
      subreddit: z.string().describe("Subreddit to get the feed from (without r/)"),
      limit: z.number().optional().describe("Max posts to return"),
      after: z.string().optional().describe("Pagination cursor for the next page of results"),
    }),
    handler: async (args: { accountId: string; subreddit: string; limit?: number; after?: string }) => {
      return zernioRequest("GET", "/v1/reddit/feed", undefined, {
        accountId: args.accountId,
        subreddit: args.subreddit,
        limit: args.limit,
        after: args.after,
      });
    },
  },
];
