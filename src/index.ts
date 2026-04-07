#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { accountTools } from "./tools/accounts.js";
import { commentTools } from "./tools/comments.js";
import { messageTools } from "./tools/messages.js";
import { reviewTools } from "./tools/reviews.js";
import { analyticsTools } from "./tools/analytics.js";
import { adsTools } from "./tools/ads.js";
import { contactTools } from "./tools/contacts.js";
import { broadcastTools } from "./tools/broadcasts.js";
import { automationTools } from "./tools/automations.js";
import { postTools } from "./tools/posts.js";
import { profileTools } from "./tools/profiles.js";
import { socialTools } from "./tools/social.js";
import { connectTools } from "./tools/connect.js";
import { whatsappBusinessTools } from "./tools/whatsapp-business.js";
import { queueTools } from "./tools/queue.js";
import { redditTools } from "./tools/reddit.js";
import { validationTools } from "./tools/validation.js";

const server = new McpServer({
  name: "zernio-mcp",
  version: "2.0.4",
});

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

for (const tool of allTools) {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape as any,
    async (args: any) => {
      try {
        const result = await tool.handler(args as any);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [{ type: "text" as const, text: `Error: ${message}` }],
          isError: true,
        };
      }
    }
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Zernio MCP server running");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
