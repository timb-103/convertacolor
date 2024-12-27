<template>
  <nav class="text-center my-8 px-4">
    <WordLogo />
  </nav>
  <main class="p-4 pt-0">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import WordLogo from "./components/WordLogo.vue";
</script>
