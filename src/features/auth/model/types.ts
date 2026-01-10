export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    success: boolean,
    user_id?: number,
    error?: string,
    token?: string
}