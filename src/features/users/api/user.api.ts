import { api } from "../../../shared/api/client.ts"
import { userSchema } from "../model"

export const fetchUser = async (userId: number) => {
    const response = await api.get(`/users/${userId}`)
    return userSchema.parse(response)
}