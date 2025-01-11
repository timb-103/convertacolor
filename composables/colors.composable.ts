import { useMagicKeys } from '@vueuse/core';
import {
  cmykToRgb,
  formatCmykString,
  formatHslString,
  formatRgbString,
  getTextColor,
  hexToRgb,
  hslToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  unnormalizeRgb
} from '@/utils/color-methods.util';
import ntc, { type ColorNameEntry } from '~/utils/ntc.util';

interface ColorTools {
  hex: Ref<string>
  rgb: Ref<string>
  rgbNormalized: Ref<string>
  hsl: Ref<string>
  cmyk: Ref<string>
  textColor: Ref<string>
  is8BitMode: Ref<boolean>
  similarColors: Ref<ColorNameEntry[]>
  generateColor: (color: string) => void
  initialize: (color?: string) => void
  handleColorChange: (
    input: string,
    type: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'normalized'
  ) => void
}

export function useColorTools(initialHex?: string): ColorTools {
  const { space } = useMagicKeys();
  // const route = useRoute();

  const hex = ref<string>('');
  const rgb = ref<string>('');
  const rgbNormalized = ref<string>('');
  const hsl = ref<string>('');
  const cmyk = ref<string>('');
  const is8BitMode = ref<boolean>(true);
  const textColor = ref<string>('');
  const name = computed(() => ntc.name(hex.value)[1]);
  const nameIndex = computed(() => ntc.names.findIndex(v => v[1] === name.value));

  const similarColors = computed(() =>
    [
      ntc.names[nameIndex.value - 2],
      ntc.names[nameIndex.value - 1],
      ntc.names[nameIndex.value + 1],
      ntc.names[nameIndex.value + 2]
    ].filter(v => v !== undefined)
  );

  function initialize(color?: string): void {
    generateColor(color ?? getRandomColor());
  }

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

  function updateTextColor(color: string): void {
    const newValue = getTextColor(color);
    textColor.value = newValue;

    const colorValid = validateHex(color);

    // wtf eslit??
    if (colorValid === true) {
      document.documentElement.style.setProperty('--color', color);
      document.documentElement.style.setProperty('--text-color', newValue);
    }
  }

  function handleColorChange(
    input: string,
    type: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'normalized'
  ): void {
    switch (type) {
      case 'hex': {
        const color = input;
        generateColor(color);
        break;
      }
      case 'rgb': {
        const [r, g, b] = input.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
        generateColor(rgbToHex(r, g, b));
        break;
      }
      case 'normalized': {
        const normalizedValues = input.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
        const [r, g, b] = unnormalizeRgb(normalizedValues);
        generateColor(rgbToHex(r, g, b));
        break;
      }
      case 'hsl': {
        const [h, s, l] = input.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
        const [r, g, b] = hslToRgb(h, s, l);
        generateColor(rgbToHex(r, g, b));
        break;
      }
      case 'cmyk': {
        const [c, m, y, k] = input.match(/\d+/g)?.map(Number) ?? [0, 0, 0, 0];
        const [r, g, b] = cmykToRgb(c, m, y, k);
        generateColor(rgbToHex(r, g, b));
        break;
      }
    }
  }

  watch(space, async (v) => {
    if (v) {
      initialize();

      await navigateTo(`/hex/${hex.value.replace('#', '')}`);

      window.plausible('random-color:generated');
    }
  });

  onMounted(() => {
    const currentColor = (document as any).colorCache as string;
    (document as any).colorCache = undefined;
    initialize(
      initialHex ?? currentColor
    );
  });

  return {
    hex,
    rgb,
    rgbNormalized,
    hsl,
    cmyk,
    textColor,
    is8BitMode,
    similarColors,
    initialize,
    generateColor,
    handleColorChange
  };
}
