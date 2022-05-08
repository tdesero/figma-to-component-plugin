import {
  rgbaColor,
  willBeRenderedAsSVG,
  cleanNumber,
  cleanStyleName,
} from "../helpers";

function boxShadowProp(node) {
  if (
    !node.effects ||
    node.effects.length === 0 ||
    willBeRenderedAsSVG(node) ||
    node.type === "GROUP"
  )
    return "";

  const styleId = node.effectStyleId;

  const shadowTypes = ["INNER_SHADOW", "DROP_SHADOW"];

  const shadows = node.effects.filter((effect) =>
    shadowTypes.includes(effect.type)
  );
  if (shadows.length === 0) return "";

  let css = "box-shadow: ";
  let value = shadows
    .map((s) => {
      return `${s.type === "INNER_SHADOW" ? "inset" : ""} ${cleanNumber(
        s.offset.x
      )}px ${cleanNumber(s.offset.y)}px ${cleanNumber(
        s.radius
      )}px ${cleanNumber(s.spread)}px ${rgbaColor(s.color, s.color.a)}`;
    })
    .join(", ");

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);

    value = `var(--${styleName}-box-shadow, ${value})`;
  }

  return css + value + ";";
}

export default boxShadowProp;
