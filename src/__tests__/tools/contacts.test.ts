import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { contactTools } from "../../tools/contacts.js";

const mockRequest = vi.mocked(zernioRequest);

describe("contactTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 11 tools", () => {
    expect(contactTools).toHaveLength(11);
  });

  it("has no duplicate tool names", () => {
    const names = contactTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_list_contacts", () => {
    const tool = contactTools.find((t) => t.name === "zernio_list_contacts")!;

    it("exists with description and schema", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeDefined();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ limit: 50, search: "john" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/contacts", undefined, {
        limit: 50,
        search: "john",
      });
    });
  });

  describe("zernio_get_contact", () => {
    const tool = contactTools.find((t) => t.name === "zernio_get_contact")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/contacts/ct-123");
    });
  });

  describe("zernio_create_contact", () => {
    const tool = contactTools.find((t) => t.name === "zernio_create_contact")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "John Doe", email: "john@test.com", phone: "+1234567890" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/contacts", {
        name: "John Doe",
        email: "john@test.com",
        phone: "+1234567890",
      });
    });
  });

  describe("zernio_update_contact", () => {
    const tool = contactTools.find((t) => t.name === "zernio_update_contact")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-123", name: "Jane", email: "jane@test.com", phone: undefined });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/contacts/ct-123", {
        name: "Jane",
        email: "jane@test.com",
        phone: undefined,
      });
    });
  });

  describe("zernio_delete_contact", () => {
    const tool = contactTools.find((t) => t.name === "zernio_delete_contact")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-123" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/contacts/ct-123");
    });
  });

  describe("zernio_bulk_create_contacts", () => {
    const tool = contactTools.find((t) => t.name === "zernio_bulk_create_contacts")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      const contacts = [
        { name: "Alice", email: "alice@test.com" },
        { name: "Bob", phone: "+111" },
      ];
      await tool.handler({ contacts });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/contacts/bulk", { contacts });
    });
  });

  describe("zernio_get_contact_channels", () => {
    const tool = contactTools.find((t) => t.name === "zernio_get_contact_channels")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-123" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/contacts/ct-123/channels");
    });
  });

  describe("zernio_update_contact_field", () => {
    const tool = contactTools.find((t) => t.name === "zernio_update_contact_field")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "ct-123", fieldSlug: "company", value: "Acme" });
      expect(mockRequest).toHaveBeenCalledWith(
        "PUT",
        "/v1/contacts/ct-123/fields/company",
        { value: "Acme" }
      );
    });
  });

  describe("zernio_list_custom_fields", () => {
    const tool = contactTools.find((t) => t.name === "zernio_list_custom_fields")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({} as any);
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/custom-fields");
    });
  });

  describe("zernio_create_custom_field", () => {
    const tool = contactTools.find((t) => t.name === "zernio_create_custom_field")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ name: "Company", type: "text", slug: "company" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/custom-fields", {
        name: "Company",
        type: "text",
        slug: "company",
      });
    });
  });

  describe("zernio_delete_custom_field", () => {
    const tool = contactTools.find((t) => t.name === "zernio_delete_custom_field")!;

    it("exists with description", () => {
      expect(tool).toBeDefined();
      expect(tool.description).toBeTruthy();
    });

    it("calls zernioRequest correctly", async () => {
      await tool.handler({ fieldId: "field-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/custom-fields/field-1");
    });
  });
});
