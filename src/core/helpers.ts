export function componentToHex(c): String {
  var hex = Math.round(c * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function componentTo255(c) {
  return Math.round(c * 255);
}

export function rgbToHex(rgb): String {
  if (typeof rgb !== "object") return;
  const { r, g, b, a } = rgb;

  if (!a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
}

export function rgbaColor(obj, a) {
  if (typeof obj !== "object") {
    console.error("rgb color must be object");
    return;
  }

  const { r, g, b } = obj;
  return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(
    b
  )}, ${a.toFixed(2)})`;
}

export function colorAsHexOrRgba(fill) {
  if (!fill) {
    console.error("colorAsHexOrRgba was called without fill object");
    return;
  }

  if (fill.opacity && fill.opacity < 1) {
    return rgbaColor(fill.color, fill.opacity);
  } else {
    return rgbToHex(fill.color);
  }
}

export function escapeHtml(unsafe): String {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function makeSafeForCSS(name) {
  return name.replace(/[^a-z0-9_-]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return s.toLowerCase();
    return "-";
  });
}

export function cleanStyleName(name) {
  //const nameArr = name.split("/");
  //return makeSafeForCSS(nameArr[nameArr.length - 1].trim());
  if (!name) return;

  return makeSafeForCSS(name.replaceAll(" ", ""));
}

export function cleanNumber(n): Number {
  if (!n) return 0;
  return parseFloat(n.toFixed(2));
}

export function allChildrenAreVector(node) {
  const vectorTypes = ["VECTOR", "BOOLEAN_OPERATION", "STAR"];
  return (
    node.children?.length > 0 &&
    node.children?.filter((n) => vectorTypes.includes(n.type)).length ===
      node.children?.length
  );
}

export function willBeRenderedAsSVG(nodeOrTreeElement) {
  return (
    allChildrenAreVector(nodeOrTreeElement) ||
    nodeOrTreeElement.type === "VECTOR" ||
    nodeOrTreeElement.type === "BOOLEAN_OPERATION" ||
    nodeOrTreeElement.type === "STAR"
  );
}

/**
 * Returns all relevant transformation information from a (figma) transform matrix
 */
export function getTransforms(fm) {
  // anything wrong with the transforms? Not sure if i sorted it right here...
  //const m = [fm[0][0], fm[0][1], fm[1][0], fm[1][1], fm[0][2], fm[1][2]];
  const m = [fm[0][0], fm[0][1], fm[1][0], fm[1][1], fm[0][2], fm[1][2]];

  const matrix = {
    a: m[0],
    b: m[1],
    c: m[2],
    d: m[3],
    e: m[4],
    f: m[5],
  };

  const transforms = decomposeMatrix2DW3(matrix);

  return {
    angle: transforms.rotateZ, // this is rotation angle in degrees
    scaleX: transforms.scaleX, // scaleX factor
    scaleY: transforms.scaleY, // scaleY factor
    translateX: m[4], // translation point  x
    translateY: m[5], // translation point  y
    svgMatrix: m.join(" "),
    svgMatrixWithoutTranslate: [fm[0][0], fm[0][1], fm[1][0], fm[1][1]].join(
      " "
    ),
  };
}

function decomposeMatrix2DW3(m) {
  var row0x = m.a;
  var row0y = m.b;
  var row1x = m.c;
  var row1y = m.d;

  var scaleX = Math.sqrt(row0x * row0x + row0y * row0y);
  var scaleY = Math.sqrt(row1x * row1x + row1y * row1y);

  // If determinant is negative, one axis was flipped.
  var determinant = row0x * row1y - row0y * row1x;
  if (determinant < 0)
    if (row0x < row1y)
      // Flip axis with minimum unit vector dot product.
      scaleX = -scaleX;
    else scaleY = -scaleY;

  // Renormalize matrix to remove scale.
  if (scaleX) {
    row0x *= 1 / scaleX;
    row0y *= 1 / scaleX;
  }

  if (scaleY) {
    row1x *= 1 / scaleY;
    row1y *= 1 / scaleY;
  }

  // Compute rotation and renormalize matrix.
  var angle = Math.atan2(row0y, row0x);

  if (angle) {
    // Rotate(-angle) = [cos(angle), sin(angle), -sin(angle), cos(angle)]
    //                = [row0x, -row0y, row0y, row0x]
    // Thanks to the normalization above.
    var sn = -row0y;
    var cs = row0x;
    var m11 = row0x;
    var m12 = row0y;
    var m21 = row1x;
    var m22 = row1y;
    row0x = cs * m11 + sn * m21;
    row0y = cs * m12 + sn * m22;
    row1x = -sn * m11 + cs * m21;
    row1y = -sn * m12 + cs * m22;
  }

  m11 = row0x;
  m12 = row0y;
  m21 = row1x;
  m22 = row1y;

  // Convert into degrees because our rotation functions expect it.
  angle = angle * (180 / Math.PI);
  // The requested parameters are then theta,
  // sx, sy, phi,
  return {
    translateX: m.e,
    translateY: m.f,
    rotateZ: angle,
    scaleX: scaleX,
    scaleY: scaleY,
    matrix: [m11, m12, m21, m22, 0, 0],
  };
}
