"use server";

import { z } from "zod";
import { createClient } from "../database/server";
import { redirect } from "next/navigation";
import {
	createServerAction,
	ServerActionError,
	ServerActionErrorWithDetails,
} from "./actions-utils";

const developmentAccountSchema = z.object({
	email: z
		.string()
		.min(1, { message: "This field has to be filled" })
		.email("This is not a valid email"),
	password: z.string().min(6),
});

function validateDevelopmentAccountSchema(formData: FormData) {
	const validatedFields = developmentAccountSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});
	return validatedFields;
}

export const signUpDevelopment = createServerAction(
	async (formData: FormData) => {
		const validatedFields = validateDevelopmentAccountSchema(formData);
		if (!validatedFields.success) {
			const fieldErrors = validatedFields.error.flatten().fieldErrors;
			throw new ServerActionErrorWithDetails(
				"Invalid input.",
				fieldErrors
			);
		}

		const { email, password } = validatedFields.data;
		const supabase = createClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error)
			throw new ServerActionError("Something went wrong signing up.");
		redirect("/profile");
	},
	"development"
);

export const signInDevelopment = createServerAction(
	async (formData: FormData) => {
		const validatedFields = validateDevelopmentAccountSchema(formData);
		if (!validatedFields.success) {
			const fieldErrors = validatedFields.error.flatten().fieldErrors;
			throw new ServerActionErrorWithDetails(
				"Invalid input.",
				fieldErrors
			);
		}
		const { email, password } = validatedFields.data;
		const supabase = createClient();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw new ServerActionError("Invalid credentials.");
		redirect("/profile");
	},
	"development"
);

export const signOut = createServerAction(async () => {
	const supabase = createClient();
	await supabase.auth.signOut();
});

export const signInWithDiscord = createServerAction(async () => {
	const supabase = createClient();
	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		options: {
			redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
			scopes: "guilds.members.read",
		},
	});
	if (error) throw new ServerActionError("Error logging in.");
	redirect(data.url);
});
