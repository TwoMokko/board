import { defineStore } from "pinia"
import { ref } from "vue"
import type { User } from "./schemas.ts"

export const useUserStore = defineStore('user', () => {
    const users = ref<User[] | null>(null)
    const error = ref<string | null>(null)
    const isLoading = ref<boolean>(false)

    const setUsers = (userData: User[]) => {
        users.value = userData
        // возможно сделать объект с id? для быстрого поиска
    }

    const setError = (errorMessage: string | null) => {
        error.value = errorMessage
        isLoading.value = false
    }


    return {
        users,
        isLoading,
        error,

        setUsers,
        setError
    }
})