/* 
This file tries to convert figma into tailwind.
It tries to interpret the css already generated from this plugin as tailwind classes.
This will never work perfectly but may provide a starting point for development.
*/

import { createSVG } from "./code";

const sizesMap = {
  "0px": 0,
  "1px": "px",
  "2px": 0.5,
  "4px": 1,
  "6px": 1.5,
  "8px": 2,
  "10px": 2.5,
  "12px": 3,
  "14px": 3.5,
  "16px": 4,
  "20px": 5,
  "24px": 6,
  /* and many more */
};

const flexDirectionMap = {
  row: "row",
  column: "col",
};

const twMap = {
  padding: sizesMap,
  gap: sizesMap,
  top: sizesMap,
  left: sizesMap,
  "flex-direction": flexDirectionMap,
  "border-radius": {
    "0px": "none",
    "2px": "sm",
    "4px": "",
    "6px": "md",
    "8px": "lg",
    "12px": "xl",
    "16px": "2xl",
    "24px": "3xl",
    "9999px": "full",
  },
  background: { transparent: "transparent" },
  "justify-content": {
    "flex-start": "start",
    "flex-end": "end",
    center: "center",
  },
  "align-items": {
    "flex-start": "start",
    "flex-end": "end",
    center: "center",
  },
  "align-self": {
    stretch: "stretch",
  },
  overflow: {
    hidden: "hidden",
  },
};

export async function tailwind(tree) {
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
            return await createSVG(
              treeElement.originalNode,
              // hacky...
              `${
                tailwindClassNames(treeElement.css, treeElement.originalNode)
                  .classNames
              }" style="${
                tailwindClassNames(treeElement.css, treeElement.originalNode)
                  .inlineStyles
              }`
            );
          }
          return `<div class="${
            tailwindClassNames(treeElement.css, treeElement.originalNode)
              .classNames
          }" style="${
            tailwindClassNames(treeElement.css, treeElement.originalNode)
              .inlineStyles
          }">\n${
            treeElement.characters
              ? treeElement.characters.replaceAll("\n", "<br />")
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
    html = await createSVG(
      tree.originalNode,
      `${tailwindClassNames(tree.css, tree.originalNode).classNames}" style="${
        tailwindClassNames(tree.css, tree.originalNode).inlineStyles
      }`
    );
  } else {
    html += `<div class="${
      tailwindClassNames(tree.css, tree.originalNode).classNames
    }" style="${
      tailwindClassNames(tree.css, tree.originalNode).inlineStyles
    }">\n${
      tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""
    } ${await theChildren(tree.children)}\n</div>`;
  }

  return html;
}

function tailwindClassNames(css, node) {
  const cssLineByLine = css
    .replaceAll("\n", "")
    .split(";")
    .map((e) => e.trim())
    .filter((e) => e !== "");

  const keyValuePairs = cssLineByLine.map((line) => {
    const [key, value] = line.split(":");

    return { key: key?.trim(), value: value?.trim() };
  });

  const cssPropsMap = {
    "border-radius": "rounded",
    width: "w",
    height: "h",
    "text-align": "text",
    "flex-direction": "flex",
    position: "",
    display: "",
    flex: "flex",
    gap: "gap",
    top: "top",
    left: "left",
    "justify-content": "justify",
    "align-items": "items",
    "align-self": "self",
    overflow: "overflow",
  };

  // these will be generated from node or are not needed at all
  const excludeList = ["padding", "margin", "box-sizing"];
  const inlineStyles = [];

  const classNames = keyValuePairs.map(({ key, value }) => {
    if (excludeList.includes(key)) return null;

    const twValue = lookUpTailwindValue(key, value);
    const twKey = cssPropsMap[key];

    if (twKey === undefined) {
      inlineStyles.push(`${key}: ${value}`);
      return null;
    }

    /* for props like display etc. */
    if (twKey === "") {
      return twValue;
    }

    if (twValue === "") {
      return twKey;
    }

    return [twKey, twValue].join("-");
  });

  // padding, fontSize etc.
  const classNamesDirectlyExtractedFromNode = extractClassNamesFromNode(node);

  return {
    classNames: classNames
      .concat(classNamesDirectlyExtractedFromNode)
      .filter((e) => e !== null)
      .join(" "),
    inlineStyles: inlineStyles.join("; "),
  };
}

function lookUpTailwindValue(propKey, value) {
  const valuesNotNeededToChange = ["display", "position", "text-align", "flex"];

  const twValue = twMap[propKey]?.[value];

  if (valuesNotNeededToChange.includes(propKey)) {
    return value;
  }

  if (twValue === undefined) {
    return `[${value}]`;
  }

  if (twValue === "") {
    return "";
  }
  return twValue;
}

function extractClassNamesFromNode(node) {
  const classNames = [];

  /* paddings */
  if (node.paddingLeft) {
    const paddings = [
      node.paddingTop,
      node.paddingRight,
      node.paddingBottom,
      node.paddingLeft,
    ];

    if (paddings.every((p) => p === paddings[0])) {
      classNames.push(
        `p-${lookUpTailwindValue("padding", paddings[0] + "px")}`
      );
    } else {
      const direction = ["t", "r", "b", "l"];
      paddings.forEach((p, i) => {
        classNames.push(
          `p${direction[i]}-${lookUpTailwindValue("padding", p + "px")}`
        );
      });
    }
  }
  /* paddings end */

  return classNames;
}
