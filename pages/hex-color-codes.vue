<template>
  <div>
    <div class="max-w-lg mx-auto">
      <!-- title -->
      <h1 class="text-center text-2xl font-[Fredoka] uppercase">
        Hex Color Codes
      </h1>

      <!-- description -->
      <p class="text-center mx-auto max-w-[350px] mt-2">
        Find the most popular HEX color codes and convert to other color formats.
      </p>
    </div>

    <div class="max-w-3xl mx-auto mt-8">
      <!-- links -->
      <ul class="grid md:grid-cols-3 gap-2 mt-8">
        <li
          v-for="(item, index) in ntc.names"
          :key="index"
        >
          <NuxtLink
            :to="`/hex/${item[0]}`"
            class="border border-black p-2 flex gap-2 items-center"
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
  </div>
</template>

<script setup lang="ts">
import ntc from '~/utils/ntc.util';

useHead({
  title: 'Hex Color Codes',
  meta: [
    {
      name: 'description',
      content: 'Find the most popular HEX color codes and convert to other color formats.'
    }
  ]
});
</script>
