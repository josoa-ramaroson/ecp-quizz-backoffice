import { Heading } from '@/components/ui'
import { EHeading } from '@/enums'
import React from 'react'
import { MetricCards, RecentActivities, TopMembers, UpcomingQuizzes } from './components'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
        <Heading 
            as={EHeading.HEADING_5}
            className="font-extrabold"
        >Dashboard</Heading>
        <MetricCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RecentActivities />
            <div className='space-y-6'>
              <TopMembers />
              <UpcomingQuizzes /> 
            </div>
        </div>
    </div>
  )
}
