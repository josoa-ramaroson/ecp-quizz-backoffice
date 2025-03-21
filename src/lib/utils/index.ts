import { EToastMessage } from "@/enums"
import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export async function handleApiExceptions(functionParams:  () => Promise<any>): Promise<void> {
  try {
    await functionParams();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
        toast.error(EToastMessage.UNKOWN_ERROR);
    }
  }
}

export * from "./api-client.util";
export * from "./verify-jwt-expiry.util";
export * from "./decode-jwt.util";
export * from "./format-date.util";