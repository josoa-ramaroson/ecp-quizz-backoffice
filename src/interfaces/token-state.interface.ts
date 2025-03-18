"use client"

export interface ITokenState {
    accessToken: string | null;
    clearAccessToken: () => void;
    setAccessToken: (token: string | null) => void;
    getAccessToken: () => string | null;
}