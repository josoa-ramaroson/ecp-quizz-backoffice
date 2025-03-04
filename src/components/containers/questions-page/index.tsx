import { Button, Heading } from '@/components/ui'
import { EButtonSize, EButtonVariant, EHeading } from '@/enums'
import { ImportIcon } from 'lucide-react'
import React from 'react'
import { AddQuestionDialog, QuestionsTableSection } from './components'
import { mockQuestions } from './constants'

export default function QuestionsPage() {
  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <Heading as={EHeading.HEADING_5}>Questions </Heading>
            <div className="flex gap-2">
                <AddQuestionDialog />
                <Button
                    variant={EButtonVariant.SECONDARY}
                    size={EButtonSize.MEDIUM}
                    icon={<ImportIcon />}
                    label='Import'
                />
            </div>
        </div>

        <QuestionsTableSection questions={mockQuestions}/>
    </div>
  )
}
