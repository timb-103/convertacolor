// Generates a random HEX color
export function getRandomColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

// Converts RGB values to a HEX color string
export function rgbToHex(r: number, g: number, b: number): string {
  const bin = (r << 16) | (g << 8) | b;
  return `#${bin.toString(16).padStart(6, '0').toUpperCase()}`;
}

// Converts a HEX color string to RGB values
export function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Converts RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Converts HSL to RGB
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number): number => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

// Converts RGB to CMYK
export function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = Math.min(1 - r, 1 - g, 1 - b);
  if (k === 1) return [0, 0, 0, 100];

  const c = Math.round(((1 - r - k) / (1 - k)) * 100);
  const m = Math.round(((1 - g - k) / (1 - k)) * 100);
  const y = Math.round(((1 - b - k) / (1 - k)) * 100);
  const kRounded = Math.round(k * 100);

  return [c, m, y, kRounded];
}

// Converts CMYK to RGB
export function cmykToRgb(c: number, m: number, y: number, k: number): [number, number, number] {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;

  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));

  return [r, g, b];
}

// Extracts RGB values from a string
export function extractRGB(color: string): [number, number, number] | null {
  const match = color.replace(/\s+/g, '').match(/^rgb\((\d+),(\d+),(\d+)\)$/);
  if (match !== null) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    return [r, g, b];
  }
  return null;
}

// Formats RGB string
export function formatRgbString(r: number, g: number, b: number, isNormalized?: boolean): string {
  if (isNormalized === true) {
    const normalized = normalizeRgb([r, g, b]);
    return `rgb(${normalized.join(',')})`;
  }
  return `rgb(${r},${g},${b})`;
}

// Formats HSL string
export function formatHslString(h: number, s: number, l: number): string {
  return `hsl(${h},${s}%,${l}%)`;
}

// Formats CMYK string
export function formatCmykString(c: number, m: number, y: number, k: number): string {
  return `cmyk(${c ?? 0},${m ?? 0},${y ?? 0},${k ?? 0})`;
}

// Blends two colors by a percentage
export function blendColors(c0: string, c1: string, p: number): string {
  const f = hexToRgb(c0);
  const t = hexToRgb(c1);
  const R = Math.round((t[0] - f[0]) * p + f[0]);
  const G = Math.round((t[1] - f[1]) * p + f[1]);
  const B = Math.round((t[2] - f[2]) * p + f[2]);
  return rgbToHex(R, G, B);
}

// Calculates lightness based on RGB values
export function rgbLightness(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculates relative luminance
export function luminance(r: number, g: number, b: number): number {
  const toLinear = (c: number): number => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Calculates contrast ratio
export function contrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Lightens or darkens a color by a percentage
export function adjustColor(
  rgb: [number, number, number],
  percent: number
): [number, number, number] {
  return rgb.map((val) => Math.min(255, Math.max(0, Math.round(val + val * percent)))) as [
    number,
    number,
    number,
  ];
}

// Selects text color with the best contrast
export function getTextColor(hex: string): string {
  const background = hexToRgb(hex);
  const ratios: Array<{ color: string, ratio: number }> = [];

  function testColor(baseColor: [number, number, number], direction: number, steps: number): void {
    for (let i = 0; i <= steps; i++) {
      const adjusted = adjustColor(baseColor, i * direction * 0.1);
      const ratio = contrastRatio(background, adjusted);
      ratios.push({ color: rgbToHex(adjusted[0], adjusted[1], adjusted[2]), ratio });
    }
  }

  testColor([0, 0, 0], 1, 10);
  testColor([255, 255, 255], -1, 10);

  ratios.sort((a, b) => b.ratio - a.ratio);
  const bestColor = ratios.find((r) => r.ratio >= 7);
  return bestColor !== undefined ? bestColor.color : ratios[0].color;
}

// Normalizes RGB values (0-1 range)
export function normalizeRgb(rgb: [number, number, number]): string[] {
  return rgb.map((val) => parseFloat((val / 255).toFixed(2)).toString());
}

// Un-normalizes RGB values (0-255 range)
export function unnormalizeRgb(rgb: number[]): [number, number, number] {
  return rgb.map((val) => Math.round(val * 255)) as [number, number, number];
}

export function validateHex(v: string): boolean {
  let color2 = '';
  const el = document.createElement('div');
  el.style.borderColor = v;

  color2 = el.style.borderColor;

  if (color2.length === 0) return false;

  return true;
}
