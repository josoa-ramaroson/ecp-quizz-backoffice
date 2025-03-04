"use client"
import { LoginPage } from '@/components'
import { AuthServices } from '@/services'
import { useTokenStore } from '@/store';
import { TLoginFormData } from '@/types'

export default function Page() {

  const authServices = AuthServices.getInstance();
  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const handleOneLogin = async (loginFormData: TLoginFormData): Promise<void> => {
    
    try {
      const token = await authServices.login(loginFormData);
      setAccessToken(token);
    } catch (error: any) {
        throw error;
    }
    
  }
  return (
    <LoginPage 
      onLogin={handleOneLogin}
    />
  )
}
