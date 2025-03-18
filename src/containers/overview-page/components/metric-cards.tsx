"use client"

import { MetricCard } from '@/components'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useMetricsData } from '@/hooks/use-metrics-data.hook'
import { Users, ClipboardList,  Percent } from 'lucide-react'
import React from 'react'


export default function MetricCards() {
  const { isLoading , error, metrics } = useMetricsData()
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {
           (isLoading && !metrics )? <LoadingSpinner size={8} />
          :
          <>
            <MetricCard
              title="Total Members"
              value={metrics?.totalMember? metrics?.totalMember : 0}
              
              icon={Users}
              color="primary"
            />
            <MetricCard
              title="Active Quizzes"
              value={metrics?.activeQuizzes? metrics?.activeQuizzes : 0}
              
              icon={ClipboardList}
              color="success"
            />
            <MetricCard
              title="Completion Rate"
              value={metrics?.completionRate? metrics?.completionRate : 0}
             
              icon={Percent}
              color="secondary"
            />
          </>
        }
        {error && <p className='text-red-600 text-sm'>{error.message}</p>}
    </div>
  )
}
