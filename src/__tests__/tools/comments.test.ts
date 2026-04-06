import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { commentTools } from "../../tools/comments.js";

const mockRequest = vi.mocked(zernioRequest);

describe("commentTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 7 tools", () => {
    expect(commentTools).toHaveLength(7);
  });

  it("has no duplicate tool names", () => {
    const names = commentTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_commented_posts", () => {
    const tool = commentTools.find((t) => t.name === "zernio_list_commented_posts")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        platform: "instagram",
        accountId: "acc-1",
        minComments: 5,
        since: "2024-01-01",
        sortBy: "mostCommented",
        limit: 10,
      });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/inbox/comments", undefined, {
        platform: "instagram",
        accountId: "acc-1",
        minComments: 5,
        since: "2024-01-01",
        sortBy: "mostCommented",
        limit: 10,
      });
    });

    it("handles optional params as undefined", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/inbox/comments", undefined, {
        platform: undefined,
        accountId: undefined,
        minComments: undefined,
        since: undefined,
        sortBy: undefined,
        limit: undefined,
      });
    });
  });

  describe("zernio_get_post_comments", () => {
    const tool = commentTools.find((t) => t.name === "zernio_get_post_comments")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-123", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/inbox/comments/post-123",
        undefined,
        { accountId: "acc-1" }
      );
    });
  });

  describe("zernio_reply_to_comment", () => {
    const tool = commentTools.find((t) => t.name === "zernio_reply_to_comment")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ commentId: "c-1", message: "Thanks!", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/comments/c-1/reply",
        { message: "Thanks!", accountId: "acc-1" }
      );
    });
  });

  describe("zernio_private_reply_to_comment", () => {
    const tool = commentTools.find((t) => t.name === "zernio_private_reply_to_comment")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ commentId: "c-2", message: "DM reply", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/comments/c-2/private-reply",
        { message: "DM reply", accountId: "acc-1" }
      );
    });
  });

  describe("zernio_like_comment", () => {
    const tool = commentTools.find((t) => t.name === "zernio_like_comment")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ commentId: "c-3", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/comments/c-3/like",
        { accountId: "acc-1" }
      );
    });
  });

  describe("zernio_hide_comment", () => {
    const tool = commentTools.find((t) => t.name === "zernio_hide_comment")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ commentId: "c-4", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/comments/c-4/hide",
        { accountId: "acc-1" }
      );
    });
  });

  describe("zernio_delete_comment", () => {
    const tool = commentTools.find((t) => t.name === "zernio_delete_comment")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ commentId: "c-5", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "DELETE",
        "/v1/inbox/comments/c-5",
        { accountId: "acc-1" }
      );
    });
  });
});
