# zernio-mcp

A Model Context Protocol (MCP) server that gives Claude Desktop full access to your Zernio social media inbox, analytics, comments, DMs, and reviews — across Facebook, Instagram, TikTok, YouTube, Google Business, and more.

## What You Can Do

Ask Claude things like:

- "Show me the latest comments on my Instagram posts"
- "Reply to the comment from @user123 saying thanks for your feedback!"
- "List my unread DMs on Facebook"
- "What are my follower stats this month on Instagram?"
- "Show me all 1-star Google reviews in the last 30 days"
- "Reply to that review with an apology and our contact info"
- "What's the best time to post on TikTok?"
- "How many impressions did my last 5 posts get?"

## Available Tools (27 total)

### Accounts (2 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_accounts` | List all connected social accounts with platform, username, and IDs |
| `zernio_get_follower_stats` | Get follower count and stats for an account |

### Comments (7 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_commented_posts` | List posts with comments across all platforms |
| `zernio_get_post_comments` | Get the full comment thread on a specific post |
| `zernio_reply_to_comment` | Reply to a comment publicly |
| `zernio_private_reply_to_comment` | Send a private DM reply to a commenter |
| `zernio_like_comment` | Like a comment |
| `zernio_hide_comment` | Hide a comment from public view |
| `zernio_delete_comment` | Permanently delete a comment |

### Messages / DMs (5 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_conversations` | List all DM conversations |
| `zernio_get_conversation` | Get details of a specific conversation |
| `zernio_list_messages` | Read the messages in a conversation thread |
| `zernio_send_message` | Send a DM or reply in a conversation |
| `zernio_update_conversation_status` | Mark conversations read, unread, or archived |

### Reviews (3 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_reviews` | List customer reviews (Google Business, etc.) |
| `zernio_reply_to_review` | Reply to a customer review |
| `zernio_delete_review_reply` | Delete your existing reply to a review |

### Analytics (10 tools)
| Tool | Description |
|------|-------------|
| `zernio_get_post_analytics` | Impressions, reach, likes, comments, shares for posts |
| `zernio_get_follower_analytics` | Follower growth over time |
| `zernio_get_best_times_to_post` | Optimal posting times based on your audience |
| `zernio_get_daily_metrics` | Day-by-day account metrics |
| `zernio_get_content_decay` | How post performance fades over time |
| `zernio_get_instagram_insights` | Instagram reach, impressions, profile visits |
| `zernio_get_instagram_demographics` | Instagram audience age, gender, location |
| `zernio_get_google_business_performance` | GBP views, direction requests, calls |
| `zernio_get_google_business_keywords` | Keywords people use to find your GBP |
| `zernio_get_youtube_analytics` | YouTube daily views, watch time, subscribers |

---

## Setup

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Zernio](https://zernio.com) account with connected social media accounts
- [Claude Desktop](https://claude.ai/download)

### 2. Get Your Zernio API Key

Go to [zernio.com/dashboard/api-keys](https://zernio.com/dashboard/api-keys) and create an API key.

### 3. Install the MCP Server

```bash
git clone https://github.com/YOUR_USERNAME/zernio-mcp.git
cd zernio-mcp
npm install
npm run build
```

### 4. Configure Claude Desktop

Open your Claude Desktop config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the Zernio MCP server:

```json
{
  "mcpServers": {
    "zernio": {
      "command": "node",
      "args": ["/absolute/path/to/zernio-mcp/dist/index.js"],
      "env": {
        "ZERNIO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Replace `/absolute/path/to/zernio-mcp` with the actual path where you cloned the repo, and `your_api_key_here` with your Zernio API key.

### 5. Restart Claude Desktop

Close and reopen Claude Desktop. The Zernio tools will be available immediately.

---

## Notes on Inbox Features

Comments, messages, and reviews endpoints require the **Inbox add-on** in your Zernio plan. Check your plan at [zernio.com/dashboard](https://zernio.com/dashboard).

Analytics endpoints require the **Analytics add-on** (`hasAnalyticsAccess: true` on your accounts).

---

## Development

```bash
# Run in development mode (no build step)
ZERNIO_API_KEY=your_key npm run dev

# Build for production
npm run build

# Run built server
ZERNIO_API_KEY=your_key npm start
```

## License

MIT
