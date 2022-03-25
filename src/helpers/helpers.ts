/* helpers */
export function componentToHex(c): String {
  var hex = Math.round(c * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function componentTo255(c) {
  return Math.round(c * 255);
}

export function rgbToHex(rgb): String {
  if (typeof rgb !== "object") return;
  const { r, g, b, a } = rgb;

  if (!a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
}

export function rgbaColor({ r, g, b }, a) {
  return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(
    b
  )}, ${a})`;
}

export function escapeHtml(unsafe): String {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function makeSafeForCSS(name) {
  return name.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return s.toLowerCase();
    return "-";
  });
}

/**
 * Returns all relevant transformation information from a (figma) transform matrix
 */
export function getTransforms(fm) {
  const m = [fm[0][0], fm[0][1], fm[0][2], fm[1][0], fm[1][1], fm[1][2]];

  var angle = Math.atan2(m[1], m[0]),
    denom = Math.pow(m[0], 2) + Math.pow(m[1], 2),
    scaleX = Math.sqrt(denom),
    scaleY = (m[0] * m[3] - m[2] * m[1]) / scaleX,
    skewX = Math.atan2(m[0] * m[2] + m[1] * m[3], denom);
  return {
    angle: angle / (Math.PI / 180), // this is rotation angle in degrees
    scaleX: scaleX, // scaleX factor
    scaleY: scaleY, // scaleY factor
    skewX: skewX / (Math.PI / 180), // skewX angle degrees
    skewY: 0, // skewY angle degrees
    translateX: m[4], // translation point  x
    translateY: m[5], // translation point  y
  };
}
/* helpers end */
