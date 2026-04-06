# zernio-mcp

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives Claude full access to your [Zernio](https://zernio.com) social media accounts — inbox, analytics, comments, DMs, and reviews.

Zernio's official MCP only covers post scheduling. This server adds everything else: 27 tools covering your entire social media management workflow.

## Quick Start

### Option 1: npx (recommended)

No installation needed. Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zernio": {
      "command": "npx",
      "args": ["zernio-mcp"],
      "env": {
        "ZERNIO_API_KEY": "your_zernio_api_key_here"
      }
    }
  }
}
```

### Option 2: Local install

```bash
git clone https://github.com/Eyalm321/zernio-mcp.git
cd zernio-mcp
npm install
npm run build
```

Then configure Claude Desktop:

```json
{
  "mcpServers": {
    "zernio": {
      "command": "node",
      "args": ["/absolute/path/to/zernio-mcp/dist/index.js"],
      "env": {
        "ZERNIO_API_KEY": "your_zernio_api_key_here"
      }
    }
  }
}
```

### Getting your API key

1. Log in to [zernio.com](https://zernio.com)
2. Go to **Settings → API Keys**
3. Create a new key and copy it

> **Required add-ons:** Enable the **Inbox** and **Analytics** add-ons in your Zernio plan to unlock all 27 tools.

---

## Tools

### Accounts (2 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_accounts` | List all connected social accounts with platform, username, and follower count |
| `zernio_get_follower_stats` | Get follower count and growth stats for a specific account |

### Comments (7 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_commented_posts` | List posts that have received comments |
| `zernio_get_post_comments` | Get all comments on a specific post |
| `zernio_reply_to_comment` | Reply publicly to a comment |
| `zernio_private_reply_to_comment` | Send a private reply to a comment (Facebook/Instagram) |
| `zernio_like_comment` | Like a comment |
| `zernio_hide_comment` | Hide a comment from public view |
| `zernio_delete_comment` | Delete a comment |

### Messages / DMs (5 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_conversations` | List all DM conversations across platforms |
| `zernio_get_conversation` | Get full message thread for a conversation |
| `zernio_list_messages` | List messages with optional filters |
| `zernio_send_message` | Send a DM reply to a conversation |
| `zernio_update_conversation_status` | Mark conversations as read/unread/archived |

### Reviews (3 tools)
| Tool | Description |
|------|-------------|
| `zernio_list_reviews` | List reviews across connected review platforms |
| `zernio_reply_to_review` | Reply to a review |
| `zernio_delete_review_reply` | Delete a review reply |

### Analytics (10 tools)
| Tool | Description |
|------|-------------|
| `zernio_get_post_analytics` | Post-level metrics: impressions, reach, likes, comments, shares, saves, clicks |
| `zernio_get_follower_analytics` | Follower growth over time for an account |
| `zernio_get_best_times_to_post` | Optimal posting times based on your audience's engagement |
| `zernio_get_daily_metrics` | Day-by-day impressions, reach, engagement, and profile visits |
| `zernio_get_content_decay` | How post performance decays over time after publishing |
| `zernio_get_instagram_insights` | Instagram-specific reach, impressions, and profile visits |
| `zernio_get_instagram_demographics` | Instagram audience age, gender, and location breakdown |
| `zernio_get_google_business_performance` | Google Business Profile views, calls, direction requests *(requires Google Business connected)* |
| `zernio_get_google_business_keywords` | Search keywords people use to find your Google Business Profile *(requires Google Business connected)* |
| `zernio_get_youtube_analytics` | YouTube daily view counts and watch time for a specific video *(requires YouTube connected)* |

---

## Example prompts

Once configured, you can ask Claude things like:

- *"What comments came in today across all my social accounts?"*
- *"Reply to all unanswered DMs with a friendly acknowledgment"*
- *"Show me the engagement stats for my last 5 Facebook posts"*
- *"What's the best time to post on Instagram based on my audience?"*
- *"Summarize all new reviews and draft replies for the 1-star ones"*
- *"How have my follower counts changed over the past 30 days?"*

---

## Supported platforms

Platforms depend on which accounts you've connected in Zernio:

- Facebook
- Instagram
- TikTok
- YouTube *(analytics only)*
- Google Business Profile *(analytics and reviews)*
- LinkedIn
- Twitter/X
- Threads

---

## Configuration reference

| Config key | Description |
|------------|-------------|
| `ZERNIO_API_KEY` | Your Zernio API key (required) |

---

## Development

```bash
npm install
npm run build       # compile TypeScript
npm start           # run the server
```

Built with:
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- [Zod](https://zod.dev) for schema validation
- TypeScript / Node.js

---

## License

MIT
