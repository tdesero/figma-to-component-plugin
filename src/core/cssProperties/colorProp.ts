import { fillColor } from "./fillColor";

function colorProp(node) {
  const color = fillColor(node);

  if (!color || color === "") {
    return "";
  }

  if (color === "transparent") return "";

  return `color: ${color};`;
}

export default colorProp;
