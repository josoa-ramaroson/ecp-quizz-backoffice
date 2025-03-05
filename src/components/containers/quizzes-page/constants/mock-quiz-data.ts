import { IQuiz } from "@/interfaces";

export const mockQuizzes: IQuiz[] = [
    {
      _id: "quiz_001",
      title: "English Grammar Basics",
      description: "A quiz to test your knowledge of basic English grammar rules.",
      startDate: new Date("2025-03-10T10:00:00Z"),
      deadline: new Date("2025-03-15T23:59:59Z"),
      questions: ["question_1", "question_2", "question_3", "question_4", "question_5"],
      creationDate: new Date("2025-03-04T14:30:00Z"),
    },
    {
      _id: "quiz_002",
      title: "Advanced Vocabulary Challenge",
      description: "Test your vocabulary with challenging words and phrases.",
      startDate: new Date("2025-03-12T12:00:00Z"),
      deadline: new Date("2025-03-18T23:59:59Z"),
      questions: ["question_6", "question_7", "question_8", "question_9", "question_10"],
      creationDate: new Date("2025-03-05T09:15:00Z"),
    },
    {
      _id: "quiz_003",
      title: "Commonly Confused Words",
      description: "Differentiate between words that are often mixed up.",
      startDate: new Date("2025-03-15T09:00:00Z"),
      deadline: new Date("2025-03-20T23:59:59Z"),
      questions: ["question_11", "question_12", "question_13", "question_14"],
      creationDate: new Date("2025-03-06T16:45:00Z"),
    },
    {
      _id: "quiz_004",
      title: "Past Tense Challenge",
      description: "Identify the correct past tense forms of various verbs.",
      startDate: new Date("2025-03-18T14:30:00Z"),
      deadline: new Date("2025-03-25T23:59:59Z"),
      questions: ["question_15", "question_16", "question_17"],
      creationDate: new Date("2025-03-07T11:00:00Z"),
    },
    {
      _id: "quiz_005",
      title: "Punctuation Rules",
      description: "A quiz to test your knowledge of punctuation marks and their usage.",
      startDate: new Date("2025-03-20T08:00:00Z"),
      deadline: new Date("2025-03-27T23:59:59Z"),
      questions: ["question_18", "question_19", "question_20", "question_21"],
      creationDate: new Date("2025-03-08T18:20:00Z"),
    }
  ];
  