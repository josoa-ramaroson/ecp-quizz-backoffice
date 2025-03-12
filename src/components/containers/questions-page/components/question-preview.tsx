"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { IQuestion } from "@/interfaces"
import { EQuestionType } from "@/enums"
import { v4 } from "uuid"

interface QuestionPreviewProps {
  question: Partial<IQuestion>
}

export function QuestionPreview({ question }: QuestionPreviewProps) {
  const [selectedSingleChoice, setSelectedSingleChoice] = useState<string | null>(null)
  const [selectedMultipleChoices, setSelectedMultipleChoices] = useState<string[]>([])
  const [textAnswer, setTextAnswer] = useState("")

  if (!question.title) {
    return <div className="text-center py-8 text-muted-foreground">Fill in the question details to see a preview</div>
  }

  const handleMultipleChoiceChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMultipleChoices((prev) => [...prev, id])
    } else {
      setSelectedMultipleChoices((prev) => prev.filter((item) => item !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{question.title}</h3>
        {question.description && <p className="text-muted-foreground mt-1">{question.description}</p>}
        {question.score !== undefined && (
          <div className="mt-1 text-sm text-muted-foreground">{question.score} points</div>
        )}
      </div>

      {question.type === EQuestionType.SINGLE_CHOICE && (
        <RadioGroup value={selectedSingleChoice || ""} onValueChange={setSelectedSingleChoice} className="space-y-2">
          {question.answersOptions?.map((answer, index) => (
            <div key={answer.id} className="flex items-center space-x-2">
              <RadioGroupItem value={answer.id} id={`answer-${index}`} />
              <Label htmlFor={`answer-${index}`} className="cursor-pointer">
                {answer.text || `Answer option ${index + 1}`}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === EQuestionType.MULTIPLE_CHOICE && (
        <div className="space-y-2">
          {question.answersOptions?.map((answer, index) => (
            <div key={answer.text + v4() + index} className="flex items-center space-x-2">
              <Checkbox
                id={`answer-${index}`}
                checked={selectedMultipleChoices.includes(answer.id)}
                onCheckedChange={(checked) => handleMultipleChoiceChange(answer.id || index.toString(), !!checked)}
              />
              <Label htmlFor={`answer-${index}`} className="cursor-pointer">
                {answer.text || `Answer option ${index + 1}`}
              </Label>
            </div>
          ))}
        </div>
      )}

      {question.type === EQuestionType.SHORT_ANSWER && (
        <Textarea
          placeholder="Type your answer here..."
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          rows={4}
        />
      )}
    </div>
  )
}

