import { storeToRefs } from "pinia"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { computed } from "vue"
import { fetchCurrentUser } from "../api"
import { useAuthStore } from "../model/store.ts"
import { api } from "../../../shared/api/client.ts"
import type { LoginData } from "../model/types.ts";
import { login } from "../api/auth.api.ts";

export function useAuth() {
    const authStore = useAuthStore()
    const {
        currentUser,
        isLoading,
        isInitialized,
        isAuthenticated
    } = storeToRefs(authStore)

    // const queryClient = useQueryClient()

    const currentUserQuery = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => fetchCurrentUser(),

        enabled: false,
        retry: false,
    })

    const fetchUserMutation = useMutation({
        mutationFn: () => fetchCurrentUser(),
        onSuccess: (userData) => {
            authStore.setUser(userData)
        },
        onError: (error) => {
            authStore.setError(error.message)
            api.clearToken()
            authStore.clear()
        }
    })

    const loginMutation = useMutation({
        mutationFn:  (credentials: LoginData) => login(credentials),
        onMutate: () => {
            authStore.setLoading(true)
        },
        onSuccess: (data) => {
            api.setToken(data.token)
            authStore.setUser(data.user)
            // queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        },
        onError: (error) => {
            authStore.setError(error.message)
        },
        onSettled: () => {
            authStore.setLoading(false)
        }
    })



    const initialize = async () => {
        if (isInitialized.value) return

        if (api.hasToken() && !currentUser.value)
            await fetchUserMutation.mutateAsync()

        authStore.setInitialized()
    }

    const loading = computed(() =>
        isLoading.value ||
        loginMutation.isPending.value ||
        currentUserQuery.isLoading.value
    )

    const error = computed(() =>
        loginMutation.error.value ||
        currentUserQuery.error.value
    )

    return {
        currentUser,
        isAuthenticated,
        loading,
        error,
        isInitialized,

        login: loginMutation.mutate,
        initialize,
        refetchUser: currentUserQuery.refetch
    }
}