import { z } from "zod";

export const standFormSchema = z.object({
	event_code: z.string().optional(),
	scouter: z.string().uuid().optional(),
	team_number: z.coerce
		.number({ message: "Team number must be a number" })
		.int({ message: "Team number cannot be blank" })
		.refine((value) => value > 0, {
			message: "Team number must be a positive number",
		}),
	match_number: z.coerce
		.number({ message: "Match number must be a number" })
		.int({ message: "Match number cannot be blank" })
		.refine((value) => value > 0, {
			message: "Match number must be a positive number",
		}),
	auto_line: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false),
	speaker_auto: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "speaker_auto must be a non-negative integer",
		}),
	amp_auto: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "amp_auto must be a non-negative integer",
		}),
	shuttle_auto: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "shuttle_auto must be a non-negative integer",
		}),
	speaker_teleop: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "speaker_teleop must be a non-negative integer",
		}),
	amp_teleop: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "amp_teleop must be a non-negative integer",
		}),
	shuttle_teleop: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "shuttle_teleop must be a non-negative integer",
		}),
	climbed: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false),
	parked: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false),
	bots_on_chain: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "bots_on_chain must be a non-negative integer",
		}),
	defense_rating: z.coerce
		.number({ message: "Defense rating must be a valid number" })
		.int()
		.min(1, { message: "Defense rating must be a valid number" })
		.max(5),
	notes: z
		.string({ message: "Notes must be at least 32 characters long" })
		.min(32, { message: "Notes must be at least 32 characters long" }),
});

export type StandFormData = z.infer<typeof standFormSchema>;
export type StandFormValidationResult = {
	formErrors: {
		[K in keyof StandFormData]?: string[] | undefined;
	};
	serverErrors?: Record<string, string[]>;
	data: StandFormData | null;
};

export function validateData(
	data: object,
	schema: z.Schema
): StandFormValidationResult {
	const validatedData = schema.safeParse(data);

	if (!validatedData.success) {
		return {
			formErrors: validatedData.error.flatten().fieldErrors,
			data: null,
		};
	}

	if (validatedData.data.parked || !validatedData.data.climbed) {
		validatedData.data.bots_on_chain = 0;
	}

	return {
		data: validatedData.data,
		formErrors: {},
	};
}

export function validateForm(data: FormData): StandFormValidationResult {
	const parsedData = Object.fromEntries(data.entries());
	return validateData(parsedData, standFormSchema);
}
