import { cleanNumber } from "../helpers";

function marginProp(node) {
  if (
    node !== node.parent.children[0] &&
    node.parent.layoutMode &&
    node.parent.layoutMode !== "NONE" &&
    node.parent.itemSpacing < 0
  ) {
    const val = `${cleanNumber(node.parent.itemSpacing)}px`;
    if (node.parent.layoutMode === "HORIZONTAL") {
      return `margin: 0 0 0 ${val};`;
    } else {
      return `margin: ${val} 0 0 0;`;
    }
  }

  return "";
}

export default marginProp;
