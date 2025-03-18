"use client"
import { MembersPage } from '@/components';
import authHoc from '@/lib/hoc/auth-hoc';
import React from 'react'
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
function MemberPageRoute() {
  return (
    <DashboardLayout>
      <MembersPage />
    </DashboardLayout>
  )
}

export default authHoc(MemberPageRoute);
