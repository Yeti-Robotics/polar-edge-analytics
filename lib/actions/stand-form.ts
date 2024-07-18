"use server";
import { z } from "zod";
import { db } from "@/lib/database";
import { stand_form } from "@/lib/database/schema";

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
});

export async function create(data: FormData) {
	const parsedData = Object.fromEntries(data.entries());
	const validatedData = schema.safeParse(parsedData);
	console.log(validatedData.error?.flatten());
	if (!validatedData.success) {
		return {
			errors: validatedData.error.flatten().fieldErrors,
		};
	}

	console.log(validatedData.data);

	if (validatedData.data.parked || !validatedData.data.climbed) {
		validatedData.data.bots_on_chain = 0;
	}

	const test = await db.insert(stand_form).values(validatedData.data);
	console.log(test);
	// continue with the rest of the function
}
