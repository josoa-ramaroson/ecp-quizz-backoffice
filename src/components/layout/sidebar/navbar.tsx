"use client"

import { 
  Home, 
  Users, 
  FileQuestion, 
  ClipboardList, 
  BarChart3, 
  Settings,
 } from "lucide-react";
import { useState } from "react";
import { SidebarItem } from "./sidebar-item";
import Link from "next/link";

export 
const Navbar = ({ isOpen, pathname }: { isOpen: boolean, pathname: string }) => {

    const [isQuizSubmenuOpen, setIsQuizSubmenuOpen] = useState(false)

    return (
        <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            isActive={pathname === "/dashboard"}
            isCollapsed={!isOpen}
          />
          <SidebarItem
            icon={Users}
            label="Members"
            href="/dashboard/members"
            isActive={pathname.startsWith("/dashboard/members")}
            isCollapsed={!isOpen}
          />
          <SidebarItem
            icon={FileQuestion}
            label="Questions"
            href="/dashboard/questions"
            isActive={pathname.startsWith("/dashboard/questions")}
            isCollapsed={!isOpen}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Quiz Management"
            href="/dashboard/quizzes"
            isActive={pathname.startsWith("/dashboard/quizzes")}
            isCollapsed={!isOpen}
            hasSubmenu={true}
            isSubmenuOpen={isQuizSubmenuOpen}
            toggleSubmenu={() => setIsQuizSubmenuOpen(!isQuizSubmenuOpen)}
          />
          {isOpen && isQuizSubmenuOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link
                  href="/dashboard/quizzes/create"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100"
                >
                  <span>Create Quiz</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/quizzes/active"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100"
                >
                  <span>Active Quizzes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/quizzes/completed"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100"
                >
                  <span>Completed Quizzes</span>
                </Link>
              </li>
            </ul>
          )}
          <SidebarItem
            icon={BarChart3}
            label="Reports & Analytics"
            href="/dashboard/reports"
            isActive={pathname.startsWith("/dashboard/reports")}
            isCollapsed={!isOpen}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/dashboard/settings"
            isActive={pathname.startsWith("/dashboard/settings")}
            isCollapsed={!isOpen}
          />
        </ul>
      </nav>
    )
}