<template>
  <div class="pt-6">
    <NuxtLoadingIndicator color="#fff" />

    <!-- nav -->
    <nav class="px-4 text-center">
      <WordLogo />
    </nav>

    <!-- content -->
    <main>
      <div class="max-w-6xl px-4 pt-2 pb-8 mx-auto">
        <slot />
      </div>
    </main>

    <!-- footer -->
    <footer class="mt-auto">
      <!-- page links -->
      <ul class="flex flex-wrap items-center justify-center gap-4 mb-4">
        <li>
          <RouterLink to="/" class="underline"> Color Converter </RouterLink>
        </li>
        <li>
          <RouterLink to="/hex-to-rgb" class="underline">
            HEX to RGB
          </RouterLink>
        </li>
      </ul>

      <!-- tim badge -->
      <div class="text-center">
        <p>
          Built by
          <a href="https://timb.com?ref=convertacolor" class="underline">
            timb.com
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { onMounted } from "vue";

onMounted(() => {
  /** @description hack to always set to light mode until we add dark mode properly */
  const colorMode = useLocalStorage("nuxt-color-mode", "light");
  colorMode.value = "light";
  document.documentElement.classList.remove("dark");
});
</script>
