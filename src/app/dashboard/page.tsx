"use client"

import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import OverviewPage from '@/containers/overview-page'
 

function DashboardPageRoute() {
  return (
    <DashboardLayout>
        <OverviewPage />
    </DashboardLayout>
  )
}
export default authHoc(DashboardPageRoute);