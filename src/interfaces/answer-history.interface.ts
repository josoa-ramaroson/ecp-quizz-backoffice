import { IAnswerRecord } from "."

export interface IAnswerHistory {
    _id: string
    quizId: string
    memberId: string
    answersRecord: IAnswerRecord[]
    finishedAt: Date
    score: number
  }