"use client"

import { EErrorMessage, ELocalStorageKey } from "@/enums";

export class LocalStorageService {
    static setItem<T>(key: ELocalStorageKey, value: T) {
        try {
            localStorage
                .setItem(key, JSON.stringify(value));
        } catch {
            throw new Error(EErrorMessage.SET_ITEM_LOCAL_STORAGE_ERROR);
        }
    }

    static getItem<T>(key: ELocalStorageKey): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch  {
            return null;
        }
    }

    static removeItem(key: ELocalStorageKey) {
        try {
            localStorage.removeItem(key);
        } catch {
            return null;
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch {
            return null;
        }
    }
}