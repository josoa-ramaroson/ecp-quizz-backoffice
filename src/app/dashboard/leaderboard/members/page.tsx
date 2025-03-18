"use client"
import { DashboardLayout } from '@/components'
import { MemberLeaderboardPage } from '@/containers/leaderboard-page'
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'

function LeaderboardMembersPage() {
  return (
    <DashboardLayout> 
        <MemberLeaderboardPage />
    </DashboardLayout>
  )
}

export default authHoc(LeaderboardMembersPage);