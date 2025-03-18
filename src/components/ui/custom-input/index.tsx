"use client"

import clsx from 'clsx';
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'


type TInputProps = {
    id: string;
    type: HTMLInputTypeAttribute;
    label?: string;
    value: string;
    placeHolder?: string;
    required: boolean,
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
    error?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: TInputProps) {
    const {
        type,
        label,
        handleChange,
        id,
        value,
        leftIcon,
        rightIcon,
        required,
        placeHolder,
        className,
        error,
    } = props;
    
  return (
    <div className="space-y-2">
        {
            label 
            &&
            <label htmlFor={id} className="block text-sm font-medium text-secondary-700">
            {label}
            </label>
        }
        <div className="relative">   
              {
                leftIcon &&
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" >
                    {leftIcon}
                </div>         
              }
              <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                className={clsx(
                    "w-full py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-200",
                    leftIcon ? "pl-10" : "pl-4",
                    rightIcon ? "pr-12" : "pr-4",
                    error ? "border-error-500 focus:ring-error-500" : "",
                    className
                )}
                placeholder={placeHolder? placeHolder : ""}
                required={required || false}
              />
              {
                rightIcon &&
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
                    {rightIcon}
                </div>
              }
        </div>
        { error && <p className="text-error-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
