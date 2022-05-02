import { cleanNumber } from "../helpers";

function borderRadiusProp(node) {
  if (node.type === "ELLIPSE") return "border-radius: 50%;";

  if (!node.cornerRadius && !node.topLeftRadius) return "";

  return `border-radius: ${
    typeof node.cornerRadius === "number"
      ? cleanNumber(node.cornerRadius) + "px"
      : `${cleanNumber(node.topLeftRadius)}px ${cleanNumber(
          node.topRightRadius
        )}px ${cleanNumber(node.bottomRightRadius)}px ${cleanNumber(
          node.bottomLeftRadius
        )}px`
  };`;
}

export default borderRadiusProp;
