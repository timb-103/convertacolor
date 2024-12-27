<template>
  <div
    class="fixed bottom-0 left-0 w-full text-center transition-all p-4"
    :style="{
      transform: `translateY(${copied ? '0%' : '100%'})`,
      background: textColor,
      color: hex,
    }"
  >
    <p class="font-[Fredoka]">Copied!</p>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  copied: boolean;
  textColor: string;
  hex: string;
}

defineProps<Props>();
</script>
