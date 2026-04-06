import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { redditTools } from "../../tools/reddit.js";

const mockRequest = vi.mocked(zernioRequest);

describe("redditTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 2 tools", () => {
    expect(redditTools).toHaveLength(2);
  });

  it("has no duplicate tool names", () => {
    const names = redditTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_search_reddit", () => {
    const tool = redditTools.find((t) => t.name === "zernio_search_reddit")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", query: "vitest", subreddit: "javascript", limit: 10 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/reddit/search", undefined, {
        accountId: "acc-1",
        query: "vitest",
        subreddit: "javascript",
        limit: 10,
      });
    });
  });

  describe("zernio_get_reddit_feed", () => {
    const tool = redditTools.find((t) => t.name === "zernio_get_reddit_feed")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", subreddit: "typescript", limit: 25, after: "t3_abc123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/reddit/feed", undefined, {
        accountId: "acc-1",
        subreddit: "typescript",
        limit: 25,
        after: "t3_abc123",
      });
    });
  });
});
