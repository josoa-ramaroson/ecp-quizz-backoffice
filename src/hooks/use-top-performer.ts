"use client"
import { EErrorMessage } from "@/enums";
import { StatsService } from "@/lib/services/stats.service";
import {  TTopPerformerData } from "@/types";
import { useCallback, useEffect, useState } from "react"

export const useTopPerformer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [topPerformer, setTopPerformer] = useState<TTopPerformerData[] | null>(null);
    const fetchTopPerformer = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await StatsService.getTopPerformer();
            setTopPerformer(data);
            setIsLoading(false);
        } catch (error) {
           setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
        }
        finally { 
            setIsLoading(false);
        }

    }, []);

    useEffect(()=>{
        fetchTopPerformer();
    }, []);

    return {
        topPerformer,
        error,
        isLoading
    }
}