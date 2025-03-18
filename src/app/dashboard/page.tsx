"use client"
import { OverviewPage } from '@/components';
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)


function DashboardPageRoute() {
  return (
    <DashboardLayout>
        <OverviewPage />
    </DashboardLayout>
  )
}
export default authHoc(DashboardPageRoute);