import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { questionColumns } from '../constants'
import { IQuestion } from '@/interfaces'
import SearchInput from '@/components/ui/search-input'
import FilterButton from './filter-button'
import QuestionsTable from './questions-table'
import PaginationButton from './pagination-buttons'

interface IQuestionsTableProps {
    questions: IQuestion[]
}
export default function QuestionsTableSection({
    questions
}: IQuestionsTableProps) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [typeFilter, setTypeFilter] = useState<string>("all")

    const filteredQuestions = useMemo(() => {
        return typeFilter === "all" ? questions : questions.filter((q) => q.type === typeFilter);
      }, [typeFilter, questions]);
      
    const table = useReactTable({
        data: filteredQuestions,
        columns: questionColumns,
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
    });
    
    return (
    <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}

            />
            <FilterButton
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />
        </div>
        <QuestionsTable table={table} />
        <PaginationButton table={table} />
    </div>
    )
}
