"use client"

export interface IQuiz {
    _id: string
    title: string
    description?: string | undefined
    startDate: Date
    deadline: Date
    questionsIds: string[]
    creationDate: Date
    isPublished: boolean
    isDaily: boolean
  }