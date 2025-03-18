"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableQuestionItem } from "./sortable-question-item"
import { useQuestionStore } from "@/store/use-question-store"
import { EQuestionType } from "@/enums"
import { IQuestion } from "@/interfaces"
import { cn } from "@/lib/utils"
import { BUTTON_VARIANT_CLASSNAME } from "@/constants"

interface QuestionSelectorProps {
  selectedQuestions: string[]
  onChange: (questionIds: string[]) => void
}

export function QuestionSelector({ selectedQuestions, onChange }: QuestionSelectorProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogSelectedQuestions, setDialogSelectedQuestions] = useState<string[]>(selectedQuestions)
  const { questions, isLoading } = useQuestionStore();

  const handleRemoveQuestion = (id: string) => {
    onChange(selectedQuestions.filter((qId) => qId !== id))
  }

  const handleSaveQuestions = () => {
    onChange(dialogSelectedQuestions)
    setIsDialogOpen(false)
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setDialogSelectedQuestions([...dialogSelectedQuestions, id])
    } else {
      setDialogSelectedQuestions(dialogSelectedQuestions.filter((qId) => qId !== id))
    }
  }

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
  // Stop propagation to parent elements
    e.stopPropagation();
    setDialogSelectedQuestions(selectedQuestions)
    setIsDialogOpen(true)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = selectedQuestions.indexOf(String(active.id))
      const newIndex = selectedQuestions.indexOf(String(over?.id))

      const newOrder = [...selectedQuestions]
      newOrder.splice(oldIndex, 1)
      newOrder.splice(newIndex, 0, String(active.id))

      onChange(newOrder)
    }
}

  // Find question details from the questions array
  const getQuestionDetails = (id: string): IQuestion | undefined => {
    return questions.find((q) => q._id === id)
  }

  const getQuestionTypeBadge = (type: EQuestionType) => {
    switch (type) {
      case EQuestionType.MULTIPLE_CHOICE:
        return <Badge variant="outline">Multiple Choice</Badge>
      case EQuestionType.SINGLE_CHOICE:
        return <Badge variant="outline">Single Choice</Badge>
      case EQuestionType.SHORT_ANSWER:
        return <Badge variant="outline">Short Answer</Badge>
      case EQuestionType.TRUE_FALSE:
        return <Badge variant="outline">True / False</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-2">
      {selectedQuestions.length === 0 ? (
        <div className="text-center py-6 border rounded-md bg-muted/50">
          <p className="text-sm text-muted-foreground">No questions added yet</p>
          <Button 
              variant="outline" 
              size="sm" className={cn("mt-2", BUTTON_VARIANT_CLASSNAME.outline.enabled)} 
              onClick={(e) => handleOpenDialog(e)}
            >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Questions
          </Button>
        </div>
      ) : (
        <div className="space-y-2 border rounded-md p-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={selectedQuestions} strategy={verticalListSortingStrategy}>
              {selectedQuestions.map((id) => (
                <SortableQuestionItem
                  key={id}
                  id={id}
                  question={getQuestionDetails(id)}
                  onRemove={handleRemoveQuestion}
                  getQuestionTypeBadge={getQuestionTypeBadge}
                  isLoading={isLoading}
                />
              ))}
            </SortableContext>
          </DndContext>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn("mt-2", BUTTON_VARIANT_CLASSNAME.outline.enabled)}
            onClick={(e) => handleOpenDialog(e)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add More Questions
          </Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent 
          className="sm:max-w-[500px]"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Add Questions</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-2 border rounded-md">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="grid gap-1.5 w-full">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex items-center gap-2 mt-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question._id} className="flex items-start space-x-3 p-2 border rounded-md">
                    <Checkbox
                      id={question._id}
                      checked={dialogSelectedQuestions.includes(question._id)}
                      onCheckedChange={(checked) => handleCheckboxChange(question._id, checked as boolean)}
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={question._id} className="font-medium">
                        {question.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{question.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getQuestionTypeBadge(question.type)}
                        <Badge variant="secondary">{question.score} pts</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button 
              className={cn("mt-2", BUTTON_VARIANT_CLASSNAME.outline.enabled)}
      
              variant="outline" onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveQuestions}
              className={cn("mt-2", BUTTON_VARIANT_CLASSNAME.primary.enabled)}
            >Add Selected ({dialogSelectedQuestions.length})</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

