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
	email: z.string({
		invalid_type_error: "Invalid Email",
	}),
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
		if (error) throw new ServerActionError("Something went wrong.");
		redirect("/profile");
	},
	"development"
);
