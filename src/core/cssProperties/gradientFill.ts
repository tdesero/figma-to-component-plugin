import {
  rgbaColor,
  getTransforms,
  cleanNumber,
  cleanStyleName,
} from "../helpers";

export function gradientFill(fill, styleId, isMultiFill = false) {
  const { gradientStops } = fill;
  const transforms = getTransforms(fill.gradientTransform);

  const gradientMap = gradientStops.map((s) => {
    return `${rgbaColor(s.color, cleanNumber(s.color.a * fill.opacity))} ${
      s.position * 100
    }%`;
  });

  const gradientNameMap = {
    GRADIENT_LINEAR: "linear-gradient",
    GRADIENT_RADIAL: "radial-gradient",
    GRADIENT_ANGULAR: "conic-gradient",
    GRADIENT_DIAMOND: "radial-gradient",
  };

  const gradientSpecificTextMap = {
    GRADIENT_LINEAR: `${cleanNumber(transforms.angle + 90)}deg`,
    GRADIENT_RADIAL: "closest-side",
    GRADIENT_ANGULAR: `from ${cleanNumber(
      transforms.angle + 90
    )}deg at 50% 50%`,
    GRADIENT_DIAMOND: "closest-side",
  };

  const gradient = `${gradientNameMap[fill.type]}(${
    gradientSpecificTextMap[fill.type]
  }, ${gradientMap.join(",")})`;

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);
    return `var(--${styleName}, ${gradient})`;
  }

  return gradient;
}

export default gradientFill;
