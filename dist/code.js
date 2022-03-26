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

function getStyles(figma) {
    const styles = figma.getLocalPaintStyles().map(({ name, paints }) => {
        var _a;
        return {
            name: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)(name),
            value: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)((_a = paints === null || paints === void 0 ? void 0 : paints[0]) === null || _a === void 0 ? void 0 : _a.color),
        };
    });
    return styles;
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
/* harmony export */   "rgbaColor": () => (/* binding */ rgbaColor),
/* harmony export */   "svgDataToFixed": () => (/* binding */ svgDataToFixed)
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
    return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(b)}, ${a})`;
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
    return makeSafeForCSS(name.replaceAll(" ", ""));
}
function svgDataToFixed(data, n = 3) {
    return data
        .split(" ")
        .map((s) => {
        return !isNaN(s) ? (+s).toFixed(n) : s;
    })
        .join(" ");
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
    /*
    var angle = Math.atan2(m[1], m[0]),
      denom = Math.pow(m[0], 2) + Math.pow(m[1], 2),
      scaleX = Math.sqrt(denom),
      scaleY = (m[0] * m[3] - m[2] * m[1]) / scaleX,
      skewX = Math.atan2(m[0] * m[2] + m[1] * m[3], denom);
    return {
      angle: angle / (Math.PI / 180), // this is rotation angle in degrees
      scaleX: scaleX, // scaleX factor
      scaleY: scaleY, // scaleY factor
      skewX: skewX / (Math.PI / 180), // skewX angle degrees
      skewY: 0, // skewY angle degrees
      translateX: m[4], // translation point  x
      translateY: m[5], // translation point  y
    }; */
}
/* helpers end */
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
/* harmony export */   "fontStyle": () => (/* binding */ fontStyle),
/* harmony export */   "lineHeight": () => (/* binding */ lineHeight),
/* harmony export */   "opacity": () => (/* binding */ opacity),
/* harmony export */   "overflow": () => (/* binding */ overflow),
/* harmony export */   "paddingProp": () => (/* binding */ paddingProp),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "transforms": () => (/* binding */ transforms)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers/helpers.ts");

/* css props helpers */
function borderProp(node) {
    var _a;
    if (node.type === "VECTOR")
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    return `${node.strokeStyleId &&
        "/*" + ((_a = figma.getStyleById(node.strokeStyleId)) === null || _a === void 0 ? void 0 : _a.name) + "*/"} border: ${node.strokeWeight}px solid ${node.strokes[0].opacity < 1
        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(node.strokes[0].color, node.strokes[0].opacity)
        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(node.strokes[0].color)};`;
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
    shadows.forEach((s) => {
        css += `${s.offset.x}px ${s.offset.y}px ${s.radius}px ${s.spread}px ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(s.color, s.color.a)}`;
    });
    return (`${node.effectStyleId &&
        "/*" + ((_a = figma.getStyleById(node.effectStyleId)) === null || _a === void 0 ? void 0 : _a.name) + "*/"}` +
        css +
        ";");
}
function fontStyle(node) {
    var _a, _b, _c, _d;
    const isItalic = (_b = (_a = node.fontName) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes("italic");
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
    const weight = (_d = (_c = node.fontName) === null || _c === void 0 ? void 0 : _c.style) === null || _d === void 0 ? void 0 : _d.toLowerCase().replace("italic", "").trim();
    return `font-weight: ${weightMap[weight]}; ${isItalic ? "font-style: italic;" : ""}`;
}
function fillColor(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION")
        return "";
    //atm only one fill is supported
    const fill = (_a = node.fills) === null || _a === void 0 ? void 0 : _a[0];
    if (!fill) {
        return "transparent";
    }
    if (!fill.visible) {
        return "transparent";
    }
    if (fill.type === "GRADIENT_LINEAR") {
        const { gradientStops } = fill;
        const transforms = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getTransforms)(fill.gradientTransform);
        console.log(fill.gradientTransform);
        const gradientMap = gradientStops.map((s) => {
            return `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(s.color, s.color.a)} ${s.position * 100}%`;
        });
        return `linear-gradient(${transforms.angle + 90}deg, ${gradientMap.join(",")})`;
    }
    if (node.fillStyleId) {
        const shortStyleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_b = figma.getStyleById(node.fillStyleId)) === null || _b === void 0 ? void 0 : _b.name);
        const color = ((_d = (_c = node.fills) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.opacity) < 1
            ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)((_f = (_e = node.fills) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.color, (_h = (_g = node.fills) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.opacity)
            : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)((_k = (_j = node.fills) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.color);
        return `var(--${shortStyleName}, ${color})`;
    }
    return ((_m = (_l = node.fills) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.opacity) < 1
        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)((_p = (_o = node.fills) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.color, (_r = (_q = node.fills) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.opacity)
        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)((_t = (_s = node.fills) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.color);
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
function borderRadius(node) {
    if (node.type === "ELLIPSE")
        return "border-radius: 50%;";
    return `border-radius: ${typeof node.cornerRadius === "number"
        ? node.cornerRadius + "px"
        : `${node.topLeftRadius}px ${node.topRightRadius}px ${node.bottomRightRadius}px ${node.bottomLeftRadius}px`};`;
}
function lineHeight(node) {
    if (!node.lineHeight)
        return "";
    if (node.lineHeight.unit === "AUTO")
        return "";
    const unitMap = {
        PIXELS: "px",
        PERCENT: "%",
    };
    const unit = unitMap[node.lineHeight.unit];
    return `line-height: ${node.lineHeight.value}${unit};`;
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
    var _a, _b, _c, _d;
    console.log(node);
    if (((_a = node.type) === null || _a === void 0 ? void 0 : _a.toString()) === "TEXT") {
        return `
      color: ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(node)};
      font-size: ${(_b = node.fontSize) === null || _b === void 0 ? void 0 : _b.toString()}px;
      font-family: ${(_c = node.fontName.family) === null || _c === void 0 ? void 0 : _c.toString()};
      text-align: ${(_d = node.textAlignHorizontal) === null || _d === void 0 ? void 0 : _d.toLowerCase()};
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.lineHeight)(node)}
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fontStyle)(node)}
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
    var _a, _b, _c, _d;
    const paths = (_a = node.vectorPaths) === null || _a === void 0 ? void 0 : _a.map((p) => {
        return `<path d="${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.svgDataToFixed)(p.data, 3)}" fill-rule="${p.windingRule
            .toString()
            .toLowerCase()}" />`;
    });
    return `<svg 
  class="${className}"
  width="${node.width}" 
  height="${node.height}" 
  stroke-width="${node.strokeWeight}" 
  stroke="${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.colorAsHexOrRgba)((_b = node.strokes) === null || _b === void 0 ? void 0 : _b[0])}" 
  stroke-linecap="${node.strokeCap.toString().toLowerCase()}"
  fill="${((_c = node.fills) === null || _c === void 0 ? void 0 : _c.length) === 0 ? "none" : (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.colorAsHexOrRgba)((_d = node.fills) === null || _d === void 0 ? void 0 : _d[0])}"
  transform-origin="0 0"
  transform="scale(${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleX} ${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.getTransforms)(node.absoluteTransform).scaleY})" 
  >
    ${paths.join("")}
  </svg>`;
}
function createSVGOfChildren(node, className) {
    var _a;
    const paths = (_a = node.children) === null || _a === void 0 ? void 0 : _a.map((n) => {
        var _a;
        return (_a = n.vectorPaths) === null || _a === void 0 ? void 0 : _a.map((p) => {
            var _a, _b, _c;
            return `<path 
        d="${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.svgDataToFixed)(p.data, 3)}"
        fill-rule="${p.windingRule.toString().toLowerCase()}"
        stroke="${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.colorAsHexOrRgba)((_a = n.strokes) === null || _a === void 0 ? void 0 : _a[0])}"
        stroke-width="${n.strokeWeight}"  
        stroke-linecap="${n.strokeCap.toString().toLowerCase()}"
        fill="${((_b = n.fills) === null || _b === void 0 ? void 0 : _b.length) === 0 ? "none" : (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.colorAsHexOrRgba)((_c = n.fills) === null || _c === void 0 ? void 0 : _c[0])}" 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0EsNkJBQTZCLHlCQUF5QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxxREFBUztBQUNsRTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvZ2V0U3R5bGVzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL3Byb3BzSGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUsIHJnYlRvSGV4IH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKS5tYXAoKHsgbmFtZSwgcGFpbnRzIH0pID0+IHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUobmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiByZ2JUb0hleCgoX2EgPSBwYWludHMgPT09IG51bGwgfHwgcGFpbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludHNbMF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2xvciksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN0eWxlcztcclxufVxyXG4iLCIvKiBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcclxuICAgIGlmICh0eXBlb2YgcmdiICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcmdiO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JhQ29sb3Iob2JqLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZ2IgY29sb3IgbXVzdCBiZSBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBvYmo7XHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wb25lbnRUbzI1NShyKX0sICR7Y29tcG9uZW50VG8yNTUoZyl9LCAke2NvbXBvbmVudFRvMjU1KGIpfSwgJHthfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN2Z0RhdGFUb0ZpeGVkKGRhdGEsIG4gPSAzKSB7XHJcbiAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihzKSA/ICgrcykudG9GaXhlZChuKSA6IHM7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhbGwgcmVsZXZhbnQgdHJhbnNmb3JtYXRpb24gaW5mb3JtYXRpb24gZnJvbSBhIChmaWdtYSkgdHJhbnNmb3JtIG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtYXRyaXggPSB7XHJcbiAgICAgICAgYTogbVswXSxcclxuICAgICAgICBiOiBtWzFdLFxyXG4gICAgICAgIGM6IG1bMl0sXHJcbiAgICAgICAgZDogbVszXSxcclxuICAgICAgICBlOiBtWzRdLFxyXG4gICAgICAgIGY6IG1bNV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU1hdHJpeDJEVzMobWF0cml4KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYW5nbGU6IHRyYW5zZm9ybXMucm90YXRlWixcclxuICAgICAgICBzY2FsZVg6IHRyYW5zZm9ybXMuc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogdHJhbnNmb3Jtcy5zY2FsZVksXHJcbiAgICAgICAgdHJhbnNsYXRlWDogbVs0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxyXG4gICAgICAgIHN2Z01hdHJpeDogbS5qb2luKFwiIFwiKSxcclxuICAgICAgICBzdmdNYXRyaXhXaXRob3V0VHJhbnNsYXRlOiBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV1dLmpvaW4oXCIgXCIpLFxyXG4gICAgfTtcclxuICAgIC8qXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKG1bMV0sIG1bMF0pLFxyXG4gICAgICBkZW5vbSA9IE1hdGgucG93KG1bMF0sIDIpICsgTWF0aC5wb3cobVsxXSwgMiksXHJcbiAgICAgIHNjYWxlWCA9IE1hdGguc3FydChkZW5vbSksXHJcbiAgICAgIHNjYWxlWSA9IChtWzBdICogbVszXSAtIG1bMl0gKiBtWzFdKSAvIHNjYWxlWCxcclxuICAgICAgc2tld1ggPSBNYXRoLmF0YW4yKG1bMF0gKiBtWzJdICsgbVsxXSAqIG1bM10sIGRlbm9tKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFuZ2xlOiBhbmdsZSAvIChNYXRoLlBJIC8gMTgwKSwgLy8gdGhpcyBpcyByb3RhdGlvbiBhbmdsZSBpbiBkZWdyZWVzXHJcbiAgICAgIHNjYWxlWDogc2NhbGVYLCAvLyBzY2FsZVggZmFjdG9yXHJcbiAgICAgIHNjYWxlWTogc2NhbGVZLCAvLyBzY2FsZVkgZmFjdG9yXHJcbiAgICAgIHNrZXdYOiBza2V3WCAvIChNYXRoLlBJIC8gMTgwKSwgLy8gc2tld1ggYW5nbGUgZGVncmVlc1xyXG4gICAgICBza2V3WTogMCwgLy8gc2tld1kgYW5nbGUgZGVncmVlc1xyXG4gICAgICB0cmFuc2xhdGVYOiBtWzRdLCAvLyB0cmFuc2xhdGlvbiBwb2ludCAgeFxyXG4gICAgICB0cmFuc2xhdGVZOiBtWzVdLCAvLyB0cmFuc2xhdGlvbiBwb2ludCAgeVxyXG4gICAgfTsgKi9cclxufVxyXG4vKiBoZWxwZXJzIGVuZCAqL1xyXG5mdW5jdGlvbiBkZWNvbXBvc2VNYXRyaXgyRFczKG0pIHtcclxuICAgIHZhciByb3cweCA9IG0uYTtcclxuICAgIHZhciByb3cweSA9IG0uYjtcclxuICAgIHZhciByb3cxeCA9IG0uYztcclxuICAgIHZhciByb3cxeSA9IG0uZDtcclxuICAgIHZhciBzY2FsZVggPSBNYXRoLnNxcnQocm93MHggKiByb3cweCArIHJvdzB5ICogcm93MHkpO1xyXG4gICAgdmFyIHNjYWxlWSA9IE1hdGguc3FydChyb3cxeCAqIHJvdzF4ICsgcm93MXkgKiByb3cxeSk7XHJcbiAgICAvLyBJZiBkZXRlcm1pbmFudCBpcyBuZWdhdGl2ZSwgb25lIGF4aXMgd2FzIGZsaXBwZWQuXHJcbiAgICB2YXIgZGV0ZXJtaW5hbnQgPSByb3cweCAqIHJvdzF5IC0gcm93MHkgKiByb3cxeDtcclxuICAgIGlmIChkZXRlcm1pbmFudCA8IDApXHJcbiAgICAgICAgaWYgKHJvdzB4IDwgcm93MXkpXHJcbiAgICAgICAgICAgIC8vIEZsaXAgYXhpcyB3aXRoIG1pbmltdW0gdW5pdCB2ZWN0b3IgZG90IHByb2R1Y3QuXHJcbiAgICAgICAgICAgIHNjYWxlWCA9IC1zY2FsZVg7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzY2FsZVkgPSAtc2NhbGVZO1xyXG4gICAgLy8gUmVub3JtYWxpemUgbWF0cml4IHRvIHJlbW92ZSBzY2FsZS5cclxuICAgIGlmIChzY2FsZVgpIHtcclxuICAgICAgICByb3cweCAqPSAxIC8gc2NhbGVYO1xyXG4gICAgICAgIHJvdzB5ICo9IDEgLyBzY2FsZVg7XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGVZKSB7XHJcbiAgICAgICAgcm93MXggKj0gMSAvIHNjYWxlWTtcclxuICAgICAgICByb3cxeSAqPSAxIC8gc2NhbGVZO1xyXG4gICAgfVxyXG4gICAgLy8gQ29tcHV0ZSByb3RhdGlvbiBhbmQgcmVub3JtYWxpemUgbWF0cml4LlxyXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihyb3cweSwgcm93MHgpO1xyXG4gICAgaWYgKGFuZ2xlKSB7XHJcbiAgICAgICAgLy8gUm90YXRlKC1hbmdsZSkgPSBbY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSwgLXNpbihhbmdsZSksIGNvcyhhbmdsZSldXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgPSBbcm93MHgsIC1yb3cweSwgcm93MHksIHJvdzB4XVxyXG4gICAgICAgIC8vIFRoYW5rcyB0byB0aGUgbm9ybWFsaXphdGlvbiBhYm92ZS5cclxuICAgICAgICB2YXIgc24gPSAtcm93MHk7XHJcbiAgICAgICAgdmFyIGNzID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMSA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTIgPSByb3cweTtcclxuICAgICAgICB2YXIgbTIxID0gcm93MXg7XHJcbiAgICAgICAgdmFyIG0yMiA9IHJvdzF5O1xyXG4gICAgICAgIHJvdzB4ID0gY3MgKiBtMTEgKyBzbiAqIG0yMTtcclxuICAgICAgICByb3cweSA9IGNzICogbTEyICsgc24gKiBtMjI7XHJcbiAgICAgICAgcm93MXggPSAtc24gKiBtMTEgKyBjcyAqIG0yMTtcclxuICAgICAgICByb3cxeSA9IC1zbiAqIG0xMiArIGNzICogbTIyO1xyXG4gICAgfVxyXG4gICAgbTExID0gcm93MHg7XHJcbiAgICBtMTIgPSByb3cweTtcclxuICAgIG0yMSA9IHJvdzF4O1xyXG4gICAgbTIyID0gcm93MXk7XHJcbiAgICAvLyBDb252ZXJ0IGludG8gZGVncmVlcyBiZWNhdXNlIG91ciByb3RhdGlvbiBmdW5jdGlvbnMgZXhwZWN0IGl0LlxyXG4gICAgYW5nbGUgPSBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcclxuICAgIC8vIFRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycyBhcmUgdGhlbiB0aGV0YSxcclxuICAgIC8vIHN4LCBzeSwgcGhpLFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2xhdGVYOiBtLmUsXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbS5mLFxyXG4gICAgICAgIHJvdGF0ZVo6IGFuZ2xlLFxyXG4gICAgICAgIHNjYWxlWDogc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogc2NhbGVZLFxyXG4gICAgICAgIG1hdHJpeDogW20xMSwgbTEyLCBtMjEsIG0yMiwgMCwgMF0sXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IHJnYlRvSGV4LCByZ2JhQ29sb3IsIGdldFRyYW5zZm9ybXMsIGNsZWFuU3R5bGVOYW1lLCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuLyogY3NzIHByb3BzIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICghbm9kZS5zdHJva2VzIHx8ICFub2RlLnN0cm9rZVdlaWdodCB8fCBub2RlLnN0cm9rZXMubGVuZ3RoIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgJHtub2RlLnN0cm9rZVN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuc3Ryb2tlU3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIn0gYm9yZGVyOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4IHNvbGlkICR7bm9kZS5zdHJva2VzWzBdLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgPyByZ2JhQ29sb3Iobm9kZS5zdHJva2VzWzBdLmNvbG9yLCBub2RlLnN0cm9rZXNbMF0ub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KG5vZGUuc3Ryb2tlc1swXS5jb2xvcil9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBwYWRkaW5nOiAke25vZGUucGFkZGluZ1RvcH1weCAke25vZGUucGFkZGluZ1JpZ2h0fXB4ICR7bm9kZS5wYWRkaW5nQm90dG9tfXB4ICR7bm9kZS5wYWRkaW5nTGVmdH1weDtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICBjb25zdCBmbGV4U2hyaW5rR3JvdyA9IG5vZGUubGF5b3V0R3JvdyA9PT0gMSA/IFwiZmxleC1ncm93OiAxOyBmbGV4LXNocmluazogMTtcIiA6IHNocmluaygpO1xyXG4gICAgZnVuY3Rpb24gc2hyaW5rKCkge1xyXG4gICAgICAgIHJldHVybiAhKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpICYmICEobm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgICAgICA/IFwiZmxleC1zaHJpbms6IDA7XCJcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5b3V0QWxpZ24gPSBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIiA/IFwiYWxpZ24tc2VsZjogc3RyZXRjaDtcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBhbGlnbkl0ZW1zTWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJzdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJlbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QganVzdGlmeUNvbnRlbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgbGV0IGxheW91dFByb3BzID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIC8vIHBvc2l0aW9uOiAke1tcIkZSQU1FXCIsIFwiQ09NUE9ORU5UXCIsIFwiSU5TVEFOQ0VcIl0uaW5jbHVkZXMobm9kZS50eXBlKSA/ICdyZWxhdGl2ZScgOiAnc3RhdGljJ307IC8qIGRvbnQgZ2V0IHRoaXMuLi4gKi9cclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgfHxcclxuICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyArPSBsYXlvdXRBbGlnbiArIGZsZXhTaHJpbmtHcm93O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheW91dFByb3BzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaW1lbnNpb25zKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBsZXQgaGVpZ2h0ID0gXCJcIjtcclxuICAgIGxldCB3aWR0aCA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICB3aWR0aCA9IG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgLy8gZGVmYXVsdCBjYXNlXHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSAoKF9iID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJXSURUSFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiZcclxuICAgICAgICBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgaGVpZ2h0OiAke2hlaWdodH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgb3BhY2l0eTogJHtub2RlLm9wYWNpdHl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcclxuICAgIGNvbnN0IGNvb3JkID0gbm9kZS5pZCA9PT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkXHJcbiAgICAgICAgPyBcIlwiXHJcbiAgICAgICAgOiBgbGVmdDogJHtub2RlLnh9cHg7IHRvcDogJHtub2RlLnl9cHhgO1xyXG4gICAgY29uc3QgcG9zaXRpb25Gcm9tUGFyZW50ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RhdGljXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke25vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiTk9ORVwiIHx8ICFub2RlLnBhcmVudC5sYXlvdXRNb2RlXHJcbiAgICAgICAgICAgID8gYGFic29sdXRlOyAke2Nvb3JkfWBcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlXCJ9YDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBwb3NpdGlvbjogJHtwb3NpdGlvbkZyb21QYXJlbnQobm9kZSl9O1xyXG4gICAgYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8IG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgc2hhZG93cy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgY3NzICs9IGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoYCR7bm9kZS5lZmZlY3RTdHlsZUlkICYmXHJcbiAgICAgICAgXCIvKlwiICsgKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmVmZmVjdFN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkgKyBcIiovXCJ9YCArXHJcbiAgICAgICAgY3NzICtcclxuICAgICAgICBcIjtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTdHlsZShub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XHJcbiAgICBjb25zdCBpc0l0YWxpYyA9IChfYiA9IChfYSA9IG5vZGUuZm9udE5hbWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdHlsZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpdGFsaWNcIik7XHJcbiAgICBjb25zdCB3ZWlnaHRNYXAgPSB7XHJcbiAgICAgICAgdGhpbjogMTAwLFxyXG4gICAgICAgIFwiZXh0cmEgbGlnaHRcIjogMjAwLFxyXG4gICAgICAgIGV4dHJhbGlnaHQ6IDIwMCxcclxuICAgICAgICBsaWdodDogMzAwLFxyXG4gICAgICAgIG5vcm1hbDogNDAwLFxyXG4gICAgICAgIHJlZ3VsYXI6IDQwMCxcclxuICAgICAgICBtZWRpdW06IDUwMCxcclxuICAgICAgICBcInNlbWkgYm9sZFwiOiA2MDAsXHJcbiAgICAgICAgc2VtaWJvbGQ6IDYwMCxcclxuICAgICAgICBib2xkOiA3MDAsXHJcbiAgICAgICAgXCJleHRyYSBib2xkXCI6IDgwMCxcclxuICAgICAgICBleHRyYWJvbGQ6IDgwMCxcclxuICAgICAgICBibGFjazogOTAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHdlaWdodCA9IChfZCA9IChfYyA9IG5vZGUuZm9udE5hbWUpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5zdHlsZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIml0YWxpY1wiLCBcIlwiKS50cmltKCk7XHJcbiAgICByZXR1cm4gYGZvbnQtd2VpZ2h0OiAke3dlaWdodE1hcFt3ZWlnaHRdfTsgJHtpc0l0YWxpYyA/IFwiZm9udC1zdHlsZTogaXRhbGljO1wiIDogXCJcIn1gO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rLCBfbCwgX20sIF9vLCBfcCwgX3EsIF9yLCBfcywgX3Q7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy9hdG0gb25seSBvbmUgZmlsbCBpcyBzdXBwb3J0ZWRcclxuICAgIGNvbnN0IGZpbGwgPSAoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICBpZiAoIWZpbGwpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFmaWxsLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGwudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gZmlsbDtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgICAgICBjb25zdCBncmFkaWVudE1hcCA9IGdyYWRpZW50U3RvcHMubWFwKChzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX0gJHtzLnBvc2l0aW9uICogMTAwfSVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBgbGluZWFyLWdyYWRpZW50KCR7dHJhbnNmb3Jtcy5hbmdsZSArIDkwfWRlZywgJHtncmFkaWVudE1hcC5qb2luKFwiLFwiKX0pYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmZpbGxTdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvcnRTdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2IgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5maWxsU3R5bGVJZCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5uYW1lKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9ICgoX2QgPSAoX2MgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbMF0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5vcGFjaXR5KSA8IDFcclxuICAgICAgICAgICAgPyByZ2JhQ29sb3IoKF9mID0gKF9lID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lWzBdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuY29sb3IsIChfaCA9IChfZyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1swXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogcmdiVG9IZXgoKF9rID0gKF9qID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qWzBdKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2suY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBgdmFyKC0tJHtzaG9ydFN0eWxlTmFtZX0sICR7Y29sb3J9KWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKChfbSA9IChfbCA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbFswXSkgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tLm9wYWNpdHkpIDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKChfcCA9IChfbyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb1swXSkgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wLmNvbG9yLCAoX3IgPSAoX3EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfcSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3FbMF0pID09PSBudWxsIHx8IF9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfci5vcGFjaXR5KVxyXG4gICAgICAgIDogcmdiVG9IZXgoKF90ID0gKF9zID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zWzBdKSA9PT0gbnVsbCB8fCBfdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3QuY29sb3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1zKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnJvdGF0aW9uICYmIG5vZGUudHlwZSAhPT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoJHtub2RlLnJvdGF0aW9uICogLTF9ZGVnKTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJSYWRpdXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJFTExJUFNFXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXJhZGl1czogNTAlO1wiO1xyXG4gICAgcmV0dXJuIGBib3JkZXItcmFkaXVzOiAke3R5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgID8gbm9kZS5jb3JuZXJSYWRpdXMgKyBcInB4XCJcclxuICAgICAgICA6IGAke25vZGUudG9wTGVmdFJhZGl1c31weCAke25vZGUudG9wUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbVJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21MZWZ0UmFkaXVzfXB4YH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGluZUhlaWdodChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlLmxpbmVIZWlnaHQudW5pdCA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVuaXQgPSB1bml0TWFwW25vZGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBgbGluZS1oZWlnaHQ6ICR7bm9kZS5saW5lSGVpZ2h0LnZhbHVlfSR7dW5pdH07YDtcclxufVxyXG4vKiBjc3MgcHJvcHMgaGVsZXBlcnMgZW5kICovXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgZm9udFN0eWxlLCBib3hTaGFkb3csIGRpbWVuc2lvbnMsIHBvc2l0aW9uLCBvdmVyZmxvdywgb3BhY2l0eSwgbGluZUhlaWdodCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUywgY29sb3JBc0hleE9yUmdiYSwgc3ZnRGF0YVRvRml4ZWQsIGdldFRyYW5zZm9ybXMsIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGdldFN0eWxlcyB9IGZyb20gXCIuL2dldFN0eWxlc1wiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxuICAgICAgY29sb3I6ICR7ZmlsbENvbG9yKG5vZGUpfTtcbiAgICAgIGZvbnQtc2l6ZTogJHsoX2IgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKX1weDtcbiAgICAgIGZvbnQtZmFtaWx5OiAkeyhfYyA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudG9TdHJpbmcoKX07XG4gICAgICB0ZXh0LWFsaWduOiAkeyhfZCA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnRvTG93ZXJDYXNlKCl9O1xuICAgICAgJHtsaW5lSGVpZ2h0KG5vZGUpfVxuICAgICAgJHtmb250U3R5bGUobm9kZSl9XG4gICAgICAke29wYWNpdHkobm9kZSl9XG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cbiAgICAgIG1hcmdpbjogMDtcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cbiAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XG4gICAgICAke2JvcmRlclJhZGl1cyhub2RlKX1cbiAgICAgICR7Ym9yZGVyUHJvcChub2RlKX1cbiAgICAgICR7b3BhY2l0eShub2RlKX1cbiAgICAgICR7cGFkZGluZ1Byb3Aobm9kZSl9XG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cbiAgICAgICR7Ym94U2hhZG93KG5vZGUpfVxuICAgICAgbWFyZ2luOiAwO1xuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxuICAgICAgJHtvdmVyZmxvdyhub2RlKX1cbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDAgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YCxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZUNoaWxkcmVuID09PSBudWxsIHx8IHRyZWVDaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJlZUNoaWxkcmVuLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbihub2RlLmNoaWxkcmVuLCBuZXdFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4oZnJhbWUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7dHJlZUVsZW1lbnQubmFtZX0geyR7dHJlZUVsZW1lbnQuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgIGZ1bmN0aW9uIGNoaWxkcmVuRWwodHJlZUVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKCgoX2EgPSB0cmVlRWxlbWVudC5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAubWFwKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZUVsZW1lbnQpfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICAvLyB3aHkgaXNuJ3QgdGhpcyBqdXN0IFwiY2hpbGRyZW5FbFwiID8/P1xyXG4gICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgIGh0bWwgPSBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgaHRtbCA9IGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlKX1cXG48L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XHJcbiAgICBjb25zdCBwYXRocyA9IChfYSA9IG5vZGUudmVjdG9yUGF0aHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHApID0+IHtcclxuICAgICAgICByZXR1cm4gYDxwYXRoIGQ9XCIke3N2Z0RhdGFUb0ZpeGVkKHAuZGF0YSwgMyl9XCIgZmlsbC1ydWxlPVwiJHtwLndpbmRpbmdSdWxlXHJcbiAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpfVwiIC8+YDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxuICBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiXG4gIHdpZHRoPVwiJHtub2RlLndpZHRofVwiIFxuICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxuICBzdHJva2Utd2lkdGg9XCIke25vZGUuc3Ryb2tlV2VpZ2h0fVwiIFxuICBzdHJva2U9XCIke2NvbG9yQXNIZXhPclJnYmEoKF9iID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pfVwiIFxuICBzdHJva2UtbGluZWNhcD1cIiR7bm9kZS5zdHJva2VDYXAudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpfVwiXG4gIGZpbGw9XCIkeygoX2MgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogY29sb3JBc0hleE9yUmdiYSgoX2QgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbMF0pfVwiXG4gIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxuICB0cmFuc2Zvcm09XCJzY2FsZSgke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIiBcbiAgPlxuICAgICR7cGF0aHMuam9pbihcIlwiKX1cbiAgPC9zdmc+YDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkdPZkNoaWxkcmVuKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgcGF0aHMgPSAoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChuKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBuLnZlY3RvclBhdGhzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChwKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxwYXRoIFxuICAgICAgICBkPVwiJHtzdmdEYXRhVG9GaXhlZChwLmRhdGEsIDMpfVwiXG4gICAgICAgIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcbiAgICAgICAgc3Ryb2tlPVwiJHtjb2xvckFzSGV4T3JSZ2JhKChfYSA9IG4uc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKX1cIlxuICAgICAgICBzdHJva2Utd2lkdGg9XCIke24uc3Ryb2tlV2VpZ2h0fVwiICBcbiAgICAgICAgc3Ryb2tlLWxpbmVjYXA9XCIke24uc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxuICAgICAgICBmaWxsPVwiJHsoKF9iID0gbi5maWxscykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkgPT09IDAgPyBcIm5vbmVcIiA6IGNvbG9yQXNIZXhPclJnYmEoKF9jID0gbi5maWxscykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdKX1cIiBcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbj1cIjAgMFwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke24ueH0gJHtuLnl9KSByb3RhdGUoJHtuLnJvdGF0aW9uICogLTF9LCAwLCAwKSBzY2FsZSgke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIlxuICAgICAgLz5gO1xyXG4gICAgICAgIH0pLmpvaW4oXCJcIik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgPHN2ZyBcbiAgICBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiXG4gICAgd2lkdGg9XCIke25vZGUud2lkdGh9XCIgXG4gICAgaGVpZ2h0PVwiJHtub2RlLmhlaWdodH1cIiBcbiAgICB2aWV3Qm94PVwiMCAwICR7bm9kZS53aWR0aH0gJHtub2RlLmhlaWdodH1cIlxuICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxuICAgIHRyYW5zZm9ybT1cInNjYWxlKCR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVh9ICR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVl9KVwiIFxuICAgID5cbiAgICAgICR7cGF0aHMuam9pbihcIlwiKX1cbiAgPC9zdmc+YDtcclxufVxyXG5maWdtYS5wYXJhbWV0ZXJzLm9uKFwiaW5wdXRcIiwgKHsgcGFyYW1ldGVycywga2V5LCBxdWVyeSwgcmVzdWx0IH0pID0+IHtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSBcImZyYW1ld29ya1wiOlxyXG4gICAgICAgICAgICBjb25zdCBmcmFtZXdvcmtzID0gW1wicmVhY3RcIiwgXCJodG1sXCJdO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0U3VnZ2VzdGlvbnMoZnJhbWV3b3Jrcy5maWx0ZXIoKHMpID0+IHMuaW5jbHVkZXMocXVlcnkpKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ3aXRoU3R5bGVzXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGFuc3dlcnMgPSBbXCJBbGwgU3R5bGVzXCJdO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0U3VnZ2VzdGlvbnMoYW5zd2Vycy5maWx0ZXIoKHMpID0+IHMuaW5jbHVkZXMocXVlcnkpKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufSk7XHJcbmZpZ21hLm9uKFwicnVuXCIsICh7IGNvbW1hbmQsIHBhcmFtZXRlcnMgfSkgPT4ge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBjb25zb2xlLmxvZyhjb21tYW5kLCBwYXJhbWV0ZXJzKTtcclxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDQwMCB9KTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjc3M6IHByaW50Q1NTKHRyZWUpLFxyXG4gICAgICAgIGh0bWw6IHByaW50SFRNTCh0cmVlKSxcclxuICAgICAgICBmcmFtZXdvcms6IHBhcmFtZXRlcnMuZnJhbWV3b3JrLFxyXG4gICAgICAgIHN0eWxlczogcGFyYW1ldGVycy53aXRoU3R5bGVzID09PSBcIkFsbCBTdHlsZXNcIiA/IGdldFN0eWxlcyhmaWdtYSkgOiBudWxsLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyBNYWtlIHN1cmUgdG8gY2xvc2UgdGhlIHBsdWdpbiB3aGVuIHlvdSdyZSBkb25lLiBPdGhlcndpc2UgdGhlIHBsdWdpbiB3aWxsXHJcbi8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxyXG4vL2ZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==