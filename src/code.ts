import {
  borderProp,
  displayProp,
  paddingProp,
  transforms,
  borderRadius,
  fillColor,
  fontStyle,
  boxShadow,
  dimensions,
  position,
  overflow,
  opacity,
} from "./helpers/propsHelpers";

import { makeSafeForCSS, rgbToHex } from "./helpers/helpers";

function nodeCSS(node) {
  console.log(node);

  if (node.type === "TEXT") {
    return `
      color: ${fillColor(node)};
      font-size: ${node.fontSize}px;
      font-family: ${node.fontName.family};
      text-align: ${node.textAlignHorizontal?.toLowerCase()};
      ${fontStyle(node)}
      ${opacity(node)}
      ${position(node)}
      ${displayProp(node)}
      margin: 0;
      ${transforms(node)}
    `;
  } else {
    return `
      box-sizing: border-box;
      ${
        node.fillStyleId &&
        "/*" + figma.getStyleById(node.fillStyleId)?.name + "*/"
      }
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

      treeChildren.push({
        name: `${componentName}__${uniqueName(makeSafeForCSS(node.name))}`,
        css: nodeCSS(node),
        allChildrenAreVector: allChildrenAreVector(node),
        children: [],
        type: node.type,
        characters: node.characters,
        originalNode: node,
      });

      if (node.children?.length > 0) {
        theChildren(node.children, treeChildren[i]?.children);
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
      if (treeElement.children.length > 0) {
        theChildren(treeElement.children);
      }
    });
  }
  theChildren(tree.children);

  return css;
}

function printHTML(tree) {
  let html = "";

  function childrenEl(frame) {
    if (frame.children?.length > 0) {
      return theChildren(frame.children);
    } else {
      return "";
    }
  }
  function theChildren(children) {
    return children
      .map((node) => {
        if (node.type === "VECTOR") {
          return createSVG(node.originalNode);
        }
        if (node.allChildrenAreVector) {
          return createSVGOfChildren(node.originalNode, `${node.name}`);
        }
        return `<div class="${node.name}">\n${
          node.characters ? node.characters : ""
        } ${childrenEl(node)}\n</div>`;
      })
      .join("");
  }

  // why isn't this just "childrenEl" ???
  if (tree.type === "VECTOR") {
    // Is a Vector able to have children?
    html = createSVG(tree.originalNode);
  } else if (tree.allChildrenAreVector) {
    html = createSVGOfChildren(tree.originalNode, tree.name);
  } else {
    html += `<div class="${tree.name}">\n${
      tree.characters ? tree.characters : ""
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

function createSVG(frame) {
  const paths = frame.vectorPaths?.map((p) => {
    return `<path d="${p.data}" />`;
  });

  return `<svg 
  width="${frame.width}" 
  height="${frame.height}" 
  stroke-width="${frame.strokeWeight}" 
  stroke="${rgbToHex(frame.strokes?.[0]?.color)}" 
  fill="${
    frame.fills?.length === 0 ? "none" : rgbToHex(frame.fills?.[0]?.color)
  }" 
  transform="translate(${frame.x} ${frame.y}) rotate(${
    frame.rotation * -1
  }, 0, 0)"
  >
    ${paths.join("")}
  </svg>`;
}

function createSVGOfChildren(frame, className) {
  const paths = frame.children?.map((n) => {
    return n.vectorPaths
      ?.map((p) => {
        return `<path 
        d="${p.data}"
        stroke="${rgbToHex(n.strokes?.[0]?.color)}"
        stroke-width="${n.strokeWeight}"  
        fill="${
          n.fills?.length === 0 ? "none" : rgbToHex(n.fills?.[0]?.color)
        }" 
        transform="translate(${n.x} ${n.y}) rotate(${n.rotation * -1}, 0, 0)" 
      />`;
      })
      .join("");
  });

  return `<svg 
    class="${className}"
    width="${frame.width}" 
    height="${frame.height}" 
    viewBox="0 0 ${frame.width} ${frame.height}"
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
      default:
        return;
    }
  }
);

figma.on("run", ({ command, parameters }: RunEvent) => {
  console.log(command, parameters);
  figma.showUI(__html__, { height: 800, width: 600 });
  figma.ui.postMessage({
    css: printCSS(tree),
    html: printHTML(tree),
    framework: parameters.framework,
    name: figma.currentPage?.selection?.[0]?.name,
  });
});

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();
