import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { messageTools } from "../../tools/messages.js";

const mockRequest = vi.mocked(zernioRequest);

describe("messageTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 10 tools", () => {
    expect(messageTools).toHaveLength(10);
  });

  it("has no duplicate tool names", () => {
    const names = messageTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_conversations", () => {
    const tool = messageTools.find((t) => t.name === "zernio_list_conversations")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", platform: "instagram", limit: 20 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/inbox/conversations", undefined, {
        accountId: "acc-1",
        platform: "instagram",
        limit: 20,
      });
    });
  });

  describe("zernio_get_conversation", () => {
    const tool = messageTools.find((t) => t.name === "zernio_get_conversation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/inbox/conversations/conv-123"
      );
    });
  });

  describe("zernio_list_messages", () => {
    const tool = messageTools.find((t) => t.name === "zernio_list_messages")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", limit: 50 });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/inbox/conversations/conv-123/messages",
        undefined,
        { limit: 50 }
      );
    });
  });

  describe("zernio_send_message", () => {
    const tool = messageTools.find((t) => t.name === "zernio_send_message")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", accountId: "acc-1", message: "Hello!" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations/conv-123/messages",
        { accountId: "acc-1", message: "Hello!" }
      );
    });
  });

  describe("zernio_create_conversation", () => {
    const tool = messageTools.find((t) => t.name === "zernio_create_conversation")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "acc-1",
        contactId: "contact-1",
        recipientId: "recip-1",
        message: "Hi there",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations",
        {
          accountId: "acc-1",
          contactId: "contact-1",
          recipientId: "recip-1",
          message: "Hi there",
        }
      );
    });
  });

  describe("zernio_send_typing_indicator", () => {
    const tool = messageTools.find((t) => t.name === "zernio_send_typing_indicator")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations/conv-123/typing"
      );
    });
  });

  describe("zernio_react_to_message", () => {
    const tool = messageTools.find((t) => t.name === "zernio_react_to_message")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls POST when action is add", async () => {
      await tool.handler({
        conversationId: "conv-123",
        messageId: "msg-1",
        emoji: "👍",
        action: "add",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations/conv-123/messages/msg-1/reactions",
        { emoji: "👍" }
      );
    });

    it("calls DELETE when action is remove", async () => {
      await tool.handler({
        conversationId: "conv-123",
        messageId: "msg-1",
        emoji: "👍",
        action: "remove",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "DELETE",
        "/v1/inbox/conversations/conv-123/messages/msg-1/reactions",
        { emoji: "👍" }
      );
    });
  });

  describe("zernio_update_conversation_status", () => {
    const tool = messageTools.find((t) => t.name === "zernio_update_conversation_status")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", status: "read" });
      expect(mockRequest).toHaveBeenCalledWith(
        "PUT",
        "/v1/inbox/conversations/conv-123",
        { status: "read" }
      );
    });
  });

  describe("zernio_edit_message", () => {
    const tool = messageTools.find((t) => t.name === "zernio_edit_message")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", messageId: "msg-1", message: "Updated text" });
      expect(mockRequest).toHaveBeenCalledWith(
        "PATCH",
        "/v1/inbox/conversations/conv-123/messages/msg-1",
        { message: "Updated text" }
      );
    });
  });

  describe("zernio_delete_message", () => {
    const tool = messageTools.find((t) => t.name === "zernio_delete_message")!;

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", messageId: "msg-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "DELETE",
        "/v1/inbox/conversations/conv-123/messages/msg-1"
      );
    });
  });
});
