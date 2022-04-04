import {
  borderProp,
  displayProp,
  paddingProp,
  transforms,
  borderRadius,
  fillColor,
  boxShadow,
  dimensions,
  position,
  overflow,
  opacity,
  strokeColor,
  fontProp,
} from "./helpers/propsHelpers";

import { makeSafeForCSS } from "./helpers/helpers";
import { getStyles } from "./getStyles";

/* Beta */
import { tailwind } from "./tailwind";

function nodeCSS(node) {
  console.log("node", node);

  if (node.type?.toString() === "TEXT") {
    return `
      color: ${fillColor(node)};
      text-align: ${node.textAlignHorizontal?.toLowerCase()};
      ${fontProp(node)}
      ${opacity(node)}
      ${position(node)}
      ${displayProp(node)}
      ${dimensions(node)}
      margin: 0;
      ${transforms(node)}
    `;
  } else {
    return `
      box-sizing: border-box;
      background: ${fillColor(node)};
      ${borderRadius(node)}
      ${borderProp(node)}
      ${opacity(node)}
      ${paddingProp(node)}
      ${displayProp(node)}
      ${dimensions(node)}
      ${position(node)}
      ${boxShadow(node)}
      margin: 0;
      ${transforms(node)}
      ${overflow(node)}
    `;
  }
}

function segmentCss(textSegment) {
  return `
      color: ${fillColor(textSegment)};
      ${fontProp(textSegment)}
    `;
}

function createTree(selection) {
  let componentName = "component";

  // Only to prevent duplicate Names
  const allNames = [];

  function uniqueName(className, n = 1) {
    const suffix = n > 1 ? n : "";
    if (allNames.includes(className + suffix)) {
      return uniqueName(className, n + 1);
    } else {
      allNames.push(className + suffix);
      return className + suffix;
    }
  }

  if (selection.length === 0) {
    figma.notify("Nothing selected", { error: true });
    return;
  }

  if (selection.length > 1) {
    figma.notify("Select only 1 Component", { error: true });
    return;
  }

  const frame = <any>selection[0];
  componentName = makeSafeForCSS(frame.name);
  const tree = {
    name: componentName,
    css: nodeCSS(frame),
    allChildrenAreVector: allChildrenAreVector(frame),
    children: [],
    type: frame.type,
    characters: frame.characters,
    originalNode: frame,
    textSegments: [],
  };

  function theChildren(children, treeChildren) {
    children.forEach((node, i) => {
      if (!node.visible) return;
      const name = `${componentName}__${uniqueName(makeSafeForCSS(node.name))}`;

      const newElement = {
        name,
        css: nodeCSS(node),
        allChildrenAreVector: allChildrenAreVector(node),
        children: [],
        type: node.type,
        characters: node.characters,
        originalNode: node,
        textSegments: [],
      };

      treeChildren?.push(newElement);

      if (node.children?.length > 0) {
        theChildren(node.children, newElement.children);
      }

      if (node.type === "TEXT") {
        const textSegments = getTextSegments(node, name, uniqueName);
        newElement.textSegments = textSegments;
      }
    });
  }

  if (frame.children?.length > 0) {
    theChildren(frame.children, tree.children);
  }

  if (frame.type === "TEXT") {
    const textSegments = getTextSegments(frame, tree.name, uniqueName);
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
      name: `${uniqueName(makeSafeForCSS(componentName + "-span"))}`,
      css: segmentCss(s),
    };
  });
}

const tree = createTree(figma.currentPage.selection);

function printCSS(tree) {
  let css = "";

  css += `.${tree.name} {${tree.css}}\n`;
  function theChildren(children) {
    children.forEach((treeElement) => {
      css += `.${treeElement.name} {${treeElement.css}}\n`;
      if (treeElement.allChildrenAreVector) {
        return;
      }
      if (treeElement.textSegments.length > 1) {
        treeElement.textSegments.forEach((s) => {
          css += `.${s.name} {${s.css}}\n`;
        });
      }
      if (treeElement.children.length > 0) {
        theChildren(treeElement.children);
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

  return css;
}

async function printHTML(tree) {
  let html: string = "";

  async function theChildren(children) {
    if (children?.length > 0) {
      const all = await Promise.all(
        children.map(async (treeElement) => {
          if (
            treeElement.type === "VECTOR" ||
            treeElement.type === "BOOLEAN_OPERATION" ||
            treeElement.allChildrenAreVector
          ) {
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
  if (tree.type === "VECTOR" || tree.allChildrenAreVector) {
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
    return segments[0].characters.replaceAll("\n", "<br/>");
  }

  return segments
    .map((s) => {
      return `<span class="${s.name}">${s.characters.replaceAll(
        "\n",
        "<br/>"
      )}</span>`;
    })
    .join("");
}

function allChildrenAreVector(frame) {
  return (
    frame.children?.length > 0 &&
    frame.children?.filter((n) => n.type === "VECTOR").length ===
      frame.children?.length
  );
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
  figma.showUI(__html__, { height: 500, width: 400 });

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
