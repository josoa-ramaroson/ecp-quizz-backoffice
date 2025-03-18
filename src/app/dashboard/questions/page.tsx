"use client"
import { QuestionsPage } from '@/components';
import authHoc from '@/lib/hoc/auth-hoc';
import dynamic from 'next/dynamic'
 
const DashboardLayout = dynamic(
  () => import('@/components/layout/dashboard-layout'),
  { ssr: false }
)
 
import React from 'react'

function QuestionPageRoute() {
  return (
    <DashboardLayout>
        <QuestionsPage />
    </DashboardLayout>
  )
}

export default authHoc(QuestionPageRoute);
