<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka]">
        Color Converter
      </h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[350px] mt-2">
        Convert colors between formats HEX, RGB, HSL and CMYK. Simple, beautiful and fast.
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

        <!-- hsl -->
        <InputGroup
          v-model="hsl"
          label="HSL"
          placeholder="hsl(255, 100%, 50%)"
          :text-color="textColor"
          @copy="copy(hsl)"
          @on-input="onHslChange()"
        />

        <!-- cmyk -->
        <InputGroup
          v-model="cmyk"
          label="CMYK"
          placeholder="cmyk(100%, 0%, 0%, 0%)"
          :text-color="textColor"
          @copy="copy(cmyk)"
          @on-input="onCmykChange()"
        />
      </form>

      <!-- spacebar description -->
      <div class="text-center my-8">
        <p class="font-[Fredoka] text-center text-sm">
          Hit spacebar to convert a random color
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
  cmykToRgb,
  formatCmykString,
  formatHslString,
  formatRgbString,
  getRandomColor,
  getTextColor,
  hexToRgb,
  hslToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  unnormalizeRgb
} from '../utils/color-methods.util';
import InputGroup from '@/components/InputGroup.vue';
import RgbToggleButtons from '@/components/RgbToggleButtons.vue';
import CopiedDrawer from '@/components/CopiedDrawer.vue';

useHead({
  title: 'Convert a Color – HEX, RGB, HSL, CMYK',
  meta: [
    {
      name: 'description',
      content: 'Convert colors between formats HEX, RGB, HSL and CMYK. Simple, beautiful and fast.'
    }
  ]
});

const { space } = useMagicKeys();
const route = useRoute();

const hex = ref('');
const rgb = ref('');
const rgbNormalized = ref('');
const hsl = ref('');
const cmyk = ref('');

const is8BitMode = ref(true);
const copied = ref(false);
const textColor = ref('#000000');

function generateColor(): void {
  const color = getRandomColor();
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

function onHexChange(): void {
  const color = hex.value;
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  rgb.value = formatRgbString(r, g, b);
  rgbNormalized.value = formatRgbString(r, g, b, true);
  hsl.value = formatHslString(h, s, l);
  cmyk.value = formatCmykString(c, m, y, k);

  updateTextColor(color);
}

function onRgbChange(): void {
  const colors =
    rgb.value.match(/-?\d+(\.\d+)?/g)?.map(Number)?.length === 3
      ? (rgb.value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0])
      : [0, 0, 0];

  const [r, g, b] = colors;
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  rgbNormalized.value = formatRgbString(r, g, b, true);
  hex.value = rgbToHex(r, g, b);
  hsl.value = formatHslString(h, s, l);
  cmyk.value = formatCmykString(c, m, y, k);

  updateTextColor(hex.value);
}

function onRgbNormalizedChange(): void {
  const colors =
    rgbNormalized.value.match(/-?\d+(\.\d+)?/g)?.map(Number)?.length === 3
      ? unnormalizeRgb(rgbNormalized.value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [])
      : [0, 0, 0];

  const [r, g, b] = colors;
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  rgb.value = formatRgbString(r, g, b);
  hex.value = rgbToHex(r, g, b);
  hsl.value = formatHslString(h, s, l);
  cmyk.value = formatCmykString(c, m, y, k);

  updateTextColor(hex.value);
}

function onHslChange(): void {
  const colors = hsl.value.match(/\d+/g)?.map(Number);

  const [h, s, l] = colors?.length === 3 ? colors : [0, 0, 0];
  const [r, g, b] = hslToRgb(h, s, l);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  hex.value = rgbToHex(r, g, b);
  rgb.value = formatRgbString(r, g, b);
  rgbNormalized.value = formatRgbString(r, g, b, true);
  cmyk.value = formatCmykString(c, m, y, k);

  updateTextColor(hex.value);
}

function onCmykChange(): void {
  const [c, m, y, k] = cmyk.value.match(/\d+/g)?.map(Number) ?? [];
  const [r, g, b] = cmykToRgb(c, m, y, k);
  const [h, s, l] = rgbToHsl(r, g, b);

  hex.value = rgbToHex(r, g, b);
  rgb.value = formatRgbString(r, g, b);
  rgbNormalized.value = formatRgbString(r, g, b, true);
  hsl.value = formatHslString(h, s, l);

  updateTextColor(hex.value);
}

async function copy(text: string): Promise<void> {
  window.plausible('color:copied');
  await navigator.clipboard.writeText(text);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}

function updateTextColor(hex: string): void {
  const newValue = getTextColor(hex);

  textColor.value = newValue;
  document.body.style.backgroundColor = hex;
  document.body.style.color = newValue;
}

function updateColorFromQuery(): void {
  const hexQuery = route.query?.hex;

  if (hexQuery !== undefined && hexQuery !== null) {
    if (/^[0-9A-F]{6}$/i.test(hexQuery.toString())) {
      hex.value = `#${hexQuery.toString()}`;
      onHexChange();
    }
  }
}

function spacebarHit(): void {
  void navigateTo({
    query: {
      hex: getRandomColor().replace('#', '')
    }
  });

  window.plausible('random-color:generated');
}

onMounted(() => {
  generateColor();
  updateColorFromQuery();
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
