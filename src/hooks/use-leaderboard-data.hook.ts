"use client"
import { EErrorMessage } from "@/enums";
import { LeaderboardService } from "@/lib/services/leaderboard.service";
import { TLeaderboardData } from "@/types";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useLeaderboardData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [dailyLeaderboard, setDailyLeaderboard] = useState<TLeaderboardData[]>([]);
    const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<TLeaderboardData[]>([]);
    const [biWeeklyLeaderboard, setBiWeeklyLeaderboard] = useState<TLeaderboardData[]>([]);
    const fetchLeaderboardData = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const daily = await LeaderboardService.getDaily()
            setDailyLeaderboard(daily);
            
            const weekly = await LeaderboardService.getWeekly()
            setWeeklyLeaderboard(weekly);
            
            const biWeekly = await LeaderboardService.getBiWeekly()
            setBiWeeklyLeaderboard(biWeekly);

          } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch leaderboard"))
            toast.error(err instanceof Error ? err.message : EErrorMessage.UNKNOWN_ERROR);
          } finally {
            setIsLoading(false);
          }
    }, []);

    useEffect(()=> {
        fetchLeaderboardData();
    }, []);
    return {
        isLoading,
        error,
        dailyLeaderboard,
        weeklyLeaderboard,
        biWeeklyLeaderboard,
    }
}