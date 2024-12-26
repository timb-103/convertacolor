function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`; // Ensures 6 characters
  }

// Converts RGB values to a HEX color string
function rgbToHex(r, g, b) {
    const bin = (r << 16) | (g << 8) | b;
    return '#' + (bin.toString(16).padStart(6, '0')).toUpperCase();
}

// Converts a HEX color string to RGB values
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Converts RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Converts HSL to RGB
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToCmyk(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    // Calculate K
    const k = Math.min(1 - r, 1 - g, 1 - b);

    // Handle black (0, 0, 0) case
    if (k === 1) return [0, 0, 0, 100];

    // Calculate CMY
    const c = Math.round(((1 - r - k) / (1 - k)) * 100);
    const m = Math.round(((1 - g - k) / (1 - k)) * 100);
    const y = Math.round(((1 - b - k) / (1 - k)) * 100);
    const kRounded = Math.round(k * 100);

    return [c, m, y, kRounded];
}

function cmykToRgb(c, m, y, k) {
    c = c / 100;
		m = m / 100;
		y = y / 100;
		k = k / 100;
		var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		var b = 1 - Math.min( 1, y * ( 1 - k ) + k );
		r = Math.round( r * 255 );
		g = Math.round( g * 255 );
		b = Math.round( b * 255 );
		return [r, g, b];
}

function extractRGB(color) {
    // Remove whitespaces and match RGB values
    const match = color.replace(/\s+/g, '').match(/^rgb\\((\\d+),(\\d+),(\\d+)\\)$/);
    if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return [r, g, b];
    }
    return null; // Return null if the input is invalid
}

function formatRgbString(r, g, b, isNormalized) {
    if (isNormalized) {
        const normalized = normalizeRgb([r,g,b])
        return `rgb(${normalized.join(',')})`
    }
    return `rgb(${r},${g},${b})`
}

function formatHslString(h, s, l) {
    return `hsl(${h},${s}%,${l}%)` 
}

function formatCmykString(c, m, y, k) {
    return `cmyk(${c ?? 0},${m ?? 0},${y ?? 0},${k ?? 0})` 
}

// Blends two colors by a percentage
function blendColors(c0, c1, p) {
    const f = hexToRgb(c0);
    const t = hexToRgb(c1);
    const R = Math.round((t[0] - f[0]) * p + f[0]);
    const G = Math.round((t[1] - f[1]) * p + f[1]);
    const B = Math.round((t[2] - f[2]) * p + f[2]);
    return rgbToHex(R, G, B);
}

// Calculates lightness based on RGB values
function rgbLightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Generates a softer contrasting text color
function getTextColor(hex) {
    const rgb = hexToRgb(hex);
    const lightness = rgbLightness(rgb[0], rgb[1], rgb[2]);
    if (lightness < 180) {
        return blendColors(hex, '#FFFFFF', 0.9);
    } else {
        return blendColors(hex, '#000000', 0.9);
    }
}

// Generates a random RGB color
function randomColor() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

// Normalizes RGB values (0-1 range)
function normalizeRgb(rgb) {
    return rgb.map(val => parseFloat((val / 255).toFixed(2)));
}

// Un-normalizes RGB values (0-255 range)
function unnormalizeRgb(rgb) {
    return rgb.map(val => Math.round(val * 255));
}
