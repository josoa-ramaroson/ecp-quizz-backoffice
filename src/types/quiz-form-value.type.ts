export type TQuizFormValues = {
    title: string;
    startDate: Date;
    deadline: Date;
    questionsIds: string[];
    isPublished: boolean;
    description?: string | undefined;
    _id?: string | undefined;
    creationDate?: Date | undefined;
}