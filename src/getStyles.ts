import { cleanStyleName, colorAsHexOrRgba } from "./helpers/helpers";
import {
  fontStyleAsObject,
  lineHeight,
  fontShorthand,
} from "./helpers/propsHelpers";

export function getStyles(figma) {
  const paintStyles = figma.getLocalPaintStyles()?.map(({ name, paints }) => {
    return {
      name: cleanStyleName(name),
      value: colorAsHexOrRgba(paints?.[0]),
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
  console.log("textstyles", textStyles);

  return {
    paintStyles,
    textStyles,
  };
}
