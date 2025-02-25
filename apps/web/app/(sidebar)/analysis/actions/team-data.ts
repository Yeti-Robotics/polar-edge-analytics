import {
    createServerAction,
    ServerActionError,
} from "@/lib/actions/actions-utils";
import { db } from "@/lib/database";
import { match, team, teamMatchStats } from "@/lib/database/schema";
import { avg, eq, sql } from "drizzle-orm";


export const scoutedTeamData = createServerAction(async (id: string): Promise<TeamData[]> => {
    try {
        const query = await db
            .select({
                team_number: teamMatchStats.teamNumber,
                team_name: team.teamName,
                auto_coral_level_1: avg(teamMatchStats.autoCoralLevel1).mapWith(Number),
                auto_coral_level_2: avg(teamMatchStats.autoCoralLevel2).mapWith(Number),
                auto_coral_level_3: avg(teamMatchStats.autoCoralLevel3).mapWith(Number),
                auto_coral_level_4: avg(teamMatchStats.autoCoralLevel4).mapWith(Number),
                auto_algae_processor: avg(teamMatchStats.autoAlgaeProcessor).mapWith(Number),
                auto_algae_net: avg(teamMatchStats.autoAlgaeNet).mapWith(Number),
                teleop_coral_level_1: avg(teamMatchStats.teleopCoralLevel1).mapWith(Number),
                teleop_coral_level_2: avg(teamMatchStats.teleopCoralLevel2).mapWith(Number),
                teleop_coral_level_3: avg(teamMatchStats.teleopCoralLevel3).mapWith(Number),
                teleop_coral_level_4: avg(teamMatchStats.teleopCoralLevel4).mapWith(Number),
                teleop_algae_processor: avg(teamMatchStats.teleopAlgaeProcessor).mapWith(Number),
                teleop_algae_net: avg(teamMatchStats.teleopAlgaeNet).mapWith(Number),
                park_percentage: avg(teamMatchStats.parkPercentage).mapWith(Number),
                shallow_percentage: avg(teamMatchStats.shallowPercentage).mapWith(Number),
                deep_percentage: avg(teamMatchStats.deepPercentage).mapWith(Number),
                defense_rating: avg(teamMatchStats.defenseRating).mapWith(Number),
                initiation_line: avg(teamMatchStats.initiationLine).mapWith(Number)
            })
            .from(teamMatchStats)
            .innerJoin(team, eq(team.teamNumber, teamMatchStats.teamNumber))
            .innerJoin(match, eq(match.id, teamMatchStats.matchId))
            .where(eq(match.eventKey, id))
            .groupBy(sql`${teamMatchStats.teamNumber}, ${team.teamName}`);

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
    park_percentage: number;
    shallow_percentage: number;
    deep_percentage: number;
    initiation_line: number;
    defense_rating: number;
};
