import { type User, useUserStore } from "../model"
import { storeToRefs } from "pinia"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { computed, watch } from "vue"
import { fetchUsers } from "../api"

export function useUser() {
    const userStore = useUserStore()
    const { isLoading: storeLoading, error: storeError } = storeToRefs(userStore)

    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
    })


    /** ИЗУЧИТЬ лучше */
    // const queryClient = useQueryClient()
    const updateStoreMutation = useMutation({
        mutationFn: async (data: User[]) => {
            userStore.setUsers(data)
            return data
        },
        onError: (error) => {
            userStore.setError(error.message)
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['users'] })
        // }
    })

    watch(query.data, (data) => {
        if (data) {
            updateStoreMutation.mutate(data)
        }
    })
    /** До сюда */


    const loading = computed(() => query.isPending.value || storeLoading.value)
    const error = computed(() => query.error.value?.message || storeError.value)

    return {
        users: computed(() => userStore.users),
        loading,
        error,
        refetch: query.refetch
    }
}