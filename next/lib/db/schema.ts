import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const frc_team = pgTable("frc_team", {
  team_number: integer("team_number").primaryKey(),
  team_name: text("team_name"),
  location: text("location").notNull(),
});
