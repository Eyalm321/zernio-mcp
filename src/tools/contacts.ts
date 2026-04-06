import { z } from "zod";
import { zernioRequest } from "../client.js";

export const contactTools = [
  {
    name: "zernio_list_contacts",
    description: "List all contacts in your Zernio CRM with their info and channels.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Max contacts to return"),
      search: z.string().optional().describe("Search by name or email"),
    }),
    handler: async (args: { limit?: number; search?: string }) => {
      return zernioRequest("GET", "/v1/contacts", undefined, { limit: args.limit, search: args.search });
    },
  },
  {
    name: "zernio_get_contact",
    description: "Get details for a specific contact.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
    }),
    handler: async (args: { contactId: string }) => {
      return zernioRequest("GET", `/v1/contacts/${args.contactId}`);
    },
  },
  {
    name: "zernio_create_contact",
    description: "Create a new contact in your Zernio CRM.",
    inputSchema: z.object({
      name: z.string().describe("Contact's full name"),
      email: z.string().optional().describe("Contact's email address"),
      phone: z.string().optional().describe("Contact's phone number"),
    }),
    handler: async (args: { name: string; email?: string; phone?: string }) => {
      return zernioRequest("POST", "/v1/contacts", { name: args.name, email: args.email, phone: args.phone });
    },
  },
  {
    name: "zernio_update_contact",
    description: "Update an existing contact's details.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
      name: z.string().optional().describe("Updated name"),
      email: z.string().optional().describe("Updated email"),
      phone: z.string().optional().describe("Updated phone"),
    }),
    handler: async (args: { contactId: string; name?: string; email?: string; phone?: string }) => {
      return zernioRequest("PUT", `/v1/contacts/${args.contactId}`, { name: args.name, email: args.email, phone: args.phone });
    },
  },
  {
    name: "zernio_delete_contact",
    description: "Delete a contact from your Zernio CRM.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID to delete"),
    }),
    handler: async (args: { contactId: string }) => {
      return zernioRequest("DELETE", `/v1/contacts/${args.contactId}`);
    },
  },
  {
    name: "zernio_bulk_create_contacts",
    description: "Create multiple contacts at once in bulk.",
    inputSchema: z.object({
      contacts: z.array(z.object({
        name: z.string().describe("Contact name"),
        email: z.string().optional().describe("Contact email"),
        phone: z.string().optional().describe("Contact phone"),
      })).describe("Array of contacts to create"),
    }),
    handler: async (args: { contacts: Array<{ name: string; email?: string; phone?: string }> }) => {
      return zernioRequest("POST", "/v1/contacts/bulk", { contacts: args.contacts });
    },
  },
  {
    name: "zernio_get_contact_channels",
    description: "Get all connected social media channels for a specific contact.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
    }),
    handler: async (args: { contactId: string }) => {
      return zernioRequest("GET", `/v1/contacts/${args.contactId}/channels`);
    },
  },
  {
    name: "zernio_update_contact_field",
    description: "Update a custom field value for a contact.",
    inputSchema: z.object({
      contactId: z.string().describe("The contact ID"),
      fieldSlug: z.string().describe("The custom field slug/key"),
      value: z.string().describe("The new value for the field"),
    }),
    handler: async (args: { contactId: string; fieldSlug: string; value: string }) => {
      return zernioRequest("PUT", `/v1/contacts/${args.contactId}/fields/${args.fieldSlug}`, { value: args.value });
    },
  },
  {
    name: "zernio_list_custom_fields",
    description: "List all custom contact fields defined in your Zernio account.",
    inputSchema: z.object({}),
    handler: async (_args: Record<string, never>) => {
      return zernioRequest("GET", "/v1/custom-fields");
    },
  },
  {
    name: "zernio_create_custom_field",
    description: "Create a new custom field for contacts.",
    inputSchema: z.object({
      name: z.string().describe("Field name"),
      type: z.string().describe("Field type: text, number, date, boolean, etc."),
      slug: z.string().optional().describe("Field slug/key (auto-generated if not provided)"),
    }),
    handler: async (args: { name: string; type: string; slug?: string }) => {
      return zernioRequest("POST", "/v1/custom-fields", { name: args.name, type: args.type, slug: args.slug });
    },
  },
  {
    name: "zernio_delete_custom_field",
    description: "Delete a custom contact field.",
    inputSchema: z.object({
      fieldId: z.string().describe("The custom field ID to delete"),
    }),
    handler: async (args: { fieldId: string }) => {
      return zernioRequest("DELETE", `/v1/custom-fields/${args.fieldId}`);
    },
  },
];
