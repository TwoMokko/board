import { api } from "../../../shared/api/client.ts"
import { userSchema } from "../../users/model";

export const fetchUser = async () => {
    const response = await api.get(`/auth/me`)
    return userSchema.parse(response)
}

// login и logout написать