"use server";
import { Match, MatchAlliance, MatchScoreBreakdown2025 } from "./schemas";

import { db } from "@repo/database";
import {
	Alliance,
	match,
	matchScoreBreakdown,
	teamMatch,
} from "@repo/database/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
function getAllianceTeamMatches(
	alliance: MatchAlliance,
	matchId: string,
	allianceColor: Alliance
) {
	return alliance.team_keys.map((key, pos) => ({
		matchId: matchId,
		teamNumber: parseInt(key.slice(3)),
		alliance: allianceColor,
		alliancePosition: pos + 1,
	}));
}

function parseMatchScoreBreakdown(
	breakdown: MatchScoreBreakdown2025,
	matchId: string
) {
	const alliances = [Alliance.RED, Alliance.BLUE] as const;
	return alliances
		.map((alliance) => {
			const allianceBreakdown = breakdown[alliance];

			return {
				matchId: matchId,
				alliance: alliance,
				autoLineRobot1: allianceBreakdown.autoLineRobot1,
				autoLineRobot2: allianceBreakdown.autoLineRobot2,
				autoLineRobot3: allianceBreakdown.autoLineRobot3,
				autoMobilityPoints: allianceBreakdown.autoMobilityPoints,
				autoPoints: allianceBreakdown.autoPoints,
				autoReefTopRow: allianceBreakdown.autoReef.topRow,
				autoReefMidRow: allianceBreakdown.autoReef.midRow,
				autoReefBotRow: allianceBreakdown.autoReef.botRow,
				autoReefTrough: allianceBreakdown.autoReef.trough,
				bargeBonusAchieved: allianceBreakdown.bargeBonusAchieved,
				coopertitionCriteriaMet:
					allianceBreakdown.coopertitionCriteriaMet,
				coralBonusAchieved: allianceBreakdown.coralBonusAchieved,
				endGameBargePoints: allianceBreakdown.endGameBargePoints,
				endGameRobot1: allianceBreakdown.endGameRobot1,
				endGameRobot2: allianceBreakdown.endGameRobot2,
				endGameRobot3: allianceBreakdown.endGameRobot3,
				foulCount: allianceBreakdown.foulCount,
				foulPoints: allianceBreakdown.foulPoints,
				g206Penalty: allianceBreakdown.g206Penalty,
				g408Penalty: allianceBreakdown.g408Penalty,
				g424Penalty: allianceBreakdown.g424Penalty,
				netAlgaeCount: allianceBreakdown.netAlgaeCount,
				rp: allianceBreakdown.rp,
				techFoulCount: allianceBreakdown.techFoulCount,
				teleopCoralCount: allianceBreakdown.teleopCoralCount,
				teleopCoralPoints: allianceBreakdown.teleopCoralPoints,
				teleopPoints: allianceBreakdown.teleopPoints,
				teleopReefTopRow: allianceBreakdown.teleopReef.topRow,
				teleopReefMidRow: allianceBreakdown.teleopReef.midRow,
				teleopReefBotRow: allianceBreakdown.teleopReef.botRow,
				teleopReefTrough: allianceBreakdown.teleopReef.trough,
				totalPoints: allianceBreakdown.totalPoints,
				wallAlgaeCount: allianceBreakdown.wallAlgaeCount,
			};
		})
		.filter((breakdown) => breakdown !== null);
}

export async function seedMatches(eventKey: string) {
	if (!eventKey) {
		throw new Error("Event key is required");
	}

	const matches = await fetch(
		`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
		{
			headers: {
				// eslint-disable-next-line turbo/no-undeclared-env-vars
				"X-TBA-Auth-Key": process.env.TBA_API_KEY!,
			},
		}
	);

	const data = await matches.json();

	const parsedMatches = z.array(Match).safeParse(data);

	if (!parsedMatches.success) {
		console.dir(parsedMatches.error, { depth: null });
		throw new Error("Failed to parse matches");
	}

	for (const m of parsedMatches.data) {
		await db
			.insert(match)
			.values({
				id: m.key,
				compLevel: m.comp_level,
				setNumber: m.set_number,
				matchNumber: m.match_number,
				eventKey: m.event_key,
				winningAlliance: m.winning_alliance,
			})
			.onConflictDoUpdate({
				target: match.id,
				set: {
					winningAlliance: m.winning_alliance,
				},
			});

		const redTeamMatch = db
			.insert(teamMatch)
			.values(
				getAllianceTeamMatches(m.alliances.red, m.key, Alliance.RED)
			)
			.onConflictDoUpdate({
				target: [teamMatch.matchId, teamMatch.teamNumber],
				set: {
					alliance: Alliance.RED,
					alliancePosition: sql.raw(`excluded.alliance_position`),
				},
			});

		const blueTeamMatch = db
			.insert(teamMatch)
			.values(
				getAllianceTeamMatches(m.alliances.blue, m.key, Alliance.BLUE)
			)
			.onConflictDoUpdate({
				target: [teamMatch.matchId, teamMatch.teamNumber],
				set: {
					alliance: Alliance.BLUE,
					alliancePosition: sql.raw(`excluded.alliance_position`),
				},
			});

		await Promise.all([redTeamMatch, blueTeamMatch]);

		if (m.score_breakdown) {
			await db
				.insert(matchScoreBreakdown)
				.values(parseMatchScoreBreakdown(m.score_breakdown, m.key));
		}
	}

	revalidatePath("/admin/tools");
}
