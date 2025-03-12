"use client"
import { DashboardLayout, MembersPage } from '@/components'
import authHoc from '@/lib/hoc/auth-hoc';
import React from 'react'

function Page() {
  return (
    <DashboardLayout>
      <MembersPage />
    </DashboardLayout>
  )
}

export default authHoc(Page);
