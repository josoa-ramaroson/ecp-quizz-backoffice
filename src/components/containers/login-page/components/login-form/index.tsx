import clsx from 'clsx';
import React, { useState } from 'react'
import { ArrowRight, Lock, User } from 'lucide-react';
import { TLoginFormData } from '@/types';
import { Button, Input} from '@/components';
import { EButtonSize, EButtonVariant } from '@/enums';
import PasswordInput from './password-input';

type TLoginForm = {
    className?: string;
    loginFormData: TLoginFormData;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm(
    {
        className,
        handleSubmit,
        handleInputChange,
        loginFormData,
    }: TLoginForm
) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitWithState = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    handleSubmit(e);
    setIsSubmitting(false);
  }
  return (
    <form
        onSubmit={handleSubmitWithState}
        className={clsx("space-y-6",className)}>
        <Input 
          id='email'
          value={loginFormData.email}
          type="email"
          label='Email'
          required={true}
          handleChange={handleInputChange}
          leftIcon={<User />}
          placeHolder='Enter your Email'
        />

        <PasswordInput 
          value={loginFormData.password}
          handleChange={handleInputChange}       
        />
        
        <Button 
          variant={EButtonVariant.PRIMARY}
          size={EButtonSize.LARGE}
          label='Continue to Quiz'
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition='right'
          className='w-full'
          isLoading={isSubmitting}
        />
    </form>
  )
}
