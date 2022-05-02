import { willBeRenderedAsSVG } from "../helpers";
import { getColor } from "./getColor";

export function fillColor(node) {
  if (willBeRenderedAsSVG(node)) return "";
  //atm only one fill is supported
  const fill = node.fills?.[0];

  return getColor(fill, node.fillStyleId);
}

export default fillColor;
