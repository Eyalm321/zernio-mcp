import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { connectTools } from "../../tools/connect.js";

const mockRequest = vi.mocked(zernioRequest);

describe("connectTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 10 tools", () => {
    expect(connectTools).toHaveLength(10);
  });

  it("has no duplicate tool names", () => {
    const names = connectTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_get_connect_url", () => {
    const tool = connectTools.find((t) => t.name === "zernio_get_connect_url")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ platform: "twitter", profileId: "prof-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/connect/twitter",
        undefined,
        { profileId: "prof-1" }
      );
    });
  });

  describe("zernio_connect_bluesky", () => {
    const tool = connectTools.find((t) => t.name === "zernio_connect_bluesky")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        profileId: "prof-1",
        username: "user.bsky.social",
        appPassword: "xxx-yyy",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/connect/bluesky/credentials",
        { profileId: "prof-1", username: "user.bsky.social", appPassword: "xxx-yyy" }
      );
    });
  });

  describe("zernio_connect_telegram_start", () => {
    const tool = connectTools.find((t) => t.name === "zernio_connect_telegram_start")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/connect/telegram",
        undefined,
        { profileId: "prof-1" }
      );
    });
  });

  describe("zernio_connect_telegram_verify", () => {
    const tool = connectTools.find((t) => t.name === "zernio_connect_telegram_verify")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest with PATCH method", async () => {
      await tool.handler({ profileId: "prof-1", code: "123456" });
      expect(mockRequest).toHaveBeenCalledWith(
        "PATCH",
        "/v1/connect/telegram",
        { profileId: "prof-1", code: "123456" }
      );
    });
  });

  describe("zernio_check_telegram_connection", () => {
    const tool = connectTools.find((t) => t.name === "zernio_check_telegram_connection")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/connect/telegram",
        { profileId: "prof-1" }
      );
    });
  });

  describe("zernio_connect_whatsapp", () => {
    const tool = connectTools.find((t) => t.name === "zernio_connect_whatsapp")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        profileId: "prof-1",
        accessToken: "tok-123",
        businessAccountId: "biz-456",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/connect/whatsapp/credentials",
        { profileId: "prof-1", accessToken: "tok-123", businessAccountId: "biz-456" }
      );
    });
  });

  describe("zernio_list_facebook_pages_for_connect", () => {
    const tool = connectTools.find((t) => t.name === "zernio_list_facebook_pages_for_connect")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/connect/facebook/select-page",
        undefined,
        { profileId: "prof-1" }
      );
    });
  });

  describe("zernio_select_facebook_page", () => {
    const tool = connectTools.find((t) => t.name === "zernio_select_facebook_page")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1", pageId: "page-789" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/connect/facebook/select-page",
        { profileId: "prof-1", pageId: "page-789" }
      );
    });
  });

  describe("zernio_list_snapchat_profiles_for_connect", () => {
    const tool = connectTools.find((t) => t.name === "zernio_list_snapchat_profiles_for_connect")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/connect/snapchat/select-profile",
        undefined,
        { profileId: "prof-1" }
      );
    });
  });

  describe("zernio_select_snapchat_profile", () => {
    const tool = connectTools.find((t) => t.name === "zernio_select_snapchat_profile")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ profileId: "prof-1", snapchatProfileId: "snap-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/connect/snapchat/select-profile",
        { profileId: "prof-1", snapchatProfileId: "snap-1" }
      );
    });
  });
});
