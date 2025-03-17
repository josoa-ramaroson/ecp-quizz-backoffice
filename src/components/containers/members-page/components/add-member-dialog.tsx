"use clien"
import {
  Dialog,  
  DialogContent, 
  DialogTitle, 
  DialogTrigger,  
  DialogHeader 
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import MemberForm from "./member-form"
import { BUTTON_VARIANT_CLASSNAME } from "@/constants"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {  addFormSchema, IAddMemberFormSchema, IMemberFormSchema } from "../constants"
import { EMemberRole, EToastMessage } from "@/enums"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import toast from "react-hot-toast"

interface IAddMemberDialog {
    submitHandler: (values: IAddMemberFormSchema) => Promise<void>,
}

export default function AddMemberDialog({submitHandler}: IAddMemberDialog) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reactHookForm  = useForm<IAddMemberFormSchema>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
        firstName:  "",
        facebookName:  "",
        pseudo: "",
        newPassword: "123456789",
        confirmPassword: "",
        role: EMemberRole.MEMBER,
        isActiveAccount: true,
    },
});

  const onSubmit = async (values: IAddMemberFormSchema) => {
      setIsSubmitting(true);
      try {
          await submitHandler(values);
          setOpen(false);
          toast.success(EToastMessage.MEMBER_ADDED);
          reactHookForm.reset({
              firstName: "",
              facebookName: "",
              pseudo: "",
              newPassword: "123456789",
              confirmPassword: "",
              role: EMemberRole.MEMBER,
              isActiveAccount: true,
          });
      } catch (error) {
          console.error("Error submitting form:", error);

          toast.error(EToastMessage.FAILED_TO_CREATE_MEMBER); 
      } finally {
          setIsSubmitting(false);
      }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md",
          BUTTON_VARIANT_CLASSNAME.primary.enabled,
        )}
      >
        <Plus className="h-4 w-4" />
        <span>Add Member</span>
      </DialogTrigger>

      <DialogContent className="z-50">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">New Member</DialogTitle>
        </DialogHeader>
        <div className="py-2 ">
          <MemberForm 
            submitLabel="Add Member"
            reactHookForm={reactHookForm as UseFormReturn<IMemberFormSchema>}
            onSubmit={onSubmit as (values: IMemberFormSchema) => Promise<void> }
            isSubmitting={isSubmitting}
          />
        </div>
      
      </DialogContent>
    </Dialog>
  )
}

