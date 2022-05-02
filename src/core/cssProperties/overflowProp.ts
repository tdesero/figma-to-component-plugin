import { willBeRenderedAsSVG } from "../helpers";

function overflowProp(node) {
  if (willBeRenderedAsSVG(node)) return "overflow: visible;";

  return node.clipsContent ? "overflow: hidden;" : "";
}

export default overflowProp;
