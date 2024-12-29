<template>
  <!-- 8 bit mode button -->
  <button
    v-if="is8BitMode"
    :style="{
      color: 'currentColor',
    }"
    class="text-xs h-7"
    title="Switch to normalized mode (1.0, 1.0, 1.0)"
    @click.prevent="$emit('toggleMode', false)"
  >
    8-bit mode
  </button>

  <!-- normalized mode button -->
  <button
    v-else
    :style="{
      color: 'currentColor',
    }"
    class="text-xs h-7"
    title="Switch to 8-bit mode (255, 255, 255)"
    @click.prevent="$emit('toggleMode', true)"
  >
    Normalized
  </button>
</template>

<script setup lang="ts">
export interface Props {
  is8BitMode: boolean
}

defineProps<Props>();

defineEmits<(e: 'toggleMode', value: boolean) => void>();
</script>
