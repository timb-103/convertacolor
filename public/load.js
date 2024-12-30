(function () {
  function rgbToHex(r, g, b) {
    var bin = (r << 16) | (g << 8) | b;
    return "#".concat(bin.toString(16).padStart(6, "0").toUpperCase());
  }
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (c) {
          return c + c;
        })
        .join("");
    }
    var num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  function luminance(r, g, b) {
    var toLinear = function (c) {
      var v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    var R = toLinear(r);
    var G = toLinear(g);
    var B = toLinear(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  function contrastRatio(rgb1, rgb2) {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }
  function adjustColor(rgb, percent) {
    return rgb.map(function (val) {
      return Math.min(255, Math.max(0, Math.round(val + val * percent)));
    });
  }
  function getTextColor(hex) {
    var background = hexToRgb(hex);
    var ratios = [];
    function testColor(baseColor, direction, steps) {
      for (var i = 0; i <= steps; i++) {
        var adjusted = adjustColor(baseColor, i * direction * 0.1);
        var ratio = contrastRatio(background, adjusted);
        ratios.push({
          color: rgbToHex(adjusted[0], adjusted[1], adjusted[2]),
          ratio: ratio,
        });
      }
    }
    testColor([0, 0, 0], 1, 10);
    testColor([255, 255, 255], -1, 10);
    ratios.sort(function (a, b) {
      return b.ratio - a.ratio;
    });
    var bestColor = ratios.find(function (r) {
      return r.ratio >= 7;
    });
    return bestColor !== undefined ? bestColor.color : ratios[0].color;
  }
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max !== min) {
      var d = max - min;
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
  function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var k = Math.min(1 - r, 1 - g, 1 - b);
    if (k === 1) return [0, 0, 0, 100];
    var c = Math.round(((1 - r - k) / (1 - k)) * 100);
    var m = Math.round(((1 - g - k) / (1 - k)) * 100);
    var y = Math.round(((1 - b - k) / (1 - k)) * 100);
    var kRounded = Math.round(k * 100);
    return [c, m, y, kRounded];
  }
  function formatRgbString(r, g, b, isNormalized) {
    if (isNormalized === true) {
      var normalized = normalizeRgb([r, g, b]);
      return "rgb(".concat(normalized.join(","), ")");
    }
    return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
  }
  function formatHslString(h, s, l) {
    return "hsl(".concat(h, ",").concat(s, "%,").concat(l, "%)");
  }
  function formatCmykString(c, m, y, k) {
    return "cmyk("
      .concat(c !== null && c !== void 0 ? c : 0, ",")
      .concat(m !== null && m !== void 0 ? m : 0, ",")
      .concat(y !== null && y !== void 0 ? y : 0, ",")
      .concat(k !== null && k !== void 0 ? k : 0, ")");
  }

  const hex =
    "#" +
    (new URLSearchParams(window.location.search).get("hex") ??
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"));
  const textColor = getTextColor(hex);

  document.colorCache = hex;
  document.textColorCache = textColor;
  document.documentElement.style.setProperty("--color", hex);
  document.documentElement.style.setProperty("--text-color", textColor);

  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  const inputs = new Map([
    ["HEX", hex],
    ["RGB", formatRgbString(r, g, b)],
    ["HSL", formatHslString(h, s, l)],
    ["CMYK", formatCmykString(c, m, y, k)],
  ]);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "INPUT" && inputs.has(node.id)) {
          node.value = inputs.get(node.id);
          inputs.delete(node.id);

          if (inputs.length === 0) {
            observer.disconnect();
          }
        }
      });
    });
  });

  observer.observe(document, { childList: true, subtree: true });
})();
