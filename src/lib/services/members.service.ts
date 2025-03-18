"use client"

import { IMember } from "@/interfaces";
import { TAddMemberFormData, TModifyMemberFormData } from "@/types";
import { BaseService } from "./base.service";

export class MembersService extends BaseService {
    
    private static readonly URI = "/members";

    static async findAll(): Promise<IMember[]> {
        return this.makeRequests(this.URI);
    }

    static async findOne(id: string): Promise<IMember> {
        return this.makeRequests(`${this.URI}/${id}`);
    }

    static async create(member: TAddMemberFormData): Promise<IMember> {
        return this.makeRequests(this.URI, "POST", member);
    }

    static async update(member: TModifyMemberFormData): Promise<IMember> {
        if (!member.password) delete member.password;
        return this.makeRequests(`${this.URI}/${member._id}`, "PUT", member);
    }

    static async delete(id: string): Promise<IMember> {
        return this.makeRequests(`${this.URI}/${id}`, "DELETE");
    }

    static async getMemberInfoFromToken( id: string) {
       return this.makeRequests(`${this.URI}/${id}`);
    }

    // Optional: Add statistics method if needed like other services
    static async getMemberStats(id: string) {
        console.info(id);
        return Promise.resolve({
            quizzesCompleted: Math.floor(Math.random() * 25),
            averageScore: Math.floor(Math.random() * 100),
        });
    }
}