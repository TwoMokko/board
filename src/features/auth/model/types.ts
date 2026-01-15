import type { User } from "../../users/model";

export interface AuthResponse {
    success: boolean,
    user_id?: number,
    error?: string,
    token?: string
}

export interface LoginData {
    // email: string
    username: string
    password: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface RegisterData {
    email: string
    password: string
    username: string
}