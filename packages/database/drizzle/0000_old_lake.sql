CREATE TYPE "public"."alliance" AS ENUM('red', 'blue');--> statement-breakpoint
CREATE TYPE "public"."cage" AS ENUM('shallow', 'deep', 'park');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'guest', 'banished');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" uuid NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stand_form" (
	"stand_form_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_match_id" uuid,
	"user_id" uuid NOT NULL,
	"left_black_line" boolean NOT NULL,
	"auto_coral_level1" integer NOT NULL,
	"auto_coral_level2" integer NOT NULL,
	"auto_coral_level3" integer NOT NULL,
	"auto_coral_level4" integer NOT NULL,
	"auto_algae_processed" integer NOT NULL,
	"auto_algae_netted" integer NOT NULL,
	"teleop_coral_level1" integer NOT NULL,
	"teleop_coral_level2" integer NOT NULL,
	"teleop_coral_level3" integer NOT NULL,
	"teleop_coral_level4" integer NOT NULL,
	"teleop_algae_processed" integer NOT NULL,
	"teleop_algae_netted" integer NOT NULL,
	"teleop_algae_thrown" integer NOT NULL,
	"cage_climb" "cage" NOT NULL,
	"defense_rating" integer NOT NULL,
	"comments" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"team_number" serial PRIMARY KEY NOT NULL,
	"team_name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_match" (
	"team_match_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tournament_id" integer NOT NULL,
	"match_number" smallint NOT NULL,
	"team_number" integer NOT NULL,
	"alliance" "alliance" NOT NULL,
	"alliance_position" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament" (
	"tournament_id" serial PRIMARY KEY NOT NULL,
	"event_name" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"guildNickname" text,
	"role" "user_role" DEFAULT 'user',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stand_form" ADD CONSTRAINT "stand_form_team_match_id_team_match_team_match_id_fk" FOREIGN KEY ("team_match_id") REFERENCES "public"."team_match"("team_match_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stand_form" ADD CONSTRAINT "stand_form_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_match" ADD CONSTRAINT "team_match_tournament_id_tournament_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournament"("tournament_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_match" ADD CONSTRAINT "team_match_team_number_team_team_number_fk" FOREIGN KEY ("team_number") REFERENCES "public"."team"("team_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
