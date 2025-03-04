import { EQuestionType } from "@/enums";
import { z } from "zod";

const answerSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Answer text is required"),
    isCorrect: z.boolean(),
});

const baseQuestionSchema = z
    .object({
        title: z.string().min(2).max(255),
        description: z.string().min(0).max(255),
        type: z.nativeEnum(EQuestionType),
        score: z.number().int().positive(),
        comment: z.string().min(0).max(1000),
    })
   
const multipleChoiceSchema = baseQuestionSchema.extend({
    type: z.literal(EQuestionType.MULTIPLE_CHOICE),
    answersOptions: z.array(answerSchema)
      .min(2, "At least 2 answer options are required")
      .refine(
        (answersOptions) => answersOptions.some(answer => answer.isCorrect),
        "At least one answer must be marked as correct"
      ),
  });

const singleChoiceSchema = baseQuestionSchema.extend({
    type: z.literal(EQuestionType.SINGLE_CHOICE),
    answersOptions: z.array(answerSchema)
        .min(2, "At least 2 answer options are required")
        .refine(
        (answersOptions) => answersOptions.filter(answer => answer.isCorrect).length === 1,
        "Exactly one answer must be marked as correct"
        ),
});

// Schema for TRUE_FALSE questions
const trueFalseSchema = baseQuestionSchema.extend({
    type: z.literal(EQuestionType.TRUE_FALSE),
    answersOptions: z.array(answerSchema)
      .length(2, "True/False questions must have exactly 2 options")
      .refine(
        (answersOptions) => answersOptions.filter(answer => answer.isCorrect).length === 1,
        "Exactly one answer must be marked as correct"
      ),
  });
  
  // Schema for SHORT_ANSWER questions
const shortAnswerSchema = baseQuestionSchema.extend({
    type: z.literal(EQuestionType.SHORT_ANSWER),
    answersOptions: z.array(answerSchema).min(1, "Short answer should have at least one true answer"),
});

 // Combined schema with discriminated union
export const questionFormSchema = z.discriminatedUnion("type", [
    multipleChoiceSchema,
    singleChoiceSchema,
    trueFalseSchema,
    shortAnswerSchema,
]);

export type TAnswersOptionsSchema = z.infer<typeof answerSchema>;
export type TQuestionFormSchema = z.infer<typeof questionFormSchema>;