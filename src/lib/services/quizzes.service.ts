"use client"

import { IQuiz } from "@/interfaces";
import { TQuizFormValues } from "@/types";
import { BaseService } from "./base.service";
export class QuizzesService extends BaseService {
    
    static async findById(id:string) {
        return this.makeRequests(`/quizzes/${id}`);
    }

    static async findAll() {
        return this.makeRequests("/quizzes");
    }

    static async create(quiz:TQuizFormValues) {
        return this.makeRequests("/quizzes", "POST", quiz);
    }

    static async update(quiz:IQuiz) {
        return this.makeRequests(`/quizzes/${quiz._id}`, "PUT", quiz);
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
}
