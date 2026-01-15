<script setup lang="ts">
import { layouts } from "../shared/ui/Layout";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {api} from "../shared/api/client.ts";

const route = useRoute()
const layout = computed(() => layouts[route.meta.layout] || layouts.default)

const response = await api.post('/auth/login', { username: 'lana', password: '123456' })
api.setToken(response.token)
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>


