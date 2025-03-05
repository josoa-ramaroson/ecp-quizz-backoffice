import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import React from 'react'
interface IConfirmDeleteDialog {
  firstName: string,
  facebookName: string,
  onConfirm: () => void,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}
export default function ConfirmDeleteDialog({
  firstName,
  facebookName,
  onConfirm,
  isOpen,
  setIsOpen
}: IConfirmDeleteDialog) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this member?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="flex justify-between">
              <span>First Name:</span>
              <span>{firstName}</span>
            </span>
            <span className="flex justify-between">
              <span>Facebook Name:</span>
              <span>{facebookName}</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-error-500 text-white">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
