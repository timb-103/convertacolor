<template>
  <nav class="text-center my-8 px-4">
    <WordLogo />
  </nav>
  <main class="p-4 pt-0">
    <RouterView />
  </main>
  <footer>
    <!-- page links -->
    <ul class="flex gap-4 flex-wrap items-center justify-center mb-4">
      <li>
        <RouterLink to="/" class="underline">Color Converter</RouterLink>
      </li>
      <li>
        <RouterLink to="/rgb-to-hex" class="underline">RGB to HEX Converter</RouterLink>
      </li>
    </ul>

    <!-- tim badge -->
    <div class="text-center">
      <p>
        Built by
        <a href="https://timb.com?ref=convertacolor" class="underline" >
          timb.com
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import WordLogo from "./components/WordLogo.vue";
</script>
