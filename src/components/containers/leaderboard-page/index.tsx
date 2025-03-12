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
import { Medal } from "lucide-react";
import { useLeaderboardData } from "@/hooks/use-leaderboard-data.hook";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TLeaderboardData } from "@/types";

type TimeFrame = "daily" | "weekly" | "biweekly";

type TLeaderboardState = {
  daily: TLeaderboardData[];
  weekly: TLeaderboardData[];
  biweekly: TLeaderboardData[];
};

export default function LeaderboardPage() {
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

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-700";
      default:
        return "text-transparent";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">See who's leading the pack in quiz points</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Quiz Masters</CardTitle>
          <CardDescription>
            <Tabs defaultValue="daily" onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="biweekly">Biweekly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !leaderboardData ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {leaderboardData[timeFrame]?.map((member, index) => (
                <div key={member.memberId} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      {index < 3 ? (
                        <Medal className={`w-6 h-6 ${getMedalColor(index)}`} />
                      ) : (
                        <span className="text-muted-foreground font-medium">{index + 1}</span>
                      )}
                    </div>
                    <Avatar>
                      <AvatarFallback>{member.firstName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.firstName}</div>
                      <div className="text-sm text-muted-foreground">Rank #{index + 1}</div>
                    </div>
                  </div>
                  <div className="font-bold text-lg">{member.score} pts</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
