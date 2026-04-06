import { z } from "zod";
import { zernioRequest } from "../client.js";

export const reviewTools = [
  {
    name: "zernio_list_reviews",
    description:
      "List customer reviews from connected accounts (e.g. Google Business Profile). Returns reviewer name, rating, review text, date, and review ID needed to reply.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by specific account ID"),
      platform: z
        .string()
        .optional()
        .describe("Filter by platform: googlebusiness, facebook, etc."),
      minRating: z
        .number()
        .min(1)
        .max(5)
        .optional()
        .describe("Only return reviews with this star rating or higher"),
      since: z
        .string()
        .optional()
        .describe("ISO date — only return reviews submitted after this date"),
      sortBy: z
        .enum(["recent", "rating"])
        .optional()
        .describe("Sort by most recent (default) or by rating"),
      limit: z.number().optional().describe("Max reviews to return (default 20)"),
    }),
    handler: async (args: {
      accountId?: string;
      platform?: string;
      minRating?: number;
      since?: string;
      sortBy?: string;
      limit?: number;
    }) => {
      return zernioRequest("GET", "/v1/inbox/reviews", undefined, {
        accountId: args.accountId,
        platform: args.platform,
        minRating: args.minRating,
        since: args.since,
        sortBy: args.sortBy,
        limit: args.limit,
      });
    },
  },
  {
    name: "zernio_reply_to_review",
    description:
      "Reply to a customer review (e.g. on Google Business Profile). The reply will be publicly visible.",
    inputSchema: z.object({
      reviewId: z.string().describe("The review ID to reply to"),
      accountId: z.string().describe("The Zernio account ID to reply from"),
      message: z.string().describe("Your reply text"),
    }),
    handler: async (args: { reviewId: string; accountId: string; message: string }) => {
      return zernioRequest("POST", `/v1/inbox/reviews/${args.reviewId}/reply`, {
        accountId: args.accountId,
        message: args.message,
      });
    },
  },
  {
    name: "zernio_delete_review_reply",
    description:
      "Delete your existing reply to a review. Use this if you want to revise or remove a previously submitted reply.",
    inputSchema: z.object({
      reviewId: z.string().describe("The review ID whose reply should be deleted"),
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { reviewId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/inbox/reviews/${args.reviewId}/reply`, {
        accountId: args.accountId,
      });
    },
  },
];
