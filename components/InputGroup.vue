<template>
  <div class="form-group">
    <!-- label -->
    <label
      for="hex"
      class="text-sm"
    >
      {{ label }}
    </label>

    <!-- input group -->
    <div class="relative">
      <!-- input -->
      <input
        :id="label"
        v-model="model"
        type="text"
        :placeholder="placeholder"
        :style="{
          'border-color': 'currentColor',
          color: 'currentColor',
        }"
        :class="{
          uppercase: label === 'HEX',
        }"
        :disabled="disabled"
        class="bg-transparent border-b w-full py-2 font-semibold text-lg"
        @input="$emit('onInput')"
      >

      <!-- copy button -->
      <div class="absolute right-0 top-2">
        <CopyButton
          fill="currentColor"
          :title="`Copy ${label} color value`"
          @copy="$emit('copy')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyButton from './CopyButton.vue';

export interface Props {
  label: string
  placeholder: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
});
defineEmits<{ (e: 'copy'): void, (e: 'onInput'): void }>();

const model = defineModel<string>();
</script>
