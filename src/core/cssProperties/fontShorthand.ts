import { cleanNumber } from "../helpers";

export function fontShorthand({
  lineHeight,
  fontSize,
  weight,
  fontFamily,
  isItalic,
}) {
  const italic = isItalic ? "italic " : "";
  return `${weight} ${italic}${cleanNumber(fontSize)}px${
    lineHeight !== "" ? "/" + lineHeight : ""
  } '${fontFamily}'`;
}

export default fontShorthand;
