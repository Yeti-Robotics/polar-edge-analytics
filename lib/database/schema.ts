import {
	integer,
	text,
	pgTable,
	date,
	primaryKey,
	boolean,
	pgSchema,
	uuid,
	foreignKey,
	serial,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const auth_users = authSchema.table("users", {
	id: uuid("id").primaryKey(),
});

export const team = pgTable("team", {
	team_number: integer("team_number").primaryKey(),
	team_name: text("team_name"),
	location: text("location").notNull(),
});

export const event = pgTable("event", {
	event_code: text("event_code").primaryKey(),
	event_name: text("event_name").notNull(),
	event_location: text("event_location"),
	event_start_date: date("event_date").notNull(),
	event_end_date: date("event_end_date").notNull(),
});

export const match = pgTable(
	"match",
	{
		event_code: text("event_code")
			.references(() => event.event_code)
			.notNull(),
		match_number: integer("match_number").notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.event_code, table.match_number] }),
	})
);

export const stand_form = pgTable(
	"stand_form",
	{
		form_id: serial("form_id"),
		scouter: uuid("user_id")
			.references(() => auth_users.id)
			.notNull(),
		team_number: integer("team_number")
			.references(() => team.team_number)
			.notNull(),
		match_number: integer("match_number"),
		event_code: text("event_code"),
		auto_line: boolean("auto_line").notNull(),
		speaker_auto: integer("speaker_auto").notNull(),
		amp_auto: integer("amp_auto").notNull(),
		shuttle_auto: integer("shuttle_auto").notNull(),
		speaker_teleop: integer("speaker_teleop").notNull(),
		amp_teleop: integer("amp_teleop").notNull(),
		shuttle_teleop: integer("shuttle_teleop").notNull(),
		climbed: boolean("climbed").notNull(),
		parked: boolean("parked").notNull(),
		bots_on_chain: integer("bots_on_chain").notNull(),
	},
	(table) => ({
		matchReference: foreignKey({
			columns: [table.event_code, table.match_number],
			foreignColumns: [match.event_code, match.match_number],
		}),
		pk: primaryKey({
			columns: [
				table.form_id,
				table.scouter,
				table.team_number,
				table.match_number,
				table.event_code,
			],
		}),
	})
);
