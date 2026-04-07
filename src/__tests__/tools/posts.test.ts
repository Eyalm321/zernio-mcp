import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { postTools } from "../../tools/posts.js";

const mockRequest = vi.mocked(zernioRequest);

describe("postTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 26 tools", () => {
    expect(postTools).toHaveLength(26);
  });

  it("has no duplicate tool names", () => {
    const names = postTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_posts", () => {
    const tool = postTools.find((t) => t.name === "zernio_list_posts")!;
    it("exists with description and schema", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", status: "published", limit: 10, dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts", undefined, {
        accountId: "acc-1", status: "published", limit: 10, dateFrom: "2024-01-01", dateTo: "2024-12-31",
      });
    });
  });

  describe("zernio_get_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_get_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/post-1");
    });
  });

  describe("zernio_create_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_create_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountIds: ["acc-1", "acc-2"], content: "Hello!", scheduledAt: "2024-12-01T10:00:00Z",
        mediaIds: ["m-1"], tags: ["promo"],
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts", {
        accountIds: ["acc-1", "acc-2"], content: "Hello!", scheduledAt: "2024-12-01T10:00:00Z",
        mediaIds: ["m-1"], tags: ["promo"],
      });
    });
  });

  describe("zernio_update_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_update_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", content: "Updated", scheduledAt: undefined, mediaIds: undefined, tags: undefined });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/posts/post-1", {
        content: "Updated", scheduledAt: undefined, mediaIds: undefined, tags: undefined,
      });
    });
  });

  describe("zernio_delete_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_delete_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/posts/post-1");
    });
  });

  describe("zernio_publish_post_now", () => {
    const tool = postTools.find((t) => t.name === "zernio_publish_post_now")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/publish");
    });
  });

  describe("zernio_duplicate_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_duplicate_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/duplicate");
    });
  });

  describe("zernio_retry_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_retry_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/retry");
    });
  });

  describe("zernio_list_post_queue", () => {
    const tool = postTools.find((t) => t.name === "zernio_list_post_queue")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", limit: 20 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/queue", undefined, {
        accountId: "acc-1", limit: 20,
      });
    });
  });

  describe("zernio_upload_media", () => {
    const tool = postTools.find((t) => t.name === "zernio_upload_media")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ url: "https://example.com/img.jpg", type: "image", altText: "A photo" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/media", {
        url: "https://example.com/img.jpg", type: "image", altText: "A photo",
      });
    });
  });

  describe("zernio_get_media_presigned_url", () => {
    const tool = postTools.find((t) => t.name === "zernio_get_media_presigned_url")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ filename: "photo.jpg", contentType: "image/jpeg" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/media/presign", {
        filename: "photo.jpg", contentType: "image/jpeg",
      });
    });
  });

  describe("zernio_list_media", () => {
    const tool = postTools.find((t) => t.name === "zernio_list_media")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ type: "image", limit: 50 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/media", undefined, {
        type: "image", limit: 50,
      });
    });
  });

  describe("zernio_delete_media", () => {
    const tool = postTools.find((t) => t.name === "zernio_delete_media")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ mediaId: "media-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/media/media-1");
    });
  });

  describe("zernio_list_post_labels", () => {
    const tool = postTools.find((t) => t.name === "zernio_list_post_labels")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/labels");
    });
  });

  describe("zernio_get_post_approval_status", () => {
    const tool = postTools.find((t) => t.name === "zernio_get_post_approval_status")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/post-1/approval");
    });
  });

  describe("zernio_approve_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_approve_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", note: "Looks good!" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/approve", { note: "Looks good!" });
    });
  });

  describe("zernio_reject_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_reject_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", reason: "Needs revision" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/reject", { reason: "Needs revision" });
    });
  });

  describe("zernio_validate_post_content", () => {
    const tool = postTools.find((t) => t.name === "zernio_validate_post_content")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ content: "Test post", platform: "instagram", mediaIds: ["m-1"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/validate", {
        content: "Test post", platform: "instagram", mediaIds: ["m-1"],
      });
    });
  });

  describe("zernio_bulk_upload_posts", () => {
    const tool = postTools.find((t) => t.name === "zernio_bulk_upload_posts")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      const posts = [
        { accountIds: ["acc-1"], content: "Post 1", scheduledAt: "2024-12-01T10:00:00Z", mediaIds: undefined, tags: undefined },
        { accountIds: ["acc-2"], content: "Post 2", scheduledAt: undefined, mediaIds: ["m-1"], tags: ["tag1"] },
      ];
      await tool.handler({ posts });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/bulk-upload", { posts });
    });
  });

  describe("zernio_edit_published_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_edit_published_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", content: "Edited content", mediaIds: ["m-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/edit", {
        content: "Edited content", mediaIds: ["m-2"],
      });
    });
  });

  describe("zernio_unpublish_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_unpublish_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/unpublish");
    });
  });

  describe("zernio_update_post_metadata", () => {
    const tool = postTools.find((t) => t.name === "zernio_update_post_metadata")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", tags: ["promo"], labels: ["important"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/update-metadata", {
        tags: ["promo"], labels: ["important"],
      });
    });
  });

  describe("zernio_get_post_logs", () => {
    const tool = postTools.find((t) => t.name === "zernio_get_post_logs")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", limit: 25 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/post-1/logs", undefined, { limit: 25 });
    });
  });

  describe("zernio_get_publishing_logs", () => {
    const tool = postTools.find((t) => t.name === "zernio_get_publishing_logs")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ since: "2024-01-01", until: "2024-12-31", limit: 50 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/posts/logs", undefined, {
        since: "2024-01-01", until: "2024-12-31", limit: 50,
      });
    });
  });

  describe("zernio_upload_media_direct", () => {
    const tool = postTools.find((t) => t.name === "zernio_upload_media_direct")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("has a valid input schema", () => { expect(tool.inputSchema).toBeDefined(); });
  });

  describe("zernio_upload_media_from_file", () => {
    const tool = postTools.find((t) => t.name === "zernio_upload_media_from_file")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("has a valid input schema", () => { expect(tool.inputSchema).toBeDefined(); });
  });
});
