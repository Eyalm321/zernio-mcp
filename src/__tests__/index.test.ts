import { describe, it, expect } from "vitest";
import { accountTools } from "../tools/accounts.js";
import { commentTools } from "../tools/comments.js";
import { messageTools } from "../tools/messages.js";
import { reviewTools } from "../tools/reviews.js";
import { analyticsTools } from "../tools/analytics.js";
import { adsTools } from "../tools/ads.js";
import { contactTools } from "../tools/contacts.js";
import { broadcastTools } from "../tools/broadcasts.js";
import { automationTools } from "../tools/automations.js";
import { postTools } from "../tools/posts.js";
import { profileTools } from "../tools/profiles.js";
import { socialTools } from "../tools/social.js";
import { connectTools } from "../tools/connect.js";
import { whatsappBusinessTools } from "../tools/whatsapp-business.js";
import { queueTools } from "../tools/queue.js";
import { redditTools } from "../tools/reddit.js";
import { validationTools } from "../tools/validation.js";

const allTools = [
  ...accountTools,
  ...commentTools,
  ...messageTools,
  ...reviewTools,
  ...analyticsTools,
  ...adsTools,
  ...contactTools,
  ...broadcastTools,
  ...automationTools,
  ...postTools,
  ...profileTools,
  ...socialTools,
  ...connectTools,
  ...whatsappBusinessTools,
  ...queueTools,
  ...redditTools,
  ...validationTools,
];

describe("Tool Registration", () => {
  it("has no duplicate tool names across all modules", () => {
    const names = allTools.map((t) => t.name);
    const duplicates = names.filter((name, i) => names.indexOf(name) !== i);
    expect(duplicates).toEqual([]);
  });

  it("all tools have required properties", () => {
    for (const tool of allTools) {
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.handler).toBe("function");
    }
  });

  it("all tool names follow zernio_ naming convention", () => {
    for (const tool of allTools) {
      expect(tool.name).toMatch(/^zernio_/);
    }
  });

  it("registers the expected total number of tools", () => {
    expect(allTools.length).toBeGreaterThanOrEqual(150);
  });

  it("each module exports a non-empty array", () => {
    const modules = [
      accountTools, commentTools, messageTools, reviewTools, analyticsTools,
      adsTools, contactTools, broadcastTools, automationTools, postTools,
      profileTools, socialTools, connectTools, whatsappBusinessTools,
      queueTools, redditTools, validationTools,
    ];
    for (const mod of modules) {
      expect(Array.isArray(mod)).toBe(true);
      expect(mod.length).toBeGreaterThan(0);
    }
  });
});
