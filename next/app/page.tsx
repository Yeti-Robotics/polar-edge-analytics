import { Button } from "@/components/ui/button";
import Image from "next/image";
import { db } from "@/drizzle/db";
import { frc_team } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function Home() {

  await db.insert(frc_team).values([
    {
      team_number: 3506,
      team_name: "YETI Robotics",
      location: "Charlotte, NC"
    }
  ]);

  const teamInfo = await db.select().from(frc_team).where(eq(frc_team.team_name, "YETI Robotics"))

  return (
    <main className="">
      {teamInfo[0].team_number}
    </main>
  );
}
