"use client"

import { DashboardLayout } from '@/components'
import { MemberLeaderboardPage } from '@/components/containers/leaderboard-page'
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'

function page() {
  return (
    <DashboardLayout> 
        <MemberLeaderboardPage />
    </DashboardLayout>
  )
}

export default authHoc(page);