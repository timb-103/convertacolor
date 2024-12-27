<template>
  <p>
    Built by
    <a href="https://timb.com?ref=convertacolor" class="underline" :style="{ color: textColor }">
      timb.com
    </a>
  </p>
</template>

<script setup lang="ts">
export interface Props {
  textColor: string;
}

defineProps<Props>();
</script>
