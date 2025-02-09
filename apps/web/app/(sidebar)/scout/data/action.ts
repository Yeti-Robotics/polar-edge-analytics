"use server";

import { StandFormData } from "./schema";

import {
	createServerAction,
	ServerActionError,
} from "@/lib/actions/actions-utils";
import { auth } from "@/lib/auth";
import { AuthErrors, authorized } from "@/lib/auth/utils";
import { db } from "@repo/database";
import { standForm, team_match, UserRole } from "@repo/database/schema";
import { and, eq } from "drizzle-orm";

export const submitStandForm = createServerAction(
	async (data: StandFormData) => {
		const session = await auth();

		if (
			!authorized({
				requiredRole: UserRole.USER,
				currentUserRole: session?.user.role,
			}) ||
			!session?.user.id
		) {
			throw new ServerActionError(AuthErrors.UNAUTHORIZED);
		}

		const teamMatch = await db
			.select()
			.from(team_match)
			.where(
				and(
					eq(team_match.teamNumber, data.team_number),
					eq(team_match.matchNumber, data.match_number)
				)
			);

		const matchInfo = teamMatch.shift();

		if (!matchInfo) {
			throw new ServerActionError("Invalid team/match number!");
		}

		try {
			await db.insert(standForm).values({
				autoStartLocation: data.auto_start_location,
				leftBlackLine: data.auto_initiation_line,
				teamMatchId: matchInfo.id,
				userId: session.user.id,
				autoCoralLevel1: data.auto_coral_level_1,
				autoCoralLevel2: data.auto_coral_level_2,
				autoCoralLevel3: data.auto_coral_level_3,
				autoCoralLevel4: data.auto_coral_level_4,
				autoAlgaeProcessor: data.auto_algae_processed,
				autoAlgaeNet: data.auto_algae_netted,
				teleopCoralLevel1: data.teleop_coral_level_1,
				teleopCoralLevel2: data.teleop_coral_level_2,
				teleopCoralLevel3: data.teleop_coral_level_3,
				teleopCoralLevel4: data.teleop_coral_level_4,
				teleopAlgaeProcessor: data.teleop_algae_processed,
				teleopAlgaeNet: data.teleop_algae_netted,
				cageClimb: data.cage_climb,
				comments: data.comments,
				defenseRating: data.defense,
				didBreakdown: data.did_breakdown,
			});
		} catch (err) {
			console.error(err);
			throw new ServerActionError("Server error");
		}
	}
);
