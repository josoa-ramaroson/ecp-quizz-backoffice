"use client"

import clsx from "clsx";

type DividerProps = {
    className?: string;
    text?: string;
  }
  
  export const Divider = ({ className, text }: DividerProps) => {
    if (!text) {
      return <hr className={clsx("border-secondary-200 my-6", className)} />;
    }
    
    return (
      <div className={clsx("relative flex items-center my-6", className)}>
        <div className="flex-grow border-t border-secondary-200"></div>
        <span className="flex-shrink mx-4 text-secondary-500 text-sm">{text}</span>
        <div className="flex-grow border-t border-secondary-200"></div>
      </div>
    );
  };