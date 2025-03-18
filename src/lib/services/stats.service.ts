"use client"

import { TMetricsData, TQuizCompletionsData, TTopPerformerData } from "@/types";
import { BaseService } from "./base.service";

export class StatsService extends BaseService {
    static readonly BASE_URI = "stats";
    
    static async getMetrics(): Promise<TMetricsData> {
        return await this.makeRequests(`${this.BASE_URI}/metrics`);
    }

    static async getTopPerformer(): Promise<TTopPerformerData[]> {
        return await this.makeRequests(`${this.BASE_URI}/top-performer`);
    }

    static async getWeeklyCompletions(): Promise<TQuizCompletionsData[]> {
        return await this.makeRequests(`${this.BASE_URI}/weekly-completion`);
    }

    static async getMontlyCompletions(): Promise<TQuizCompletionsData[]> {
        return await this.makeRequests(`${this.BASE_URI}/monthly-completion`);
    }
}