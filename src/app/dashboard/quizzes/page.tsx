"use client"
import { DashboardLayout, QuizzesPage } from '@/components'
import { authHoc } from '@/lib'

function Page() {
  return (
    <DashboardLayout>
      <QuizzesPage />
    </DashboardLayout>
  )
}


export default Page;