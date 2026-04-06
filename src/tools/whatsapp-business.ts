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
  {
    name: "zernio_get_whatsapp_template",
    description: "Get details for a specific WhatsApp Business message template by name.",
    inputSchema: z.object({
      templateName: z.string().describe("The template name to retrieve"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { templateName: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/templates/${args.templateName}`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_update_whatsapp_template",
    description: "Update an existing WhatsApp Business message template.",
    inputSchema: z.object({
      templateName: z.string().describe("The template name to update"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      body: z.string().optional().describe("Updated template body text"),
      header: z.string().optional().describe("Updated header text"),
      footer: z.string().optional().describe("Updated footer text"),
    }),
    handler: async (args: { templateName: string; accountId: string; body?: string; header?: string; footer?: string }) => {
      return zernioRequest("PATCH", `/v1/whatsapp/templates/${args.templateName}`, {
        accountId: args.accountId,
        body: args.body,
        header: args.header,
        footer: args.footer,
      });
    },
  },
  {
    name: "zernio_delete_whatsapp_template",
    description: "Delete a WhatsApp Business message template.",
    inputSchema: z.object({
      templateName: z.string().describe("The template name to delete"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { templateName: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/templates/${args.templateName}`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_whatsapp_phone_number",
    description: "Get details for a specific WhatsApp Business phone number.",
    inputSchema: z.object({
      phoneNumberId: z.string().describe("The phone number ID to retrieve"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { phoneNumberId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/phone-numbers/${args.phoneNumberId}`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_release_whatsapp_phone_number",
    description: "Release (delete) a WhatsApp Business phone number.",
    inputSchema: z.object({
      phoneNumberId: z.string().describe("The phone number ID to release"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { phoneNumberId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/phone-numbers/${args.phoneNumberId}`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_whatsapp_display_name",
    description: "Get the display name of a WhatsApp Business profile.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/business-profile/display-name", undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_set_whatsapp_display_name",
    description: "Set or update the display name of a WhatsApp Business profile.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      displayName: z.string().describe("The new display name for the business profile"),
    }),
    handler: async (args: { accountId: string; displayName: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/business-profile/display-name", {
        accountId: args.accountId,
        displayName: args.displayName,
      });
    },
  },
  {
    name: "zernio_set_whatsapp_profile_photo",
    description: "Set or update the profile photo of a WhatsApp Business profile.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      photoUrl: z.string().describe("Public URL of the photo to set as the profile picture"),
    }),
    handler: async (args: { accountId: string; photoUrl: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/business-profile/photo", {
        accountId: args.accountId,
        photoUrl: args.photoUrl,
      });
    },
  },
  {
    name: "zernio_update_whatsapp_flow",
    description: "Update an existing WhatsApp Flow's metadata (e.g. name).",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID to update"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().optional().describe("Updated flow name"),
    }),
    handler: async (args: { flowId: string; accountId: string; name?: string }) => {
      return zernioRequest("PATCH", `/v1/whatsapp/flows/${args.flowId}`, {
        accountId: args.accountId,
        name: args.name,
      });
    },
  },
  {
    name: "zernio_delete_whatsapp_flow",
    description: "Delete a WhatsApp Flow.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID to delete"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { flowId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/flows/${args.flowId}`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_get_whatsapp_flow_json",
    description: "Get the JSON definition of a WhatsApp Flow.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { flowId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/flows/${args.flowId}/json`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_deprecate_whatsapp_flow",
    description: "Deprecate a published WhatsApp Flow so it can no longer be used by new users.",
    inputSchema: z.object({
      flowId: z.string().describe("The WhatsApp Flow ID to deprecate"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { flowId: string; accountId: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/flows/${args.flowId}/deprecate`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_send_whatsapp_flow_message",
    description: "Send a WhatsApp Flow message to a contact to start an interactive flow experience.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      flowId: z.string().describe("The WhatsApp Flow ID to send"),
      contactId: z.string().describe("The contact ID to send the flow to"),
    }),
    handler: async (args: { accountId: string; flowId: string; contactId: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/flows/send", {
        accountId: args.accountId,
        flowId: args.flowId,
        contactId: args.contactId,
      });
    },
  },
  {
    name: "zernio_get_whatsapp_group",
    description: "Get details for a specific WhatsApp Group chat.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { groupId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/wa-groups/${args.groupId}`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_update_whatsapp_group",
    description: "Update a WhatsApp Group's details (e.g. name).",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().optional().describe("Updated group name"),
    }),
    handler: async (args: { groupId: string; accountId: string; name?: string }) => {
      return zernioRequest("POST", `/v1/whatsapp/wa-groups/${args.groupId}`, {
        accountId: args.accountId,
        name: args.name,
      });
    },
  },
  {
    name: "zernio_delete_whatsapp_group",
    description: "Delete a WhatsApp Group chat.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID to delete"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { groupId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/wa-groups/${args.groupId}`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_reject_whatsapp_group_join_requests",
    description: "Reject pending join requests for a WhatsApp Group.",
    inputSchema: z.object({
      groupId: z.string().describe("The WhatsApp Group ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      requestIds: z.array(z.string()).describe("List of join request IDs to reject"),
    }),
    handler: async (args: { groupId: string; accountId: string; requestIds: string[] }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/wa-groups/${args.groupId}/join-requests`, {
        accountId: args.accountId,
        requestIds: args.requestIds,
      });
    },
  },
  {
    name: "zernio_send_whatsapp_bulk",
    description: "Send a bulk WhatsApp message using a template to multiple contacts at once.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      templateName: z.string().describe("The approved template name to send"),
      contacts: z.array(z.string()).describe("List of contact IDs or phone numbers to send to"),
    }),
    handler: async (args: { accountId: string; templateName: string; contacts: string[] }) => {
      return zernioRequest("POST", "/v1/whatsapp/bulk", {
        accountId: args.accountId,
        templateName: args.templateName,
        contacts: args.contacts,
      });
    },
  },
  {
    name: "zernio_list_whatsapp_contacts",
    description: "List all WhatsApp contacts for a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      limit: z.number().optional().describe("Max contacts to return"),
      offset: z.number().optional().describe("Number of contacts to skip for pagination"),
    }),
    handler: async (args: { accountId: string; limit?: number; offset?: number }) => {
      return zernioRequest("GET", "/v1/whatsapp/contacts", undefined, {
        accountId: args.accountId,
        limit: args.limit,
        offset: args.offset,
      });
    },
  },
  {
    name: "zernio_create_whatsapp_contact",
    description: "Create a new WhatsApp contact in a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().describe("Contact's full name"),
      phoneNumber: z.string().describe("Contact's phone number with country code (e.g. +1234567890)"),
      email: z.string().optional().describe("Contact's email address"),
    }),
    handler: async (args: { accountId: string; name: string; phoneNumber: string; email?: string }) => {
      return zernioRequest("POST", "/v1/whatsapp/contacts", {
        accountId: args.accountId,
        name: args.name,
        phoneNumber: args.phoneNumber,
        email: args.email,
      });
    },
  },
  {
    name: "zernio_get_whatsapp_contact",
    description: "Get details for a specific WhatsApp contact.",
    inputSchema: z.object({
      contactId: z.string().describe("The WhatsApp contact ID"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { contactId: string; accountId: string }) => {
      return zernioRequest("GET", `/v1/whatsapp/contacts/${args.contactId}`, undefined, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_update_whatsapp_contact",
    description: "Update an existing WhatsApp contact's details.",
    inputSchema: z.object({
      contactId: z.string().describe("The WhatsApp contact ID to update"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
      name: z.string().optional().describe("Updated contact name"),
      email: z.string().optional().describe("Updated contact email"),
    }),
    handler: async (args: { contactId: string; accountId: string; name?: string; email?: string }) => {
      return zernioRequest("PUT", `/v1/whatsapp/contacts/${args.contactId}`, {
        accountId: args.accountId,
        name: args.name,
        email: args.email,
      });
    },
  },
  {
    name: "zernio_delete_whatsapp_contact",
    description: "Delete a WhatsApp contact from a connected WhatsApp Business account.",
    inputSchema: z.object({
      contactId: z.string().describe("The WhatsApp contact ID to delete"),
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { contactId: string; accountId: string }) => {
      return zernioRequest("DELETE", `/v1/whatsapp/contacts/${args.contactId}`, { accountId: args.accountId });
    },
  },
  {
    name: "zernio_import_whatsapp_contacts",
    description: "Import multiple WhatsApp contacts at once into a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      contacts: z.array(z.object({
        name: z.string().describe("Contact name"),
        phoneNumber: z.string().describe("Contact phone number with country code"),
        email: z.string().optional().describe("Contact email address"),
      })).describe("Array of contacts to import"),
    }),
    handler: async (args: { accountId: string; contacts: Array<{ name: string; phoneNumber: string; email?: string }> }) => {
      return zernioRequest("POST", "/v1/whatsapp/contacts/import", {
        accountId: args.accountId,
        contacts: args.contacts,
      });
    },
  },
  {
    name: "zernio_bulk_update_whatsapp_contacts",
    description: "Update multiple WhatsApp contacts at once in a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
      contacts: z.array(z.object({
        contactId: z.string().describe("The contact ID to update"),
        name: z.string().optional().describe("Updated contact name"),
        email: z.string().optional().describe("Updated contact email"),
      })).describe("Array of contacts to update"),
    }),
    handler: async (args: { accountId: string; contacts: Array<{ contactId: string; name?: string; email?: string }> }) => {
      return zernioRequest("POST", "/v1/whatsapp/contacts/bulk", {
        accountId: args.accountId,
        contacts: args.contacts,
      });
    },
  },
  {
    name: "zernio_list_whatsapp_contact_groups",
    description: "List all contact groups for a connected WhatsApp Business account.",
    inputSchema: z.object({
      accountId: z.string().describe("The WhatsApp Business account ID"),
    }),
    handler: async (args: { accountId: string }) => {
      return zernioRequest("GET", "/v1/whatsapp/groups", undefined, { accountId: args.accountId });
    },
  },
];
