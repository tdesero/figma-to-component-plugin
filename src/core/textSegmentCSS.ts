import {
  fillColor,
  fontProp,
  textTransformProp,
  textDecorationProp,
} from "./cssProperties";

export function textSegmentCSS(textSegment): string {
  return `
      color: ${fillColor(textSegment)};
      ${fontProp(textSegment)}
      ${textTransformProp(textSegment)}
      ${textDecorationProp(textSegment)}
    `;
}
