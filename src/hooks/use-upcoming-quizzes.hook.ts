"use client"

import { EErrorMessage } from "@/enums";
import { IQuiz } from "@/interfaces";
import { QuizzesService } from "@/lib/services";
import { useCallback, useEffect, useState } from "react"

export const useUpcommingQuizzes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [upcomingQuizzes, setUpcomingQuizzes] = useState<IQuiz[] | null>(null);
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await QuizzesService.getUpComing();
            setUpcomingQuizzes(data);
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
        upcomingQuizzes,
        error,
        isLoading
    }
}