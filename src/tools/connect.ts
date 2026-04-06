import { z } from "zod";
import { zernioRequest } from "../client.js";

export const connectTools = [
  {
    name: "zernio_get_connect_url",
    description: "Get the OAuth authorization URL for connecting a social media account to a Zernio profile. Returns a URL the user must open in their browser to authorize.",
    inputSchema: z.object({
      platform: z.string().describe("Platform to connect: twitter, instagram, facebook, linkedin, tiktok, youtube, pinterest, reddit, bluesky, threads, googlebusiness, telegram, snapchat, whatsapp"),
      profileId: z.string().describe("The Zernio profile ID to attach the account to"),
    }),
    handler: async (args: { platform: string; profileId: string }) => {
      return zernioRequest("GET", `/v1/connect/${args.platform}`, undefined, { profileId: args.profileId });
    },
  },
  {
    name: "zernio_connect_bluesky",
    description: "Connect a Bluesky account using username and app password (Bluesky uses credentials instead of OAuth).",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID to attach the account to"),
      username: z.string().describe("Bluesky username/handle (e.g. user.bsky.social)"),
      appPassword: z.string().describe("Bluesky app password (generate in Bluesky Settings -> App Passwords)"),
    }),
    handler: async (args: { profileId: string; username: string; appPassword: string }) => {
      return zernioRequest("POST", "/v1/connect/bluesky/credentials", {
        profileId: args.profileId,
        username: args.username,
        appPassword: args.appPassword,
      });
    },
  },
  {
    name: "zernio_connect_telegram_start",
    description: "Start Telegram bot connection -- returns a Zernio bot connection code that the user must send to the Zernio Telegram bot to authorize.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID to attach the Telegram account to"),
    }),
    handler: async (args: { profileId: string }) => {
      return zernioRequest("GET", "/v1/connect/telegram", undefined, { profileId: args.profileId });
    },
  },
  {
    name: "zernio_connect_telegram_verify",
    description: "Complete Telegram bot connection by submitting the verification code after the user has messaged the Zernio bot.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID"),
      code: z.string().describe("The verification code returned by the Zernio Telegram bot"),
    }),
    handler: async (args: { profileId: string; code: string }) => {
      return zernioRequest("PATCH", `/v1/connect/telegram`, { profileId: args.profileId, code: args.code });
    },
  },
  {
    name: "zernio_check_telegram_connection",
    description: "Check if a Telegram account has been successfully connected after starting the connection flow.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID to check"),
    }),
    handler: async (args: { profileId: string }) => {
      return zernioRequest("POST", "/v1/connect/telegram", { profileId: args.profileId });
    },
  },
  {
    name: "zernio_connect_whatsapp",
    description: "Connect a WhatsApp Business account by providing Meta Business credentials.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID to attach WhatsApp to"),
      accessToken: z.string().describe("Meta/WhatsApp Business access token"),
      businessAccountId: z.string().describe("WhatsApp Business Account ID (WABA ID)"),
    }),
    handler: async (args: { profileId: string; accessToken: string; businessAccountId: string }) => {
      return zernioRequest("POST", "/v1/connect/whatsapp/credentials", {
        profileId: args.profileId,
        accessToken: args.accessToken,
        businessAccountId: args.businessAccountId,
      });
    },
  },
  {
    name: "zernio_list_facebook_pages_for_connect",
    description: "After starting Facebook OAuth, list available Facebook Pages to choose which one to connect.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID from the OAuth flow"),
    }),
    handler: async (args: { profileId: string }) => {
      return zernioRequest("GET", "/v1/connect/facebook/select-page", undefined, { profileId: args.profileId });
    },
  },
  {
    name: "zernio_select_facebook_page",
    description: "Select a specific Facebook Page to connect after the OAuth flow lists available pages.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID"),
      pageId: z.string().describe("The Facebook Page ID to connect"),
    }),
    handler: async (args: { profileId: string; pageId: string }) => {
      return zernioRequest("POST", "/v1/connect/facebook/select-page", {
        profileId: args.profileId,
        pageId: args.pageId,
      });
    },
  },
  {
    name: "zernio_list_snapchat_profiles_for_connect",
    description: "After starting Snapchat OAuth, list available Snapchat profiles/accounts to choose which one to connect.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID from the OAuth flow"),
    }),
    handler: async (args: { profileId: string }) => {
      return zernioRequest("GET", "/v1/connect/snapchat/select-profile", undefined, { profileId: args.profileId });
    },
  },
  {
    name: "zernio_select_snapchat_profile",
    description: "Select a specific Snapchat profile to connect after the OAuth flow lists available profiles.",
    inputSchema: z.object({
      profileId: z.string().describe("The Zernio profile ID"),
      snapchatProfileId: z.string().describe("The Snapchat profile/account ID to connect"),
    }),
    handler: async (args: { profileId: string; snapchatProfileId: string }) => {
      return zernioRequest("POST", "/v1/connect/snapchat/select-profile", {
        profileId: args.profileId,
        snapchatProfileId: args.snapchatProfileId,
      });
    },
  },
];
