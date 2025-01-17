import { auth } from "@/lib/auth";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
 } from "@tanstack/react-table"
 import DataTable from "./DataTable";

export default async function dataTablePage() {
    const session = await auth();

    if (!session?.user?.id) {
        return <div>"You must be logged in to view this page"</div>
    }

    return <div>dataTable page hello world </div>

}



