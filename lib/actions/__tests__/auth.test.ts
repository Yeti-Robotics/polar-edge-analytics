import "@testing-library/jest-dom";
import {
	signInDevelopment,
	signInWithDiscord,
	signOut,
	signUpDevelopment,
} from "../auth";
import { createClient } from "@/lib/database/server";
import { redirect } from "next/navigation";
import { ServerActionResult } from "../actions-utils";

interface MockAuthResult {
	error: null | string;
	data: {
		user?: null | string;
		url?: string;
	};
}

const mockSignInWithPassword = jest.fn(
	async (): Promise<MockAuthResult> =>
		Promise.resolve({ error: null, data: { user: null } })
);

const mockSignUp = jest.fn(
	async (): Promise<MockAuthResult> =>
		Promise.resolve({ error: null, data: { user: null } })
);

const mockSignInWithOAuth = jest.fn(
	async (): Promise<MockAuthResult> =>
		Promise.resolve({ error: null, data: { url: "/auth/callback" } })
);

const mockSignOut = jest.fn(async () => {
	return;
});

jest.mock("@/lib/database/server", () => ({
	createClient: jest.fn(() => ({
		auth: {
			signUp: mockSignUp,
			signInWithPassword: mockSignInWithPassword,
			signInWithOAuth: mockSignInWithOAuth,
			signOut: mockSignOut,
		},
	})),
}));

jest.mock("next/navigation");

async function validateEmailFailure(
	email: string,
	callback: (form: FormData) => Promise<ServerActionResult<never>>
) {
	const potentialResponses = [
		"This is not a valid email",
		"This field has to be filled",
	];

	const form = new FormData();
	form.append("email", email);
	form.append("password", "abc123");
	const response = await callback(form);
	if (!response.success && response.details) {
		expect(response.error).toBe("Invalid input.");
		const emailError = response.details.email![0];
		expect(potentialResponses.includes(emailError)).toBe(true);
		return true;
	}
	return false;
}

function runEmailFailureTest(
	callback: (form: FormData) => Promise<ServerActionResult<never>>
) {
	it("Fails with invalid email", async () => {
		const invalidEmails = ["abc", "", "%$100@gmail.com"];
		for (const invalidEmail of invalidEmails) {
			expect(await validateEmailFailure(invalidEmail, callback)).toBe(
				true
			);
		}
	});
}

describe("Development sign up correctly functions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	runEmailFailureTest(signUpDevelopment);

	it("Correctly signs in with valid credentials", async () => {
		const form = new FormData();
		form.append("email", "admin@yetirobotics.org");
		form.append("password", "abcd1234");

		await signUpDevelopment(form);

		expect(mockSignUp).toHaveBeenCalledTimes(1);
		expect(mockSignUp).toHaveBeenCalledWith({
			email: "admin@yetirobotics.org",
			password: "abcd1234",
		});
		expect(createClient).toHaveBeenCalledTimes(1);
		expect(redirect).toHaveBeenCalledTimes(1);
	});

	it("Prevents sign in when supabase returns and error", async () => {
		mockSignUp.mockResolvedValue({
			error: "Something went wrong signing up.",
			data: {},
		});
		const form = new FormData();
		form.append("email", "admin@yetirobotics.org");
		form.append("password", "abcd1234");
		const res = await signUpDevelopment(form);
		expect(!res.success && res.error).toBe(
			"Something went wrong signing up."
		);
		expect(redirect).toHaveBeenCalledTimes(0);
	});
});

describe("Development sign in correctly functions", () => {
	let form: FormData;
	beforeEach(() => {
		jest.clearAllMocks();
		form = new FormData();
		form.append("email", "admin@yetirobotics.org");
		form.append("password", "abcd1234");
	});

	runEmailFailureTest(signInDevelopment);

	it("Correctly signs in with valid credentials", async () => {
		await signInDevelopment(form);

		expect(createClient).toHaveBeenCalledTimes(1);
		expect(mockSignInWithPassword).toHaveBeenCalledTimes(1);
		expect(mockSignInWithPassword).toHaveBeenCalledWith({
			email: "admin@yetirobotics.org",
			password: "abcd1234",
		});
		expect(redirect).toHaveBeenCalledTimes(1);
		expect(redirect).toHaveBeenCalledWith("/profile");
	});

	it("Correctly errors when supabase auth returns an error", async () => {
		mockSignInWithPassword.mockReturnValueOnce(
			Promise.resolve({
				data: { user: null },
				error: "Invalid credentials.",
			})
		);
		const res = await signInDevelopment(form);

		expect(createClient).toHaveBeenCalledTimes(1);
		expect(mockSignInWithPassword).toHaveBeenCalledTimes(1);
		expect(!res.success && res.error).toBe("Invalid credentials.");
		expect(redirect).toHaveBeenCalledTimes(0);
	});
});

describe("Discord OAuth sign-in correctly functions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Correctly signs in", async () => {
		await signInWithDiscord();
		expect(createClient).toHaveBeenCalledTimes(1);
		expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
		expect(mockSignInWithOAuth).toHaveBeenCalledWith({
			provider: "discord",
			options: {
				scopes: "guilds.members.read",
			},
		});
		expect(redirect).toHaveBeenCalledTimes(1);
		expect(redirect).toHaveBeenCalledWith("/auth/callback");
	});

	it("Prevents redirect on error from Discord", async () => {
		mockSignInWithOAuth.mockResolvedValueOnce({
			error: "Error logging in.",
			data: { user: null },
		});
		const res = await signInWithDiscord();
		expect(!res.success && res.error).toBe("Error logging in.");
		expect(redirect).toHaveBeenCalledTimes(0);
	});
});

describe("Sign out correctly functions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Creates a client and signs out", async () => {
		await signOut();
		expect(createClient).toHaveBeenCalledTimes(1);
		expect(mockSignOut).toHaveBeenCalledTimes(1);
		expect(mockSignOut).toHaveReturned();
	});
});
