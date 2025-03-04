import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EQuestionType } from "@/enums"
import { IQuestion } from "@/interfaces"
import { truncateText } from "@/lib"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"

export const questionColumns: ColumnDef<IQuestion>[] = [
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
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(question._id)}>Copy ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Preview</DropdownMenuItem>
                <DropdownMenuItem>Edit Question</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-error-500">Delete Question</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]