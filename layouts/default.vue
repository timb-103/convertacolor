<template>
  <div>
    <NuxtLoadingIndicator color="#fff" />

    <!-- nav -->
    <nav class="text-center my-8 px-4">
      <WordLogo />
    </nav>

    <!-- content -->
    <main>
      <div class="max-w-6xl mx-auto px-4 pt-2 pb-8">
        <slot />
      </div>
    </main>

    <!-- footer -->
    <footer>
      <!-- page links -->
      <ul class="flex gap-4 flex-wrap items-center justify-center mb-4">
        <li>
          <RouterLink
            to="/"
            class="underline"
          >
            Color Converter
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/hex-to-rgb"
            class="underline"
          >
            HEX to RGB
          </RouterLink>
        </li>
      </ul>

      <!-- tim badge -->
      <div class="text-center">
        <p>
          Built by
          <a
            href="https://timb.com?ref=convertacolor"
            class="underline"
          >
            timb.com
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

onMounted(() => {
  /** @description hack to always set to light mode until we add dark mode properly */
  const colorMode = useLocalStorage('nuxt-color-mode', 'light');
  colorMode.value = 'light';
  document.documentElement.classList.remove('dark');
});
</script>
