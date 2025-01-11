<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka] uppercase">
        {{ hexParam }} - {{ name }}
      </h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[350px] mt-2">
        Convert <span class="uppercase">{{ hexParam }}</span> ({{ name }}) to HEX, RGB, HSL and CMYK color values.
      </p>

      <form class="max-w-sm mx-auto mt-4 space-y-4">
        <!-- hex -->
        <InputGroup
          v-model="hex"
          label="HEX"
          placeholder="#FF9200"
          :text-color="textColor"
          disabled
          @copy="copy(hex)"
          @on-input="handleColorChange(hex, 'hex')"
        />

        <!-- rgb -->
        <div class="relative">
          <!-- rgb toggle mode buttons -->
          <div class="absolute right-0 top-0">
            <RgbToggleButtons
              :is-8-bit-mode="is8BitMode"
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
            disabled
            @copy="copy(rgb)"
            @on-input="handleColorChange(rgb, 'rgb')"
          />

          <!-- normalized mode -->
          <InputGroup
            v-else
            v-model="rgbNormalized"
            label="RGB"
            placeholder="rgb(1,1,1)"
            :text-color="textColor"
            disabled
            @copy="copy(rgbNormalized)"
            @on-input="handleColorChange(rgbNormalized, 'normalized')"
          />
        </div>

        <!-- hsl -->
        <InputGroup
          v-model="hsl"
          label="HSL"
          placeholder="hsl(255, 100%, 50%)"
          :text-color="textColor"
          disabled
          @copy="copy(hsl)"
          @on-input="handleColorChange(hsl, 'hsl')"
        />

        <!-- cmyk -->
        <InputGroup
          v-model="cmyk"
          label="CMYK"
          placeholder="cmyk(100%, 0%, 0%, 0%)"
          :text-color="textColor"
          disabled
          @copy="copy(cmyk)"
          @on-input="handleColorChange(cmyk, 'cmyk')"
        />
      </form>

      <!-- spacebar description -->
      <div class="text-center mt-8">
        <p class="font-[Fredoka] text-center text-sm">
          Hit spacebar to convert a random color
        </p>
      </div>

      <!-- similar colors -->
      <div class="max-w-sm mx-auto my-8">
        <h2 class="text-lg font-semibold">
          Similar Colors
        </h2>
        <ul class="grid gap-2 mt-2">
          <li
            v-for="(item, index) in similarColors"
            :key="index"
          >
            <NuxtLink
              :to="`/hex/${item[0]}`"
              class="bg-white border border-black p-2 flex gap-2 items-center text-black"
            >
              <span
                :style="{background: `#${item[0]}`}"
                class="inline-block w-10 h-10 border border-black flex-shrink-0"
              />
              <span class="font-semibold">#{{ item[0] }}</span>
              <span class="text-sm">{{ item[1] }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- copied drawer -->
      <CopiedDrawer
        :text-color="textColor"
        :hex="hex"
        :copied="isCopied"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputGroup from '@/components/InputGroup.vue';
import RgbToggleButtons from '@/components/RgbToggleButtons.vue';
import CopiedDrawer from '@/components/CopiedDrawer.vue';
import { useColorTools } from '~/composables/colors.composable';
import ntc from '~/utils/ntc.util';

const { params } = useRoute();
const hexParam = typeof params.hex === 'string' ? `#${params.hex}` : undefined;

if (hexParam === undefined) {
  throw createError({ statusCode: 404, fatal: true });
}

const {
  hex,
  rgb,
  rgbNormalized,
  hsl,
  cmyk,
  textColor,
  is8BitMode,
  similarColors,
  handleColorChange
} = useColorTools(hexParam);

const {
  isCopied,
  copy
} = useCopy();

const name = ntc.name(hexParam)[1];

useHead({
  title: `${hexParam} - ${name}`,
  meta: [
    {
      name: 'description',
      content: `Convert ${hexParam} (${name}) to HEX, RGB, HSL and CMYK color values.`
    }
  ]
});
</script>
