"use server";

import {
	ServerActionError,
	ServerActionResult,
} from "@/lib/actions/actions-utils";
import { StandFormData } from "@/lib/components/stand-form/schema";
import { createClient } from "@/lib/database/server";

export const submitStandForm = async (
	data: StandFormData
): Promise<ServerActionResult<unknown>> => {
	const supabase = createClient();
	const { data: userData, error: authError } = await supabase.auth.getUser();

	if (authError) {
		throw new ServerActionError("Not authenticated");
	}

	const { error } = await supabase.from("stand_form").insert({
		event_key: "2024ncmec",
		team_number: data.team_number,
		match_number: data.match_number,
		scouter: userData.user.id,
		initiation_line: data.auto_line,
		auto_speaker_notes: data.speaker_auto,
		auto_amp_notes: data.amp_auto,
		auto_shuttle_notes: data.shuttle_auto,
		teleop_speaker_notes: data.speaker_teleop,
		teleop_amp_notes: data.amp_teleop,
		teleop_shuttle_notes: data.shuttle_teleop,
		climb: data.climbed,
		park: data.parked,
		defense: data.defense_rating,
		notes: data.notes,
		approved: false,
	});

	if (error) {
		throw new ServerActionError("Error submitting form");
	}

	return { success: true, value: data };
};
