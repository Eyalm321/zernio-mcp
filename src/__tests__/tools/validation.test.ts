import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { validationTools } from "../../tools/validation.js";

const mockRequest = vi.mocked(zernioRequest);

describe("validationTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 4 tools", () => {
    expect(validationTools).toHaveLength(4);
  });

  it("has no duplicate tool names", () => {
    const names = validationTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_validate_post_length", () => {
    const tool = validationTools.find((t) => t.name === "zernio_validate_post_length")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ content: "Hello world", platform: "twitter" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/tools/validate/post-length", {
        content: "Hello world",
        platform: "twitter",
      });
    });
  });

  describe("zernio_validate_post", () => {
    const tool = validationTools.find((t) => t.name === "zernio_validate_post")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ content: "Check this out", platform: "instagram", mediaIds: ["m-1", "m-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/tools/validate/post", {
        content: "Check this out",
        platform: "instagram",
        mediaIds: ["m-1", "m-2"],
      });
    });
  });

  describe("zernio_validate_media", () => {
    const tool = validationTools.find((t) => t.name === "zernio_validate_media")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ mediaIds: ["m-1", "m-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/tools/validate/media", {
        mediaIds: ["m-1", "m-2"],
      });
    });
  });

  describe("zernio_validate_subreddit", () => {
    const tool = validationTools.find((t) => t.name === "zernio_validate_subreddit")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ subreddit: "javascript" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/tools/validate/subreddit", undefined, {
        subreddit: "javascript",
      });
    });
  });
});
