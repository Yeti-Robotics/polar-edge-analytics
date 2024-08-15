import { getNodeEnv } from "@/lib/utils";
/**
 * Creating a standard response for server actions, and adding the ability to (securely) throw errors.
 * @see https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions
 */

type Details = string | string[] | undefined;

/**
 * Represents the result of a server action.
 */
export type ServerActionResult<T> =
	| { success: true; value: T }
	| {
			success: false;
			error: string;
			details?: Record<string, Details>;
	  };

/**
 * Represents an error that can be thrown within a server action.
 *
 * Secrets should NEVER be passed to the body of ServerActionError, as
 * they can, and will, show up on the client.
 */
export class ServerActionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ServerActionError";
	}
}

/**
 * Represents and error with a JSON body for details that can be
 * thrown in a server action
 *
 * Useful when using zod to parse forms, as errors can be passed directly
 * to the error message.
 *
 * Secrets should NEVER be passed to the body of ServerActionErrorWithDetails,
 * as they can, and will, show up on the client.
 */
export class ServerActionErrorWithDetails extends Error {
	details: Record<string, Details>;
	constructor(message: string, details: Record<string, Details>) {
		super(message);
		this.name = "ServerActionFormParseError";
		this.details = details;
	}
}

/**
 * Wraps a server action with standard error handling.
 * React blocks throwing errors in server actions due to the potential
 * for secrets to reach the client. This function allows throwing
 * errors within server actions by catching them and returning a
 * standardized error payload.
 *
 * To throw an error, use the ServerActionError class defined in this file.
 * No other error types will work, to prevent the client from viewing potentially
 * sensitive details.
 *
 * Secrets should NEVER be passed to the body of ServerActionError, as
 * they can, and will, show up on the client.
 *
 * @param callback The server action to wrap.
 * @param environments Environments the server actions should exist in
 * @returns The wrapped version of the server action.
 */
export function createServerAction<Return, Args extends unknown[] = []>(
	callback: (...args: Args) => Promise<Return>,
	environment: "all" | "production" | "development" = "all"
): (...args: Args) => Promise<ServerActionResult<Return>> {
	const nodeEnv = getNodeEnv();
	if (
		environment !== "all" &&
		nodeEnv !== "test" &&
		nodeEnv !== environment
	) {
		return async () => ({
			success: false,
			error: "Unauthorized.",
		});
	}
	return async (...args: Args) => {
		try {
			const value = await callback(...args);
			return { success: true, value };
		} catch (error) {
			switch (error.constructor) {
				case ServerActionError:
					return { success: false, error: error.message };
				case ServerActionErrorWithDetails:
					return {
						success: false,
						error: error.message,
						details: error.details,
					};
				default:
					throw error;
			}
		}
	};
}
