"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QuestionPreview } from "./question-preview"
import { IQuestion } from "@/interfaces"

interface QuestionPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: IQuestion | null
}

export function QuestionPreviewDialog({ open, onOpenChange, question }: QuestionPreviewDialogProps) {
  if (!question) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Question Preview</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <QuestionPreview question={question} />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

