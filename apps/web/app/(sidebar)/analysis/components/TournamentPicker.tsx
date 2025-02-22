"use client";

import { TournamentData } from "../actions/tournament-data";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOURNAMENT_ID_QUERY_PARAM = "id";

export function TournamentPicker({ tournaments }: { tournaments: TournamentData }) {
    const currentTournament = tournaments.find(t => t.isCurrent);
    const [tournamentId, setTournamentId] = useState(currentTournament?.id ?? "");
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryString = (value: string) => `?${TOURNAMENT_ID_QUERY_PARAM}=${value}`

    useEffect(() => {
        const currentSearchParam = searchParams.get(TOURNAMENT_ID_QUERY_PARAM);

        if (currentSearchParam != tournamentId) {
            router.push(tournamentId?.length ? queryString(tournamentId) : "#");
        }
    }, [tournamentId, searchParams]);

    return (
        <Select onValueChange={setTournamentId} value={tournamentId}>
            <SelectTrigger className="min-w-fit">
                <SelectValue placeholder="Select a tournament" />
            </SelectTrigger>
            <SelectContent>
                {tournaments.map(t => (
                    <SelectItem key={t.id} value={t.id}>
                        {t.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}