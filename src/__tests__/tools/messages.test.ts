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
      await tool.handler({ conversationId: "conv-123", accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/inbox/conversations/conv-123",
        undefined,
        { accountId: "acc-1" }
      );
    });
  });

  describe("zernio_list_messages", () => {
    const tool = messageTools.find((t) => t.name === "zernio_list_messages")!;

    it("requires accountId (the API rejects reads without it)", () => {
      expect(tool.inputSchema.safeParse({ conversationId: "conv-123" }).success).toBe(false);
    });

    it("exists with correct name and description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ conversationId: "conv-123", accountId: "acc-1", limit: 50 });
      expect(mockRequest).toHaveBeenCalledWith(
        "GET",
        "/v1/inbox/conversations/conv-123/messages",
        undefined,
        { accountId: "acc-1", limit: 50 }
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

    it("omits messagingType and messageTag when not set", async () => {
      await tool.handler({ conversationId: "conv-123", accountId: "acc-1", message: "Hello!" });
      const body = mockRequest.mock.calls[0][2] as Record<string, unknown>;
      expect(body).not.toHaveProperty("messagingType");
      expect(body).not.toHaveProperty("messageTag");
    });

    it("passes messagingType and messageTag through when set", async () => {
      await tool.handler({
        conversationId: "conv-123",
        accountId: "acc-1",
        message: "Following up",
        messagingType: "MESSAGE_TAG",
        messageTag: "HUMAN_AGENT",
      });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations/conv-123/messages",
        { accountId: "acc-1", message: "Following up", messagingType: "MESSAGE_TAG", messageTag: "HUMAN_AGENT" }
      );
    });

    it("passes messagingType alone when only it is set", async () => {
      await tool.handler({ conversationId: "conv-123", accountId: "acc-1", message: "Hi", messagingType: "RESPONSE" });
      expect(mockRequest).toHaveBeenCalledWith(
        "POST",
        "/v1/inbox/conversations/conv-123/messages",
        { accountId: "acc-1", message: "Hi", messagingType: "RESPONSE" }
      );
    });

    it("accepts only the spec's messagingType and messageTag values", () => {
      const base = { conversationId: "c", accountId: "a", message: "m" };
      expect(tool.inputSchema.safeParse({ ...base, messagingType: "MESSAGE_TAG", messageTag: "HUMAN_AGENT" }).success).toBe(true);
      expect(tool.inputSchema.safeParse({ ...base, messagingType: "NOPE" }).success).toBe(false);
      expect(tool.inputSchema.safeParse({ ...base, messageTag: "human_agent" }).success).toBe(false);
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
