import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 

 } from '@/components/ui/alert-dialog'
import { EQuestionType } from '@/enums'
import { handleApiExceptions } from '@/lib/utils'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import React from 'react'
interface IConfirmDeleteQuestionDialog {
  title: string,
  type: EQuestionType,
  score: number,
  onConfirm: () => Promise<void>,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}
export default function ConfirmDeleteQuestionDialog({
  title,
  type,
  onConfirm,
  score,
  isOpen,
  setIsOpen
}: IConfirmDeleteQuestionDialog) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this question?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="flex justify-between">
              <span>Title :</span>
              <span className='text-bold'>{title}</span>
            </span>
            <span className="flex justify-between">
              <span>Type :</span>
              <span className='text-bold'>{type}</span>
            </span>
            <span className="flex justify-between">
              <span>Score :</span>
              <span>{score}</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleApiExceptions(onConfirm)} className="bg-error-500 text-white">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
