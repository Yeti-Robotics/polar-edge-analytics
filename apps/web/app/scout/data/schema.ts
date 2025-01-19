import { Cage } from "@repo/database/schema";
import { z } from "zod";

const zCageEnum = z.nativeEnum(Cage);

export const standFormSchema = z.object({
	team_number: z.coerce
		.number({ message: "Team number must be a number" })
		.int({ message: "Team number cannot be blank" })
		.positive({ message: "Team number must be greater than zero" })
		.max(99999, { message: "Team number is too large" })
		.describe("Team number"),
	match_number: z.coerce
		.number({ message: "Match number must be a number" })
		.int({ message: "Match number cannot be blank" })
		.positive({ message: "Match number must be greater than zero" })
		.max(200, { message: "Match number is too large" })
		.describe("Match number"),
	auto_initiation_line: z.coerce
		.boolean()
		.nullish()
		.default(false)
		.transform((value) => value ?? false)
		.describe("Crossed black line?"),
	auto_coral_level_1: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Coral L1 must be positive" })
		.default(0)
		.describe("Coral in trough"),
	auto_coral_level_2: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Coral L2 must be positive" })
		.default(0)
		.describe("Coral on level 2"),
	auto_coral_level_3: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Coral L3 must be positive" })
		.default(0)
		.describe("Coral on level 3"),
	auto_coral_level_4: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Coral L4 must be positive" })
		.default(0)
		.describe("Coral on level 4"),
	auto_algae_processed: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Algae Processed must be positive" })
		.default(0)
		.describe("Algae in processor"),
	auto_algae_netted: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Auto Algae Netted must be positive" })
		.default(0)
		.describe("Algae netted by a robot"),
	teleop_coral_level_1: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Coral L1 must be positive" })
		.default(0)
		.describe("Coral in trough"),
	teleop_coral_level_2: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Coral L2 must be positive" })
		.default(0)
		.describe("Coral on level 2"),
	teleop_coral_level_3: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Coral L3 must be positive" })
		.default(0)
		.describe("Coral on level 3"),
	teleop_coral_level_4: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Coral L4 must be positive" })
		.default(0)
		.describe("Coral on level 4"),
	teleop_algae_processed: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Algae Processed must be positive" })
		.default(0)
		.describe("Algae processed"),
	teleop_algae_netted: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Algae Netted must be positive" })
		.default(0)
		.describe("Algae netted by a robot"),
	teleop_algae_thrown: z.coerce
		.number()
		.int()
		.nonnegative({ message: "Teleop Algae Thrown must be positive" })
		.default(0)
		.describe("Algae thrown into net by human player"),
	cage_climb: zCageEnum.describe("What does the robot do in the cage area?"),
	defense: z.coerce
		.number({ message: "Defense rating must be a number" })
		.int()
		.min(1, { message: "Defense rating must be valid" })
		.max(5)
		.describe("Defense rating"),
	comments: z
		.string({ message: "Comments must be at least 32 characters" })
		.min(0, { message: "Comments must be at least 32 characters" })
		.describe("Comments about robot performance"),
});


export type StandFormData = z.infer<typeof standFormSchema>;
