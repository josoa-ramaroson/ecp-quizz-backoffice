
import { ELocalStorageKey } from "@/enums";
import { IMember } from "@/interfaces";
import { LocalStorageService } from "@/lib/services";
import { TMemberStore } from "@/types";
import { create } from "zustand";

export const useMemberStore = create<TMemberStore>((set, get) => ({
    member: LocalStorageService.getItem<IMember>(ELocalStorageKey.MEMBER) || null,
    
    setMember: (member: IMember | null) => {
        set({ member });
        LocalStorageService.setItem(ELocalStorageKey.MEMBER, member);

    },
    clearMember: () => {
        set({ member: null });
        LocalStorageService.removeItem(ELocalStorageKey.MEMBER);
    }
}))