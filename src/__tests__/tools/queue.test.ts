import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { queueTools } from "../../tools/queue.js";

const mockRequest = vi.mocked(zernioRequest);

describe("queueTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 6 tools", () => {
    expect(queueTools).toHaveLength(6);
  });

  it("has no duplicate tool names", () => {
    const names = queueTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_queue_slots", () => {
    const tool = queueTools.find((t) => t.name === "zernio_list_queue_slots")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ date: "2024-01-15", accountIds: "acc-1,acc-2" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/queue/slots", undefined, {
        date: "2024-01-15",
        accountIds: "acc-1,acc-2",
      });
    });
  });

  describe("zernio_create_queue_slot", () => {
    const tool = queueTools.find((t) => t.name === "zernio_create_queue_slot")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountIds: ["acc-1"], times: ["09:00", "12:00"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/queue/slots", {
        accountIds: ["acc-1"],
        times: ["09:00", "12:00"],
      });
    });
  });

  describe("zernio_update_queue_slot", () => {
    const tool = queueTools.find((t) => t.name === "zernio_update_queue_slot")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ slotId: "slot-1", time: "14:00" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/queue/slots", {
        slotId: "slot-1",
        time: "14:00",
      });
    });
  });

  describe("zernio_delete_queue_slot", () => {
    const tool = queueTools.find((t) => t.name === "zernio_delete_queue_slot")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ slotId: "slot-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/queue/slots", {
        slotId: "slot-1",
      });
    });
  });

  describe("zernio_preview_queue", () => {
    const tool = queueTools.find((t) => t.name === "zernio_preview_queue")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ days: 7, accountIds: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/queue/preview", undefined, {
        days: 7,
        accountIds: "acc-1",
      });
    });
  });

  describe("zernio_get_next_queue_slot", () => {
    const tool = queueTools.find((t) => t.name === "zernio_get_next_queue_slot")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountIds: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/queue/next-slot", undefined, {
        accountIds: "acc-1",
      });
    });
  });
});
