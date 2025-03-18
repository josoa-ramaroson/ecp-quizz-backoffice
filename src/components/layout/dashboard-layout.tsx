"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useAccessToken, useQuestionStore, useQuizStore } from '@/store';
import { useRouter } from 'next/navigation';
import { ELocalStorageKey } from '@/enums';
import { LocalStorageService } from '@/lib/services';
import Header from "./header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { refreshQuizzes } = useQuizStore()
  const { refreshQuestions } = useQuestionStore()
  const { 
      setAccessToken,
      accessToken
  } = useAccessToken();
  
  // Only run once component is mounted (client-side)
  useEffect(() => {
    setMounted(true);
    
    const storedToken = LocalStorageService.getItem<string | null>(ELocalStorageKey.ACCESS_TOKEN);
    setAccessToken(storedToken);
  }, [setAccessToken]);

  // Handle authentication and data fetching
  useEffect(() => {
    if (!mounted) return;
    if (window != undefined){
      LocalStorageService.setItem<string | null>(ELocalStorageKey.ACCESS_TOKEN, accessToken);
      if (accessToken) {
        refreshQuizzes();
        refreshQuestions();
      } else {
        router.push("/login");
      }
    }
  }, [accessToken, router, mounted]);

  // Handle responsive layout
  useEffect(() => {
    if (!mounted) return;
    
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
  }, [mounted]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile]);



  // During SSR, render a simplified layout
  if (!mounted) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Simple loading state or nothing */}
          </div>
        </div>
      </div>
    )
  }

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