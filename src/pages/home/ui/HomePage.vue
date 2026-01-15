<script setup lang="ts">
import { useAuth } from "../../../features/auth/composables";

// const { isPending, isFetching, isError, data, error } = useQuery({
//   queryKey: ['user'],
//   queryFn: () => api.get(`/users/${1}`),
// })

// const { user, loading, error, refetch } = useUser(1)
const { user, isAuth, loading, error } = useAuth()
</script>
<template>
  home page

  <div v-if="loading">data loading...</div>
  <div v-else-if="error" class="text-red-600">data error {{ error.message }}</div>

  <div v-else-if="user">{{ user.username }}</div>

  <div v-else>not user data</div>

</template>