"use client"
import { DashboardLayout } from '@/components';
import { MemberProfilePage } from '@/containers';
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'

function MemberIdPageRoute() {
  return (
    <DashboardLayout>
        <MemberProfilePage />
    </DashboardLayout>
  )
}

export default  authHoc(MemberIdPageRoute);