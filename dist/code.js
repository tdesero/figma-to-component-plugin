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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VTtBQUN2QixhQUFhLFdBQVc7QUFDeEIsY0FBYyxZQUFZO0FBQzFCLG1CQUFtQixZQUFZLEVBQUUsWUFBWTtBQUM3QztBQUNBLHVCQUF1QiwrREFBYSxpQ0FBaUMsRUFBRSwrREFBYSxnQ0FBZ0M7QUFDcEg7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLGdDQUFnQyxnQ0FBZ0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQscURBQVM7QUFDbEU7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL015UGx1Z2luLy4vc3JjL2dldFN0eWxlcy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9wcm9wc0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsZWFuU3R5bGVOYW1lLCBjb2xvckFzSGV4T3JSZ2JhIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKS5tYXAoKHsgbmFtZSwgcGFpbnRzIH0pID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGNvbG9yQXNIZXhPclJnYmEocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdKSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG59XHJcbiIsIi8qIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcclxuICAgIHZhciBoZXggPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG8yNTUoYykge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYyAqIDI1NSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHJnYikge1xyXG4gICAgaWYgKHR5cGVvZiByZ2IgIT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgeyByLCBnLCBiLCBhIH0gPSByZ2I7XHJcbiAgICBpZiAoIWEpIHtcclxuICAgICAgICByZXR1cm4gXCIjXCIgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYmFDb2xvcihvYmosIGEpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInJnYiBjb2xvciBtdXN0IGJlIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IG9iajtcclxuICAgIHJldHVybiBgcmdiYSgke2NvbXBvbmVudFRvMjU1KHIpfSwgJHtjb21wb25lbnRUbzI1NShnKX0sICR7Y29tcG9uZW50VG8yNTUoYil9LCAke2F9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcclxuICAgIHJldHVybiB1bnNhZmVcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTYWZlRm9yQ1NTKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIHJldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhbGwgcmVsZXZhbnQgdHJhbnNmb3JtYXRpb24gaW5mb3JtYXRpb24gZnJvbSBhIChmaWdtYSkgdHJhbnNmb3JtIG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtYXRyaXggPSB7XHJcbiAgICAgICAgYTogbVswXSxcclxuICAgICAgICBiOiBtWzFdLFxyXG4gICAgICAgIGM6IG1bMl0sXHJcbiAgICAgICAgZDogbVszXSxcclxuICAgICAgICBlOiBtWzRdLFxyXG4gICAgICAgIGY6IG1bNV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU1hdHJpeDJEVzMobWF0cml4KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYW5nbGU6IHRyYW5zZm9ybXMucm90YXRlWixcclxuICAgICAgICBzY2FsZVg6IHRyYW5zZm9ybXMuc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogdHJhbnNmb3Jtcy5zY2FsZVksXHJcbiAgICAgICAgdHJhbnNsYXRlWDogbVs0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxyXG4gICAgICAgIHN2Z01hdHJpeDogbS5qb2luKFwiIFwiKSxcclxuICAgICAgICBzdmdNYXRyaXhXaXRob3V0VHJhbnNsYXRlOiBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV1dLmpvaW4oXCIgXCIpLFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBkZWNvbXBvc2VNYXRyaXgyRFczKG0pIHtcclxuICAgIHZhciByb3cweCA9IG0uYTtcclxuICAgIHZhciByb3cweSA9IG0uYjtcclxuICAgIHZhciByb3cxeCA9IG0uYztcclxuICAgIHZhciByb3cxeSA9IG0uZDtcclxuICAgIHZhciBzY2FsZVggPSBNYXRoLnNxcnQocm93MHggKiByb3cweCArIHJvdzB5ICogcm93MHkpO1xyXG4gICAgdmFyIHNjYWxlWSA9IE1hdGguc3FydChyb3cxeCAqIHJvdzF4ICsgcm93MXkgKiByb3cxeSk7XHJcbiAgICAvLyBJZiBkZXRlcm1pbmFudCBpcyBuZWdhdGl2ZSwgb25lIGF4aXMgd2FzIGZsaXBwZWQuXHJcbiAgICB2YXIgZGV0ZXJtaW5hbnQgPSByb3cweCAqIHJvdzF5IC0gcm93MHkgKiByb3cxeDtcclxuICAgIGlmIChkZXRlcm1pbmFudCA8IDApXHJcbiAgICAgICAgaWYgKHJvdzB4IDwgcm93MXkpXHJcbiAgICAgICAgICAgIC8vIEZsaXAgYXhpcyB3aXRoIG1pbmltdW0gdW5pdCB2ZWN0b3IgZG90IHByb2R1Y3QuXHJcbiAgICAgICAgICAgIHNjYWxlWCA9IC1zY2FsZVg7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzY2FsZVkgPSAtc2NhbGVZO1xyXG4gICAgLy8gUmVub3JtYWxpemUgbWF0cml4IHRvIHJlbW92ZSBzY2FsZS5cclxuICAgIGlmIChzY2FsZVgpIHtcclxuICAgICAgICByb3cweCAqPSAxIC8gc2NhbGVYO1xyXG4gICAgICAgIHJvdzB5ICo9IDEgLyBzY2FsZVg7XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGVZKSB7XHJcbiAgICAgICAgcm93MXggKj0gMSAvIHNjYWxlWTtcclxuICAgICAgICByb3cxeSAqPSAxIC8gc2NhbGVZO1xyXG4gICAgfVxyXG4gICAgLy8gQ29tcHV0ZSByb3RhdGlvbiBhbmQgcmVub3JtYWxpemUgbWF0cml4LlxyXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihyb3cweSwgcm93MHgpO1xyXG4gICAgaWYgKGFuZ2xlKSB7XHJcbiAgICAgICAgLy8gUm90YXRlKC1hbmdsZSkgPSBbY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSwgLXNpbihhbmdsZSksIGNvcyhhbmdsZSldXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgPSBbcm93MHgsIC1yb3cweSwgcm93MHksIHJvdzB4XVxyXG4gICAgICAgIC8vIFRoYW5rcyB0byB0aGUgbm9ybWFsaXphdGlvbiBhYm92ZS5cclxuICAgICAgICB2YXIgc24gPSAtcm93MHk7XHJcbiAgICAgICAgdmFyIGNzID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMSA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTIgPSByb3cweTtcclxuICAgICAgICB2YXIgbTIxID0gcm93MXg7XHJcbiAgICAgICAgdmFyIG0yMiA9IHJvdzF5O1xyXG4gICAgICAgIHJvdzB4ID0gY3MgKiBtMTEgKyBzbiAqIG0yMTtcclxuICAgICAgICByb3cweSA9IGNzICogbTEyICsgc24gKiBtMjI7XHJcbiAgICAgICAgcm93MXggPSAtc24gKiBtMTEgKyBjcyAqIG0yMTtcclxuICAgICAgICByb3cxeSA9IC1zbiAqIG0xMiArIGNzICogbTIyO1xyXG4gICAgfVxyXG4gICAgbTExID0gcm93MHg7XHJcbiAgICBtMTIgPSByb3cweTtcclxuICAgIG0yMSA9IHJvdzF4O1xyXG4gICAgbTIyID0gcm93MXk7XHJcbiAgICAvLyBDb252ZXJ0IGludG8gZGVncmVlcyBiZWNhdXNlIG91ciByb3RhdGlvbiBmdW5jdGlvbnMgZXhwZWN0IGl0LlxyXG4gICAgYW5nbGUgPSBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcclxuICAgIC8vIFRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycyBhcmUgdGhlbiB0aGV0YSxcclxuICAgIC8vIHN4LCBzeSwgcGhpLFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2xhdGVYOiBtLmUsXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbS5mLFxyXG4gICAgICAgIHJvdGF0ZVo6IGFuZ2xlLFxyXG4gICAgICAgIHNjYWxlWDogc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogc2NhbGVZLFxyXG4gICAgICAgIG1hdHJpeDogW20xMSwgbTEyLCBtMjEsIG0yMiwgMCwgMF0sXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IHJnYlRvSGV4LCByZ2JhQ29sb3IsIGdldFRyYW5zZm9ybXMsIGNsZWFuU3R5bGVOYW1lLCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuLyogY3NzIHByb3BzIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgYm9yZGVyLXdpZHRoOiAgJHtub2RlLnN0cm9rZVdlaWdodH1weDsgXHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkOyBcclxuICAgIGJvcmRlci1pbWFnZTogJHtzdHJva2VDb2xvcihub2RlKX07IFxyXG4gICAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xyXG4gICAgYDtcclxuICAgIH1cclxuICAgIHJldHVybiBgYm9yZGVyOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4IHNvbGlkICR7c3Ryb2tlQ29sb3Iobm9kZSl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBwYWRkaW5nOiAke25vZGUucGFkZGluZ1RvcH1weCAke25vZGUucGFkZGluZ1JpZ2h0fXB4ICR7bm9kZS5wYWRkaW5nQm90dG9tfXB4ICR7bm9kZS5wYWRkaW5nTGVmdH1weDtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICBjb25zdCBmbGV4U2hyaW5rR3JvdyA9IG5vZGUubGF5b3V0R3JvdyA9PT0gMSA/IFwiZmxleC1ncm93OiAxOyBmbGV4LXNocmluazogMTtcIiA6IHNocmluaygpO1xyXG4gICAgZnVuY3Rpb24gc2hyaW5rKCkge1xyXG4gICAgICAgIHJldHVybiAhKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpICYmICEobm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgICAgICA/IFwiZmxleC1zaHJpbms6IDA7XCJcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5b3V0QWxpZ24gPSBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIiA/IFwiYWxpZ24tc2VsZjogc3RyZXRjaDtcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBhbGlnbkl0ZW1zTWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGp1c3RpZnlDb250ZW50TWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgfTtcclxuICAgIGxldCBsYXlvdXRQcm9wcyA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICAvLyBwb3NpdGlvbjogJHtbXCJGUkFNRVwiLCBcIkNPTVBPTkVOVFwiLCBcIklOU1RBTkNFXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgPyAncmVsYXRpdmUnIDogJ3N0YXRpYyd9OyAvKiBkb250IGdldCB0aGlzLi4uICovXHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiIHx8XHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgKz0gbGF5b3V0QWxpZ24gKyBmbGV4U2hyaW5rR3JvdztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRQcm9wcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGltZW5zaW9ucyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgbGV0IGhlaWdodCA9IFwiXCI7XHJcbiAgICBsZXQgd2lkdGggPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIC8vIGRlZmF1bHQgY2FzZVxyXG4gICAgaWYgKCFub2RlLmxheW91dE1vZGUgfHwgbm9kZS5sYXlvdXRNb2RlID09PSBcIk5PTkVcIikge1xyXG4gICAgICAgIGhlaWdodCA9ICgoX2EgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkhFSUdIVFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB3aWR0aDogJHt3aWR0aH07IGhlaWdodDogJHtoZWlnaHR9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcGFjaXR5KG5vZGUpIHtcclxuICAgIGlmIChub2RlLm9wYWNpdHkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYG9wYWNpdHk6ICR7bm9kZS5vcGFjaXR5fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICBjb25zdCBjb29yZCA9IG5vZGUuaWQgPT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZFxyXG4gICAgICAgID8gXCJcIlxyXG4gICAgICAgIDogYGxlZnQ6ICR7bm9kZS54fXB4OyB0b3A6ICR7bm9kZS55fXB4YDtcclxuICAgIGNvbnN0IHBvc2l0aW9uRnJvbVBhcmVudCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpY1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5pZCA9PT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IGBhYnNvbHV0ZTsgJHtjb29yZH1gXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZVwifWA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgcG9zaXRpb246ICR7cG9zaXRpb25Gcm9tUGFyZW50KG5vZGUpfTtcclxuICAgIGA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fCBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3Qgc2hhZG93cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09IFwiRFJPUF9TSEFET1dcIik7XHJcbiAgICBpZiAoc2hhZG93cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBsZXQgY3NzID0gXCJib3gtc2hhZG93OiBcIjtcclxuICAgIHNoYWRvd3MuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICAgIGNzcyArPSBgJHtzLm9mZnNldC54fXB4ICR7cy5vZmZzZXQueX1weCAke3MucmFkaXVzfXB4ICR7cy5zcHJlYWR9cHggJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX1gO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGUobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgY29uc3QgaXNJdGFsaWMgPSAoX2IgPSAoX2EgPSBub2RlLmZvbnROYW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3R5bGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiaXRhbGljXCIpO1xyXG4gICAgY29uc3Qgd2VpZ2h0TWFwID0ge1xyXG4gICAgICAgIHRoaW46IDEwMCxcclxuICAgICAgICBcImV4dHJhIGxpZ2h0XCI6IDIwMCxcclxuICAgICAgICBleHRyYWxpZ2h0OiAyMDAsXHJcbiAgICAgICAgbGlnaHQ6IDMwMCxcclxuICAgICAgICBub3JtYWw6IDQwMCxcclxuICAgICAgICByZWd1bGFyOiA0MDAsXHJcbiAgICAgICAgbWVkaXVtOiA1MDAsXHJcbiAgICAgICAgXCJzZW1pIGJvbGRcIjogNjAwLFxyXG4gICAgICAgIHNlbWlib2xkOiA2MDAsXHJcbiAgICAgICAgYm9sZDogNzAwLFxyXG4gICAgICAgIFwiZXh0cmEgYm9sZFwiOiA4MDAsXHJcbiAgICAgICAgZXh0cmFib2xkOiA4MDAsXHJcbiAgICAgICAgYmxhY2s6IDkwMCxcclxuICAgIH07XHJcbiAgICBjb25zdCB3ZWlnaHQgPSAoX2QgPSAoX2MgPSBub2RlLmZvbnROYW1lKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc3R5bGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJpdGFsaWNcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIGBmb250LXdlaWdodDogJHt3ZWlnaHRNYXBbd2VpZ2h0XX07ICR7aXNJdGFsaWMgPyBcImZvbnQtc3R5bGU6IGl0YWxpYztcIiA6IFwiXCJ9YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbENvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90O1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICBjb25zdCBmaWxsID0gKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmICghZmlsbC52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IGZpbGw7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IGdldFRyYW5zZm9ybXMoZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICAgICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9ICR7cy5wb3NpdGlvbiAqIDEwMH0lYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5maWxsU3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHNob3J0U3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9iID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZmlsbFN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubmFtZSk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSAoKF9kID0gKF9jID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Qub3BhY2l0eSkgPCAxXHJcbiAgICAgICAgICAgID8gcmdiYUNvbG9yKChfZiA9IChfZSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVswXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmNvbG9yLCAoX2ggPSAoX2cgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2dbMF0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5vcGFjaXR5KVxyXG4gICAgICAgICAgICA6IHJnYlRvSGV4KChfayA9IChfaiA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfalswXSkgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4gYHZhcigtLSR7c2hvcnRTdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgoX20gPSAoX2wgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xbMF0pID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbS5vcGFjaXR5KSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcigoX3AgPSAoX28gPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29bMF0pID09PSBudWxsIHx8IF9wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcC5jb2xvciwgKF9yID0gKF9xID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX3EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9xWzBdKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Iub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KChfdCA9IChfcyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc1swXSkgPT09IG51bGwgfHwgX3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90LmNvbG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3Jtcyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS5yb3RhdGlvbiAmJiBub2RlLnR5cGUgIT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCR7bm9kZS5yb3RhdGlvbiAqIC0xfWRlZyk7XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIHJldHVybiBgYm9yZGVyLXJhZGl1czogJHt0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBgJHtub2RlLnRvcExlZnRSYWRpdXN9cHggJHtub2RlLnRvcFJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21SaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tTGVmdFJhZGl1c31weGB9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIC8qIFRPRE86IHRoaXMgaXMgcXVpdGUgdGhlIHNhbWUgZnVuY3Rpb24gYXMgZmlsbENvbG9yIC0+IHJlZmFjdG9yIHRvIHNoYXJlIHRoZSBzYW1lIGNvZGUgYmFzZSAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICBpZiAoIXN0cm9rZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0cm9rZS52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChzdHJva2UudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gc3Ryb2tlO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKHN0cm9rZS5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICAgICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9ICR7cy5wb3NpdGlvbiAqIDEwMH0lYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2xvciA9ICgoX2MgPSAoX2IgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm9wYWNpdHkpIDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKChfZSA9IChfZCA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kWzBdKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuY29sb3IsIChfZyA9IChfZiA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mWzBdKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KChfaiA9IChfaCA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oWzBdKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ouY29sb3IpO1xyXG4gICAgaWYgKG5vZGUuc3Ryb2tlU3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHNob3J0U3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9rID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuc3Ryb2tlU3R5bGVJZCkpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYHZhcigtLSR7c2hvcnRTdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbG9yO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5saW5lSGVpZ2h0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGluZUhlaWdodC51bml0ID09PSBcIkFVVE9cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdW5pdCA9IHVuaXRNYXBbbm9kZS5saW5lSGVpZ2h0LnVuaXRdO1xyXG4gICAgcmV0dXJuIGBsaW5lLWhlaWdodDogJHtub2RlLmxpbmVIZWlnaHQudmFsdWV9JHt1bml0fTtgO1xyXG59XHJcbi8qIGNzcyBwcm9wcyBoZWxlcGVycyBlbmQgKi9cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBib3JkZXJQcm9wLCBkaXNwbGF5UHJvcCwgcGFkZGluZ1Byb3AsIHRyYW5zZm9ybXMsIGJvcmRlclJhZGl1cywgZmlsbENvbG9yLCBmb250U3R5bGUsIGJveFNoYWRvdywgZGltZW5zaW9ucywgcG9zaXRpb24sIG92ZXJmbG93LCBvcGFjaXR5LCBsaW5lSGVpZ2h0LCBzdHJva2VDb2xvciwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUywgZ2V0VHJhbnNmb3JtcywgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0U3R5bGVzIH0gZnJvbSBcIi4vZ2V0U3R5bGVzXCI7XHJcbmZ1bmN0aW9uIG5vZGVDU1Mobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIGZvbnQtc2l6ZTogJHsoX2IgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKX1weDtcclxuICAgICAgZm9udC1mYW1pbHk6ICR7KF9jID0gbm9kZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b1N0cmluZygpfTtcclxuICAgICAgdGV4dC1hbGlnbjogJHsoX2QgPSBub2RlLnRleHRBbGlnbkhvcml6b250YWwpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC50b0xvd2VyQ2FzZSgpfTtcclxuICAgICAgJHtsaW5lSGVpZ2h0KG5vZGUpfVxyXG4gICAgICAke2ZvbnRTdHlsZShub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxyXG4gICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgIGJhY2tncm91bmQ6ICR7ZmlsbENvbG9yKG5vZGUpfTtcclxuICAgICAgJHtib3JkZXJSYWRpdXMobm9kZSl9XHJcbiAgICAgICR7Ym9yZGVyUHJvcChub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3BhZGRpbmdQcm9wKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgICR7cG9zaXRpb24obm9kZSl9XHJcbiAgICAgICR7Ym94U2hhZG93KG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgICAgJHtvdmVyZmxvdyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIGNvbnN0IGFsbE5hbWVzID0gW107XHJcbiAgICBmdW5jdGlvbiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiA9IDApIHtcclxuICAgICAgICBjb25zdCBzdWZmaXggPSBuID4gMCA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxsTmFtZXMucHVzaChjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgc3VmZml4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTm90aGluZyBzZWxlY3RlZFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBvbmx5IDEgQ29tcG9uZW50XCIsIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZnJhbWUgPSBzZWxlY3Rpb25bMF07XHJcbiAgICBjb21wb25lbnROYW1lID0gbWFrZVNhZmVGb3JDU1MoZnJhbWUubmFtZSk7XHJcbiAgICBjb25zdCB0cmVlID0ge1xyXG4gICAgICAgIG5hbWU6IGNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgY3NzOiBub2RlQ1NTKGZyYW1lKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICB0eXBlOiBmcmFtZS50eXBlLFxyXG4gICAgICAgIGNoYXJhY3RlcnM6IGZyYW1lLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBmcmFtZSxcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYCR7Y29tcG9uZW50TmFtZX1fXyR7dW5pcXVlTmFtZShtYWtlU2FmZUZvckNTUyhub2RlLm5hbWUpKX1gLFxyXG4gICAgICAgICAgICAgICAgY3NzOiBub2RlQ1NTKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczogbm9kZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiBub2RlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlQ2hpbGRyZW4gPT09IG51bGwgfHwgdHJlZUNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlQ2hpbGRyZW4ucHVzaChuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKG5vZGUuY2hpbGRyZW4sIG5ld0VsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICB0aGVDaGlsZHJlbihmcmFtZS5jaGlsZHJlbiwgdHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5jb25zdCB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICBsZXQgY3NzID0gXCJcIjtcclxuICAgIGNzcyArPSBgLiR7dHJlZS5uYW1lfSB7JHt0cmVlLmNzc319XFxuYDtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgodHJlZUVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY3NzICs9IGAuJHt0cmVlRWxlbWVudC5uYW1lfSB7JHt0cmVlRWxlbWVudC5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzcztcclxufVxyXG5mdW5jdGlvbiBwcmludEhUTUwodHJlZSkge1xyXG4gICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgZnVuY3Rpb24gY2hpbGRyZW5FbCh0cmVlRWxlbWVudCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAoKChfYSA9IHRyZWVFbGVtZW50LmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIC5tYXAoKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlU1ZHT2ZDaGlsZHJlbih0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dHJlZUVsZW1lbnQubmFtZX1cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlRWxlbWVudCl9XFxuPC9kaXY+YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIC8vIHdoeSBpc24ndCB0aGlzIGp1c3QgXCJjaGlsZHJlbkVsXCIgPz8/XHJcbiAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiKSB7XHJcbiAgICAgICAgaHRtbCA9IGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICBodG1sID0gY3JlYXRlU1ZHT2ZDaGlsZHJlbih0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RyZWUubmFtZX1cIj5cXG4ke3RyZWUuY2hhcmFjdGVycyA/IHRyZWUuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpIDogXCJcIn0gJHtjaGlsZHJlbkVsKHRyZWUpfVxcbjwvZGl2PmA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbDtcclxufVxyXG5mdW5jdGlvbiBhbGxDaGlsZHJlbkFyZVZlY3RvcihmcmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICByZXR1cm4gKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwICYmXHJcbiAgICAgICAgKChfYiA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKChuKSA9PiBuLnR5cGUgPT09IFwiVkVDVE9SXCIpLmxlbmd0aCkgPT09XHJcbiAgICAgICAgICAgICgoX2MgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxlbmd0aCkpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVNWRyhub2RlLCBjbGFzc05hbWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbm9kZS52ZWN0b3JQYXRocztcclxuICAgIGNvbnN0IHBhdGhzID0gZ2VvbWV0cnkgPT09IG51bGwgfHwgZ2VvbWV0cnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdlb21ldHJ5Lm1hcCgocCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPHBhdGggZD1cIiR7cC5kYXRhfVwiIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKX1cIiAvPmA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgPHN2ZyBcclxuICBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiXHJcbiAgd2lkdGg9XCIke25vZGUud2lkdGh9XCIgXHJcbiAgaGVpZ2h0PVwiJHtub2RlLmhlaWdodH1cIiBcclxuICBzdHJva2Utd2lkdGg9XCIke25vZGUuc3Ryb2tlV2VpZ2h0fVwiIFxyXG4gIHN0cm9rZT1cIiR7c3Ryb2tlQ29sb3Iobm9kZSl9XCIgXHJcbiAgc3Ryb2tlLWxpbmVjYXA9XCIke25vZGUuc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxyXG4gIGZpbGw9XCIkeygoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogZmlsbENvbG9yKG5vZGUpfVwiXHJcbiAgdHJhbnNmb3JtLW9yaWdpbj1cIjAgMFwiXHJcbiAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXHJcbiAgPlxyXG4gICAgJHtwYXRocy5qb2luKFwiXCIpfVxyXG4gIDwvc3ZnPmA7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlU1ZHT2ZDaGlsZHJlbihub2RlLCBjbGFzc05hbWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHBhdGhzID0gKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgobikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbi52ZWN0b3JQYXRocztcclxuICAgICAgICByZXR1cm4gZ2VvbWV0cnkgPT09IG51bGwgfHwgZ2VvbWV0cnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdlb21ldHJ5Lm1hcCgocCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHBhdGggXHJcbiAgICAgICAgZD1cIiR7cC5kYXRhfVwiXHJcbiAgICAgICAgZmlsbC1ydWxlPVwiJHtwLndpbmRpbmdSdWxlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxyXG4gICAgICAgIHN0cm9rZT1cIiR7c3Ryb2tlQ29sb3Iobil9XCJcclxuICAgICAgICBzdHJva2Utd2lkdGg9XCIke24uc3Ryb2tlV2VpZ2h0fVwiICBcclxuICAgICAgICBzdHJva2UtbGluZWNhcD1cIiR7bi5zdHJva2VDYXAudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpfVwiXHJcbiAgICAgICAgZmlsbD1cIiR7KChfYSA9IG4uZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID09PSAwID8gXCJub25lXCIgOiBmaWxsQ29sb3Iobil9XCIgXHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbj1cIjAgMFwiXHJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7bi54fSAke24ueX0pIHJvdGF0ZSgke24ucm90YXRpb24gKiAtMX0sIDAsIDApIHNjYWxlKCR7Z2V0VHJhbnNmb3JtcyhuLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVh9ICR7Z2V0VHJhbnNmb3JtcyhuLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVl9KVwiXHJcbiAgICAgIC8+YDtcclxuICAgICAgICB9KS5qb2luKFwiXCIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYDxzdmcgXHJcbiAgICBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiXHJcbiAgICB3aWR0aD1cIiR7bm9kZS53aWR0aH1cIiBcclxuICAgIGhlaWdodD1cIiR7bm9kZS5oZWlnaHR9XCIgXHJcbiAgICB2aWV3Qm94PVwiMCAwICR7bm9kZS53aWR0aH0gJHtub2RlLmhlaWdodH1cIlxyXG4gICAgdHJhbnNmb3JtLW9yaWdpbj1cIjAgMFwiXHJcbiAgICB0cmFuc2Zvcm09XCJzY2FsZSgke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIiBcclxuICAgID5cclxuICAgICAgJHtwYXRocy5qb2luKFwiXCIpfVxyXG4gIDwvc3ZnPmA7XHJcbn1cclxuZmlnbWEucGFyYW1ldGVycy5vbihcImlucHV0XCIsICh7IHBhcmFtZXRlcnMsIGtleSwgcXVlcnksIHJlc3VsdCB9KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgIGNhc2UgXCJmcmFtZXdvcmtcIjpcclxuICAgICAgICAgICAgY29uc3QgZnJhbWV3b3JrcyA9IFtcInJlYWN0XCIsIFwiaHRtbFwiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGZyYW1ld29ya3MuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwid2l0aFN0eWxlc1wiOlxyXG4gICAgICAgICAgICBjb25zdCBhbnN3ZXJzID0gW1wiQWxsIFN0eWxlc1wiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGFuc3dlcnMuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn0pO1xyXG5maWdtYS5vbihcInJ1blwiLCAoeyBjb21tYW5kLCBwYXJhbWV0ZXJzIH0pID0+IHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgY29uc29sZS5sb2coY29tbWFuZCwgcGFyYW1ldGVycyk7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiA0MDAgfSk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgY3NzOiBwcmludENTUyh0cmVlKSxcclxuICAgICAgICBodG1sOiBwcmludEhUTUwodHJlZSksXHJcbiAgICAgICAgZnJhbWV3b3JrOiBwYXJhbWV0ZXJzLmZyYW1ld29yayxcclxuICAgICAgICBzdHlsZXM6IHBhcmFtZXRlcnMud2l0aFN0eWxlcyA9PT0gXCJBbGwgU3R5bGVzXCIgPyBnZXRTdHlsZXMoZmlnbWEpIDogbnVsbCxcclxuICAgICAgICBuYW1lOiAoX2MgPSAoX2IgPSAoX2EgPSBmaWdtYS5jdXJyZW50UGFnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbGVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iWzBdKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSxcclxuICAgIH0pO1xyXG59KTtcclxuLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4vLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cclxuLy9maWdtYS5jbG9zZVBsdWdpbigpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=