import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import React, { ChangeEvent } from 'react'

interface ISearchInputProps {
    value: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export default function SearchInput({
    value,
    onChange,
    placeholder,
}: ISearchInputProps) {
  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-secondary-500" />
          <Input
            id="search"
            type="text"
            placeHolder={placeholder}
            value={value}
            handleChange={onChange}
            className="max-w-sm"
            required={false}
          />
        </div>
     </div>
  )
}
