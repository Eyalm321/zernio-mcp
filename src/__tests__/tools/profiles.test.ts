import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { profileTools } from "../../tools/profiles.js";

const mockRequest = vi.mocked(zernioRequest);

describe("profileTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 15 tools", () => {
    expect(profileTools).toHaveLength(15);
  });

  it("has no duplicate tool names", () => {
    const names = profileTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_get_profile", () => {
    const tool = profileTools.find((t) => t.name === "zernio_get_profile")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/profile");
    });
  });

  describe("zernio_update_profile", () => {
    const tool = profileTools.find((t) => t.name === "zernio_update_profile")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "Admin", email: "admin@test.com", timezone: "America/New_York" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/profile", {
        name: "Admin", email: "admin@test.com", timezone: "America/New_York",
      });
    });
  });

  describe("zernio_list_account_groups", () => {
    const tool = profileTools.find((t) => t.name === "zernio_list_account_groups")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/account-groups");
    });
  });

  describe("zernio_create_account_group", () => {
    const tool = profileTools.find((t) => t.name === "zernio_create_account_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "Marketing", accountIds: ["acc-1", "acc-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/account-groups", {
        name: "Marketing", accountIds: ["acc-1", "acc-2"],
      });
    });
  });

  describe("zernio_update_account_group", () => {
    const tool = profileTools.find((t) => t.name === "zernio_update_account_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", name: "Sales", accountIds: ["acc-3"] });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/account-groups/grp-1", {
        name: "Sales", accountIds: ["acc-3"],
      });
    });
  });

  describe("zernio_delete_account_group", () => {
    const tool = profileTools.find((t) => t.name === "zernio_delete_account_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/account-groups/grp-1");
    });
  });

  describe("zernio_list_users", () => {
    const tool = profileTools.find((t) => t.name === "zernio_list_users")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/users");
    });
  });

  describe("zernio_invite_user", () => {
    const tool = profileTools.find((t) => t.name === "zernio_invite_user")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ email: "new@test.com", role: "editor" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/users/invite", {
        email: "new@test.com", role: "editor",
      });
    });
  });

  describe("zernio_remove_user", () => {
    const tool = profileTools.find((t) => t.name === "zernio_remove_user")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ userId: "user-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/users/user-1");
    });
  });

  describe("zernio_get_usage_stats", () => {
    const tool = profileTools.find((t) => t.name === "zernio_get_usage_stats")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ dateFrom: "2024-01-01", dateTo: "2024-12-31" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/usage", undefined, {
        dateFrom: "2024-01-01", dateTo: "2024-12-31",
      });
    });
  });

  describe("zernio_list_profiles", () => {
    const tool = profileTools.find((t) => t.name === "zernio_list_profiles")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/profiles");
    });
  });

  describe("zernio_create_zernio_profile", () => {
    const tool = profileTools.find((t) => t.name === "zernio_create_zernio_profile")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "My Brand", description: "A brand profile" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/profiles", {
        name: "My Brand", description: "A brand profile",
      });
    });
  });

  describe("zernio_list_api_keys", () => {
    const tool = profileTools.find((t) => t.name === "zernio_list_api_keys")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/api-keys");
    });
  });

  describe("zernio_create_api_key", () => {
    const tool = profileTools.find((t) => t.name === "zernio_create_api_key")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "Production App" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/api-keys", { name: "Production App" });
    });
  });

  describe("zernio_delete_api_key", () => {
    const tool = profileTools.find((t) => t.name === "zernio_delete_api_key")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ keyId: "key-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/api-keys/key-1");
    });
  });
});
