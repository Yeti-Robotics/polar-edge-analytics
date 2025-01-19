"use server";

import { createServerAction, ServerActionError } from "@/lib/actions/actions-utils";
import { StandFormData } from "./schema";
import { auth } from "@/lib/auth";
import { AuthErrors, authorized } from "@/lib/auth/utils";
import { standForm, team_match, UserRole } from "@repo/database/schema";
import { db } from "@repo/database";
import { and, eq } from "drizzle-orm";

export const submitStandForm = createServerAction(async (data: StandFormData) => {
    const session = await auth();

    if (!authorized({
        requiredRole: UserRole.USER,
        currentUserRole: session?.user.role
    }) || !session?.user.id) {
        throw new ServerActionError(AuthErrors.UNAUTHORIZED);
    }

    const teamMatch = await db
        .select()
        .from(team_match)
        .where(and(eq(team_match.teamNumber, data.team_number), eq(team_match.matchNumber, data.match_number)));

    const matchInfo = teamMatch.shift();

    if (!matchInfo) {
        throw new ServerActionError("Invalid team/match number!");
    }
    
    try {
        await db.insert(standForm)
            .values({
                leftBlackLine: data.auto_initiation_line,
                teamMatchId: matchInfo.id,
                userId: session.user.id,
                autoCoralLevel1: data.auto_coral_level_1,
                autoCoralLevel2: data.auto_coral_level_2,
                autoCoralLevel3: data.auto_coral_level_3,
                autoCoralLevel4: data.auto_coral_level_4,
                autoAlgaeProcessed: data.auto_algae_processed,
                autoAlgaeNetted: data.auto_algae_netted,
                teleopCoralLevel1: data.teleop_coral_level_1,
                teleopCoralLevel2: data.teleop_coral_level_2,
                teleopCoralLevel3: data.teleop_coral_level_3,
                teleopCoralLevel4: data.teleop_coral_level_4,
                teleopAlgaeProcessed: data.teleop_algae_processed,
                teleopAlgaeNetted: data.teleop_algae_netted,
                teleopAlgaeThrown: data.teleop_algae_thrown,
                cageClimb: data.cage_climb,
                comments: data.comments,
                defenseRating: data.defense
            });
    } catch (err) {
        console.error(err);
        throw new ServerActionError("Server error");
    }
})