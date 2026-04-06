import { z } from "zod";
import { zernioRequest } from "../client.js";

export const validationTools = [
  {
    name: "zernio_validate_post_length",
    description: "Validate that post content meets a platform's character length requirements.",
    inputSchema: z.object({
      content: z.string().describe("The post content to validate"),
      platform: z.string().describe("The target platform: facebook, instagram, twitter, linkedin, tiktok, etc."),
    }),
    handler: async (args: { content: string; platform: string }) => {
      return zernioRequest("POST", "/v1/tools/validate/post-length", {
        content: args.content,
        platform: args.platform,
      });
    },
  },
  {
    name: "zernio_validate_post",
    description: "Validate post content against all platform rules before publishing (character limits, hashtag limits, media requirements, etc.).",
    inputSchema: z.object({
      content: z.string().describe("The post content to validate"),
      platform: z.string().describe("The target platform: facebook, instagram, twitter, linkedin, tiktok, etc."),
      mediaIds: z.array(z.string()).optional().describe("Media IDs to include in validation"),
    }),
    handler: async (args: { content: string; platform: string; mediaIds?: string[] }) => {
      return zernioRequest("POST", "/v1/tools/validate/post", {
        content: args.content,
        platform: args.platform,
        mediaIds: args.mediaIds,
      });
    },
  },
  {
    name: "zernio_validate_media",
    description: "Validate media files against platform requirements (file size, dimensions, format, duration, etc.).",
    inputSchema: z.object({
      mediaIds: z.array(z.string()).describe("Media IDs to validate"),
    }),
    handler: async (args: { mediaIds: string[] }) => {
      return zernioRequest("POST", "/v1/tools/validate/media", {
        mediaIds: args.mediaIds,
      });
    },
  },
  {
    name: "zernio_validate_subreddit",
    description: "Validate that a subreddit exists and check its posting rules and requirements.",
    inputSchema: z.object({
      subreddit: z.string().describe("The subreddit name to validate (without r/)"),
    }),
    handler: async (args: { subreddit: string }) => {
      return zernioRequest("GET", "/v1/tools/validate/subreddit", undefined, { subreddit: args.subreddit });
    },
  },
];
