import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  pgEnum,
  varchar,
  date,
  serial,
  smallint,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { enumToPgEnum } from "./utils";
import { check } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  GUEST = "guest",
  BANISHED = "banished",
}

export const userRoleEnum = pgEnum("user_role", enumToPgEnum(UserRole));

export const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  guildNickname: text("guildNickname"),
  role: userRoleEnum().default(UserRole.USER),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (acc) => [primaryKey({ columns: [acc.provider, acc.providerAccountId] })]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export enum Cage {
  SHALLOW = "shallow",
  DEEP = "deep",
  PARK = "park"
}

export enum Alliance {
  RED = "red",
  BLUE = "blue"
}

export const cageEnum = pgEnum("cage", enumToPgEnum(Cage));
export const allianceEnum = pgEnum("alliance", enumToPgEnum(Alliance));

export const team_match = pgTable("team_match", {
  id: uuid("team_match_id").primaryKey().defaultRandom(),
  tournamentId: integer("tournament_id").references(() => tournament.id).notNull(),
  matchNumber: smallint("match_number").notNull(),
  teamNumber: integer("team_number").notNull().references(() => team.teamNumber),
  alliance: allianceEnum().notNull(),
  alliancePosition: smallint("alliance_position").notNull()
}, (table) => [{
  alliancePositionConstraint: check("alliance_position_constraint", sql`${table.alliancePosition} in (1,2,3)`)
}]);

export const standForm = pgTable("stand_form", {
  id: uuid("stand_form_id").primaryKey().defaultRandom(),
  teamMatchId: uuid("team_match_id").references(() => team_match.id),
  userId: uuid("user_id").references(() => users.id).notNull(),
  leftBlackLine: boolean("left_black_line").notNull(),
  autoCoralLevel1: integer("auto_coral_level1").notNull(),
  autoCoralLevel2: integer("auto_coral_level2").notNull(),
  autoCoralLevel3: integer("auto_coral_level3").notNull(),
  autoCoralLevel4: integer("auto_coral_level4").notNull(),
  autoAlgaeProcessor: integer("auto_algae_processed").notNull(),
  autoAlgaeNet: integer("auto_algae_netted").notNull(),
  teleopCoralLevel1: integer("teleop_coral_level1").notNull(),
  teleopCoralLevel2: integer("teleop_coral_level2").notNull(),
  teleopCoralLevel3: integer("teleop_coral_level3").notNull(),
  teleopCoralLevel4: integer("teleop_coral_level4").notNull(),
  teleopAlgaeProcessor: integer("teleop_algae_processed").notNull(),
  teleopAlgaeNet: integer("teleop_algae_netted").notNull(),
  teleopAlgaeThrown: integer("teleop_algae_thrown").notNull(),
  cageClimb: cageEnum("cage_climb").notNull(),
  defenseRating: integer("defense_rating").notNull(),
  comments: text("comments").notNull()
});

export const tournament = pgTable("tournament", {
  id: serial("tournament_id").primaryKey(),
  eventName: varchar().notNull(),
  startDate: date().notNull(),
  endDate: date().notNull(),
});

export const team = pgTable("team", {
  teamNumber: serial("team_number").notNull().primaryKey(),
  teamName: varchar("team_name", { length: 256 }).notNull(),
});