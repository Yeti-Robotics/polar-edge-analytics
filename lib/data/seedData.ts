"use server";
import { createClient } from "../database/server";
import matches from "./meckmatches.json";
import teams from "./meckteams.json";

interface TBAMatch {
	actual_time: number;
	alliances: {
		blue: {
			dq_team_keys: string[];
			score: number;
			surrogate_team_keys: string[];
			team_keys: string[];
		};
		red: {
			dq_team_keys: [];
			score: 67;
			surrogate_team_keys: [];
			team_keys: string[];
		};
	};
	comp_level: string;
	event_key: string;
	key: string;
	match_number: number;
	predicted_time: number;
	set_number: number;
	time: number;
	winning_alliance: "blue" | "red";
}

interface TBATeam {
	city: string;
	country: string;
	key: string;
	name: string;
	nickname: string;
	state_prov: string;
	team_number: number;
}

const matchParsed = matches as unknown as TBAMatch[];
const teamParsed = teams as unknown as TBATeam[];

export async function seedData() {
	const supabase = createClient();

	await supabase.from("event").insert({
		start_date: "2024-03-22",
		end_date: "2024-03-24",
		event_key: "2024ncmec",
		event_name: "FNC District Mecklenburg County Event",
	});

	const matches = matchParsed
		.filter((m) => m.comp_level === "qm")
		.map((i) => ({
			event_key: "2024ncmec",
			match_number: i.match_number,
		}));

	await supabase.from("match").insert(matches);

	const teams = teamParsed.map(({ team_number, nickname }) => ({
		team_number,
		team_name: nickname,
	}));

	const team_events = teamParsed.map(({ team_number }) => ({
		team_number,
		event_key: "2024ncmec",
	}));

	console.log(await supabase.from("team").insert(teams));
	await supabase.from("team_event").insert(team_events);

	interface TeamMatch {
		team_number: number;
		match_number: number;
		event_key: string;
		alliance: "red" | "blue" | "none";
		alliance_position: number;
	}

	const teamMatches = [] as TeamMatch[];
	matchParsed
		.filter((m) => m.comp_level === "qm")
		.forEach((match) => {
			match.alliances.red.team_keys.forEach((k, i) => {
				teamMatches.push({
					team_number: parseInt(k.slice(3)),
					match_number: match.match_number,
					event_key: "2024ncmec",
					alliance: "red",
					alliance_position: i + 1,
				});
			});
			match.alliances.blue.team_keys.forEach((k, i) => {
				teamMatches.push({
					team_number: parseInt(k.slice(3)),
					match_number: match.match_number,
					event_key: "2024ncmec",
					alliance: "blue",
					alliance_position: i + 1,
				});
			});
		});

	console.log(await supabase.from("team_match").insert(teamMatches));
}
