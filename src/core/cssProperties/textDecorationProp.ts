function textDecorationProp(node) {
  if (!node.textDecoration) return "";

  const decoMap = {
    STRIKETHROUGH: "line-through",
    UNDERLINE: "underline",
  };

  return decoMap[node.textDecoration]
    ? `text-decoration: ${decoMap[node.textDecoration]};`
    : "";
}

export default textDecorationProp;
