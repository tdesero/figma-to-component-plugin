import { cleanNumber } from "../helpers";

function lineHeight(nodeOrStyle) {
  if (!nodeOrStyle.lineHeight) return "";
  if (nodeOrStyle.lineHeight.unit === "AUTO") return "";

  const unitMap = {
    PIXELS: "px",
    PERCENT: "%",
  };

  const unit = unitMap[nodeOrStyle.lineHeight.unit];
  return `${cleanNumber(nodeOrStyle.lineHeight.value)}${unit}`;
}

export default lineHeight;
