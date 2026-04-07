import { z } from "zod";
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";
import { zernioRequest } from "../client.js";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".webm": "video/webm",
};

export const postTools = [
  {
    name: "zernio_list_posts",
    description: "List all scheduled or published social media posts across connected accounts.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by account ID"),
      status: z.string().optional().describe("Filter by status: draft, scheduled, published, failed"),
      limit: z.number().optional().describe("Max posts to return"),
      dateFrom: z.string().optional().describe("Filter posts from this date (ISO format)"),
      dateTo: z.string().optional().describe("Filter posts to this date (ISO format)"),
    }),
    handler: async (args: { accountId?: string; status?: string; limit?: number; dateFrom?: string; dateTo?: string }) => {
      return zernioRequest("GET", "/v1/posts", undefined, {
        accountId: args.accountId,
        status: args.status,
        limit: args.limit,
        dateFrom: args.dateFrom,
        dateTo: args.dateTo,
      });
    },
  },
  {
    name: "zernio_get_post",
    description: "Get details for a specific post including its content, status, and performance.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("GET", `/v1/posts/${args.postId}`);
    },
  },
  {
    name: "zernio_create_post",
    description: "Create a new social media post (draft or scheduled) for one or more accounts.",
    inputSchema: z.object({
      accountIds: z.array(z.string()).describe("List of account IDs to post to"),
      content: z.string().describe("The post text content"),
      scheduledAt: z.string().optional().describe("ISO datetime to schedule the post (omit to save as draft)"),
      mediaIds: z.array(z.string()).optional().describe("List of media IDs to attach to the post"),
      tags: z.array(z.string()).optional().describe("Tags to label the post"),
    }),
    handler: async (args: { accountIds: string[]; content: string; scheduledAt?: string; mediaIds?: string[]; tags?: string[] }) => {
      return zernioRequest("POST", "/v1/posts", {
        accountIds: args.accountIds,
        content: args.content,
        scheduledAt: args.scheduledAt,
        mediaIds: args.mediaIds,
        tags: args.tags,
      });
    },
  },
  {
    name: "zernio_update_post",
    description: "Update a draft or scheduled post's content, schedule, or media.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to update"),
      content: z.string().optional().describe("Updated post content"),
      scheduledAt: z.string().optional().describe("Updated scheduled time (ISO format)"),
      mediaIds: z.array(z.string()).optional().describe("Updated list of media IDs"),
      tags: z.array(z.string()).optional().describe("Updated tags"),
    }),
    handler: async (args: { postId: string; content?: string; scheduledAt?: string; mediaIds?: string[]; tags?: string[] }) => {
      return zernioRequest("PUT", `/v1/posts/${args.postId}`, {
        content: args.content,
        scheduledAt: args.scheduledAt,
        mediaIds: args.mediaIds,
        tags: args.tags,
      });
    },
  },
  {
    name: "zernio_delete_post",
    description: "Delete a draft or scheduled post.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to delete"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("DELETE", `/v1/posts/${args.postId}`);
    },
  },
  {
    name: "zernio_publish_post_now",
    description: "Publish a draft post immediately instead of waiting for its scheduled time.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to publish now"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/publish`);
    },
  },
  {
    name: "zernio_duplicate_post",
    description: "Duplicate an existing post to create a new draft with the same content.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to duplicate"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/duplicate`);
    },
  },
  {
    name: "zernio_retry_post",
    description: "Retry a failed post -- attempt to republish a post that previously failed to publish.",
    inputSchema: z.object({
      postId: z.string().describe("The failed post ID to retry"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/retry`);
    },
  },
  {
    name: "zernio_list_post_queue",
    description: "Get the scheduled post queue showing upcoming posts in chronological order.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by account ID"),
      limit: z.number().optional().describe("Max posts to return"),
    }),
    handler: async (args: { accountId?: string; limit?: number }) => {
      return zernioRequest("GET", "/v1/posts/queue", undefined, { accountId: args.accountId, limit: args.limit });
    },
  },
  {
    name: "zernio_upload_media",
    description: "Upload a media file (image or video) by URL to use in posts. Returns a media ID.",
    inputSchema: z.object({
      url: z.string().describe("Public URL of the media file to upload"),
      type: z.string().describe("Media type: image or video"),
      altText: z.string().optional().describe("Alt text for accessibility"),
    }),
    handler: async (args: { url: string; type: string; altText?: string }) => {
      return zernioRequest("POST", "/v1/media", { url: args.url, type: args.type, altText: args.altText });
    },
  },
  {
    name: "zernio_get_media_presigned_url",
    description: "Get a presigned URL for directly uploading media files to Zernio storage. Use for large files instead of URL-based upload.",
    inputSchema: z.object({
      filename: z.string().describe("The filename to upload (e.g. 'photo.jpg', 'video.mp4')"),
      contentType: z.string().describe("MIME type (e.g. 'image/jpeg', 'video/mp4')"),
    }),
    handler: async (args: { filename: string; contentType: string }) => {
      return zernioRequest("POST", "/v1/media/presign", { filename: args.filename, contentType: args.contentType });
    },
  },
  {
    name: "zernio_list_media",
    description: "List all uploaded media files in your Zernio media library.",
    inputSchema: z.object({
      type: z.string().optional().describe("Filter by type: image, video"),
      limit: z.number().optional().describe("Max media items to return"),
    }),
    handler: async (args: { type?: string; limit?: number }) => {
      return zernioRequest("GET", "/v1/media", undefined, { type: args.type, limit: args.limit });
    },
  },
  {
    name: "zernio_delete_media",
    description: "Delete a media file from the Zernio media library.",
    inputSchema: z.object({
      mediaId: z.string().describe("The media ID to delete"),
    }),
    handler: async (args: { mediaId: string }) => {
      return zernioRequest("DELETE", `/v1/media/${args.mediaId}`);
    },
  },
  {
    name: "zernio_list_post_labels",
    description: "List all post labels/tags used to organize posts.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/posts/labels");
    },
  },
  {
    name: "zernio_get_post_approval_status",
    description: "Get the approval status of a post (pending, approved, rejected) for team workflows.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("GET", `/v1/posts/${args.postId}/approval`);
    },
  },
  {
    name: "zernio_approve_post",
    description: "Approve a post that is pending review in a team workflow.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to approve"),
      note: z.string().optional().describe("Optional approval note"),
    }),
    handler: async (args: { postId: string; note?: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/approve`, { note: args.note });
    },
  },
  {
    name: "zernio_reject_post",
    description: "Reject a post that is pending review in a team workflow.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to reject"),
      reason: z.string().optional().describe("Reason for rejection"),
    }),
    handler: async (args: { postId: string; reason?: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/reject`, { reason: args.reason });
    },
  },
  {
    name: "zernio_validate_post_content",
    description: "Validate post content against platform rules before publishing.",
    inputSchema: z.object({
      content: z.string().describe("The post content to validate"),
      platform: z.string().describe("The target platform: facebook, instagram, twitter, linkedin, etc."),
      mediaIds: z.array(z.string()).optional().describe("Media IDs to include in validation"),
    }),
    handler: async (args: { content: string; platform: string; mediaIds?: string[] }) => {
      return zernioRequest("POST", "/v1/posts/validate", { content: args.content, platform: args.platform, mediaIds: args.mediaIds });
    },
  },
  {
    name: "zernio_bulk_upload_posts",
    description: "Create multiple social media posts at once in bulk.",
    inputSchema: z.object({
      posts: z.array(z.object({
        accountIds: z.array(z.string()).describe("List of account IDs to post to"),
        content: z.string().describe("The post text content"),
        scheduledAt: z.string().optional().describe("ISO datetime to schedule the post"),
        mediaIds: z.array(z.string()).optional().describe("List of media IDs to attach"),
        tags: z.array(z.string()).optional().describe("Tags to label the post"),
      })).describe("Array of posts to create"),
    }),
    handler: async (args: { posts: Array<{ accountIds: string[]; content: string; scheduledAt?: string; mediaIds?: string[]; tags?: string[] }> }) => {
      return zernioRequest("POST", "/v1/posts/bulk-upload", { posts: args.posts });
    },
  },
  {
    name: "zernio_edit_published_post",
    description: "Edit a post that has already been published.",
    inputSchema: z.object({
      postId: z.string().describe("The published post ID to edit"),
      content: z.string().optional().describe("Updated post content"),
      mediaIds: z.array(z.string()).optional().describe("Updated list of media IDs"),
    }),
    handler: async (args: { postId: string; content?: string; mediaIds?: string[] }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/edit`, { content: args.content, mediaIds: args.mediaIds });
    },
  },
  {
    name: "zernio_unpublish_post",
    description: "Unpublish a previously published post, removing it from the platform.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to unpublish"),
    }),
    handler: async (args: { postId: string }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/unpublish`);
    },
  },
  {
    name: "zernio_update_post_metadata",
    description: "Update a post's metadata such as tags and labels without changing its content.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to update metadata for"),
      tags: z.array(z.string()).optional().describe("Updated tags for the post"),
      labels: z.array(z.string()).optional().describe("Updated labels for the post"),
    }),
    handler: async (args: { postId: string; tags?: string[]; labels?: string[] }) => {
      return zernioRequest("POST", `/v1/posts/${args.postId}/update-metadata`, { tags: args.tags, labels: args.labels });
    },
  },
  {
    name: "zernio_get_post_logs",
    description: "Get the activity logs for a specific post -- publishing attempts, edits, approval changes, etc.",
    inputSchema: z.object({
      postId: z.string().describe("The post ID to get logs for"),
      limit: z.number().optional().describe("Max log entries to return"),
    }),
    handler: async (args: { postId: string; limit?: number }) => {
      return zernioRequest("GET", `/v1/posts/${args.postId}/logs`, undefined, { limit: args.limit });
    },
  },
  {
    name: "zernio_get_publishing_logs",
    description: "Get publishing logs across all posts -- a global view of publishing activity.",
    inputSchema: z.object({
      since: z.string().optional().describe("Start date filter (ISO format)"),
      until: z.string().optional().describe("End date filter (ISO format)"),
      limit: z.number().optional().describe("Max log entries to return"),
    }),
    handler: async (args: { since?: string; until?: string; limit?: number }) => {
      return zernioRequest("GET", "/v1/posts/logs", undefined, { since: args.since, until: args.until, limit: args.limit });
    },
  },
  {
    name: "zernio_upload_media_direct",
    description: "Upload a media file directly using base64 data or a URL for a specific account.",
    inputSchema: z.object({
      accountId: z.string().describe("The account ID to upload media for"),
      file: z.string().describe("The file content as base64 string or a public URL"),
    }),
    handler: async (args: { accountId: string; file: string }) => {
      return zernioRequest("POST", "/v1/media/upload-direct", { accountId: args.accountId, file: args.file });
    },
  },
  {
    name: "zernio_upload_media_from_file",
    description:
      "Upload a local image or video file to Zernio by reading it from disk. Use this when you have a local file path instead of a public URL. The MCP server reads the file, gets a presigned upload URL from Zernio, uploads the file, and returns the media ID ready for use in posts.",
    inputSchema: z.object({
      filePath: z.string().describe("Absolute path to the local image or video file (e.g. /home/user/photos/banner.jpg, C:\\Users\\me\\image.png)"),
      type: z.string().optional().describe("Media type: image or video (auto-detected from file extension if omitted)"),
      altText: z.string().optional().describe("Alt text for accessibility"),
    }),
    handler: async (args: { filePath: string; type?: string; altText?: string }) => {
      const ext = extname(args.filePath).toLowerCase();
      const contentType = MIME_TYPES[ext];
      if (!contentType) {
        throw new Error(`Unsupported file type: ${ext}. Supported: ${Object.keys(MIME_TYPES).join(", ")}`);
      }

      const fileBuffer = readFileSync(args.filePath);
      const filename = basename(args.filePath);

      // Step 1: Get a presigned upload URL from Zernio
      const presigned = await zernioRequest<{ uploadUrl: string; mediaId: string; fileUrl: string }>(
        "POST",
        "/v1/media/presign",
        { filename, contentType }
      );

      // Step 2: Upload the file to the presigned URL
      const uploadRes = await fetch(presigned.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: fileBuffer,
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text().catch(() => "");
        throw new Error(`Upload failed (${uploadRes.status}): ${text}`);
      }

      // Step 3: Register the uploaded media with Zernio
      const mediaType = args.type || (contentType.startsWith("video/") ? "video" : "image");
      const result = await zernioRequest("POST", "/v1/media", {
        url: presigned.fileUrl,
        type: mediaType,
        altText: args.altText,
      });

      return result;
    },
  },
];
