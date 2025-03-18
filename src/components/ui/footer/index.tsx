"use client"

import clsx from 'clsx';
import React, { ReactNode } from 'react'

type TFooterProps = {
    className?: string;
    text?: string;
    children?: ReactNode | ReactNode[];
}
export default function Footer(props: TFooterProps) {
    const { children, className, text } = props;
    return (
        <div className={clsx(
            className,
            " bottom-8 w-full text-center mb-2",
            )}>
            <p className="text-secondary-500 text-sm">
                {text}
            </p>
            {children}
        </div>
    )
}
