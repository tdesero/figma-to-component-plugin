function opacityProp(node) {
  if (node.opacity === 1) return "";
  return `opacity: ${node.opacity};`;
}

export default opacityProp;
