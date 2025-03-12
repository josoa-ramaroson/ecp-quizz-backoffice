"use client"
import { EErrorMessage } from "@/enums";
import { StatsService } from "@/lib/services/stats.service";
import { TMetricsData } from "@/types";
import { useCallback, useEffect, useState } from "react"

export const useMetricsData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [metrics, setMetrics] = useState<TMetricsData | null>(null);
    const fetchMetric = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await StatsService.getMetrics();
            setMetrics(data);
            setIsLoading(false);
        } catch (error) {
           setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
        }
        finally { 
            setIsLoading(false);
        }

    }, []);

    useEffect(()=>{
        fetchMetric();
    }, []);

    return {
        metrics,
        error,
        isLoading
    }
}