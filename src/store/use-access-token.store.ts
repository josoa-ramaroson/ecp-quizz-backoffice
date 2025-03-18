"use client"

import { ELocalStorageKey } from "@/enums";
import { LocalStorageService } from "@/lib/services";
import { verifyJwtExpiry } from "@/lib/utils";

import { TAccessTokenStore } from "@/types";
import { create } from "zustand";

export const useAccessToken = create<TAccessTokenStore>((set, get) => ({
    accessToken: LocalStorageService.getItem(ELocalStorageKey.ACCESS_TOKEN) || null,
    clearAccessToken: () =>{ 
        set({ accessToken: null });
        LocalStorageService.removeItem(ELocalStorageKey.ACCESS_TOKEN);
    },
    setAccessToken: (accessToken: string | null) => {
        set({ accessToken });
        LocalStorageService.setItem(ELocalStorageKey.ACCESS_TOKEN, accessToken);

    },
    verifyAccessToken: () => {
        const { accessToken } = get();
        return !!accessToken && verifyJwtExpiry(accessToken);
    }
}))