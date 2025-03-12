
import { TLeaderboardData } from "@/types";
import { BaseService } from "./base.service";

export class LeaderboardService extends BaseService {
    static async getDaily(): Promise<TLeaderboardData[]> {
        const dailyLeaderboard = await this.makeRequests("/stats/daily-leaderboard");
        return dailyLeaderboard;
    }
    
    static async getWeekly(): Promise<TLeaderboardData[]> {
        const dailyLeaderboard = await this.makeRequests("/stats/weekly-leaderboard");
        return dailyLeaderboard;
    }
    
    static async getBiWeekly(): Promise<TLeaderboardData[]> {
        const dailyLeaderboard = await this.makeRequests("/stats/bi-weekly-leaderboard");
        return dailyLeaderboard;
    }
   
}