"use client"

import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components";
import { useState } from "react";


type TPasswordInput = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function PasswordInput({
  value,
  handleChange,
}: TPasswordInput) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((before) => !before);
  };

  return (
    <Input 
          id="password"
          value={value}
          type={showPassword ? 'text':'password'}
          label="Password"
          required={true}
          handleChange={handleChange}
          leftIcon={<Lock />}
          placeHolder='Enter your password'
          rightIcon={
            showPassword?
            <EyeOff className="w-5 h-5 cursor-pointer" onClick={handleShowPassword}/> :
            <Eye className="w-5 h-5 cursor-pointer" onClick={handleShowPassword}/>
          }
        />
  )
}
