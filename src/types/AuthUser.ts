import { User } from "./User";

export type AuthUser = User & {
    name: string,
    email: string,
    password: string,
    accessToken?: string,
    token?: string
}

