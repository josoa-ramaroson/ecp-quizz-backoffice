import { TQuestionFormData } from "@/types";
import { BaseService } from "./base.service";

export class QuestionsService extends BaseService {
    
    static async findById(id: string) {
        return this.makeRequests(`/questions/${id}`);
    }

    static async findAll() {
        return this.makeRequests("/questions");
    }

    static async create(question: TQuestionFormData) {
        delete question._id;
        return this.makeRequests("/questions", "POST", question);
    }

    static async update(question: TQuestionFormData) {
        return this.makeRequests(`/questions/${question._id}`, "PUT", question);
    }

    static async delete(id: string) {
        return this.makeRequests(`/questions/${id}`, "DELETE");
    }
    
    
}