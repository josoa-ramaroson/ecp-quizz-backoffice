"use client"
import authHoc from '@/lib/hoc/auth-hoc';
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
const QuizzesPage = dynamic(
  () => import('@/components/containers/quizzes-page'),
  { ssr: false }
)
 

function QuizzesPageRoute() {
  return (
    <DashboardLayout>
      <QuizzesPage />
    </DashboardLayout>
  )
}

export default authHoc(QuizzesPageRoute);
