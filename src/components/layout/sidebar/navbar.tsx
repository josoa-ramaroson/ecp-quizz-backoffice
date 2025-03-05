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
          />
        
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