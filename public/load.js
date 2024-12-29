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

  const hex =
    "#" +
    (new URLSearchParams(window.location.search).get("hex") ??
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"));
  const textColor = getTextColor(hex);
  document.write(
    `<style>body { background-color: ${hex}; color: ${textColor}; }</style>`
  );
  document.write('<meta name="bg-color" content="' + hex + '">');
})();
