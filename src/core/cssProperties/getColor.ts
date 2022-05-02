import { rgbToHex, rgbaColor, cleanStyleName } from "../helpers";
import { gradientLinear } from "./gradientLinear";

export function getColor(fillOrColor, styleId) {
  if (!fillOrColor || !fillOrColor.visible) {
    return "transparent";
  }

  if (fillOrColor.type === "GRADIENT_LINEAR") {
    return gradientLinear(fillOrColor);
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
