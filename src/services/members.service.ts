import { IMember } from "@/interfaces";
import { api } from "@/lib";
import { TAddMemberFormData, TModifyMemberFormData } from "@/types";

export class MembersServices {
    private readonly api;
    private readonly URI = "/members";
    constructor() {
        this.api = api;
    }

    async findAllMembers(): Promise<IMember[]> {
        const { data } = await api.get(this.URI);
        return data;
    }

    async createMember(member: TAddMemberFormData): Promise<IMember> {
        const { data } = await api.post(this.URI, member);
        return data;
    }

    async updateMember(member: TModifyMemberFormData) : Promise<IMember> {
        if (!member.password) delete member.password;
        const { data } = await api.put(`${this.URI}/${member._id}`, member);
        return data;
    }

    async delete(id: string): Promise<void> {
        const { data } = await api.delete(`${this.URI}/${id}`);
        return data;
    }
}

export const membersServices = new MembersServices();