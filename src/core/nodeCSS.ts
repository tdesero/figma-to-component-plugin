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
  flexPropsForText,
} from "./cssProperties";
import backdropFilterProp from "./cssProperties/backdropFilterProp";
import filterProp from "./cssProperties/filterProp";

export function nodeCSS(node): string {
  console.log("node", node);

  if (node.type?.toString() === "TEXT") {
    return `
      margin: 0;
      ${colorProp(node)}
      text-align: ${node.textAlignHorizontal?.toLowerCase()};
      ${fontProp(node)}
      ${textTransformProp(node)}
      ${textDecorationProp(node)}
      ${opacityProp(node)}
      ${positionProps(node)}
      ${displayProp(node)}
      ${dimensions(node)}
      ${transformProps(node)}
      ${filterProp(node)}
      ${flexPropsForText(node)}
    `;
  } else {
    return `
      margin: 0;
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
      ${transformProps(node)}
      ${overflowProp(node)}
      ${filterProp(node)}
      ${backdropFilterProp(node)}
    `;
  }
}
