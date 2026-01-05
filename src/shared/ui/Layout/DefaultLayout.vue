<script setup lang="ts">
import Navbar from "../Navbar/Navbar.vue";
</script>

<template>
    <div class="flex justify-between h-svh bg-secondaryLight text-dark py-4 pr-4">
      <Navbar class="flex-none" />
      <main class="bg-secondary flex-auto rounded-xl p-4">
        <slot />
      </main>
    </div>
</template>