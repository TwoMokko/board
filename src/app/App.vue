<script setup lang="ts">
import { layouts } from "../shared/ui/Layout";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const layout = computed(() => layouts[route.meta.layout] || layouts.default)


</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>


