"use client"
import { IQuestionStore } from "@/interfaces";
import { QuestionsService, QuizzesService } from "@/lib/services";
import { TQuestionFormData } from "@/types";
import { create } from "zustand";

export const useQuestionStore = create<IQuestionStore>((set, get) => ({
    questions: [],
    isLoading: false,
    error: null,
    refreshQuestions: async () => {
        set({ isLoading: true });
        try {
            const questions = await QuestionsService.findAll();
            
            set({ questions, isLoading: false });
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
    createQuestions: async (question) => {
        try {
            const createdQuestion = await QuestionsService.create(question);
            set({ questions: [...get().questions, createdQuestion] });
            return createdQuestion;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
    updateQuestions: async (question: TQuestionFormData) => {
        try {
            
            const updatedQuestion = await QuestionsService.update(question);
            set({ questions: get().questions.map((q) => (q._id === question._id ? updatedQuestion : q)) });
            return updatedQuestion;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
        
    },
    deleteQuestions: async (id) => {
        try {
            await QuizzesService.removeQuestionFromAllQuizzes(id);
            await QuestionsService.delete(id);
            set({ questions: get().questions.filter((q) => q._id !== id) });
            return true;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
}))