"use server";

import { z } from "zod";
import { createClient } from "../database/server";
import { redirect } from "next/navigation";

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

export async function signUpDevelopment(formData: FormData) {
	if (process.env.NODE_ENV !== "development") {
		return {
			errors: ["Unauthorized"],
		};
	}

	const validatedFields = validateDevelopmentAccountSchema(formData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	const { email, password } = validatedFields.data;

	const supabase = createClient();
	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return {
			errors: ["Something went wrong trying to sign up"],
		};
	}

	redirect("/profile");
}

export async function signInDevelopment(formData: FormData) {
	if (process.env.NODE_ENV !== "development") {
		return {
			errors: ["Unauthorized"],
		};
	}

	const validatedFields = validateDevelopmentAccountSchema(formData);
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	const { email, password } = validatedFields.data;

	const supabase = createClient();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return {
			errors: ["Something went wrong trying to sign up"],
		};
	}

	redirect("/profile");
}
