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

import { makeSafeForCSS, getTransforms } from "./helpers/helpers";
import { getStyles } from "./getStyles";

function nodeCSS(node) {
  console.log(node);

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

function createTree(selection) {
  let componentName = "component";

  // Only to prevent duplicate Names
  const allNames = [];

  function uniqueName(className, n = 0) {
    const suffix = n > 0 ? n : "";
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
  };

  function theChildren(children, treeChildren) {
    children.forEach((node, i) => {
      if (!node.visible) return;

      const newElement = {
        name: `${componentName}__${uniqueName(makeSafeForCSS(node.name))}`,
        css: nodeCSS(node),
        allChildrenAreVector: allChildrenAreVector(node),
        children: [],
        type: node.type,
        characters: node.characters,
        originalNode: node,
      };

      treeChildren?.push(newElement);

      if (node.children?.length > 0) {
        theChildren(node.children, newElement.children);
      }
    });
  }

  if (frame.children?.length > 0) {
    theChildren(frame.children, tree.children);
  }

  return tree;
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
      if (treeElement.children.length > 0) {
        theChildren(treeElement.children);
      }
    });
  }
  if (!tree.allChildrenAreVector) {
    theChildren(tree.children);
  }

  return css;
}

function printHTML(tree) {
  let html = "";

  function childrenEl(treeElement) {
    if (treeElement.children?.length > 0) {
      return theChildren(treeElement.children);
    } else {
      return "";
    }
  }
  function theChildren(children) {
    return children
      .map((treeElement) => {
        if (treeElement.type === "VECTOR") {
          return createSVG(treeElement.originalNode, treeElement.name);
        }
        if (treeElement.allChildrenAreVector) {
          return createSVGOfChildren(
            treeElement.originalNode,
            treeElement.name
          );
        }
        return `<div class="${treeElement.name}">\n${
          treeElement.characters
            ? treeElement.characters.replaceAll("\n", "<br />")
            : ""
        } ${childrenEl(treeElement)}\n</div>`;
      })
      .join("");
  }

  // why isn't this just "childrenEl" ???
  if (tree.type === "VECTOR") {
    html = createSVG(tree.originalNode, tree.name);
  } else if (tree.allChildrenAreVector) {
    html = createSVGOfChildren(tree.originalNode, tree.name);
  } else {
    html += `<div class="${tree.name}">\n${
      tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""
    } ${childrenEl(tree)}\n</div>`;
  }

  return html;
}

function allChildrenAreVector(frame) {
  return (
    frame.children?.length > 0 &&
    frame.children?.filter((n) => n.type === "VECTOR").length ===
      frame.children?.length
  );
}

function createSVG(node, className) {
  const geometry = node.vectorPaths;
  const paths = geometry?.map((p) => {
    return `<path d="${p.data}" fill-rule="${p.windingRule
      .toString()
      .toLowerCase()}" />`;
  });

  return `<svg 
  class="${className}"
  width="${node.width}" 
  height="${node.height}" 
  stroke-width="${node.strokeWeight}" 
  stroke="${strokeColor(node)}" 
  stroke-linecap="${node.strokeCap.toString().toLowerCase()}"
  fill="${node.fills?.length === 0 ? "none" : fillColor(node)}"
  transform-origin="0 0"
  transform="scale(${getTransforms(node.absoluteTransform).scaleX} ${
    getTransforms(node.absoluteTransform).scaleY
  })" 
  >
    ${paths.join("")}
  </svg>`;
}

function createSVGOfChildren(node, className) {
  const paths = node.children?.map((n) => {
    const geometry = n.vectorPaths;
    return geometry
      ?.map((p) => {
        return `<path 
        d="${p.data}"
        fill-rule="${p.windingRule.toString().toLowerCase()}"
        stroke="${strokeColor(n)}"
        stroke-width="${n.strokeWeight}"  
        stroke-linecap="${n.strokeCap.toString().toLowerCase()}"
        fill="${n.fills?.length === 0 ? "none" : fillColor(n)}" 
        transform-origin="0 0"
        transform="translate(${n.x} ${n.y}) rotate(${
          n.rotation * -1
        }, 0, 0) scale(${getTransforms(n.absoluteTransform).scaleX} ${
          getTransforms(n.absoluteTransform).scaleY
        })"
      />`;
      })
      .join("");
  });

  return `<svg 
    class="${className}"
    width="${node.width}" 
    height="${node.height}" 
    viewBox="0 0 ${node.width} ${node.height}"
    transform-origin="0 0"
    transform="scale(${getTransforms(node.absoluteTransform).scaleX} ${
    getTransforms(node.absoluteTransform).scaleY
  })" 
    >
      ${paths.join("")}
  </svg>`;
}

figma.parameters.on(
  "input",
  ({ parameters, key, query, result }: ParameterInputEvent) => {
    switch (key) {
      case "framework":
        const frameworks = ["react", "html"];
        result.setSuggestions(frameworks.filter((s) => s.includes(query)));
        break;
      case "withStyles":
        const answers = ["All Styles"];
        result.setSuggestions(answers.filter((s) => s.includes(query)));
        break;
      default:
        return;
    }
  }
);

figma.on("run", ({ command, parameters }: RunEvent) => {
  console.log(command, parameters);
  figma.showUI(__html__, { height: 500, width: 400 });
  figma.ui.postMessage({
    css: printCSS(tree),
    html: printHTML(tree),
    framework: parameters.framework,
    styles: parameters.withStyles === "All Styles" ? getStyles(figma) : null,
    name: figma.currentPage?.selection?.[0]?.name,
  });
});

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();
