import {
  borderProp,
  displayProp,
  paddingProp,
  transformProps,
  borderRadiusProp,
  boxShadowProp,
  dimensions,
  positionProps,
  overflowProp,
  opacityProp,
  fontProp,
  textTransformProp,
  textDecorationProp,
  backgroundProp,
  colorProp,
} from "./cssProperties";

export function nodeCSS(node): string {
  console.log("node", node);

  if (node.type?.toString() === "TEXT") {
    return `
      ${colorProp(node)}
      text-align: ${node.textAlignHorizontal?.toLowerCase()};
      ${fontProp(node)}
      ${textTransformProp(node)}
      ${textDecorationProp(node)}
      ${opacityProp(node)}
      ${positionProps(node)}
      ${displayProp(node)}
      ${dimensions(node)}
      margin: 0;
      ${transformProps(node)}
    `;
  } else {
    return `
      box-sizing: border-box;
      ${backgroundProp(node)}
      ${borderRadiusProp(node)}
      ${borderProp(node)}
      ${opacityProp(node)}
      ${paddingProp(node)}
      ${displayProp(node)}
      ${dimensions(node)}
      ${positionProps(node)}
      ${boxShadowProp(node)}
      margin: 0;
      ${transformProps(node)}
      ${overflowProp(node)}
    `;
  }
}
