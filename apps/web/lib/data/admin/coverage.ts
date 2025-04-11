"server-only";

import { db } from "@/lib/database";
import { isAdmin } from "@/lib/data/auth";
import { match, teamMatch, standForm } from "@/lib/database/schema";
import { and, eq, gte, notExists, sql } from "drizzle-orm";
import { cache } from "react";

export const getMatchesMissingCoverage = cache(
	async (eventKey: string, minMatches: number = 1) => {
		const authorized = await isAdmin();
		if (!authorized) return null;

		const missingCoverage = await db
			.select({
				matchId: match.id,
				matchNumber: match.matchNumber,
				teamNumber: teamMatch.teamNumber,
				alliance: teamMatch.alliance,
				alliancePosition: teamMatch.alliancePosition,
			})
			.from(match)
			.innerJoin(teamMatch, eq(match.id, teamMatch.matchId))
			.where(
				and(
					eq(match.eventKey, eventKey),
					eq(match.compLevel, "qm"), // get only qual matches
					notExists(
						db
							.select({
								matchId: standForm.matchId,
								teamNumber: standForm.teamNumber,
							})
							.from(standForm)
							.groupBy(standForm.matchId, standForm.teamNumber)
							.having(gte(sql<number>`count(*)`, minMatches))
							.where(
								and(
									eq(standForm.matchId, match.id),
									eq(
										standForm.teamNumber,
										teamMatch.teamNumber
									)
								)
							)
					)
				)
			)
			.orderBy(
				match.compLevel,
				match.setNumber,
				match.matchNumber,
				teamMatch.alliance,
				teamMatch.alliancePosition
			);

		return missingCoverage;
	}
);
