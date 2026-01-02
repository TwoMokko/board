<script setup lang="ts">
defineProps<{
  text: string,
  className?: string,
  type?: 'button' | 'submit',
  disabled?: boolean
}>()
</script>

<template>
  <button
    class=""
    :class="className"
    :type="type ?? 'button'"
    :disabled="disabled"
    @click="$emit('handler')"
  >
    {{text}}
  </button>
</template>