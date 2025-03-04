"use client"
import { ELocalStorageKey } from "@/enums";
import { LocalStorageService } from "@/lib";
import { useTokenStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"

type TAuthProvider = {
    children: React.ReactNode | React.ReactNode[]
}
export function AuthProvider({children}: TAuthProvider) {
    const router = useRouter();
    
    const { 
        setAccessToken,
        accessToken
    } = useTokenStore();
    
    useEffect(()=> {
        const storedToken = LocalStorageService.getItem<string | null>(ELocalStorageKey.ACCESS_TOKEN);
        setAccessToken(storedToken);
    },[]);

    useEffect(()=>{
        LocalStorageService.setItem<string | null>(ELocalStorageKey.ACCESS_TOKEN, accessToken);
        if (accessToken)
            router.push("/dashboard");
    }, [accessToken, router]);
    
    return (
        <>
            {children}
        </>
    )
}