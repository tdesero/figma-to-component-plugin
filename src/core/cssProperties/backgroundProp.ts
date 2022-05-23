import { fillColor } from "./fillColor";

function backgroundProp(node) {
  const color = fillColor(node);

  if (!color || color === "") {
    return "";
  }

  if (color === "transparent") return "";

  return `background: ${color};`;
}

export default backgroundProp;
