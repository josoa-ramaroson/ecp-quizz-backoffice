"use client"

import { useState } from 'react'
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts'

// UI components
import { Button, Heading } from '@/components/ui'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'

// Enums
import { EButtonSize, EButtonVariant, EHeading } from '@/enums'

// Hooks
import { useWeeklyCompletionData } from '@/hooks/use-weekly-completion-data.hook'
import { useMonthlyCompletionData } from '@/hooks/use-monthly-completion-data.hook'

type TimeRange = "weekly" | "monthly"

export default function RecentActivities() {
  // State
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly")
  
  // Data hooks
  const { 
    isLoading: weeklyLoading, 
    weeklyCompletions, 
    error: weeklyError
  } = useWeeklyCompletionData()
  
  const {
    isLoading: monthlyLoading,
    monthlyCompletions,
    error: monthlyError
  } = useMonthlyCompletionData()
  
  // Active data based on selected time range
  const data = timeRange === "weekly" ? weeklyCompletions : monthlyCompletions
  const isLoading = timeRange === "weekly" ? weeklyLoading : monthlyLoading
  const hasError = weeklyError || monthlyError
  
  return (
    <div className="col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <Heading as={EHeading.HEADING_5} className='font-extrabold'>
              Quiz Activities
            </Heading>  
          </CardTitle>
          
          <CardDescription className='w-full flex items-center justify-between'>
            <p>Overview of quiz participation and completion rates</p>
            <div className="flex gap-2">
              <Button
                variant={timeRange === "weekly" ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                size={EButtonSize.MEDIUM}
                onClick={() => setTimeRange("weekly")}
                label="Weekly"
              />
              
              <Button
                variant={timeRange === "monthly" ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                size={EButtonSize.MEDIUM}
                onClick={() => setTimeRange("monthly")}
                label='Monthly'
              />
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="h-80">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Loading data...</p>
              </div>
            ) : hasError ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-destructive">Failed to load chart data</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data? data : undefined}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="completions" 
                    name="Quizzes Completions" 
                    fill="#075985" 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}