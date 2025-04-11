import { db } from "@/lib/database";
import { standForm, team, teamMatchStats } from "@/lib/database/schema";
import { Button } from "@repo/ui/components/button";
import { avg, eq, sql } from "drizzle-orm";

interface TeamPageProps {
    params: Promise<{
        teamNumber: string;
    }>
}

export default async function TeamPage({ params }: TeamPageProps) {
    const {teamNumber} = await params;
    const [teamInfo] = await db.select().from(team).where(eq(team.teamNumber, parseInt(teamNumber))).limit(1);
    const [teamStats] = await db.select({
        autoCoral: sql`AVG(${teamMatchStats.autoCoralLevel1} + ${teamMatchStats.autoCoralLevel2} + ${teamMatchStats.autoCoralLevel3} + ${teamMatchStats.autoCoralLevel4})`.mapWith(Number).as("autoCoral"),
        autoAlgae: sql`AVG(${teamMatchStats.autoAlgaeNet} + ${teamMatchStats.autoAlgaeProcessor})`.mapWith(Number).as("autoAlgae"),
        autoCoralPoints: sql`AVG(${teamMatchStats.autoCoralLevel1} * 3 + ${teamMatchStats.autoCoralLevel2} * 4 + ${teamMatchStats.autoCoralLevel3} * 6 + ${teamMatchStats.autoCoralLevel4} * 7)`.mapWith(Number).as("autoCoralPoints"),
    }).from(teamMatchStats)
        .groupBy(teamMatchStats.teamNumber)
        .having(eq(teamMatchStats.teamNumber, parseInt(teamNumber))
    )

    // const teamStandForms = await db.select().from(standForm).where(eq(standForm.teamNumber, parseInt(teamNumber)));
    
    

    if (!teamStats || !teamInfo) {
        return <div>Team not found</div>
    }

    return <div>
        <h1 className = "text-lg font-bold italic">{teamNumber} - {teamInfo.teamName}</h1>
        <section>
            <h2>{teamStats.autoAlgae} {teamStats.autoCoral}</h2>
            <Button>Button</Button>
            
        </section>
        <section>
        </section>
    </div>
}