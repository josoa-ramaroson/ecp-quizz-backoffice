import { MetricCard } from '@/components'
import { Users, ClipboardList, FileQuestion, BarChart3, LucideIcon } from 'lucide-react'
import React from 'react'
interface MetricCardProps {
    title: string
    value: string
    change?: string
    trend?: "up" | "down" | "neutral"
    icon: LucideIcon
    color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"
};

export default function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Members"
            value="124"
            change="+12% from last month"
            trend="up"
            icon={Users}
            color="primary"
          />
          <MetricCard
            title="Active Quizzes"
            value="8"
            change="+2 from last week"
            trend="up"
            icon={ClipboardList}
            color="success"
          />
          <MetricCard
            title="Questions Bank"
            value="342"
            change="+28 from last month"
            trend="up"
            icon={FileQuestion}
            color="accent"
          />
          <MetricCard
            title="Completion Rate"
            value="78%"
            change="+5% from last month"
            trend="up"
            icon={BarChart3}
            color="warning"
          />
    </div>
  )
}
