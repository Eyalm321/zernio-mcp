import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { broadcastTools } from "../../tools/broadcasts.js";

const mockRequest = vi.mocked(zernioRequest);

describe("broadcastTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 7 tools", () => {
    expect(broadcastTools).toHaveLength(7);
  });

  it("has no duplicate tool names", () => {
    const names = broadcastTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_broadcasts", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_list_broadcasts")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ limit: 10, status: "sent" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/broadcasts", undefined, {
        limit: 10,
        status: "sent",
      });
    });
  });

  describe("zernio_get_broadcast", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_get_broadcast")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ broadcastId: "bc-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/broadcasts/bc-123");
    });
  });

  describe("zernio_create_broadcast", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_create_broadcast")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        name: "Promo",
        message: "Hello!",
        accountId: "acc-1",
        audienceType: "all",
        tag: "vip",
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/broadcasts", {
        name: "Promo",
        message: "Hello!",
        accountId: "acc-1",
        audienceType: "all",
        tag: "vip",
      });
    });
  });

  describe("zernio_schedule_broadcast", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_schedule_broadcast")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ broadcastId: "bc-123", scheduledAt: "2024-12-01T10:00:00Z" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/broadcasts/bc-123/schedule",
        { scheduledAt: "2024-12-01T10:00:00Z" }
      );
    });
  });

  describe("zernio_send_broadcast", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_send_broadcast")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ broadcastId: "bc-123" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/broadcasts/bc-123/send");
    });
  });

  describe("zernio_cancel_broadcast", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_cancel_broadcast")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ broadcastId: "bc-123" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/broadcasts/bc-123/cancel");
    });
  });

  describe("zernio_get_broadcast_recipients", () => {
    const tool = broadcastTools.find((t) => t.name === "zernio_get_broadcast_recipients")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ broadcastId: "bc-123", limit: 100 });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/broadcasts/bc-123/recipients",
        undefined,
        { limit: 100 }
      );
    });
  });
});
