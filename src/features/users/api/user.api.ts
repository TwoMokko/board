import { api } from "../../../shared/api/client.ts"
import { usersArraySchema } from "../model"

export const fetchUsers = async () => {
    const response = await api.get(`/users`)
    return usersArraySchema.parse(response)
}