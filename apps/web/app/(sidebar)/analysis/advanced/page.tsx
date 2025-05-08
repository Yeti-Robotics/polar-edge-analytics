import { AdvancedDataTable } from "./AdvancedDataTable";

import { Skeleton } from "@repo/ui/components/skeleton";
import { Suspense } from "react";

export default async function AdvancedAnalysis({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | undefined>>;
}) {
	const searchParamsObject = await searchParams;
	const tournamentId = searchParamsObject.id;

	if (!tournamentId) {
		return <div>No tournament ID provided</div>;
	}

	return (
		<div className="flex flex-col justify-center gap-4">
			<h1 className="text-2xl font-black">Advanced Analysis</h1>
			<p className="text-muted-foreground max-w-prose text-sm">
				Advanced analysis is a work in progress. We currently support
				calculating average points added across each period of the game
				for each team.
			</p>
			<Suspense
				key={tournamentId}
				fallback={<Skeleton className="h-80 w-full lg:w-1/2" />}
			>
				<AdvancedDataTable id={tournamentId} />
			</Suspense>
		</div>
	);
}
