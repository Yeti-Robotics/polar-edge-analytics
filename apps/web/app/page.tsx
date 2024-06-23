import { db } from "@/database";
import { frcTeam } from "@/database/schema";
import { eq } from "drizzle-orm";
import Button from "@repo/ui/button";

export default async function Home() {
  const test = await db
    .select()
    .from(frcTeam)
    .where(eq(frcTeam.team_number, 3506));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Future homepage!
      {test[0].team_number}
    </main>
  );
}
