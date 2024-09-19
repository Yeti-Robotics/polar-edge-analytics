"use client";

import { Database } from "@/lib/database/types";
import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";

export type TeamData = Database["public"]["Views"]["team_stats"]["Row"][];

function NumberDisplay({ value }: { value: number }) {
	return <>{value.toFixed(1)}</>;
}

function SortableHeader({
	label,
	column,
}: {
	label: string;
	column: Column<any, any>;
}) {
	return (
		<Button
			variant="ghost"
			onClick={() => {
				column.toggleSorting(column.getIsSorted() === "asc");
			}}
		>
			{label}
			{column.getIsSorted() === "asc" ? (
				<ChevronUp className="ml-2 size-4" />
			) : (
				<ChevronDown className="ml-2 size-4" />
			)}
		</Button>
	);
}

const columnHelper = createColumnHelper<TeamData>();
const columns: ColumnDef<TeamData>[] = [
	columnHelper.group({
		header: "Team",
		footer: (props) => props.column.id,
		enableHiding: false,
		columns: [
			columnHelper.accessor("team_number", {
				cell: (info) => info.getValue(),
				header: ({ column }) => (
					<SortableHeader label={"Team Number"} column={column} />
				),
				footer: (info) => info.column.id,
				filterFn: (row, columnId, filterValue) => {
					return String(row.getValue(columnId)).startsWith(
						filterValue
					);
				},
			}),
			columnHelper.accessor("team_name", {
				cell: (info) => info.getValue(),
				header: ({ column }) => (
					<SortableHeader label={"Team Name"} column={column} />
				),
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
				header: ({ column }) => (
					<SortableHeader label={"Auto Line"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_amp_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: ({ column }) => (
					<SortableHeader label={"Amp Notes"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_speaker_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: ({ column }) => (
					<SortableHeader label={"Speaker Notes"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("auto_shuttle_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: ({ column }) => (
					<SortableHeader label={"Shuttle Notes"} column={column} />
				),
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
				header: ({ column }) => (
					<SortableHeader label={"Amp Notes"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("teleop_speaker_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: ({ column }) => (
					<SortableHeader label={"Speaker Notes"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("teleop_shuttle_notes", {
				cell: (info) => <NumberDisplay value={info.getValue()} />,
				header: ({ column }) => (
					<SortableHeader label={"Shuttle Notes"} column={column} />
				),
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
				header: ({ column }) => (
					<SortableHeader label={"Climbed"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("park", {
				cell: (info) => (info.getValue() ? "Y" : "N"),
				header: ({ column }) => (
					<SortableHeader label={"Parked"} column={column} />
				),
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
				header: ({ column }) => (
					<SortableHeader label={"Defense Rating"} column={column} />
				),
				footer: (info) => info.column.id,
			}),
			// columnHelper.display({
			// 	id: "external",
			// 	header: "Notes",
			// 	footer: (props) => props.column.id,
			// 	cell: () => (
			// 		<Link
			// 			target="_blank"
			// 			href="/"
			// 			className="flex items-center justify-center"
			// 		>
			// 			<ExternalLink className="size-5 stroke-foreground" />
			// 		</Link>
			// 	),
			// }),
		],
	}),
];

export function TeamDataTable({ teamData }: { teamData: TeamData[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setVisibility] = useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	useEffect(() => {
		console.log(columnVisibility);
	}, [columnVisibility]);

	const table = useReactTable<TeamData>({
		data: teamData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setVisibility,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnVisibility,
			columnFilters,
		},
	});

	return (
		<div className="flex max-w-xs flex-col space-y-4 md:max-w-fit">
			<div className="flex justify-between">
				<div>
					<Input
						placeholder="Find team number..."
						value={
							(table
								.getColumn("team_number")
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn("team_number")
								?.setFilterValue(event.target.value)
						}
					/>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown className="ml-2 size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<DataTable table={table} />
		</div>
	);
}
