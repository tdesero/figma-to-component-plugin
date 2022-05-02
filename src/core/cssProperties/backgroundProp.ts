import { fillColor } from "./fillColor";

function backgroundProp(node) {
  const color = fillColor(node);

  if (!color || color === "") {
    return "";
  }

  return `background: ${color};`;
}

export default backgroundProp;
