import { cleanNumber } from "../helpers";
import { findAbsoluteParent } from "./findAbsoluteParent";

export function cssFromConstraints(node) {
  let coord = "";

  switch (node.constraints?.horizontal) {
    case "MAX":
      coord += `right: ${cleanNumber(
        findAbsoluteParent(node).width - node.width - node.x
      )}px;`;
      break;
    case "STRETCH":
      coord += `right: ${cleanNumber(
        findAbsoluteParent(node).width - node.width - node.x
      )}px; left: ${node.x}px;`;
      break;
    case "CENTER":
      coord += `left: calc(50% - ${cleanNumber(
        findAbsoluteParent(node).width / 2 - node.x
      )}px);`;
      break;
    default:
      coord += `left: ${cleanNumber(node.x)}px;`;
  }

  switch (node.constraints?.vertical) {
    case "MAX":
      coord += `bottom: ${cleanNumber(
        findAbsoluteParent(node).height - node.height - node.y
      )}px;`;
      break;
    case "STRETCH":
      coord += `bottom: ${cleanNumber(
        findAbsoluteParent(node).height - node.height - node.y
      )}px; top: ${node.y}px;`;
      break;
    case "CENTER":
      coord += `top: calc(50% - ${cleanNumber(
        findAbsoluteParent(node).height / 2 - node.y
      )}px);`;
      break;
    default:
      coord += `top: ${cleanNumber(node.y)}px;`;
  }

  return coord;
}

export default cssFromConstraints;
