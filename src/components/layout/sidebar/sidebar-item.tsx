"use client"
import { cn } from "@/lib"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

type TSidebarItemProps = {
    icon: React.ElementType
    label: string
    href: string
    isActive?: boolean
    isCollapsed?: boolean
    hasSubmenu?: boolean
    isSubmenuOpen?: boolean
    toggleSubmenu?: () => void
  }
  
export const SidebarItem = ({
    icon: Icon,
    label,
    href,
    isActive = false,
    isCollapsed = false,
    hasSubmenu = false,
    isSubmenuOpen = false,
    toggleSubmenu,
  }: TSidebarItemProps) => {
    return (
      <li>
        {hasSubmenu ? (
          <button
            onClick={toggleSubmenu}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary-600 text-white" : "text-secondary-700 hover:bg-secondary-100",
            )}
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{label}</span>
                {isSubmenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </>
            )}
          </button>
        ) : (
          <Link
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary-600 text-white" : "text-secondary-700 hover:bg-secondary-100",
            )}
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && <span className="text-left">{label}</span>}
          </Link>
        )}
      </li>
    )
  }