import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { IQuestion } from '@/interfaces'
import SearchInput from '@/components/ui/search-input'
import FilterButton from './filter-button'
import QuestionsTable from './questions-table'
import PaginationButton from './pagination-buttons'
import { EQuestionType } from '@/enums'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, MoreHorizontal } from 'lucide-react'
import { cn, truncateText } from '@/lib'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 

} from '@/components/ui/dropdown-menu'
import EditQuestionDialog from './edit-questions-dialog'
import { TQuestionFormSchema } from '../constants'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import ConfirmDeleteQuestionDialog from './confirm-delete-question-dialog'

interface IQuestionsTableProps {
    questions: IQuestion[],
    handleEditQuestions: (id: string, values: TQuestionFormSchema) => Promise<void>,
    handleDeleteQuestions: (id: string) => Promise<void>,
}
export default function QuestionsTableSection({
    questions,
    handleEditQuestions,
    handleDeleteQuestions
}: IQuestionsTableProps) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [typeFilter, setTypeFilter] = useState<string>("all")


    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const filteredQuestions = useMemo(() => {
        return typeFilter === "all" ? questions : questions.filter((q) => q.type === typeFilter);
      }, [typeFilter, questions]);
      
    const questionColumns: ColumnDef<IQuestion>[] = [
        {
          accessorKey: "title",
          header: "Title",
          cell: ({ row }) => (
            <div>
              <div className="font-medium">{truncateText(row.original.title, 30)}</div>
              <div className="text-sm text-secondary-500">{truncateText(row.original.description, 40)}</div>
            </div>
          ),
        },
        {
          accessorKey: "type",
          header: "Type",
          cell: ({ row }) => {
            const type = row.getValue("type") as EQuestionType
      
            const badgeVariant =
              type === EQuestionType.MULTIPLE_CHOICE
                ? "default"
                : type === EQuestionType.SINGLE_CHOICE
                  ? "secondary"
                  : type === EQuestionType.TRUE_FALSE
                    ? "destructive"
                    : "outline"
      
            return <Badge variant={badgeVariant}>{type.replace("_", " ")}</Badge>
          },
        },
        {
          accessorKey: "score",
          header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const score = Number.parseFloat(row.getValue("score"))
            return <div className="font-medium">{score} points</div>
          },
        },
        {
          accessorKey: "creationDate",
          header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Created
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const date = new Date(row.getValue("creationDate"))
            return <div>{date.toLocaleDateString()}</div>
          },
        },
        {
          id: "actions",
          cell: ({ row }) => {
            const question = row.original
      
            return (
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        className={cn(BUTTON_VARIANT_CLASSNAME.outline.enabled, "cursor-pointer")}
                        onClick={() => {setSelectedQuestion(question); setIsEditDialogOpen(true)}}
                    >
                            Edit Question
                    </DropdownMenuItem>
                    <DropdownMenuItem className={cn(BUTTON_VARIANT_CLASSNAME.outline.enabled, "cursor-pointer")}>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {setSelectedQuestion(question); setIsDeleteDialogOpen(true);}}
                      className={"text-error-600 hover:text-error-700 focus:text-error-500 cursor-pointer"}>Delete Question</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          },
        },
      ]
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
        <QuestionsTable table={table} questionColumns={questionColumns} />
        <PaginationButton table={table} />
        {
            (selectedQuestion && isEditDialogOpen) && (
                <EditQuestionDialog 
                    isOpen={isEditDialogOpen}
                    setIsOpen={setIsEditDialogOpen}
                    submitHandler={handleEditQuestions}
                    question={selectedQuestion}
                />
            )
        }
        {
            (selectedQuestion && isDeleteDialogOpen) && (
                <ConfirmDeleteQuestionDialog 
                    isOpen={isDeleteDialogOpen}
                    setIsOpen={setIsDeleteDialogOpen}
                    title={selectedQuestion.title}
                    type={selectedQuestion.type}
                    score={selectedQuestion.score}
                    onConfirm={() => handleDeleteQuestions(selectedQuestion._id)}
                  
                />
            )
        }
    </div>
    )
}
