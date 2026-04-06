import { z } from "zod";
import { zernioRequest } from "../client.js";

export const accountTools = [
  {
    name: "zernio_list_accounts",
    description: "List all connected social media accounts in Zernio with their platform, username, follower count, and account ID.",
    inputSchema: z.object({
      platform: z.string().optional().describe("Filter by platform: facebook, instagram, tiktok, twitter, youtube, googlebusiness, linkedin, etc."),
    }),
    handler: async (args: { platform?: string }) => {
      return zernioRequest("GET", "/v1/accounts", undefined, { platform: args.platform });
    },
  },
  {
    name: "zernio_get_follower_stats",
    description: "Get follower count and basic stats for a specific connected account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/follower-stats`, undefined, { accountIds: args.accountId });
    },
  },
  {
    name: "zernio_get_account_health",
    description: "Check the health/connection status of a social account -- whether its auth token is still valid and connected.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Specific account ID to check (omit to check all accounts)"),
    }),
    handler: async (args: { accountId?: string }) => {
      return zernioRequest("GET", "/v1/accounts/health", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_linkedin_mentions",
    description: "Get LinkedIn mentions -- posts and comments where your LinkedIn page was tagged or mentioned.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      dateFrom: z.string().optional().describe("Start date (ISO format)"),
      dateTo: z.string().optional().describe("End date (ISO format)"),
    }),
    handler: async (args: { accountId: string; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-mentions`, undefined, { dateFrom: args.dateFrom, dateTo: args.dateTo });
    },
  },
  {
    name: "zernio_get_facebook_page",
    description: "Get the Facebook Page details linked to a connected Facebook account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Facebook account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/facebook-page`);
    },
  },
  {
    name: "zernio_get_linkedin_organizations",
    description: "Get LinkedIn organization pages linked to a connected LinkedIn account (for posting as a company page).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/linkedin-organizations`);
    },
  },
  {
    name: "zernio_get_reddit_flairs",
    description: "Get available post flairs for a subreddit -- required for posting to subreddits that mandate flairs.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Reddit account ID"),
      subreddit: z.string().describe("The subreddit name (without r/)"),
    }),
    handler: async (args: { accountId: string; subreddit: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/reddit-flairs`, undefined, { subreddit: args.subreddit });
    },
  },
  {
    name: "zernio_get_gmb_locations",
    description: "Get Google My Business locations linked to a connected Google Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-locations`);
    },
  },
  {
    name: "zernio_get_pinterest_boards",
    description: "Get Pinterest boards for a connected Pinterest account -- needed for pinning posts to specific boards.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Pinterest account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/pinterest-boards`);
    },
  },
  {
    name: "zernio_get_youtube_playlists",
    description: "Get YouTube playlists for a connected YouTube account -- needed for uploading videos to specific playlists.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio YouTube account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/youtube-playlists`);
    },
  },
  {
    name: "zernio_get_tiktok_creator_info",
    description: "Get TikTok creator info for a connected TikTok account -- includes privacy settings and post limits.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio TikTok account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/tiktok-creator-info`);
    },
  },
  {
    name: "zernio_get_messenger_menu",
    description: "Get the Facebook Messenger persistent menu configured for a connected Facebook account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Facebook account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/messenger-menu`);
    },
  },
  {
    name: "zernio_set_messenger_menu",
    description: "Set or update the Facebook Messenger persistent menu -- the quick-action buttons shown in your Messenger chat.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Facebook account ID"),
      menuItems: z.array(z.object({
        title: z.string().describe("Menu item label"),
        payload: z.string().describe("Postback payload sent when user taps this item"),
      })).describe("Menu items to show in the Messenger persistent menu"),
    }),
    handler: async (args: { accountId: string; menuItems: Array<{ title: string; payload: string }> }) => {
      return zernioRequest("POST", `/v1/accounts/${args.accountId}/messenger-menu`, { menuItems: args.menuItems });
    },
  },
  {
    name: "zernio_delete_messenger_menu",
    description: "Remove the Facebook Messenger persistent menu from a connected Facebook account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Facebook account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}/messenger-menu`);
    },
  },
  {
    name: "zernio_get_telegram_commands",
    description: "Get the bot commands configured for a connected Telegram bot account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Telegram account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/telegram-commands`);
    },
  },
  {
    name: "zernio_set_telegram_commands",
    description: "Set bot commands for a connected Telegram bot (the /command list shown to users).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Telegram account ID"),
      commands: z.array(z.object({
        command: z.string().describe("Command without slash (e.g. 'start', 'help')"),
        description: z.string().describe("Short description shown to users"),
      })).describe("List of bot commands to register"),
    }),
    handler: async (args: { accountId: string; commands: Array<{ command: string; description: string }> }) => {
      return zernioRequest("POST", `/v1/accounts/${args.accountId}/telegram-commands`, { commands: args.commands });
    },
  },
  {
    name: "zernio_delete_telegram_commands",
    description: "Remove all bot commands from a connected Telegram bot account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Telegram account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}/telegram-commands`);
    },
  },
  {
    name: "zernio_get_instagram_ice_breakers",
    description: "Get the Instagram DM ice breaker questions configured for a connected Instagram account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Instagram account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/instagram-ice-breakers`);
    },
  },
  {
    name: "zernio_set_instagram_ice_breakers",
    description: "Set Instagram DM ice breaker questions -- suggested questions shown to users who start a new DM conversation.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Instagram account ID"),
      iceBreakers: z.array(z.object({
        question: z.string().describe("The ice breaker question text"),
        payload: z.string().describe("Postback payload when user taps this question"),
      })).describe("Ice breaker questions (max 4)"),
    }),
    handler: async (args: { accountId: string; iceBreakers: Array<{ question: string; payload: string }> }) => {
      return zernioRequest("POST", `/v1/accounts/${args.accountId}/instagram-ice-breakers`, { iceBreakers: args.iceBreakers });
    },
  },
  {
    name: "zernio_delete_instagram_ice_breakers",
    description: "Remove all Instagram DM ice breaker questions from a connected Instagram account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Instagram account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}/instagram-ice-breakers`);
    },
  },
];
