"use client"

import { TQuestionFormSchema } from "@/containers/questions-page/constants";
import { IQuestion } from "./question.interface";

export interface IQuestionStore  {
    questions: IQuestion[];
    isLoading: boolean;
    error: Error | null;
    refreshQuestions: () => Promise<void>;
    createQuestions: (question: Omit<IQuestion, "_id" | "creationDate">) => Promise<IQuestion>;
    updateQuestions: (question: TQuestionFormSchema) => Promise<IQuestion>
    deleteQuestions: (id: string) => Promise<boolean>
  }
  