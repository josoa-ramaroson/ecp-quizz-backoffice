export type TAccessTokenStore = {
    accessToken: string | null;
    clearAccessToken: () => void;
    setAccessToken: (accessToken: string | null) => void;
    verifyAccessToken: () => boolean;
}