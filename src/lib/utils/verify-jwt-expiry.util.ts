"use client"
import { jwtDecode } from "jwt-decode";

export function verifyJwtExpiry(accessToken: string): boolean {
    try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp ? decoded.exp > currentTime : false;
    } catch {
        return false;
    }
}