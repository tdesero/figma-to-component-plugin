import { rgbToHex, rgbaColor, getTransforms } from "./helpers";

/* css props helpers */
export function borderProp(node) {
  if (!node.strokes || !node.strokeWeight || node.strokes.length < 1) return "";

  return `${
    node.strokeStyleId &&
    "/*" + figma.getStyleById(node.strokeStyleId)?.name + "*/"
  } border: ${node.strokeWeight}px solid ${
    node.strokes[0].opacity < 1
      ? rgbaColor(node.strokes[0].color, node.strokes[0].opacity)
      : rgbToHex(node.strokes[0].color)
  };`;
}

export function paddingProp(node) {
  if (
    !node.paddingTop &&
    !node.paddingRight &&
    !node.paddingBottom &&
    !node.paddingLeft
  )
    return "";

  return `padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`;
}

export function displayProp(node) {
  const flexShrinkGrow = node.layoutGrow
    ? "flex-grow: 1; flex-shrink: 1;"
    : shrink();

  function shrink() {
    return !(node.type === "TEXT") && !(node.primaryAxisSizingMode === "AUTO")
      ? "flex-shrink: 0;"
      : "";
  }

  const layoutAlign =
    node.layoutAlign === "STRETCH" ? "align-self: stretch;" : "";

  const alignItemsMap = {
    MIN: "start",
    MAX: "end",
    CENTER: "center",
    SPACE_BETWEEN: "space-between",
  };

  const justifyContentMap = {
    MIN: "flex-start",
    MAX: "flex-end",
    CENTER: "center",
    SPACE_BETWEEN: "space-between",
  };

  let layoutProps = "";
  if (node.layoutMode === "VERTICAL") {
    // position: ${["FRAME", "COMPONENT", "INSTANCE"].includes(node.type) ? 'relative' : 'static'}; /* dont get this... */
    layoutProps = `
        display: flex;
        position: relative;
        flex-direction: column;
        gap: ${node.itemSpacing}px;
        align-items: ${alignItemsMap[node.counterAxisAlignItems]};
        justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
      `;
  }

  if (node.layoutMode === "HORIZONTAL") {
    layoutProps = `
        display: flex;
        position: relative;
        flex-direction: row;
        gap: ${node.itemSpacing}px;
        align-items: ${alignItemsMap[node.counterAxisAlignItems]};
        justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
      `;
  }

  if (
    node.parent.layoutMode === "HORIZONTAL" ||
    node.parent.layoutMode === "VERTICAL"
  ) {
    layoutProps += layoutAlign + flexShrinkGrow;
  }

  return layoutProps;
}

export function dimensions(node) {
  if (node.layoutMode === "VERTICAL") {
    return `
        height: ${
          node.primaryAxisSizingMode === "AUTO" ? "auto" : node.height + "px"
        };
        width: ${
          node.counterAxisSizingMode === "AUTO" ? "auto" : node.width + "px"
        };`;
  }

  if (node.layoutMode === "HORIZONTAL") {
    return `
        width: ${
          node.primaryAxisSizingMode === "AUTO" ? "auto" : node.width + "px"
        };
        height: ${
          node.counterAxisSizingMode === "AUTO" ? "auto" : node.height + "px"
        };`;
  }

  if (!node.layoutMode || node.layoutMode === "NONE") {
    return `
      height: ${node.type === "TEXT" ? "auto" : node.height + "px"};
      width: ${node.type === "TEXT" ? "auto" : node.width + "px"};
    `;
  }
}

export function overflow(node) {
  return node.clipsContent ? "overflow: hidden;" : "";
}

export function opacity(node) {
  if (node.opacity === 1) return "";
  return `opacity: ${node.opacity};`;
}

export function position(node) {
  const coord =
    node.id === figma.currentPage.selection[0].id
      ? ""
      : `left: ${node.x}px; top: ${node.y}px;`;

  const positionFromParent = (node) => {
    if (node.type === "GROUP") {
      return "static";
    }
    if (node.id === figma.currentPage.selection[0].id) {
      return "relative";
    }
    return `${
      node.parent.layoutMode === "NONE" || !node.parent.layoutMode
        ? `absolute; ${coord}`
        : "relative"
    }`;
  };

  return `
      position: ${positionFromParent(node)};
    `;

  /*
  if (!node.layoutMode || node.layoutMode === "NONE") {
    return `
      position: ${positionFromParent(node)};
    `;
  }*/

  /*if (node.layoutMode === "VERTICAL" || node.layoutMode === "HORIZONTAL") {
    return `position: relative;`;
  }*/
}

export function boxShadow(node) {
  if (!node.effects || node.effects.length === 0) return "";
  const shadows = node.effects.filter(
    (effect) => effect.type === "DROP_SHADOW"
  );
  if (shadows.length === 0) return "";

  let css = "box-shadow: ";
  shadows.forEach((s) => {
    css += `${s.offset.x}px ${s.offset.y}px ${s.radius}px ${
      s.spread
    }px ${rgbaColor(s.color, s.color.a)}`;
  });
  return (
    `${
      node.effectStyleId &&
      "/*" + figma.getStyleById(node.effectStyleId)?.name + "*/"
    }` +
    css +
    ";"
  );
}

export function fontStyle(node) {
  const isItalic = node.fontName?.style?.toLowerCase().includes("italic");

  const weightMap = {
    thin: 100,
    "extra light": 200,
    extralight: 200,
    light: 300,
    normal: 400,
    regular: 400,
    medium: 500,
    "semi bold": 600,
    semibold: 600,
    bold: 700,
    "extra bold": 800,
    extrabold: 800,
    black: 900,
  };

  const weight = node.fontName?.style
    ?.toLowerCase()
    .replace("italic", "")
    .trim();

  return `font-weight: ${weightMap[weight]}; ${
    isItalic ? "font-style: italic;" : ""
  }`;
}

export function fillColor(node) {
  //atm only one fill is supported
  const fill = node.fills?.[0];

  if (!fill) {
    return "transparent";
  }

  if (!fill.visible) {
    return "transparent";
  }

  if (fill.type === "GRADIENT_LINEAR") {
    const { gradientStops } = fill;
    const transforms = getTransforms(fill.gradientTransform);

    console.log(fill.gradientTransform);

    const gradientMap = gradientStops.map((s) => {
      return `${rgbaColor(s.color, s.color.a)} ${s.position * 100}%`;
    });

    return `linear-gradient(${transforms.angle + 90}deg, ${gradientMap.join(
      ","
    )})`;
  }

  return node.fills?.[0]?.opacity < 1
    ? rgbaColor(node.fills?.[0]?.color, node.fills?.[0]?.opacity)
    : rgbToHex(node.fills?.[0]?.color);
}

export function transforms(node) {
  if (node.rotation && node.type !== "GROUP") {
    return `
        transform-origin: 0 0;
        transform: rotate(${node.rotation * -1}deg);
      `;
  } else {
    return "";
  }
}

export function borderRadius(node) {
  if (node.type === "ELLIPSE") return "border-radius: 50%;";
  return `border-radius: ${
    typeof node.cornerRadius === "number"
      ? node.cornerRadius + "px"
      : `${node.topLeftRadius}px ${node.topRightRadius}px ${node.bottomRightRadius}px ${node.bottomLeftRadius}px`
  };`;
}

/* css props helepers end */
