"use client";

import { getTeamsInMatch } from "../../actions/teamsInMatch";
import { TeamInMatch } from "../../actions/teamsInMatch";

import { CardContent } from "@repo/ui/components/card";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/select";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useEffect, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";


export function MatchDetail() {
	const form = useFormContext();
	const [teams, setTeams] = useState<TeamInMatch[]>([]);
	const [isPending, startTransition] = useTransition();

	const matchNumber = form.watch("match_detail.match_number");

	useEffect(() => {
		if (matchNumber) {
			handleMatchNumberChange(matchNumber);
		}
	}, [matchNumber]);

	const handleMatchNumberChange = (value: string) => {
		startTransition(async () => {
			const res = await getTeamsInMatch(value);
			if (res.success) {
				setTeams(res.value);
			}
		});
	};

	return (
		<CardContent className="space-y-4">
			<FormField
				control={form.control}
				name="match_detail.match_number"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Match Number</FormLabel>
						<FormControl>
							<Input
								placeholder="Number of match being played"
								{...field}
							/>
						</FormControl>
						<FormMessage className="text-xs" />
					</FormItem>
				)}
			/>
			{matchNumber && (
				<FormField
					control={form.control}
					name="match_detail.team_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Team Number</FormLabel>
							{isPending && <Skeleton className="w-full h-10" />}
							{!isPending && teams.length > 0 && (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a team number" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{teams.map((team) => (
											<SelectItem
												key={team.teamNumber}
												value={team.teamNumber.toString()}
											>
												{`${team.teamNumber} - ${team.teamName} (${team.alliance.charAt(0).toUpperCase() + team.alliance.slice(1)} ${team.alliancePosition})`}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>
			)}
		</CardContent>
	);
}
