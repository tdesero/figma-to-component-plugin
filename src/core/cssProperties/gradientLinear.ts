import { rgbaColor, getTransforms } from "../helpers";

export function gradientLinear(fill) {
  const { gradientStops } = fill;
  const transforms = getTransforms(fill.gradientTransform);

  console.log(fill.gradientTransform);

  const gradientMap = gradientStops.map((s) => {
    return `${rgbaColor(s.color, s.color.a)} ${s.position * 100}%`;
  });

  return `linear-gradient(${transforms.angle + 90}deg, ${gradientMap.join(
    ","
  )})`;
}

export default gradientLinear;
