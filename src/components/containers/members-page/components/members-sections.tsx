import { IMember } from '@/interfaces'
import { SortingState, ColumnFiltersState, VisibilityState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import React, { useState } from 'react'
import { memberColumn } from '../constants'
import MembersTable from './members-tables'
import NextPrevButton from './next-prev-button'
import SearchInput from '@/components/ui/search-input'

interface TMembersSectionProps {
    members: IMember[],
}

export default function MembersSection({ members }: TMembersSectionProps) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    
    const table = useReactTable({
        data: members,
        columns: memberColumn,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
      })
    return (
        <div className="space-y-4">
            <SearchInput 
                value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
                placeholder="Filter by name or email..."
            />
            <MembersTable table={table} />
            <NextPrevButton table={table} />
        </div>
    )
}
