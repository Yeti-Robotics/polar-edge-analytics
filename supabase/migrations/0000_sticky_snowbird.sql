CREATE TABLE IF NOT EXISTS "event" (
	"event_code" text PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"event_location" text,
	"event_date" date NOT NULL,
	"event_end_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match" (
	"event_code" text NOT NULL,
	"match_number" integer NOT NULL,
	CONSTRAINT "match_event_code_match_number_pk" PRIMARY KEY("event_code","match_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stand_form" (
	"form_id" serial NOT NULL,
	"user_id" uuid NOT NULL,
	"team_number" integer NOT NULL,
	"match_number" integer,
	"event_code" text,
	"auto_line" boolean NOT NULL,
	"speaker_auto" integer NOT NULL,
	"amp_auto" integer NOT NULL,
	"shuttle_auto" integer NOT NULL,
	"speaker_teleop" integer NOT NULL,
	"amp_teleop" integer NOT NULL,
	"shuttle_teleop" integer NOT NULL,
	"climbed" boolean NOT NULL,
	"parked" boolean NOT NULL,
	"bots_on_chain" integer NOT NULL,
	CONSTRAINT "stand_form_form_id_user_id_team_number_match_number_event_code_pk" PRIMARY KEY("form_id","user_id","team_number","match_number","event_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"team_number" integer PRIMARY KEY NOT NULL,
	"team_name" text,
	"location" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match" ADD CONSTRAINT "match_event_code_event_event_code_fk" FOREIGN KEY ("event_code") REFERENCES "public"."event"("event_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stand_form" ADD CONSTRAINT "stand_form_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stand_form" ADD CONSTRAINT "stand_form_team_number_team_team_number_fk" FOREIGN KEY ("team_number") REFERENCES "public"."team"("team_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stand_form" ADD CONSTRAINT "stand_form_event_code_match_number_match_event_code_match_number_fk" FOREIGN KEY ("event_code","match_number") REFERENCES "public"."match"("event_code","match_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
