import { EQuestionType } from "@/enums";
import { IAnswer } from "@/interfaces";

export type TQuestionFormData = {
    _id?: string,
    title: string;
    description: string;
    type: EQuestionType;
    score: number;
    answersOptions: IAnswer[];
    comment?: string;
}