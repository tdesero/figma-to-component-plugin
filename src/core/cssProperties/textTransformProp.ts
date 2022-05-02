function textTransformProp(node) {
  const caseMap = {
    UPPER: "uppercase",
    LOWER: "lowercase",
  };

  return caseMap[node.textCase]
    ? `text-transform: ${caseMap[node.textCase]};`
    : "";
}

export default textTransformProp;
