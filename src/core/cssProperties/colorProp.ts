import { fillColor } from "./fillColor";

function colorProp(node) {
  const color = fillColor(node);

  if (!color || color === "") {
    return "";
  }

  return `color: ${color};`;
}

export default colorProp;
