<script setup lang="ts">
import Navbar from "../Navbar/Navbar.vue";
</script>

<template>
    <header>
        <Navbar />
    </header>
    <main>
        <slot />
    </main>
</template>