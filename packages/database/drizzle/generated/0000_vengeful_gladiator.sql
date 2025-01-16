CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'guest', 'banished');--> statement-breakpoint
CREATE TYPE "public"."alliance" AS ENUM('red', 'blue');--> statement-breakpoint
CREATE TYPE "public"."metric_type" AS ENUM('numeric', 'boolean', 'enumerated', 'text');--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "game_period" (
	"id" serial PRIMARY KEY NOT NULL,
	"period" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metric" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"metric_value_type" "metric_type" NOT NULL,
	"enum_id" integer,
	CONSTRAINT "metric_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metric_enum" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "metric_enum_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metric_enum_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"enum_id" integer NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metric_tags" (
	"tag_id" integer,
	"metric_id" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statistic" (
	"id" serial PRIMARY KEY NOT NULL,
	"metric_id" varchar(20) NOT NULL,
	"period_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"team_match_id" integer NOT NULL,
	"submitted_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission_boolean_statistic" (
	"submission_id" uuid,
	"statistic_id" integer,
	"statistic_value" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission_enumerated_statistic" (
	"submission_id" uuid,
	"statistic_id" integer,
	"statistic_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission_numeric_statistic" (
	"submission_id" uuid,
	"statistic_id" integer,
	"statistic_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission_textual_statistic" (
	"submission_id" uuid,
	"statistic_id" integer,
	"statistic_value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_match" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_id" varchar(20) NOT NULL,
	"team_number" integer NOT NULL,
	"match_number" integer,
	"alliance" "alliance" NOT NULL,
	"alliance_position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL
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
 ALTER TABLE "metric" ADD CONSTRAINT "metric_enum_id_metric_enum_id_fk" FOREIGN KEY ("enum_id") REFERENCES "public"."metric_enum"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "metric_enum_values" ADD CONSTRAINT "metric_enum_values_enum_id_metric_enum_id_fk" FOREIGN KEY ("enum_id") REFERENCES "public"."metric_enum"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "metric_tags" ADD CONSTRAINT "metric_tags_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "metric_tags" ADD CONSTRAINT "metric_tags_metric_id_metric_id_fk" FOREIGN KEY ("metric_id") REFERENCES "public"."metric"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statistic" ADD CONSTRAINT "statistic_metric_id_metric_id_fk" FOREIGN KEY ("metric_id") REFERENCES "public"."metric"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statistic" ADD CONSTRAINT "statistic_period_id_game_period_id_fk" FOREIGN KEY ("period_id") REFERENCES "public"."game_period"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_team_match_id_team_match_id_fk" FOREIGN KEY ("team_match_id") REFERENCES "public"."team_match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_boolean_statistic" ADD CONSTRAINT "submission_boolean_statistic_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_boolean_statistic" ADD CONSTRAINT "submission_boolean_statistic_statistic_id_statistic_id_fk" FOREIGN KEY ("statistic_id") REFERENCES "public"."statistic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_enumerated_statistic" ADD CONSTRAINT "submission_enumerated_statistic_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_enumerated_statistic" ADD CONSTRAINT "submission_enumerated_statistic_statistic_id_statistic_id_fk" FOREIGN KEY ("statistic_id") REFERENCES "public"."statistic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_enumerated_statistic" ADD CONSTRAINT "submission_enumerated_statistic_statistic_value_metric_enum_values_id_fk" FOREIGN KEY ("statistic_value") REFERENCES "public"."metric_enum_values"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_numeric_statistic" ADD CONSTRAINT "submission_numeric_statistic_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_numeric_statistic" ADD CONSTRAINT "submission_numeric_statistic_statistic_id_statistic_id_fk" FOREIGN KEY ("statistic_id") REFERENCES "public"."statistic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_textual_statistic" ADD CONSTRAINT "submission_textual_statistic_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission_textual_statistic" ADD CONSTRAINT "submission_textual_statistic_statistic_id_statistic_id_fk" FOREIGN KEY ("statistic_id") REFERENCES "public"."statistic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_match" ADD CONSTRAINT "team_match_tournament_id_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournament"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_match" ADD CONSTRAINT "team_match_team_number_team_id_fk" FOREIGN KEY ("team_number") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
