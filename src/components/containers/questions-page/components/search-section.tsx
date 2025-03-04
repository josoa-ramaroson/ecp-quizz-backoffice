import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'


export default function SearchSections({}) {
  return (
    <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-secondary-500" />
        <Input
            placeholder="Search questions..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
            className="max-w-sm"
            />
    </div>
  )
}
