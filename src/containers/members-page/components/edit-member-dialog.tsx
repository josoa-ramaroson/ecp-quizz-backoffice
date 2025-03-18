"use client"
import {
  Dialog,  
  DialogContent, 
  DialogTitle, 
  DialogHeader 
} from "@/components/ui/dialog"
import MemberForm from "./member-form"
import { useState } from "react"
import { modifyFormSchema, IModifyMemberFormSchema } from "../constants"
import { EMemberRole, EToastMessage } from "@/enums"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { IMember } from "@/interfaces"

interface IAddMemberDialog {
    submitHandler: (id: string, values: IModifyMemberFormSchema) => Promise<void>,
    member: IMember,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function EditMemberDialog({ 
  submitHandler, 
  member,
  setIsOpen, 
  isOpen
}: IAddMemberDialog) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reactHookForm  = useForm<IModifyMemberFormSchema>({
    resolver: zodResolver(modifyFormSchema),
    defaultValues: {
        firstName:  member.firstName,
        facebookName:  member.facebookName,
        pseudo: member.pseudo,
        newPassword: "",
        role: member.role,
        isActiveAccount: member.isActiveAccount
    },
});

  const onSubmit = async (values: IModifyMemberFormSchema) => {
      setIsSubmitting(true);
      try {
      
          await submitHandler(member._id, values);
          setIsOpen(false);
          toast.success(EToastMessage.MEMBER_UPDATED);
          reactHookForm.reset({
              firstName: "",
              facebookName: "",
              pseudo: "",
              newPassword: "",
              confirmPassword: "",
              role: EMemberRole.MEMBER,
              isActiveAccount: false,
          });
      } catch (error) {
          console.error("Error submitting form:", error);

          toast.error(EToastMessage.FAILED_TO_UPDATE_MEMBER); 
      } finally {
          setIsSubmitting(false);
      }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="z-50">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">New Member</DialogTitle>
        </DialogHeader>
        <div className="py-2 ">
          <MemberForm
            submitLabel="Save changes" 
            reactHookForm={reactHookForm}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      
      </DialogContent>
    </Dialog>
  )
}

