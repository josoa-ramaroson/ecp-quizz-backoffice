"use client"

import { z } from "zod";

export const quizFormSchema = z.object({
  _id: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  deadline: z.date(),
  creationDate: z.date().optional(),
  questionsIds: z.array(z.string()),
  isPublished: z.boolean(),
  isDaily: z.boolean()
});
