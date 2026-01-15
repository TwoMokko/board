import { storeToRefs } from "pinia"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { computed, watch } from "vue"
import { fetchUser } from "../api"
import { useAuthStore } from "../model/store.ts"
import { api } from "../../../shared/api/client.ts"
import type { User } from "../../users/model";

export function useAuth() {
    const authStore = useAuthStore()
    const { currentUser, isLoading: storeLoading, error: storeError } = storeToRefs(authStore)

    const currentUserQuery = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => fetchUser(),


        // ЗАЧЕМ это
        // enabled: !!api.hasToken(),
        // retry: false,
    })


    // const queryClient = useQueryClient()
    const updateStoreMutation = useMutation({
        mutationFn: async (data: User) => {
            api.setToken(data.token)
            authStore.setUser(data.user)
            return data
        },
        onError: (error) => {
            authStore.setError(error.message)
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['user', userId] })
        // }
    })

    watch(currentUserQuery.data, (data) => {
        if (data) {
            updateStoreMutation.mutate(data)
        }
    })

    // loginMutation использовать из "../api" login() и api.setToken(data.token), authStore.setUser(data.user)
    // logoutMutation использовать из "../api" logout() и api.clearToken(), authStore.clear()
    // registerMutation

    const initialize = async () => {
        if (isInitialized.value) return

        if (api.hasToken() && !currentUser.value) {
            try {
                await currentUserQuery.refetch()
            }
            catch (err) {
                api.clearToken()
                authStore.clear()
            }
        }

        authStore.setInitialized()
    }

    const isAuth = computed(() => !!currentUser.value)
    const loading = computed(() => currentUserQuery.isPending.value || storeLoading.value)
    const error = computed(() => currentUserQuery.error.value?.message || storeError.value)

    return {
        currentUser,
        isAuth,
        loading,
        error,
        initialize,
        refetch: currentUserQuery.refetch
    }
}