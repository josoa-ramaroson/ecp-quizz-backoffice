"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import {  useState } from 'react'
import QuestionForm from './question-forms'
import { TQuestionFormSchema } from '../constants'
import { Plus } from 'lucide-react'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { cn } from '@/lib'

interface IAddQuestionDialogProps {
  submitHandler: (values: TQuestionFormSchema) => Promise<void>,
 
}
export default function AddQuestionDialog({ submitHandler }: IAddQuestionDialogProps) {
    const [open, setOpen] = useState(false);
    
    const submitQuestionHandler = async (values: TQuestionFormSchema) => {
        await submitHandler(values);
        setOpen(false);
    };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger
          className={cn(
            "px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md",
            BUTTON_VARIANT_CLASSNAME.primary.enabled,
          )}
        >
          <Plus className="h-4 w-4" />
          <span>Add Question</span>
        </DialogTrigger>
      <DialogContent className="z-50">
          <DialogHeader >
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">New Question</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <QuestionForm 
                submitHandler={submitQuestionHandler}
                buttonLabel='Add Question'
              />
          </div>
      </DialogContent>
    </Dialog>
  )
}
