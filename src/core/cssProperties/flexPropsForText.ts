function flexPropsForText(node) {
  /* Don't do anything at all if textAlignVertical is set to top */
  if (node.textAlignVertical && node.textAlignVertical === "TOP") return "";

  let css = "display: flex;\n";

  if (node.textAlignVertical === "CENTER") {
    css += "align-items: center;";
  } else {
    css += "align-items: flex-end;";
  }

  // if vertical align is applied i also to additionally add horizontal align...
  const textAlign = node.textAlignHorizontal?.toLowerCase();

  const textToFlexAlignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  css += `justify-content: ${textToFlexAlignMap[textAlign]}`;

  return css;
}

export default flexPropsForText;
