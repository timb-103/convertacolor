<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka]">RGB to HEX</h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[250px] mt-2">
        Convert RGB to HEX color formats.
      </p>

      <form class="max-w-sm mx-auto mt-4 space-y-4">
        <!-- rgb -->
        <div class="relative">
          <!-- rgb toggle mode buttons -->
          <div class="absolute top-0 right-0">
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

        <!-- hex -->
        <InputGroup
          v-model="hex"
          label="HEX"
          placeholder="#FF9200"
          :text-color="textColor"
          @copy="copy(hex)"
          @on-input="handleColorChange(hex, 'hex')"
        />
      </form>

      <!-- spacebar description -->
      <div class="my-8 text-center">
        <p class="font-[Fredoka] text-center text-sm">
          Hit spacebar to convert a random RGB to HEX color
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

const { hex, rgb, rgbNormalized, textColor, is8BitMode, handleColorChange } =
  useColorTools();

const { isCopied, copy } = useCopy();

useHead({
  title: "RGB to HEX – Convert a Color",
  meta: [
    {
      name: "description",
      content: "RGB to HEX color format converter. Free, quick and easy.",
    },
  ],
});
</script>
