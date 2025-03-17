"use client"
import { EErrorMessage } from "@/enums";

import { TLoginFormData } from "@/types";
import { getClientApi } from "../utils";

export class AuthServices  {

    static async login(loginData: TLoginFormData): Promise<string | null> {
        try {
            const api = getClientApi();
            const response = await api.post(
                "auth/moderator/sign-in",
                loginData
            );
            const accessToken =  response.data.accessToken;
            return accessToken;
        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);
            else 
                throw new Error(EErrorMessage.UNKNOWN_ERROR);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const api = getClientApi();
            await api.delete(`members/${id}`);
        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);
            else 
                throw new Error(EErrorMessage.UNKNOWN_ERROR);
        }
    }
}