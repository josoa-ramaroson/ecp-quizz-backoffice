"use client"
import React from 'react'
import LeftSection from './left-section'

interface HeaderProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: () => void
}
  
export default function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-surface px-4 shadow-sm">
        <LeftSection isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </header>
  )
}
