import { willBeRenderedAsSVG } from "../helpers";
import { cssFromConstraints } from "./cssFromConstraints";

function positionProps(node) {
  let coord = "";

  if (node.id !== figma.currentPage.selection[0].id) {
    coord = cssFromConstraints(node);
  }

  const positionFromParent = (node) => {
    const selection = figma.currentPage.selection[0];

    if (node.type === "GROUP" && !willBeRenderedAsSVG(node)) {
      return "static;";
    }
    if (node.id === selection.id || node.parent?.type === "COMPONENT_SET") {
      return "relative;";
    }
    return `${
      node.layoutPositioning === "ABSOLUTE" ||
      node.parent.layoutMode === "NONE" ||
      !node.parent.layoutMode
        ? `absolute; ${coord}`
        : "relative;"
    }`;
  };

  return `
      position: ${positionFromParent(node)}
    `;
}

export default positionProps;
