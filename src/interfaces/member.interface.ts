import { EMemberRole } from "@/enums"

export interface IMember {
    _id: string
    pseudo: string
    firstName: string
    facebookName: string
    role: EMemberRole
    totalScore: number
    rank?: number
    isActiveAccount: boolean
  }