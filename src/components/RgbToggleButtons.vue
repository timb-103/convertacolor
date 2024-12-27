<template>
  <!-- 8 bit mode button -->
  <button
    v-if="is8BitMode"
    @click.prevent="$emit('toggleMode', false)"
    :style="{
      color: textColor,
    }"
    class="text-xs h-6"
    title="Switch to normalized mode (1.0, 1.0, 1.0)"
  >
    8-bit mode
  </button>

  <!-- normalized mode button -->
  <button
    v-else
    @click.prevent="$emit('toggleMode', true)"
    :style="{
      color: textColor,
    }"
    class="text-xs h-6"
    title="Switch to 8-bit mode (255, 255, 255)"
  >
    Normalized
  </button>
</template>

<script setup lang="ts">
export interface Props {
  is8BitMode: boolean;
  textColor: string;
}

defineProps<Props>();

defineEmits<{ (e: "toggleMode", value: boolean): void }>();
</script>
