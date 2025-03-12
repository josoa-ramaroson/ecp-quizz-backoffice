import { EErrorMessage } from "@/enums";
import axios from "axios";
export function getClientApi(accessToken?: string | null) {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_QUIZ_API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      // Ajouter un intercepteur de requête pour insérer le token dynamique
      api.interceptors.request.use(
        async (config) => {
          
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
    
          return config;
        },
        (error) => Promise.reject(error)
      );
    
      // Intercepteur pour gérer les réponses
    api.interceptors.response.use(
      response => {
        // Traitez la réponse ici si nécessaire
        return response;
      },
      error => {
        if (!error.response) 
          // Handle no response from server
          throw new Error(EErrorMessage.NO_RESPONSE_FROM_SERVER_ERROR);
        
        const { data } = error.response;
        let errorMessage = data?.message  || EErrorMessage.UNKNOWN_ERROR;
    
        throw new Error(errorMessage);
        }  
      );
    
    
      return api;
}