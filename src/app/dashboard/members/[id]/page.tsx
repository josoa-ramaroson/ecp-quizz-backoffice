"use client"
import { MemberProfilePage } from '@/components';
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
function MemberIdPageRoute() {
  return (
    <DashboardLayout>
        <MemberProfilePage />
    </DashboardLayout>
  )
}

export default  authHoc(MemberIdPageRoute);