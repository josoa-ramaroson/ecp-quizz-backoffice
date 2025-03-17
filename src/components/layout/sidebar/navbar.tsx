"use client"

import { 
  Home, 
  Users, 
  FileQuestion, 
  ClipboardList, 
  Settings,
  BarChart,
  User,
  ShieldUser,
 } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useState } from "react";

export 
const Navbar = ({ isOpen, pathname }: { isOpen: boolean, pathname: string }) => {

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);  
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
            icon={BarChart}
            label="Leaderboard"
            href="/dashboard/leaderboard"
            isCollapsed={!isOpen}
            hasSubmenu={true}
            isSubmenuOpen={isLeaderboardOpen}
            toggleSubmenu={() => setIsLeaderboardOpen((prev) => !prev)}
          />
              {
                  (pathname.startsWith("/dashboard/leaderboard") || isLeaderboardOpen) && (
                  <div className="space-y-1 pl-3">
                    <SidebarItem
                      icon={User}
                      label="Members"
                      href="/dashboard/leaderboard/members"
                      isActive={pathname.startsWith("/dashboard/leaderboard/member")}
                      isCollapsed={!isOpen}
                    />
                    <SidebarItem
                      icon={ShieldUser}
                      label="Moderators"
                      href="/dashboard/leaderboard/moderators"
                      isActive={pathname.startsWith("/dashboard/leaderboard/moderator")}
                      isCollapsed={!isOpen}
                    />
                  </div>

                )
              }
          
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