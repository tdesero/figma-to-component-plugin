import {
  borderProp,
  displayProp,
  paddingProp,
  transformProps,
  borderRadiusProp,
  fillColor,
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
} from "./core/cssProperties";

import {
  escapeHtml,
  makeSafeForCSS,
  allChildrenAreVector,
  willBeRenderedAsSVG,
} from "./core/helpers";
import { getStyles } from "./core/getStyles";

/* Beta */
import { tailwind } from "./core/tailwind";

function nodeCSS(node) {
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

function segmentCss(textSegment) {
  return `
      color: ${fillColor(textSegment)};
      ${fontProp(textSegment)}
      ${textTransformProp(textSegment)}
      ${textDecorationProp(textSegment)}
    `;
}

function createTree(selection) {
  let componentName = "component";

  if (selection.length === 0) {
    figma.notify("Nothing selected", { error: true });
    return;
  }

  if (selection.length > 1) {
    figma.notify("Select only 1 Node", { error: true });
    return;
  }

  const selectionNode = <any>selection[0];

  const isComponentSet = selectionNode.type === "COMPONENT_SET";
  const originalNode = isComponentSet
    ? selectionNode.defaultVariant
    : selectionNode;

  componentName = makeSafeForCSS(selectionNode.name);

  const tree = {
    name: componentName,
    css: nodeCSS(originalNode),
    allChildrenAreVector: allChildrenAreVector(originalNode),
    children: [],
    type: originalNode.type,
    characters: originalNode.characters,
    originalNode: originalNode,
    textSegments: [],
    variants: isComponentSet && [],
  };

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
        if (elementWithSameName?.css === css) {
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

  function theChildren(children, treeChildren, baseSelector = "") {
    children.forEach((node) => {
      if (!node.visible) return;
      const css = nodeCSS(node);
      const uniqueNameInformation = uniqueName(
        makeSafeForCSS(node.name),
        1,
        css
      );
      const shortName = uniqueNameInformation.name;
      const skipCss = uniqueNameInformation.existsWithSameCss;
      const name = `${componentName}__${shortName}`;

      const newElement = {
        name,
        shortName,
        skipCss,
        css,
        allChildrenAreVector: allChildrenAreVector(node),
        children: [],
        type: node.type,
        characters: node.characters,
        originalNode: node,
        textSegments: [],
        baseSelector,
      };

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

    /* Component Variants */
    if (isComponentSet) {
      selectionNode.children.forEach((variant) => {
        const variantName = makeSafeForCSS(
          `${componentName}--${variant?.name}`
        );
        const newVariant = {
          name: componentName,
          css: nodeCSS(variant),
          allChildrenAreVector: allChildrenAreVector(variant),
          children: [],
          type: variant?.type,
          characters: variant?.characters,
          originalNode: variant,
          textSegments: [],
          baseSelector: "." + variantName,
        };
        tree.variants?.push(newVariant);
        allNames = []; // reset classNames so the new generated match the ones in the defaultVariant
        theChildren(variant.children, newVariant.children, "." + variantName);
      });
    }
  }

  if (originalNode.type === "TEXT") {
    const textSegments = getTextSegments(originalNode, tree.name, uniqueName);
    tree.textSegments = textSegments;
  }

  return tree;
}

function getTextSegments(node, componentName, uniqueName) {
  const segments = node.getStyledTextSegments([
    "fontSize",
    "fontName",
    "textDecoration",
    "textCase",
    "lineHeight",
    "letterSpacing",
    "fills",
    "textStyleId",
    "fillStyleId",
    "listOptions",
    "indentation",
  ]);

  return segments.map((s) => {
    return {
      ...s,
      name: `${uniqueName(makeSafeForCSS(componentName + "-span")).name}`,
      css: segmentCss(s),
    };
  });
}

function getTreeElementByName(tree, name) {
  function searchTree(element, name) {
    if (element.name === name) {
      return element;
    } else if (element.children != null) {
      var i: number;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], name);
      }
      return result;
    }
    return null;
  }

  return searchTree(tree, name);
}

function getTreeElementByProperty(tree, property: string, value) {
  function searchTree(element, property, value) {
    if (element[property] === value) {
      return element;
    } else if (element.children != null) {
      var i: number;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], property, value);
      }
      return result;
    }
    return null;
  }

  return searchTree(tree, property, value);
}

