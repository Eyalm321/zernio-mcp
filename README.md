# zernio-mcp

[![CI](https://github.com/Eyalm321/zernio-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Eyalm321/zernio-mcp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/zernio-mcp)](https://www.npmjs.com/package/zernio-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives Claude full access to the [Zernio](https://zernio.com) social media management API — **273 tools** covering posts, analytics, inbox, ads, contacts, WhatsApp Business, and more across 14+ platforms.

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
2. Go to **Settings > API Keys**
3. Create a new key and copy it

---

## Tools (273 total)

### Accounts (42 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_accounts` | List all connected social media accounts |
| `zernio_get_follower_stats` | Get follower count and stats for an account |
| `zernio_get_account_health` | Check connection health for all accounts |
| `zernio_get_single_account_health` | Check connection health for a specific account |
| `zernio_update_account` | Update account display name or username |
| `zernio_disconnect_account` | Disconnect a social media account |
| `zernio_get_linkedin_mentions` | Get LinkedIn mentions and tags |
| `zernio_get_linkedin_organizations` | List LinkedIn organization pages |
| `zernio_switch_linkedin_organization` | Switch LinkedIn account type |
| `zernio_get_facebook_page` | Get Facebook Page details |
| `zernio_update_facebook_page` | Update Facebook Page settings |
| `zernio_get_pinterest_boards` | List Pinterest boards |
| `zernio_set_default_pinterest_board` | Set default Pinterest board |
| `zernio_get_youtube_playlists` | List YouTube playlists |
| `zernio_set_default_youtube_playlist` | Set default YouTube playlist |
| `zernio_get_reddit_flairs` | List subreddit flairs |
| `zernio_get_reddit_subreddits` | List user's subreddits |
| `zernio_set_default_reddit_subreddit` | Set default subreddit |
| `zernio_get_tiktok_creator_info` | Get TikTok creator info and limits |
| `zernio_get_messenger_menu` | Get Facebook Messenger persistent menu |
| `zernio_set_messenger_menu` | Set Messenger persistent menu |
| `zernio_delete_messenger_menu` | Remove Messenger persistent menu |
| `zernio_get_telegram_commands` | Get Telegram bot commands |
| `zernio_set_telegram_commands` | Set Telegram bot commands |
| `zernio_delete_telegram_commands` | Remove Telegram bot commands |
| `zernio_get_instagram_ice_breakers` | Get Instagram DM ice breaker questions |
| `zernio_set_instagram_ice_breakers` | Set Instagram DM ice breakers |
| `zernio_delete_instagram_ice_breakers` | Remove Instagram DM ice breakers |
| `zernio_get_gmb_locations` | List Google Business Profile locations |
| `zernio_get_gmb_reviews` | Get Google Business reviews |
| `zernio_get_gmb_location_details` | Get GMB location details (hours, address, etc.) |
| `zernio_update_gmb_location_details` | Update GMB location details |
| `zernio_get_gmb_food_menus` | Get GMB restaurant food menus |
| `zernio_update_gmb_food_menus` | Update GMB food menus |
| `zernio_get_gmb_media` | List GMB location photos/videos |
| `zernio_upload_gmb_media` | Upload photo to GMB location |
| `zernio_delete_gmb_media` | Delete GMB media |
| `zernio_get_gmb_attributes` | Get GMB business attributes |
| `zernio_update_gmb_attributes` | Update GMB business attributes |
| `zernio_get_gmb_place_actions` | Get GMB action links |
| `zernio_create_gmb_place_action` | Create GMB action link |
| `zernio_delete_gmb_place_action` | Delete GMB action link |

### Posts & Media (25 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_posts` | List scheduled/published posts |
| `zernio_get_post` | Get post details and performance |
| `zernio_create_post` | Create a new post (draft or scheduled) |
| `zernio_update_post` | Update a draft or scheduled post |
| `zernio_delete_post` | Delete a post |
| `zernio_publish_post_now` | Publish a draft immediately |
| `zernio_duplicate_post` | Duplicate a post as a new draft |
| `zernio_retry_post` | Retry a failed post |
| `zernio_edit_published_post` | Edit an already-published post |
| `zernio_unpublish_post` | Remove a published post |
| `zernio_update_post_metadata` | Update post tags and labels |
| `zernio_bulk_upload_posts` | Bulk create posts from a list |
| `zernio_list_post_queue` | Get the scheduled post queue |
| `zernio_list_post_labels` | List all post labels/tags |
| `zernio_get_post_approval_status` | Get post approval status |
| `zernio_approve_post` | Approve a pending post |
| `zernio_reject_post` | Reject a pending post |
| `zernio_validate_post_content` | Validate content against platform rules |
| `zernio_get_post_logs` | Get activity logs for a post |
| `zernio_get_publishing_logs` | Get publishing logs across all posts |
| `zernio_upload_media` | Upload media by URL |
| `zernio_upload_media_direct` | Upload media file directly |
| `zernio_get_media_presigned_url` | Get presigned URL for large uploads |
| `zernio_list_media` | List uploaded media files |
| `zernio_delete_media` | Delete a media file |

### Analytics (16 tools)

| Tool | Description |
|------|-------------|
| `zernio_get_post_analytics` | Post metrics: impressions, reach, likes, shares, clicks |
| `zernio_get_follower_analytics` | Follower growth over time |
| `zernio_get_best_times_to_post` | Optimal posting times based on engagement |
| `zernio_get_daily_metrics` | Day-by-day impressions, reach, engagement |
| `zernio_get_content_decay` | Post performance decay over time |
| `zernio_get_post_timeline` | Post performance timeline (hour by hour) |
| `zernio_get_posting_frequency` | Posting frequency vs engagement correlation |
| `zernio_get_instagram_insights` | Instagram account-level insights |
| `zernio_get_instagram_demographics` | Instagram audience demographics |
| `zernio_get_youtube_analytics` | YouTube daily views and watch time |
| `zernio_get_youtube_demographics` | YouTube audience demographics |
| `zernio_get_linkedin_analytics` | LinkedIn account-level analytics |
| `zernio_get_linkedin_post_analytics` | LinkedIn per-post analytics |
| `zernio_get_linkedin_post_reactions` | LinkedIn reactions breakdown |
| `zernio_get_google_business_performance` | GMB views, calls, direction requests |
| `zernio_get_google_business_keywords` | GMB search keywords |

### Ads (19 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_ad_accounts` | List connected ad accounts |
| `zernio_get_ads_tree` | Get full campaign/ad-set/ad hierarchy |
| `zernio_list_campaigns` | List ad campaigns |
| `zernio_create_campaign` | Create a new campaign |
| `zernio_update_campaign_status` | Pause or resume a campaign |
| `zernio_list_ads` | List ads across campaigns |
| `zernio_get_ad` | Get ad details |
| `zernio_get_ad_analytics` | Get ad performance metrics |
| `zernio_create_ad` | Create a standalone ad with custom creative |
| `zernio_update_ad` | Update ad (pause, budget, name) |
| `zernio_delete_ad` | Cancel an ad |
| `zernio_boost_post` | Boost an existing post as a paid ad |
| `zernio_sync_ads` | Sync ads from platform ad managers |
| `zernio_list_audiences` | List custom audiences |
| `zernio_create_audience` | Create a custom audience |
| `zernio_get_audience` | Get audience details |
| `zernio_delete_audience` | Delete a custom audience |
| `zernio_add_audience_users` | Add users to an audience |
| `zernio_get_ad_interests` | Browse targeting interests |

### Messages / DMs (10 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_conversations` | List DM conversations across platforms |
| `zernio_get_conversation` | Get conversation details |
| `zernio_list_messages` | Read messages in a conversation |
| `zernio_send_message` | Send a DM reply |
| `zernio_create_conversation` | Start a new DM conversation |
| `zernio_edit_message` | Edit a sent message |
| `zernio_delete_message` | Delete a message |
| `zernio_send_typing_indicator` | Show typing indicator |
| `zernio_react_to_message` | Add/remove emoji reactions |
| `zernio_update_conversation_status` | Mark as read/unread/archived |

### Comments (8 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_commented_posts` | List posts with comments |
| `zernio_get_post_comments` | Get all comments on a post |
| `zernio_reply_to_comment` | Reply publicly to a comment |
| `zernio_private_reply_to_comment` | Send a private reply to a commenter |
| `zernio_like_comment` | Like a comment |
| `zernio_hide_comment` | Hide a comment from public view |
| `zernio_unhide_comment` | Unhide a hidden comment |
| `zernio_delete_comment` | Delete a comment |

### Reviews (3 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_reviews` | List reviews across platforms |
| `zernio_reply_to_review` | Reply to a review |
| `zernio_delete_review_reply` | Delete a review reply |

### Contacts & CRM (11 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_contacts` | List all contacts |
| `zernio_get_contact` | Get contact details |
| `zernio_create_contact` | Create a contact |
| `zernio_update_contact` | Update contact details |
| `zernio_delete_contact` | Delete a contact |
| `zernio_bulk_create_contacts` | Bulk create contacts |
| `zernio_get_contact_channels` | Get contact's social channels |
| `zernio_update_contact_field` | Update a custom field value |
| `zernio_list_custom_fields` | List custom field definitions |
| `zernio_create_custom_field` | Create a custom field |
| `zernio_delete_custom_field` | Delete a custom field |

### Broadcasts (7 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_broadcasts` | List all broadcasts |
| `zernio_get_broadcast` | Get broadcast details |
| `zernio_create_broadcast` | Create a broadcast message |
| `zernio_schedule_broadcast` | Schedule a broadcast |
| `zernio_send_broadcast` | Send a broadcast immediately |
| `zernio_cancel_broadcast` | Cancel a scheduled broadcast |
| `zernio_get_broadcast_recipients` | Get broadcast recipient list |

### Automations (6 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_automations` | List comment-to-DM automations |
| `zernio_get_automation` | Get automation details |
| `zernio_create_automation` | Create a comment automation rule |
| `zernio_update_automation` | Update an automation |
| `zernio_delete_automation` | Delete an automation |
| `zernio_get_automation_logs` | Get automation execution logs |

### Sequences / Drip Campaigns (8 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_sequences` | List message sequences |
| `zernio_get_sequence` | Get sequence details and steps |
| `zernio_create_sequence` | Create a drip campaign sequence |
| `zernio_update_sequence` | Update sequence name or steps |
| `zernio_delete_sequence` | Delete a sequence |
| `zernio_activate_sequence` | Activate a paused sequence |
| `zernio_pause_sequence` | Pause an active sequence |
| `zernio_list_sequence_enrollments` | List enrolled contacts |

### Contact Enrollment (2 tools)

| Tool | Description |
|------|-------------|
| `zernio_enroll_contact_in_sequence` | Enroll a contact in a sequence |
| `zernio_unenroll_contact_from_sequence` | Remove a contact from a sequence |

### Tags (3 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_contact_tags` | List all contact tags |
| `zernio_add_contact_tag` | Add a tag to a contact |
| `zernio_remove_contact_tag` | Remove a tag from a contact |

### Twitter/X Actions (8 tools)

| Tool | Description |
|------|-------------|
| `zernio_twitter_retweet` | Retweet a tweet |
| `zernio_twitter_unretweet` | Undo a retweet |
| `zernio_twitter_like` | Like a tweet |
| `zernio_twitter_unlike` | Unlike a tweet |
| `zernio_twitter_bookmark` | Bookmark a tweet |
| `zernio_twitter_remove_bookmark` | Remove a bookmark |
| `zernio_twitter_follow` | Follow a user |
| `zernio_twitter_unfollow` | Unfollow a user |

### Reddit (4 tools)

| Tool | Description |
|------|-------------|
| `zernio_reddit_upvote` | Upvote a post or comment |
| `zernio_reddit_submit_post` | Submit a post to a subreddit |
| `zernio_search_reddit` | Search Reddit posts |
| `zernio_get_reddit_feed` | Get subreddit feed |

### Queue Scheduling (6 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_queue_slots` | List scheduled time slots |
| `zernio_create_queue_slot` | Create a queue slot |
| `zernio_update_queue_slot` | Update a queue slot |
| `zernio_delete_queue_slot` | Delete a queue slot |
| `zernio_preview_queue` | Preview upcoming scheduled slots |
| `zernio_get_next_queue_slot` | Get next available slot |

### Validation (4 tools)

| Tool | Description |
|------|-------------|
| `zernio_validate_post_length` | Check post character count limits |
| `zernio_validate_post` | Validate post content against platform rules |
| `zernio_validate_media` | Validate media files for a platform |
| `zernio_validate_subreddit` | Check if a subreddit exists |

### Connect / OAuth (17 tools)

| Tool | Description |
|------|-------------|
| `zernio_get_connect_url` | Get OAuth authorization URL for any platform |
| `zernio_get_pending_connection_data` | Get pending OAuth connection data |
| `zernio_connect_bluesky` | Connect Bluesky via credentials |
| `zernio_connect_telegram_start` | Start Telegram bot connection |
| `zernio_connect_telegram_verify` | Verify Telegram connection code |
| `zernio_check_telegram_connection` | Check Telegram connection status |
| `zernio_connect_whatsapp` | Connect WhatsApp Business |
| `zernio_list_facebook_pages_for_connect` | List Facebook pages during OAuth |
| `zernio_select_facebook_page` | Select a Facebook page to connect |
| `zernio_list_snapchat_profiles_for_connect` | List Snapchat profiles during OAuth |
| `zernio_select_snapchat_profile` | Select a Snapchat profile |
| `zernio_list_google_business_locations_for_connect` | List GMB locations during OAuth |
| `zernio_select_google_business_location` | Select a GMB location |
| `zernio_list_linkedin_organizations_for_connect` | List LinkedIn orgs during OAuth |
| `zernio_select_linkedin_organization` | Select a LinkedIn organization |
| `zernio_list_pinterest_boards_for_connect` | List Pinterest boards during OAuth |
| `zernio_select_pinterest_board` | Select a Pinterest board |

### Webhooks (5 tools)

| Tool | Description |
|------|-------------|
| `zernio_list_webhooks` | List configured webhooks |
| `zernio_create_webhook` | Create a webhook |
| `zernio_delete_webhook` | Delete a webhook |
| `zernio_update_webhook` | Update webhook settings |
| `zernio_test_webhook` | Send a test webhook event |
| `zernio_get_webhook_logs` | Get webhook delivery logs |

### WhatsApp Business (44 tools)

| Tool | Description |
|------|-------------|
| `zernio_get_whatsapp_business_profile` | Get WhatsApp Business profile |
| `zernio_update_whatsapp_business_profile` | Update business profile |
| `zernio_get_whatsapp_display_name` | Get display name and review status |
| `zernio_set_whatsapp_display_name` | Request display name change |
| `zernio_set_whatsapp_profile_photo` | Upload profile picture |
| `zernio_list_whatsapp_templates` | List message templates |
| `zernio_create_whatsapp_template` | Create a message template |
| `zernio_get_whatsapp_template` | Get template by name |
| `zernio_update_whatsapp_template` | Update a template |
| `zernio_delete_whatsapp_template` | Delete a template |
| `zernio_list_whatsapp_phone_numbers` | List registered phone numbers |
| `zernio_get_whatsapp_phone_number` | Get phone number details |
| `zernio_purchase_whatsapp_phone_number` | Purchase a phone number |
| `zernio_release_whatsapp_phone_number` | Release a phone number |
| `zernio_request_whatsapp_verification_code` | Request verification code |
| `zernio_verify_whatsapp_phone_number` | Verify a phone number |
| `zernio_list_whatsapp_flows` | List interactive flows |
| `zernio_create_whatsapp_flow` | Create a flow |
| `zernio_get_whatsapp_flow` | Get flow details |
| `zernio_update_whatsapp_flow` | Update a flow |
| `zernio_delete_whatsapp_flow` | Delete a flow |
| `zernio_publish_whatsapp_flow` | Publish a flow |
| `zernio_deprecate_whatsapp_flow` | Deprecate a flow |
| `zernio_upload_whatsapp_flow_json` | Upload flow JSON definition |
| `zernio_get_whatsapp_flow_json` | Get flow JSON definition |
| `zernio_send_whatsapp_flow_message` | Send a flow to a contact |
| `zernio_trigger_whatsapp_flow` | Trigger a flow for a contact |
| `zernio_list_whatsapp_groups` | List WhatsApp groups |
| `zernio_create_whatsapp_group` | Create a group |
| `zernio_get_whatsapp_group` | Get group details |
| `zernio_update_whatsapp_group` | Update group settings |
| `zernio_delete_whatsapp_group` | Delete a group |
| `zernio_add_whatsapp_group_participants` | Add group members |
| `zernio_remove_whatsapp_group_participants` | Remove group members |
| `zernio_create_whatsapp_group_invite_link` | Generate invite link |
| `zernio_list_whatsapp_group_join_requests` | List join requests |
| `zernio_approve_whatsapp_group_join_requests` | Approve join requests |
| `zernio_reject_whatsapp_group_join_requests` | Reject join requests |
| `zernio_send_whatsapp_bulk` | Bulk send template messages |
| `zernio_list_whatsapp_contacts` | List WhatsApp contacts |
| `zernio_create_whatsapp_contact` | Create a contact |
| `zernio_get_whatsapp_contact` | Get contact details |
| `zernio_update_whatsapp_contact` | Update a contact |
| `zernio_delete_whatsapp_contact` | Delete a contact |
| `zernio_import_whatsapp_contacts` | Bulk import contacts |
| `zernio_bulk_update_whatsapp_contacts` | Bulk update contacts |
| `zernio_list_whatsapp_contact_groups` | List contact groups |

### Profiles & Workspace (20 tools)

| Tool | Description |
|------|-------------|
| `zernio_get_profile` | Get current user profile |
| `zernio_update_profile` | Update user profile |
| `zernio_list_profiles` | List Zernio profiles (brands/projects) |
| `zernio_create_zernio_profile` | Create a new profile |
| `zernio_get_zernio_profile` | Get profile details |
| `zernio_update_zernio_profile` | Update a profile |
| `zernio_delete_zernio_profile` | Delete a profile |
| `zernio_list_account_groups` | List account groups |
| `zernio_create_account_group` | Create an account group |
| `zernio_update_account_group` | Update an account group |
| `zernio_delete_account_group` | Delete an account group |
| `zernio_list_users` | List workspace team members |
| `zernio_get_user` | Get user details |
| `zernio_invite_user` | Invite a team member |
| `zernio_remove_user` | Remove a team member |
| `zernio_create_invite_token` | Create an invite token |
| `zernio_get_usage_stats` | Get workspace usage statistics |
| `zernio_list_api_keys` | List API keys |
| `zernio_create_api_key` | Create an API key |
| `zernio_delete_api_key` | Revoke an API key |

### Logs (2 tools)

| Tool | Description |
|------|-------------|
| `zernio_get_webhook_logs` | Get webhook delivery logs |
| `zernio_get_connection_logs` | Get connection attempt logs |

---

## Supported Platforms

| Platform | Posts | Analytics | Inbox | Reviews | Ads |
|----------|-------|-----------|-------|---------|-----|
| Twitter/X | Yes | Yes | Yes | - | - |
| Instagram | Yes | Yes | Yes | - | Yes |
| Facebook | Yes | Yes | Yes | - | Yes |
| LinkedIn | Yes | Yes | Yes | - | - |
| TikTok | Yes | - | - | - | - |
| YouTube | Yes | Yes | Yes | - | - |
| Pinterest | Yes | - | - | - | Yes |
| Reddit | Yes | - | - | - | - |
| Bluesky | Yes | - | - | - | - |
| Threads | Yes | - | - | - | - |
| Google Business | Yes | Yes | - | Yes | Yes |
| Telegram | - | - | Yes | - | - |
| Snapchat | Yes | - | - | - | - |
| WhatsApp | - | - | Yes | - | - |

---

## Example Prompts

Once configured, you can ask Claude things like:

- *"What comments came in today across all my social accounts?"*
- *"Reply to all unanswered DMs with a friendly acknowledgment"*
- *"Show me the engagement stats for my last 5 Instagram posts"*
- *"What's the best time to post on Instagram based on my audience?"*
- *"Summarize all new reviews and draft replies for the 1-star ones"*
- *"Create a post saying 'Hello World!' scheduled for tomorrow at 9am on Twitter and LinkedIn"*
- *"Boost my best-performing post from this week with a $50 budget"*
- *"Show me my follower growth over the past 30 days"*
- *"Send a WhatsApp template message to all my VIP contacts"*
- *"Set up an automation to auto-reply when someone comments 'price' on my posts"*
- *"What's my Google Business Profile performance this month?"*
- *"Create a drip campaign sequence with 3 follow-up messages"*

---

## Development

```bash
npm install
npm run build       # compile TypeScript
npm start           # run the server
npm test            # run all tests (667 tests)
npm run test:watch  # run tests in watch mode
```

### Project Structure

```
src/
  index.ts                  # MCP server entry point
  client.ts                 # API request utility
  tools/
    accounts.ts             # 42 tools - account management, GMB, platform settings
    ads.ts                  # 19 tools - campaigns, ads, audiences, targeting
    analytics.ts            # 16 tools - metrics, demographics, insights
    automations.ts          #  6 tools - comment-to-DM automations
    broadcasts.ts           #  7 tools - mass messaging
    comments.ts             #  8 tools - comment management
    connect.ts              # 17 tools - OAuth and platform connections
    contacts.ts             # 11 tools - CRM contacts and custom fields
    messages.ts             # 10 tools - DM conversations
    posts.ts                # 25 tools - post CRUD, media, approval workflows
    profiles.ts             # 20 tools - workspace, users, API keys
    queue.ts                #  6 tools - scheduling queue slots
    reddit.ts               #  2 tools - Reddit search and feed
    reviews.ts              #  3 tools - review management
    social.ts               # 33 tools - Twitter, sequences, webhooks, tags
    validation.ts           #  4 tools - content and media validation
    whatsapp-business.ts    # 44 tools - WhatsApp Business full suite
  __tests__/                # 667 tests across 19 test files
```

### Built With

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - MCP server framework
- [Zod](https://zod.dev) - Schema validation
- [Vitest](https://vitest.dev) - Testing framework
- TypeScript / Node.js

---

## CI/CD

- **CI**: Runs on every push and PR to `main` — builds and tests on Node 20 and 22
- **Publish**: Automatically publishes to npm when a GitHub release is created (requires `NPM_TOKEN` secret)

---

## License

MIT
