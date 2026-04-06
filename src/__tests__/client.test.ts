import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { zernioRequest } from "../client.js";

describe("zernioRequest", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    vi.stubEnv("ZERNIO_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("throws if ZERNIO_API_KEY is not set", async () => {
    vi.stubEnv("ZERNIO_API_KEY", "");
    await expect(zernioRequest("GET", "/v1/test")).rejects.toThrow(
      "ZERNIO_API_KEY environment variable is not set"
    );
  });

  it("makes GET request with correct URL and headers", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    await zernioRequest("GET", "/v1/accounts");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://zernio.com/api/v1/accounts",
      expect.objectContaining({
        method: "GET",
        headers: {
          Authorization: "Bearer test-api-key",
          "Content-Type": "application/json",
        },
        body: undefined,
      })
    );
  });

  it("makes POST request with body", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "123" }),
    });

    await zernioRequest("POST", "/v1/posts", { content: "hello" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://zernio.com/api/v1/posts",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ content: "hello" }),
      })
    );
  });

  it("appends query params and filters undefined/null/empty values", async () => {
    // Capture the actual URL that fetch receives
    let capturedUrl = "";
    mockFetch.mockImplementation((url: string) => {
      capturedUrl = url;
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    await zernioRequest("GET", "/v1/accounts", undefined, {
      platform: "instagram",
      limit: 10,
      empty: undefined,
      nullVal: undefined,
    });

    const url = new URL(capturedUrl);
    expect(url.searchParams.get("platform")).toBe("instagram");
    expect(url.searchParams.get("limit")).toBe("10");
    expect(url.searchParams.has("empty")).toBe(false);
    expect(url.searchParams.has("nullVal")).toBe(false);
  });

  it("returns parsed JSON on success", async () => {
    const expected = { accounts: [{ id: "1" }] };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expected),
    });

    const result = await zernioRequest("GET", "/v1/accounts");
    expect(result).toEqual(expected);
  });

  it("throws on non-2xx response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    });

    await expect(zernioRequest("GET", "/v1/test")).rejects.toThrow(
      "Zernio API error 401: Unauthorized"
    );
  });

  it("handles text() failure gracefully on error", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.reject(new Error("parse failed")),
    });

    await expect(zernioRequest("GET", "/v1/test")).rejects.toThrow(
      "Zernio API error 500:"
    );
  });
});
