import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { accountTools } from "../../tools/accounts.js";

const mockRequest = vi.mocked(zernioRequest);

describe("accountTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 20 tools", () => {
    expect(accountTools).toHaveLength(20);
  });

  it("has no duplicate tool names", () => {
    const names = accountTools.map((t: any) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  // 1. zernio_list_accounts
  describe("zernio_list_accounts", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_list_accounts")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_list_accounts");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ platform: "instagram" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts", undefined, { platform: "instagram" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts", undefined, { platform: undefined });
    });
  });

  // 2. zernio_get_follower_stats
  describe("zernio_get_follower_stats", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_follower_stats")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_follower_stats");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/follower-stats", undefined, { accountIds: "acc-123" });
    });
  });

  // 3. zernio_get_account_health
  describe("zernio_get_account_health", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_account_health")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_account_health");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/health", undefined, { accountId: "acc-123" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({});
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/health", undefined, { accountId: undefined });
    });
  });

  // 4. zernio_get_linkedin_mentions
  describe("zernio_get_linkedin_mentions", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_linkedin_mentions")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_linkedin_mentions");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-mentions", undefined, { dateFrom: "2024-01-01", dateTo: "2024-12-31" });
    });

    it("calls zernioRequest correctly without optional params", async () => {
      await tool.handler({ accountId: "acc-456" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-456/linkedin-mentions", undefined, { dateFrom: undefined, dateTo: undefined });
    });
  });

  // 5. zernio_get_facebook_page
  describe("zernio_get_facebook_page", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_facebook_page")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_facebook_page");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/facebook-page");
    });
  });

  // 6. zernio_get_linkedin_organizations
  describe("zernio_get_linkedin_organizations", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_linkedin_organizations")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_linkedin_organizations");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/linkedin-organizations");
    });
  });

  // 7. zernio_get_reddit_flairs
  describe("zernio_get_reddit_flairs", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_reddit_flairs")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_reddit_flairs");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", subreddit: "typescript" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/reddit-flairs", undefined, { subreddit: "typescript" });
    });
  });

  // 8. zernio_get_gmb_locations
  describe("zernio_get_gmb_locations", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_locations")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_gmb_locations");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-locations");
    });
  });

  // 9. zernio_get_pinterest_boards
  describe("zernio_get_pinterest_boards", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_pinterest_boards")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_pinterest_boards");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/pinterest-boards");
    });
  });

  // 10. zernio_get_youtube_playlists
  describe("zernio_get_youtube_playlists", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_youtube_playlists")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_youtube_playlists");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/youtube-playlists");
    });
  });

  // 11. zernio_get_tiktok_creator_info
  describe("zernio_get_tiktok_creator_info", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_tiktok_creator_info")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_tiktok_creator_info");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/tiktok-creator-info");
    });
  });

  // 12. zernio_get_messenger_menu
  describe("zernio_get_messenger_menu", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_messenger_menu")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_messenger_menu");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/messenger-menu");
    });
  });

  // 13. zernio_set_messenger_menu
  describe("zernio_set_messenger_menu", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_messenger_menu")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_set_messenger_menu");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      const menuItems = [{ title: "Help", payload: "HELP" }, { title: "FAQ", payload: "FAQ" }];
      await tool.handler({ accountId: "acc-123", menuItems });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/accounts/acc-123/messenger-menu", { menuItems });
    });
  });

  // 14. zernio_delete_messenger_menu
  describe("zernio_delete_messenger_menu", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_delete_messenger_menu")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_delete_messenger_menu");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123/messenger-menu");
    });
  });

  // 15. zernio_get_telegram_commands
  describe("zernio_get_telegram_commands", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_telegram_commands")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_telegram_commands");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/telegram-commands");
    });
  });

  // 16. zernio_set_telegram_commands
  describe("zernio_set_telegram_commands", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_telegram_commands")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_set_telegram_commands");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      const commands = [{ command: "start", description: "Start the bot" }, { command: "help", description: "Get help" }];
      await tool.handler({ accountId: "acc-123", commands });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/accounts/acc-123/telegram-commands", { commands });
    });
  });

  // 17. zernio_delete_telegram_commands
  describe("zernio_delete_telegram_commands", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_delete_telegram_commands")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_delete_telegram_commands");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123/telegram-commands");
    });
  });

  // 18. zernio_get_instagram_ice_breakers
  describe("zernio_get_instagram_ice_breakers", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_instagram_ice_breakers")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_get_instagram_ice_breakers");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/instagram-ice-breakers");
    });
  });

  // 19. zernio_set_instagram_ice_breakers
  describe("zernio_set_instagram_ice_breakers", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_instagram_ice_breakers")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_set_instagram_ice_breakers");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      const iceBreakers = [{ question: "What are your hours?", payload: "HOURS" }];
      await tool.handler({ accountId: "acc-123", iceBreakers });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/accounts/acc-123/instagram-ice-breakers", { iceBreakers });
    });
  });

  // 20. zernio_delete_instagram_ice_breakers
  describe("zernio_delete_instagram_ice_breakers", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_delete_instagram_ice_breakers")!;

    it("exists with correct name", () => {
      expect(tool).toBeDefined();
      expect(tool.name).toBe("zernio_delete_instagram_ice_breakers");
    });

    it("has a description", () => {
      expect(tool.description).toBeTruthy();
    });

    it("has a valid input schema", () => {
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123/instagram-ice-breakers");
    });
  });
});
