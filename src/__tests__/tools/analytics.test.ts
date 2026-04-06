import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { analyticsTools } from "../../tools/analytics.js";

const mockRequest = vi.mocked(zernioRequest);

describe("analyticsTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 16 tools", () => {
    expect(analyticsTools).toHaveLength(16);
  });

  it("has no duplicate tool names", () => {
    const names = analyticsTools.map((t: any) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  // 1. zernio_get_post_analytics
  describe("zernio_get_post_analytics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_post_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_post_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "acc-123",
        postId: "post-1",
        platform: "instagram",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics", undefined, {
        accountId: "acc-123",
        postId: "post-1",
        platform: "instagram",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics", undefined, {
        accountId: "acc-123",
        postId: undefined,
        platform: undefined,
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 2. zernio_get_follower_analytics
  describe("zernio_get_follower_analytics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_follower_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_follower_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/follower-stats", undefined, {
        accountIds: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/follower-stats", undefined, {
        accountIds: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 3. zernio_get_best_times_to_post
  describe("zernio_get_best_times_to_post", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_best_times_to_post")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_best_times_to_post");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", platform: "tiktok" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/best-time", undefined, {
        accountId: "acc-123",
        platform: "tiktok",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/best-time", undefined, {
        accountId: "acc-123",
        platform: undefined,
      });
    });
  });

  // 4. zernio_get_daily_metrics
  describe("zernio_get_daily_metrics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_daily_metrics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_daily_metrics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-01-31",
        platform: "facebook",
      });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/daily-metrics", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-01-31",
        platform: "facebook",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/daily-metrics", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
        platform: undefined,
      });
    });
  });

  // 5. zernio_get_content_decay
  describe("zernio_get_content_decay", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_content_decay")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_content_decay");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/content-decay", undefined, {
        accountId: "acc-123",
        postId: "post-1",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/content-decay", undefined, {
        accountId: "acc-123",
        postId: undefined,
      });
    });
  });

  // 6. zernio_get_instagram_insights
  describe("zernio_get_instagram_insights", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_instagram_insights")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_instagram_insights");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-03-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/instagram/account-insights", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-03-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/instagram/account-insights", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 7. zernio_get_instagram_demographics
  describe("zernio_get_instagram_demographics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_instagram_demographics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_instagram_demographics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/instagram/demographics", undefined, {
        accountId: "acc-123",
      });
    });
  });

  // 8. zernio_get_google_business_performance
  describe("zernio_get_google_business_performance", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_google_business_performance")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_google_business_performance");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-06-30" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/googlebusiness/performance", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-06-30",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/googlebusiness/performance", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 9. zernio_get_google_business_keywords
  describe("zernio_get_google_business_keywords", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_google_business_keywords")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_google_business_keywords");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-06-30" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/googlebusiness/search-keywords", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-06-30",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/googlebusiness/search-keywords", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 10. zernio_get_youtube_analytics
  describe("zernio_get_youtube_analytics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_youtube_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_youtube_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", videoId: "vid-abc", dateFrom: "2024-01-01", dateTo: "2024-03-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/youtube/daily-views", undefined, {
        accountId: "acc-123",
        videoId: "vid-abc",
        dateFrom: "2024-01-01",
        dateTo: "2024-03-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123", videoId: "vid-abc" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/youtube/daily-views", undefined, {
        accountId: "acc-123",
        videoId: "vid-abc",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 11. zernio_get_youtube_demographics
  describe("zernio_get_youtube_demographics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_youtube_demographics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_youtube_demographics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/youtube/demographics", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/youtube/demographics", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 12. zernio_get_linkedin_analytics
  describe("zernio_get_linkedin_analytics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_linkedin_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_linkedin_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-06-30" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-aggregate-analytics", undefined, {
        dateFrom: "2024-01-01",
        dateTo: "2024-06-30",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-456" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-456/linkedin-aggregate-analytics", undefined, {
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 13. zernio_get_linkedin_post_analytics
  describe("zernio_get_linkedin_post_analytics", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_linkedin_post_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_linkedin_post_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-06-30" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-post-analytics", undefined, {
        dateFrom: "2024-01-01",
        dateTo: "2024-06-30",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-456" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-456/linkedin-post-analytics", undefined, {
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });

  // 14. zernio_get_linkedin_post_reactions
  describe("zernio_get_linkedin_post_reactions", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_linkedin_post_reactions")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_linkedin_post_reactions");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-post-reactions", undefined, {
        postId: "post-1",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-post-reactions", undefined, {
        postId: undefined,
      });
    });
  });

  // 15. zernio_get_post_timeline
  describe("zernio_get_post_timeline", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_post_timeline")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_post_timeline");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", postId: "post-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/post-timeline", undefined, {
        accountId: "acc-123",
        postId: "post-1",
      });
    });
  });

  // 16. zernio_get_posting_frequency
  describe("zernio_get_posting_frequency", () => {
    const tool = analyticsTools.find((t: any) => t.name === "zernio_get_posting_frequency")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_posting_frequency");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/posting-frequency", undefined, {
        accountId: "acc-123",
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/analytics/posting-frequency", undefined, {
        accountId: "acc-123",
        dateFrom: undefined,
        dateTo: undefined,
      });
    });
  });
});
