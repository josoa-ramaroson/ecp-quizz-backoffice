import { jwtDecode } from "jwt-decode";

type TDecodeJwtReturn = {
    sub: string;
    email: string;
    role: string;
}
export function decodeJwt(jwtToken: string): TDecodeJwtReturn | null{
    try {
        if (jwtToken && jwtToken.length != 0) {
            const decoded = jwtDecode<TDecodeJwtReturn>(jwtToken);
            if (!decoded) return null;
            return decoded;
        }
        return null;
    } catch {
        return null;
    }
}

