"use client"
import { DashboardLayout, QuizzesPage } from '@/components'
import authHoc from '@/lib/hoc/auth-hoc';


function Page() {
  return (
    <DashboardLayout>
      <QuizzesPage />
    </DashboardLayout>
  )
}

export default authHoc(Page);
