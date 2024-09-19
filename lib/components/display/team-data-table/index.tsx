"use client";

import { Database } from "@/lib/database/types";
import {
	ColumnDef,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { DataTable } from "../data-table";
import Link from "next/link";

export type TeamData = Database["public"]["Views"]["team_stats"]["Row"][];

type TeamDataTableProps = {
	teamData: TeamData[];
};

function NumberDisplay({ value }: { value: number }) {
	return <>{value.toFixed(1)}</>;
}

const columnHelper = createColumnHelper<TeamData>();
const columns: ColumnDef<TeamData>[] = [
	columnHelper.group({
		header: "Team",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor("team_number", {
				cell: (info) => info.getValue(),
				header: "Team Number",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("team_name", {
				cell: (info) => info.getValue(),
				header: "Team Name",
				footer: (info) => info.column.id,
			}),
		],
	}),
	columnHelper.group({
		header: "Auto",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor("initiation_line", {
				cell: (info) => (info.getValue() ? "Y" : "N"),
				header: "Auto Line",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_amp_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Amp Notes",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_speaker_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Speaker Notes",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_shuttle_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Shuttle Notes",
				footer: (info) => info.column.id,
			}),
		],
	}),
	columnHelper.group({
		header: "Teleop",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor("teleop_amp_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Amp Notes",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("teleop_speaker_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Speaker Notes",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("teleop_shuttle_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Shuttle Notes",
				footer: (info) => info.column.id,
			}),
		],
	}),
	columnHelper.group({
		header: "Endgame",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor("climb", {
				cell: (info) => (info.getValue() ? "Y" : "N"),
				header: "Climbed",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("park", {
				cell: (info) => (info.getValue() ? "Y" : "N"),
				header: "Parked",
				footer: (info) => info.column.id,
			}),
		],
	}),
	columnHelper.group({
		header: "Misc",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor("defense", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: "Defense Rating",
				footer: (info) => info.column.id,
			}),
			columnHelper.display({
				id: "external",
				header: "Notes",
				footer: (props) => props.column.id,
				cell: () => (
					<Link
						target="_blank"
						href="/"
						className="flex items-center justify-center"
					>
						<ExternalLink className="size-5 stroke-foreground" />
					</Link>
				),
			}),
		],
	}),
];

export function TeamDataTable({ teamData }: TeamDataTableProps) {
	const table = useReactTable<TeamData>({
		data: teamData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return <DataTable table={table} />;
}
