import { Card, Heading } from '@/components'
import { EHeading } from '@/enums'
import React from 'react'

export default function UpcomingQuizzes() {
  return (
     <Card 
            className='rounded-lg border bg-card text-card-foreground shadow-sm'
            header={<Heading as={EHeading.HEADING_5} className='font-bold' >Upcomming quizzes</Heading>}
        >
            
    </Card>
  )
}
