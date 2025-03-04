"use client"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export const HeaderLogo = ({ isSideparOpen }: { isSideparOpen: boolean }) => {
    return (
        <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary-600" />
          {isSideparOpen && <span className="text-lg font-bold">English Club</span>}
        </Link>
      </div>
    )
  }
