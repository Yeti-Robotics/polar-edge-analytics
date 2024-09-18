"use server";

import {
	createServerAction,
	ServerActionError,
} from "@/lib/actions/actions-utils";
import { TeamData } from "@/lib/components/display/team-data-table/table";
import { createClient } from "@/lib/database/server";

export const getTeamData = createServerAction(async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("team_stats").select("*");

	if (error) {
		throw new ServerActionError("Error getting team data");
	}

	return data as unknown as TeamData[];
});
