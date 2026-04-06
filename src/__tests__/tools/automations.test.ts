import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { automationTools } from "../../tools/automations.js";

const mockRequest = vi.mocked(zernioRequest);

describe("automationTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 6 tools", () => {
    expect(automationTools).toHaveLength(6);
  });

  it("has no duplicate tool names", () => {
    const names = automationTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_automations", () => {
    const tool = automationTools.find((t) => t.name === "zernio_list_automations")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", status: "active" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/automations", undefined, {
        accountId: "acc-1",
        status: "active",
      });
    });
  });

  describe("zernio_get_automation", () => {
    const tool = automationTools.find((t) => t.name === "zernio_get_automation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ automationId: "auto-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/automations/auto-123");
    });
  });

  describe("zernio_create_automation", () => {
    const tool = automationTools.find((t) => t.name === "zernio_create_automation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "acc-1",
        name: "Auto Reply",
        triggerKeywords: ["price", "cost"],
        replyMessage: "Check our pricing page!",
        isActive: true,
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/automations", {
        accountId: "acc-1",
        name: "Auto Reply",
        triggerKeywords: ["price", "cost"],
        replyMessage: "Check our pricing page!",
        isActive: true,
      });
    });
  });

  describe("zernio_update_automation", () => {
    const tool = automationTools.find((t) => t.name === "zernio_update_automation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        automationId: "auto-123",
        name: "Updated",
        triggerKeywords: ["new"],
        replyMessage: "New reply",
        isActive: false,
      });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/automations/auto-123", {
        name: "Updated",
        triggerKeywords: ["new"],
        replyMessage: "New reply",
        isActive: false,
      });
    });
  });

  describe("zernio_delete_automation", () => {
    const tool = automationTools.find((t) => t.name === "zernio_delete_automation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ automationId: "auto-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/automations/auto-123");
    });
  });

  describe("zernio_get_automation_logs", () => {
    const tool = automationTools.find((t) => t.name === "zernio_get_automation_logs")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ automationId: "auto-123", limit: 50 });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/automations/auto-123/logs",
        undefined,
        { limit: 50 }
      );
    });
  });
});
