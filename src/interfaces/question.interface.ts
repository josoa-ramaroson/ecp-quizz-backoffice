"use client"
import { EQuestionType } from "@/enums"
import { IAnswer } from "./answer.interface"

export interface IQuestion {
    _id: string
    title: string
    description: string
    type: EQuestionType
    answersOptions: IAnswer[]
    score: number
    comment?: string
    creationDate: Date
  }