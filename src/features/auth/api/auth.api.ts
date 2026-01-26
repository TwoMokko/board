import { api } from "../../../shared/api/client.ts"
import { userSchema } from "../../users/model";
import type { LoginResponse, LoginData } from "../model/types.ts";

export const fetchCurrentUser = async () => {
    const response = await api.get(`/auth/me`)
    return userSchema.parse(response)
}

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response
}

export const logout = async (): Promise<void> => {
    await api.get('/auth/logout')
}
// register написать