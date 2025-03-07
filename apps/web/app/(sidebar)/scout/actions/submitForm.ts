"use server";

import { StandFormData } from "../data/schema";

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

/**
 * Get the current tournament
 * @returns The current tournament
 */
async function getCurrentTournament() {
	return db
		.select()
		.from(tournament)
		.where(eq(tournament.isCurrent, true))
		.limit(1)
		.then((res) => res[0]);
}

/**
 * Get the team matches for a given team and match number
 * @param teamNumber The number of the team
 * @param matchNumber The number of the match
 * @returns The team matches
 */
async function getTeamMatches(teamNumber: number, matchNumber: number) {
	return db
		.select()
		.from(teamMatch)
		.leftJoin(match, eq(teamMatch.matchId, match.id))
		.where(
			and(
				eq(teamMatch.teamNumber, teamNumber),
				eq(match.matchNumber, matchNumber),
				eq(match.compLevel, "qm")
			)
		)
		.limit(1);
}

/**
 * Insert a stand form into the database
 * @param userId The id of the user
 * @param matchId The id of the match
 * @param data The data to insert
 */
async function insertStandForm(
	userId: string,
	matchId: string,
	data: StandFormData
) {
	return db.insert(standForm).values({
		teamNumber: data.match_detail.team_number,
		matchId: matchId,
		leftBlackLine: data.auto.auto_initiation_line,
		userId: userId,
		autoCoralLevel1: data.auto.auto_coral_level_1,
		autoCoralLevel2: data.auto.auto_coral_level_2,
		autoCoralLevel3: data.auto.auto_coral_level_3,
		autoCoralLevel4: data.auto.auto_coral_level_4,
		autoAlgaeProcessor: data.auto.auto_algae_processed,
		autoAlgaeNet: data.auto.auto_algae_netted,
		teleopCoralLevel1: data.teleop.teleop_coral_level_1,
		teleopCoralLevel2: data.teleop.teleop_coral_level_2,
		teleopCoralLevel3: data.teleop.teleop_coral_level_3,
		teleopCoralLevel4: data.teleop.teleop_coral_level_4,
		teleopAlgaeProcessor: data.teleop.teleop_algae_processed,
		teleopAlgaeNet: data.teleop.teleop_algae_netted,
		cageClimb: data.endgame.cage_climb,
		comments: data.misc.comments,
		defenseRating: data.misc.defense,
	});
}

/**
 * Submit a stand form
 *
 * Validates the user has access to submit a stand form for the given team and match.
 * Retrieves the current tournament, the team matches, and the match info.
 * If the team is not in the match, or the match info is not found, an error is thrown.
 *
 * Inserts the stand form into the database.
 *
 * @param data The data to submit
 */
async function _submitStandForm(data: StandFormData) {
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

	const currentTournament = await getCurrentTournament();

	if (!currentTournament) {
		throw new ServerActionError("No current tournament set!");
	}

	const teamMatches = await getTeamMatches(
		data.match_detail.team_number,
		data.match_detail.match_number
	);

	const matchInfo = teamMatches[0];

	if (!matchInfo || !matchInfo.match) {
		throw new ServerActionError("Team is not in this match");
	}

	await insertStandForm(session.user.id, matchInfo.match.id, data).catch(
		(err) => {
			console.error(err);
			throw new ServerActionError("Failed to insert stand form.");
		}
	);
}

/**
 * Submit a stand form
 *
 * Validates the user has access to submit a stand form for the given team and match.
 * Retrieves the current tournament, the team matches, and the match info.
 * If the team is not in the match, or the match info is not found, an error is thrown.
 *
 * Inserts the stand form into the database.
 *
 * @param data The data to submit
 */
export const submitStandForm = createServerAction(_submitStandForm);
