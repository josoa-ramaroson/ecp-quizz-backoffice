import { EMemberRole } from "@/enums";
import { z } from "zod";

export const formSchema = z
    .object({
        firstname: z.string().min(2).max(255),
        facebookName: z.string().min(2).max(255),
        email: z.string().email(),
        role: z.nativeEnum(EMemberRole),
        newPassword: z
            .string()
            .min(8, {message: "Password length should be more than 8 characters"})
            .default("123456789"),
        confirmPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error will be associated with `confirmPassword` field
    });

export interface IFormSchema extends z.infer<typeof formSchema>{};