"use server";

import {
	StandFormData,
	standFormSchema,
	StandFormValidationResult,
} from "./client-validate";
import {
	createServerAction,
	ServerActionError,
	ServerActionErrorWithDetails,
	ServerActionResult,
} from "@/lib/actions/actions-utils";
import z from "zod";
import { createClient } from "@/lib/database/server";
import {
	cachedEvent,
	getCurrentEventCached,
} from "@/app/(with-sidebar)/admin/event";

const submittedStandFormSchema = standFormSchema.extend({
	scouter: z.string().uuid(),
});

type SubmittedStandForm = z.infer<typeof submittedStandFormSchema>;

export const standFormAction = createServerAction(
	async (
		rawFormData: StandFormData,
		submitFunction: (
			data: StandFormData
		) => Promise<ServerActionResult<unknown>>
	) => {
		console.log("run");
		const originalData = rawFormData as SubmittedStandForm;

		const supabase = createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) throw new ServerActionError("Not logged in");

		originalData.scouter = user.id;

		const { data, error, success } =
			await submittedStandFormSchema.safeParse(originalData);

		if (!success) {
			// err handle
			console.log(error);
			return;
		}

		return await submitFunction(data);
	}
);
