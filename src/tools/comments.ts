import { z } from "zod";
import { zernioRequest } from "../client.js";

export const commentTools = [
  {
    name: "zernio_list_commented_posts",
    description:
      "List posts that have comments across all connected social accounts. Returns posts with comment counts, sorted by most recent or most commented. Use this to see what content is getting engagement.",
    inputSchema: z.object({
      platform: z
        .string()
        .optional()
        .describe(
          "Filter by platform: facebook, instagram, twitter, youtube, tiktok, linkedin, threads, bluesky, reddit"
        ),
      accountId: z.string().optional().describe("Filter by specific account ID"),
      minComments: z
        .number()
        .optional()
        .describe("Only return posts with at least this many comments"),
      since: z
        .string()
        .optional()
        .describe("ISO date string — only return posts with comments since this date"),
      sortBy: z
        .enum(["recent", "mostCommented"])
        .optional()
        .describe("Sort order: recent (default) or mostCommented"),
      limit: z.number().optional().describe("Max number of posts to return (default 20)"),
    }),
    handler: async (args: {
      platform?: string;
      accountId?: string;
      minComments?: number;
      since?: string;
      sortBy?: string;
      limit?: number;
    }) => {
      return zernioRequest("GET", "/v1/inbox/comments", undefined, {
        platform: args.platform,
        accountId: args.accountId,
        minComments: args.minComments,
        since: args.since,
        sortBy: args.sortBy,
        limit: args.limit,
      });
    },
  },
  {
    name: "zernio_get_post_comments",
    description:
      "Get all comments on a specific post. Returns the full comment thread including replies, author names, timestamps, and comment IDs needed to reply or moderate.",
    inputSchema: z.object({
      postId: z.string().describe("The platform post ID (from zernio_list_commented_posts)"),
      accountId: z.string().describe("The Zernio account ID that owns the post"),
    }),
    handler: async (args: { postId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/inbox/comments/${args.postId}`, undefined, {
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_reply_to_comment",
    description:
      "Reply to a comment on a social media post. Works across Facebook, Instagram, YouTube, TikTok, LinkedIn, Twitter, and more.",
    inputSchema: z.object({
      commentId: z.string().describe("The comment ID to reply to"),
      message: z.string().describe("The reply text"),
      accountId: z.string().describe("The Zernio account ID to reply from"),
    }),
    handler: async (args: { commentId: string; message: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/inbox/comments/${args.commentId}/reply`, {
        message: args.message,
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_private_reply_to_comment",
    description:
      "Send a private/direct message reply to someone who commented on a post. Useful for handling sensitive customer issues privately instead of publicly.",
    inputSchema: z.object({
      commentId: z.string().describe("The comment ID to privately reply to"),
      message: z.string().describe("The private message text"),
      accountId: z.string().describe("The Zernio account ID to send from"),
    }),
    handler: async (args: { commentId: string; message: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/inbox/comments/${args.commentId}/private-reply`, {
        message: args.message,
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_like_comment",
    description: "Like or react to a comment on a post.",
    inputSchema: z.object({
      commentId: z.string().describe("The comment ID to like"),
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { commentId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/inbox/comments/${args.commentId}/like`, {
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_hide_comment",
    description:
      "Hide a comment from public view on a post. The comment is not deleted but hidden from other users.",
    inputSchema: z.object({
      commentId: z.string().describe("The comment ID to hide"),
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { commentId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/inbox/comments/${args.commentId}/hide`, {
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_delete_comment",
    description:
      "Permanently delete a comment from a post. Use with caution — this cannot be undone.",
    inputSchema: z.object({
      commentId: z.string().describe("The comment ID to delete"),
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { commentId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/inbox/comments/${args.commentId}`, {
        accountId: args.accountId,
      });
    },
  },
];
