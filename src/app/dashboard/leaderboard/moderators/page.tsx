"use client"
import { ModeratorLeaderBoardPage } from '@/components/containers/leaderboard-page';
import React from 'react'
import dynamic from 'next/dynamic'
import authHoc from '@/lib/hoc/auth-hoc';

const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
function ModeratorLeaderboard() {
  return (
    <DashboardLayout>
      <ModeratorLeaderBoardPage />
    </DashboardLayout>
  )
}

export default authHoc(ModeratorLeaderboard);

