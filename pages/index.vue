<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka]">Color Converter</h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[350px] mt-2">
        Convert colors between formats HEX, RGB, HSL and CMYK. Simple, beautiful
        and fast.
      </p>

      <form class="max-w-sm mx-auto mt-4 space-y-4">
        <!-- hex -->
        <InputGroup
          v-model="hex"
          label="HEX"
          placeholder="#FF9200"
          :text-color="textColor"
          @copy="copy(hex)"
          @on-input="handleColorChange(hex, 'hex')"
        />

        <!-- rgb -->
        <div class="relative">
          <!-- rgb toggle mode buttons -->
          <div class="absolute top-0 right-0">
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
          @copy="copy(hsl)"
          @on-input="handleColorChange(hsl, 'hsl')"
        />

        <!-- cmyk -->
        <InputGroup
          v-model="cmyk"
          label="CMYK"
          placeholder="cmyk(100%, 0%, 0%, 0%)"
          :text-color="textColor"
          @copy="copy(cmyk)"
          @on-input="handleColorChange(cmyk, 'cmyk')"
        />
      </form>

      <!-- spacebar description -->
      <div class="my-8 text-center">
        <p class="font-[Fredoka] text-center text-sm">
          Hit spacebar to convert a random color
        </p>
      </div>

      <!-- copied drawer -->
      <CopiedDrawer :text-color="textColor" :hex="hex" :copied="isCopied" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputGroup from "@/components/InputGroup.vue";
import RgbToggleButtons from "@/components/RgbToggleButtons.vue";
import CopiedDrawer from "@/components/CopiedDrawer.vue";
import { useColorTools } from "~/composables/colors.composable";

const {
  hex,
  rgb,
  rgbNormalized,
  hsl,
  cmyk,
  textColor,
  is8BitMode,
  handleColorChange,
} = useColorTools();

const { isCopied, copy } = useCopy();

useHead({
  title: "Convert a Color – HEX, RGB, HSL, CMYK",
  meta: [
    {
      name: "description",
      content:
        "Convert colors between formats HEX, RGB, HSL and CMYK. Simple, beautiful and fast.",
    },
  ],
});
</script>
