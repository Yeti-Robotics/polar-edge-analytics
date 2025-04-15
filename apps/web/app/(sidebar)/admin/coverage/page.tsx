import { isAdmin } from "@/lib/data/auth";
import { redirect } from "next/navigation";
import {
	getMatchesMissingCoverage,
	getTotalMatches,
} from "@/lib/data/admin/coverage";
import { Card, CardDescription } from "@repo/ui/components/card";
import { CardContent, CardHeader } from "@repo/ui/components/card";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import { cn } from "@repo/ui/lib/utils";
import { db } from "@/lib/database";

interface CoveragePageProps {
	searchParams: Promise<{ eventKey: string; minMatches?: number }>;
}

export default async function CoveragePage({
	searchParams,
}: CoveragePageProps) {
	const authorized = await isAdmin();
	if (!authorized) {
		redirect("/");
	}

	const { eventKey, minMatches = 1 } = await searchParams;

	const [coverage, totalMatches] = await Promise.all([
		getMatchesMissingCoverage(eventKey, minMatches),
		getTotalMatches(eventKey),
	]);

	const event = await db.query.tournament.findFirst({
		where: (tournament, { eq }) => eq(tournament.id, eventKey),
	});

	const percentCovered =
		totalMatches && totalMatches > 0
			? (coverage?.length ?? 0) / (6 * totalMatches)
			: null;

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-black">Team-Match Coverage</h1>
				<p className="text-sm text-muted-foreground">
					Matches missing coverage for {event?.eventName}
				</p>
			</div>

			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="rounded-2xl">
					<CardHeader className="pb-2">
						<CardDescription className="text-sm font-medium">
							Total missing
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-0 text-3xl font-black">
						{coverage?.length}
					</CardContent>
				</Card>
				<Card className="rounded-2xl">
					<CardHeader className="pb-2">
						<CardDescription className="text-sm font-medium">
							Total event coverage (%)
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-0 text-3xl font-black">
						{percentCovered
							? `${percentCovered.toFixed(2)}%`
							: "N/A"}
					</CardContent>
				</Card>
			</section>
			<hr />
			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-black">Team-Matches Missing</h2>
				<div className="h-96 overflow-y-auto border rounded-xl">
					<table className="w-full relative">
						<TableHeader>
							<TableRow>
								<TableHead className="sticky top-0 bg-background ">
									Match
								</TableHead>
								<TableHead className="sticky top-0 bg-background ">
									Alliance
								</TableHead>
								<TableHead className="sticky top-0 bg-background ">
									Position
								</TableHead>
								<TableHead className="sticky top-0 bg-background ">
									Team
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{coverage?.map((match) => (
								<TableRow
									className="even:bg-muted/40"
									key={`${match.matchId}-${match.teamNumber}`}
								>
									<TableCell>
										{match.matchId.split("_")[1]}
									</TableCell>
									<TableCell
										className={cn(
											"before:content-[''] before:inline-block before:size-[6px] before:rounded-full before:mr-2 before:align-middle",
											match.alliance === "red"
												? "before:bg-red-400"
												: "before:bg-blue-400"
										)}
									>
										{match.alliance
											.charAt(0)
											.toUpperCase() +
											match.alliance.slice(1)}
									</TableCell>
									<TableCell>
										{match.alliancePosition}
									</TableCell>
									<TableCell>{match.teamNumber}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</table>
				</div>
			</section>
		</div>
	);
}
