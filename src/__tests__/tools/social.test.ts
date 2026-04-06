import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { socialTools } from "../../tools/social.js";

const mockRequest = vi.mocked(zernioRequest);

describe("socialTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 33 tools", () => {
    expect(socialTools).toHaveLength(33);
  });

  it("has no duplicate tool names", () => {
    const names = socialTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  // Twitter tools
  describe("zernio_twitter_retweet", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_retweet")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/twitter/retweet", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  describe("zernio_twitter_unretweet", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_unretweet")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/twitter/retweet", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  describe("zernio_twitter_like", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_like")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/twitter/like", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  describe("zernio_twitter_bookmark", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_bookmark")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/twitter/bookmark", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  describe("zernio_twitter_remove_bookmark", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_remove_bookmark")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/twitter/bookmark", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  describe("zernio_twitter_follow", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_follow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", targetUserId: "user-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/twitter/follow", { accountId: "acc-1", targetUserId: "user-1" });
    });
  });

  describe("zernio_twitter_unfollow", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_unfollow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", targetUserId: "user-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/twitter/follow", { accountId: "acc-1", targetUserId: "user-1" });
    });
  });

  // Reddit tools
  describe("zernio_reddit_upvote", () => {
    const tool = socialTools.find((t) => t.name === "zernio_reddit_upvote")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", targetId: "t3_abc" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/social/reddit/upvote", { accountId: "acc-1", targetId: "t3_abc" });
    });
  });

  describe("zernio_reddit_submit_post", () => {
    const tool = socialTools.find((t) => t.name === "zernio_reddit_submit_post")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", subreddit: "test", title: "My Post", content: "Hello", url: undefined });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/social/reddit/submit", {
        accountId: "acc-1", subreddit: "test", title: "My Post", content: "Hello", url: undefined,
      });
    });
  });

  // Sequences
  describe("zernio_list_sequences", () => {
    const tool = socialTools.find((t) => t.name === "zernio_list_sequences")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/sequences", undefined, { accountId: "acc-1" });
    });
  });

  describe("zernio_get_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_get_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/sequences/seq-1");
    });
  });

  describe("zernio_create_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_create_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      const steps = [{ message: "Hi!", delayDays: 0 }, { message: "Follow up", delayDays: 3 }];
      await tool.handler({ name: "Welcome", accountId: "acc-1", steps });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/sequences", {
        name: "Welcome", accountId: "acc-1", steps,
      });
    });
  });

  describe("zernio_enroll_contact_in_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_enroll_contact_in_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1", contactId: "ct-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/sequences/seq-1/enroll", { contactId: "ct-1" });
    });
  });

  describe("zernio_unenroll_contact_from_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_unenroll_contact_from_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1", contactId: "ct-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/sequences/seq-1/enroll/ct-1");
    });
  });

  // Webhooks
  describe("zernio_list_webhooks", () => {
    const tool = socialTools.find((t) => t.name === "zernio_list_webhooks")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/webhooks");
    });
  });

  describe("zernio_create_webhook", () => {
    const tool = socialTools.find((t) => t.name === "zernio_create_webhook")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ url: "https://example.com/hook", events: ["message.received"], secret: "s3cret" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/webhooks", {
        url: "https://example.com/hook", events: ["message.received"], secret: "s3cret",
      });
    });
  });

  describe("zernio_delete_webhook", () => {
    const tool = socialTools.find((t) => t.name === "zernio_delete_webhook")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ webhookId: "wh-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/webhooks/wh-1");
    });
  });

  // WhatsApp flows
  describe("zernio_list_whatsapp_flows", () => {
    const tool = socialTools.find((t) => t.name === "zernio_list_whatsapp_flows")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/flows", undefined, { accountId: "acc-1" });
    });
  });

  describe("zernio_get_whatsapp_flow", () => {
    const tool = socialTools.find((t) => t.name === "zernio_get_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/flows/flow-1");
    });
  });

  describe("zernio_trigger_whatsapp_flow", () => {
    const tool = socialTools.find((t) => t.name === "zernio_trigger_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", contactId: "ct-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows/flow-1/trigger", { contactId: "ct-1" });
    });
  });

  // Tags
  describe("zernio_list_contact_tags", () => {
    const tool = socialTools.find((t) => t.name === "zernio_list_contact_tags")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/contacts/tags");
    });
  });

  describe("zernio_add_contact_tag", () => {
    const tool = socialTools.find((t) => t.name === "zernio_add_contact_tag")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-1", tag: "vip" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/contacts/ct-1/tags", { tag: "vip" });
    });
  });

  describe("zernio_remove_contact_tag", () => {
    const tool = socialTools.find((t) => t.name === "zernio_remove_contact_tag")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-1", tag: "vip" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/contacts/ct-1/tags/vip");
    });
  });

  // Twitter unlike
  describe("zernio_twitter_unlike", () => {
    const tool = socialTools.find((t) => t.name === "zernio_twitter_unlike")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "acc-1", tweetId: "tw-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/twitter/like", { accountId: "acc-1", tweetId: "tw-1" });
    });
  });

  // Sequence management
  describe("zernio_update_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_update_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      const steps = [{ message: "Updated msg", delayDays: 1 }];
      await tool.handler({ sequenceId: "seq-1", name: "Updated", steps });
      expect(mockRequest).toHaveBeenCalledWith("PATCH", "/v1/sequences/seq-1", {
        name: "Updated", steps,
      });
    });
  });

  describe("zernio_delete_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_delete_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/sequences/seq-1");
    });
  });

  describe("zernio_activate_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_activate_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/sequences/seq-1/activate");
    });
  });

  describe("zernio_pause_sequence", () => {
    const tool = socialTools.find((t) => t.name === "zernio_pause_sequence")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/sequences/seq-1/pause");
    });
  });

  describe("zernio_list_sequence_enrollments", () => {
    const tool = socialTools.find((t) => t.name === "zernio_list_sequence_enrollments")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ sequenceId: "seq-1", limit: 10, offset: 0 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/sequences/seq-1/enrollments", undefined, { limit: 10, offset: 0 });
    });
  });

  // Webhook management
  describe("zernio_update_webhook", () => {
    const tool = socialTools.find((t) => t.name === "zernio_update_webhook")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ url: "https://example.com/hook2", events: ["comment.created"], secret: "new-secret" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/webhooks/settings", {
        url: "https://example.com/hook2", events: ["comment.created"], secret: "new-secret",
      });
    });
  });

  describe("zernio_test_webhook", () => {
    const tool = socialTools.find((t) => t.name === "zernio_test_webhook")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ events: ["message.received"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/webhooks/test", { events: ["message.received"] });
    });
  });

  describe("zernio_get_webhook_logs", () => {
    const tool = socialTools.find((t) => t.name === "zernio_get_webhook_logs")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ limit: 20, offset: 0, status: "failed" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/webhooks/logs", undefined, { limit: 20, offset: 0, status: "failed" });
    });
  });

  // Connection logs
  describe("zernio_get_connection_logs", () => {
    const tool = socialTools.find((t) => t.name === "zernio_get_connection_logs")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ limit: 50, offset: 0, since: "2024-01-01" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/connections/logs", undefined, { limit: 50, offset: 0, since: "2024-01-01" });
    });
  });
});
