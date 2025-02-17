"use server";

import { StandFormData } from "./schema";

import {
	createServerAction,
	ServerActionError,
} from "@/lib/actions/actions-utils";
import { auth } from "@/lib/auth";
import { AuthErrors, authorized } from "@/lib/auth/utils";
import { db } from "@/lib/database";
import {
	match,
	standForm,
	teamMatch,
	tournament,
	UserRole,
} from "@/lib/database/schema";
import { eq, and } from "drizzle-orm";

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

		const currentTournament = await db
			.select()
			.from(tournament)
			.where(eq(tournament.isCurrent, true))
			.limit(1)
			.then((res) => res[0]);

		if (!currentTournament) {
			throw new ServerActionError("No current tournament set!");
		}

		const teamMatches = await db
			.select()
			.from(teamMatch)
			.leftJoin(match, eq(teamMatch.matchId, match.id))
			.where(
				and(
					eq(teamMatch.teamNumber, data.team_number),
					eq(match.matchNumber, data.match_number),
					eq(match.compLevel, "qm")
				)
			)
			.limit(1);

		const matchInfo = teamMatches[0];

		if (!matchInfo || !matchInfo.match) {
			throw new ServerActionError("Team is not in this match");
		}

		try {
			await db.insert(standForm).values({
				teamNumber: data.team_number,
				matchId: matchInfo.match.id,
				leftBlackLine: data.auto_initiation_line,
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
				teleopAlgaeThrown: data.teleop_algae_thrown,
				cageClimb: data.cage_climb,
				comments: data.comments,
				defenseRating: data.defense,
			});
		} catch (err) {
			console.error(err);
			throw new ServerActionError("Server error");
		}
	}
);
