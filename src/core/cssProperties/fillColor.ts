import { willBeRenderedAsSVG, cleanStyleName } from "../helpers";
import { getColor } from "./getColor";

export function fillColor(nodeOrStyle) {
  if (willBeRenderedAsSVG(nodeOrStyle)) return "";

  const fills = nodeOrStyle.fills;

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

    if (nodeOrStyle.fillStyleId) {
      const styleName = cleanStyleName(
        figma.getStyleById(nodeOrStyle.fillStyleId)?.name
      );
      return `var(--${styleName}, ${fillsAsGradients})`;
    }
    return fillsAsGradients;
  }

  // single fill
  return getColor(fills?.[0], nodeOrStyle.fillStyleId);
}

export default fillColor;
