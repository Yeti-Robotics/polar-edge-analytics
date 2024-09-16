"use server";

import {
	createServerAction,
	ServerActionErrorWithDetails,
} from "@/lib/actions/actions-utils";
import { FormAction, ZodSchema } from "../forms/autogenerate";
import { standFormSchema } from "./schema";

export const standFormServerAction = createServerAction(
	async <T extends ZodSchema>(
		rawFormData: unknown,
		onSubmit: FormAction<T>
	) => {
		const { data, error, success } = standFormSchema.safeParse(rawFormData);

		if (!success) {
			throw new ServerActionErrorWithDetails(
				"Invalid input",
				error.flatten().fieldErrors
			);
		}

		return await onSubmit(data);
	}
);
