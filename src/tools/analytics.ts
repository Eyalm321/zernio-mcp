import { z } from "zod";
import { zernioRequest } from "../client.js";

export const analyticsTools = [
  {
    name: "zernio_get_post_analytics",
    description:
      "Get performance metrics for a specific post — impressions, reach, likes, comments, shares, saves, and clicks.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      postId: z.string().optional().describe("Specific post ID to get analytics for"),
      platform: z.string().optional().describe("Filter by platform"),
      dateFrom: z.string().optional().describe("Start date (ISO format, e.g. 2024-01-01)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: {
      accountId: string;
      postId?: string;
      platform?: string;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      return zernioRequest("GET", "/v1/analytics", undefined, {
        accountId: args.accountId,
        postId: args.postId,
        platform: args.platform,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_follower_analytics",
    description:
      "Get follower growth stats for a connected account — total followers, gained/lost over time, and growth rate.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/accounts/follower-stats", undefined, {
        accountIds: args.accountId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_best_times_to_post",
    description:
      "Get the optimal days and times to post on a specific platform based on your audience's engagement patterns.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      platform: z
        .string()
        .optional()
        .describe("Platform to get best times for: facebook, instagram, tiktok, etc."),
    }),
    handler: async (args: { accountId: string; platform?: string }) => {
      return zernioRequest("GET", "/v1/analytics/best-time", undefined, {
        accountId: args.accountId,
        platform: args.platform,
      });
    },
  },
  {
    name: "zernio_get_daily_metrics",
    description:
      "Get day-by-day account metrics — impressions, reach, engagement rate, new followers, and profile visits.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
      platform: z.string().optional().describe("Filter by platform"),
    }),
    handler: async (args: {
      accountId: string;
      dateFrom?: string;
      dateTo?: string;
      platform?: string;
    }) => {
      return zernioRequest("GET", "/v1/analytics/daily-metrics", undefined, {
        accountId: args.accountId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
        platform: args.platform,
      });
    },
  },
  {
    name: "zernio_get_content_decay",
    description:
      "Track how post performance decays over time — see how reach and engagement drop off after publishing.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      postId: z.string().optional().describe("Specific post ID to analyze"),
    }),
    handler: async (args: { accountId: string; postId?: string }) => {
      return zernioRequest("GET", "/v1/analytics/content-decay", undefined, {
        accountId: args.accountId,
        postId: args.postId,
      });
    },
  },
  {
    name: "zernio_get_instagram_insights",
    description:
      "Get Instagram-specific account insights including reach, impressions, profile visits, website clicks, and follower demographics.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Instagram account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/analytics/instagram/account-insights", undefined, {
        accountId: args.accountId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_instagram_demographics",
    description:
      "Get Instagram audience demographics — age groups, gender split, and top locations of your followers.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Instagram account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/analytics/instagram/demographics", undefined, {
        accountId: args.accountId,
      });
    },
  },
  {
    name: "zernio_get_google_business_performance",
    description:
      "Get Google Business Profile performance metrics — searches, views, direction requests, calls, and website clicks.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest(
        "GET",
        "/v1/analytics/googlebusiness/performance",
        undefined,
        {
          accountId: args.accountId,
          dateFrom: args.dateFrom,
          dateTo: args.dateTo,
        }
      );
    },
  },
  {
    name: "zernio_get_google_business_keywords",
    description:
      "Get the search keywords people use to find your Google Business Profile.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest(
        "GET",
        "/v1/analytics/googlebusiness/search-keywords",
        undefined,
        {
          accountId: args.accountId,
          dateFrom: args.dateFrom,
          dateTo: args.dateTo,
        }
      );
    },
  },
  {
    name: "zernio_get_youtube_analytics",
    description:
      "Get YouTube daily view counts, watch time, and subscriber changes.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio YouTube account ID"),
      videoId: z.string().describe("The YouTube video ID to get daily views for"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; videoId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/analytics/youtube/daily-views", undefined, {
        accountId: args.accountId,
        videoId: args.videoId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_youtube_demographics",
    description:
      "Get YouTube audience demographics — age groups, gender split, and top countries of your viewers.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio YouTube account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/analytics/youtube/demographics", undefined, {
        accountId: args.accountId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_linkedin_analytics",
    description:
      "Get LinkedIn account-level aggregate analytics — impressions, clicks, engagement rate, and follower growth.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-aggregate-analytics`, undefined, {
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_linkedin_post_analytics",
    description:
      "Get LinkedIn post-level analytics — impressions, clicks, likes, comments, shares, and engagement per post.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-post-analytics`, undefined, {
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_linkedin_post_reactions",
    description:
      "Get reactions breakdown for LinkedIn posts — like, celebrate, support, love, insightful, curious counts.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      postId: z.string().optional().describe("Specific post ID to get reactions for"),
    }),
    handler: async (args: { accountId: string; postId?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-post-reactions`, undefined, {
        postId: args.postId,
      });
    },
  },
  {
    name: "zernio_get_post_timeline",
    description:
      "Get a post's performance over time as a timeline — see how metrics like impressions and engagement evolved hour by hour or day by day after publishing.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      postId: z.string().describe("The post ID to get the timeline for"),
    }),
    handler: async (args: { accountId: string; postId: string }) => {
      return zernioRequest("GET", "/v1/analytics/post-timeline", undefined, {
        accountId: args.accountId,
        postId: args.postId,
      });
    },
  },
  {
    name: "zernio_get_posting_frequency",
    description:
      "Get posting frequency stats for an account — how often you post per day/week/month and how it correlates with engagement.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/analytics/posting-frequency", undefined, {
        accountId: args.accountId,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
];
