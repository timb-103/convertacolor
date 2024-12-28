<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka]">
        HEX to RGB
      </h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[250px] mt-2">
        Convert HEX to RGB color formats.
      </p>

      <form class="max-w-sm mx-auto mt-4 space-y-4">
        <!-- hex -->
        <InputGroup
          v-model="hex"
          label="HEX"
          placeholder="#FF9200"
          :text-color="textColor"
          @copy="copy(hex)"
          @on-input="onHexChange()"
        />

        <!-- rgb -->
        <div class="relative">
          <!-- rgb toggle mode buttons -->
          <div class="absolute right-0 top-0">
            <RgbToggleButtons
              :is-8-bit-mode="is8BitMode"
              :text-color="textColor"
              @toggleMode="(value) => (is8BitMode = value)"
            />
          </div>

          <!-- 8 bit mode-->
          <InputGroup
            v-if="is8BitMode"
            v-model="rgb"
            label="RGB"
            placeholder="rgb(255,255,255)"
            :text-color="textColor"
            @copy="copy(rgb)"
            @on-input="onRgbChange()"
          />

          <!-- normalized mode -->
          <InputGroup
            v-else
            v-model="rgbNormalized"
            label="RGB"
            placeholder="rgb(1,1,1)"
            :text-color="textColor"
            @copy="copy(rgbNormalized)"
            @on-input="onRgbNormalizedChange()"
          />
        </div>
      </form>

      <!-- spacebar description -->
      <div class="text-center my-8">
        <p class="font-[Fredoka] text-center text-sm">
          Hit spacebar to convert a random HEX to RGB color
        </p>
      </div>

      <!-- copied drawer -->
      <CopiedDrawer
        :text-color="textColor"
        :hex="hex"
        :copied="copied"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import {
  formatCmykString,
  formatHslString,
  formatRgbString,
  getRandomColor,
  getTextColor,
  hexToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  unnormalizeRgb
} from '../utils/color-methods.util';
import InputGroup from '@/components/InputGroup.vue';
import RgbToggleButtons from '@/components/RgbToggleButtons.vue';
import CopiedDrawer from '@/components/CopiedDrawer.vue';

const { space } = useMagicKeys();
const route = useRoute();

// Reactive states
const hex = ref('');
const rgb = ref('');
const rgbNormalized = ref('');
const hsl = ref('');
const cmyk = ref('');
const is8BitMode = ref(true);
const copied = ref(false);
const textColor = ref('');

// Generate a random color during SSR
const initialColor = getRandomColor();
const initialTextColor = getTextColor(initialColor);

// Inject initial styles to prevent flash
useHead({
  title: 'HEX to RGB – Convert a Color',
  meta: [
    {
      name: 'description',
      content: 'HEX to RGB color format converter. Free, quick and easy.'
    }
  ],
  style: [
    {
      children: `
        body {
          background-color: ${initialColor};
          color: ${initialTextColor};
        }
      `
    }
  ]
});

// Generate and update color values
function generateColor(color: string): void {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  hex.value = color;
  rgb.value = formatRgbString(r, g, b);
  rgbNormalized.value = formatRgbString(r, g, b, true);
  hsl.value = formatHslString(h, s, l);
  cmyk.value = formatCmykString(c, m, y, k);

  updateTextColor(color);
}

// Update text and background colors
function updateTextColor(color: string): void {
  const newValue = getTextColor(color);
  textColor.value = newValue;
  document.body.style.backgroundColor = color;
  document.body.style.color = newValue;
}

// Handle input changes
function onHexChange(): void {
  generateColor(hex.value);
}

function onRgbChange(): void {
  const colors = rgb.value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  const [r, g, b] = colors;
  generateColor(rgbToHex(r, g, b));
}

function onRgbNormalizedChange(): void {
  const colors = rgbNormalized.value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  const [r, g, b] = unnormalizeRgb(colors);
  generateColor(rgbToHex(r, g, b));
}

// Copy text to clipboard
async function copy(text: string): Promise<void> {
  window.plausible('color:copied');
  await navigator.clipboard.writeText(text);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}

// Handle query parameters
function updateColorFromQuery(): void {
  const hexQuery = route.query?.hex?.toString();
  if (hexQuery !== undefined && /^[0-9A-F]{6}$/i.test(hexQuery)) {
    generateColor(`#${hexQuery}`);
  }
}

// Generate random color on spacebar hit
function spacebarHit(): void {
  const newColor = getRandomColor();
  generateColor(newColor);
  void navigateTo({ query: { hex: newColor.replace('#', '') } });
  window.plausible('random-color:generated');
}

// Lifecycle hooks
onMounted(() => {
  const hexQuery = route.query?.hex?.toString();
  if (hexQuery !== undefined && /^[0-9A-F]{6}$/i.test(hexQuery)) {
    generateColor(`#${hexQuery}`);
  } else {
    generateColor(initialColor); // Use pre-generated color during SSR
  }
});

watch(space, (v) => {
  if (v) {
    spacebarHit();
  }
});

watch(route, () => {
  updateColorFromQuery();
});
</script>
