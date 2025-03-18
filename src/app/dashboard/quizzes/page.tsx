"use client"
import DashboardLayout from '@/components/layout/dashboard-layout';
import { QuizzesPage } from '@/containers';
import authHoc from '@/lib/hoc/auth-hoc';

function QuizzesPageRoute() {
  return (
    <DashboardLayout>
      <QuizzesPage />
    </DashboardLayout>
  )
}

export default authHoc(QuizzesPageRoute);
