import { cleanStyleName, rgbToHex } from "./helpers/helpers";

export function getStyles(figma) {
  const styles = figma.getLocalPaintStyles().map(({ name, paints }) => {
    return {
      name: cleanStyleName(name),
      value: rgbToHex(paints?.[0]?.color),
    };
  });

  return styles;
}
