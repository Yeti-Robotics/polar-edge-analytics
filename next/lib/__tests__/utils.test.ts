import { getNodeEnv } from "../utils";

describe("getNodeEnv returns correct environment", () => {
	it("returns correct env", () => {
		expect(getNodeEnv()).toBe(process.env.NODE_ENV);
	});
});
