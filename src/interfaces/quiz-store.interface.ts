"use client"

import { IQuiz } from "@/interfaces"

export interface IQuizStore  {
    quizzes: IQuiz[];
    isLoading: boolean;
    error: Error | null;
    refreshQuizzes: () => Promise<void>;
    createQuiz: (quiz: Omit<IQuiz, "_id" | "creationDate">) => Promise<IQuiz>;
    updateQuiz: (quiz: IQuiz) => Promise<IQuiz>
    deleteQuiz: (id: string) => Promise<boolean>
  }
  