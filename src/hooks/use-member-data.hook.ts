"use client"
import { EErrorMessage } from "@/enums";
import { IMember } from "@/interfaces";
import { MembersService } from "@/lib/services";
import { useAccessToken } from "@/store";
import { useCallback, useEffect, useState } from "react";

export function useMemberInfo(memberId: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [memberInfo, setMemberInfo] = useState<IMember | null>(null);
    const { accessToken, } = useAccessToken();
  
    const fetchMemberInfo = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            if (accessToken){
            
                const member = await MembersService.findOne(memberId);
                setMemberInfo(member)
            }

        } catch (error) {
            setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
        } finally { 
            setIsLoading(false);
        }
    }, []);

    useEffect(()=>{
        fetchMemberInfo();
    }, []);

    return {
        isLoading,
        error,
        memberInfo,
    }
}