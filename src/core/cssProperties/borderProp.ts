import { willBeRenderedAsSVG, cleanNumber, valuesAreSame } from "../helpers";
import { strokeColor } from "./strokeColor";

/**
 * CSS Property Functions
 *
 * All Functions ending with Prop or Props will return a css property string ending with a semicolon or an empty string
 * e.g. "background: #12345;"
 */
function borderProp(node) {
  if (willBeRenderedAsSVG(node)) return "";
  if (!node.strokes || !node.strokeWeight || node.strokes.length < 1) return "";

  let borderWidthValue = "";
  const strokeWeights = [
    node.strokeTopWeight,
    node.strokeRightWeight,
    node.strokeBottomWeight,
    node.strokeLeftWeight,
  ];
  if (valuesAreSame(strokeWeights)) {
    borderWidthValue = cleanNumber(node.strokeTopWeight) + "px";
  } else {
    borderWidthValue = strokeWeights
      .map((w) => cleanNumber(w) + "px")
      .join(" ");
  }

  if (node.strokes?.[0]?.type === "GRADIENT_LINEAR") {
    return `
    border-width: ${borderWidthValue}; 
    border-style: solid; 
    border-image: ${strokeColor(node)}; 
    border-image-slice: 1;
    `;
  }

  return `
  border: solid ${strokeColor(node)}; 
  border-width: ${borderWidthValue};
  `;
}

export default borderProp;
