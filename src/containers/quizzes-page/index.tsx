"use client"
import { Heading } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { EHeading } from '@/enums'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import React, {  useState } from 'react'
import { QuizGrid } from './components'
import { useQuizStore } from '@/store'
import { ErrorAlert } from '@/components/ui/error-alert'
import { QuizFormDialog } from './components/quiz-form-dialog'

export default function QuizzesPage() {
  const { isLoading, error, quizzes } = useQuizStore()
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
 
  if (isLoading) 
    return <LoadingSpinner />
  
  if (error)
    return <ErrorAlert message={error.message} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <Heading  
              as={EHeading.HEADING_5}
          >
              Quiz Management
          </Heading>
          <Button 
            className={cn(BUTTON_VARIANT_CLASSNAME.primary.enabled)}
            onClick={()=>setIsFormDialogOpen(true)}
          >
            <PlusCircle className='mr-2 h-4 w-4' />
            Create Quiz
          </Button>
        </div>  

        {
        quizzes.length === 0 ? (
          <EmptyState
            title="No quizzes found"
            description="Create a new quiz to get started"
            action={
              <Button 
                onClick={() => setIsFormDialogOpen(true)}
                className={cn(BUTTON_VARIANT_CLASSNAME.primary.enabled)}
              >
                Create Quiz
              </Button>
            }
          />
        ):
        (
          <QuizGrid />
        )}
      
      <QuizFormDialog 
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
        />
    </div>
  )
}
