/* JUST FOR TESTING */
export function tailwind(tree) {
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
          return "";
        }
        if (treeElement.allChildrenAreVector) {
          return "";
        }
        return `<div class="${tailwindClassNames(treeElement.css)}">\n${
          treeElement.characters
            ? treeElement.characters.replaceAll("\n", "<br />")
            : ""
        } ${childrenEl(treeElement)}\n</div>`;
      })
      .join("");
  }

  // why isn't this just "childrenEl" ???
  if (tree.type === "VECTOR") {
    html = "";
  } else if (tree.allChildrenAreVector) {
    html = "";
  } else {
    html += `<div class="${tailwindClassNames(tree.css)}">\n${
      tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""
    } ${childrenEl(tree)}\n</div>`;
  }

  return html;
}

function tailwindClassNames(css) {
  const cssLineByLine = css.replaceAll("\n", "").split(";");

  const keyValuePairs = cssLineByLine.map((line) => {
    const [key, value] = line.split(":");

    return { key: key?.trim(), value: value?.trim() };
  });

  const cssPropsMap = {
    background: "bg",
    border: "border",
    "border-radius": "rounded",
    padding: "p",
    color: "text",
    width: "w",
    height: "h",
    "text-align": "text",
    "flex-direction": "flex",
    position: "",
    display: "",
  };

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
    "flex-direction": flexDirectionMap,
  };

  const valuesNotNeededToChange = ["display", "position", "text-align"];

  function lookUpTailwindValue(propKey, value) {
    /* TODO: check for var() */
    const twValue = twMap[propKey]?.[value];

    if (valuesNotNeededToChange.includes(propKey)) {
      return value;
    }

    if (!twValue) {
      return `[${value}]`;
    }
    return twValue;
  }

  const classNames = keyValuePairs.map(({ key, value }) => {
    const twValue = lookUpTailwindValue(key, value);
    const twKey = cssPropsMap[key];

    if (!twKey) {
      return null;
    }

    /* for props like display etc. */
    if (twKey === "") {
      return twValue;
    }

    return [twKey, twValue].join("-");
  });

  return classNames.join(" ");
}
