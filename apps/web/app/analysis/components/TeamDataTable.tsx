"use client";

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
import { DataTable } from "./DataTable";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";
import { toUpperCase } from "@/lib/utils";

export type TeamData = any;

function NumberDisplay({ value }: { value: number }) {
    return <>{value.toFixed(1)}</>;
}

function PercentDisplay({ value }: { value: number }) {
    return <>{(value * 100).toFixed(0)}</>
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

const generateCoralColumns = (gamePeriod: "auto" | "teleop") => {
    const columns = Array(4).map((_, i) => i + 1).map(i => columnHelper.accessor(`${gamePeriod}_coral_level_${i}`, {
        cell: (info) => <NumberDisplay value={info.getValue()} />,
        header: ({ column }) => (
            <SortableHeader label={`L${i}`} column={column} />
        ),
        footer: (info) => info.column.id,
    }));

    return columnHelper.group({
        header: "Coral",
        footer: (props) => props.column.id,
        columns
    });
}

const generateAlgaeColumns = (gamePeriod: "auto" | "teleop", ...actions: string[]) => {
    const algaeActions = ["net", "processor"]

    if (actions?.length > 0) {
        algaeActions.push(...actions);
    }

    const columns = algaeActions.map(a => columnHelper.accessor(
        `${gamePeriod}_algae_${a}`, {
        cell: (info) => <NumberDisplay value={info.getValue()} />,
        header: ({ column }) => (
            <SortableHeader label={toUpperCase(a)} column={column} />
        ),
        footer: (info) => info.column.id,
    }));

    return columnHelper.group({
        header: "Coral",
        footer: (props) => props.column.id,
        columns
    });
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
            generateCoralColumns("auto"),
            generateAlgaeColumns("auto"),
        ],
    }),
    columnHelper.group({
        header: "Teleop",
        footer: (props) => props.column.id,
        columns: [
            generateCoralColumns("teleop"),
            generateAlgaeColumns("teleop", "thrown")
        ],
    }),
    columnHelper.group({
        header: "Climb",
        footer: (props) => props.column.id,
        columns: [
            columnHelper.accessor("shallow", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
                header: ({ column }) => (
                    <SortableHeader label={"Climbed"} column={column} />
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("deep", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
                header: ({ column }) => (
                    <SortableHeader label={"Parked"} column={column} />
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("park", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
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
                    <SortableHeader label={"Defense"} column={column} />
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
        <div className="flex flex-col space-y-4">
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
                                            onClick={() => {
                                                column
                                                    .getLeafColumns()
                                                    .map((c) =>
                                                        c.toggleVisibility()
                                                    );
                                            }}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="w-[calc(100vw-96px)]">
                <DataTable table={table} />
            </div>
        </div>
    );
}
