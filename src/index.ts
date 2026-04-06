#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { accountTools } from "./tools/accounts.js";
import { commentTools } from "./tools/comments.js";
import { messageTools } from "./tools/messages.js";
import { reviewTools } from "./tools/reviews.js";
import { analyticsTools } from "./tools/analytics.js";

const server = new McpServer({
  name: "zernio-mcp",
  version: "1.1.0",
});

// Combine all tool modules
const allTools = [
  ...accountTools,
  ...commentTools,
  ...messageTools,
  ...reviewTools,
  ...analyticsTools,
];

// Register every tool with the MCP server
for (const tool of allTools) {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (args: any) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await tool.handler(args as any);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
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
