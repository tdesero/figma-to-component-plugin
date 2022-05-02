import { cleanNumber } from "../helpers";

function displayProp(node) {
  const flexShrinkGrow = node.layoutGrow === 1 ? "flex: 1;" : shrink();

  function shrink() {
    return !(node.type === "TEXT") && !(node.primaryAxisSizingMode === "AUTO")
      ? "flex-shrink: 0;"
      : "";
  }

  const layoutAlign =
    node.layoutAlign === "STRETCH" ? "align-self: stretch;" : "";

  const alignmentMap = {
    MIN: "flex-start",
    MAX: "flex-end",
    CENTER: "center",
    SPACE_BETWEEN: "space-between",
  };

  const flexProps = (direction) => {
    return `
      display: flex;
      flex-direction: ${direction};
      gap: ${cleanNumber(node.itemSpacing)}px;
      align-items: ${alignmentMap[node.counterAxisAlignItems]};
      justify-content: ${alignmentMap[node.primaryAxisAlignItems]};
    `;
  };

  let layoutProps = "";
  if (node.layoutMode === "VERTICAL") {
    layoutProps = flexProps("column");
  }

  if (node.layoutMode === "HORIZONTAL") {
    layoutProps = flexProps("row");
  }

  if (
    node.parent.layoutMode === "HORIZONTAL" ||
    node.parent.layoutMode === "VERTICAL"
  ) {
    layoutProps += layoutAlign + flexShrinkGrow;
  }

  return layoutProps;
}

export default displayProp;
