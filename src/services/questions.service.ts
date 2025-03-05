import { IQuestion } from "@/interfaces";
import { api } from "@/lib";
import { TQuestionFormData } from "@/types";

export class QuestionsService {
    private readonly api;
    private readonly URI = "/questions";
    constructor(){
        this.api = api;
    }

    async findAll(): Promise<IQuestion[]> {
        const { data } = await api.get(this.URI);
        return data;
    }

    async create(question: TQuestionFormData): Promise<IQuestion> {
        const { data } = await api.post(this.URI,  question);
        return data;
    }

    async update(id: string, question: TQuestionFormData ): Promise<IQuestion> {
        const { data } = await api.put(`${this.URI}/${id}`, question);
        return data;
    }

    async delete(id: string): Promise<IQuestion> {
        const { data } = await api.delete(`${this.URI}/${id}`);
        return data;
    }
}


export const questionsService = new QuestionsService()