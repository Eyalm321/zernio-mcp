import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../client.js", () => ({
  zernioRequest: vi.fn().mockResolvedValue({ success: true }),
}));

import { zernioRequest } from "../../client.js";
import { whatsappBusinessTools } from "../../tools/whatsapp-business.js";

const mockRequest = vi.mocked(zernioRequest);

describe("whatsappBusinessTools", () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it("exports 44 tools", () => {
    expect(whatsappBusinessTools).toHaveLength(44);
  });

  it("has no duplicate tool names", () => {
    const names = whatsappBusinessTools.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe("zernio_get_whatsapp_business_profile", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_business_profile")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/business-profile", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_update_whatsapp_business_profile", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_update_whatsapp_business_profile")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "wa-1", displayName: "Biz", description: "A business",
        website: "https://biz.com", category: "Tech", email: "hi@biz.com", address: "123 Main St",
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/business-profile", {
        accountId: "wa-1", displayName: "Biz", description: "A business",
        website: "https://biz.com", category: "Tech", email: "hi@biz.com", address: "123 Main St",
      });
    });
  });

  describe("zernio_list_whatsapp_templates", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_templates")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/templates", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_create_whatsapp_template", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_create_whatsapp_template")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({
        accountId: "wa-1", name: "welcome", category: "MARKETING", language: "en",
        body: "Hello {{1}}!", header: "Welcome", footer: "Reply STOP",
      });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/templates", {
        accountId: "wa-1", name: "welcome", category: "MARKETING", language: "en",
        body: "Hello {{1}}!", header: "Welcome", footer: "Reply STOP",
      });
    });
  });

  describe("zernio_list_whatsapp_phone_numbers", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_phone_numbers")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/phone-numbers", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_purchase_whatsapp_phone_number", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_purchase_whatsapp_phone_number")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", countryCode: "US", areaCode: "415" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/phone-numbers/purchase", {
        accountId: "wa-1", countryCode: "US", areaCode: "415",
      });
    });
  });

  describe("zernio_request_whatsapp_verification_code", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_request_whatsapp_verification_code")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", phoneNumberId: "pn-1", method: "sms" as const });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/phone-numbers/pn-1/request-code", {
        accountId: "wa-1", method: "sms",
      });
    });
  });

  describe("zernio_verify_whatsapp_phone_number", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_verify_whatsapp_phone_number")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", phoneNumberId: "pn-1", code: "123456" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/phone-numbers/pn-1/verify", {
        accountId: "wa-1", code: "123456",
      });
    });
  });

  describe("zernio_create_whatsapp_flow", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_create_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", name: "Booking", categories: ["APPOINTMENT_BOOKING"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows", {
        accountId: "wa-1", name: "Booking", categories: ["APPOINTMENT_BOOKING"],
      });
    });
  });

  describe("zernio_publish_whatsapp_flow", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_publish_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows/flow-1/publish", { accountId: "wa-1" });
    });
  });

  describe("zernio_upload_whatsapp_flow_json", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_upload_whatsapp_flow_json")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1", flowJson: '{"screens":[]}' });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows/flow-1/upload", {
        accountId: "wa-1", flowJson: '{"screens":[]}',
      });
    });
  });

  describe("zernio_list_whatsapp_groups", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_groups")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/wa-groups", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_create_whatsapp_group", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_create_whatsapp_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", name: "Team Chat", participants: ["+123", "+456"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/wa-groups", {
        accountId: "wa-1", name: "Team Chat", participants: ["+123", "+456"],
      });
    });
  });

  describe("zernio_add_whatsapp_group_participants", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_add_whatsapp_group_participants")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1", participants: ["+789"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/wa-groups/grp-1/participants", {
        accountId: "wa-1", participants: ["+789"],
      });
    });
  });

  describe("zernio_remove_whatsapp_group_participants", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_remove_whatsapp_group_participants")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1", participants: ["+789"] });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/wa-groups/grp-1/participants", {
        accountId: "wa-1", participants: ["+789"],
      });
    });
  });

  describe("zernio_create_whatsapp_group_invite_link", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_create_whatsapp_group_invite_link")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/wa-groups/grp-1/invite-link", { accountId: "wa-1" });
    });
  });

  describe("zernio_list_whatsapp_group_join_requests", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_group_join_requests")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/wa-groups/grp-1/join-requests", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_approve_whatsapp_group_join_requests", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_approve_whatsapp_group_join_requests")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1", requestIds: ["req-1", "req-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/wa-groups/grp-1/join-requests", {
        accountId: "wa-1", requestIds: ["req-1", "req-2"],
      });
    });
  });

  describe("zernio_get_whatsapp_template", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_template")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ templateName: "welcome", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/templates/welcome", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_update_whatsapp_template", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_update_whatsapp_template")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ templateName: "welcome", accountId: "wa-1", body: "Hi {{1}}!", header: "Hey", footer: "Bye" });
      expect(mockRequest).toHaveBeenCalledWith("PATCH", "/v1/whatsapp/templates/welcome", {
        accountId: "wa-1", body: "Hi {{1}}!", header: "Hey", footer: "Bye",
      });
    });
  });

  describe("zernio_delete_whatsapp_template", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_delete_whatsapp_template")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ templateName: "welcome", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/templates/welcome", { accountId: "wa-1" });
    });
  });

  describe("zernio_get_whatsapp_phone_number", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_phone_number")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ phoneNumberId: "pn-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/phone-numbers/pn-1", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_release_whatsapp_phone_number", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_release_whatsapp_phone_number")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ phoneNumberId: "pn-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/phone-numbers/pn-1", { accountId: "wa-1" });
    });
  });

  describe("zernio_get_whatsapp_display_name", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_display_name")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/business-profile/display-name", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_set_whatsapp_display_name", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_set_whatsapp_display_name")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", displayName: "My Biz" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/business-profile/display-name", {
        accountId: "wa-1", displayName: "My Biz",
      });
    });
  });

  describe("zernio_set_whatsapp_profile_photo", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_set_whatsapp_profile_photo")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", photoUrl: "https://example.com/photo.jpg" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/business-profile/photo", {
        accountId: "wa-1", photoUrl: "https://example.com/photo.jpg",
      });
    });
  });

  describe("zernio_update_whatsapp_flow", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_update_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1", name: "Updated Flow" });
      expect(mockRequest).toHaveBeenCalledWith("PATCH", "/v1/whatsapp/flows/flow-1", {
        accountId: "wa-1", name: "Updated Flow",
      });
    });
  });

  describe("zernio_delete_whatsapp_flow", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_delete_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/flows/flow-1", { accountId: "wa-1" });
    });
  });

  describe("zernio_get_whatsapp_flow_json", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_flow_json")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/flows/flow-1/json", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_deprecate_whatsapp_flow", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_deprecate_whatsapp_flow")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ flowId: "flow-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows/flow-1/deprecate", { accountId: "wa-1" });
    });
  });

  describe("zernio_send_whatsapp_flow_message", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_send_whatsapp_flow_message")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", flowId: "flow-1", contactId: "ct-1" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/flows/send", {
        accountId: "wa-1", flowId: "flow-1", contactId: "ct-1",
      });
    });
  });

  describe("zernio_get_whatsapp_group", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/wa-groups/grp-1", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_update_whatsapp_group", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_update_whatsapp_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1", name: "Renamed Group" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/wa-groups/grp-1", {
        accountId: "wa-1", name: "Renamed Group",
      });
    });
  });

  describe("zernio_delete_whatsapp_group", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_delete_whatsapp_group")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/wa-groups/grp-1", { accountId: "wa-1" });
    });
  });

  describe("zernio_reject_whatsapp_group_join_requests", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_reject_whatsapp_group_join_requests")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ groupId: "grp-1", accountId: "wa-1", requestIds: ["req-1"] });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/wa-groups/grp-1/join-requests", {
        accountId: "wa-1", requestIds: ["req-1"],
      });
    });
  });

  describe("zernio_send_whatsapp_bulk", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_send_whatsapp_bulk")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", templateName: "welcome", contacts: ["ct-1", "ct-2"] });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/bulk", {
        accountId: "wa-1", templateName: "welcome", contacts: ["ct-1", "ct-2"],
      });
    });
  });

  describe("zernio_list_whatsapp_contacts", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_contacts")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", limit: 10, offset: 0 });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/contacts", undefined, {
        accountId: "wa-1", limit: 10, offset: 0,
      });
    });
  });

  describe("zernio_create_whatsapp_contact", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_create_whatsapp_contact")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1", name: "John Doe", phoneNumber: "+1234567890", email: "john@test.com" });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/contacts", {
        accountId: "wa-1", name: "John Doe", phoneNumber: "+1234567890", email: "john@test.com",
      });
    });
  });

  describe("zernio_get_whatsapp_contact", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_get_whatsapp_contact")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "wc-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/contacts/wc-1", undefined, { accountId: "wa-1" });
    });
  });

  describe("zernio_update_whatsapp_contact", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_update_whatsapp_contact")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "wc-1", accountId: "wa-1", name: "Jane Doe", email: "jane@test.com" });
      expect(mockRequest).toHaveBeenCalledWith("PUT", "/v1/whatsapp/contacts/wc-1", {
        accountId: "wa-1", name: "Jane Doe", email: "jane@test.com",
      });
    });
  });

  describe("zernio_delete_whatsapp_contact", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_delete_whatsapp_contact")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ contactId: "wc-1", accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("DELETE", "/v1/whatsapp/contacts/wc-1", { accountId: "wa-1" });
    });
  });

  describe("zernio_import_whatsapp_contacts", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_import_whatsapp_contacts")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      const contacts = [{ name: "Alice", phoneNumber: "+111", email: "alice@test.com" }];
      await tool.handler({ accountId: "wa-1", contacts });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/contacts/import", {
        accountId: "wa-1", contacts,
      });
    });
  });

  describe("zernio_bulk_update_whatsapp_contacts", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_bulk_update_whatsapp_contacts")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      const contacts = [{ contactId: "wc-1", name: "Bob", email: "bob@test.com" }];
      await tool.handler({ accountId: "wa-1", contacts });
      expect(mockRequest).toHaveBeenCalledWith("POST", "/v1/whatsapp/contacts/bulk", {
        accountId: "wa-1", contacts,
      });
    });
  });

  describe("zernio_list_whatsapp_contact_groups", () => {
    const tool = whatsappBusinessTools.find((t) => t.name === "zernio_list_whatsapp_contact_groups")!;
    it("exists with description", () => { expect(tool).toBeDefined(); expect(tool.description).toBeTruthy(); });
    it("calls zernioRequest correctly", async () => {
      await tool.handler({ accountId: "wa-1" });
      expect(mockRequest).toHaveBeenCalledWith("GET", "/v1/whatsapp/groups", undefined, { accountId: "wa-1" });
    });
  });
});
