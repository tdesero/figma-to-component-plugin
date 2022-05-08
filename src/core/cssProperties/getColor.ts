import {
  rgbToHex,
  rgbaColor,
  cleanStyleName,
  colorAsHexOrRgba,
} from "../helpers";
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

  const color = colorAsHexOrRgba(fillOrColor);

  if (shouldBeRenderedAsGradient && fillOrColor.type === "SOLID") {
    return `linear-gradient(to left, ${color}, ${color})`;
  }

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);

    return `var(--${styleName}, ${color})`;
  }

  return colorAsHexOrRgba(fillOrColor);
}

export default getColor;
