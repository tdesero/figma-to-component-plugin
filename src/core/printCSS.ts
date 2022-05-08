import { getTreeElementByName } from "./getTreeElementByName";
import { eraseDuplicateCSS } from "./eraseDuplicateCSS";

export function printCSS(tree): string {
  let css = "";

  css += `.${tree.name} {${tree.css}}\n`;

  function theChildren(children, isVariant: boolean = false) {
    children.forEach((treeElement) => {
      let elementCSS = treeElement.css;
      let className = "." + treeElement.name;

      if (isVariant) {
        const baseCSS = getTreeElementByName(tree, treeElement.name)?.css;
        className =
          tree.name === treeElement.name ? "" : "." + treeElement.name;
        if (baseCSS) {
          elementCSS = eraseDuplicateCSS(treeElement.css, baseCSS);
        }
      }

      if (elementCSS !== "" && !treeElement.skipCss) {
        css += `${
          treeElement.baseSelector || ""
        } ${className} {${elementCSS}}\n`;
      }

      // if rendered as svg there are no styles necessary for children
      if (treeElement.willBeRenderedAsSVG) {
        return;
      }

      if (treeElement.textSegments.length > 1) {
        treeElement.textSegments.forEach((s) => {
          css += `.${s.name} {${s.css}}\n`;
        });
      }
      if (treeElement.children.length > 0) {
        theChildren(treeElement.children, isVariant);
      }
    });
  }
  if (tree.textSegments.length > 1) {
    tree.textSegments.forEach((s) => {
      css += `.${s.name} {${s.css}}\n`;
    });
  }
  if (!tree.willBeRenderedAsSVG) {
    theChildren(tree.children);
  }

  if (tree.variants) {
    css += "\n/* variant styles */\n";
    theChildren(tree.variants, true);
  }

  return css;
}
