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
import { cn } from "@/lib"
import { useState } from "react"
import { modifyFormSchema, IModifyMemberFormSchema } from "../constants"
import { EMemberRole } from "@/enums"
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
        email: member.email,
        newPassword: "",
        role: member.role,
    },
});

  const onSubmit = async (values: IModifyMemberFormSchema) => {
      setIsSubmitting(true);
      try {
      
          await submitHandler(member._id, values);
          setIsOpen(false);
          toast.success("Member updated successfully!");
          reactHookForm.reset({
              firstName: "",
              facebookName: "",
              email: "",
              newPassword: "",
              confirmPassword: "",
              role: EMemberRole.MEMBER,
          });
      } catch (error) {
          console.error("Error submitting form:", error);

          toast.error("Failed to update member. Please try again."); 
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

