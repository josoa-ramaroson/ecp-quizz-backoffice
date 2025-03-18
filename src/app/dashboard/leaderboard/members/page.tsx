"use client"
import { MemberLeaderboardPage } from '@/components/containers/leaderboard-page'
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
function LeaderboardMembersPage() {
  return (
    <DashboardLayout> 
        <MemberLeaderboardPage />
    </DashboardLayout>
  )
}

export default authHoc(LeaderboardMembersPage);