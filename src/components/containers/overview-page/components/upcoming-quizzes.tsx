import {  Heading } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { EHeading } from '@/enums'
import { useUpcommingQuizzes } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function UpcomingQuizzes() {
  const { isLoading, error, upcomingQuizzes } = useUpcommingQuizzes();
  if (isLoading) return <LoadingSpinner size={4} />
  return (
     <Card 
      className='rounded-lg border bg-card text-card-foreground shadow-sm sm:w-full'
    >
      <CardHeader className="flex flex-row items-center">
        <div className='flex-1'>  
          <CardTitle>
            <Heading as={EHeading.HEADING_5} className='font-bold' >Upcomming quizzes</Heading>
          </CardTitle>
          <CardDescription>Scheduled quizzes for the next few days.</CardDescription>
        </div>
        <Button variant="default" size="sm" asChild>
            <Link href="/dashboard/quizzes">
              <Plus className="mr-2 h-4 w-4" />
              New Quiz
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 overflow-y-scroll max-h-32'>
          {upcomingQuizzes?.map((quiz) => (
              <div key={quiz._id} className="flex items-center justify-between space-y-0 cursor-pointer hover:bg-secondary-100 px-4 py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{quiz.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{formatDate(quiz.startDate)}</span>
                    <span className="mx-1">•</span>
                  
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        { error && <span className='text-red-600 text-sm'>{error.message}</span>}
      </CardFooter>
    </Card>
  )
}
