"use client"
import { Button, Heading } from '@/components/ui'
import { EButtonSize, EButtonVariant, EHeading } from '@/enums'
import { ImportIcon } from 'lucide-react'
import { AddQuestionDialog, QuestionsTableSection } from './components'

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

        <QuestionsTableSection  />
    </div>
  )
}
