<template>
  <div class="form-group">
    <!-- label -->
    <label for="hex" class="text-sm">{{ label }}</label>

    <!-- input group -->
    <div class="relative">
      <!-- input -->
      <input
        :id="label"
        type="text"
        :placeholder="placeholder"
        v-model="model"
        :style="{
          'border-color': textColor,
          color: textColor,
        }"
        :class="{
          uppercase: label === 'HEX',
        }"
        @input="$emit('onInput')"
        class="bg-transparent border-b w-full py-2 font-semibold text-lg"
      />

      <!-- copy button -->
      <div class="absolute right-0 top-2">
        <CopyButton :fill="textColor" :title="`Copy ${label} color value`" @copy="$emit('copy')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyButton from "./CopyButton.vue";

export interface Props {
  label: string;
  placeholder: string;
  textColor: string;
}

defineProps<Props>();
defineEmits<{ (e: "copy"): void; (e: "onInput"): void }>();

const model = defineModel<string>();
</script>
