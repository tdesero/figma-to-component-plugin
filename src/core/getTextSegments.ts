import { makeSafeForCSS } from "./helpers";
import { textSegmentCSS } from "./textSegmentCSS";

export function getTextSegments(node, componentName, uniqueName): any {
  const segments = node.getStyledTextSegments([
    "fontSize",
    "fontName",
    "textDecoration",
    "textCase",
    "lineHeight",
    "letterSpacing",
    "fills",
    "textStyleId",
    "fillStyleId",
    "listOptions",
    "indentation",
  ]);

  return segments.map((s) => {
    return {
      ...s,
      name: `${uniqueName(makeSafeForCSS(componentName + "-span")).name}`,
      css: textSegmentCSS(s),
    };
  });
}
