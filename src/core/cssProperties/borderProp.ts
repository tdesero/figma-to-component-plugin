import { willBeRenderedAsSVG, cleanNumber } from "../helpers";
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

  if (node.strokes?.[0]?.type === "GRADIENT_LINEAR") {
    return `
    border-width: ${cleanNumber(node.strokeWeight)}px; 
    border-style: solid; 
    border-image: ${strokeColor(node)}; 
    border-image-slice: 1;
    `;
  }

  return `border: ${cleanNumber(node.strokeWeight)}px solid ${strokeColor(
    node
  )};`;
}

export default borderProp;
