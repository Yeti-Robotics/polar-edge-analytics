import { createServerAction, ServerActionError } from "@/lib/actions/actions-utils";
import { db } from "@repo/database";
import { teamStats } from "@repo/database/schema";

export const scoutedTeamData = createServerAction(async () => {
    try {
        return await db.select().from(teamStats) as unknown as TeamData[];
    } catch (error) {
        console.error("Error fetching team data:", error);
        throw new ServerActionError("Failed to fetch team data");
    }
});

export type TeamData = {
    teamNumber: number;
    teamName: string;
    autoCoralLevel1: number;
    autoCoralLevel2: number;
    autoCoralLevel3: number;
    autoCoralLevel4: number;
    autoAlgaeProcessor: number;
    autoAlgaeNet: number;
    teleopCoralLevel1: number;
    teleopCoralLevel2: number;
    teleopCoralLevel3: number;
    teleopCoralLevel4: number;
    teleopAlgaeProcessor: number;
    teleopAlgaeNet: number;
    teleopAlgaeThrown: number;
    parkPercentage: number;
    shallowPercentage: number;
    deepPercentage: number;
    initiationLine: number;
    defenseRating: number;
  };