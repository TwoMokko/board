import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../../users/model";

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null)
    const isLoading = ref<boolean>(false)
    const isInitialized = ref<boolean>(false)

    const isAuthenticated = computed(() => !!user.value)

    const setUser = (userData: User) => {
        console.log({userData})
        currentUser.value = userData
    }

    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const setError = (err) => {
        error.value = err
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
        isInitialized,

        isAuthenticated,

        setUser,
        setLoading,
        setError,
        clear,
        setInitialized
    }
})