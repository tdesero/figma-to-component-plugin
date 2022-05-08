import { willBeRenderedAsSVG, cleanStyleName } from "../helpers";
import { getColor } from "./getColor";

export function fillColor(node) {
  if (willBeRenderedAsSVG(node)) return "";

  const fills = node.fills;

  // multiple fills
  if (fills?.length > 1) {
    const fillsAsGradients = fills
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
  return getColor(fills?.[0], node.fillStyleId);
}

export default fillColor;
