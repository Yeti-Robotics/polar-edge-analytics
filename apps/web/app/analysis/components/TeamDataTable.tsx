"use client";

import { DataTable } from "./DataTable";
import { TeamData } from "../actions";

import { Button } from "@repo/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";
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
import { useState } from "react";


function NumberDisplay({ value }: { value: number }) {
    return <>{value.toFixed(1)}</>;
}

function PercentDisplay({ value }: { value: number }) {
    return <>{(value * 100).toFixed(0)}%</>
}

function SortableHeader({
    label,
    column,
}: {
    label: string;
    column: Column<TeamData, string | number>;
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
    const columns = Array(4).fill(null).map((_, i) => ++i).map(i => {
        return (
            columnHelper.accessor(
                `${gamePeriod}CoralLevel${i}` as keyof TeamData, {
                cell: (info) => <NumberDisplay value={info.getValue() as number} />,
                header: ({ column }) => (
                    <SortableHeader label={`L${i}`} column={column} />
                ),
                footer: (info) => info.column.id,
            })
        )
    });

    return columnHelper.group({
        header: "Coral",
        footer: (props) => props.column.id,
        columns
    });
}

const generateAlgaeColumns = (gamePeriod: "auto" | "teleop", ...actions: string[]) => {
    const algaeActions = ["Net", "Processor"] // must capitalize

    if (actions?.length > 0) {
        algaeActions.push(...actions);
    }

    const columns = algaeActions.map(a => columnHelper.accessor(
        `${gamePeriod}Algae${a}` as keyof TeamData, {
        cell: (info) => <NumberDisplay value={info.getValue() as number} />,
        header: ({ column }) => (
            <SortableHeader label={a} column={column} />
        ),
        footer: (info) => info.column.id,
    }));

    return columnHelper.group({
        header: "Algae",
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
            columnHelper.accessor("teamNumber", {
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
            columnHelper.accessor("teamName", {
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
            columnHelper.accessor("initiationLine", {
                cell: (info) => (<PercentDisplay value={info.getValue()} />),
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
            generateAlgaeColumns("teleop", "Thrown"),
        ],
    }),
    columnHelper.group({
        header: "Cage",
        footer: (props) => props.column.id,
        columns: [
            columnHelper.accessor("shallowPercentage", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
                header: ({ column }) => (
                    <SortableHeader label={"Shallow"} column={column} />
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("deepPercentage", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
                header: ({ column }) => (
                    <SortableHeader label={"Deep"} column={column} />
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("parkPercentage", {
                cell: (info) => <PercentDisplay value={info.getValue()} />,
                header: ({ column }) => (
                    <SortableHeader label={"Park"} column={column} />
                ),
                footer: (info) => info.column.id,
            }),
        ],
    }),
    columnHelper.group({
        header: "Misc",
        footer: (props) => props.column.id,
        columns: [
            columnHelper.accessor("defenseRating", {
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
                                .getColumn("teamNumber")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("teamNumber")
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
