"use client"

import { 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell,
    Table,
} from '@/components/ui/table'
import { IMember } from '@/interfaces'
import { ColumnDef, flexRender, type Table as TTable } from '@tanstack/react-table'
import React from 'react'

interface IMemberTableProps {
    table:  TTable<IMember>,
    memberColumn: ColumnDef<IMember>[]
}
export default function MembersTable({ table, memberColumn }: IMemberTableProps) {

  
  return (
    <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan={memberColumn.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
  )
}