function eraseDuplicateCSS(modifierCSS: string, baseCSS: string) {
  const modArr = modifierCSS.split(";").map((l) => l.trim());
  const baseArr = baseCSS.split(";").map((l) => l.trim());

  // detect css lines included in base but not in modifier and unset the value
  const cssPropsToBeUnset = baseArr
    .map((l) => {
      return l.split(":")?.[0];
    })
    .filter((prop) => {
      return !modifierCSS.includes(`${prop}:`);
    })
    .map((prop) => prop + ": unset");

  return modArr
    .filter((line) => {
      return !baseArr.includes(line);
    })
    .concat(cssPropsToBeUnset)
    .map((l) => l + ";")
    .join("");
}

function printCSS(tree) {
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

      if (treeElement.allChildrenAreVector) {
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
  if (!tree.allChildrenAreVector) {
    theChildren(tree.children);
  }

  if (tree.variants) {
    css += "\n/* variant styles */\n";
    theChildren(tree.variants, true);
  }

  return css;
}

async function printHTML(tree) {
  let html: string = "";

  async function theChildren(children) {
    if (children?.length > 0) {
      const all = await Promise.all(
        children.map(async (treeElement) => {
          if (willBeRenderedAsSVG(treeElement)) {
            return await createSVG(treeElement.originalNode, treeElement.name);
          }
          return `<div class="${treeElement.name}">\n${
            treeElement.textSegments
              ? printTextSegments(treeElement.textSegments)
              : ""
          } ${await theChildren(treeElement.children)}\n</div>`;
        })
      );
      return all.join("");
    } else {
      return "";
    }
  }

  // this should become more DRY...
  if (willBeRenderedAsSVG(tree)) {
    html = await createSVG(tree.originalNode, tree.name);
  } else {
    html += `<div class="${tree.name}">\n${
      tree.textSegments ? printTextSegments(tree.textSegments) : ""
    } ${await theChildren(tree.children)}\n</div>`;
  }

  return html;
}

function printTextSegments(segments) {
  if (segments.length === 1) {
    // do not wrap in span
    return escapeHtml(segments[0].characters)
      .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
      .replace(/\n/g, "<br/>");
  }

  return segments
    .map((s) => {
      return `<span class="${s.name}">${escapeHtml(s.characters)
        .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
        .replace(/\n/g, "<br/>")}</span>`;
    })
    .join("");
}

export async function createSVG(node, className) {
  const svg: string = await node
    .exportAsync({ format: "SVG", useAbsoluteBounds: true })
    .then((res) =>
      // Uint8Array to string and inject classname
      String.fromCharCode
        .apply(null, res)
        .replace("<svg ", `<svg class="${className}" `)
    )
    .catch((err) => console.error(err));

  return svg;
}

figma.parameters.on(
  "input",
  ({ parameters, key, query, result }: ParameterInputEvent) => {
    switch (key) {
      case "framework":
        const frameworks = ["react", "html", "tailwind(beta)"];
        result.setSuggestions(frameworks.filter((s) => s.includes(query)));
        break;
      default:
        return;
    }
  }
);

figma.on("run", async ({ command, parameters }: RunEvent) => {
  const tree = createTree(figma.currentPage.selection);
  console.log(tree);

  figma.showUI(__html__, { height: 600, width: 500 });

  const css = parameters.framework === "tailwind(beta)" ? "-" : printCSS(tree);
  const html =
    parameters.framework === "tailwind(beta)"
      ? await tailwind(tree)
      : await printHTML(tree);

  figma.ui.postMessage({
    css,
    html,
    framework: parameters.framework,
    styles: getStyles(figma),
    name: figma.currentPage?.selection?.[0]?.name,
  });
});
