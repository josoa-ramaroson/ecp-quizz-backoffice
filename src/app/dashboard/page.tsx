"use client"
import { DashboardLayout, OverviewPage } from '@/components'
import authHoc from '@/lib/hoc/auth-hoc'
import React from 'react'


function Page() {
  return (
    <DashboardLayout>
        <OverviewPage />
    </DashboardLayout>
  )
}
export default authHoc(Page);
// export default Page;