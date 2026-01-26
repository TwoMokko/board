<script setup lang="ts">
import { layouts } from "../shared/ui/Layout";
import {computed, onMounted} from "vue";
import { useRoute } from "vue-router";
import {useAuth} from "../features/auth/composables";

const route = useRoute()
const layout = computed(() => layouts[route.meta.layout] || layouts.default)

const { initialize } = useAuth()

onMounted(() => {
  initialize()
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>


