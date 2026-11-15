import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { messageTools } from "../tools/messages.js";

// Issue #21: the API rejects GET .../messages without ?accountId=. This exercises the real client
// (fetch stubbed) so it asserts the URL actually sent, not just the arguments to zernioRequest.
describe("inbox requests carry accountId on the wire", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("ZERNIO_API_KEY", "test-key");
    fetchMock.mockReset().mockResolvedValue(new Response(JSON.stringify({ messages: [] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  const tool = (name: string) => messageTools.find((t) => t.name === name)!;
  const sentUrl = () => new URL(fetchMock.mock.calls[0][0] as string);

  it("zernio_list_messages sends accountId as a query parameter", async () => {
    await tool("zernio_list_messages").handler({ conversationId: "conv-1", accountId: "acc-1", limit: 20 });
    const url = sentUrl();
    expect(url.pathname).toBe("/api/v1/inbox/conversations/conv-1/messages");
    expect(url.searchParams.get("accountId")).toBe("acc-1");
    expect(url.searchParams.get("limit")).toBe("20");
    expect(fetchMock.mock.calls[0][1].method).toBe("GET");
  });

  it("zernio_get_conversation sends accountId as a query parameter", async () => {
    await tool("zernio_get_conversation").handler({ conversationId: "conv-1", accountId: "acc-1" });
    expect(sentUrl().searchParams.get("accountId")).toBe("acc-1");
  });

  it("zernio_delete_message sends accountId as a query parameter", async () => {
    await tool("zernio_delete_message").handler({ conversationId: "conv-1", messageId: "m-1", accountId: "acc-1" });
    expect(sentUrl().searchParams.get("accountId")).toBe("acc-1");
    expect(fetchMock.mock.calls[0][1].method).toBe("DELETE");
  });

  it("zernio_send_typing_indicator sends accountId in the body", async () => {
    await tool("zernio_send_typing_indicator").handler({ conversationId: "conv-1", accountId: "acc-1" });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ accountId: "acc-1" });
  });
});
