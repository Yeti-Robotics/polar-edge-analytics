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

    const [autoEPA] = await db.select({
        autoCoral: sql`AVG(${teamMatchStats.autoCoralLevel1} + ${teamMatchStats.autoCoralLevel2} + ${teamMatchStats.autoCoralLevel3} + ${teamMatchStats.autoCoralLevel4})`.mapWith(Number).as("autoCoral"),
        autoAlgae: sql`AVG(${teamMatchStats.autoAlgaeNet} + ${teamMatchStats.autoAlgaeProcessor})`.mapWith(Number).as("autoAlgae"),
    }).from(teamMatchStats)
        .groupBy(teamMatchStats.teamNumber)
        .having(eq(teamMatchStats.teamNumber, parseInt(teamNumber))
    )

    if (!autoEPA) {
        return <div>Team not found</div>
    }

    console.log(autoEPA)
    return <div>
        <h1>{teamNumber}</h1>
        <section>
            <h2>{autoEPA.autoAlgae} {autoEPA.autoCoral}</h2>
            <Button>Button</Button>
            
        </section>
        <section>
        </section>
    </div>
}