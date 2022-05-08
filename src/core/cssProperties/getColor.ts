import { rgbToHex, rgbaColor, cleanStyleName } from "../helpers";
import { gradientFill } from "./gradientFill";

export function getColor(
  fillOrColor,
  styleId,
  shouldBeRenderedAsGradient = false // to enable multiple fills
) {
  if (shouldBeRenderedAsGradient && (!fillOrColor || !fillOrColor.visible)) {
    return "";
  }
  if (!fillOrColor || !fillOrColor.visible) {
    return "transparent";
  }

  const gradientTypes = [
    "GRADIENT_LINEAR",
    "GRADIENT_RADIAL",
    "GRADIENT_ANGULAR",
    "GRADIENT_DIAMOND",
  ];

  if (gradientTypes.includes(fillOrColor.type)) {
    return gradientFill(fillOrColor);
  }

  if (shouldBeRenderedAsGradient && fillOrColor.type === "SOLID") {
    const c = rgbaColor(fillOrColor.color, fillOrColor.opacity);
    return `linear-gradient(to left, ${c}, ${c})`;
  }

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);

    const color =
      fillOrColor.opacity < 1
        ? rgbaColor(fillOrColor.color, fillOrColor.opacity)
        : rgbToHex(fillOrColor.color);

    return `var(--${styleName}, ${color})`;
  }

  return fillOrColor.opacity < 1
    ? rgbaColor(fillOrColor.color, fillOrColor.opacity)
    : rgbToHex(fillOrColor.color);
}

export default getColor;
