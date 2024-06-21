import { integer, pgTable, text } from "drizzle-orm/pg-core";


export const frc_team = pgTable('frc_team', {
    team_number: integer('team_number').primaryKey(),
    team_name: text('team_name').notNull(),
    location: text('location').notNull()
})