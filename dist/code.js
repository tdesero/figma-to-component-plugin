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
        return {
            name: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)(name),
            value: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.colorAsHexOrRgba)(paints === null || paints === void 0 ? void 0 : paints[0]),
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
/* harmony export */   "fontStyle": () => (/* binding */ fontStyle),
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
function strokeColor(node) {
    /* TODO: this is quite the same function as fillColor -> refactor to share the same code base */
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const stroke = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0];
    if (!stroke) {
        return "transparent";
    }
    if (!stroke.visible) {
        return "transparent";
    }
    if (stroke.type === "GRADIENT_LINEAR") {
        const { gradientStops } = stroke;
        const transforms = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getTransforms)(stroke.gradientTransform);
        const gradientMap = gradientStops.map((s) => {
            return `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)(s.color, s.color.a)} ${s.position * 100}%`;
        });
        return `linear-gradient(${transforms.angle + 90}deg, ${gradientMap.join(",")})`;
    }
    const color = ((_c = (_b = node.strokes) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.opacity) < 1
        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)((_e = (_d = node.strokes) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.color, (_g = (_f = node.strokes) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.opacity)
        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)((_j = (_h = node.strokes) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.color);
    if (node.strokeStyleId) {
        const shortStyleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_k = figma.getStyleById(node.strokeStyleId)) === null || _k === void 0 ? void 0 : _k.name);
        return `var(--${shortStyleName}, ${color})`;
    }
    return color;
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
    var _a, _b;
    const paths = (_a = node.fillGeometry) === null || _a === void 0 ? void 0 : _a.map((p) => {
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
  fill="${((_b = node.fills) === null || _b === void 0 ? void 0 : _b.length) === 0 ? "none" : (0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(node)}"
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
        return (_a = n.fillGeometry) === null || _a === void 0 ? void 0 : _a.map((p) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkIsYUFBYSxXQUFXO0FBQ3hCLGNBQWMsWUFBWTtBQUMxQixtQkFBbUIsWUFBWSxFQUFFLFlBQVk7QUFDN0M7QUFDQSx1QkFBdUIsK0RBQWEsaUNBQWlDLEVBQUUsK0RBQWEsZ0NBQWdDO0FBQ3BIO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0NBQWdDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELHFEQUFTO0FBQ2xFO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGVhblN0eWxlTmFtZSwgY29sb3JBc0hleE9yUmdiYSB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGZpZ21hKSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkubWFwKCh7IG5hbWUsIHBhaW50cyB9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUobmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb2xvckFzSGV4T3JSZ2JhKHBhaW50cyA9PT0gbnVsbCB8fCBwYWludHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaW50c1swXSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN0eWxlcztcclxufVxyXG4iLCIvKiBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcclxuICAgIGlmICh0eXBlb2YgcmdiICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcmdiO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JhQ29sb3Iob2JqLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZ2IgY29sb3IgbXVzdCBiZSBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBvYmo7XHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wb25lbnRUbzI1NShyKX0sICR7Y29tcG9uZW50VG8yNTUoZyl9LCAke2NvbXBvbmVudFRvMjU1KGIpfSwgJHthfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSwgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbi8qIGNzcyBwcm9wcyBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCFub2RlLnN0cm9rZXMgfHwgIW5vZGUuc3Ryb2tlV2VpZ2h0IHx8IG5vZGUuc3Ryb2tlcy5sZW5ndGggPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCgoX2IgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnR5cGUpID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIGJvcmRlci13aWR0aDogICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXgtZ3JvdzogMTsgZmxleC1zaHJpbms6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25JdGVtc01hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBjb25zdCBqdXN0aWZ5Q29udGVudE1hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgLy8gcG9zaXRpb246ICR7W1wiRlJBTUVcIiwgXCJDT01QT05FTlRcIiwgXCJJTlNUQU5DRVwiXS5pbmNsdWRlcyhub2RlLnR5cGUpID8gJ3JlbGF0aXZlJyA6ICdzdGF0aWMnfTsgLyogZG9udCBnZXQgdGhpcy4uLiAqL1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGxldCBoZWlnaHQgPSBcIlwiO1xyXG4gICAgbGV0IHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICAvLyBkZWZhdWx0IGNhc2VcclxuICAgIGlmICghbm9kZS5sYXlvdXRNb2RlIHx8IG5vZGUubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSAoKF9hID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJIRUlHSFRcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9ICgoX2IgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKS5pbmNsdWRlcyhcIldJRFRIXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJlxyXG4gICAgICAgIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgd2lkdGg6ICR7d2lkdGh9OyBoZWlnaHQ6ICR7aGVpZ2h0fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVyZmxvdyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIm92ZXJmbG93OiB2aXNpYmxlO1wiO1xyXG4gICAgcmV0dXJuIG5vZGUuY2xpcHNDb250ZW50ID8gXCJvdmVyZmxvdzogaGlkZGVuO1wiIDogXCJcIjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3BhY2l0eShub2RlKSB7XHJcbiAgICBpZiAobm9kZS5vcGFjaXR5ID09PSAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBvcGFjaXR5OiAke25vZGUub3BhY2l0eX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xyXG4gICAgY29uc3QgY29vcmQgPSBub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWRcclxuICAgICAgICA/IFwiXCJcclxuICAgICAgICA6IGBsZWZ0OiAke25vZGUueH1weDsgdG9wOiAke25vZGUueX1weGA7XHJcbiAgICBjb25zdCBwb3NpdGlvbkZyb21QYXJlbnQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGF0aWNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7bm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIgfHwgIW5vZGUucGFyZW50LmxheW91dE1vZGVcclxuICAgICAgICAgICAgPyBgYWJzb2x1dGU7ICR7Y29vcmR9YFxyXG4gICAgICAgICAgICA6IFwicmVsYXRpdmVcIn1gO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9uRnJvbVBhcmVudChub2RlKX07XHJcbiAgICBgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3hTaGFkb3cobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFub2RlLmVmZmVjdHMgfHwgbm9kZS5lZmZlY3RzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHNoYWRvd3MgPSBub2RlLmVmZmVjdHMuZmlsdGVyKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSBcIkRST1BfU0hBRE9XXCIpO1xyXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgbGV0IGNzcyA9IFwiYm94LXNoYWRvdzogXCI7XHJcbiAgICBzaGFkb3dzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICBjc3MgKz0gYCR7cy5vZmZzZXQueH1weCAke3Mub2Zmc2V0Lnl9cHggJHtzLnJhZGl1c31weCAke3Muc3ByZWFkfXB4ICR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9YDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChgJHtub2RlLmVmZmVjdFN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIn1gICtcclxuICAgICAgICBjc3MgK1xyXG4gICAgICAgIFwiO1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFN0eWxlKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9iID0gKF9hID0gbm9kZS5mb250TmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9kID0gKF9jID0gbm9kZS5mb250TmFtZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnN0eWxlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiBgZm9udC13ZWlnaHQ6ICR7d2VpZ2h0TWFwW3dlaWdodF19OyAke2lzSXRhbGljID8gXCJmb250LXN0eWxlOiBpdGFsaWM7XCIgOiBcIlwifWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdDtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvL2F0bSBvbmx5IG9uZSBmaWxsIGlzIHN1cHBvcnRlZFxyXG4gICAgY29uc3QgZmlsbCA9IChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZpbGwudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC50eXBlID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBncmFkaWVudFN0b3BzIH0gPSBmaWxsO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIGNvbnN0IGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoKHMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHt0cmFuc2Zvcm1zLmFuZ2xlICsgOTB9ZGVnLCAke2dyYWRpZW50TWFwLmpvaW4oXCIsXCIpfSlgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUuZmlsbFN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzaG9ydFN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYiA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmZpbGxTdHlsZUlkKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gKChfZCA9IChfYyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1swXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLm9wYWNpdHkpIDwgMVxyXG4gICAgICAgICAgICA/IHJnYmFDb2xvcigoX2YgPSAoX2UgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbMF0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jb2xvciwgKF9oID0gKF9nID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nWzBdKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gub3BhY2l0eSlcclxuICAgICAgICAgICAgOiByZ2JUb0hleCgoX2sgPSAoX2ogPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2pbMF0pID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3Nob3J0U3R5bGVOYW1lfSwgJHtjb2xvcn0pYDtcclxuICAgIH1cclxuICAgIHJldHVybiAoKF9tID0gKF9sID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sWzBdKSA9PT0gbnVsbCB8fCBfbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX20ub3BhY2l0eSkgPCAxXHJcbiAgICAgICAgPyByZ2JhQ29sb3IoKF9wID0gKF9vID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX28gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vWzBdKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3AuY29sb3IsIChfciA9IChfcSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcVswXSkgPT09IG51bGwgfHwgX3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9yLm9wYWNpdHkpXHJcbiAgICAgICAgOiByZ2JUb0hleCgoX3QgPSAoX3MgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NbMF0pID09PSBudWxsIHx8IF90ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdC5jb2xvcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUucm90YXRpb24gJiYgbm9kZS50eXBlICE9PSBcIkdST1VQXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgke25vZGUucm90YXRpb24gKiAtMX1kZWcpO1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICByZXR1cm4gYGJvcmRlci1yYWRpdXM6ICR7dHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBub2RlLmNvcm5lclJhZGl1cyArIFwicHhcIlxyXG4gICAgICAgIDogYCR7bm9kZS50b3BMZWZ0UmFkaXVzfXB4ICR7bm9kZS50b3BSaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbUxlZnRSYWRpdXN9cHhgfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICAvKiBUT0RPOiB0aGlzIGlzIHF1aXRlIHRoZSBzYW1lIGZ1bmN0aW9uIGFzIGZpbGxDb2xvciAtPiByZWZhY3RvciB0byBzaGFyZSB0aGUgc2FtZSBjb2RlIGJhc2UgKi9cclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaztcclxuICAgIGNvbnN0IHN0cm9rZSA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgaWYgKCFzdHJva2UpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzdHJva2UudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoc3Ryb2tlLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IHN0cm9rZTtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhzdHJva2UuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIGNvbnN0IGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoKHMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHt0cmFuc2Zvcm1zLmFuZ2xlICsgOTB9ZGVnLCAke2dyYWRpZW50TWFwLmpvaW4oXCIsXCIpfSlgO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sb3IgPSAoKF9jID0gKF9iID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5vcGFjaXR5KSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcigoX2UgPSAoX2QgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFswXSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmNvbG9yLCAoX2cgPSAoX2YgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZlswXSkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLm9wYWNpdHkpXHJcbiAgICAgICAgOiByZ2JUb0hleCgoX2ogPSAoX2ggPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFswXSkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLmNvbG9yKTtcclxuICAgIGlmIChub2RlLnN0cm9rZVN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzaG9ydFN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfayA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnN0cm9rZVN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2submFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3Nob3J0U3R5bGVOYW1lfSwgJHtjb2xvcn0pYDtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2xvcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGluZUhlaWdodChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlLmxpbmVIZWlnaHQudW5pdCA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVuaXQgPSB1bml0TWFwW25vZGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBgbGluZS1oZWlnaHQ6ICR7bm9kZS5saW5lSGVpZ2h0LnZhbHVlfSR7dW5pdH07YDtcclxufVxyXG4vKiBjc3MgcHJvcHMgaGVsZXBlcnMgZW5kICovXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgZm9udFN0eWxlLCBib3hTaGFkb3csIGRpbWVuc2lvbnMsIHBvc2l0aW9uLCBvdmVyZmxvdywgb3BhY2l0eSwgbGluZUhlaWdodCwgc3Ryb2tlQ29sb3IsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgbWFrZVNhZmVGb3JDU1MsIGdldFRyYW5zZm9ybXMsIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGdldFN0eWxlcyB9IGZyb20gXCIuL2dldFN0eWxlc1wiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxuICAgICAgY29sb3I6ICR7ZmlsbENvbG9yKG5vZGUpfTtcbiAgICAgIGZvbnQtc2l6ZTogJHsoX2IgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKX1weDtcbiAgICAgIGZvbnQtZmFtaWx5OiAkeyhfYyA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudG9TdHJpbmcoKX07XG4gICAgICB0ZXh0LWFsaWduOiAkeyhfZCA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnRvTG93ZXJDYXNlKCl9O1xuICAgICAgJHtsaW5lSGVpZ2h0KG5vZGUpfVxuICAgICAgJHtmb250U3R5bGUobm9kZSl9XG4gICAgICAke29wYWNpdHkobm9kZSl9XG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cbiAgICAgIG1hcmdpbjogMDtcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cbiAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XG4gICAgICAke2JvcmRlclJhZGl1cyhub2RlKX1cbiAgICAgICR7Ym9yZGVyUHJvcChub2RlKX1cbiAgICAgICR7b3BhY2l0eShub2RlKX1cbiAgICAgICR7cGFkZGluZ1Byb3Aobm9kZSl9XG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cbiAgICAgICR7Ym94U2hhZG93KG5vZGUpfVxuICAgICAgbWFyZ2luOiAwO1xuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxuICAgICAgJHtvdmVyZmxvdyhub2RlKX1cbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDAgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YCxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZUNoaWxkcmVuID09PSBudWxsIHx8IHRyZWVDaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJlZUNoaWxkcmVuLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbihub2RlLmNoaWxkcmVuLCBuZXdFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4oZnJhbWUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7dHJlZUVsZW1lbnQubmFtZX0geyR7dHJlZUVsZW1lbnQuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgIGZ1bmN0aW9uIGNoaWxkcmVuRWwodHJlZUVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKCgoX2EgPSB0cmVlRWxlbWVudC5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAubWFwKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZUVsZW1lbnQpfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICAvLyB3aHkgaXNuJ3QgdGhpcyBqdXN0IFwiY2hpbGRyZW5FbFwiID8/P1xyXG4gICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgIGh0bWwgPSBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgaHRtbCA9IGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlKX1cXG48L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgcGF0aHMgPSAoX2EgPSBub2RlLmZpbGxHZW9tZXRyeSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgocCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPHBhdGggZD1cIiR7cC5kYXRhfVwiIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKX1cIiAvPmA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgPHN2ZyBcbiAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxuICB3aWR0aD1cIiR7bm9kZS53aWR0aH1cIiBcbiAgaGVpZ2h0PVwiJHtub2RlLmhlaWdodH1cIiBcbiAgc3Ryb2tlLXdpZHRoPVwiJHtub2RlLnN0cm9rZVdlaWdodH1cIiBcbiAgc3Ryb2tlPVwiJHtzdHJva2VDb2xvcihub2RlKX1cIiBcbiAgc3Ryb2tlLWxpbmVjYXA9XCIke25vZGUuc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxuICBmaWxsPVwiJHsoKF9iID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkgPT09IDAgPyBcIm5vbmVcIiA6IGZpbGxDb2xvcihub2RlKX1cIlxuICB0cmFuc2Zvcm0tb3JpZ2luPVwiMCAwXCJcbiAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXG4gID5cbiAgICAke3BhdGhzLmpvaW4oXCJcIil9XG4gIDwvc3ZnPmA7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlU1ZHT2ZDaGlsZHJlbihub2RlLCBjbGFzc05hbWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHBhdGhzID0gKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgobikgPT4ge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gbi5maWxsR2VvbWV0cnkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHApID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxwYXRoIFxuICAgICAgICBkPVwiJHtwLmRhdGF9XCJcbiAgICAgICAgZmlsbC1ydWxlPVwiJHtwLndpbmRpbmdSdWxlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxuICAgICAgICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG4pfVwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIiR7bi5zdHJva2VXZWlnaHR9XCIgIFxuICAgICAgICBzdHJva2UtbGluZWNhcD1cIiR7bi5zdHJva2VDYXAudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpfVwiXG4gICAgICAgIGZpbGw9XCIkeygoX2EgPSBuLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogZmlsbENvbG9yKG4pfVwiIFxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luPVwiMCAwXCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7bi54fSAke24ueX0pIHJvdGF0ZSgke24ucm90YXRpb24gKiAtMX0sIDAsIDApIHNjYWxlKCR7Z2V0VHJhbnNmb3JtcyhuLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVh9ICR7Z2V0VHJhbnNmb3JtcyhuLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVl9KVwiXG4gICAgICAvPmA7XHJcbiAgICAgICAgfSkuam9pbihcIlwiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxuICAgIGNsYXNzPVwiJHtjbGFzc05hbWV9XCJcbiAgICB3aWR0aD1cIiR7bm9kZS53aWR0aH1cIiBcbiAgICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxuICAgIHZpZXdCb3g9XCIwIDAgJHtub2RlLndpZHRofSAke25vZGUuaGVpZ2h0fVwiXG4gICAgdHJhbnNmb3JtLW9yaWdpbj1cIjAgMFwiXG4gICAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXG4gICAgPlxuICAgICAgJHtwYXRocy5qb2luKFwiXCIpfVxuICA8L3N2Zz5gO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIndpdGhTdHlsZXNcIjpcclxuICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IFtcIkFsbCBTdHlsZXNcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhhbnN3ZXJzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnNvbGUubG9nKGNvbW1hbmQsIHBhcmFtZXRlcnMpO1xyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogNDAwIH0pO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzczogcHJpbnRDU1ModHJlZSksXHJcbiAgICAgICAgaHRtbDogcHJpbnRIVE1MKHRyZWUpLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBwYXJhbWV0ZXJzLndpdGhTdHlsZXMgPT09IFwiQWxsIFN0eWxlc1wiID8gZ2V0U3R5bGVzKGZpZ21hKSA6IG51bGwsXHJcbiAgICAgICAgbmFtZTogKF9jID0gKF9iID0gKF9hID0gZmlnbWEuY3VycmVudFBhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUsXHJcbiAgICB9KTtcclxufSk7XHJcbi8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcclxuLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbi8vZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9