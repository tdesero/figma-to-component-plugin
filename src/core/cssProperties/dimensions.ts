import { willBeRenderedAsSVG, cleanNumber } from "../helpers";

function dimensions(node) {
  // in this case the dimensions are defined inside the svg
  if (willBeRenderedAsSVG(node)) {
    return "";
  }

  /* NOTE: The Order of these if statements is important! */
  let height = "";
  let width = "";

  if (node.layoutMode === "VERTICAL") {
    height =
      node.primaryAxisSizingMode === "AUTO"
        ? "auto"
        : cleanNumber(node.height) + "px";
    width =
      node.counterAxisSizingMode === "AUTO"
        ? "auto"
        : cleanNumber(node.width) + "px";
  }

  if (node.layoutMode === "HORIZONTAL") {
    width =
      node.primaryAxisSizingMode === "AUTO"
        ? "auto"
        : cleanNumber(node.width) + "px";
    height =
      node.counterAxisSizingMode === "AUTO"
        ? "auto"
        : cleanNumber(node.height) + "px";
  }

  if (!node.layoutMode || node.layoutMode === "NONE") {
    height = node.textAutoResize?.toString().includes("HEIGHT")
      ? "auto"
      : cleanNumber(node.height) + "px";
    width = node.textAutoResize?.toString().includes("WIDTH")
      ? "auto"
      : cleanNumber(node.width) + "px";
  }

  if ((!node.children || node.children?.length === 0) && node.type !== "TEXT") {
    height = cleanNumber(node.height) + "px";
    width = cleanNumber(node.width) + "px";
  }

  if (
    (node.parent.layoutMode === "VERTICAL" && node.layoutAlign === "STRETCH") ||
    node.constraints?.horizontal === "STRETCH"
  ) {
    width = "auto";
  }

  if (node.parent.layoutMode === "HORIZONTAL" && node.layoutGrow === 1) {
    width = "auto";
  }

  if (
    (node.parent.layoutMode === "HORIZONTAL" &&
      node.layoutAlign === "STRETCH") ||
    (node.parent.layoutMode === "VERTICAL" && node.layoutGrow === 1) ||
    node.constraints?.vertical === "STRETCH"
  ) {
    height = "auto";
  }

  return [
    width !== "auto" ? `width: ${width};` : undefined,
    height !== "auto" ? `height: ${height};` : undefined,
  ]
    .filter((i) => i) // delete undefined
    .join(" ");
}

export default dimensions;
