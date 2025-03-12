"use client"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { cn } from '@/lib/utils'
import { Cross, Plus } from 'lucide-react'
import { useState } from 'react'
import QuestionForm from './question-forms'
import { TQuestionFormSchema } from '../constants'
import { IQuestion } from '@/interfaces'
import { useQuestionStore } from '@/store'

interface IAddQuestionDialogProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  question: IQuestion,
}
export default function EditQuestionDialog({

    question,
    isOpen,
    setIsOpen,
}: IAddQuestionDialogProps) {
 
    const { updateQuestions } = useQuestionStore();
    const submitQuestionHandler = async (values: TQuestionFormSchema) => {
        await updateQuestions(values);
        setIsOpen(false);
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      

      <DialogContent className="z-50">
          <DialogHeader >
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Question</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <QuestionForm 
                submitHandler={submitQuestionHandler}
                buttonLabel='Save Changes'
                question={question}
              />
          </div>
      </DialogContent>
    </Dialog>
  )
}
