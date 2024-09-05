import { z } from "zod";

export const standFormSchema = z.object({
	team_number: z.coerce
		.number({ message: "Team number must be a number" })
		.int({ message: "Team number cannot be blank" })
		.positive({ message: "Team number cannot be positive number" })
		.describe("Team number"),
	match_number: z.coerce
		.number({ message: "Match number must be a number" })
		.int({ message: "Match number cannot be blank" })
		.positive({ message: "Match number must be positive number" })
		.describe("Match number"),
	auto_line: z.coerce
		.boolean()
		.nullish()
		.default(false)
		.transform((value) => value ?? false)
		.describe("Auto line Crossed"),
	speaker_auto: z.coerce
		.number()
		.int()
		.positive({ message: "Auto speaker must be positive number" })
		.default(0)
		.describe("Speaker"),
	amp_auto: z.coerce
		.number()
		.int()
		.positive({ message: "Auto amp number must be positive number" })
		.default(0)
		.describe("Amp"),
	shuttle_auto: z.coerce
		.number()
		.int()
		.positive({ message: "Auto shuttle must be positive number" })
		.default(0)
		.describe("Shuttle"),
	speaker_teleop: z.coerce
		.number()
		.int()
		.positive({ message: "Teleop speaker must be positive number" })
		.default(0)
		.describe("Speaker"),
	amp_teleop: z.coerce
		.number()
		.int()
		.positive({ message: "Teleop amp must be positive number" })
		.default(0)
		.describe("Amp"),
	shuttle_teleop: z.coerce
		.number()
		.int()
		.positive({ message: "Teleop shuttle must be positive number" })
		.default(0)
		.describe("Shuttle"),
	climbed: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false)
		.default(false)
		.describe("Climbed"),
	parked: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false)
		.default(false)
		.describe("Parked"),
	bots_on_chain: z.coerce
		.number()
		.int()
		.positive({ message: "Bots on chain must be a positive number" })
		.default(0)
		.describe("Bots on chain"),
	defense_rating: z.coerce
		.number({ message: "Defense rating must be a valid number" })
		.int()
		.min(1, { message: "Defense rating must be a valid number" })
		.max(5)
		.describe("Defense rating"),
	notes: z
		.string({ message: "Notes must be at least 32 characters long" })
		.min(32, { message: "Notes must be at least 32 characters long" })
		.describe("Notes"),
});

export type StandFormData = z.infer<typeof standFormSchema>;
export type StandFormValidationResult = {
	formErrors: {
		[K in keyof StandFormData]?: string[] | undefined;
	};
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
