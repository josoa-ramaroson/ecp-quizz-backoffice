

import { useAccessToken } from "@/store/use-access-token.store";

import { getClientApi } from "../utils";
import { EErrorMessage } from "@/enums";

export class BaseService {
  // No constructor, no stored API instance
  
  static async makeRequests(url: string, method: string = 'GET', body?: any) {
      const { accessToken } = useAccessToken.getState();
      const api = getClientApi(accessToken);
      
      const requestOptions = {
          method,
          url,
          data: body
      };
      try {
        const { data } = await api.request(requestOptions);
        
        return data;
      } catch (error) {
        let errorMessage = EErrorMessage.UNKNOWN_ERROR;
        
        if (error && typeof error === 'object') {
          // Now TypeScript knows error is an object
          const err = error as any; // Type assertion for accessing properties
          
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
        }
        throw new Error(errorMessage); 
      }
  }
}
