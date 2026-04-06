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
  {
    name: "zernio_update_account",
    description: "Update a connected social media account's username or display name.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID to update"),
      username: z.string().optional().describe("Updated username for the account"),
      displayName: z.string().optional().describe("Updated display name for the account"),
    }),
    handler: async (args: { accountId: string; username?: string; displayName?: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}`, { username: args.username, displayName: args.displayName });
    },
  },
  {
    name: "zernio_disconnect_account",
    description: "Disconnect and remove a social media account from Zernio.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID to disconnect"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}`);
    },
  },
  {
    name: "zernio_get_single_account_health",
    description: "Check the health/connection status of a specific social account by ID -- whether its auth token is still valid.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio account ID to check"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/health`);
    },
  },
  {
    name: "zernio_get_reddit_subreddits",
    description: "Get subreddits available for a connected Reddit account -- needed for posting to subreddits.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Reddit account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/reddit-subreddits`);
    },
  },
  {
    name: "zernio_switch_linkedin_organization",
    description: "Switch the active LinkedIn organization page for a connected LinkedIn account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio LinkedIn account ID"),
      organizationId: z.string().describe("The LinkedIn organization ID to switch to"),
    }),
    handler: async (args: { accountId: string; organizationId: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/linkedin-organization`, { organizationId: args.organizationId });
    },
  },
  {
    name: "zernio_set_default_pinterest_board",
    description: "Set the default Pinterest board for a connected Pinterest account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Pinterest account ID"),
      boardId: z.string().describe("The Pinterest board ID to set as default"),
    }),
    handler: async (args: { accountId: string; boardId: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/pinterest-boards`, { boardId: args.boardId });
    },
  },
  {
    name: "zernio_set_default_youtube_playlist",
    description: "Set the default YouTube playlist for a connected YouTube account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio YouTube account ID"),
      playlistId: z.string().describe("The YouTube playlist ID to set as default"),
    }),
    handler: async (args: { accountId: string; playlistId: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/youtube-playlists`, { playlistId: args.playlistId });
    },
  },
  {
    name: "zernio_set_default_reddit_subreddit",
    description: "Set the default subreddit for a connected Reddit account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Reddit account ID"),
      subreddit: z.string().describe("The subreddit name to set as default (without r/)"),
    }),
    handler: async (args: { accountId: string; subreddit: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/reddit-subreddits`, { subreddit: args.subreddit });
    },
  },
  {
    name: "zernio_update_facebook_page",
    description: "Update settings for the Facebook Page linked to a connected Facebook account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Facebook account ID"),
      settings: z.string().describe("JSON string of Facebook Page settings to update"),
    }),
    handler: async (args: { accountId: string; settings: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/facebook-page`, { settings: args.settings });
    },
  },
  {
    name: "zernio_get_gmb_reviews",
    description: "Get Google My Business reviews for a specific location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      pageSize: z.string().optional().describe("Number of reviews to return per page"),
      pageToken: z.string().optional().describe("Pagination token for the next page of results"),
    }),
    handler: async (args: { accountId: string; locationId: string; pageSize?: string; pageToken?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-reviews`, undefined, { locationId: args.locationId, pageSize: args.pageSize, pageToken: args.pageToken });
    },
  },
  {
    name: "zernio_get_gmb_food_menus",
    description: "Get food menus for a Google My Business location (restaurants, cafes, etc.).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
    }),
    handler: async (args: { accountId: string; locationId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-food-menus`, undefined, { locationId: args.locationId });
    },
  },
  {
    name: "zernio_update_gmb_food_menus",
    description: "Update food menus for a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      menus: z.string().describe("JSON string of menu data to update"),
    }),
    handler: async (args: { accountId: string; locationId: string; menus: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/gmb-food-menus`, { locationId: args.locationId, menus: args.menus });
    },
  },
  {
    name: "zernio_get_gmb_location_details",
    description: "Get detailed information for a specific Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
    }),
    handler: async (args: { accountId: string; locationId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-location-details`, undefined, { locationId: args.locationId });
    },
  },
  {
    name: "zernio_update_gmb_location_details",
    description: "Update details for a Google My Business location (name, address, phone, hours, website, description).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      name: z.string().optional().describe("Updated business name"),
      address: z.string().optional().describe("Updated business address"),
      phone: z.string().optional().describe("Updated phone number"),
      hours: z.string().optional().describe("Updated business hours (JSON string)"),
      website: z.string().optional().describe("Updated website URL"),
      description: z.string().optional().describe("Updated business description"),
    }),
    handler: async (args: { accountId: string; locationId: string; name?: string; address?: string; phone?: string; hours?: string; website?: string; description?: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/gmb-location-details`, { locationId: args.locationId, name: args.name, address: args.address, phone: args.phone, hours: args.hours, website: args.website, description: args.description });
    },
  },
  {
    name: "zernio_get_gmb_media",
    description: "Get media (photos/videos) for a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      pageSize: z.string().optional().describe("Number of media items to return per page"),
      pageToken: z.string().optional().describe("Pagination token for the next page of results"),
    }),
    handler: async (args: { accountId: string; locationId: string; pageSize?: string; pageToken?: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-media`, undefined, { locationId: args.locationId, pageSize: args.pageSize, pageToken: args.pageToken });
    },
  },
  {
    name: "zernio_upload_gmb_media",
    description: "Upload a photo or video to a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      mediaUrl: z.string().describe("Public URL of the media file to upload"),
      category: z.string().describe("Media category (e.g. 'COVER', 'PROFILE', 'ADDITIONAL', 'INTERIOR', 'EXTERIOR', 'FOOD_AND_DRINK')"),
    }),
    handler: async (args: { accountId: string; locationId: string; mediaUrl: string; category: string }) => {
      return zernioRequest("POST", `/v1/accounts/${args.accountId}/gmb-media`, { locationId: args.locationId, mediaUrl: args.mediaUrl, category: args.category });
    },
  },
  {
    name: "zernio_delete_gmb_media",
    description: "Delete a media item from a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      mediaId: z.string().describe("The media item ID to delete"),
    }),
    handler: async (args: { accountId: string; locationId: string; mediaId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}/gmb-media`, { locationId: args.locationId, mediaId: args.mediaId });
    },
  },
  {
    name: "zernio_get_gmb_attributes",
    description: "Get business attributes for a Google My Business location (amenities, accessibility, etc.).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
    }),
    handler: async (args: { accountId: string; locationId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-attributes`, undefined, { locationId: args.locationId });
    },
  },
  {
    name: "zernio_update_gmb_attributes",
    description: "Update business attributes for a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      attributes: z.string().describe("JSON string of attributes to update"),
    }),
    handler: async (args: { accountId: string; locationId: string; attributes: string }) => {
      return zernioRequest("PUT", `/v1/accounts/${args.accountId}/gmb-attributes`, { locationId: args.locationId, attributes: args.attributes });
    },
  },
  {
    name: "zernio_get_gmb_place_actions",
    description: "Get place action links for a Google My Business location (order food, book appointment, etc.).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
    }),
    handler: async (args: { accountId: string; locationId: string }) => {
      return zernioRequest("GET", `/v1/accounts/${args.accountId}/gmb-place-actions`, undefined, { locationId: args.locationId });
    },
  },
  {
    name: "zernio_create_gmb_place_action",
    description: "Create a place action link for a Google My Business location (e.g. order food URL, booking URL).",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      actionType: z.string().describe("The action type (e.g. 'ORDER', 'BOOK', 'SHOP')"),
      url: z.string().describe("The URL for the action link"),
    }),
    handler: async (args: { accountId: string; locationId: string; actionType: string; url: string }) => {
      return zernioRequest("POST", `/v1/accounts/${args.accountId}/gmb-place-actions`, { locationId: args.locationId, actionType: args.actionType, url: args.url });
    },
  },
  {
    name: "zernio_delete_gmb_place_action",
    description: "Delete a place action link from a Google My Business location.",
    inputSchema: z.object({
      accountId: z.string().describe("The Zernio Google Business account ID"),
      locationId: z.string().describe("The GMB location ID"),
      actionId: z.string().describe("The place action ID to delete"),
    }),
    handler: async (args: { accountId: string; locationId: string; actionId: string }) => {
      return zernioRequest("DELETE", `/v1/accounts/${args.accountId}/gmb-place-actions`, { locationId: args.locationId, actionId: args.actionId });
    },
  },
];
