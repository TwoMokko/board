<script setup lang="ts">
import { ref } from "vue";
import { House, MessageCircle, NotepadText, Eye, EyeClosed } from 'lucide-vue-next';
import {logout} from "../../../features/auth/api/auth.api.ts";
import {useRouter} from "vue-router";
import {api} from "../../api/client.ts";

const isCollapse = ref<boolean>(false)

const handleCollapsed = (): void => {
  isCollapse.value = !isCollapse.value
}


const router = useRouter()
const handleLogout = async () => {
  await logout()
  api.clearToken()
  store.clear()
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col gap-6 justify-between px-4" :class="[ isCollapse ? 'w-fit' : 'w-1/6' ]">
    <div>
      {{ isCollapse ? 'B...' : 'BOARD' }}
    </div>
    <nav class="flex flex-col gap-4 flex-auto">
      <RouterLink active-class="text-primary" class="hover:opacity-50 w-fit flex gap-2" :to="{name: 'home'}">
        <House />
        <span :class="{ 'hidden': isCollapse }" class="">home</span>
      </RouterLink>
      <RouterLink active-class="text-primary" class="hover:opacity-50 w-fit flex gap-2" :to="{name: 'news'}">
        <NotepadText />
        <span :class="{ 'hidden': isCollapse }" class="">news</span>
      </RouterLink>
      <RouterLink active-class="text-primary" class="hover:opacity-50 w-fit flex gap-2" :to="{name: 'chat'}">
        <MessageCircle />
        <span :class="{ 'hidden': isCollapse }" class="">chat</span>
      </RouterLink>
    </nav>

    <div @click="handleLogout">logout</div>

    <div @click="handleCollapsed" class="cursor-pointer">
      <EyeClosed v-if="isCollapse" />
      <Eye v-else />
    </div>
  </div>
</template>