<script setup lang="ts">
import MyButton from "../../../shared/ui/Button/MyButton.vue";
</script>

<template>
  chat page

  <MyButton text="test" @click="() => console.log('test')" />
</template>
