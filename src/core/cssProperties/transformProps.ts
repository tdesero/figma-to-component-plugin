import { getTransforms, willBeRenderedAsSVG, cleanNumber } from "../helpers";

function transformProps(node) {
  const isSVG = willBeRenderedAsSVG(node);

  if (node.type === "GROUP" && !isSVG) {
    return "";
  }

  const transforms = getTransforms(node.relativeTransform);

  const absoluteTransforms = getTransforms(node.absoluteTransform);

  if (
    transforms.angle === 0 &&
    transforms.scaleX === 1 &&
    transforms.scaleY === 1
  ) {
    return "";
  }

  // TODO: check if it is rendered inside an autolayout & fix transform origin...
  if (isSVG) {
    if (!node.absoluteRenderBounds) return;
    return `
      transform: translate(${cleanNumber(
        (absoluteTransforms.translateX - node.absoluteRenderBounds.x) * -1
      )}px, ${cleanNumber(
      (absoluteTransforms.translateY - node.absoluteRenderBounds.y) * -1
    )}px);
    `;
  }

  return `
    transform-origin: 0 0;
    transform: rotate(${cleanNumber(
      transforms.angle * -1,
      3
    )}deg) scale(${cleanNumber(transforms.scaleX, 3)}, ${cleanNumber(
    transforms.scaleY,
    3
  )});
  `;
}

export default transformProps;
