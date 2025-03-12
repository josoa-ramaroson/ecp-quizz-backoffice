"use client"
import { DashboardLayout, MemberProfilePage } from '@/components';
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'

function page() {
  return (
    <DashboardLayout>
        <MemberProfilePage />
    </DashboardLayout>
  )
}

export default  authHoc(page);