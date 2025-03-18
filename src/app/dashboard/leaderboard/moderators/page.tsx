"use client"
import React from 'react'
import authHoc from '@/lib/hoc/auth-hoc';
import { DashboardLayout } from '@/components';
import ModeratorLeaderBoardPage from '@/containers/leaderboard-page/moderator-leaderboard.page';

function ModeratorLeaderboard() {
  return (
    <DashboardLayout>
      <ModeratorLeaderBoardPage />
    </DashboardLayout>
  )
}

export default authHoc(ModeratorLeaderboard);

