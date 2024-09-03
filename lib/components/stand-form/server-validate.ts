"use server";

import {
	StandFormData,
	standFormSchema,
	StandFormValidationResult,
	validateData,
} from "./client-validate";
import {
	createServerAction,
	ServerActionError,
	ServerActionErrorWithDetails,
	ServerActionResult,
} from "@/lib/actions/actions-utils";
import z from "zod";
import { createClient } from "@/lib/database/server";
import { getCurrentEventCached } from "@/app/(with-sidebar)/admin/event";

const submittedStandFormSchema = standFormSchema.extend({
	scouter: z.string().uuid(),
	event_code: z.string(),
});

type SubmittedStandForm = z.infer<typeof submittedStandFormSchema>;

export const standFormAction = createServerAction(
	async (
		rawFormData: StandFormData,
		submitFunction: (
			data: StandFormData
		) => Promise<ServerActionResult<StandFormData>>
	) => {
		const originalData = rawFormData as SubmittedStandForm;

		const supabase = createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const eventData = await getCurrentEventCached();

		if (!user) throw new ServerActionError("Not logged in");
		if (!eventData) throw new ServerActionError("No current event");

		originalData.scouter = user.id;
		originalData.event_code = eventData.event_key;

		const validationResult = validateData(
			originalData,
			submittedStandFormSchema
		);

		if (!validationResult.data) {
			throw new ServerActionErrorWithDetails(
				"Invalid data.",
				validationResult.formErrors
			);
		}

		return await submitFunction(originalData);
	}
);
