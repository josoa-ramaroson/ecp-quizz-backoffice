"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  Card, Heading } from '@/components';
import { EHeading } from '@/enums';
import { TLoginFormData } from '@/types';
import { LoginForm, QrCodeScanner } from './components';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth.hook';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function LoginPage() {
  const router  = useRouter();

  const { login, error, isLoading, setIsLoading } = useAuth();
  const [isQrCodeLogin] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const [loginFormData, setLoginFormData] = useState<TLoginFormData>({
    pseudo: '',
    password: ''
  });

  useEffect(() => {
    // Only navigate when login is successful and not loading
    if (isLoginSuccessful && !isLoading && !error) {
      setIsLoading(true);
      router.push("/dashboard");
    }
  }, [isLoginSuccessful, isLoading, router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    await login(loginFormData);
    setIsLoginSuccessful(!!!error);
    setIsLoading(false);
  };

  // const handleChangeLoginType = () => {
  //   setIsQrCodeLogin(curr => !curr);
  // }

  const handleQrCodeDataConversion = (data: string): TLoginFormData =>  {
      try {
        const dataObject = JSON.parse(data);
        if (!dataObject || !dataObject.email || !dataObject.password)
          throw new Error("Invalid object from qr code")
        
        return dataObject as TLoginFormData;
      } catch (error) {
        throw error;
      }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-background-dark  p-4 flex flex-col items-center justify-center px-4">
      {
        isLoading ? <LoadingSpinner /> : 
        
        <Card 
          header={
            <Heading 
              as={EHeading.HEADING_4}
              className='text-center'
              >
              Identification - {isQrCodeLogin? "QR Code": "Email and Password"}
            </Heading>
          }
          
          content={
              isQrCodeLogin? 
              <QrCodeScanner 
                convertDecodedDataToObject={handleQrCodeDataConversion}
                onDataConverted={async () => {} }
              /> : 
              <LoginForm
                loginFormData={loginFormData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
          }

          footer={
            <>
                {error && <div className='text-red-600 text-sm text-center'>{error.message}</div>}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className='w-full text-center text-secondary-800 hover:text-primary-700'
                  >
                    Back to Welcome Page
                  </Link>
                    
                  {/* <div className='min-w-[1px] h-8 bg-secondary-800 '></div>
                  <Link
                  href="#"
                    onClick={handleChangeLoginType}
                    className='w-full text-center text-secondary-800 hover:text-primary-700'
                  >
                    {isQrCodeLogin ? 'Log in via email': "Log in via QR Code"}
                  </Link> */}
                </div>
              </>
          }
          className='max-w-lg w-full'
        />
      }
    </div>
  );
}