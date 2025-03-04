"use client";

import { Button } from '@/components/ui';
import { EButtonSize, EButtonVariant } from '@/enums';
import { useTokenStore } from '@/store';
import { LogOut } from 'lucide-react';
import React from 'react'
type TLogoutButtonProps = { 
    isOpen: boolean;
}
export default function LogoutButton({ isOpen }: TLogoutButtonProps) {
  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const handleLogout = () => {
    setAccessToken(null);
  }
  return (
    <div className="border-t p-2">
        <Button
            onClick={handleLogout}
            variant={EButtonVariant.GHOST}
            size={EButtonSize.MEDIUM}
            label={isOpen ? "Logout": ""}
            icon={ <LogOut className="mr-2 h-5 w-5" />}
        />
    </div>
  )
}
