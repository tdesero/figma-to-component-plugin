import { cleanStyleName } from "./helpers";
import {
  fontStyleAsObject,
  lineHeight,
  fontShorthand,
  getColor,
} from "./cssProperties";
import styleColor from "./cssProperties/styleColor";

export function getStyles(figma) {
  const paintStyles = figma.getLocalPaintStyles()?.map(({ name, paints }) => {
    return {
      name: cleanStyleName(name),
      value: styleColor(paints),
    };
  });

  const textStyles = figma.getLocalTextStyles()?.map((style) => {
    const { weight, isItalic } = fontStyleAsObject(style.fontName);

    const fontSize = style.fontSize?.toString();
    const fontFamily = style.fontName.family?.toString();
    const lineHeightStr = lineHeight(style);

    return {
      name: cleanStyleName(style.name),
      value: fontShorthand({
        lineHeight: lineHeightStr,
        fontSize,
        weight,
        fontFamily,
        isItalic,
      }),
    };
  });

  /* TODO: effectStyles */

  return {
    paintStyles,
    textStyles,
  };
}
