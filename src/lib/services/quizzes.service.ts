"use client"
import { TQuizFormValues } from "@/types";
import { BaseService } from "./base.service";
export class QuizzesService extends BaseService {
    
    static async findById(id:string) {
        return this.makeRequests(`/quizzes/${id}`);
    }

    static async findAll() {
        return this.makeRequests("/quizzes");
    }

    static async create(quiz: TQuizFormValues) {
        return this.makeRequests("/quizzes", "POST", this.formatQuizbody(quiz));
    }

    static async update(quiz: TQuizFormValues) {
        console.log(this.formatQuizbody(quiz));
        return this.makeRequests(`/quizzes/${quiz._id}`, "PUT", this.formatQuizbody(quiz));
    }

    static async removeQuestionFromAllQuizzes(questionId: string) {
        return this.makeRequests(`/quizzes/question/${questionId}`, "DELETE");
    }

    static async delete(id:string) {
        return this.makeRequests(`/quizzes/${id}`, "DELETE");
    }

    static async getQuizStats(id: string) {
        console.info(id);
        return Promise.resolve({
            participants: Math.floor(Math.random() * 100),
            completionRate: Math.floor(Math.random() * 100),
        })
    }

    static async getUpComing() {
        return this.makeRequests("/quizzes/upcoming");
    }

    static formatQuizbody(quiz: TQuizFormValues):TQuizBody  {
        return { ...quiz, startDate: quiz.startDate.toISOString(), deadline: quiz.deadline.toISOString() }
    }
}

type TQuizBody = Omit<TQuizFormValues, "startDate" | "deadline"> & { 
    startDate: string;
    deadline: string;
}