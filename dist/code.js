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
    console.log(command, parameters);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQzhDO0FBQzFGO0FBQ1A7QUFDQSwwR0FBMEcsY0FBYztBQUN4SDtBQUNBLGtCQUFrQixnRUFBYztBQUNoQyxtQkFBbUIsK0RBQVE7QUFDM0I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUIsRUFBRSx3RUFBaUI7QUFDdEQ7QUFDQTtBQUNBLDhCQUE4QixpRUFBVTtBQUN4QztBQUNBLGtCQUFrQixnRUFBYztBQUNoQyxtQkFBbUIsb0VBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLG1CQUFtQixrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxhQUFhO0FBQ2xHO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKK0U7QUFDL0U7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCLFdBQVcsbUJBQW1CO0FBQ3RFO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQixLQUFLLGtCQUFrQixLQUFLLG1CQUFtQixLQUFLLGlCQUFpQixHQUFHO0FBQy9HO0FBQ087QUFDUCxrRUFBa0UsZUFBZTtBQUNqRjtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpRkFBaUY7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQyx1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsdUJBQXVCO0FBQ3ZCLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsVUFBVSxRQUFRO0FBQy9DO0FBQ087QUFDUDtBQUNBLGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQ7QUFDTztBQUNQO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNPO0FBQ1A7QUFDQTtBQUNBLG1CQUFtQixPQUFPLElBQUksT0FBTyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QixFQUFFLE1BQU07QUFDakMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFdBQVcsS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFNBQVMsS0FBSyxtREFBUyxxQkFBcUI7QUFDNUcsS0FBSztBQUNMO0FBQ0EsZUFBZTtBQUNmLG1IQUFtSDtBQUNuSDtBQUNBLFVBQVU7QUFDVjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQkFBbUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLGdCQUFnQjtBQUM1Qix1QkFBdUIsdURBQWE7QUFDcEM7QUFDQTtBQUNBLGtCQUFrQixtREFBUyxzQkFBc0IsRUFBRSxpQkFBaUI7QUFDcEUsS0FBSztBQUNMLDhCQUE4QixzQkFBc0IsT0FBTyxzQkFBc0I7QUFDakY7QUFDTztBQUNQO0FBQ0EsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWEsbUJBQW1CLEtBQUssb0JBQW9CLEtBQUssdUJBQXVCLEtBQUssc0JBQXNCLEtBQUs7QUFDckg7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFjO0FBQ3hDO0FBQ0EsY0FBYyxtREFBUztBQUN2QixjQUFjLGtEQUFRO0FBQ3RCLHdCQUF3QixVQUFVLElBQUksTUFBTTtBQUM1QztBQUNBO0FBQ0EsVUFBVSxtREFBUztBQUNuQixVQUFVLGtEQUFRO0FBQ2xCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QixFQUFFLEtBQUs7QUFDbEQ7QUFDTyx5QkFBeUIscURBQXFEO0FBQ3JGO0FBQ0EsY0FBYyxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsSUFBSSwyQ0FBMkMsR0FBRyxXQUFXO0FBQ3ZHO0FBQ087QUFDUDtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDBCQUEwQix3REFBYztBQUN4Qyw4QkFBOEIsVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUN4RDtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7Ozs7Ozs7VUN4UkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTitMO0FBQzdIO0FBQzFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFTO0FBQ3hCLG9CQUFvQjtBQUNwQixRQUFRLCtEQUFRO0FBQ2hCLFFBQVEsOERBQU87QUFDZixRQUFRLCtEQUFRO0FBQ2hCLFFBQVEsa0VBQVc7QUFDbkIsUUFBUSxpRUFBVTtBQUNsQjtBQUNBLFFBQVEsaUVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnRUFBUztBQUM3QixRQUFRLG1FQUFZO0FBQ3BCLFFBQVEsaUVBQVU7QUFDbEIsUUFBUSw4REFBTztBQUNmLFFBQVEsa0VBQVc7QUFDbkIsUUFBUSxrRUFBVztBQUNuQixRQUFRLGlFQUFVO0FBQ2xCLFFBQVEsK0RBQVE7QUFDaEIsUUFBUSxnRUFBUztBQUNqQjtBQUNBLFFBQVEsaUVBQVU7QUFDbEIsUUFBUSwrREFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxhQUFhO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnRUFBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsY0FBYyxJQUFJLFdBQVcsZ0VBQWMsYUFBYTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWSxFQUFFLFVBQVU7QUFDdkM7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUIsRUFBRSxpQkFBaUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsaUJBQWlCLE1BQU07QUFDekQ7QUFDQSxzQkFBc0IsRUFBRSx3QkFBd0I7QUFDaEQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFVBQVUsTUFBTSxtRUFBbUUsRUFBRSxpQkFBaUI7QUFDckk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTyxlQUFlO0FBQ2pEO0FBQ0EsMkJBQTJCO0FBQzNCLEtBQUs7QUFDTDtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFdBQVc7QUFDdEIsWUFBWSxZQUFZO0FBQ3hCLGtCQUFrQixrQkFBa0I7QUFDcEMsWUFBWSxrRUFBVyxPQUFPO0FBQzlCLG9CQUFvQix3Q0FBd0M7QUFDNUQsVUFBVSxvRkFBb0YsZ0VBQVMsT0FBTztBQUM5RztBQUNBLHFCQUFxQiwrREFBYSxpQ0FBaUMsRUFBRSwrREFBYSxnQ0FBZ0M7QUFDbEg7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLHFCQUFxQix1Q0FBdUM7QUFDNUQsa0JBQWtCLGtFQUFXLElBQUk7QUFDakMsd0JBQXdCLGVBQWU7QUFDdkMsMEJBQTBCLHFDQUFxQztBQUMvRCxnQkFBZ0IsaUZBQWlGLGdFQUFTLElBQUk7QUFDOUc7QUFDQSwrQkFBK0IsS0FBSyxFQUFFLElBQUksV0FBVyxnQkFBZ0IsZ0JBQWdCLCtEQUFhLDhCQUE4QixFQUFFLCtEQUFhLDZCQUE2QjtBQUM1SztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxXQUFXO0FBQ3hCLGNBQWMsWUFBWTtBQUMxQixtQkFBbUIsWUFBWSxFQUFFLFlBQVk7QUFDN0M7QUFDQSx1QkFBdUIsK0RBQWEsaUNBQWlDLEVBQUUsK0RBQWEsZ0NBQWdDO0FBQ3BIO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0NBQWdDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELHFEQUFTO0FBQ2xFO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGVhblN0eWxlTmFtZSB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBmb250U3R5bGVBc09iamVjdCwgbGluZUhlaWdodCwgZm9udFNob3J0aGFuZCwgZ2V0Q29sb3IsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlcyhmaWdtYSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IHBhaW50U3R5bGVzID0gKF9hID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKCh7IG5hbWUsIHBhaW50cyB9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUobmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBnZXRDb2xvcihwYWludHMgPT09IG51bGwgfHwgcGFpbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludHNbMF0sIGZhbHNlKSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0U3R5bGVzID0gKF9iID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5tYXAoKHN0eWxlKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KHN0eWxlLmZvbnROYW1lKTtcclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IHN0eWxlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gc3R5bGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChzdHlsZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUoc3R5bGUubmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodCxcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBpc0l0YWxpYyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXh0c3R5bGVzXCIsIHRleHRTdHlsZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYWludFN0eWxlcyxcclxuICAgICAgICB0ZXh0U3R5bGVzLFxyXG4gICAgfTtcclxufVxyXG4iLCIvKiBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcclxuICAgIGlmICh0eXBlb2YgcmdiICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcmdiO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JhQ29sb3Iob2JqLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZ2IgY29sb3IgbXVzdCBiZSBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBvYmo7XHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wb25lbnRUbzI1NShyKX0sICR7Y29tcG9uZW50VG8yNTUoZyl9LCAke2NvbXBvbmVudFRvMjU1KGIpfSwgJHthLnRvRml4ZWQoMil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcclxuICAgIHJldHVybiB1bnNhZmVcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTYWZlRm9yQ1NTKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIGlmICghbmFtZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuLyogY3NzIHByb3BzIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgYm9yZGVyLXdpZHRoOiAgJHtub2RlLnN0cm9rZVdlaWdodH1weDsgXHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkOyBcclxuICAgIGJvcmRlci1pbWFnZTogJHtzdHJva2VDb2xvcihub2RlKX07IFxyXG4gICAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xyXG4gICAgYDtcclxuICAgIH1cclxuICAgIHJldHVybiBgYm9yZGVyOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4IHNvbGlkICR7c3Ryb2tlQ29sb3Iobm9kZSl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBwYWRkaW5nOiAke25vZGUucGFkZGluZ1RvcH1weCAke25vZGUucGFkZGluZ1JpZ2h0fXB4ICR7bm9kZS5wYWRkaW5nQm90dG9tfXB4ICR7bm9kZS5wYWRkaW5nTGVmdH1weDtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICBjb25zdCBmbGV4U2hyaW5rR3JvdyA9IG5vZGUubGF5b3V0R3JvdyA9PT0gMSA/IFwiZmxleC1ncm93OiAxOyBmbGV4LXNocmluazogMTtcIiA6IHNocmluaygpO1xyXG4gICAgZnVuY3Rpb24gc2hyaW5rKCkge1xyXG4gICAgICAgIHJldHVybiAhKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpICYmICEobm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgICAgICA/IFwiZmxleC1zaHJpbms6IDA7XCJcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5b3V0QWxpZ24gPSBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIiA/IFwiYWxpZ24tc2VsZjogc3RyZXRjaDtcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBhbGlnbkl0ZW1zTWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGp1c3RpZnlDb250ZW50TWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgfTtcclxuICAgIGxldCBsYXlvdXRQcm9wcyA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICAvLyBwb3NpdGlvbjogJHtbXCJGUkFNRVwiLCBcIkNPTVBPTkVOVFwiLCBcIklOU1RBTkNFXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgPyAncmVsYXRpdmUnIDogJ3N0YXRpYyd9OyAvKiBkb250IGdldCB0aGlzLi4uICovXHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiIHx8XHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgKz0gbGF5b3V0QWxpZ24gKyBmbGV4U2hyaW5rR3JvdztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRQcm9wcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGltZW5zaW9ucyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgbGV0IGhlaWdodCA9IFwiXCI7XHJcbiAgICBsZXQgd2lkdGggPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIC8vIGRlZmF1bHQgY2FzZVxyXG4gICAgaWYgKCFub2RlLmxheW91dE1vZGUgfHwgbm9kZS5sYXlvdXRNb2RlID09PSBcIk5PTkVcIikge1xyXG4gICAgICAgIGhlaWdodCA9ICgoX2EgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkhFSUdIVFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB3aWR0aDogJHt3aWR0aH07IGhlaWdodDogJHtoZWlnaHR9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcGFjaXR5KG5vZGUpIHtcclxuICAgIGlmIChub2RlLm9wYWNpdHkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYG9wYWNpdHk6ICR7bm9kZS5vcGFjaXR5fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICBjb25zdCBjb29yZCA9IG5vZGUuaWQgPT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZFxyXG4gICAgICAgID8gXCJcIlxyXG4gICAgICAgIDogYGxlZnQ6ICR7bm9kZS54fXB4OyB0b3A6ICR7bm9kZS55fXB4YDtcclxuICAgIGNvbnN0IHBvc2l0aW9uRnJvbVBhcmVudCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpY1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5pZCA9PT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IGBhYnNvbHV0ZTsgJHtjb29yZH1gXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZVwifWA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgcG9zaXRpb246ICR7cG9zaXRpb25Gcm9tUGFyZW50KG5vZGUpfTtcclxuICAgIGA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fCBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3Qgc2hhZG93cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09IFwiRFJPUF9TSEFET1dcIik7XHJcbiAgICBpZiAoc2hhZG93cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBsZXQgY3NzID0gXCJib3gtc2hhZG93OiBcIjtcclxuICAgIGNzcyArPSBzaGFkb3dzXHJcbiAgICAgICAgLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtzLm9mZnNldC54fXB4ICR7cy5vZmZzZXQueX1weCAke3MucmFkaXVzfXB4ICR7cy5zcHJlYWR9cHggJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX1gO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIiwgXCIpO1xyXG4gICAgcmV0dXJuIChgJHtub2RlLmVmZmVjdFN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIn1gICtcclxuICAgICAgICBjc3MgK1xyXG4gICAgICAgIFwiO1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFN0eWxlQXNPYmplY3QoZm9udE5hbWUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBpc0l0YWxpYyA9IChfYSA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpdGFsaWNcIik7XHJcbiAgICBjb25zdCB3ZWlnaHRNYXAgPSB7XHJcbiAgICAgICAgdGhpbjogMTAwLFxyXG4gICAgICAgIFwiZXh0cmEgbGlnaHRcIjogMjAwLFxyXG4gICAgICAgIGV4dHJhbGlnaHQ6IDIwMCxcclxuICAgICAgICBsaWdodDogMzAwLFxyXG4gICAgICAgIG5vcm1hbDogNDAwLFxyXG4gICAgICAgIHJlZ3VsYXI6IDQwMCxcclxuICAgICAgICBtZWRpdW06IDUwMCxcclxuICAgICAgICBcInNlbWkgYm9sZFwiOiA2MDAsXHJcbiAgICAgICAgc2VtaWJvbGQ6IDYwMCxcclxuICAgICAgICBib2xkOiA3MDAsXHJcbiAgICAgICAgXCJleHRyYSBib2xkXCI6IDgwMCxcclxuICAgICAgICBleHRyYWJvbGQ6IDgwMCxcclxuICAgICAgICBibGFjazogOTAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHdlaWdodCA9IChfYiA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIml0YWxpY1wiLCBcIlwiKS50cmltKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0TWFwW3dlaWdodF0sXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICBjb25zdCBmaWxsID0gKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKGZpbGwsIG5vZGUuZmlsbFN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1zKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnJvdGF0aW9uICYmIG5vZGUudHlwZSAhPT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoJHtub2RlLnJvdGF0aW9uICogLTF9ZGVnKTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBncmFkaWVudExpbmVhcihmaWxsKSB7XHJcbiAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IGZpbGw7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX0gJHtzLnBvc2l0aW9uICogMTAwfSVgO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICByZXR1cm4gYGJvcmRlci1yYWRpdXM6ICR7dHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBub2RlLmNvcm5lclJhZGl1cyArIFwicHhcIlxyXG4gICAgICAgIDogYCR7bm9kZS50b3BMZWZ0UmFkaXVzfXB4ICR7bm9kZS50b3BSaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbUxlZnRSYWRpdXN9cHhgfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBzdHJva2UgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihzdHJva2UsIG5vZGUuc3Ryb2tlU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yKGZpbGxPckNvbG9yLCBzdHlsZUlkKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmICghZmlsbE9yQ29sb3IudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbE9yQ29sb3IudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBncmFkaWVudExpbmVhcihmaWxsT3JDb2xvcik7XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChzdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBgdmFyKC0tJHtzdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgdW5pdE1hcCA9IHtcclxuICAgICAgICBQSVhFTFM6IFwicHhcIixcclxuICAgICAgICBQRVJDRU5UOiBcIiVcIixcclxuICAgIH07XHJcbiAgICBjb25zdCB1bml0ID0gdW5pdE1hcFtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXRdO1xyXG4gICAgcmV0dXJuIGAke25vZGVPclN0eWxlLmxpbmVIZWlnaHQudmFsdWV9JHt1bml0fWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoeyBsaW5lSGVpZ2h0LCBmb250U2l6ZSwgd2VpZ2h0LCBmb250RmFtaWx5LCBpc0l0YWxpYywgfSkge1xyXG4gICAgY29uc3QgaXRhbGljID0gaXNJdGFsaWMgPyBcIml0YWxpYyBcIiA6IFwiXCI7XHJcbiAgICByZXR1cm4gYCR7d2VpZ2h0fSAke2l0YWxpY30ke2ZvbnRTaXplfXB4JHtsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIn0gJyR7Zm9udEZhbWlseX0nYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KG5vZGUuZm9udE5hbWUpO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBub2RlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChub2RlKTtcclxuICAgIGNvbnN0IHNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9KTtcclxuICAgIGlmIChub2RlLnRleHRTdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9jID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUudGV4dFN0eWxlSWQudG9TdHJpbmcoKSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYGZvbnQ6IHZhcigtLSR7c3R5bGVOYW1lfSwgJHtzaG9ydGhhbmR9KTtgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBmb250OiAke3Nob3J0aGFuZH07YDtcclxufVxyXG4vKiBjc3MgcHJvcHMgaGVsZXBlcnMgZW5kICovXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgYm94U2hhZG93LCBkaW1lbnNpb25zLCBwb3NpdGlvbiwgb3ZlcmZsb3csIG9wYWNpdHksIHN0cm9rZUNvbG9yLCBmb250UHJvcCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUywgZ2V0VHJhbnNmb3JtcyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRTdHlsZXMgfSBmcm9tIFwiLi9nZXRTdHlsZXNcIjtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDAgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YCxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZUNoaWxkcmVuID09PSBudWxsIHx8IHRyZWVDaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJlZUNoaWxkcmVuLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbihub2RlLmNoaWxkcmVuLCBuZXdFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4oZnJhbWUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7dHJlZUVsZW1lbnQubmFtZX0geyR7dHJlZUVsZW1lbnQuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgIGZ1bmN0aW9uIGNoaWxkcmVuRWwodHJlZUVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKCgoX2EgPSB0cmVlRWxlbWVudC5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAubWFwKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZUVsZW1lbnQpfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICAvLyB3aHkgaXNuJ3QgdGhpcyBqdXN0IFwiY2hpbGRyZW5FbFwiID8/P1xyXG4gICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgIGh0bWwgPSBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgaHRtbCA9IGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlKX1cXG48L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5vZGUudmVjdG9yUGF0aHM7XHJcbiAgICBjb25zdCBwYXRocyA9IGdlb21ldHJ5ID09PSBudWxsIHx8IGdlb21ldHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZW9tZXRyeS5tYXAoKHApID0+IHtcclxuICAgICAgICByZXR1cm4gYDxwYXRoIGQ9XCIke3AuZGF0YX1cIiBmaWxsLXJ1bGU9XCIke3Aud2luZGluZ1J1bGVcclxuICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCl9XCIgLz5gO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYDxzdmcgXHJcbiAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxyXG4gIHdpZHRoPVwiJHtub2RlLndpZHRofVwiIFxyXG4gIGhlaWdodD1cIiR7bm9kZS5oZWlnaHR9XCIgXHJcbiAgc3Ryb2tlLXdpZHRoPVwiJHtub2RlLnN0cm9rZVdlaWdodH1cIiBcclxuICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG5vZGUpfVwiIFxyXG4gIHN0cm9rZS1saW5lY2FwPVwiJHtub2RlLnN0cm9rZUNhcC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcclxuICBmaWxsPVwiJHsoKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPT09IDAgPyBcIm5vbmVcIiA6IGZpbGxDb2xvcihub2RlKX1cIlxyXG4gIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gIHRyYW5zZm9ybT1cInNjYWxlKCR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVh9ICR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVl9KVwiIFxyXG4gID5cclxuICAgICR7cGF0aHMuam9pbihcIlwiKX1cclxuICA8L3N2Zz5gO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVNWR09mQ2hpbGRyZW4obm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBwYXRocyA9IChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKG4pID0+IHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG4udmVjdG9yUGF0aHM7XHJcbiAgICAgICAgcmV0dXJuIGdlb21ldHJ5ID09PSBudWxsIHx8IGdlb21ldHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZW9tZXRyeS5tYXAoKHApID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxwYXRoIFxyXG4gICAgICAgIGQ9XCIke3AuZGF0YX1cIlxyXG4gICAgICAgIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcclxuICAgICAgICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG4pfVwiXHJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiJHtuLnN0cm9rZVdlaWdodH1cIiAgXHJcbiAgICAgICAgc3Ryb2tlLWxpbmVjYXA9XCIke24uc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxyXG4gICAgICAgIGZpbGw9XCIkeygoX2EgPSBuLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogZmlsbENvbG9yKG4pfVwiIFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke24ueH0gJHtuLnl9KSByb3RhdGUoJHtuLnJvdGF0aW9uICogLTF9LCAwLCAwKSBzY2FsZSgke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIlxyXG4gICAgICAvPmA7XHJcbiAgICAgICAgfSkuam9pbihcIlwiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxyXG4gICAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxyXG4gICAgd2lkdGg9XCIke25vZGUud2lkdGh9XCIgXHJcbiAgICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxyXG4gICAgdmlld0JveD1cIjAgMCAke25vZGUud2lkdGh9ICR7bm9kZS5oZWlnaHR9XCJcclxuICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXHJcbiAgICA+XHJcbiAgICAgICR7cGF0aHMuam9pbihcIlwiKX1cclxuICA8L3N2Zz5gO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIndpdGhTdHlsZXNcIjpcclxuICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IFtcIkFsbCBTdHlsZXNcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhhbnN3ZXJzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnNvbGUubG9nKGNvbW1hbmQsIHBhcmFtZXRlcnMpO1xyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogNDAwIH0pO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzczogcHJpbnRDU1ModHJlZSksXHJcbiAgICAgICAgaHRtbDogcHJpbnRIVE1MKHRyZWUpLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBwYXJhbWV0ZXJzLndpdGhTdHlsZXMgPT09IFwiQWxsIFN0eWxlc1wiID8gZ2V0U3R5bGVzKGZpZ21hKSA6IG51bGwsXHJcbiAgICAgICAgbmFtZTogKF9jID0gKF9iID0gKF9hID0gZmlnbWEuY3VycmVudFBhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUsXHJcbiAgICB9KTtcclxufSk7XHJcbi8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcclxuLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbi8vZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9