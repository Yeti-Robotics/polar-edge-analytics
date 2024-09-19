import { z } from "zod";

export const standFormSchema = z.object({
	team_number: z.coerce
		.number({ message: "Team number must be a number" })
		.int({ message: "Team number cannot be blank" })
		.positive({ message: "Team number must be greater than zero" })
		.max(99999, { message: "Team number is too large" })
		.describe("Team you are scouting"),
	match_number: z.coerce
		.number({ message: "Match number must be a number" })
		.int({ message: "Match number cannot be blank" })
		.positive({ message: "Match number must be greater than zero" })
		.max(200, { message: "Match number is too large" })
		.describe("Match you are scouting"),
	initiation_line: z.coerce
		.boolean()
		.nullish()
		.default(false)
		.transform((value) => value ?? false)
		.describe("Did they cross the white line?"),
	auto_speaker_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto speaker must be a positive number" })
		.default(0)
		.describe("Notes scored in speaker during autonomous"),
	auto_amp_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto amp number must be a positive number" })
		.default(0)
		.describe("Notes scored in amplifier during autonomous"),
	auto_shuttle_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto shuttle must be a positive number" })
		.default(0)
		.describe("Notes thrown across field during autonomous"),
	teleop_speaker_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop speaker must be a positive number" })
		.default(0)
		.describe("Notes scored in speaker during teleop"),
	teleop_amp_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop amp must be a positive number" })
		.default(0)
		.describe("Notes scored in amplifier during teleop"),
	teleop_shuttle_notes: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop shuttle must be a positive number" })
		.default(0)
		.describe("Notes thrown across field during teleop"),
	climb: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false)
		.default(false)
		.describe("Did they climb on the chain?"),
	park: z.coerce
		.boolean()
		.nullish()
		.transform((value) => value ?? false)
		.default(false)
		.describe("Did they park underneath the podium?"),
	number_on_chain: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Bots on chain must be a positive number" })
		.default(0)
		.describe("Number of bots hanging on the same chain"),
	defense: z.coerce
		.number({ message: "Defense rating must be a valid number" })
		.int()
		.min(1, { message: "Defense rating must be a valid number" })
		.max(5)
		.describe("Defense rating of the robot"),
	notes: z
		.string({ message: "Notes must be at least 32 characters long" })
		.min(32, { message: "Notes must be at least 32 characters long" })
		.describe("Comments about robot performance"),
});

standFormSchema.refine((data) => !data.climb && data.number_on_chain > 0, {
	message: "Climbed must be true if bots on chain is greater than 0",
});

export type StandFormData = z.infer<typeof standFormSchema>;
