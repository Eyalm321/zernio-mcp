import { z } from "zod";
import { zernioRequest } from "../client.js";

export const whatsappBusinessTools = [
  {
    name: "zernio_get_whatsapp_business_profile",
    description: "Get the WhatsApp Business profile info (display name, description, website, category, etc.).",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/business-profile", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_update_whatsapp_business_profile",
    description: "Update the WhatsApp Business profile (display name, description, website, category, etc.).",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      displayName: z.string().optional().describe("Business display name"),
      description: z.string().optional().describe("Business description"),
      website: z.string().optional().describe("Business website URL"),
      category: z.string().optional().describe("Business category"),
      email: z.string().optional().describe("Business email address"),
      address: z.string().optional().describe("Business address"),
    }),
    handler: async (args: { accountId: string; displayName?: string; description?: string; website?: string; category?: string; email?: string; address?: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/business-profile", {
        accountId: args.accountId,
        displayName: args.displayName,
        description: args.description,
        website: args.website,
        category: args.category,
        email: args.email,
        address: args.address,
      });
    },
  },
  {
    name: "zernio_list_whatsapp_templates",
    description: "List all WhatsApp Business message templates (pre-approved templates for sending to users outside the 24-hour window).",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/templates", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_create_whatsapp_template",
    description: "Create a new WhatsApp Business message template for approval by Meta.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().describe("Template name (lowercase letters, numbers, and underscores only)"),
      category: z.string().describe("Template category: MARKETING, UTILITY, or AUTHENTICATION"),
      language: z.string().describe("Language code (e.g. 'en', 'en_US', 'es')"),
      body: z.string().describe("Template body text. Use {{1}}, {{2}} etc. for variables"),
      header: z.string().optional().describe("Optional header text"),
      footer: z.string().optional().describe("Optional footer text"),
    }),
    handler: async (args: { accountId: string; name: string; category: string; language: string; body: string; header?: string; footer?: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/templates", {
        accountId: args.accountId,
        name: args.name,
        category: args.category,
        language: args.language,
        body: args.body,
        header: args.header,
        footer: args.footer,
      });
    },
  },
  {
    name: "zernio_list_whatsapp_phone_numbers",
    description: "List all WhatsApp Business phone numbers registered to an account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/phone-numbers", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_purchase_whatsapp_phone_number",
    description: "Purchase a new WhatsApp Business phone number.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      countryCode: z.string().describe("Country code (e.g. 'US', 'GB')"),
      areaCode: z.string().optional().describe("Preferred area code"),
    }),
    handler: async (args: { accountId: string; countryCode: string; areaCode?: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/phone-numbers/purchase", {
        accountId: args.accountId,
        countryCode: args.countryCode,
        areaCode: args.areaCode,
      });
    },
  },
  {
    name: "zernio_request_whatsapp_verification_code",
    description: "Request a verification code (SMS or voice call) to verify a WhatsApp Business phone number.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      phoneNumberId: z.string().describe("The phone number ID to verify"),
      method: z.enum(["sms", "voice"]).describe("Verification method: sms or voice"),
    }),
    handler: async (args: { accountId: string; phoneNumberId: string; method: "sms" | "voice" }) => {
      return zernioRequest("POST", `/v1/whatsapp/phone-numbers/${args.phoneNumberId}/request-code`, {
        accountId: args.accountId,
        method: args.method,
      });
    },
  },
  {
    name: "zernio_verify_whatsapp_phone_number",
    description: "Verify a WhatsApp Business phone number using the code received via SMS or voice call.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      phoneNumberId: z.string().describe("The phone number ID to verify"),
      code: z.string().describe("The 6-digit verification code received"),
    }),
    handler: async (args: { accountId: string; phoneNumberId: string; code: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/phone-numbers/${args.phoneNumberId}/verify`, {
        accountId: args.accountId,
        code: args.code,
      });
    },
  },
  {
    name: "zernio_create_whatsapp_flow",
    description: "Create a new WhatsApp Flow -- an interactive automated conversation experience.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().describe("Flow name"),
      categories: z.array(z.string()).describe("Flow categories (e.g. ['APPOINTMENT_BOOKING', 'LEAD_GENERATION'])"),
    }),
    handler: async (args: { accountId: string; name: string; categories: string[] }) => {
      return zernioRequest("POST", "/v1/whatsapp/flows", {
        accountId: args.accountId,
        name: args.name,
        categories: args.categories,
      });
    },
  },
  {
    name: "zernio_publish_whatsapp_flow",
    description: "Publish a WhatsApp Flow to make it live and available to users.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID to publish"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { flowId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/flows/${args.flowId}/publish`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_upload_whatsapp_flow_json",
    description: "Upload or update the JSON definition of a WhatsApp Flow.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      flowJson: z.string().describe("The flow JSON definition as a string"),
    }),
    handler: async (args: { flowId: string; accountId: string; flowJson: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/flows/${args.flowId}/upload`, {
        accountId: args.accountId,
        flowJson: args.flowJson,
      });
    },
  },
  {
    name: "zernio_list_whatsapp_groups",
    description: "List all WhatsApp Group chats managed through a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/wa-groups", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_create_whatsapp_group",
    description: "Create a new WhatsApp Group chat.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().describe("Group name"),
      participants: z.array(z.string()).describe("List of participant phone numbers (with country code, e.g. +1234567890)"),
    }),
    handler: async (args: { accountId: string; name: string; participants: string[] }) => {
      return zernioRequest("POST", "/v1/whatsapp/wa-groups", {
        accountId: args.accountId,
        name: args.name,
        participants: args.participants,
      });
    },
  },
  {
    name: "zernio_add_whatsapp_group_participants",
    description: "Add participants to an existing WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      participants: z.array(z.string()).describe("Phone numbers to add (with country code)"),
    }),
    handler: async (args: { groupId: string; accountId: string; participants: string[] }) => {
      return zernioRequest("POST", `/v1/whatsapp/wa-groups/${args.groupId}/participants`, {
        accountId: args.accountId,
        participants: args.participants,
      });
    },
  },
  {
    name: "zernio_remove_whatsapp_group_participants",
    description: "Remove participants from a WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      participants: z.array(z.string()).describe("Phone numbers to remove (with country code)"),
    }),
    handler: async (args: { groupId: string; accountId: string; participants: string[] }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/wa-groups/${args.groupId}/participants`, {
        accountId: args.accountId,
        participants: args.participants,
      });
    },
  },
  {
    name: "zernio_create_whatsapp_group_invite_link",
    description: "Generate an invite link for a WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { groupId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/wa-groups/${args.groupId}/invite-link`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_list_whatsapp_group_join_requests",
    description: "List pending join requests for a WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { groupId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/wa-groups/${args.groupId}/join-requests`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_approve_whatsapp_group_join_requests",
    description: "Approve pending join requests for a WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      requestIds: z.array(z.string()).describe("List of join request IDs to approve"),
    }),
    handler: async (args: { groupId: string; accountId: string; requestIds: string[] }) => {
      return zernioRequest("POST", `/v1/whatsapp/wa-groups/${args.groupId}/join-requests`, {
        accountId: args.accountId,
        requestIds: args.requestIds,
      });
    },
  },
];
