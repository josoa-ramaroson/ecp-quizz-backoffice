"use client"
import { DashboardLayout, QuestionsPage } from '@/components'
import authHoc from '@/lib/hoc/auth-hoc';

import React from 'react'

function Page() {
  return (
    <DashboardLayout>
        <QuestionsPage />
    </DashboardLayout>
  )
}

export default authHoc(Page);
