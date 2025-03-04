"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import Header from './header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])
  return (
    <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex flex-1 flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={() => setIsSidebarOpen((curr) => !curr)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
