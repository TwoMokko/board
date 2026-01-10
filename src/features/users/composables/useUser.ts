import { type User, useUserStore } from "../model"
import { storeToRefs } from "pinia"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { computed, watch } from "vue"
import { fetchUser } from "../api"

export function useUser(userId: number) {
    const userStore = useUserStore()
    const { isLoading: storeLoading, error: storeError } = storeToRefs(userStore)

    const query = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    })


    /** ИЗУЧИТЬ лучше */
    const updateStoreMutation = useMutation({
        mutationFn: async (data: User) => {
            userStore.setUser(data)
            return data
        },
        onError: (error) => {
            userStore.setError(error.message)
        }
    })

    watch(query.data, (data) => {
        if (data) {
            updateStoreMutation.mutate(data)
        }
    })

    const loading = computed(() => query.isPending.value || storeLoading.value)
    const error = computed(() => query.error.value?.message || storeError.value)

    return {
        user: computed(() => userStore.currentUser),
        loading,
        error,
        refetch: query.refetch
    }
}