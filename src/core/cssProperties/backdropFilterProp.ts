import {
  rgbaColor,
  willBeRenderedAsSVG,
  cleanNumber,
  cleanStyleName,
} from "../helpers";

function backdropFilterProp(node) {
  if (
    !node.effects ||
    node.effects.length === 0 ||
    willBeRenderedAsSVG(node) ||
    node.type === "GROUP"
  )
    return "";

  const styleId = node.effectStyleId;

  const blur = node.effects.filter(
    (effect) => effect.type === "BACKGROUND_BLUR" && effect.visible
  );
  if (blur.length === 0) return "";

  let css = "backdrop-filter: ";
  let value = blur
    .map((b) => {
      return `blur(${cleanNumber(b.radius / 2)}px)`;
    })
    .join(" ");

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);

    value = `var(--${styleName}-backdrop-filter, ${value})`;
  }

  return css + value + ";";
}

export default backdropFilterProp;
