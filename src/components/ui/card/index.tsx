import { ReactNode } from 'react';
import { clsx } from 'clsx';

type TCardProps = {
  header?: ReactNode;
  descriptions?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  className?: string;
  children?: ReactNode;
  contentContainerClassName?: string;
}

export default function Card ({ 
  className, 
  header, 
  descriptions, 
  footer, 
  headerClassName,
  descriptionClassName,
  footerClassName,
  contentContainerClassName,
  children 
}: TCardProps) {
  return (
    <div 
      className={clsx(
        className,
        "bg-surface p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
      )}  
    >
      {header && (
        <div className={clsx("mb-6", headerClassName)}>
          {header}
        </div>
      )}
        {descriptions && (
          <div className={clsx("space-y-6 text-secondary-600", descriptionClassName)}>
            {descriptions}
          </div>
        )}
        
      <div className={contentContainerClassName}>
        {children}
      </div>
      
      {footer && (
        <div className={clsx("mt-6 pt-4 border-t border-secondary-100", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
};
