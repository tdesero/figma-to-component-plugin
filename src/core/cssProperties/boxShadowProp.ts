import { rgbaColor, willBeRenderedAsSVG, cleanNumber } from "../helpers";

function boxShadowProp(node) {
  if (
    !node.effects ||
    node.effects.length === 0 ||
    willBeRenderedAsSVG(node) ||
    node.type === "GROUP"
  )
    return "";
  const shadows = node.effects.filter(
    (effect) => effect.type === "DROP_SHADOW"
  );
  if (shadows.length === 0) return "";

  let css = "box-shadow: ";
  css += shadows
    .map((s) => {
      return `${cleanNumber(s.offset.x)}px ${cleanNumber(
        s.offset.y
      )}px ${cleanNumber(s.radius)}px ${cleanNumber(s.spread)}px ${rgbaColor(
        s.color,
        s.color.a
      )}`;
    })
    .join(", ");
  return (
    `${
      node.effectStyleId &&
      "/*" + figma.getStyleById(node.effectStyleId)?.name + "*/"
    }` +
    css +
    ";"
  );
}

export default boxShadowProp;
