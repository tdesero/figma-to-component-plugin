/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/getStyles.ts":
/*!**************************!*\
  !*** ./src/getStyles.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStyles": () => (/* binding */ getStyles)
/* harmony export */ });
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/helpers */ "./src/helpers/helpers.ts");
/* harmony import */ var _helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/propsHelpers */ "./src/helpers/propsHelpers.ts");


function getStyles(figma) {
    var _a, _b;
    const paintStyles = (_a = figma.getLocalPaintStyles()) === null || _a === void 0 ? void 0 : _a.map(({ name, paints }) => {
        return {
            name: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)(name),
            value: (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_1__.getColor)(paints === null || paints === void 0 ? void 0 : paints[0], false),
        };
    });
    const textStyles = (_b = figma.getLocalTextStyles()) === null || _b === void 0 ? void 0 : _b.map((style) => {
        var _a, _b;
        const { weight, isItalic } = (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_1__.fontStyleAsObject)(style.fontName);
        const fontSize = (_a = style.fontSize) === null || _a === void 0 ? void 0 : _a.toString();
        const fontFamily = (_b = style.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
        const lineHeightStr = (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_1__.lineHeight)(style);
        return {
            name: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)(style.name),
            value: (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_1__.fontShorthand)({
                lineHeight: lineHeightStr,
                fontSize,
                weight,
                fontFamily,
                isItalic,
            }),
        };
    });
    console.log("textstyles", textStyles);
    return {
        paintStyles,
        textStyles,
    };
}


/***/ }),

/***/ "./src/helpers/helpers.ts":
/*!********************************!*\
  !*** ./src/helpers/helpers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanStyleName": () => (/* binding */ cleanStyleName),
