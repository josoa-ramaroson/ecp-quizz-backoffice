"use client"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { cn } from '@/lib'
import { Cross, Plus } from 'lucide-react'
import { useState } from 'react'
import AddQuestionForm from './add-question-forms'
import { TQuestionFormData } from '@/types'

export default function AddQuestionDialog() {
    const [open, setOpen] = useState(false);
    
    const submitQuestionHandler = async (values: TQuestionFormData) => {
        Promise.resolve(values);
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
            <AddQuestionForm submitHandler={submitQuestionHandler}/>
          </div>
      </DialogContent>
    </Dialog>
  )
}
