"use client"

import { EQuizStatus } from "@/enums/quiz-status.enum"
import { IQuiz } from "@/interfaces"
import { useMemo } from "react"

/**
 * Custom hook to determine the status of a quiz
 */
export function useQuizStatus(quiz: IQuiz) {
  return useMemo(() => {
    const now = new Date()
    const startDate = new Date(quiz.startDate)
    const deadline = new Date(quiz.deadline)

    if (now >= startDate && now <= deadline) {
      return EQuizStatus.ACTIVE
    } else if (now < startDate) {
      return EQuizStatus.UPCOMING
    } else {
      return EQuizStatus.EXPIRED
    }
  }, [quiz.startDate, quiz.deadline])
}

