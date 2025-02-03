import { scoutedTeamData } from "./actions";
import { TeamDataTable } from "./components/TeamDataTable";


export default async function TeamData() {
    const teamDataResult = await scoutedTeamData();

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold leading-none tracking-tight pl-5 md:pl-0">
                Team Data
            </h1>
            <div className="mx-1 my-4">
                {!teamDataResult.success
                    ? "Error fetching team data"
                    : teamDataResult.value.length < 1
                        ? "No team data yet"
                        : ""}
            </div>
            <div>
                {teamDataResult.success && (
                    <TeamDataTable teamData={teamDataResult.value} />
                )}
            </div>
        </div>
    )
}



