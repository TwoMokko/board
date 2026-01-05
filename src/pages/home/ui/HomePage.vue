<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query'
//
// export const useUser = (userId) => {
//   return useQuery({
//     queryKey: ['user', userId],
//     queryFn: async () => {
//       const response = await fetch(`/api/user.php?id=${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//
//       if (!response.ok) {
//         throw new Error('Failed to fetch user')
//       }
//
//       return response.json()
//     },
//     enabled: !!userId, // Запрос выполнится только если есть userId
//     staleTime: 5 * 60 * 1000, // 5 минут данные "свежие"
//   })
// }
//
// // Использование в компоненте:
// const { data: user, isLoading } = useUser(1)

import {onMounted, ref} from "vue";
const data = ref({})

onMounted(async () => {
  const resp = await fetch('http://localhost:8000/users/1');
  data.value = resp.json()

  console.log(data.value)
})
</script>
<template>
  home page
</template>