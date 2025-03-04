import { Button } from '@/components/ui/button'
import { IQuestion } from '@/interfaces'
import { Table } from '@tanstack/react-table'
import React from 'react'

export default function PaginationButton({ table }: {table: Table<IQuestion>}) {
  return (
    <div className="flex items-center justify-end space-x-2">
        <div className="text-sm text-secondary-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
    </div>
  )
}
