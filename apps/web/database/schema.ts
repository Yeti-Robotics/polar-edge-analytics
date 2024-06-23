import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const frcTeam = pgTable("frc_team", {
  team_number: integer("team_number").primaryKey(),
  team_name: text("team_name").notNull(),
  location: text("location").notNull(),
});
