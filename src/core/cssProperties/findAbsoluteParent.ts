export function findAbsoluteParent(node) {
  if (node.parent.type === "GROUP") {
    return findAbsoluteParent(node.parent);
  }
  return node.parent;
}

export default findAbsoluteParent;
