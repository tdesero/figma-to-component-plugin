import { cleanStyleName } from "../helpers";
import { fontShorthand } from "./fontShorthand";
import { fontStyleAsObject } from "./fontStyleAsObject";
import lineHeight from "./lineHeight";

function fontProp(node) {
  const { weight, isItalic } = fontStyleAsObject(node.fontName);

  const fontSize = Number(node.fontSize?.toString()); // toString is needed to convert Symbols into string first (i think)
  const fontFamily = node.fontName.family?.toString();
  const lineHeightStr = lineHeight(node);

  const shorthand = fontShorthand({
    lineHeight: lineHeightStr,
    fontSize,
    weight,
    fontFamily,
    isItalic,
  });

  if (node.textStyleId) {
    const styleName = cleanStyleName(
      figma.getStyleById(node.textStyleId.toString())?.name
    );

    return `font: var(--${styleName}, ${shorthand});`;
  }

  return `font: ${shorthand};`;
}

export default fontProp;
