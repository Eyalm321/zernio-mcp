import { vi } from "vitest";

/**
 * Creates a mock for zernioRequest and returns the mock function.
 * Usage: const { mockRequest } = setupMockClient();
 */
export function setupMockClient() {
  const mockRequest = vi.fn().mockResolvedValue({ success: true });

  vi.doMock("../client.js", () => ({
    zernioRequest: mockRequest,
  }));

  return { mockRequest };
}

/**
 * Helper to test a tool's handler calls zernioRequest correctly.
 */
export async function expectToolCall(
  tool: any,
  args: Record<string, any>,
  mockRequest: ReturnType<typeof vi.fn>,
  expected: {
    method: string;
    path: string;
    body?: any;
    params?: any;
  }
) {
  await tool.handler(args);

  expect(mockRequest).toHaveBeenCalledWith(
    expected.method,
    expected.path,
    expected.body,
    expected.params
  );
}
