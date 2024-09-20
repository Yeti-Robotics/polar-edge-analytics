"use server";

import {
	createServerAction,
	ServerActionError,
	ServerActionErrorWithDetails,
	ServerActionResult,
} from "@/lib/actions/actions-utils";
import {
	StandFormData,
	standFormSchema,
} from "@/lib/components/stand-form/schema";
import { createClient } from "@/lib/database/server";

export const submitStandForm = createServerAction(
	async (formData: StandFormData): Promise<unknown> => {
		const {
			data,
			error: fieldErrors,
			success,
		} = standFormSchema.safeParse(formData);

		if (!success) {
			throw new ServerActionErrorWithDetails(
				"Invalid input",
				fieldErrors.flatten().fieldErrors
			);
		}

		const supabase = createClient();
		const { data: userData, error: authError } =
			await supabase.auth.getUser();

		if (authError) {
			throw new ServerActionError("Not authenticated");
		}

		const { error } = await supabase.from("stand_form").insert({
			...data,
			scouter: userData.user.id,
			// event_key is updated by a database trigger,
			// but we leave this value blank to make typescript happy
			event_key: "",
			approved: false,
		});

		if (error) {
			if (error.message.includes("stand_form_team_number_fkey")) {
				throw new ServerActionErrorWithDetails("Invalid input", {
					team_number: ["Invalid team number"],
				});
			} else if (
				error.message.includes("stand_form_event_key_match_number_fkey")
			) {
				throw new ServerActionErrorWithDetails("Invalid input", {
					match_number: ["Invalid match number"],
				});
			} else {
				throw new ServerActionError("Error submitting form");
			}
		}

		return data;
	}
);
