"use server";

import {
	StandFormData,
	standFormSchema,
	StandFormValidationResult,
	validateData,
	validateForm,
} from "./client-validate";
import {
	ServerActionErrorWithDetails,
	ServerActionResult,
} from "@/lib/actions/actions-utils";
import { createClient } from "@/lib/database/server";
import { getCurrentEventCached } from "@/app/(with-sidebar)/admin/event";

export async function runServerAction(
	standFormData: StandFormData,
	submitFunction: (
		data: StandFormData
	) => Promise<ServerActionResult<unknown>>
): Promise<StandFormValidationResult> {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const eventData = await getCurrentEventCached();
	const validationResult = validateData(standFormData, standFormSchema);

	if (!validationResult.data) {
		return validationResult;
	}

	if (!user || !eventData) {
		const serverErrors = {} as Record<string, string[]>;

		if (!user) {
			serverErrors.scouter = [
				"You must be logged in to submit a stand form.",
			];
		}

		if (!eventData) {
			serverErrors.event = ["Event not found."];
		}

		return {
			serverErrors,
			formErrors: {},
			data: null,
		};
	}

	standFormData.scouter = user.id;
	standFormData.event_code = eventData.event_key;

	try {
		await submitFunction(standFormData);
	} catch (error) {
		return {
			serverErrors: {
				server: ["Server error, please try again later."],
			},
			formErrors: {},
			data: null,
		};
	}

	return {
		data: standFormData,
		serverErrors: {},
		formErrors: {},
	};
}
