"use client"
import { DashboardLayout } from '@/components';
import { QuestionsPage } from '@/containers';
import authHoc from '@/lib/hoc/auth-hoc';

import React from 'react'

function QuestionPageRoute() {
  return (
    <DashboardLayout>
        <QuestionsPage />
    </DashboardLayout>
  )
}

export default authHoc(QuestionPageRoute);
