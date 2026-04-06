import { z } from "zod";
import { zernioRequest } from "../client.js";

export const socialTools = [
  // Twitter / X actions
  {
    name: "zernio_twitter_retweet",
    description: "Retweet a tweet from a connected Twitter/X account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID to retweet from"),
      tweetId: z.string().describe("The tweet ID to retweet"),
    }),
    handler: async (args: { accountId: string; tweetId: string }) => {
      return zernioRequest("POST", `/v1/twitter/retweet`, { accountId: args.accountId, tweetId: args.tweetId });
    },
  },
  {
    name: "zernio_twitter_unretweet",
    description: "Undo a retweet from a connected Twitter/X account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID"),
      tweetId: z.string().describe("The tweet ID to un-retweet"),
    }),
    handler: async (args: { accountId: string; tweetId: string }) => {
      return zernioRequest("DELETE", `/v1/twitter/retweet`, { accountId: args.accountId, tweetId: args.tweetId });
    },
  },
  {
    name: "zernio_twitter_like",
    description: "Like a tweet from a connected Twitter/X account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID to like from"),
      tweetId: z.string().describe("The tweet ID to like"),
    }),
    handler: async (args: { accountId: string; tweetId: string }) => {
      return zernioRequest("POST", `/v1/twitter/like`, { accountId: args.accountId, tweetId: args.tweetId });
    },
  },
  {
    name: "zernio_twitter_bookmark",
    description: "Bookmark a tweet on a connected Twitter/X account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID"),
      tweetId: z.string().describe("The tweet ID to bookmark"),
    }),
    handler: async (args: { accountId: string; tweetId: string }) => {
      return zernioRequest("POST", `/v1/twitter/bookmark`, { accountId: args.accountId, tweetId: args.tweetId });
    },
  },
  {
    name: "zernio_twitter_remove_bookmark",
    description: "Remove a bookmarked tweet on a connected Twitter/X account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID"),
      tweetId: z.string().describe("The tweet ID to un-bookmark"),
    }),
    handler: async (args: { accountId: string; tweetId: string }) => {
      return zernioRequest("DELETE", `/v1/twitter/bookmark`, { accountId: args.accountId, tweetId: args.tweetId });
    },
  },
  {
    name: "zernio_twitter_follow",
    description: "Follow a Twitter/X user from a connected account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID to follow from"),
      targetUserId: z.string().describe("The Twitter user ID to follow"),
    }),
    handler: async (args: { accountId: string; targetUserId: string }) => {
      return zernioRequest("POST", `/v1/twitter/follow`, { accountId: args.accountId, targetUserId: args.targetUserId });
    },
  },
  {
    name: "zernio_twitter_unfollow",
    description: "Unfollow a Twitter/X user from a connected account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Twitter account ID"),
      targetUserId: z.string().describe("The Twitter user ID to unfollow"),
    }),
    handler: async (args: { accountId: string; targetUserId: string }) => {
      return zernioRequest("DELETE", `/v1/twitter/follow`, { accountId: args.accountId, targetUserId: args.targetUserId });
    },
  },
  // Reddit actions
  {
    name: "zernio_reddit_upvote",
    description: "Upvote a Reddit post or comment from a connected Reddit account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Reddit account ID"),
      targetId: z.string().describe("The Reddit post or comment ID to upvote"),
    }),
    handler: async (args: { accountId: string; targetId: string }) => {
      return zernioRequest("POST", `/v1/social/reddit/upvote`, { accountId: args.accountId, targetId: args.targetId });
    },
  },
  {
    name: "zernio_reddit_submit_post",
    description: "Submit a new post to a Reddit subreddit from a connected account.",
    inputSchema: z.object({
      accountId: z.string().describe("The Reddit account ID to post from"),
      subreddit: z.string().describe("The subreddit to post to (without r/)"),
      title: z.string().describe("The post title"),
      content: z.string().optional().describe("Text content for text posts"),
      url: z.string().optional().describe("URL for link posts"),
    }),
    handler: async (args: { accountId: string; subreddit: string; title: string; content?: string; url?: string }) => {
      return zernioRequest("POST", `/v1/social/reddit/submit`, {
        accountId: args.accountId,
        subreddit: args.subreddit,
        title: args.title,
        content: args.content,
        url: args.url,
      });
    },
  },
  // Sequences (drip campaigns / message sequences)
  {
    name: "zernio_list_sequences",
    description: "List all message sequences (drip campaigns) for automated follow-up messaging.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by account ID"),
    }),
    handler: async (args: { accountId?: string }) => {
      return zernioRequest("GET", "/v1/sequences", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_sequence",
    description: "Get details for a specific message sequence including its steps.",
    inputSchema: z.object({
      sequenceId: z.string().describe("The sequence ID"),
    }),
    handler: async (args: { sequenceId: string }) => {
      return zernioRequest("GET", `/v1/sequences/${args.sequenceId}`);
    },
  },
  {
    name: "zernio_create_sequence",
    description: "Create a new message sequence (drip campaign) with automated follow-up steps.",
    inputSchema: z.object({
      name: z.string().describe("Sequence name"),
      accountId: z.string().describe("The account ID to send from"),
      steps: z.array(z.object({
        message: z.string().describe("Message content for this step"),
        delayDays: z.number().describe("Days to wait after previous step before sending"),
      })).describe("The sequence steps in order"),
    }),
    handler: async (args: { name: string; accountId: string; steps: Array<{ message: string; delayDays: number }> }) => {
      return zernioRequest("POST", "/v1/sequences", { name: args.name, accountId: args.accountId, steps: args.steps });
    },
  },
  {
    name: "zernio_enroll_contact_in_sequence",
    description: "Enroll a contact into a message sequence to start receiving automated follow-ups.",
    inputSchema: z.object({
      sequenceId: z.string().describe("The sequence ID"),
      contactId: z.string().describe("The contact ID to enroll"),
    }),
    handler: async (args: { sequenceId: string; contactId: string }) => {
      return zernioRequest("POST", `/v1/sequences/${args.sequenceId}/enroll`, { contactId: args.contactId });
    },
  },
  {
    name: "zernio_unenroll_contact_from_sequence",
    description: "Remove a contact from a message sequence to stop their automated follow-ups.",
    inputSchema: z.object({
      sequenceId: z.string().describe("The sequence ID"),
      contactId: z.string().describe("The contact ID to unenroll"),
    }),
    handler: async (args: { sequenceId: string; contactId: string }) => {
      return zernioRequest("DELETE", `/v1/sequences/${args.sequenceId}/enroll/${args.contactId}`);
    },
  },
  // Webhooks
  {
    name: "zernio_list_webhooks",
    description: "List all configured webhooks for receiving Zernio event notifications.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/webhooks");
    },
  },
  {
    name: "zernio_create_webhook",
    description: "Create a new webhook to receive real-time event notifications from Zernio.",
    inputSchema: z.object({
      url: z.string().describe("The HTTPS URL to send webhook events to"),
      events: z.array(z.string()).describe("Event types to subscribe to (e.g. 'message.received', 'comment.created')"),
      secret: z.string().optional().describe("Secret key for webhook signature verification"),
    }),
    handler: async (args: { url: string; events: string[]; secret?: string }) => {
      return zernioRequest("POST", "/v1/webhooks", { url: args.url, events: args.events, secret: args.secret });
    },
  },
  {
    name: "zernio_delete_webhook",
    description: "Delete a webhook subscription.",
    inputSchema: z.object({
      webhookId: z.string().describe("The webhook ID to delete"),
    }),
    handler: async (args: { webhookId: string }) => {
      return zernioRequest("DELETE", `/v1/webhooks/${args.webhookId}`);
    },
  },
  // WhatsApp flows
  {
    name: "zernio_list_whatsapp_flows",
    description: "List all WhatsApp flows for automating WhatsApp Business conversations.",
    inputSchema: z.object({
      accountId: z.string().optional().describe("Filter by WhatsApp account ID"),
    }),
    handler: async (args: { accountId?: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/flows", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_whatsapp_flow",
    description: "Get details for a specific WhatsApp flow.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp flow ID"),
    }),
    handler: async (args: { flowId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/flows/${args.flowId}`);
    },
  },
  {
    name: "zernio_trigger_whatsapp_flow",
    description: "Trigger a WhatsApp flow for a specific contact.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp flow ID"),
      contactId: z.string().describe("The contact ID to trigger the flow for"),
    }),
    handler: async (args: { flowId: string; contactId: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/flows/${args.flowId}/trigger`, { contactId: args.contactId });
    },
  },
  // Tags
  {
    name: "zernio_list_contact_tags",
    description: "List all contact tags used to segment and organize contacts.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/contacts/tags");
    },
  },
  {
    name: "zernio_add_contact_tag",
    description: "Add a tag to a contact for segmentation.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
      tag: z.string().describe("The tag to add"),
    }),
    handler: async (args: { contactId: string; tag: string }) => {
      return zernioRequest("POST", `/v1/contacts/${args.contactId}/tags`, { tag: args.tag });
    },
  },
  {
    name: "zernio_remove_contact_tag",
    description: "Remove a tag from a contact.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
      tag: z.string().describe("The tag to remove"),
    }),
    handler: async (args: { contactId: string; tag: string }) => {
      return zernioRequest("DELETE", `/v1/contacts/${args.contactId}/tags/${args.tag}`);
    },
  },
];
