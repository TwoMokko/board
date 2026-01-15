import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../../users/model";

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null)
    const error = ref<string | null>(null)
    const isLoading = ref<boolean>(false)
    const isInitialized = ref<boolean>(false)

    const setUser = (userData: User) => {
        currentUser.value = userData
    }

    const setError = (errorMessage: string | null) => {
        error.value = errorMessage
        isLoading.value = false
    }

    const clear = () => {
        currentUser.value = null
        error.value = null
        isLoading.value = false
    }

    const setInitialized = () => {
        isInitialized.value = true
    }


    return {
        currentUser,
        isLoading,
        error,
        isInitialized,

        setUser,
        setError,
        clear,
        setInitialized
    }
})