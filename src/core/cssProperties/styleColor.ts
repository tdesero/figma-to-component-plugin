import { willBeRenderedAsSVG, cleanStyleName } from "../helpers";
import { getColor } from "./getColor";

export function styleColor(paints) {
  // multiple fills (duplicate from fillColor.ts)
  if (paints?.length > 1) {
    const fillsAsGradients = paints
      .map((fill) => {
        return getColor(fill, false, true);
      })
      .filter((str) => str !== "")
      .filter((str) => str)
      .reverse()
      .join(", ");

    return fillsAsGradients;
  }

  // single fill
  return getColor(paints?.[0], false);
}

export default styleColor;
