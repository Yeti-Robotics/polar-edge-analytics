"use client";

import { flexRender, Table as TableType } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";

type DataTableProps<T> = {
	table: TableType<T>;
};

export function DataTable<T>({ table }: DataTableProps<T>) {
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id} className="border">
						{headerGroup.headers.map((header) => {
							return (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
									className="border text-center"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.map((row) => (
					<TableRow
						key={row.id}
						data-state={row.getIsSelected() && "selected"}
						className="border"
					>
						{row.getVisibleCells().map((cell) => (
							<TableCell
								key={cell.id}
								className="border text-center"
							>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
