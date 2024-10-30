import { createServerAction } from "../actions-utils";
import { getNodeEnv } from "@/lib/utils";

const mockAsyncFn = jest.fn(async () => Promise.resolve());
const mockNodeEnv = jest.fn(() => "development");

jest.mock("@/lib/utils", () => ({
	getNodeEnv: () => mockNodeEnv(),
}));

jest;

describe("Verify createServerAction will only get triggered intended environment(s)", () => {
	it("Allows development action to run in development", async () => {
		mockNodeEnv.mockReturnValueOnce("development");
		const testAction = createServerAction(mockAsyncFn, "development");
		const res = await testAction();
		expect(res.success).toBe(true);
	});

	it("Does not allow development action to be run in production", async () => {
		mockNodeEnv.mockReturnValueOnce("production");
		const testAction = createServerAction(mockAsyncFn, "development");
		const res = await testAction();
		expect(!res.success && res.error).toBe("Unauthorized.");
	});

	it("Throws error if normal error is thrown in callback", async () => {
		const errorMock = jest
			.fn()
			.mockRejectedValue(
				new Error("The server action failed...some secret information")
			);

		const testAction = createServerAction(errorMock, "development");

		await expect(testAction()).rejects.toThrow(
			"The server action failed...some secret information"
		);
	});
});
