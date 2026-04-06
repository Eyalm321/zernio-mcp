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

  it("exports 42 tools", () => {
    expect(accountTools).toHaveLength(42);
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

  // 21. zernio_update_account
  describe("zernio_update_account", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_update_account")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", username: "newuser", displayName: "New Name" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123", { username: "newuser", displayName: "New Name" });
    });
  });

  // 22. zernio_disconnect_account
  describe("zernio_disconnect_account", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_disconnect_account")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123");
    });
  });

  // 23. zernio_get_single_account_health
  describe("zernio_get_single_account_health", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_single_account_health")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/health");
    });
  });

  // 24. zernio_get_reddit_subreddits
  describe("zernio_get_reddit_subreddits", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_reddit_subreddits")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/reddit-subreddits");
    });
  });

  // 25. zernio_switch_linkedin_organization
  describe("zernio_switch_linkedin_organization", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_switch_linkedin_organization")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", organizationId: "org-456" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/linkedin-organization", { organizationId: "org-456" });
    });
  });

  // 26. zernio_set_default_pinterest_board
  describe("zernio_set_default_pinterest_board", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_default_pinterest_board")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", boardId: "board-789" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/pinterest-boards", { boardId: "board-789" });
    });
  });

  // 27. zernio_set_default_youtube_playlist
  describe("zernio_set_default_youtube_playlist", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_default_youtube_playlist")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", playlistId: "pl-456" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/youtube-playlists", { playlistId: "pl-456" });
    });
  });

  // 28. zernio_set_default_reddit_subreddit
  describe("zernio_set_default_reddit_subreddit", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_set_default_reddit_subreddit")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", subreddit: "typescript" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/reddit-subreddits", { subreddit: "typescript" });
    });
  });

  // 29. zernio_update_facebook_page
  describe("zernio_update_facebook_page", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_update_facebook_page")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", settings: '{"name":"My Page"}' });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/facebook-page", { settings: '{"name":"My Page"}' });
    });
  });

  // 30. zernio_get_gmb_reviews
  describe("zernio_get_gmb_reviews", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_reviews")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", pageSize: "10", pageToken: "token-abc" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-reviews", undefined, { locationId: "loc-1", pageSize: "10", pageToken: "token-abc" });
    });
  });

  // 31. zernio_get_gmb_food_menus
  describe("zernio_get_gmb_food_menus", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_food_menus")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-food-menus", undefined, { locationId: "loc-1" });
    });
  });

  // 32. zernio_update_gmb_food_menus
  describe("zernio_update_gmb_food_menus", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_update_gmb_food_menus")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", menus: '{"items":[]}' });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/gmb-food-menus", { locationId: "loc-1", menus: '{"items":[]}' });
    });
  });

  // 33. zernio_get_gmb_location_details
  describe("zernio_get_gmb_location_details", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_location_details")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-location-details", undefined, { locationId: "loc-1" });
    });
  });

  // 34. zernio_update_gmb_location_details
  describe("zernio_update_gmb_location_details", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_update_gmb_location_details")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", name: "My Biz", address: "123 Main St", phone: "555-1234", hours: '{"mon":"9-5"}', website: "https://example.com", description: "A business" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/gmb-location-details", { locationId: "loc-1", name: "My Biz", address: "123 Main St", phone: "555-1234", hours: '{"mon":"9-5"}', website: "https://example.com", description: "A business" });
    });
  });

  // 35. zernio_get_gmb_media
  describe("zernio_get_gmb_media", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_media")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", pageSize: "5", pageToken: "tok-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-media", undefined, { locationId: "loc-1", pageSize: "5", pageToken: "tok-1" });
    });
  });

  // 36. zernio_upload_gmb_media
  describe("zernio_upload_gmb_media", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_upload_gmb_media")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", mediaUrl: "https://example.com/photo.jpg", category: "COVER" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/accounts/acc-123/gmb-media", { locationId: "loc-1", mediaUrl: "https://example.com/photo.jpg", category: "COVER" });
    });
  });

  // 37. zernio_delete_gmb_media
  describe("zernio_delete_gmb_media", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_delete_gmb_media")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", mediaId: "media-99" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123/gmb-media", { locationId: "loc-1", mediaId: "media-99" });
    });
  });

  // 38. zernio_get_gmb_attributes
  describe("zernio_get_gmb_attributes", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_attributes")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-attributes", undefined, { locationId: "loc-1" });
    });
  });

  // 39. zernio_update_gmb_attributes
  describe("zernio_update_gmb_attributes", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_update_gmb_attributes")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", attributes: '{"wifi":true}' });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/accounts/acc-123/gmb-attributes", { locationId: "loc-1", attributes: '{"wifi":true}' });
    });
  });

  // 40. zernio_get_gmb_place_actions
  describe("zernio_get_gmb_place_actions", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_get_gmb_place_actions")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/accounts/acc-123/gmb-place-actions", undefined, { locationId: "loc-1" });
    });
  });

  // 41. zernio_create_gmb_place_action
  describe("zernio_create_gmb_place_action", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_create_gmb_place_action")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", actionType: "ORDER", url: "https://order.example.com" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/accounts/acc-123/gmb-place-actions", { locationId: "loc-1", actionType: "ORDER", url: "https://order.example.com" });
    });
  });

  // 42. zernio_delete_gmb_place_action
  describe("zernio_delete_gmb_place_action", () => {
    const tool = accountTools.find((t: any) => t.name === "zernio_delete_gmb_place_action")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-123", locationId: "loc-1", actionId: "action-55" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/accounts/acc-123/gmb-place-actions", { locationId: "loc-1", actionId: "action-55" });
    });
  });
});
