"use clien"
import {
  Dialog,  
  DialogContent, 
  DialogTitle, 
  DialogTrigger,  
  DialogHeader 
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import AddMemberForm from "./add-member-form"
import { BUTTON_VARIANT_CLASSNAME } from "@/constants"
import { cn } from "@/lib"
import { useState } from "react"
import {  IFormSchema } from "../constants"

export default function AddMemberDialog() {
  const [open, setOpen] = useState(false);

  const submitHandler = (values: IFormSchema) => {
    console.log("submi");
    alert(values.firstname);
    setOpen(false);
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
          <AddMemberForm submitHandler={submitHandler}/>
        </div>
      
      </DialogContent>
    </Dialog>
  )
}

