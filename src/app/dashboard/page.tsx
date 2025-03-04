"use client"
import { DashboardLayout, OverviewPage } from '@/components'
import { authHoc } from '@/lib'
import React from 'react'

function Page() {
  return (
    <DashboardLayout>
        <OverviewPage />
    </DashboardLayout>
  )
}
// export default authHoc(Page);
export default Page;