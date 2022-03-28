import { cleanStyleName, colorAsHexOrRgba } from "./helpers/helpers";

export function getStyles(figma) {
  const styles = figma.getLocalPaintStyles().map(({ name, paints }) => {
    return {
      name: cleanStyleName(name),
      value: colorAsHexOrRgba(paints?.[0]),
    };
  });

  return styles;
}
