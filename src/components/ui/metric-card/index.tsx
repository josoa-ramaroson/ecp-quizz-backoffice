import type { LucideIcon } from "lucide-react"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { cn } from "@/lib"

interface MetricCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  icon: LucideIcon
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "primary",
}: MetricCardProps) {
  const colorClasses = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    accent: "bg-accent-50 text-accent-600",
    success: "bg-success-50 text-success-600",
    warning: "bg-warning-50 text-warning-600",
    error: "bg-error-50 text-error-600",
  }

  const trendClasses = {
    up: "text-success-600",
    down: "text-error-600",
    neutral: "text-secondary-500",
  }

  return (
    <div className="rounded-lg border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-secondary-500">{title}</h3>
        <div className={cn("rounded-full p-2", colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        {change && (
          <p className={cn("mt-1 flex items-center text-xs", trendClasses[trend])}>
            {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
            {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {change}
          </p>
        )}
      </div>
    </div>
  )
}

