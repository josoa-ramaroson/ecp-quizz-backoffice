"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import Header from './header';
import { useAccessToken, useQuestionStore, useQuizStore } from '@/store';
import { useRouter } from 'next/navigation';
import { ELocalStorageKey } from '@/enums';
import { LocalStorageService } from '@/lib/services';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { refreshQuizzes } = useQuizStore()
  const { refreshQuestions } = useQuestionStore()
  const { 
      setAccessToken,
      accessToken
  } = useAccessToken();
  
  useEffect(()=> {
      const storedToken = LocalStorageService.getItem<string | null>(ELocalStorageKey.ACCESS_TOKEN);
      setAccessToken(storedToken);
  },[]);

  useEffect(()=>{
      
      LocalStorageService.setItem<string | null>(ELocalStorageKey.ACCESS_TOKEN, accessToken);
      if(accessToken){
          refreshQuizzes();
          refreshQuestions();
      } else {
          router.push("/login");
      }
  }, [accessToken, router]);
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
  }, [isMobile]);
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
