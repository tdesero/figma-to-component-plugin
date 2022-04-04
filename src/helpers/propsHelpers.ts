import { rgbToHex, rgbaColor, getTransforms, cleanStyleName } from "./helpers";

export function borderProp(node) {
  if (node.type === "VECTOR") return "";
  if (!node.strokes || !node.strokeWeight || node.strokes.length < 1) return "";

  if (node.strokes?.[0]?.type === "GRADIENT_LINEAR") {
    return `
    border-width: ${node.strokeWeight}px; 
    border-style: solid; 
    border-image: ${strokeColor(node)}; 
    border-image-slice: 1;
    `;
  }

  return `border: ${node.strokeWeight}px solid ${strokeColor(node)};`;
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
  const flexShrinkGrow = node.layoutGrow === 1 ? "flex: 1;" : shrink();

  function shrink() {
    return !(node.type === "TEXT") && !(node.primaryAxisSizingMode === "AUTO")
      ? "flex-shrink: 0;"
      : "";
  }

  const layoutAlign =
    node.layoutAlign === "STRETCH" ? "align-self: stretch;" : "";

  const alignItemsMap = {
    MIN: "flex-start",
    MAX: "flex-end",
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
  /* NOTE: The Order of these if statements is important! */

  let height = "";
  let width = "";

  if (node.layoutMode === "VERTICAL") {
    height =
      node.primaryAxisSizingMode === "AUTO" ? "auto" : node.height + "px";
    width = node.counterAxisSizingMode === "AUTO" ? "auto" : node.width + "px";
  }

  if (node.layoutMode === "HORIZONTAL") {
    width = node.primaryAxisSizingMode === "AUTO" ? "auto" : node.width + "px";
    height =
      node.counterAxisSizingMode === "AUTO" ? "auto" : node.height + "px";
  }

  if (!node.layoutMode || node.layoutMode === "NONE") {
    height = node.textAutoResize?.toString().includes("HEIGHT")
      ? "auto"
      : node.height + "px";
    width = node.textAutoResize?.toString().includes("WIDTH")
      ? "auto"
      : node.width + "px";
  }

  if ((!node.children || node.children?.length === 0) && node.type !== "TEXT") {
    height = node.height + "px";
    width = node.width + "px";
  }

  if (
    (node.parent.layoutMode === "VERTICAL" && node.layoutAlign === "STRETCH") ||
    node.constraints?.horizontal === "STRETCH"
  ) {
    width = "auto";
  }

  if (node.parent.layoutMode === "HORIZONTAL" && node.layoutGrow === 1) {
    width = "auto";
  }

  if (
    (node.parent.layoutMode === "HORIZONTAL" &&
      node.layoutAlign === "STRETCH") ||
    (node.parent.layoutMode === "VERTICAL" && node.layoutGrow === 1) ||
    node.constraints?.vertical === "STRETCH"
  ) {
    height = "auto";
  }

  return `width: ${width}; height: ${height};`;
}

export function overflow(node) {
  if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION")
    return "overflow: visible;";

  return node.clipsContent ? "overflow: hidden;" : "";
}

export function opacity(node) {
  if (node.opacity === 1) return "";
  return `opacity: ${node.opacity};`;
}

export function position(node) {
  let coord = "";

  function findAbsoluteParent(node) {
    if (node.parent.type === "GROUP") {
      return findAbsoluteParent(node.parent);
    }
    return node.parent;
  }

  if (node.id !== figma.currentPage.selection[0].id) {
    // Super ugly but works for now...
    if (node.constraints?.horizontal === "MAX") {
      coord += `right: ${
        findAbsoluteParent(node).width - node.width - node.x
      }px;`;
    } else if (node.constraints?.horizontal === "STRETCH") {
      coord += `right: ${
        findAbsoluteParent(node).width - node.width - node.x
      }px; left: ${node.x}px;`;
    } else if (node.constraints?.horizontal === "CENTER") {
      coord += `left: calc(50% - ${
        findAbsoluteParent(node).width / 2 - node.x
      }px);`;
    } else {
      coord += `left: ${node.x}px;`;
    }

    if (node.constraints?.vertical === "MAX") {
      coord += `bottom: ${
        findAbsoluteParent(node).height - node.height - node.y
      }px;`;
    } else if (node.constraints?.vertical === "STRETCH") {
      coord += `bottom: ${
        findAbsoluteParent(node).height - node.height - node.y
      }px; top: ${node.y}px;`;
    } else if (node.constraints?.vertical === "CENTER") {
      coord += `top: calc(50% - ${
        findAbsoluteParent(node).height / 2 - node.y
      }px);`;
    } else {
      coord += `top: ${node.y}px;`;
    }
  }

  const positionFromParent = (node) => {
    if (node.type === "GROUP") {
      return "static;";
    }
    if (node.id === figma.currentPage.selection[0].id) {
      return "relative;";
    }
    return `${
      node.parent.layoutMode === "NONE" || !node.parent.layoutMode
        ? `absolute; ${coord}`
        : "relative;"
    }`;
  };

  return `
      position: ${positionFromParent(node)}
    `;
}

export function boxShadow(node) {
  if (!node.effects || node.effects.length === 0) return "";
  const shadows = node.effects.filter(
    (effect) => effect.type === "DROP_SHADOW"
  );
  if (shadows.length === 0) return "";

  let css = "box-shadow: ";
  css += shadows
    .map((s) => {
      return `${s.offset.x}px ${s.offset.y}px ${s.radius}px ${
        s.spread
      }px ${rgbaColor(s.color, s.color.a)}`;
    })
    .join(", ");
  return (
    `${
      node.effectStyleId &&
      "/*" + figma.getStyleById(node.effectStyleId)?.name + "*/"
    }` +
    css +
    ";"
  );
}

export function fontStyleAsObject(fontName) {
  const isItalic = fontName?.style?.toLowerCase().includes("italic");

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

  const weight = fontName?.style?.toLowerCase().replace("italic", "").trim();

  return {
    weight: weightMap[weight] ? weightMap[weight] : "400",
    isItalic,
  };
}

export function fillColor(node) {
  if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION") return "";
  //atm only one fill is supported
  const fill = node.fills?.[0];

  return getColor(fill, node.fillStyleId);
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

export function gradientLinear(fill) {
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

export function borderRadius(node) {
  if (node.type === "ELLIPSE") return "border-radius: 50%;";

  if (!node.cornerRadius && !node.topLeftRadius) return "";

  return `border-radius: ${
    typeof node.cornerRadius === "number"
      ? node.cornerRadius + "px"
      : `${node.topLeftRadius}px ${node.topRightRadius}px ${node.bottomRightRadius}px ${node.bottomLeftRadius}px`
  };`;
}

export function strokeColor(node) {
  const stroke = node.strokes?.[0];

  return getColor(stroke, node.strokeStyleId);
}

export function getColor(fillOrColor, styleId) {
  if (!fillOrColor) {
    return "transparent";
  }

  if (!fillOrColor.visible) {
    return "transparent";
  }

  if (fillOrColor.type === "GRADIENT_LINEAR") {
    return gradientLinear(fillOrColor);
  }

  if (styleId) {
    const styleName = cleanStyleName(figma.getStyleById(styleId)?.name);

    const color =
      fillOrColor.opacity < 1
        ? rgbaColor(fillOrColor.color, fillOrColor.opacity)
        : rgbToHex(fillOrColor.color);

    return `var(--${styleName}, ${color})`;
  }

  return fillOrColor.opacity < 1
    ? rgbaColor(fillOrColor.color, fillOrColor.opacity)
    : rgbToHex(fillOrColor.color);
}

export function lineHeight(nodeOrStyle) {
  if (!nodeOrStyle.lineHeight) return "";
  if (nodeOrStyle.lineHeight.unit === "AUTO") return "";

  const unitMap = {
    PIXELS: "px",
    PERCENT: "%",
  };

  const unit = unitMap[nodeOrStyle.lineHeight.unit];
  return `${nodeOrStyle.lineHeight.value}${unit}`;
}

export function fontShorthand({
  lineHeight,
  fontSize,
  weight,
  fontFamily,
  isItalic,
}) {
  const italic = isItalic ? "italic " : "";
  return `${weight} ${italic}${fontSize}px${
    lineHeight !== "" ? "/" + lineHeight : ""
  } '${fontFamily}'`;
}

export function fontProp(node) {
  const { weight, isItalic } = fontStyleAsObject(node.fontName);

  const fontSize = node.fontSize?.toString();
  const fontFamily = node.fontName.family?.toString();
  const lineHeightStr = lineHeight(node);

  const shorthand = fontShorthand({
    lineHeight: lineHeightStr,
    fontSize,
    weight,
    fontFamily,
    isItalic,
  });

  if (node.textStyleId) {
    const styleName = cleanStyleName(
      figma.getStyleById(node.textStyleId.toString())?.name
    );

    return `font: var(--${styleName}, ${shorthand});`;
  }

  return `font: ${shorthand};`;
}
