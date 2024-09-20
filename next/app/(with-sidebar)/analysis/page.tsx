"use server";

import { TeamDataTable } from "@/lib/components/display/team-data-table";
import { getTeamData } from "./data";

export default async function AnalysisPage() {
	const teamDataResult = await getTeamData();

	return (
		<div>
			<h1 className="text-2xl font-semibold leading-none tracking-tight md:text-3xl">
				Team Data
			</h1>
			<div className="mx-1 my-4">
				{!teamDataResult.success
					? "Error fetching team data"
					: teamDataResult.value.length < 1
						? "No team data yet"
						: ""}
			</div>
			{teamDataResult.success && (
				<TeamDataTable teamData={teamDataResult.value} />
			)}
		</div>
	);
}
