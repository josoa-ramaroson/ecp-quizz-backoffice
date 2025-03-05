import { EMemberRole } from "@/enums";
import { z } from "zod";

// Base schema for common fields
const baseFormSchema = z.object({
    firstName: z.string().min(2).max(255),
    facebookName: z.string().min(2).max(255),
    email: z.string().email(),
    role: z.nativeEnum(EMemberRole),
});

// Add Schema (Password Required)
export const addFormSchema = baseFormSchema.extend({
    newPassword: z
        .string()
        .min(8, { message: "Password length should be more than 8 characters" }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Modify Schema (Password Optional)
export const modifyFormSchema = baseFormSchema.extend({
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine(
    (data) => {
        if (data.newPassword && data.confirmPassword) {
            return data.newPassword === data.confirmPassword;
        }
        
        return true;
    },
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

// ✅ Use a union type that covers both cases
export type IModifyMemberFormSchema = z.infer<typeof modifyFormSchema>;
export type IAddMemberFormSchema = z.infer<typeof addFormSchema> ;

export type IMemberFormSchema = IAddMemberFormSchema | IModifyMemberFormSchema;
