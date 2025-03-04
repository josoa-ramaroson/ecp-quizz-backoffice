import { Button } from '@/components/ui/button'
import { EQuestionType } from '@/enums'
import React, { SetStateAction } from 'react'
interface IFilterButtonProps {
    typeFilter: string,
    setTypeFilter: (value: SetStateAction<string>) => void
}
export default function FilterButton({ typeFilter, setTypeFilter}: IFilterButtonProps) {
  return (
<div className="flex flex-wrap gap-2">
    <Button variant={typeFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setTypeFilter("all")}>
      All
    </Button>
    <Button
      variant={typeFilter === EQuestionType.MULTIPLE_CHOICE ? "default" : "outline"}
      size="sm"
      onClick={() => setTypeFilter(EQuestionType.MULTIPLE_CHOICE)}
    >
      Multiple Choice
    </Button>
    <Button
      variant={typeFilter === EQuestionType.SINGLE_CHOICE ? "default" : "outline"}
      size="sm"
      onClick={() => setTypeFilter(EQuestionType.SINGLE_CHOICE)}
    >
      Single Choice
    </Button>
    <Button
      variant={typeFilter === EQuestionType.TRUE_FALSE ? "default" : "outline"}
      size="sm"
      onClick={() => setTypeFilter(EQuestionType.TRUE_FALSE)}
    >
      True/False
    </Button>
    <Button
      variant={typeFilter === EQuestionType.SHORT_ANSWER ? "default" : "outline"}
      size="sm"
      onClick={() => setTypeFilter(EQuestionType.SHORT_ANSWER)}
    >
      Short Answer
    </Button>
  </div>
  )
}
