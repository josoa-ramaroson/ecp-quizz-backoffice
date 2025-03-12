import { EErrorMessage } from "@/enums";
import { StatsService } from "@/lib/services/stats.service";
import { TQuizCompletionsData } from "@/types";
import { useCallback, useEffect, useState } from "react"

export const useMonthlyCompletionData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [monthlyCompletions, setMonthlyCompletions] = useState<TQuizCompletionsData[] | null>(null);
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await StatsService.getMontlyCompletions();
            setMonthlyCompletions(data);
            setIsLoading(false);
        } catch (error) {
           setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
        }
        finally { 
            setIsLoading(false);
        }

    }, []);

    useEffect(()=>{
        fetchData();
    }, []);

    return {
        monthlyCompletions,
        error,
        isLoading
    }
}