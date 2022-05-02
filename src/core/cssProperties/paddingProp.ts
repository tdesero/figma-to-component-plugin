import { cleanNumber } from "../helpers";

function paddingProp(node) {
  if (
    !node.paddingTop &&
    !node.paddingRight &&
    !node.paddingBottom &&
    !node.paddingLeft
  )
    return "";

  return `padding: ${cleanNumber(node.paddingTop)}px ${cleanNumber(
    node.paddingRight
  )}px ${cleanNumber(node.paddingBottom)}px ${cleanNumber(
    node.paddingLeft
  )}px;`;
}

export default paddingProp;
