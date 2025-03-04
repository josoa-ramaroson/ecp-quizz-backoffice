import { Button } from '@/components/ui'
import { EButtonSize, EButtonVariant } from '@/enums'
import { IMember } from '@/interfaces'
import { Table } from '@tanstack/react-table'
import React from 'react'

interface INextPrevButtonProps {
    table: Table<IMember>
}
export default function NextPrevButton({ table }: INextPrevButtonProps) {
  return (
    <div className="flex items-center justify-end space-x-2">
        <div className="text-sm text-secondary-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button 
            variant={EButtonVariant.OUTLINE} 
            size={EButtonSize.SMALL} 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
            label='Previous'
        />

        <Button 
            variant={EButtonVariant.OUTLINE} 
            size={EButtonSize.SMALL} 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
            label='Next'
        />
      </div>
  )
}
