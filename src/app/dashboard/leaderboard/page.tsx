"use client"

import { DashboardLayout } from '@/components'
import LeaderboardPage from '@/components/containers/leaderboard-page';
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'

function page() {
  return (
    <DashboardLayout> 
        <LeaderboardPage />
    </DashboardLayout>
  )
}

export default authHoc(page);