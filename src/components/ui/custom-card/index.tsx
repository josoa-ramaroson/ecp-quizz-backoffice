import { ReactNode } from 'react';
import { clsx } from 'clsx';

type TCardProps = {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  className?: string;
  children?: ReactNode;
}

export default function Card ({ 
  className, 
  header, 
  content, 
  footer, 
  headerClassName,
  contentClassName,
  footerClassName,
  children 
}: TCardProps) {
  return (
    <div 
      className={clsx(
        "bg-surface p-8 rounded-2xl shadow-md", 
        className
      )}  
    >
      {header && (
        <div className={clsx("mb-6", headerClassName)}>
          {header}
        </div>
      )}
      
      {content && (
        <div className={clsx("space-y-6", contentClassName)}>
          {content}
        </div>
      )}
      
      {children}
      
      {footer && (
        <div className={clsx("mt-6 pt-4 border-t border-secondary-100", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
};
