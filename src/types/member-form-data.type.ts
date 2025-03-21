import { EMemberRole } from "@/enums";

export type TAddMemberFormData = {
    firstName: string,
    facebookName:string,
    pseudo:string,
    role: EMemberRole,
    password: string ,
}
export type TModifyMemberFormData = {
    _id: string;
    firstName: string,
    facebookName:string,
    pseudo:string,
    role: EMemberRole,
    password? : string ,
}