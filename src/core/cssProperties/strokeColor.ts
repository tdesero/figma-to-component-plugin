import { getColor } from "./getColor";

export function strokeColor(node) {
  const stroke = node.strokes?.[0];

  return getColor(stroke, node.strokeStyleId);
}

export default strokeColor;
