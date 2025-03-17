"use client"
import { DashboardLayout } from '@/components';
import { ModeratorLeaderBoardPage } from '@/components/containers/leaderboard-page';
import authHoc from '@/lib/hoc/auth-hoc';
import React from 'react'

function ModeratorLeaderboard() {
  return (
    <DashboardLayout>
      <ModeratorLeaderBoardPage />
    </DashboardLayout>
  )
}

export default authHoc(ModeratorLeaderboard);

