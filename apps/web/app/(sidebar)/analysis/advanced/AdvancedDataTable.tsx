import { db } from "@/lib/database";
import { team, teamMatchStats } from "@/lib/database/schema";
import { match } from "@/lib/database/schema";
import { avg, eq, sql } from "drizzle-orm";
import AdvancedDataTableClient from "./AdvancedDataTableClient";

export type AdvancedTeamData = {
	team_number: number;
	team_name: string;
	auto_total: number;
	teleop_total: number;
	endgame_total: number;
	total_score: number;
};

export async function AdvancedDataTable({ id }: { id: string }) {
	const pointValues = db.$with("point_values").as(
		db
			.select({
				team_number: teamMatchStats.teamNumber,
				auto_coral_level_1: avg(teamMatchStats.autoCoralLevel1).as(
					"auto_coral_level_1"
				),
				auto_coral_level_2: avg(teamMatchStats.autoCoralLevel2).as(
					"auto_coral_level_2"
				),
				auto_coral_level_3: avg(teamMatchStats.autoCoralLevel3).as(
					"auto_coral_level_3"
				),
				auto_coral_level_4: avg(teamMatchStats.autoCoralLevel4).as(
					"auto_coral_level_4"
				),
				auto_algae_processor: avg(teamMatchStats.autoAlgaeProcessor).as(
					"auto_algae_processor"
				),
				auto_algae_net: avg(teamMatchStats.autoAlgaeNet).as(
					"auto_algae_net"
				),
				teleop_coral_level_1: avg(teamMatchStats.teleopCoralLevel1).as(
					"teleop_coral_level_1"
				),
				teleop_coral_level_2: avg(teamMatchStats.teleopCoralLevel2).as(
					"teleop_coral_level_2"
				),
				teleop_coral_level_3: avg(teamMatchStats.teleopCoralLevel3).as(
					"teleop_coral_level_3"
				),
				teleop_coral_level_4: avg(teamMatchStats.teleopCoralLevel4).as(
					"teleop_coral_level_4"
				),
				teleop_algae_processor: avg(
					teamMatchStats.teleopAlgaeProcessor
				).as("teleop_algae_processor"),
				teleop_algae_net: avg(teamMatchStats.teleopAlgaeNet).as(
					"teleop_algae_net"
				),
				park_percentage: avg(teamMatchStats.parkPercentage).as(
					"park_percentage"
				),
				shallow_percentage: avg(teamMatchStats.shallowPercentage).as(
					"shallow_percentage"
				),
				deep_percentage: avg(teamMatchStats.deepPercentage).as(
					"deep_percentage"
				),
				initiation_line: avg(teamMatchStats.initiationLine)
					.mapWith(Number)
					.as("initiation_line"),
			})
			.from(teamMatchStats)
			.innerJoin(match, eq(match.id, teamMatchStats.matchId))
			.where(eq(match.eventKey, id))
			.groupBy(teamMatchStats.teamNumber)
	);

	const advancedData = await db
		.with(pointValues)
		.select({
			team_number: pointValues.team_number,
			team_name: team.teamName,
			auto_total: {
				value: sql`3 * ${pointValues.auto_coral_level_1} + 
                        4 * ${pointValues.auto_coral_level_2} + 
                        6 * ${pointValues.auto_coral_level_3} + 
                        7 * ${pointValues.auto_coral_level_4} + 
                        6 * ${pointValues.auto_algae_processor} + 
                        4 * ${pointValues.auto_algae_net} + 
                        ${pointValues.initiation_line}`,
			},
			teleop_total: {
				value: sql`2 * ${pointValues.teleop_coral_level_1} + 
                        3 * ${pointValues.teleop_coral_level_2} + 
                        4 * ${pointValues.teleop_coral_level_3} + 
                        5 * ${pointValues.teleop_coral_level_4} + 
                        6 * ${pointValues.teleop_algae_processor} + 
                        4 * ${pointValues.teleop_algae_net}`,
			},
			endgame_total: {
				value: sql`2 * ${pointValues.park_percentage} + 
                        6 * ${pointValues.shallow_percentage} + 
                        12 * ${pointValues.deep_percentage}`,
			},
		})
		.from(pointValues)
		.innerJoin(team, eq(team.teamNumber, pointValues.team_number));

	// Transform the data to match our client component's expected format
	const formattedData: AdvancedTeamData[] = advancedData.map((team) => ({
		team_number: team.team_number,
		team_name: team.team_name,
		auto_total: Number(team.auto_total.value),
		teleop_total: Number(team.teleop_total.value),
		endgame_total: Number(team.endgame_total.value),
		total_score:
			Number(team.auto_total.value) +
			Number(team.teleop_total.value) +
			Number(team.endgame_total.value),
	}));

	console.log(formattedData.filter((team) => team.team_number === 10120));

	return (
		<div>
			<AdvancedDataTableClient advancedData={formattedData} />
		</div>
	);
}
