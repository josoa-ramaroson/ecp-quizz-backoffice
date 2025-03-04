"use client"
import { cn } from "@/lib"
import { HeaderLogo } from "./header-logo";
import { Navbar } from "./navbar";
import LogoutButton from "./logout-button";
import { usePathname } from "next/navigation";

type TSidebar = {
    isOpen: boolean
}
export default function Sidebar({
    isOpen,
}: TSidebar) {
  const pathname = usePathname();
  return (
    <aside
        className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-surface transition-all duration-300 ease-in-out md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
      )}
    >
        <HeaderLogo isSideparOpen={isOpen} />
        <Navbar isOpen={isOpen} pathname={pathname}/>
        <LogoutButton isOpen={isOpen} />
    </aside>
  )
}


