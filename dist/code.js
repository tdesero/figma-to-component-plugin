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
            value: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.colorAsHexOrRgba)(paints === null || paints === void 0 ? void 0 : paints[0]),
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
    border-width:  ${node.strokeWeight}pxs; 
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
        const styleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_b = figma.getStyleById(node.fillStyleId)) === null || _b === void 0 ? void 0 : _b.name);
        const color = ((_d = (_c = node.fills) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.opacity) < 1
            ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbaColor)((_f = (_e = node.fills) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.color, (_h = (_g = node.fills) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.opacity)
            : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)((_k = (_j = node.fills) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.color);
        return `var(--${styleName}, ${color})`;
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
        const styleName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.cleanStyleName)((_k = figma.getStyleById(node.strokeStyleId)) === null || _k === void 0 ? void 0 : _k.name);
        return `var(--${styleName}, ${color})`;
    }
    return color;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFvQix3Q0FBd0M7QUFDNUQsVUFBVSxvRkFBb0YsZ0VBQVMsT0FBTztBQUM5RztBQUNBLHFCQUFxQiwrREFBYSxpQ0FBaUMsRUFBRSwrREFBYSxnQ0FBZ0M7QUFDbEg7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLHFCQUFxQix1Q0FBdUM7QUFDNUQsa0JBQWtCLGtFQUFXLElBQUk7QUFDakMsd0JBQXdCLGVBQWU7QUFDdkMsMEJBQTBCLHFDQUFxQztBQUMvRCxnQkFBZ0IsaUZBQWlGLGdFQUFTLElBQUk7QUFDOUc7QUFDQSwrQkFBK0IsS0FBSyxFQUFFLElBQUksV0FBVyxnQkFBZ0IsZ0JBQWdCLCtEQUFhLDhCQUE4QixFQUFFLCtEQUFhLDZCQUE2QjtBQUM1SztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxXQUFXO0FBQ3hCLGNBQWMsWUFBWTtBQUMxQixtQkFBbUIsWUFBWSxFQUFFLFlBQVk7QUFDN0M7QUFDQSx1QkFBdUIsK0RBQWEsaUNBQWlDLEVBQUUsK0RBQWEsZ0NBQWdDO0FBQ3BIO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0NBQWdDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELHFEQUFTO0FBQ2xFO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGVhblN0eWxlTmFtZSwgY29sb3JBc0hleE9yUmdiYSB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBmb250U3R5bGVBc09iamVjdCwgbGluZUhlaWdodCwgZm9udFNob3J0aGFuZCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGZpZ21hKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgcGFpbnRTdHlsZXMgPSAoX2EgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHsgbmFtZSwgcGFpbnRzIH0pID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGNvbG9yQXNIZXhPclJnYmEocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdKSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0U3R5bGVzID0gKF9iID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5tYXAoKHN0eWxlKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KHN0eWxlLmZvbnROYW1lKTtcclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IHN0eWxlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gc3R5bGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChzdHlsZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUoc3R5bGUubmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodCxcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBpc0l0YWxpYyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXh0c3R5bGVzXCIsIHRleHRTdHlsZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYWludFN0eWxlcyxcclxuICAgICAgICB0ZXh0U3R5bGVzLFxyXG4gICAgfTtcclxufVxyXG4iLCIvKiBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcclxuICAgIGlmICh0eXBlb2YgcmdiICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcmdiO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JhQ29sb3Iob2JqLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZ2IgY29sb3IgbXVzdCBiZSBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBvYmo7XHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wb25lbnRUbzI1NShyKX0sICR7Y29tcG9uZW50VG8yNTUoZyl9LCAke2NvbXBvbmVudFRvMjU1KGIpfSwgJHthLnRvRml4ZWQoMil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcclxuICAgIHJldHVybiB1bnNhZmVcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTYWZlRm9yQ1NTKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIGlmICghbmFtZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSwgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbi8qIGNzcyBwcm9wcyBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCFub2RlLnN0cm9rZXMgfHwgIW5vZGUuc3Ryb2tlV2VpZ2h0IHx8IG5vZGUuc3Ryb2tlcy5sZW5ndGggPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCgoX2IgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnR5cGUpID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIGJvcmRlci13aWR0aDogICR7bm9kZS5zdHJva2VXZWlnaHR9cHhzOyBcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7IFxyXG4gICAgYm9yZGVyLWltYWdlOiAke3N0cm9rZUNvbG9yKG5vZGUpfTsgXHJcbiAgICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XHJcbiAgICBgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBib3JkZXI6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHggc29saWQgJHtzdHJva2VDb2xvcihub2RlKX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZ1Byb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnBhZGRpbmdUb3AgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nUmlnaHQgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nQm90dG9tICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0xlZnQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYHBhZGRpbmc6ICR7bm9kZS5wYWRkaW5nVG9wfXB4ICR7bm9kZS5wYWRkaW5nUmlnaHR9cHggJHtub2RlLnBhZGRpbmdCb3R0b219cHggJHtub2RlLnBhZGRpbmdMZWZ0fXB4O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQcm9wKG5vZGUpIHtcclxuICAgIGNvbnN0IGZsZXhTaHJpbmtHcm93ID0gbm9kZS5sYXlvdXRHcm93ID09PSAxID8gXCJmbGV4LWdyb3c6IDE7IGZsZXgtc2hyaW5rOiAxO1wiIDogc2hyaW5rKCk7XHJcbiAgICBmdW5jdGlvbiBzaHJpbmsoKSB7XHJcbiAgICAgICAgcmV0dXJuICEobm9kZS50eXBlID09PSBcIlRFWFRcIikgJiYgIShub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgICAgID8gXCJmbGV4LXNocmluazogMDtcIlxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXlvdXRBbGlnbiA9IG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiID8gXCJhbGlnbi1zZWxmOiBzdHJldGNoO1wiIDogXCJcIjtcclxuICAgIGNvbnN0IGFsaWduSXRlbXNNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QganVzdGlmeUNvbnRlbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgbGV0IGxheW91dFByb3BzID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIC8vIHBvc2l0aW9uOiAke1tcIkZSQU1FXCIsIFwiQ09NUE9ORU5UXCIsIFwiSU5TVEFOQ0VcIl0uaW5jbHVkZXMobm9kZS50eXBlKSA/ICdyZWxhdGl2ZScgOiAnc3RhdGljJ307IC8qIGRvbnQgZ2V0IHRoaXMuLi4gKi9cclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgfHxcclxuICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyArPSBsYXlvdXRBbGlnbiArIGZsZXhTaHJpbmtHcm93O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheW91dFByb3BzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaW1lbnNpb25zKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBsZXQgaGVpZ2h0ID0gXCJcIjtcclxuICAgIGxldCB3aWR0aCA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICB3aWR0aCA9IG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgLy8gZGVmYXVsdCBjYXNlXHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSAoKF9iID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJXSURUSFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiZcclxuICAgICAgICBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgaGVpZ2h0OiAke2hlaWdodH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgb3BhY2l0eTogJHtub2RlLm9wYWNpdHl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcclxuICAgIGNvbnN0IGNvb3JkID0gbm9kZS5pZCA9PT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkXHJcbiAgICAgICAgPyBcIlwiXHJcbiAgICAgICAgOiBgbGVmdDogJHtub2RlLnh9cHg7IHRvcDogJHtub2RlLnl9cHhgO1xyXG4gICAgY29uc3QgcG9zaXRpb25Gcm9tUGFyZW50ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RhdGljXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke25vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiTk9ORVwiIHx8ICFub2RlLnBhcmVudC5sYXlvdXRNb2RlXHJcbiAgICAgICAgICAgID8gYGFic29sdXRlOyAke2Nvb3JkfWBcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlXCJ9YDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBwb3NpdGlvbjogJHtwb3NpdGlvbkZyb21QYXJlbnQobm9kZSl9O1xyXG4gICAgYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8IG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSxcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdDtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvL2F0bSBvbmx5IG9uZSBmaWxsIGlzIHN1cHBvcnRlZFxyXG4gICAgY29uc3QgZmlsbCA9IChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZpbGwudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC50eXBlID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBncmFkaWVudFN0b3BzIH0gPSBmaWxsO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIGNvbnN0IGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoKHMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHt0cmFuc2Zvcm1zLmFuZ2xlICsgOTB9ZGVnLCAke2dyYWRpZW50TWFwLmpvaW4oXCIsXCIpfSlgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUuZmlsbFN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2IgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5maWxsU3R5bGVJZCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5uYW1lKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9ICgoX2QgPSAoX2MgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbMF0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5vcGFjaXR5KSA8IDFcclxuICAgICAgICAgICAgPyByZ2JhQ29sb3IoKF9mID0gKF9lID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lWzBdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuY29sb3IsIChfaCA9IChfZyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1swXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogcmdiVG9IZXgoKF9rID0gKF9qID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qWzBdKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2suY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBgdmFyKC0tJHtzdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgoX20gPSAoX2wgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xbMF0pID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbS5vcGFjaXR5KSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcigoX3AgPSAoX28gPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29bMF0pID09PSBudWxsIHx8IF9wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcC5jb2xvciwgKF9yID0gKF9xID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX3EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9xWzBdKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Iub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KChfdCA9IChfcyA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc1swXSkgPT09IG51bGwgfHwgX3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90LmNvbG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3Jtcyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS5yb3RhdGlvbiAmJiBub2RlLnR5cGUgIT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCR7bm9kZS5yb3RhdGlvbiAqIC0xfWRlZyk7XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIHJldHVybiBgYm9yZGVyLXJhZGl1czogJHt0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBgJHtub2RlLnRvcExlZnRSYWRpdXN9cHggJHtub2RlLnRvcFJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21SaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tTGVmdFJhZGl1c31weGB9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIC8qIFRPRE86IHRoaXMgaXMgcXVpdGUgdGhlIHNhbWUgZnVuY3Rpb24gYXMgZmlsbENvbG9yIC0+IHJlZmFjdG9yIHRvIHNoYXJlIHRoZSBzYW1lIGNvZGUgYmFzZSAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICBpZiAoIXN0cm9rZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0cm9rZS52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChzdHJva2UudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gc3Ryb2tlO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKHN0cm9rZS5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICAgICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9ICR7cy5wb3NpdGlvbiAqIDEwMH0lYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2xvciA9ICgoX2MgPSAoX2IgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm9wYWNpdHkpIDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKChfZSA9IChfZCA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kWzBdKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuY29sb3IsIChfZyA9IChfZiA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mWzBdKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KChfaiA9IChfaCA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oWzBdKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ouY29sb3IpO1xyXG4gICAgaWYgKG5vZGUuc3Ryb2tlU3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfayA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnN0cm9rZVN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2submFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3N0eWxlTmFtZX0sICR7Y29sb3J9KWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29sb3I7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgdW5pdE1hcCA9IHtcclxuICAgICAgICBQSVhFTFM6IFwicHhcIixcclxuICAgICAgICBQRVJDRU5UOiBcIiVcIixcclxuICAgIH07XHJcbiAgICBjb25zdCB1bml0ID0gdW5pdE1hcFtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXRdO1xyXG4gICAgcmV0dXJuIGAke25vZGVPclN0eWxlLmxpbmVIZWlnaHQudmFsdWV9JHt1bml0fWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoeyBsaW5lSGVpZ2h0LCBmb250U2l6ZSwgd2VpZ2h0LCBmb250RmFtaWx5LCBpc0l0YWxpYywgfSkge1xyXG4gICAgY29uc3QgaXRhbGljID0gaXNJdGFsaWMgPyBcIml0YWxpYyBcIiA6IFwiXCI7XHJcbiAgICByZXR1cm4gYCR7d2VpZ2h0fSAke2l0YWxpY30ke2ZvbnRTaXplfXB4JHtsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIn0gJyR7Zm9udEZhbWlseX0nYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KG5vZGUuZm9udE5hbWUpO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBub2RlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChub2RlKTtcclxuICAgIGNvbnN0IHNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9KTtcclxuICAgIGlmIChub2RlLnRleHRTdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9jID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUudGV4dFN0eWxlSWQudG9TdHJpbmcoKSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYGZvbnQ6IHZhcigtLSR7c3R5bGVOYW1lfSwgJHtzaG9ydGhhbmR9KTtgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBmb250OiAke3Nob3J0aGFuZH07YDtcclxufVxyXG4vKiBjc3MgcHJvcHMgaGVsZXBlcnMgZW5kICovXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgYm94U2hhZG93LCBkaW1lbnNpb25zLCBwb3NpdGlvbiwgb3ZlcmZsb3csIG9wYWNpdHksIHN0cm9rZUNvbG9yLCBmb250UHJvcCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUywgZ2V0VHJhbnNmb3JtcyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRTdHlsZXMgfSBmcm9tIFwiLi9nZXRTdHlsZXNcIjtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDAgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YCxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZUNoaWxkcmVuID09PSBudWxsIHx8IHRyZWVDaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJlZUNoaWxkcmVuLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbihub2RlLmNoaWxkcmVuLCBuZXdFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4oZnJhbWUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7dHJlZUVsZW1lbnQubmFtZX0geyR7dHJlZUVsZW1lbnQuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgIGZ1bmN0aW9uIGNoaWxkcmVuRWwodHJlZUVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKCgoX2EgPSB0cmVlRWxlbWVudC5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAubWFwKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgOiBcIlwifSAke2NoaWxkcmVuRWwodHJlZUVsZW1lbnQpfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICAvLyB3aHkgaXNuJ3QgdGhpcyBqdXN0IFwiY2hpbGRyZW5FbFwiID8/P1xyXG4gICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIikge1xyXG4gICAgICAgIGh0bWwgPSBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgaHRtbCA9IGNyZWF0ZVNWR09mQ2hpbGRyZW4odHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7Y2hpbGRyZW5FbCh0cmVlKX1cXG48L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5vZGUudmVjdG9yUGF0aHM7XHJcbiAgICBjb25zdCBwYXRocyA9IGdlb21ldHJ5ID09PSBudWxsIHx8IGdlb21ldHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZW9tZXRyeS5tYXAoKHApID0+IHtcclxuICAgICAgICByZXR1cm4gYDxwYXRoIGQ9XCIke3AuZGF0YX1cIiBmaWxsLXJ1bGU9XCIke3Aud2luZGluZ1J1bGVcclxuICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCl9XCIgLz5gO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYDxzdmcgXHJcbiAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxyXG4gIHdpZHRoPVwiJHtub2RlLndpZHRofVwiIFxyXG4gIGhlaWdodD1cIiR7bm9kZS5oZWlnaHR9XCIgXHJcbiAgc3Ryb2tlLXdpZHRoPVwiJHtub2RlLnN0cm9rZVdlaWdodH1cIiBcclxuICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG5vZGUpfVwiIFxyXG4gIHN0cm9rZS1saW5lY2FwPVwiJHtub2RlLnN0cm9rZUNhcC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcclxuICBmaWxsPVwiJHsoKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPT09IDAgPyBcIm5vbmVcIiA6IGZpbGxDb2xvcihub2RlKX1cIlxyXG4gIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gIHRyYW5zZm9ybT1cInNjYWxlKCR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVh9ICR7Z2V0VHJhbnNmb3Jtcyhub2RlLmFic29sdXRlVHJhbnNmb3JtKS5zY2FsZVl9KVwiIFxyXG4gID5cclxuICAgICR7cGF0aHMuam9pbihcIlwiKX1cclxuICA8L3N2Zz5gO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVNWR09mQ2hpbGRyZW4obm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBwYXRocyA9IChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKG4pID0+IHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG4udmVjdG9yUGF0aHM7XHJcbiAgICAgICAgcmV0dXJuIGdlb21ldHJ5ID09PSBudWxsIHx8IGdlb21ldHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZW9tZXRyeS5tYXAoKHApID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxwYXRoIFxyXG4gICAgICAgIGQ9XCIke3AuZGF0YX1cIlxyXG4gICAgICAgIGZpbGwtcnVsZT1cIiR7cC53aW5kaW5nUnVsZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9XCJcclxuICAgICAgICBzdHJva2U9XCIke3N0cm9rZUNvbG9yKG4pfVwiXHJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiJHtuLnN0cm9rZVdlaWdodH1cIiAgXHJcbiAgICAgICAgc3Ryb2tlLWxpbmVjYXA9XCIke24uc3Ryb2tlQ2FwLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKX1cIlxyXG4gICAgICAgIGZpbGw9XCIkeygoX2EgPSBuLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA9PT0gMCA/IFwibm9uZVwiIDogZmlsbENvbG9yKG4pfVwiIFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke24ueH0gJHtuLnl9KSByb3RhdGUoJHtuLnJvdGF0aW9uICogLTF9LCAwLCAwKSBzY2FsZSgke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVYfSAke2dldFRyYW5zZm9ybXMobi5hYnNvbHV0ZVRyYW5zZm9ybSkuc2NhbGVZfSlcIlxyXG4gICAgICAvPmA7XHJcbiAgICAgICAgfSkuam9pbihcIlwiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGA8c3ZnIFxyXG4gICAgY2xhc3M9XCIke2NsYXNzTmFtZX1cIlxyXG4gICAgd2lkdGg9XCIke25vZGUud2lkdGh9XCIgXHJcbiAgICBoZWlnaHQ9XCIke25vZGUuaGVpZ2h0fVwiIFxyXG4gICAgdmlld0JveD1cIjAgMCAke25vZGUud2lkdGh9ICR7bm9kZS5oZWlnaHR9XCJcclxuICAgIHRyYW5zZm9ybS1vcmlnaW49XCIwIDBcIlxyXG4gICAgdHJhbnNmb3JtPVwic2NhbGUoJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWH0gJHtnZXRUcmFuc2Zvcm1zKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pLnNjYWxlWX0pXCIgXHJcbiAgICA+XHJcbiAgICAgICR7cGF0aHMuam9pbihcIlwiKX1cclxuICA8L3N2Zz5gO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIndpdGhTdHlsZXNcIjpcclxuICAgICAgICAgICAgY29uc3QgYW5zd2VycyA9IFtcIkFsbCBTdHlsZXNcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhhbnN3ZXJzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnNvbGUubG9nKGNvbW1hbmQsIHBhcmFtZXRlcnMpO1xyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogNDAwIH0pO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzczogcHJpbnRDU1ModHJlZSksXHJcbiAgICAgICAgaHRtbDogcHJpbnRIVE1MKHRyZWUpLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBwYXJhbWV0ZXJzLndpdGhTdHlsZXMgPT09IFwiQWxsIFN0eWxlc1wiID8gZ2V0U3R5bGVzKGZpZ21hKSA6IG51bGwsXHJcbiAgICAgICAgbmFtZTogKF9jID0gKF9iID0gKF9hID0gZmlnbWEuY3VycmVudFBhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUsXHJcbiAgICB9KTtcclxufSk7XHJcbi8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcclxuLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbi8vZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9