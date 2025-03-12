import { IMember } from "@/interfaces"

export type TMemberStore = {
    member: IMember | null;
    setMember: (members: IMember | null) => void;
    clearMember: () => void;
}