import { EMemberRole } from "@/enums"

export interface IMember {
    _id: string
    email: string
    firstName: string
    facebookName: string
    role: EMemberRole
    password: string
    totalScore: number
  }