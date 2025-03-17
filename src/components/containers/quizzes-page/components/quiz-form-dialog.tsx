"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { DatePicker } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { IQuiz } from "@/interfaces"
import { EToastMessage } from "@/enums"
import toast from "react-hot-toast"
import { quizFormSchema } from "../schema"
// import { QuestionSelector } from "./question-selector"
import { TQuizFormValues } from "@/types"
import { useQuizStore } from "@/store"
import { handleApiExceptions } from "@/lib/utils"
import { QuestionSelector } from "./question-selector"
import { BUTTON_VARIANT_CLASSNAME } from "@/constants"

interface QuizFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quiz?: IQuiz | null
  onClose?: () => void
}

export function QuizFormDialog({ 
  open, 
  onOpenChange, 
  quiz, 
  onClose, 
}: QuizFormDialogProps) {
  const { createQuiz, updateQuiz } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const defaultStartDate = new Date();
  defaultStartDate.setUTCHours(0,0,0);
  
  const defaultDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
  defaultDeadline.setUTCHours(23,59,59);

  const form = useForm<TQuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: defaultStartDate,
      deadline: defaultDeadline, // 1 days from now
      questionsIds: [],
      isPublished: false,
      isDaily: false
    },
  })

  useEffect(() => {
    if (quiz) {        
      form.reset({
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description || "",
        startDate:  new Date(quiz.startDate) ,
        deadline:  new Date(quiz.deadline),
        questionsIds: quiz.questionsIds,
        isPublished: quiz.isPublished,
        isDaily: quiz.isDaily,
      })
    } else {
     
      
      form.reset({
        title: "",
        description: "",
        startDate: defaultDeadline,
        deadline: defaultDeadline,
        questionsIds: [],
        isPublished: false,
        isDaily: false
      })
    }
  }, [quiz, form])

  const handleClose = () => {
    if (onClose) onClose()
    form.reset()
  }

  const onSubmit = async (data: TQuizFormValues) => {
    try {
      setIsSubmitting(true)

      handleApiExceptions(async ()=>{
        data.deadline.setUTCHours(23, 59, 59);
        data.startDate.setUTCHours(0,0,0);
       
      if (quiz) {
          await updateQuiz({
            ...data,
            _id: quiz._id,
            creationDate: quiz.creationDate,
          } as IQuiz)
        } else {
          await createQuiz({...data, deadline:  data.deadline} )
        }
      })

      onOpenChange(false)
      handleClose()
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error(EToastMessage.FAILED_TO_SAVE_QUIZ)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen)
        if (!isOpen) handleClose()
      }}
    >
      <DialogContent 
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>{quiz ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Quiz Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a description for your quiz"
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Start Date</FormLabel>
                    <FormControl >
                      <DatePicker date={field.value} onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="questionsIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Questions</FormLabel>
                  <FormControl onClick={(e) => e.stopPropagation()}>
                    <QuestionSelector selectedQuestions={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <p className="text-sm text-muted-foreground">Make this quiz available to participants</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="isDaily"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Daily Quiz</FormLabel>
                    <p className="text-sm text-muted-foreground">Make this quiz available to be a daily quiz</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className={isSubmitting? BUTTON_VARIANT_CLASSNAME.primary.disabled : BUTTON_VARIANT_CLASSNAME.primary.enabled}
              >
                {isSubmitting ? "Saving..." : quiz ? "Update Quiz" : "Create Quiz"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

