import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
  zernioMultipart: vi.fn().mockResolvedValue({ total: 1, valid: 1, invalid: 0, results: [], warnings: [] }),
}));

import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { zernioRequest, zernioMultipart } from "../../client.js";
import { postTools, toCsv, parseCsvRecords } from "../../tools/posts.js";

const mockRequest = vi.mocked(zernioRequest);
const mockMultipart = vi.mocked(zernioMultipart);

describe("postTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
    mockMultipart.mockClear();
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
        content: "Hello!",
        platforms: [{ platform: "twitter", accountId: "acc-1" }],
        mediaItems: [{ type: "image", url: "https://media.zernio.com/test.jpg" }],
        publishNow: true,
        tags: ["promo"],
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts", {
        content: "Hello!",
        title: undefined,
        platforms: [{ platform: "twitter", accountId: "acc-1" }],
        mediaItems: [{ type: "image", url: "https://media.zernio.com/test.jpg" }],
        scheduledFor: undefined,
        publishNow: true,
        isDraft: undefined,
        tags: ["promo"],
        timezone: undefined,
      });
    });
  });

  describe("zernio_update_post", () => {
    const tool = postTools.find((t) => t.name === "zernio_update_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", content: "Updated", mediaItems: undefined, scheduledFor: undefined, tags: undefined });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/posts/post-1", {
        content: "Updated", mediaItems: undefined, scheduledFor: undefined, tags: undefined,
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
    const sentCsv = async () => {
      const [path, form, params] = mockMultipart.mock.calls[0];
      return { path, params, file: (form as FormData).get("file") as File };
    };
    it("uploads rows as a CSV file with dryRun", async () => {
      await tool.handler({
        rows: [
          { post_content: 'Hello, "world"', platforms: "instagram", profiles: "P", schedule_time: "2026-09-01 10:00", tz: "America/New_York" },
          { post_content: "Two", platforms: "linkedin", profiles: "P", is_draft: true },
        ],
        dryRun: true,
      });
      expect(mockRequest).not.toHaveBeenCalled();
      const { path, params, file } = await sentCsv();
      expect(path).toBe("/v1/posts/bulk-upload");
      expect(params).toEqual({ dryRun: true });
      expect(file.name).toBe("posts.csv");
      expect(await file.text()).toBe(
        'post_content,platforms,profiles,schedule_time,tz,is_draft\r\n"Hello, ""world""",instagram,P,2026-09-01 10:00,America/New_York,\r\nTwo,linkedin,P,,,true\r\n'
      );
    });
    it("uploads a CSV file as given", async () => {
      const dir = mkdtempSync(join(tmpdir(), "zbulk-"));
      const f = join(dir, "week.csv");
      writeFileSync(f, "post_content,platforms,profiles,is_draft\nhi,instagram,P,true\n");
      await tool.handler({ csvPath: f });
      const { file } = await sentCsv();
      expect(file.name).toBe("week.csv");
      expect(await file.text()).toBe("post_content,platforms,profiles,is_draft\nhi,instagram,P,true\n");
    });
    it("refuses a facebook.com link in a Facebook row, naming the row, before uploading", async () => {
      await expect(tool.handler({ rows: [
        { post_content: "ok", platforms: "facebook", profiles: "P", is_draft: true },
        { post_content: "https://www.facebook.com/x/posts/1", platforms: "instagram, facebook", profiles: "P", is_draft: true },
      ] })).rejects.toThrow(/Row 2: .*1609008/);
      await expect(tool.handler({ rows: [{ post_content: "x", custom_content_facebook: "fb.watch/a", platforms: "facebook", profiles: "P", is_draft: true }] })).rejects.toThrow(/1609008/);
      const dir = mkdtempSync(join(tmpdir(), "zbulk-"));
      const f = join(dir, "fb.csv");
      writeFileSync(f, 'post_content,platforms,profiles,is_draft\n"see https://facebook.com/a, now",facebook,P,true\n');
      await expect(tool.handler({ csvPath: f })).rejects.toThrow(/Row 1: .*1609008/);
      expect(mockMultipart).not.toHaveBeenCalled();
    });
    it("lets a facebook.com link through for other platforms or own Facebook text", async () => {
      await tool.handler({ rows: [
        { post_content: "https://facebook.com/x", platforms: "linkedin", profiles: "P", is_draft: true },
        { post_content: "https://facebook.com/x", custom_content_facebook: "our news", platforms: "facebook,linkedin", profiles: "P", is_draft: true },
      ] });
      expect(mockMultipart).toHaveBeenCalledTimes(1);
    });
    it("needs exactly one of rows or csvPath, and at least one row", async () => {
      await expect(tool.handler({})).rejects.toThrow(/exactly one/);
      await expect(tool.handler({ rows: [{ a: "1" }], csvPath: "/x.csv" })).rejects.toThrow(/exactly one/);
      await expect(tool.handler({ rows: [] })).rejects.toThrow(/No rows/);
    });
  });

  describe("CSV helpers", () => {
    it("round-trips quotes, commas and line breaks", () => {
      const rows = [{ a: 'x "q"', b: "1,2", c: "line\nbreak" }, { a: "plain", b: "", c: "" }];
      expect(parseCsvRecords(toCsv(rows))).toEqual(rows);
    });
    it("reads a BOM, CRLF and blank lines", () => {
      expect(parseCsvRecords("\uFEFFa,b\r\n1,2\r\n\r\n3,4")).toEqual([{ a: "1", b: "2" }, { a: "3", b: "4" }]);
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
      await tool.handler({ postId: "post-1", platform: "facebook" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/posts/post-1/unpublish", { platform: "facebook" });
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

  describe("zernio_create_post facebook links", () => {
    const tool = postTools.find((t) => t.name === "zernio_create_post")!;
    it("refuses a facebook.com link for a Facebook target, before any request", async () => {
      mockRequest.mockClear();
      for (const content of ["see https://www.facebook.com/groups/1/posts/2", "fb.watch/abc", "m.facebook.com/events/9"]) {
        await expect(tool.handler({ content, platforms: [{ platform: "facebook", accountId: "a" }] })).rejects.toThrow(/1609008/);
      }
      await expect(tool.handler({ content: "hi", platforms: [{ platform: "Facebook", accountId: "a", customContent: "https://facebook.com/x" }] })).rejects.toThrow(/1609008/);
      expect(mockRequest).not.toHaveBeenCalled();
    });
    it("allows the link for other platforms, or when the Facebook text drops it", async () => {
      mockRequest.mockClear();
      await tool.handler({ content: "https://facebook.com/x", platforms: [{ platform: "linkedin", accountId: "l" }] });
      await tool.handler({ content: "https://facebook.com/x", platforms: [{ platform: "facebook", accountId: "a", customContent: "our news" }] });
      await tool.handler({ content: "notfacebook.company.example", platforms: [{ platform: "facebook", accountId: "a" }] });
      expect(mockRequest).toHaveBeenCalledTimes(3);
    });
  });
});