/* harmony export */   "colorAsHexOrRgba": () => (/* binding */ colorAsHexOrRgba),
/* harmony export */   "componentTo255": () => (/* binding */ componentTo255),
/* harmony export */   "componentToHex": () => (/* binding */ componentToHex),
/* harmony export */   "escapeHtml": () => (/* binding */ escapeHtml),
/* harmony export */   "getTransforms": () => (/* binding */ getTransforms),
/* harmony export */   "makeSafeForCSS": () => (/* binding */ makeSafeForCSS),
/* harmony export */   "rgbToHex": () => (/* binding */ rgbToHex),
/* harmony export */   "rgbaColor": () => (/* binding */ rgbaColor)
/* harmony export */ });
/* helpers */
function componentToHex(c) {
    var hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function componentTo255(c) {
    return Math.round(c * 255);
}
function rgbToHex(rgb) {
    if (typeof rgb !== "object")
        return;
    const { r, g, b, a } = rgb;
    if (!a) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}
function rgbaColor(obj, a) {
    if (typeof obj !== "object") {
        console.error("rgb color must be object");
        return;
    }
    const { r, g, b } = obj;
    return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(b)}, ${a.toFixed(2)})`;
}
function colorAsHexOrRgba(fill) {
    if (!fill) {
        console.error("colorAsHexOrRgba was called without fill object");
        return;
    }
    if (fill.opacity && fill.opacity < 1) {
        return rgbaColor(fill.color, fill.opacity);
    }
    else {
        return rgbToHex(fill.color);
    }
}
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32)
            return "-";
        if (c >= 65 && c <= 90)
            return s.toLowerCase();
        return "-";
    });
}
function cleanStyleName(name) {
    //const nameArr = name.split("/");
    //return makeSafeForCSS(nameArr[nameArr.length - 1].trim());
    if (!name)
        return;
    return makeSafeForCSS(name.replaceAll(" ", ""));
}
/**
 * Returns all relevant transformation information from a (figma) transform matrix
 */
function getTransforms(fm) {
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
        angle: transforms.rotateZ,
        scaleX: transforms.scaleX,
        scaleY: transforms.scaleY,
        translateX: m[4],
        translateY: m[5],
        svgMatrix: m.join(" "),
        svgMatrixWithoutTranslate: [fm[0][0], fm[0][1], fm[1][0], fm[1][1]].join(" "),
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
        else
            scaleY = -scaleY;
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


/***/ }),

/***/ "./src/helpers/propsHelpers.ts":
/*!*************************************!*\
  !*** ./src/helpers/propsHelpers.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "borderProp": () => (/* binding */ borderProp),
/* harmony export */   "borderRadius": () => (/* binding */ borderRadius),
/* harmony export */   "boxShadow": () => (/* binding */ boxShadow),
/* harmony export */   "dimensions": () => (/* binding */ dimensions),
/* harmony export */   "displayProp": () => (/* binding */ displayProp),
/* harmony export */   "fillColor": () => (/* binding */ fillColor),
/* harmony export */   "fontProp": () => (/* binding */ fontProp),
/* harmony export */   "fontShorthand": () => (/* binding */ fontShorthand),
/* harmony export */   "fontStyleAsObject": () => (/* binding */ fontStyleAsObject),
/* harmony export */   "getColor": () => (/* binding */ getColor),
/* harmony export */   "gradientLinear": () => (/* binding */ gradientLinear),
/* harmony export */   "lineHeight": () => (/* binding */ lineHeight),
/* harmony export */   "opacity": () => (/* binding */ opacity),
/* harmony export */   "overflow": () => (/* binding */ overflow),
/* harmony export */   "paddingProp": () => (/* binding */ paddingProp),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "strokeColor": () => (/* binding */ strokeColor),
/* harmony export */   "transforms": () => (/* binding */ transforms)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers/helpers.ts");

/* css props helpers */
function borderProp(node) {
    var _a, _b;
    if (node.type === "VECTOR")
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    if (((_b = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "GRADIENT_LINEAR") {
        return `
    border-width:  ${node.strokeWeight}px; 
    border-style: solid; 
    border-image: ${strokeColor(node)}; 
    border-image-slice: 1;
    `;
    }
    return `border: ${node.strokeWeight}px solid ${strokeColor(node)};`;
}
function paddingProp(node) {
    if (!node.paddingTop &&
        !node.paddingRight &&
        !node.paddingBottom &&
        !node.paddingLeft)
        return "";
    return `padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`;
}
function displayProp(node) {
    const flexShrinkGrow = node.layoutGrow === 1 ? "flex-grow: 1; flex-shrink: 1;" : shrink();
    function shrink() {
        return !(node.type === "TEXT") && !(node.primaryAxisSizingMode === "AUTO")
            ? "flex-shrink: 0;"
            : "";
    }
    const layoutAlign = node.layoutAlign === "STRETCH" ? "align-self: stretch;" : "";
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
    if (node.parent.layoutMode === "HORIZONTAL" ||
        node.parent.layoutMode === "VERTICAL") {
        layoutProps += layoutAlign + flexShrinkGrow;
    }
    return layoutProps;
}
function dimensions(node) {
    var _a, _b;
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
    // default case
    if (!node.layoutMode || node.layoutMode === "NONE") {
        height = ((_a = node.textAutoResize) === null || _a === void 0 ? void 0 : _a.toString().includes("HEIGHT"))
            ? "auto"
            : node.height + "px";
        width = ((_b = node.textAutoResize) === null || _b === void 0 ? void 0 : _b.toString().includes("WIDTH"))
            ? "auto"
            : node.width + "px";
    }
    if (node.parent.layoutMode === "HORIZONTAL" &&
        node.layoutAlign === "STRETCH") {
        height = "auto";
    }
    if (node.parent.layoutMode === "VERTICAL" && node.layoutAlign === "STRETCH") {
        width = "auto";
    }
    if (node.parent.layoutMode === "HORIZONTAL" && node.layoutGrow === 1) {
        width = "auto";
    }
    if (node.parent.layoutMode === "VERTICAL" && node.layoutGrow === 1) {
        height = "auto";
    }
    return `width: ${width}; height: ${height};`;
}
function overflow(node) {
    if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION")
        return "overflow: visible;";
    return node.clipsContent ? "overflow: hidden;" : "";
}
function opacity(node) {
    if (node.opacity === 1)
        return "";
    return `opacity: ${node.opacity};`;
}
function position(node) {
    const coord = node.id === figma.currentPage.selection[0].id
        ? ""
        : `left: ${node.x}px; top: ${node.y}px`;
    const positionFromParent = (node) => {
        if (node.type === "GROUP" || node.type === "BOOLEAN_OPERATION") {
            return "static";
        }
        if (node.id === figma.currentPage.selection[0].id) {
            return "relative";
        }
        return `${node.parent.layoutMode === "NONE" || !node.parent.layoutMode
            ? `absolute; ${coord}`
            : "relative"}`;
    };
    return `
      position: ${positionFromParent(node)};
    `;
}
function boxShadow(node) {
    var _a;
    if (!node.effects || node.effects.length === 0)
        return "";
    const shadows = node.effects.filter((effect) => effect.type === "DROP_SHADOW");
    if (shadows.length === 0)
        return "";
    let css = "box-shadow: ";
    css += shadows
        .map((s) => {
        return `${s.offset.x}px ${s.offset.y}px ${s.radius}px ${s.spread}px ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(s.color, s.color.a)}`;
    })
        .join(", ");
    return (`${node.effectStyleId &&
        "/*" + ((_a = figma.getStyleById(node.effectStyleId)) === null || _a === void 0 ? void 0 : _a.name) + "*/"}` +
        css +
        ";");
}
function fontStyleAsObject(fontName) {
    var _a, _b;
    const isItalic = (_a = fontName === null || fontName === void 0 ? void 0 : fontName.style) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("italic");
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
    const weight = (_b = fontName === null || fontName === void 0 ? void 0 : fontName.style) === null || _b === void 0 ? void 0 : _b.toLowerCase().replace("italic", "").trim();
    return {
        weight: weightMap[weight],
        isItalic,
    };
}
function fillColor(node) {
    var _a;
    if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION")
        return "";
    //atm only one fill is supported
    const fill = (_a = node.fills) === null || _a === void 0 ? void 0 : _a[0];
    return getColor(fill, node.fillStyleId);
}
function transforms(node) {
    if (node.rotation && node.type !== "GROUP") {
        return `
        transform-origin: 0 0;
        transform: rotate(${node.rotation * -1}deg);
      `;
    }
    else {
        return "";
    }
}
function gradientLinear(fill) {
    const { gradientStops } = fill;
    const transforms = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getTransforms)(fill.gradientTransform);
    console.log(fill.gradientTransform);
    const gradientMap = gradientStops.map((s) => {
        return `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(s.color, s.color.a)} ${s.position * 100}%`;
    });
    return `linear-gradient(${transforms.angle + 90}deg, ${gradientMap.join(",")})`;
}
function borderRadius(node) {
    if (node.type === "ELLIPSE")
        return "border-radius: 50%;";
    return `border-radius: ${typeof node.cornerRadius === "number"
        ? node.cornerRadius + "px"
        : `${node.topLeftRadius}px ${node.topRightRadius}px ${node.bottomRightRadius}px ${node.bottomLeftRadius}px`};`;
}
function strokeColor(node) {
    var _a;
    const stroke = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0];
    return getColor(stroke, node.strokeStyleId);
}
function getColor(fillOrColor, styleId) {
    var _a;
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
        const styleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        const color = fillOrColor.opacity < 1
            ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(fillOrColor.color, fillOrColor.opacity)
            : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(fillOrColor.color);
        return `var(--${styleName}, ${color})`;
    }
    return fillOrColor.opacity < 1
        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(fillOrColor.color, fillOrColor.opacity)
        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(fillOrColor.color);
}
function lineHeight(nodeOrStyle) {
    if (!nodeOrStyle.lineHeight)
        return "";
    if (nodeOrStyle.lineHeight.unit === "AUTO")
        return "";
    const unitMap = {
        PIXELS: "px",
        PERCENT: "%",
    };
    const unit = unitMap[nodeOrStyle.lineHeight.unit];
    return `${nodeOrStyle.lineHeight.value}${unit}`;
}
function fontShorthand({ lineHeight, fontSize, weight, fontFamily, isItalic, }) {
    const italic = isItalic ? "italic " : "";
    return `${weight} ${italic}${fontSize}px${lineHeight !== "" ? "/" + lineHeight : ""} '${fontFamily}'`;
}
function fontProp(node) {
    var _a, _b, _c;
    const { weight, isItalic } = fontStyleAsObject(node.fontName);
    const fontSize = (_a = node.fontSize) === null || _a === void 0 ? void 0 : _a.toString();
    const fontFamily = (_b = node.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
    const lineHeightStr = lineHeight(node);
    const shorthand = fontShorthand({
        lineHeight: lineHeightStr,
        fontSize,
        weight,
        fontFamily,
        isItalic,
    });
    if (node.textStyleId) {
        const styleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_c = figma.getStyleById(node.textStyleId.toString())) === null || _c === void 0 ? void 0 : _c.name);
        return `font: var(--${styleName}, ${shorthand});`;
    }
    return `font: ${shorthand};`;
}
/* css props helepers end */


/***/ }),

/***/ "./src/tailwind.ts":
/*!*************************!*\
  !*** ./src/tailwind.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tailwind": () => (/* binding */ tailwind)
/* harmony export */ });
/* JUST FOR TESTING */
function tailwind(tree) {
    let html = "";
    function childrenEl(treeElement) {
        var _a;
        if (((_a = treeElement.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return theChildren(treeElement.children);
        }
        else {
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
            return `<div class="${tailwindClassNames(treeElement.css)}">\n${treeElement.characters
                ? treeElement.characters.replaceAll("\n", "<br />")
                : ""} ${childrenEl(treeElement)}\n</div>`;
        })
            .join("");
    }
    // why isn't this just "childrenEl" ???
    if (tree.type === "VECTOR") {
        html = "";
    }
    else if (tree.allChildrenAreVector) {
        html = "";
    }
    else {
        html += `<div class="${tailwindClassNames(tree.css)}">\n${tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""} ${childrenEl(tree)}\n</div>`;
    }
    return html;
}
function tailwindClassNames(css) {
    const cssLineByLine = css.replaceAll("\n", "").split(";");
    const keyValuePairs = cssLineByLine.map((line) => {
        const [key, value] = line.split(":");
        return { key: key === null || key === void 0 ? void 0 : key.trim(), value: value === null || value === void 0 ? void 0 : value.trim() };
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
        var _a;
        /* TODO: check for var() */
        const twValue = (_a = twMap[propKey]) === null || _a === void 0 ? void 0 : _a[value];
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/propsHelpers */ "./src/helpers/propsHelpers.ts");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/helpers */ "./src/helpers/helpers.ts");
/* harmony import */ var _getStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getStyles */ "./src/getStyles.ts");
/* harmony import */ var _tailwind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tailwind */ "./src/tailwind.ts");



/* JUST FOR TESTING */

function nodeCSS(node) {
    var _a, _b;
    console.log(node);
    if (((_a = node.type) === null || _a === void 0 ? void 0 : _a.toString()) === "TEXT") {
        return `
      color: ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(node)};
      text-align: ${(_b = node.textAlignHorizontal) === null || _b === void 0 ? void 0 : _b.toLowerCase()};
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fontProp)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.opacity)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.position)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.displayProp)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.dimensions)(node)}
      margin: 0;
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.transforms)(node)}
    `;
    }
    else {
        return `
      box-sizing: border-box;
      background: ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(node)};
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.borderRadius)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.borderProp)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.opacity)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.paddingProp)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.displayProp)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.dimensions)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.position)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.boxShadow)(node)}
      margin: 0;
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.transforms)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.overflow)(node)}
    `;
    }
}
function createTree(selection) {
    var _a;
    let componentName = "component";
    // Only to prevent duplicate Names
    const allNames = [];
    function uniqueName(className, n = 0) {
        const suffix = n > 0 ? n : "";
        if (allNames.includes(className + suffix)) {
            return uniqueName(className, n + 1);
        }
        else {
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
    const frame = selection[0];
    componentName = (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(frame.name);
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
            var _a;
            if (!node.visible)
                return;
            const newElement = {
                name: `${componentName}__${uniqueName((0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(node.name))}`,
                css: nodeCSS(node),
                allChildrenAreVector: allChildrenAreVector(node),
                children: [],
                type: node.type,
                characters: node.characters,
                originalNode: node,
            };
            treeChildren === null || treeChildren === void 0 ? void 0 : treeChildren.push(newElement);
            if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(node.children, newElement.children);
            }
        });
    }
    if (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
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
        var _a;
        if (((_a = treeElement.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return theChildren(treeElement.children);
        }
        else {
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
                return createSVGOfChildren(treeElement.originalNode, treeElement.name);
            }
            return `<div class="${treeElement.name}">\n${treeElement.characters
                ? treeElement.characters.replaceAll("\n", "<br />")
                : ""} ${childrenEl(treeElement)}\n</div>`;
        })
            .join("");
    }
    // why isn't this just "childrenEl" ???
    if (tree.type === "VECTOR") {
        html = createSVG(tree.originalNode, tree.name);
    }
    else if (tree.allChildrenAreVector) {
        html = createSVGOfChildren(tree.originalNode, tree.name);
    }
    else {
        html += `<div class="${tree.name}">\n${tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""} ${childrenEl(tree)}\n</div>`;
    }
    return html;
}
function allChildrenAreVector(frame) {
    var _a, _b, _c;
    return (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        ((_b = frame.children) === null || _b === void 0 ? void 0 : _b.filter((n) => n.type === "VECTOR").length) ===
            ((_c = frame.children) === null || _c === void 0 ? void 0 : _c.length));
}
/* TODO: Rewrite with exportAsync() */
function createSVG(node, className) {
    var _a;
    const geometry = node.vectorPaths;
    const paths = geometry === null || geometry === void 0 ? void 0 : geometry.map((p) => {
        return `<path d="${p.data}" fill-rule="${p.windingRule
            .toString()
            .toLowerCase()}" />`;
    });
    return `<svg 
  class="${className}"
  width="${node.width}" 
  height="${node.height}" 
  stroke-width="${node.strokeWeight}" 
  stroke="${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.strokeColor)(node)}" 
  stroke-linecap="${node.strokeCap.toString().toLowerCase()}"
  fill="${((_a = node.fills) === null || _a === void 0 ? void 0 : _a.length) === 0 ? "none" : (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(node)}"
  transform-origin="0 0"
  transform="scale(${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleX} ${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleY})" 
  >
    ${paths.join("")}
  </svg>`;
}
/* TODO: Rewrite with exportAsync() and combine with above */
function createSVGOfChildren(node, className) {
    var _a;
    const paths = (_a = node.children) === null || _a === void 0 ? void 0 : _a.map((n) => {
        const geometry = n.vectorPaths;
        return geometry === null || geometry === void 0 ? void 0 : geometry.map((p) => {
            var _a;
            return `<path 
        d="${p.data}"
        fill-rule="${p.windingRule.toString().toLowerCase()}"
        stroke="${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.strokeColor)(n)}"
        stroke-width="${n.strokeWeight}"  
        stroke-linecap="${n.strokeCap.toString().toLowerCase()}"
        fill="${((_a = n.fills) === null || _a === void 0 ? void 0 : _a.length) === 0 ? "none" : (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(n)}" 
        transform-origin="0 0"
        transform="translate(${n.x} ${n.y}) rotate(${n.rotation * -1}, 0, 0) scale(${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(n.absoluteTransform).scaleX} ${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(n.absoluteTransform).scaleY})"
      />`;
        }).join("");
    });
    return `<svg 
    class="${className}"
    width="${node.width}" 
    height="${node.height}" 
    viewBox="0 0 ${node.width} ${node.height}"
    transform-origin="0 0"
    transform="scale(${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleX} ${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleY})" 
    >
      ${paths.join("")}
  </svg>`;
}
figma.parameters.on("input", ({ parameters, key, query, result }) => {
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
});
figma.on("run", ({ command, parameters }) => {
    var _a, _b, _c;
    console.log("command: " + command, parameters);
    console.log((0,_tailwind__WEBPACK_IMPORTED_MODULE_3__.tailwind)(tree));
    figma.showUI(__html__, { height: 500, width: 400 });
    figma.ui.postMessage({
        css: printCSS(tree),
        html: printHTML(tree),
        framework: parameters.framework,
        styles: parameters.withStyles === "All Styles" ? (0,_getStyles__WEBPACK_IMPORTED_MODULE_2__.getStyles)(figma) : null,
        name: (_c = (_b = (_a = figma.currentPage) === null || _a === void 0 ? void 0 : _a.selection) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name,
    });
});
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxXQUFXO0FBQ3hCLGNBQWMsWUFBWTtBQUMxQixtQkFBbUIsWUFBWSxFQUFFLFlBQVk7QUFDN0M7QUFDQSx1QkFBdUIsK0RBQWEsaUNBQWlDLEVBQUUsK0RBQWEsZ0NBQWdDO0FBQ3BIO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0NBQWdDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVE7QUFDeEIsNkJBQTZCLHlCQUF5QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxxREFBUztBQUNsRTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvZ2V0U3R5bGVzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL3Byb3BzSGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy90YWlsd2luZC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZm9udFN0eWxlQXNPYmplY3QsIGxpbmVIZWlnaHQsIGZvbnRTaG9ydGhhbmQsIGdldENvbG9yLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgoeyBuYW1lLCBwYWludHMgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKG5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0Q29sb3IocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChzdHlsZS5mb250TmFtZSk7XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQoc3R5bGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKHN0eWxlLm5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWMsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwidGV4dHN0eWxlc1wiLCB0ZXh0U3R5bGVzKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlcyxcclxuICAgIH07XHJcbn1cclxuIiwiLyogaGVscGVycyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHJnYjtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIGByZ2JhKCR7Y29tcG9uZW50VG8yNTUocil9LCAke2NvbXBvbmVudFRvMjU1KGcpfSwgJHtjb21wb25lbnRUbzI1NShiKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICBpZiAoIW5hbWUpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCJcIikpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCByZWxldmFudCB0cmFuc2Zvcm1hdGlvbiBpbmZvcm1hdGlvbiBmcm9tIGEgKGZpZ21hKSB0cmFuc2Zvcm0gbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtcyhmbSkge1xyXG4gICAgLy8gYW55dGhpbmcgd3Jvbmcgd2l0aCB0aGUgdHJhbnNmb3Jtcz8gTm90IHN1cmUgaWYgaSBzb3J0ZWQgaXQgcmlnaHQgaGVyZS4uLlxyXG4gICAgLy9jb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG1hdHJpeCA9IHtcclxuICAgICAgICBhOiBtWzBdLFxyXG4gICAgICAgIGI6IG1bMV0sXHJcbiAgICAgICAgYzogbVsyXSxcclxuICAgICAgICBkOiBtWzNdLFxyXG4gICAgICAgIGU6IG1bNF0sXHJcbiAgICAgICAgZjogbVs1XSxcclxuICAgIH07XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZGVjb21wb3NlTWF0cml4MkRXMyhtYXRyaXgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhbmdsZTogdHJhbnNmb3Jtcy5yb3RhdGVaLFxyXG4gICAgICAgIHNjYWxlWDogdHJhbnNmb3Jtcy5zY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiB0cmFuc2Zvcm1zLnNjYWxlWSxcclxuICAgICAgICB0cmFuc2xhdGVYOiBtWzRdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG1bNV0sXHJcbiAgICAgICAgc3ZnTWF0cml4OiBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIHN2Z01hdHJpeFdpdGhvdXRUcmFuc2xhdGU6IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXV0uam9pbihcIiBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGRlY29tcG9zZU1hdHJpeDJEVzMobSkge1xyXG4gICAgdmFyIHJvdzB4ID0gbS5hO1xyXG4gICAgdmFyIHJvdzB5ID0gbS5iO1xyXG4gICAgdmFyIHJvdzF4ID0gbS5jO1xyXG4gICAgdmFyIHJvdzF5ID0gbS5kO1xyXG4gICAgdmFyIHNjYWxlWCA9IE1hdGguc3FydChyb3cweCAqIHJvdzB4ICsgcm93MHkgKiByb3cweSk7XHJcbiAgICB2YXIgc2NhbGVZID0gTWF0aC5zcXJ0KHJvdzF4ICogcm93MXggKyByb3cxeSAqIHJvdzF5KTtcclxuICAgIC8vIElmIGRldGVybWluYW50IGlzIG5lZ2F0aXZlLCBvbmUgYXhpcyB3YXMgZmxpcHBlZC5cclxuICAgIHZhciBkZXRlcm1pbmFudCA9IHJvdzB4ICogcm93MXkgLSByb3cweSAqIHJvdzF4O1xyXG4gICAgaWYgKGRldGVybWluYW50IDwgMClcclxuICAgICAgICBpZiAocm93MHggPCByb3cxeSlcclxuICAgICAgICAgICAgLy8gRmxpcCBheGlzIHdpdGggbWluaW11bSB1bml0IHZlY3RvciBkb3QgcHJvZHVjdC5cclxuICAgICAgICAgICAgc2NhbGVYID0gLXNjYWxlWDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNjYWxlWSA9IC1zY2FsZVk7XHJcbiAgICAvLyBSZW5vcm1hbGl6ZSBtYXRyaXggdG8gcmVtb3ZlIHNjYWxlLlxyXG4gICAgaWYgKHNjYWxlWCkge1xyXG4gICAgICAgIHJvdzB4ICo9IDEgLyBzY2FsZVg7XHJcbiAgICAgICAgcm93MHkgKj0gMSAvIHNjYWxlWDtcclxuICAgIH1cclxuICAgIGlmIChzY2FsZVkpIHtcclxuICAgICAgICByb3cxeCAqPSAxIC8gc2NhbGVZO1xyXG4gICAgICAgIHJvdzF5ICo9IDEgLyBzY2FsZVk7XHJcbiAgICB9XHJcbiAgICAvLyBDb21wdXRlIHJvdGF0aW9uIGFuZCByZW5vcm1hbGl6ZSBtYXRyaXguXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHJvdzB5LCByb3cweCk7XHJcbiAgICBpZiAoYW5nbGUpIHtcclxuICAgICAgICAvLyBSb3RhdGUoLWFuZ2xlKSA9IFtjb3MoYW5nbGUpLCBzaW4oYW5nbGUpLCAtc2luKGFuZ2xlKSwgY29zKGFuZ2xlKV1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICA9IFtyb3cweCwgLXJvdzB5LCByb3cweSwgcm93MHhdXHJcbiAgICAgICAgLy8gVGhhbmtzIHRvIHRoZSBub3JtYWxpemF0aW9uIGFib3ZlLlxyXG4gICAgICAgIHZhciBzbiA9IC1yb3cweTtcclxuICAgICAgICB2YXIgY3MgPSByb3cweDtcclxuICAgICAgICB2YXIgbTExID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMiA9IHJvdzB5O1xyXG4gICAgICAgIHZhciBtMjEgPSByb3cxeDtcclxuICAgICAgICB2YXIgbTIyID0gcm93MXk7XHJcbiAgICAgICAgcm93MHggPSBjcyAqIG0xMSArIHNuICogbTIxO1xyXG4gICAgICAgIHJvdzB5ID0gY3MgKiBtMTIgKyBzbiAqIG0yMjtcclxuICAgICAgICByb3cxeCA9IC1zbiAqIG0xMSArIGNzICogbTIxO1xyXG4gICAgICAgIHJvdzF5ID0gLXNuICogbTEyICsgY3MgKiBtMjI7XHJcbiAgICB9XHJcbiAgICBtMTEgPSByb3cweDtcclxuICAgIG0xMiA9IHJvdzB5O1xyXG4gICAgbTIxID0gcm93MXg7XHJcbiAgICBtMjIgPSByb3cxeTtcclxuICAgIC8vIENvbnZlcnQgaW50byBkZWdyZWVzIGJlY2F1c2Ugb3VyIHJvdGF0aW9uIGZ1bmN0aW9ucyBleHBlY3QgaXQuXHJcbiAgICBhbmdsZSA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xyXG4gICAgLy8gVGhlIHJlcXVlc3RlZCBwYXJhbWV0ZXJzIGFyZSB0aGVuIHRoZXRhLFxyXG4gICAgLy8gc3gsIHN5LCBwaGksXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG0uZSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtLmYsXHJcbiAgICAgICAgcm90YXRlWjogYW5nbGUsXHJcbiAgICAgICAgc2NhbGVYOiBzY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiBzY2FsZVksXHJcbiAgICAgICAgbWF0cml4OiBbbTExLCBtMTIsIG0yMSwgbTIyLCAwLCAwXSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgcmdiVG9IZXgsIHJnYmFDb2xvciwgZ2V0VHJhbnNmb3JtcywgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbi8qIGNzcyBwcm9wcyBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCFub2RlLnN0cm9rZXMgfHwgIW5vZGUuc3Ryb2tlV2VpZ2h0IHx8IG5vZGUuc3Ryb2tlcy5sZW5ndGggPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCgoX2IgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnR5cGUpID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIGJvcmRlci13aWR0aDogICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXgtZ3JvdzogMTsgZmxleC1zaHJpbms6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25JdGVtc01hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBjb25zdCBqdXN0aWZ5Q29udGVudE1hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgLy8gcG9zaXRpb246ICR7W1wiRlJBTUVcIiwgXCJDT01QT05FTlRcIiwgXCJJTlNUQU5DRVwiXS5pbmNsdWRlcyhub2RlLnR5cGUpID8gJ3JlbGF0aXZlJyA6ICdzdGF0aWMnfTsgLyogZG9udCBnZXQgdGhpcy4uLiAqL1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGxldCBoZWlnaHQgPSBcIlwiO1xyXG4gICAgbGV0IHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICAvLyBkZWZhdWx0IGNhc2VcclxuICAgIGlmICghbm9kZS5sYXlvdXRNb2RlIHx8IG5vZGUubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSAoKF9hID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJIRUlHSFRcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9ICgoX2IgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKS5pbmNsdWRlcyhcIldJRFRIXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJlxyXG4gICAgICAgIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgd2lkdGg6ICR7d2lkdGh9OyBoZWlnaHQ6ICR7aGVpZ2h0fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVyZmxvdyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIm92ZXJmbG93OiB2aXNpYmxlO1wiO1xyXG4gICAgcmV0dXJuIG5vZGUuY2xpcHNDb250ZW50ID8gXCJvdmVyZmxvdzogaGlkZGVuO1wiIDogXCJcIjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3BhY2l0eShub2RlKSB7XHJcbiAgICBpZiAobm9kZS5vcGFjaXR5ID09PSAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBvcGFjaXR5OiAke25vZGUub3BhY2l0eX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xyXG4gICAgY29uc3QgY29vcmQgPSBub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWRcclxuICAgICAgICA/IFwiXCJcclxuICAgICAgICA6IGBsZWZ0OiAke25vZGUueH1weDsgdG9wOiAke25vZGUueX1weGA7XHJcbiAgICBjb25zdCBwb3NpdGlvbkZyb21QYXJlbnQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGF0aWNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7bm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIgfHwgIW5vZGUucGFyZW50LmxheW91dE1vZGVcclxuICAgICAgICAgICAgPyBgYWJzb2x1dGU7ICR7Y29vcmR9YFxyXG4gICAgICAgICAgICA6IFwicmVsYXRpdmVcIn1gO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9uRnJvbVBhcmVudChub2RlKX07XHJcbiAgICBgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3hTaGFkb3cobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFub2RlLmVmZmVjdHMgfHwgbm9kZS5lZmZlY3RzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHNoYWRvd3MgPSBub2RlLmVmZmVjdHMuZmlsdGVyKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSBcIkRST1BfU0hBRE9XXCIpO1xyXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgbGV0IGNzcyA9IFwiYm94LXNoYWRvdzogXCI7XHJcbiAgICBjc3MgKz0gc2hhZG93c1xyXG4gICAgICAgIC5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7cy5vZmZzZXQueH1weCAke3Mub2Zmc2V0Lnl9cHggJHtzLnJhZGl1c31weCAke3Muc3ByZWFkfXB4ICR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9YDtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIsIFwiKTtcclxuICAgIHJldHVybiAoYCR7bm9kZS5lZmZlY3RTdHlsZUlkICYmXHJcbiAgICAgICAgXCIvKlwiICsgKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmVmZmVjdFN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkgKyBcIiovXCJ9YCArXHJcbiAgICAgICAgY3NzICtcclxuICAgICAgICBcIjtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTdHlsZUFzT2JqZWN0KGZvbnROYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgaXNJdGFsaWMgPSAoX2EgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiaXRhbGljXCIpO1xyXG4gICAgY29uc3Qgd2VpZ2h0TWFwID0ge1xyXG4gICAgICAgIHRoaW46IDEwMCxcclxuICAgICAgICBcImV4dHJhIGxpZ2h0XCI6IDIwMCxcclxuICAgICAgICBleHRyYWxpZ2h0OiAyMDAsXHJcbiAgICAgICAgbGlnaHQ6IDMwMCxcclxuICAgICAgICBub3JtYWw6IDQwMCxcclxuICAgICAgICByZWd1bGFyOiA0MDAsXHJcbiAgICAgICAgbWVkaXVtOiA1MDAsXHJcbiAgICAgICAgXCJzZW1pIGJvbGRcIjogNjAwLFxyXG4gICAgICAgIHNlbWlib2xkOiA2MDAsXHJcbiAgICAgICAgYm9sZDogNzAwLFxyXG4gICAgICAgIFwiZXh0cmEgYm9sZFwiOiA4MDAsXHJcbiAgICAgICAgZXh0cmFib2xkOiA4MDAsXHJcbiAgICAgICAgYmxhY2s6IDkwMCxcclxuICAgIH07XHJcbiAgICBjb25zdCB3ZWlnaHQgPSAoX2IgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJpdGFsaWNcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB3ZWlnaHQ6IHdlaWdodE1hcFt3ZWlnaHRdLFxyXG4gICAgICAgIGlzSXRhbGljLFxyXG4gICAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbENvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvL2F0bSBvbmx5IG9uZSBmaWxsIGlzIHN1cHBvcnRlZFxyXG4gICAgY29uc3QgZmlsbCA9IChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihmaWxsLCBub2RlLmZpbGxTdHlsZUlkKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3Jtcyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS5yb3RhdGlvbiAmJiBub2RlLnR5cGUgIT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCR7bm9kZS5yb3RhdGlvbiAqIC0xfWRlZyk7XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ3JhZGllbnRMaW5lYXIoZmlsbCkge1xyXG4gICAgY29uc3QgeyBncmFkaWVudFN0b3BzIH0gPSBmaWxsO1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGdldFRyYW5zZm9ybXMoZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICBjb25zb2xlLmxvZyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnN0IGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9ICR7cy5wb3NpdGlvbiAqIDEwMH0lYDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHt0cmFuc2Zvcm1zLmFuZ2xlICsgOTB9ZGVnLCAke2dyYWRpZW50TWFwLmpvaW4oXCIsXCIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJSYWRpdXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJFTExJUFNFXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXJhZGl1czogNTAlO1wiO1xyXG4gICAgcmV0dXJuIGBib3JkZXItcmFkaXVzOiAke3R5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgID8gbm9kZS5jb3JuZXJSYWRpdXMgKyBcInB4XCJcclxuICAgICAgICA6IGAke25vZGUudG9wTGVmdFJhZGl1c31weCAke25vZGUudG9wUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbVJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21MZWZ0UmFkaXVzfXB4YH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc3Ryb2tlQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3Ioc3Ryb2tlLCBub2RlLnN0cm9rZVN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xvcihmaWxsT3JDb2xvciwgc3R5bGVJZCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFmaWxsT3JDb2xvcikge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGxPckNvbG9yLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRMaW5lYXIoZmlsbE9yQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQoc3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9IGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4gYHZhcigtLSR7c3R5bGVOYW1lfSwgJHtjb2xvcn0pYDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGVPclN0eWxlKSB7XHJcbiAgICBpZiAoIW5vZGVPclN0eWxlLmxpbmVIZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAobm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0ID09PSBcIkFVVE9cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdW5pdCA9IHVuaXRNYXBbbm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBgJHtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnZhbHVlfSR7dW5pdH1gO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U2hvcnRoYW5kKHsgbGluZUhlaWdodCwgZm9udFNpemUsIHdlaWdodCwgZm9udEZhbWlseSwgaXNJdGFsaWMsIH0pIHtcclxuICAgIGNvbnN0IGl0YWxpYyA9IGlzSXRhbGljID8gXCJpdGFsaWMgXCIgOiBcIlwiO1xyXG4gICAgcmV0dXJuIGAke3dlaWdodH0gJHtpdGFsaWN9JHtmb250U2l6ZX1weCR7bGluZUhlaWdodCAhPT0gXCJcIiA/IFwiL1wiICsgbGluZUhlaWdodCA6IFwiXCJ9ICcke2ZvbnRGYW1pbHl9J2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChub2RlLmZvbnROYW1lKTtcclxuICAgIGNvbnN0IGZvbnRTaXplID0gKF9hID0gbm9kZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gbm9kZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQobm9kZSk7XHJcbiAgICBjb25zdCBzaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgIGZvbnRTaXplLFxyXG4gICAgICAgIHdlaWdodCxcclxuICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgIGlzSXRhbGljLFxyXG4gICAgfSk7XHJcbiAgICBpZiAobm9kZS50ZXh0U3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYyA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnRleHRTdHlsZUlkLnRvU3RyaW5nKCkpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGBmb250OiB2YXIoLS0ke3N0eWxlTmFtZX0sICR7c2hvcnRoYW5kfSk7YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgZm9udDogJHtzaG9ydGhhbmR9O2A7XHJcbn1cclxuLyogY3NzIHByb3BzIGhlbGVwZXJzIGVuZCAqL1xyXG4iLCIvKiBKVVNUIEZPUiBURVNUSU5HICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWlsd2luZCh0cmVlKSB7XHJcbiAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICBmdW5jdGlvbiBjaGlsZHJlbkVsKHRyZWVFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICgoKF9hID0gdHJlZUVsZW1lbnQuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICByZXR1cm4gY2hpbGRyZW5cclxuICAgICAgICAgICAgLm1hcCgodHJlZUVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzKX1cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlRWxlbWVudCl9XFxuPC9kaXY+YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIC8vIHdoeSBpc24ndCB0aGlzIGp1c3QgXCJjaGlsZHJlbkVsXCIgPz8/XHJcbiAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiKSB7XHJcbiAgICAgICAgaHRtbCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgaHRtbCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MpfVwiPlxcbiR7dHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZSl9XFxuPC9kaXY+YDtcclxuICAgIH1cclxuICAgIHJldHVybiBodG1sO1xyXG59XHJcbmZ1bmN0aW9uIHRhaWx3aW5kQ2xhc3NOYW1lcyhjc3MpIHtcclxuICAgIGNvbnN0IGNzc0xpbmVCeUxpbmUgPSBjc3MucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKS5zcGxpdChcIjtcIik7XHJcbiAgICBjb25zdCBrZXlWYWx1ZVBhaXJzID0gY3NzTGluZUJ5TGluZS5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtleS50cmltKCksIHZhbHVlOiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudHJpbSgpIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNzc1Byb3BzTWFwID0ge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IFwiYmdcIixcclxuICAgICAgICBib3JkZXI6IFwiYm9yZGVyXCIsXHJcbiAgICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwicm91bmRlZFwiLFxyXG4gICAgICAgIHBhZGRpbmc6IFwicFwiLFxyXG4gICAgICAgIGNvbG9yOiBcInRleHRcIixcclxuICAgICAgICB3aWR0aDogXCJ3XCIsXHJcbiAgICAgICAgaGVpZ2h0OiBcImhcIixcclxuICAgICAgICBcInRleHQtYWxpZ25cIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJmbGV4LWRpcmVjdGlvblwiOiBcImZsZXhcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJcIixcclxuICAgICAgICBkaXNwbGF5OiBcIlwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNpemVzTWFwID0ge1xyXG4gICAgICAgIFwiMHB4XCI6IDAsXHJcbiAgICAgICAgXCIxcHhcIjogXCJweFwiLFxyXG4gICAgICAgIFwiMnB4XCI6IDAuNSxcclxuICAgICAgICBcIjRweFwiOiAxLFxyXG4gICAgICAgIFwiNnB4XCI6IDEuNSxcclxuICAgICAgICBcIjhweFwiOiAyLFxyXG4gICAgICAgIFwiMTBweFwiOiAyLjUsXHJcbiAgICAgICAgXCIxMnB4XCI6IDMsXHJcbiAgICAgICAgXCIxNHB4XCI6IDMuNSxcclxuICAgICAgICBcIjE2cHhcIjogNCxcclxuICAgICAgICBcIjIwcHhcIjogNSxcclxuICAgICAgICBcIjI0cHhcIjogNixcclxuICAgICAgICAvKiBhbmQgbWFueSBtb3JlICovXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZmxleERpcmVjdGlvbk1hcCA9IHtcclxuICAgICAgICByb3c6IFwicm93XCIsXHJcbiAgICAgICAgY29sdW1uOiBcImNvbFwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHR3TWFwID0ge1xyXG4gICAgICAgIHBhZGRpbmc6IHNpemVzTWFwLFxyXG4gICAgICAgIFwiZmxleC1kaXJlY3Rpb25cIjogZmxleERpcmVjdGlvbk1hcCxcclxuICAgIH07XHJcbiAgICBjb25zdCB2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZSA9IFtcImRpc3BsYXlcIiwgXCJwb3NpdGlvblwiLCBcInRleHQtYWxpZ25cIl07XHJcbiAgICBmdW5jdGlvbiBsb29rVXBUYWlsd2luZFZhbHVlKHByb3BLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIC8qIFRPRE86IGNoZWNrIGZvciB2YXIoKSAqL1xyXG4gICAgICAgIGNvbnN0IHR3VmFsdWUgPSAoX2EgPSB0d01hcFtwcm9wS2V5XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ZhbHVlXTtcclxuICAgICAgICBpZiAodmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UuaW5jbHVkZXMocHJvcEtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXR3VmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBbJHt2YWx1ZX1dYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0ga2V5VmFsdWVQYWlycy5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHdWYWx1ZSA9IGxvb2tVcFRhaWx3aW5kVmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgdHdLZXkgPSBjc3NQcm9wc01hcFtrZXldO1xyXG4gICAgICAgIGlmICghdHdLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFt0d0tleSwgdHdWYWx1ZV0uam9pbihcIi1cIik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjbGFzc05hbWVzLmpvaW4oXCIgXCIpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgYm94U2hhZG93LCBkaW1lbnNpb25zLCBwb3NpdGlvbiwgb3ZlcmZsb3csIG9wYWNpdHksIHN0cm9rZUNvbG9yLCBmb250UHJvcCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUywgZ2V0VHJhbnNmb3JtcyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRTdHlsZXMgfSBmcm9tIFwiLi9nZXRTdHlsZXNcIjtcclxuLyogSlVTVCBGT1IgVEVTVElORyAqL1xyXG5pbXBvcnQgeyB0YWlsd2luZCB9IGZyb20gXCIuL3RhaWx3aW5kXCI7XHJcbmZ1bmN0aW9uIG5vZGVDU1Mobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBjb2xvcjogJHtmaWxsQ29sb3Iobm9kZSl9O1xyXG4gICAgICB0ZXh0LWFsaWduOiAkeyhfYiA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCl9O1xyXG4gICAgICAke2ZvbnRQcm9wKG5vZGUpfVxyXG4gICAgICAke29wYWNpdHkobm9kZSl9XHJcbiAgICAgICR7cG9zaXRpb24obm9kZSl9XHJcbiAgICAgICR7ZGlzcGxheVByb3Aobm9kZSl9XHJcbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgYmFja2dyb3VuZDogJHtmaWxsQ29sb3Iobm9kZSl9O1xyXG4gICAgICAke2JvcmRlclJhZGl1cyhub2RlKX1cclxuICAgICAgJHtib3JkZXJQcm9wKG5vZGUpfVxyXG4gICAgICAke29wYWNpdHkobm9kZSl9XHJcbiAgICAgICR7cGFkZGluZ1Byb3Aobm9kZSl9XHJcbiAgICAgICR7ZGlzcGxheVByb3Aobm9kZSl9XHJcbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtib3hTaGFkb3cobm9kZSl9XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxyXG4gICAgICAke292ZXJmbG93KG5vZGUpfVxyXG4gICAgYDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVUcmVlKHNlbGVjdGlvbikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgbGV0IGNvbXBvbmVudE5hbWUgPSBcImNvbXBvbmVudFwiO1xyXG4gICAgLy8gT25seSB0byBwcmV2ZW50IGR1cGxpY2F0ZSBOYW1lc1xyXG4gICAgY29uc3QgYWxsTmFtZXMgPSBbXTtcclxuICAgIGZ1bmN0aW9uIHVuaXF1ZU5hbWUoY2xhc3NOYW1lLCBuID0gMCkge1xyXG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG4gPiAwID8gbiA6IFwiXCI7XHJcbiAgICAgICAgaWYgKGFsbE5hbWVzLmluY2x1ZGVzKGNsYXNzTmFtZSArIHN1ZmZpeCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZU5hbWUoY2xhc3NOYW1lLCBuICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGxOYW1lcy5wdXNoKGNsYXNzTmFtZSArIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWUgKyBzdWZmaXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJOb3RoaW5nIHNlbGVjdGVkXCIsIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiU2VsZWN0IG9ubHkgMSBDb21wb25lbnRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBmcmFtZSA9IHNlbGVjdGlvblswXTtcclxuICAgIGNvbXBvbmVudE5hbWUgPSBtYWtlU2FmZUZvckNTUyhmcmFtZS5uYW1lKTtcclxuICAgIGNvbnN0IHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1MoZnJhbWUpLFxyXG4gICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3RvcihmcmFtZSksXHJcbiAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgIHR5cGU6IGZyYW1lLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogZnJhbWUuY2hhcmFjdGVycyxcclxuICAgICAgICBvcmlnaW5hbE5vZGU6IGZyYW1lLFxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCB0cmVlQ2hpbGRyZW4pIHtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChub2RlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgaWYgKCFub2RlLnZpc2libGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgJHtjb21wb25lbnROYW1lfV9fJHt1bmlxdWVOYW1lKG1ha2VTYWZlRm9yQ1NTKG5vZGUubmFtZSkpfWAsXHJcbiAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1Mobm9kZSksXHJcbiAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSksXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiBub2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IG5vZGUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgIHRoZUNoaWxkcmVuKGZyYW1lLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cmVlO1xyXG59XHJcbmNvbnN0IHRyZWUgPSBjcmVhdGVUcmVlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XHJcbmZ1bmN0aW9uIHByaW50Q1NTKHRyZWUpIHtcclxuICAgIGxldCBjc3MgPSBcIlwiO1xyXG4gICAgY3NzICs9IGAuJHt0cmVlLm5hbWV9IHske3RyZWUuY3NzfX1cXG5gO1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjc3MgKz0gYC4ke3RyZWVFbGVtZW50Lm5hbWV9IHske3RyZWVFbGVtZW50LmNzc319XFxuYDtcclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50SFRNTCh0cmVlKSB7XHJcbiAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICBmdW5jdGlvbiBjaGlsZHJlbkVsKHRyZWVFbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICgoKF9hID0gdHJlZUVsZW1lbnQuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICByZXR1cm4gY2hpbGRyZW5cclxuICAgICAgICAgICAgLm1hcCgodHJlZUVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVTVkdPZkNoaWxkcmVuKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0cmVlRWxlbWVudC5uYW1lfVwiPlxcbiR7dHJlZUVsZW1lbnQuY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgPyB0cmVlRWxlbWVudC5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIilcclxuICAgICAgICAgICAgICAgIDogXCJcIn0gJHtjaGlsZHJlbkVsKHRyZWVFbGVtZW50KX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gd2h5IGlzbid0IHRoaXMganVzdCBcImNoaWxkcmVuRWxcIiA/Pz9cclxuICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIpIHtcclxuICAgICAgICBodG1sID0gY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgIGh0bWwgPSBjcmVhdGVTVkdPZkNoaWxkcmVuKHRyZWUub3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cIiR7dHJlZS5uYW1lfVwiPlxcbiR7dHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZSl9XFxuPC9kaXY+YDtcclxuICAgIH1cclxuICAgIHJldHVybiBodG1sO1xyXG59XHJcbmZ1bmN0aW9uIGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHJldHVybiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDAgJiZcclxuICAgICAgICAoKF9iID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoKG4pID0+IG4udHlwZSA9PT0gXCJWRUNUT1JcIikubGVuZ3RoKSA9PT1cclxuICAgICAgICAgICAgKChfYyA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSk7XHJcbn1cclxuLyogVE9ETzogUmV3cml0ZSB3aXRoIGV4cG9ydEFzeW5jKCkgKi9cclxuZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBub2RlLnZlY3RvclBhdGhzO1xyXG4gICAgY29uc3QgcGF0aHMgPSBnZW9tZXRyeSA9PT0gbnVsbCB8fCBnZW9tZXRyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ2VvbWV0cnkubWFwKChwKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGA8cGF0aCBkPVwiJHtwLmRhdGF9XCIgZmlsbC1ydWxlPVwiJHtwLndpbmRpbmdSdWxlXHJcbiAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpfVwiIC8+YDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxyXG4gIGNsYXNzPVwiJHtjbGFzc05hbWV9XCJcclxuICB3aWR0aD1cIiR7bm9kZS53aWR0aH1cIiBcclxuICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxyXG4gIHN0cm9rZS13aWR0aD1cIiR7bm9kZS5zdHJva2VXZWlnaHR9XCIgXHJcbiAgc3Ryb2tlPVwiJHtzdHJva2VDb2xvcihub2RlKX1cIiBcclxuICBzdHJva2UtbGluZWNhcD1cIiR7bm9kZS5zdHJva2VDYXAudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpfVwiXHJcbiAgZmlsbD1cIiR7KChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID09PSAwID8gXCJub25lXCIgOiBmaWxsQ29sb3Iobm9kZSl9XCJcclxuICB0cmFuc2Zvcm0tb3JpZ2luPVwiMCAwXCJcclxuICB0cmFuc2Zvcm09XCJzY2FsZSgke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIiBcclxuICA+XHJcbiAgICAke3BhdGhzLmpvaW4oXCJcIil9XHJcbiAgPC9zdmc+YDtcclxufVxyXG4vKiBUT0RPOiBSZXdyaXRlIHdpdGggZXhwb3J0QXN5bmMoKSBhbmQgY29tYmluZSB3aXRoIGFib3ZlICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVNWR09mQ2hpbGRyZW4obm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBwYXRocyA9IChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKG4pID0+IHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG4udmVjdG9yUGF0aHM7XHJcbiAgICAgICAgcmV0dXJuIGdlb21ldHJ5ID09PSBudWxsIHx8IGdlb21ldHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZW9tZXRyeS5tYXAoKHApID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxwYXRoIFxyXG4gICAgICAgIGQ9XCIke3AuZGF0YX1cIlxyXG4gICAgICAgIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcclxuICAgICAgICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG4pfVwiXHJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiJHtuLnN0cm9rZVdlaWdodH1cIiAgXHJcbiAgICAgICAgc3Ryb2tlLWxpbmVjYXA9XCIke24uc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxyXG4gICAgICAgIGZpbGw9XCIkeygoX2EgPSBuLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogZmlsbENvbG9yKG4pfVwiIFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke24ueH0gJHtuLnl9KSByb3RhdGUoJHtuLnJvdGF0aW9uICogLTF9LCAwLCAwKSBzY2FsZSgke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIlxyXG4gICAgICAvPmA7XHJcbiAgICAgICAgfSkuam9pbihcIlwiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxyXG4gICAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxyXG4gICAgd2lkdGg9XCIke25vZGUud2lkdGh9XCIgXHJcbiAgICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxyXG4gICAgdmlld0JveD1cIjAgMCAke25vZGUud2lkdGh9ICR7bm9kZS5oZWlnaHR9XCJcclxuICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXHJcbiAgICA+XHJcbiAgICAgICR7cGF0aHMuam9pbihcIlwiKX1cclxuICA8L3N2Zz5gO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIndpdGhTdHlsZXNcIjpcclxuICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IFtcIkFsbCBTdHlsZXNcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhhbnN3ZXJzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnNvbGUubG9nKFwiY29tbWFuZDogXCIgKyBjb21tYW5kLCBwYXJhbWV0ZXJzKTtcclxuICAgIGNvbnNvbGUubG9nKHRhaWx3aW5kKHRyZWUpKTtcclxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDQwMCB9KTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjc3M6IHByaW50Q1NTKHRyZWUpLFxyXG4gICAgICAgIGh0bWw6IHByaW50SFRNTCh0cmVlKSxcclxuICAgICAgICBmcmFtZXdvcms6IHBhcmFtZXRlcnMuZnJhbWV3b3JrLFxyXG4gICAgICAgIHN0eWxlczogcGFyYW1ldGVycy53aXRoU3R5bGVzID09PSBcIkFsbCBTdHlsZXNcIiA/IGdldFN0eWxlcyhmaWdtYSkgOiBudWxsLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyBNYWtlIHN1cmUgdG8gY2xvc2UgdGhlIHBsdWdpbiB3aGVuIHlvdSdyZSBkb25lLiBPdGhlcndpc2UgdGhlIHBsdWdpbiB3aWxsXHJcbi8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxyXG4vL2ZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==