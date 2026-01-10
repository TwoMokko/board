import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { User } from "./schemas.ts"

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<User | null>(null)
    const error = ref<string | null>(null)
    const isLoading = ref<boolean>(false)

    const isAuth = computed(() => !!currentUser.value)

    const setUser = (userData: User) => {
        currentUser.value = userData
    }

    const setError = (errorMessage: string | null) => {
        error.value = errorMessage
        isLoading.value = false
    }


    return {
        currentUser,
        isLoading,
        error,

        isAuth,

        setUser,
        setError
    }
})