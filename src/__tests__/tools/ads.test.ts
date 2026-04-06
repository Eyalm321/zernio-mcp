import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { adsTools } from "../../tools/ads.js";

const mockRequest = vi.mocked(zernioRequest);

describe("adsTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 13 tools", () => {
    expect(adsTools).toHaveLength(13);
  });

  it("has no duplicate tool names", () => {
    const names = adsTools.map((t: any) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  // 1. zernio_list_ad_accounts
  describe("zernio_list_ad_accounts", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_list_ad_accounts")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_list_ad_accounts");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/accounts");
    });
  });

  // 2. zernio_get_ads_tree
  describe("zernio_get_ads_tree", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_get_ads_tree")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_ads_tree");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/tree", undefined, { accountId: "ad-acc-1" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/tree", undefined, { accountId: undefined });
    });
  });

  // 3. zernio_list_campaigns
  describe("zernio_list_campaigns", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_list_campaigns")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_list_campaigns");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1", status: "active" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/campaigns", undefined, { accountId: "ad-acc-1", status: "active" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/campaigns", undefined, { accountId: undefined, status: undefined });
    });
  });

  // 4. zernio_create_campaign
  describe("zernio_create_campaign", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_create_campaign")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_create_campaign");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "ad-acc-1",
        name: "Summer Sale",
        objective: "traffic",
        budget: 500,
        budgetType: "daily" as const,
        startDate: "2024-06-01",
        endDate: "2024-06-30",
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/campaigns", {
        accountId: "ad-acc-1",
        name: "Summer Sale",
        objective: "traffic",
        budget: 500,
        budgetType: "daily",
        startDate: "2024-06-01",
        endDate: "2024-06-30",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({
        accountId: "ad-acc-1",
        name: "Campaign",
        objective: "awareness",
        budget: 100,
        budgetType: "lifetime" as const,
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/campaigns", {
        accountId: "ad-acc-1",
        name: "Campaign",
        objective: "awareness",
        budget: 100,
        budgetType: "lifetime",
        startDate: undefined,
        endDate: undefined,
      });
    });
  });

  // 5. zernio_update_campaign_status
  describe("zernio_update_campaign_status", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_update_campaign_status")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_update_campaign_status");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ campaignId: "camp-1", status: "paused" as const });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/ads/campaigns/camp-1/status", { status: "paused" });
    });
  });

  // 6. zernio_list_ads
  describe("zernio_list_ads", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_list_ads")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_list_ads");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1", campaignId: "camp-1", status: "active" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads", undefined, { accountId: "ad-acc-1", campaignId: "camp-1", status: "active" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads", undefined, { accountId: undefined, campaignId: undefined, status: undefined });
    });
  });

  // 7. zernio_get_ad
  describe("zernio_get_ad", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_get_ad")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_ad");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ adId: "ad-99" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/ad-99");
    });
  });

  // 8. zernio_get_ad_analytics
  describe("zernio_get_ad_analytics", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_get_ad_analytics")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_ad_analytics");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ adId: "ad-99", dateFrom: "2024-01-01", dateTo: "2024-03-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/ad-99/analytics", undefined, { dateFrom: "2024-01-01", dateTo: "2024-03-31" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ adId: "ad-99" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/ad-99/analytics", undefined, { dateFrom: undefined, dateTo: undefined });
    });
  });

  // 9. zernio_boost_post
  describe("zernio_boost_post", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_boost_post")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_boost_post");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ postId: "post-1", accountId: "ad-acc-1", budget: 50, duration: 7, audienceId: "aud-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/boost", {
        postId: "post-1",
        accountId: "ad-acc-1",
        budget: 50,
        duration: 7,
        audienceId: "aud-1",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ postId: "post-1", accountId: "ad-acc-1", budget: 50, duration: 7 });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/boost", {
        postId: "post-1",
        accountId: "ad-acc-1",
        budget: 50,
        duration: 7,
        audienceId: undefined,
      });
    });
  });

  // 10. zernio_sync_ads
  describe("zernio_sync_ads", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_sync_ads")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_sync_ads");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/sync", undefined, { accountId: "ad-acc-1" });
    });
  });

  // 11. zernio_list_audiences
  describe("zernio_list_audiences", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_list_audiences")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_list_audiences");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/audiences", undefined, { accountId: "ad-acc-1" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/audiences", undefined, { accountId: undefined });
    });
  });

  // 12. zernio_create_audience
  describe("zernio_create_audience", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_create_audience")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_create_audience");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "ad-acc-1", name: "Tech Lovers", type: "custom", description: "People who love tech" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/audiences", {
        accountId: "ad-acc-1",
        name: "Tech Lovers",
        type: "custom",
        description: "People who love tech",
      });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "ad-acc-1", name: "Audience", type: "lookalike" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/ads/audiences", {
        accountId: "ad-acc-1",
        name: "Audience",
        type: "lookalike",
        description: undefined,
      });
    });
  });

  // 13. zernio_get_ad_interests
  describe("zernio_get_ad_interests", () => {
    const tool = adsTools.find((t: any) => t.name === "zernio_get_ad_interests")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_ad_interests");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ query: "fitness" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/interests", undefined, { query: "fitness" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/ads/interests", undefined, { query: undefined });
    });
  });
});
