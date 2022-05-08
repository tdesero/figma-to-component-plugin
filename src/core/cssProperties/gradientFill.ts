import { rgbaColor, getTransforms, cleanNumber } from "../helpers";

export function gradientFill(fill) {
  const { gradientStops } = fill;
  const transforms = getTransforms(fill.gradientTransform);

  console.log(fill.gradientTransform);

  const gradientMap = gradientStops.map((s) => {
    return `${rgbaColor(s.color, cleanNumber(s.color.a))} ${s.position * 100}%`;
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

  return `${gradientNameMap[fill.type]}(${
    gradientSpecificTextMap[fill.type]
  }, ${gradientMap.join(",")})`;
}

export default gradientFill;
