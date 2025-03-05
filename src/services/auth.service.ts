import { EErrorMessage } from "@/enums";
import { api } from "@/lib";
import { TLoginFormData } from "@/types";
import { AxiosInstance } from "axios";

export class AuthServices {
    private static instance: AuthServices;
    private api: AxiosInstance;
    
    constructor(api: AxiosInstance ) {
        this.api = api;
    }

    public static getInstance() {
        if (!AuthServices.instance)
            AuthServices.instance = new AuthServices(api);
        return AuthServices.instance;
    }

    async login(loginData: TLoginFormData): Promise<string | null> {
        try {
            const response = await this.api.post(
                "auth/login",
                loginData
            );
            const token =  response.data.access_token;
            return token;
        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);
            else 
                throw new Error(EErrorMessage.UNKOWN_ERROR);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.api.delete(`members/${id}`);
        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);
            else 
                throw new Error(EErrorMessage.UNKOWN_ERROR);
        }
    }
}