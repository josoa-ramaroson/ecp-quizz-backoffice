import { Button, Card, Heading } from '@/components/ui'
import { EButtonSize, EButtonVariant, EHeading } from '@/enums'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type TimeRange = "weekly" | "monthly"


// Mock data
const weeklyData = [
  { name: "Mon", quizzes: 4, completions: 3 },
  { name: "Tue", quizzes: 3, completions: 2 },
  { name: "Wed", quizzes: 5, completions: 4 },
  { name: "Thu", quizzes: 6, completions: 4 },
  { name: "Fri", quizzes: 8, completions: 6 },
  { name: "Sat", quizzes: 10, completions: 8 },
  { name: "Sun", quizzes: 7, completions: 5 },
]

const monthlyData = [
  { name: "Week 1", quizzes: 24, completions: 18 },
  { name: "Week 2", quizzes: 28, completions: 22 },
  { name: "Week 3", quizzes: 32, completions: 25 },
  { name: "Week 4", quizzes: 38, completions: 30 },
]

export default function RecentActivities() {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly")
  const data = timeRange === "weekly" ? weeklyData : monthlyData

  return (
    <div className="col-span-2 ">
       <Card
            header={<Heading as={EHeading.HEADING_5} className='font-extrabold'>Quiz Activities </Heading>}
            className="h-full rounded-lg border bg-card text-card-foreground shadow-sm" 
            descriptions={
              <>
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
              </>
            }
            descriptionClassName='text-sm text-muted-foreground flex items-center justify-between'
        >
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
              <Bar dataKey="quizzes" name="Quizzes Taken" fill="#0ea5e9" />
              <Bar dataKey="completions" name="Completions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
    </div>
  )
}
