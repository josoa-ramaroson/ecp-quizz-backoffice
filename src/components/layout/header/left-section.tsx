import { Button } from '@/components'
import { EButtonSize, EButtonVariant } from '@/enums'
import { cn } from '@/lib/utils'
import { Menu, Search, X } from 'lucide-react'
import React from 'react'

interface ILeftSectionProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: () => void
}
export default function LeftSection({ isSidebarOpen, setIsSidebarOpen }: ILeftSectionProps) {
  return (
    <div className={cn("flex z-40 items-center gap-2 ",{"absolute translate-x-60": isSidebarOpen})}>
        <Button 
            size={EButtonSize.MEDIUM}
            variant={EButtonVariant.GHOST}
            onClick={() => setIsSidebarOpen()} 
            className="md:hidden"
            >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        {/* <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-secondary-200 bg-white pl-8 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div> */}
      </div>
  )
}
