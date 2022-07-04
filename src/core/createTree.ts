import {
  cleanComponentPropertyName,
  makeSafeForCSS,
  willBeRenderedAsSVG,
} from "./helpers";
import { nodeCSS } from "./nodeCSS";
import { getTreeElementByProperty } from "./getTreeElementByProperty";
import { getTextSegments } from "./getTextSegments";
import { PARAMETERS, SETTINGS } from "../constants";

export function createTree(
  selection,
  { cssStyle }
): {
  name: any;
  shortName: any;
  skipCss: boolean;
  css: any;
  willBeRenderedAsSVG: boolean;
  children: any[];
  type: any;
  characters: any;
  originalNode: any;
  textSegments: any[];
  baseSelector: string;
  variants: any[];
} {
  let componentName = "component";

  const selectionNode = <any>selection[0];

  const isComponentSet = selectionNode.type === "COMPONENT_SET";
  const originalNode = isComponentSet
    ? selectionNode.defaultVariant
    : selectionNode;

  // Only to prevent duplicate Names
  let allNames = [];

  function uniqueName(className, n = 1, css = null) {
    const suffix = n > 1 ? n : "";
    if (allNames.includes(className + suffix)) {
      // check if there is already a css class with that name
      if (css) {
        const elementWithSameName = getTreeElementByProperty(
          tree,
          "shortName",
          className + suffix
        );
        if (
          elementWithSameName?.css === css &&
          !elementWithSameName.willBeRenderedAsSVG
        ) {
          return {
            existsWithSameCss: true,
            name: className + suffix,
          };
        }
      }

      return uniqueName(className, n + 1, css);
    } else {
      allNames.push(className + suffix);
      return {
        existsWithSameCss: false,
        name: className + suffix,
      };
    }
  }

  /* componentProperties start */
  let componentPropertiesDefinitions = null as null | object;

  if (
    isComponentSet ||
    (selectionNode.type === "COMPONENT" &&
      selectionNode.parent !== "COMPONENT_SET")
  ) {
    componentPropertiesDefinitions = {};
    try {
      for (const [key, val] of Object.entries(
        selectionNode.componentPropertyDefinitions
      ) as Array<any>) {
        const shortName = cleanComponentPropertyName(key);
        if (val.type !== "INSTANCE_SWAP") {
          componentPropertiesDefinitions[shortName] =
            val.type !== "BOOLEAN"
              ? { ...val, defaultValue: `'${val.defaultValue}'` }
              : val;
        }
      }
    } catch {
      console.error("componentProperties not working");
      componentPropertiesDefinitions = null;
    }
  } else {
    componentPropertiesDefinitions = null;
  }
  /* componentProperties end */

  componentName = uniqueName(makeSafeForCSS(selectionNode.name)).name;

  const createTreeElement = ({
    name,
    node,
    css,
    shortName = name,
    skipCss = false,
    baseSelector = "",
    isComponentSet = false,
  }) => {
    return {
      name,
      shortName,
      skipCss,
      css,
      willBeRenderedAsSVG: willBeRenderedAsSVG(node),
      children: [],
      type: node.type,
      characters: node.characters,
      originalNode: node,
      textSegments: [],
      baseSelector,
      variants: isComponentSet && [],
      componentPropertiesDefinitions,
    };
  };

  const tree = createTreeElement({
    name: componentName,
    node: originalNode,
    css: nodeCSS(originalNode),
    isComponentSet,
  });

  function theChildren(children, treeChildren, baseSelector = "") {
    children.forEach((node) => {
      // is not visible AND does not have a visibility componentProperty assigned
      if (!node.visible && !node.componentPropertyReferences?.visible) return;
      const css = nodeCSS(node);
      const uniqueNameInformation = uniqueName(
        makeSafeForCSS(node.name),
        1,
        css
      );
      const shortName = uniqueNameInformation.name;
      const skipCss = uniqueNameInformation.existsWithSameCss;
      const prefix =
        cssStyle === SETTINGS.CSS_STYLES.BEM ? `${componentName}__` : "";
      const name = `${prefix}${shortName}`;

      const newElement = createTreeElement({
        name,
        node,
        shortName,
        skipCss,
        css,
        baseSelector,
      });

      treeChildren?.push(newElement);

      if (node.children?.length > 0) {
        theChildren(node.children, newElement.children, baseSelector);
      }

      if (node.type === "TEXT") {
        const textSegments = getTextSegments(node, name, uniqueName);
        newElement.textSegments = textSegments;
      }
    });
  }

  if (originalNode.children?.length > 0) {
    theChildren(originalNode.children, tree.children);
  }

  /* Component Variants */
  if (isComponentSet && selectionNode.children?.length > 0) {
    selectionNode.children.forEach((variant) => {
      // the variant name contains all property information but it needs to be sorted correctly
      const sortedVariantName = variant?.name?.split(", ").sort().join(", ");
      const variantName = makeSafeForCSS(
        `${componentName}--${sortedVariantName}`
      );

      const baseSelector = "." + variantName;

      const newVariant = createTreeElement({
        name: componentName,
        node: variant,
        css: nodeCSS(variant),
        baseSelector,
      });
      tree.variants?.push(newVariant);
      allNames = []; // reset classNames so the new generated match the ones in the defaultVariant
      theChildren(variant.children, newVariant.children, baseSelector);
    });
  }

  if (originalNode.type === "TEXT") {
    const textSegments = getTextSegments(originalNode, tree.name, uniqueName);
    tree.textSegments = textSegments;
  }

  return tree;
}
