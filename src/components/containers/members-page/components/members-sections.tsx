import { IMember } from '@/interfaces'
import { 
    SortingState, 
    ColumnFiltersState, 
    VisibilityState, 
    useReactTable, 
    getCoreRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    getFilteredRowModel, 
    ColumnDef 

} from '@tanstack/react-table'
import React, { useState } from 'react'

import MembersTable from './members-tables'
import NextPrevButton from './next-prev-button'
import SearchInput from '@/components/ui/search-input'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { EButtonSize, EButtonVariant, EMemberRole } from '@/enums'
import Button from '@/components/ui/custom-button'
import { Badge } from '@/components/ui/badge'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import ConfirmDeleteDialog from './confirm-delete-dialog'
import EditMemberDialog from './edit-member-dialog'
import { IAddMemberFormSchema, IModifyMemberFormSchema } from '../constants'
import Link from 'next/link'

interface TMembersSectionProps {
    members: IMember[],
    handleDelete: (id: string) => Promise<void>
    handleModify: (id: string, values: IModifyMemberFormSchema) => Promise<void>
}

export default function MembersSection({ 
  members, 
  handleDelete,
  handleModify,
}: TMembersSectionProps) {
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    
    const [selectedMember, setSelectedMember] = useState<IMember>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);


    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10, // Show 10 items per page
    })

    const showDeletePopup = (member: IMember) =>{
      setSelectedMember(member);
      setIsDeleteDialogOpen(true);
    }

    const showEditDalog = (member: IMember) =>{
      setSelectedMember(member);
      setIsModifyDialogOpen(true);
    }
    
    const memberColumn: ColumnDef<IMember>[] = [
        {
            accessorKey: "firstName",
            header: ({ column }) => {
              return (<Button
                        variant={EButtonVariant.GHOST}
                        size={EButtonSize.SMALL}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        label="Name"
                        icon={<ArrowUpDown className="ml-2 h-4 w-4" />}
                        />
              )
            },
            cell: ({ row }) => (
              <div>
                <div className="font-medium">{row.original.firstName}</div>
                <div className="text-sm text-secondary-500">{row.original.facebookName}</div>
              </div>
            ),
          },
          {
            accessorKey: "email",
            header: ({ column }) => {
              return (
                <Button
                  variant={EButtonVariant.GHOST}
                  size={EButtonSize.SMALL}
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  label="Email"
                  icon={<ArrowUpDown className="ml-2 h-4 w-4" />}
                  />
              )
            },
          },
          {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
              const role = row.getValue("role") as EMemberRole
        
              const badgeVariant =
                role === EMemberRole.ADMIN ? "default" : role === EMemberRole.MODERATOR ? "secondary" : "outline"
        
              return <Badge variant={badgeVariant}>{role}</Badge>
            },
          },
          {
            accessorKey: "totalScore",
            header: ({ column }) => {
              return (
                <Button
                  variant={EButtonVariant.GHOST}
                  size={EButtonSize.SMALL}
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="justify-end"
                >
                  Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
            },
            cell: ({ row }) => {
              const score = Number.parseFloat(row.getValue("totalScore"))
              return <div className="text-left font-medium">{score}</div>
            },
          },
          {
            id: "actions",
            cell: ({ row }) => {
              const member = row.original
        
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border shadow-md  rounded-md ">
                    <DropdownMenuLabel className="text-md font-bold px-4 py-2 ">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="h-2" />
                    <DropdownMenuItem className="px-4 py-2 cursor-pointer hover:bg-primary-200 active:bg-primary-600" ><Link href={`/dashboard/members/${member._id}`}>View Profile</Link> </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => showEditDalog(member)}
                      className="px-4 py-2 cursor-pointer hover:bg-primary-200 active:bg-primary-600" 
                    >Edit Member</DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => showDeletePopup(member)}
                        className="text-error-500 px-4 py-2 cursor-pointer hover:bg-error-100"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
    ]
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
        onPaginationChange: setPagination,
        initialState: {
          pagination: {
            pageSize: 10,
          },
        },
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
          pagination, // Add this line
        },
      })
    return (
        <div className="space-y-4">
          <div className='flex items-center justify-between'>
            <SearchInput 
                value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
                placeholder="Filter by name or email..."
            />
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="border rounded px-4 py-2"
            >
              {[5, 10, 20, 30, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} className='cursor-pointer'>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
            <MembersTable table={table} memberColumn={memberColumn} />
            <NextPrevButton table={table} />
            {(isDeleteDialogOpen && selectedMember) && (
              <ConfirmDeleteDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                firstName={selectedMember.firstName}
                facebookName={selectedMember.facebookName}
                onConfirm={() => {
                  handleDelete(selectedMember._id);
                  setSelectedMember(undefined);
                }}
              />
            )}
            {
              (isModifyDialogOpen && selectedMember) && (
                  <EditMemberDialog
                    member={selectedMember}
                    isOpen={isModifyDialogOpen}
                    setIsOpen={setIsModifyDialogOpen}
                    submitHandler={handleModify}
                  />
              )
            }

        </div>
    )
}
