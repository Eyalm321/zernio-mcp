import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { reviewTools } from "../../tools/reviews.js";

const mockRequest = vi.mocked(zernioRequest);

describe("reviewTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 3 tools", () => {
    expect(reviewTools).toHaveLength(3);
  });

  it("has no duplicate tool names", () => {
    const names = reviewTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_reviews", () => {
    const tool = reviewTools.find((t) => t.name === "zernio_list_reviews")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly with all params", async () => {
      await tool.handler({
        accountId: "acc-1",
        platform: "googlebusiness",
        minRating: 4,
        since: "2024-01-01",
        sortBy: "rating",
        limit: 10,
      });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/inbox/reviews", undefined, {
        accountId: "acc-1",
        platform: "googlebusiness",
        minRating: 4,
        since: "2024-01-01",
        sortBy: "rating",
        limit: 10,
      });
    });

    it("handles optional params as undefined", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/inbox/reviews", undefined, {
        accountId: undefined,
        platform: undefined,
        minRating: undefined,
        since: undefined,
        sortBy: undefined,
        limit: undefined,
      });
    });
  });

  describe("zernio_reply_to_review", () => {
    const tool = reviewTools.find((t) => t.name === "zernio_reply_to_review")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ reviewId: "rev-1", accountId: "acc-1", message: "Thank you!" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/reviews/rev-1/reply",
        { accountId: "acc-1", message: "Thank you!" }
      );
    });
  });

  describe("zernio_delete_review_reply", () => {
    const tool = reviewTools.find((t) => t.name === "zernio_delete_review_reply")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ reviewId: "rev-1", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "DELETE",
        "/v1/inbox/reviews/rev-1/reply",
        { accountId: "acc-1" }
      );
    });
  });
});
