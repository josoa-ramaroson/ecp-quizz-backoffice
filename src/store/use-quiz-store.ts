"use client"
import {  IQuizStore } from "@/interfaces";
import { QuizzesService } from "@/lib/services";
import { TQuizFormValues } from "@/types";
import { create } from "zustand";

export const useQuizStore = create<IQuizStore>((set, get) => ({
    quizzes: [],
    isLoading: false,
    error: null,
    refreshQuizzes: async () => {
        set({ isLoading: true });
        try {
            const quizzes = await QuizzesService.findAll();
            set({ quizzes, isLoading: false });
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
    createQuiz: async (quiz: TQuizFormValues) => {
        try {
            const createdQuiz = await QuizzesService.create(quiz);
            set({ quizzes: [...get().quizzes, createdQuiz] });
            return createdQuiz;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
    updateQuiz: async (quiz) => {
        try {
            const updatedQuiz = await QuizzesService.update(quiz);
            set({ quizzes: get().quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q)) });
            return updatedQuiz;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
    },
    deleteQuiz: async (id) => {
        try {
            await QuizzesService.delete(id);
            set({ quizzes: get().quizzes.filter((q) => q._id !== id) });
            return true;
        } catch (error) {
            const err = error as Error;
            set({ error: err, isLoading: false });
            throw err;
        }
        
    },
    
}))