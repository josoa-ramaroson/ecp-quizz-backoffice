"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Heading } from '@/components';
import { EButtonSize, EButtonVariant, EErrorMessage, EHeading } from '@/enums';
import { TLoginFormData } from '@/types';
import { LoginForm, QrCodeScanner } from './components';
import toast from 'react-hot-toast';

type TLoginPageProps = {
  onLogin: (loginFormData: TLoginFormData) => Promise<void>;
}

export default function LoginPage({ 
  onLogin,
}: TLoginPageProps) {

  const [isQrCodeLogin, setIsQrCodeLogin] = useState(true);

  const [loginFormData, setLoginFormData] = useState<TLoginFormData>({
    email: '',
    password: ''
  });

  const handleLogin = async (data: TLoginFormData) => {
    try {
      await onLogin(data);  
      toast.success(`Connected`);

    } catch (error) {
        console.error(error);
        if (error instanceof Error)
          toast.error(error.message);
        else
          toast.error(EErrorMessage.UNKOWN_ERROR);
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    await handleLogin(loginFormData);
  };

  const handleChangeLoginType = () => {
    setIsQrCodeLogin(curr => !curr);
  }
  // Go back to welcome page

  const router  = useRouter();
  const handleGoBackToWelcomePage = () => {
    router.push("/");
  };

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
              onDataConverted={handleLogin}
            /> : 
            <LoginForm
              loginFormData={loginFormData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
        }

        footer={
          <div className="flex items-center justify-between">
            <Button
              variant={EButtonVariant.TERTIARY}
              size={EButtonSize.SMALL}
              label='Back to Welcome Page'
              onClick={handleGoBackToWelcomePage}
              className='w-full text-center text-secondary-800 hover:text-primary-700'
            />
            <div className='min-w-[1px] h-8 bg-secondary-800 '></div>
            <Button
              variant={EButtonVariant.TERTIARY}
              size={EButtonSize.SMALL}
              label={isQrCodeLogin ? 'Log in via email': "Log in via QR Code"}
              onClick={handleChangeLoginType}
              className='w-full text-center text-secondary-800 hover:text-primary-700'
            />
          </div>
        }
        className='max-w-lg w-full'
      />
    </div>
  );
}