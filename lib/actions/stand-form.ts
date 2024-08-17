import { z } from "zod";
import {
	createServerAction,
	ServerActionErrorWithDetails,
} from "./actions-utils";

const schema = z.object({
	scouter: z.string().uuid(),
	team_number: z.coerce
		.number()
		.int()
		.refine((value) => value > 0, {
			message: "team_number must be a positive integer",
		}),
	match_number: z.coerce
		.number()
		.int()
		.refine((value) => value > 0, {
			message: "match_number must be a positive integer",
		}),
	event_code: z.string().refine((value) => value !== "", {
		message: "event_code is required",
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
	notes_missed_auto: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "notes_missed_auto must be a non-negative integer",
		}),
	speaker_teleop: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "speaker_teleop must be a non-negative integer",
		}),
	amped_speaker_teleop: z.coerce
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
	notes_missed_teleop: z.coerce
		.number()
		.int()
		.refine((value) => value >= 0, {
			message: "notes_missed_teleop must be a non-negative integer",
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

const flattenFieldErrors = (errors: Record<string, string[]>) => {
	return Object.values(errors).flat();
};

export function validate(data: FormData) {
	const parsedData = Object.fromEntries(data.entries());
	const validatedData = schema.safeParse(parsedData);
	if (!validatedData.success) {
		return {
			success: false,
			errors: flattenFieldErrors(
				validatedData.error.flatten().fieldErrors
			),
			data: null,
		};
	}

	if (validatedData.data.parked || !validatedData.data.climbed) {
		validatedData.data.bots_on_chain = 0;
	}

	return {
		success: true,
		errors: [],
		data: validatedData.data,
	};
}

export type StandFormData = z.infer<typeof schema>;
