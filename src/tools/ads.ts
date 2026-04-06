import { z } from "zod";
import { zernioRequest } from "../client.js";

export const adsTools = [
  {
    name: "zernio_list_ad_accounts",
    description: "List all connected ad accounts (Facebook Ads, etc.) with their IDs and status.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/ads/accounts");
    },
  },
  {
    name: "zernio_get_ads_tree",
    description: "Get the full hierarchy of ad accounts, campaigns, and ads in a single call.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by ad account ID"),
    }),
    handler: async (args: { accountId?: string }) => {
      return zernioRequest("GET", "/v1/ads/tree", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_list_campaigns",
    description: "List all ad campaigns with their status, budget, objective, and performance summary.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by ad account ID"),
      status: z.string().optional().describe("Filter by status: active, paused, completed"),
    }),
    handler: async (args: { accountId?: string; status?: string }) => {
      return zernioRequest("GET", "/v1/ads/campaigns", undefined, { accountId: args.accountId, status: args.status });
    },
  },
  {
    name: "zernio_create_campaign",
    description: "Create a new ad campaign with a specified objective, budget, and schedule.",
    inputSchema: z.object({
      accountId: z.string().describe("The ad account ID"),
      name: z.string().describe("Campaign name"),
      objective: z.string().describe("Campaign objective: awareness, traffic, engagement, leads, sales, etc."),
      budget: z.number().describe("Budget amount"),
      budgetType: z.enum(["daily", "lifetime"]).describe("Whether the budget is daily or lifetime"),
      startDate: z.string().optional().describe("Start date (ISO format)"),
      endDate: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; name: string; objective: string; budget: number; budgetType: "daily" | "lifetime"; startDate?: string; endDate?: string }) => {
      return zernioRequest("POST", "/v1/ads/campaigns", { accountId: args.accountId, name: args.name, objective: args.objective, budget: args.budget, budgetType: args.budgetType, startDate: args.startDate, endDate: args.endDate });
    },
  },
  {
    name: "zernio_update_campaign_status",
    description: "Pause or activate an ad campaign.",
    inputSchema: z.object({
      campaignId: z.string().describe("The campaign ID"),
      status: z.enum(["active", "paused"]).describe("New status for the campaign"),
    }),
    handler: async (args: { campaignId: string; status: "active" | "paused" }) => {
      return zernioRequest("PUT", `/v1/ads/campaigns/${args.campaignId}/status`, { status: args.status });
    },
  },
  {
    name: "zernio_list_ads",
    description: "List all ads across campaigns with their status, creative, and performance metrics.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by ad account ID"),
      campaignId: z.string().optional().describe("Filter by campaign ID"),
      status: z.string().optional().describe("Filter by status"),
    }),
    handler: async (args: { accountId?: string; campaignId?: string; status?: string }) => {
      return zernioRequest("GET", "/v1/ads", undefined, { accountId: args.accountId, campaignId: args.campaignId, status: args.status });
    },
  },
  {
    name: "zernio_get_ad",
    description: "Get details for a specific ad including creative, targeting, budget, and status.",
    inputSchema: z.object({
      adId: z.string().describe("The ad ID"),
    }),
    handler: async (args: { adId: string }) => {
      return zernioRequest("GET", `/v1/ads/${args.adId}`);
    },
  },
  {
    name: "zernio_get_ad_analytics",
    description: "Get performance analytics for a specific ad — impressions, clicks, CTR, spend, conversions, and ROAS.",
    inputSchema: z.object({
      adId: z.string().describe("The ad ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { adId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", `/v1/ads/${args.adId}/analytics`, undefined, { dateFrom: args.dateFrom, dateTo: args.dateTo });
    },
  },
  {
    name: "zernio_boost_post",
    description: "Boost an existing social media post as a paid ad with a budget and target audience.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to boost"),
      accountId: z.string().describe("The ad account ID to charge"),
      budget: z.number().describe("Total budget for the boost"),
      duration: z.number().describe("Duration of the boost in days"),
      audienceId: z.string().optional().describe("Custom audience ID to target"),
    }),
    handler: async (args: { postId: string; accountId: string; budget: number; duration: number; audienceId?: string }) => {
      return zernioRequest("POST", "/v1/ads/boost", { postId: args.postId, accountId: args.accountId, budget: args.budget, duration: args.duration, audienceId: args.audienceId });
    },
  },
  {
    name: "zernio_sync_ads",
    description: "Sync ads data from the connected platform to refresh campaign and ad status.",
    inputSchema: z.object({
      accountId: z.string().describe("The ad account ID to sync"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/ads/sync", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_list_audiences",
    description: "List all custom audiences available for ad targeting.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by ad account ID"),
    }),
    handler: async (args: { accountId?: string }) => {
      return zernioRequest("GET", "/v1/ads/audiences", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_create_audience",
    description: "Create a custom audience for ad targeting.",
    inputSchema: z.object({
      accountId: z.string().describe("The ad account ID"),
      name: z.string().describe("Audience name"),
      type: z.string().describe("Audience type: custom, lookalike, engagement, etc."),
      description: z.string().optional().describe("Description of the audience"),
    }),
    handler: async (args: { accountId: string; name: string; type: string; description?: string }) => {
      return zernioRequest("POST", "/v1/ads/audiences", { accountId: args.accountId, name: args.name, type: args.type, description: args.description });
    },
  },
  {
    name: "zernio_get_ad_interests",
    description: "Browse available interest targeting options for ads (hobbies, demographics, behaviors).",
    inputSchema: z.object({
      query: z.string().optional().describe("Search query to filter interests"),
    }),
    handler: async (args: { query?: string }) => {
      return zernioRequest("GET", "/v1/ads/interests", undefined, { query: args.query });
    },
  },
];
