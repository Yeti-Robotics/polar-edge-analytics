import {
    createServerAction,
    ServerActionError,
} from "@/lib/actions/actions-utils";
import { db } from "@/lib/database";
import { match, standForm, team } from "@/lib/database/schema";
import { avg, eq, sql } from "drizzle-orm";

export const scoutedTeamData = createServerAction(async (id: string): Promise<TeamData[]> => {
    try {
        const query = await db
            .select({
                team_number: standForm.teamNumber,
                team_name: team.teamName,
                auto_coral_level_1: avg(standForm.autoCoralLevel1).mapWith(Number),
                auto_coral_level_2: avg(standForm.autoCoralLevel2).mapWith(Number),
                auto_coral_level_3: avg(standForm.autoCoralLevel3).mapWith(Number),
                auto_coral_level_4: avg(standForm.autoCoralLevel4).mapWith(Number),
                auto_algae_processor: avg(standForm.autoAlgaeProcessor).mapWith(Number),
                auto_algae_net: avg(standForm.autoAlgaeNet).mapWith(Number),
                teleop_coral_level_1: avg(standForm.teleopCoralLevel1).mapWith(Number),
                teleop_coral_level_2: avg(standForm.teleopCoralLevel2).mapWith(Number),
                teleop_coral_level_3: avg(standForm.teleopCoralLevel3).mapWith(Number),
                teleop_coral_level_4: avg(standForm.teleopCoralLevel4).mapWith(Number),
                teleop_algae_processor: avg(standForm.teleopAlgaeProcessor).mapWith(Number),
                teleop_algae_net: avg(standForm.teleopAlgaeNet).mapWith(Number),
                teleop_algae_thrown: avg(standForm.teleopAlgaeThrown).mapWith(Number),
                park_percentage: sql<number>`AVG(CASE WHEN ${standForm.cageClimb} = 'Parked' THEN 1 ELSE 0 END)`,
                shallow_percentage: sql<number>`AVG(CASE WHEN ${standForm.cageClimb} = 'ShallowCage' THEN 1 ELSE 0 END)`,
                deep_percentage: sql<number>`AVG(CASE WHEN ${standForm.cageClimb} = 'DeepCage' THEN 1 ELSE 0 END)`,
                defense_rating: avg(standForm.defenseRating).mapWith(Number),
                initiation_line: sql<number>`AVG(CAST(${standForm.leftBlackLine} AS INT))`.mapWith(Number)
            })
            .from(standForm)
            .innerJoin(match, eq(match.id, standForm.matchId))
            .innerJoin(team, eq(team.teamNumber, standForm.teamNumber))
            .where(eq(match.eventKey, id))
            .groupBy(sql`${standForm.teamNumber}, ${team.teamName}`);

        return query;
    } catch (error) {
        console.error("Error fetching team data:", error);
        throw new ServerActionError("Failed to fetch team data");
    }
});

export type TeamData = {
    team_number: number;
    team_name: string;
    auto_coral_level_1: number;
    auto_coral_level_2: number;
    auto_coral_level_3: number;
    auto_coral_level_4: number;
    auto_algae_processor: number;
    auto_algae_net: number;
    teleop_coral_level_1: number;
    teleop_coral_level_2: number;
    teleop_coral_level_3: number;
    teleop_coral_level_4: number;
    teleop_algae_processor: number;
    teleop_algae_net: number;
    teleop_algae_thrown: number;
    park_percentage: number;
    shallow_percentage: number;
    deep_percentage: number;
    initiation_line: number;
    defense_rating: number;
};
