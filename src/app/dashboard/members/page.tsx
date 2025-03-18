"use client"
import { DashboardLayout } from '@/components';
import { MembersPage } from '@/containers';
import authHoc from '@/lib/hoc/auth-hoc';
import React from 'react'

function MemberPageRoute() {
  return (
    <DashboardLayout>
      <MembersPage />
    </DashboardLayout>
  )
}

export default authHoc(MemberPageRoute);
