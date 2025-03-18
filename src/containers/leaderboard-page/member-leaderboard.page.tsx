"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLeaderboardData } from "@/hooks/use-leaderboard-data.hook";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TLeaderboardData } from "@/types";

type TimeFrame = "daily" | "weekly" | "biweekly";

type TLeaderboardState = {
  daily: TLeaderboardData[];
  weekly: TLeaderboardData[];
  biweekly: TLeaderboardData[];
};

export default function MemberLeaderboardPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [leaderboardData, setLeaderboardData] = useState<TLeaderboardState | null>(null);
  const { isLoading, dailyLeaderboard, weeklyLeaderboard, biWeeklyLeaderboard } = useLeaderboardData();

  useEffect(() => {
    if (dailyLeaderboard && weeklyLeaderboard && biWeeklyLeaderboard) {
      setLeaderboardData({
        daily: dailyLeaderboard,
        weekly: weeklyLeaderboard,
        biweekly: biWeeklyLeaderboard,
      });
    }
  }, [dailyLeaderboard, weeklyLeaderboard, biWeeklyLeaderboard]);


  return (
    <div className="max-w-4xl mx-auto space-y-6">
    <div className="space-y-2 text-center mb-8">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
        <span className="text-3xl">🏆</span> 
        Leaderboard Champions
        <span className="text-3xl">🏆</span>
      </h1>
      <p className="text-muted-foreground text-lg">Race to the top and claim your crown as quiz royalty!</p>
    </div>

    <Card className="border-2 border-primary-100 ">
      <CardHeader >
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className="text-2xl">✨</span> Quiz Masters Hall of Fame
        </CardTitle>
        <CardDescription >
        <Tabs defaultValue="daily" onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
            <TabsList  className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="daily" className="flex flex-col sm:flex-row items-center gap-1 py-2 h-auto sm:h-10">
                <span className="hidden sm:inline">Today&apos;s</span>
                <span className="sm:hidden">Daily</span>
                <span>🌟</span>
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex flex-col sm:flex-row items-center gap-1 py-2 h-auto sm:h-10">
                <span className="hidden sm:inline">Weekly Heroes</span>
                <span className="sm:hidden">Weekly</span>
                <span>🚀</span>
              </TabsTrigger>
              <TabsTrigger value="biweekly" className="flex flex-col sm:flex-row items-center gap-1 py-2 h-auto sm:h-10">
                <span className="hidden sm:inline">Champions League</span>
                <span className="sm:hidden">Champions</span>
                <span>👑</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !leaderboardData ? (
          <div className="flex flex-col items-center py-8">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Summoning the champions...</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-scroll">
            {leaderboardData[timeFrame]?.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl block mb-4">🔍</span>
                <p className="text-lg font-medium">No champions yet!</p>
                <p className="text-muted-foreground">Be the first to claim your spot on the podium</p>
              </div>
            ) : (
              <>
                {/* Top 3 Podium Display - more visual and exciting */}
                {leaderboardData[timeFrame]?.length > 0 && (
                  <div className="flex justify-center items-end gap-4 py-6 px-2 mb-8 bg-gradient-to-b from-secondary-50 to-transparent rounded-lg">
                    {/* 2nd Place */}
                    {leaderboardData[timeFrame]?.length > 1 && (
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 border-2 border-gray-300 mb-2">
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {leaderboardData[timeFrame][1]?.pseudo.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <div className="font-medium">{leaderboardData[timeFrame][1]?.pseudo}</div>
                          <div className="text-sm font-bold text-gray-500">{leaderboardData[timeFrame][1]?.score} pts</div>
                        </div>
                        <div className="h-20 w-16 bg-gray-200 mt-2 rounded-t-lg flex items-center justify-center">
                          <span className="text-xl">🥈</span>
                        </div>
                      </div>
                    )}
                    
                    {/* 1st Place */}
                    {leaderboardData[timeFrame]?.length > 0 && (
                      <div className="flex flex-col items-center">
                        <Avatar className="h-20 w-20 border-2 border-yellow-300 mb-2 ring-2 ring-yellow-200 ring-offset-2">
                          <AvatarFallback className="bg-yellow-100 text-yellow-800">
                            {leaderboardData[timeFrame][0]?.pseudo.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <div className="font-bold text-lg">{leaderboardData[timeFrame][0]?.pseudo}</div>
                          <div className="text-sm font-extrabold text-primary-600">{leaderboardData[timeFrame][0]?.score} pts</div>
                        </div>
                        <div className="h-28 w-20 bg-yellow-100 mt-2 rounded-t-lg flex items-center justify-center">
                          <span className="text-2xl">🥇</span>
                        </div>
                      </div>
                    )}
                    
                    {/* 3rd Place */}
                    {leaderboardData[timeFrame]?.length > 2 && (
                      <div className="flex flex-col items-center">
                        <Avatar className="h-14 w-14 border-2 border-amber-600 mb-2">
                          <AvatarFallback className="bg-amber-50 text-amber-800">
                            {leaderboardData[timeFrame][2]?.pseudo.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <div className="font-medium">{leaderboardData[timeFrame][2]?.pseudo}</div>
                          <div className="text-sm font-bold text-amber-700">{leaderboardData[timeFrame][2]?.score} pts</div>
                        </div>
                        <div className="h-16 w-14 bg-amber-100 mt-2 rounded-t-lg flex items-center justify-center">
                          <span className="text-xl">🥉</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Regular Ranking List for positions 4+ */}
                {leaderboardData[timeFrame]?.slice(3).map((member, i) => {
                  const index = i + 3; // Adjust index to start from position 4
                  return (
                    <div key={member.memberId} 
                         className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                          <span className="text-sm font-semibold">{index + 1}</span>
                        </div>
                        <Avatar>
                          <AvatarFallback>{member.pseudo.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.pseudo}</div>
                          <div className="text-xs text-muted-foreground">
                            {index === 3 ? "Almost on the podium! 🔥" : "Climbing the ranks"}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">{member.score} pts</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  );
}
