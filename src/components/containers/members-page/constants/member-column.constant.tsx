import { Badge, Button } from "@/components/ui";
import { 
  EButtonSize, 
  EButtonVariant, 
  EMemberRole,
 } from "@/enums";
import { IMember } from "@/interfaces";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const memberColumn: ColumnDef<IMember>[] = [
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
                <DropdownMenuItem className="px-4 py-2 cursor-pointer hover:bg-primary-200 active:bg-primary-600" >View Profile</DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 cursor-pointer hover:bg-primary-200 active:bg-primary-600" >Edit Member</DropdownMenuItem>
                <DropdownMenuItem className="text-error-500 px-4 py-2 cursor-pointer hover:bg-error-100">Delete Member</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]