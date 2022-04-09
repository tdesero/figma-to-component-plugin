/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSVG": () => (/* binding */ createSVG)
/* harmony export */ });
/* harmony import */ var _helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/propsHelpers */ "./src/helpers/propsHelpers.ts");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/helpers */ "./src/helpers/helpers.ts");
/* harmony import */ var _getStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getStyles */ "./src/getStyles.ts");
/* harmony import */ var _tailwind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tailwind */ "./src/tailwind.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/* Beta */

function nodeCSS(node) {
    var _a, _b;
    console.log("node", node);
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
function segmentCss(textSegment) {
    return `
      color: ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fillColor)(textSegment)};
      ${(0,_helpers_propsHelpers__WEBPACK_IMPORTED_MODULE_0__.fontProp)(textSegment)}
    `;
}
function createTree(selection) {
    var _a;
    let componentName = "component";
    // Only to prevent duplicate Names
    const allNames = [];
    function uniqueName(className, n = 1) {
        const suffix = n > 1 ? n : "";
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
        textSegments: [],
    };
    function theChildren(children, treeChildren) {
        children.forEach((node, i) => {
            var _a;
            if (!node.visible)
                return;
            const name = `${componentName}__${uniqueName((0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(node.name))}`;
            const newElement = {
                name,
                css: nodeCSS(node),
                allChildrenAreVector: allChildrenAreVector(node),
                children: [],
                type: node.type,
                characters: node.characters,
                originalNode: node,
                textSegments: [],
            };
            treeChildren === null || treeChildren === void 0 ? void 0 : treeChildren.push(newElement);
            if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(node.children, newElement.children);
            }
            if (node.type === "TEXT") {
                const textSegments = getTextSegments(node, name, uniqueName);
                newElement.textSegments = textSegments;
            }
        });
    }
    if (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        theChildren(frame.children, tree.children);
    }
    if (frame.type === "TEXT") {
        const textSegments = getTextSegments(frame, tree.name, uniqueName);
        tree.textSegments = textSegments;
    }
    return tree;
}
function getTextSegments(node, componentName, uniqueName) {
    const segments = node.getStyledTextSegments([
        "fontSize",
        "fontName",
        "textDecoration",
        "textCase",
        "lineHeight",
        "letterSpacing",
        "fills",
        "textStyleId",
        "fillStyleId",
        "listOptions",
        "indentation",
    ]);
    return segments.map((s) => {
        return Object.assign(Object.assign({}, s), { name: `${uniqueName((0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(componentName + "-span"))}`, css: segmentCss(s) });
    });
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
            if (treeElement.textSegments.length > 1) {
                treeElement.textSegments.forEach((s) => {
                    css += `.${s.name} {${s.css}}\n`;
                });
            }
            if (treeElement.children.length > 0) {
                theChildren(treeElement.children);
            }
        });
    }
    if (tree.textSegments.length > 1) {
        tree.textSegments.forEach((s) => {
            css += `.${s.name} {${s.css}}\n`;
        });
    }
    if (!tree.allChildrenAreVector) {
        theChildren(tree.children);
    }
    return css;
}
function printHTML(tree) {
    return __awaiter(this, void 0, void 0, function* () {
        let html = "";
        function theChildren(children) {
            return __awaiter(this, void 0, void 0, function* () {
                if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
                    const all = yield Promise.all(children.map((treeElement) => __awaiter(this, void 0, void 0, function* () {
                        if (treeElement.type === "VECTOR" ||
                            treeElement.type === "BOOLEAN_OPERATION" ||
                            treeElement.allChildrenAreVector) {
                            return yield createSVG(treeElement.originalNode, treeElement.name);
                        }
                        return `<div class="${treeElement.name}">\n${treeElement.textSegments
                            ? printTextSegments(treeElement.textSegments)
                            : ""} ${yield theChildren(treeElement.children)}\n</div>`;
                    })));
                    return all.join("");
                }
                else {
                    return "";
                }
            });
        }
        // this should become more DRY...
        if (tree.type === "VECTOR" || tree.allChildrenAreVector) {
            html = yield createSVG(tree.originalNode, tree.name);
        }
        else {
            html += `<div class="${tree.name}">\n${tree.textSegments ? printTextSegments(tree.textSegments) : ""} ${yield theChildren(tree.children)}\n</div>`;
        }
        return html;
    });
}
function printTextSegments(segments) {
    if (segments.length === 1) {
        // do not wrap in span
        return (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(segments[0].characters)
            .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
            .replace(/\n/g, "<br/>");
    }
    return segments
        .map((s) => {
        return `<span class="${s.name}">${(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(s.characters)
            .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
            .replace(/\n/g, "<br/>")}</span>`;
    })
        .join("");
}
function allChildrenAreVector(frame) {
    var _a, _b, _c;
    return (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        ((_b = frame.children) === null || _b === void 0 ? void 0 : _b.filter((n) => n.type === "VECTOR").length) ===
            ((_c = frame.children) === null || _c === void 0 ? void 0 : _c.length));
}
function createSVG(node, className) {
    return __awaiter(this, void 0, void 0, function* () {
        const svg = yield node
            .exportAsync({ format: "SVG", useAbsoluteBounds: true })
            .then((res) => 
        // Uint8Array to string and inject classname
        String.fromCharCode
            .apply(null, res)
            .replace("<svg ", `<svg class="${className}" `))
            .catch((err) => console.error(err));
        return svg;
    });
}
figma.parameters.on("input", ({ parameters, key, query, result }) => {
    switch (key) {
        case "framework":
            const frameworks = ["react", "html", "tailwind(beta)"];
            result.setSuggestions(frameworks.filter((s) => s.includes(query)));
            break;
        default:
            return;
    }
});
figma.on("run", ({ command, parameters }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    figma.showUI(__html__, { height: 500, width: 400 });
    const css = parameters.framework === "tailwind(beta)" ? "-" : printCSS(tree);
    const html = parameters.framework === "tailwind(beta)"
        ? yield (0,_tailwind__WEBPACK_IMPORTED_MODULE_3__.tailwind)(tree)
        : yield printHTML(tree);
    figma.ui.postMessage({
        css,
        html,
        framework: parameters.framework,
        styles: (0,_getStyles__WEBPACK_IMPORTED_MODULE_2__.getStyles)(figma),
        name: (_c = (_b = (_a = figma.currentPage) === null || _a === void 0 ? void 0 : _a.selection) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name,
    });
}));


/***/ }),

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
    return name.replace(/[^a-z0-9_-]/g, function (s) {
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

function borderProp(node) {
    var _a, _b;
    if (node.type === "VECTOR")
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    if (((_b = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "GRADIENT_LINEAR") {
        return `
    border-width: ${node.strokeWeight}px; 
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
    const flexShrinkGrow = node.layoutGrow === 1 ? "flex: 1;" : shrink();
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
    /* NOTE: The Order of these if statements is important! */
    var _a, _b, _c, _d, _e;
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
        height = ((_a = node.textAutoResize) === null || _a === void 0 ? void 0 : _a.toString().includes("HEIGHT"))
            ? "auto"
            : node.height + "px";
        width = ((_b = node.textAutoResize) === null || _b === void 0 ? void 0 : _b.toString().includes("WIDTH"))
            ? "auto"
            : node.width + "px";
    }
    if ((!node.children || ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) === 0) && node.type !== "TEXT") {
        height = node.height + "px";
        width = node.width + "px";
    }
    if ((node.parent.layoutMode === "VERTICAL" && node.layoutAlign === "STRETCH") ||
        ((_d = node.constraints) === null || _d === void 0 ? void 0 : _d.horizontal) === "STRETCH") {
        width = "auto";
    }
    if (node.parent.layoutMode === "HORIZONTAL" && node.layoutGrow === 1) {
        width = "auto";
    }
    if ((node.parent.layoutMode === "HORIZONTAL" &&
        node.layoutAlign === "STRETCH") ||
        (node.parent.layoutMode === "VERTICAL" && node.layoutGrow === 1) ||
        ((_e = node.constraints) === null || _e === void 0 ? void 0 : _e.vertical) === "STRETCH") {
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
    var _a, _b, _c, _d, _e, _f;
    let coord = "";
    function findAbsoluteParent(node) {
        if (node.parent.type === "GROUP") {
            return findAbsoluteParent(node.parent);
        }
        return node.parent;
    }
    if (node.id !== figma.currentPage.selection[0].id) {
        // Super ugly but works for now...
        if (((_a = node.constraints) === null || _a === void 0 ? void 0 : _a.horizontal) === "MAX") {
            coord += `right: ${findAbsoluteParent(node).width - node.width - node.x}px;`;
        }
        else if (((_b = node.constraints) === null || _b === void 0 ? void 0 : _b.horizontal) === "STRETCH") {
            coord += `right: ${findAbsoluteParent(node).width - node.width - node.x}px; left: ${node.x}px;`;
        }
        else if (((_c = node.constraints) === null || _c === void 0 ? void 0 : _c.horizontal) === "CENTER") {
            coord += `left: calc(50% - ${findAbsoluteParent(node).width / 2 - node.x}px);`;
        }
        else {
            coord += `left: ${node.x}px;`;
        }
        if (((_d = node.constraints) === null || _d === void 0 ? void 0 : _d.vertical) === "MAX") {
            coord += `bottom: ${findAbsoluteParent(node).height - node.height - node.y}px;`;
        }
        else if (((_e = node.constraints) === null || _e === void 0 ? void 0 : _e.vertical) === "STRETCH") {
            coord += `bottom: ${findAbsoluteParent(node).height - node.height - node.y}px; top: ${node.y}px;`;
        }
        else if (((_f = node.constraints) === null || _f === void 0 ? void 0 : _f.vertical) === "CENTER") {
            coord += `top: calc(50% - ${findAbsoluteParent(node).height / 2 - node.y}px);`;
        }
        else {
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
        return `${node.parent.layoutMode === "NONE" || !node.parent.layoutMode
            ? `absolute; ${coord}`
            : "relative;"}`;
    };
    return `
      position: ${positionFromParent(node)}
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
        weight: weightMap[weight] ? weightMap[weight] : "400",
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
    if (!node.cornerRadius && !node.topLeftRadius)
        return "";
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
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code */ "./src/code.ts");
/*
This file tries to convert figma into tailwind.
It tries to interpret the css already generated from this plugin as tailwind classes.
This will never work perfectly but may provide a starting point for development.
*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    gap: sizesMap,
    top: sizesMap,
    left: sizesMap,
    "flex-direction": flexDirectionMap,
    "border-radius": {
        "0px": "none",
        "2px": "sm",
        "4px": "",
        "6px": "md",
        "8px": "lg",
        "12px": "xl",
        "16px": "2xl",
        "24px": "3xl",
        "9999px": "full",
    },
    background: { transparent: "transparent" },
    "justify-content": {
        "flex-start": "start",
        "flex-end": "end",
        center: "center",
    },
    "align-items": {
        "flex-start": "start",
        "flex-end": "end",
        center: "center",
    },
    "align-self": {
        stretch: "stretch",
    },
    overflow: {
        hidden: "hidden",
    },
};
function tailwind(tree) {
    return __awaiter(this, void 0, void 0, function* () {
        let html = "";
        function theChildren(children) {
            return __awaiter(this, void 0, void 0, function* () {
                if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
                    const all = yield Promise.all(children.map((treeElement) => __awaiter(this, void 0, void 0, function* () {
                        if (treeElement.type === "VECTOR" ||
                            treeElement.type === "BOOLEAN_OPERATION" ||
                            treeElement.allChildrenAreVector) {
                            return yield (0,_code__WEBPACK_IMPORTED_MODULE_0__.createSVG)(treeElement.originalNode, 
                            // hacky...
                            `${tailwindClassNames(treeElement.css, treeElement.originalNode)
                                .classNames}" style="${tailwindClassNames(treeElement.css, treeElement.originalNode)
                                .inlineStyles}`);
                        }
                        return `<div class="${tailwindClassNames(treeElement.css, treeElement.originalNode)
                            .classNames}" style="${tailwindClassNames(treeElement.css, treeElement.originalNode)
                            .inlineStyles}">\n${treeElement.characters
                            ? treeElement.characters.replaceAll("\n", "<br />")
                            : ""} ${yield theChildren(treeElement.children)}\n</div>`;
                    })));
                    return all.join("");
                }
                else {
                    return "";
                }
            });
        }
        // this should become more DRY...
        if (tree.type === "VECTOR" || tree.allChildrenAreVector) {
            html = yield (0,_code__WEBPACK_IMPORTED_MODULE_0__.createSVG)(tree.originalNode, `${tailwindClassNames(tree.css, tree.originalNode).classNames}" style="${tailwindClassNames(tree.css, tree.originalNode).inlineStyles}`);
        }
        else {
            html += `<div class="${tailwindClassNames(tree.css, tree.originalNode).classNames}" style="${tailwindClassNames(tree.css, tree.originalNode).inlineStyles}">\n${tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""} ${yield theChildren(tree.children)}\n</div>`;
        }
        return html;
    });
}
function tailwindClassNames(css, node) {
    const cssLineByLine = css
        .replaceAll("\n", "")
        .split(";")
        .map((e) => e.trim())
        .filter((e) => e !== "");
    const keyValuePairs = cssLineByLine.map((line) => {
        const [key, value] = line.split(":");
        return { key: key === null || key === void 0 ? void 0 : key.trim(), value: value === null || value === void 0 ? void 0 : value.trim() };
    });
    const cssPropsMap = {
        "border-radius": "rounded",
        width: "w",
        height: "h",
        "text-align": "text",
        "flex-direction": "flex",
        position: "",
        display: "",
        flex: "flex",
        gap: "gap",
        top: "top",
        left: "left",
        "justify-content": "justify",
        "align-items": "items",
        "align-self": "self",
        overflow: "overflow",
    };
    // these will be generated from node or are not needed at all
    const excludeList = ["padding", "margin", "box-sizing"];
    const inlineStyles = [];
    const classNames = keyValuePairs.map(({ key, value }) => {
        if (excludeList.includes(key))
            return null;
        const twValue = lookUpTailwindValue(key, value);
        const twKey = cssPropsMap[key];
        if (twKey === undefined) {
            inlineStyles.push(`${key}: ${value}`);
            return null;
        }
        /* for props like display etc. */
        if (twKey === "") {
            return twValue;
        }
        if (twValue === "") {
            return twKey;
        }
        return [twKey, twValue].join("-");
    });
    // padding, fontSize etc.
    const classNamesDirectlyExtractedFromNode = extractClassNamesFromNode(node);
    return {
        classNames: classNames
            .concat(classNamesDirectlyExtractedFromNode)
            .filter((e) => e !== null)
            .join(" "),
        inlineStyles: inlineStyles.join("; "),
    };
}
function lookUpTailwindValue(propKey, value) {
    var _a;
    const valuesNotNeededToChange = ["display", "position", "text-align", "flex"];
    const twValue = (_a = twMap[propKey]) === null || _a === void 0 ? void 0 : _a[value];
    if (valuesNotNeededToChange.includes(propKey)) {
        return value;
    }
    if (twValue === undefined) {
        return `[${value}]`;
    }
    if (twValue === "") {
        return "";
    }
    return twValue;
}
function extractClassNamesFromNode(node) {
    const classNames = [];
    /* paddings */
    if (node.paddingLeft) {
        const paddings = [
            node.paddingTop,
            node.paddingRight,
            node.paddingBottom,
            node.paddingLeft,
        ];
        if (paddings.every((p) => p === paddings[0])) {
            classNames.push(`p-${lookUpTailwindValue("padding", paddings[0] + "px")}`);
        }
        else {
            const direction = ["t", "r", "b", "l"];
            paddings.forEach((p, i) => {
                classNames.push(`p${direction[i]}-${lookUpTailwindValue("padding", p + "px")}`);
            });
        }
    }
    /* paddings end */
    return classNames;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/code.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1EQUFtRDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxhQUFhLEdBQUcseUNBQXlDO0FBQzdGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM01BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL3RhaWx3aW5kLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgYm94U2hhZG93LCBkaW1lbnNpb25zLCBwb3NpdGlvbiwgb3ZlcmZsb3csIG9wYWNpdHksIGZvbnRQcm9wLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmltcG9ydCB7IGVzY2FwZUh0bWwsIG1ha2VTYWZlRm9yQ1NTIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGdldFN0eWxlcyB9IGZyb20gXCIuL2dldFN0eWxlc1wiO1xyXG4vKiBCZXRhICovXHJcbmltcG9ydCB7IHRhaWx3aW5kIH0gZnJvbSBcIi4vdGFpbHdpbmRcIjtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2coXCJub2RlXCIsIG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBjb2xvcjogJHtmaWxsQ29sb3Iobm9kZSl9O1xyXG4gICAgICB0ZXh0LWFsaWduOiAkeyhfYiA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCl9O1xyXG4gICAgICAke2ZvbnRQcm9wKG5vZGUpfVxyXG4gICAgICAke29wYWNpdHkobm9kZSl9XHJcbiAgICAgICR7cG9zaXRpb24obm9kZSl9XHJcbiAgICAgICR7ZGlzcGxheVByb3Aobm9kZSl9XHJcbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgYmFja2dyb3VuZDogJHtmaWxsQ29sb3Iobm9kZSl9O1xyXG4gICAgICAke2JvcmRlclJhZGl1cyhub2RlKX1cclxuICAgICAgJHtib3JkZXJQcm9wKG5vZGUpfVxyXG4gICAgICAke29wYWNpdHkobm9kZSl9XHJcbiAgICAgICR7cGFkZGluZ1Byb3Aobm9kZSl9XHJcbiAgICAgICR7ZGlzcGxheVByb3Aobm9kZSl9XHJcbiAgICAgICR7ZGltZW5zaW9ucyhub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtib3hTaGFkb3cobm9kZSl9XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxyXG4gICAgICAke292ZXJmbG93KG5vZGUpfVxyXG4gICAgYDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZWdtZW50Q3NzKHRleHRTZWdtZW50KSB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBjb2xvcjogJHtmaWxsQ29sb3IodGV4dFNlZ21lbnQpfTtcclxuICAgICAgJHtmb250UHJvcCh0ZXh0U2VnbWVudCl9XHJcbiAgICBgO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDEgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7Y29tcG9uZW50TmFtZX1fXyR7dW5pcXVlTmFtZShtYWtlU2FmZUZvckNTUyhub2RlLm5hbWUpKX1gO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgIHRleHRTZWdtZW50czogW10sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICB0aGVDaGlsZHJlbihmcmFtZS5jaGlsZHJlbiwgdHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICBpZiAoZnJhbWUudHlwZSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICBjb25zdCB0ZXh0U2VnbWVudHMgPSBnZXRUZXh0U2VnbWVudHMoZnJhbWUsIHRyZWUubmFtZSwgdW5pcXVlTmFtZSk7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5mdW5jdGlvbiBnZXRUZXh0U2VnbWVudHMobm9kZSwgY29tcG9uZW50TmFtZSwgdW5pcXVlTmFtZSkge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBub2RlLmdldFN0eWxlZFRleHRTZWdtZW50cyhbXHJcbiAgICAgICAgXCJmb250U2l6ZVwiLFxyXG4gICAgICAgIFwiZm9udE5hbWVcIixcclxuICAgICAgICBcInRleHREZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgXCJ0ZXh0Q2FzZVwiLFxyXG4gICAgICAgIFwibGluZUhlaWdodFwiLFxyXG4gICAgICAgIFwibGV0dGVyU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiZmlsbHNcIixcclxuICAgICAgICBcInRleHRTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJmaWxsU3R5bGVJZFwiLFxyXG4gICAgICAgIFwibGlzdE9wdGlvbnNcIixcclxuICAgICAgICBcImluZGVudGF0aW9uXCIsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzZWdtZW50cy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzKSwgeyBuYW1lOiBgJHt1bmlxdWVOYW1lKG1ha2VTYWZlRm9yQ1NTKGNvbXBvbmVudE5hbWUgKyBcIi1zcGFuXCIpKX1gLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5jb25zdCB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICBsZXQgY3NzID0gXCJcIjtcclxuICAgIGNzcyArPSBgLiR7dHJlZS5uYW1lfSB7JHt0cmVlLmNzc319XFxuYDtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgodHJlZUVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY3NzICs9IGAuJHt0cmVlRWxlbWVudC5uYW1lfSB7JHt0cmVlRWxlbWVudC5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gYC4ke3MubmFtZX0geyR7cy5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHJlZS50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRyZWUudGV4dFNlZ21lbnRzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgY3NzICs9IGAuJHtzLm5hbWV9IHske3MuY3NzfX1cXG5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50SFRNTCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgICAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjaGlsZHJlbiA9PT0gbnVsbCB8fCBjaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGRyZW4ubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGwgPSB5aWVsZCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoKHRyZWVFbGVtZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0cmVlRWxlbWVudC5uYW1lfVwiPlxcbiR7dHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByaW50VGV4dFNlZ21lbnRzKHRyZWVFbGVtZW50LnRleHRTZWdtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYmVjb21lIG1vcmUgRFJZLi4uXHJcbiAgICAgICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCB0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGh0bWwgPSB5aWVsZCBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLnRleHRTZWdtZW50cyA/IHByaW50VGV4dFNlZ21lbnRzKHRyZWUudGV4dFNlZ21lbnRzKSA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBwcmludFRleHRTZWdtZW50cyhzZWdtZW50cykge1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vIGRvIG5vdCB3cmFwIGluIHNwYW5cclxuICAgICAgICByZXR1cm4gZXNjYXBlSHRtbChzZWdtZW50c1swXS5jaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcblwiKSAvLyBtYWtlcyBhbm5veWluZyBMLVNFUCBMaW5lYnJlYWtzIGRpc2FwcGVhclxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VnbWVudHNcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7cy5uYW1lfVwiPiR7ZXNjYXBlSHRtbChzLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKX08L3NwYW4+YDtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzdmcgPSB5aWVsZCBub2RlXHJcbiAgICAgICAgICAgIC5leHBvcnRBc3luYyh7IGZvcm1hdDogXCJTVkdcIiwgdXNlQWJzb2x1dGVCb3VuZHM6IHRydWUgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gXHJcbiAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiPHN2ZyBcIiwgYDxzdmcgY2xhc3M9XCIke2NsYXNzTmFtZX1cIiBgKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHN2ZztcclxuICAgIH0pO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIiwgXCJ0YWlsd2luZChiZXRhKVwiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGZyYW1ld29ya3MuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn0pO1xyXG5maWdtYS5vbihcInJ1blwiLCAoeyBjb21tYW5kLCBwYXJhbWV0ZXJzIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiA0MDAgfSk7XHJcbiAgICBjb25zdCBjc3MgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiID8gXCItXCIgOiBwcmludENTUyh0cmVlKTtcclxuICAgIGNvbnN0IGh0bWwgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiXHJcbiAgICAgICAgPyB5aWVsZCB0YWlsd2luZCh0cmVlKVxyXG4gICAgICAgIDogeWllbGQgcHJpbnRIVE1MKHRyZWUpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzcyxcclxuICAgICAgICBodG1sLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBnZXRTdHlsZXMoZmlnbWEpLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pKTtcclxuIiwiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZm9udFN0eWxlQXNPYmplY3QsIGxpbmVIZWlnaHQsIGZvbnRTaG9ydGhhbmQsIGdldENvbG9yLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgoeyBuYW1lLCBwYWludHMgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKG5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0Q29sb3IocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChzdHlsZS5mb250TmFtZSk7XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQoc3R5bGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKHN0eWxlLm5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWMsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlcyxcclxuICAgIH07XHJcbn1cclxuIiwiLyogaGVscGVycyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHJnYjtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIGByZ2JhKCR7Y29tcG9uZW50VG8yNTUocil9LCAke2NvbXBvbmVudFRvMjU1KGcpfSwgJHtjb21wb25lbnRUbzI1NShiKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIGlmICghbmFtZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgYm9yZGVyLXdpZHRoOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4OyBcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7IFxyXG4gICAgYm9yZGVyLWltYWdlOiAke3N0cm9rZUNvbG9yKG5vZGUpfTsgXHJcbiAgICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XHJcbiAgICBgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBib3JkZXI6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHggc29saWQgJHtzdHJva2VDb2xvcihub2RlKX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZ1Byb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnBhZGRpbmdUb3AgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nUmlnaHQgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nQm90dG9tICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0xlZnQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYHBhZGRpbmc6ICR7bm9kZS5wYWRkaW5nVG9wfXB4ICR7bm9kZS5wYWRkaW5nUmlnaHR9cHggJHtub2RlLnBhZGRpbmdCb3R0b219cHggJHtub2RlLnBhZGRpbmdMZWZ0fXB4O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQcm9wKG5vZGUpIHtcclxuICAgIGNvbnN0IGZsZXhTaHJpbmtHcm93ID0gbm9kZS5sYXlvdXRHcm93ID09PSAxID8gXCJmbGV4OiAxO1wiIDogc2hyaW5rKCk7XHJcbiAgICBmdW5jdGlvbiBzaHJpbmsoKSB7XHJcbiAgICAgICAgcmV0dXJuICEobm9kZS50eXBlID09PSBcIlRFWFRcIikgJiYgIShub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgICAgID8gXCJmbGV4LXNocmluazogMDtcIlxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXlvdXRBbGlnbiA9IG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiID8gXCJhbGlnbi1zZWxmOiBzdHJldGNoO1wiIDogXCJcIjtcclxuICAgIGNvbnN0IGFsaWduSXRlbXNNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QganVzdGlmeUNvbnRlbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgbGV0IGxheW91dFByb3BzID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgLyogTk9URTogVGhlIE9yZGVyIG9mIHRoZXNlIGlmIHN0YXRlbWVudHMgaXMgaW1wb3J0YW50ISAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcclxuICAgIGxldCBoZWlnaHQgPSBcIlwiO1xyXG4gICAgbGV0IHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSAoKF9iID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJXSURUSFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKCFub2RlLmNoaWxkcmVuIHx8ICgoX2MgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSA9PT0gMCkgJiYgbm9kZS50eXBlICE9PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGhlaWdodCA9IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgICgoX2QgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaG9yaXpvbnRhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJlxyXG4gICAgICAgIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB8fFxyXG4gICAgICAgICgoX2UgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudmVydGljYWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB3aWR0aDogJHt3aWR0aH07IGhlaWdodDogJHtoZWlnaHR9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcGFjaXR5KG5vZGUpIHtcclxuICAgIGlmIChub2RlLm9wYWNpdHkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYG9wYWNpdHk6ICR7bm9kZS5vcGFjaXR5fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgIGxldCBjb29yZCA9IFwiXCI7XHJcbiAgICBmdW5jdGlvbiBmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLnBhcmVudC50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlLnBhcmVudDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmlkICE9PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAvLyBTdXBlciB1Z2x5IGJ1dCB3b3JrcyBmb3Igbm93Li4uXHJcbiAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaG9yaXpvbnRhbCkgPT09IFwiTUFYXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfYiA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5ob3Jpem9udGFsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7IGxlZnQ6ICR7bm9kZS54fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCgoX2MgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaG9yaXpvbnRhbCkgPT09IFwiQ0VOVEVSXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGxlZnQ6IGNhbGMoNTAlIC0gJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLyAyIC0gbm9kZS54fXB4KTtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGxlZnQ6ICR7bm9kZS54fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoKF9kID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnZlcnRpY2FsKSA9PT0gXCJNQVhcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgYm90dG9tOiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueX1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoKF9lID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZlcnRpY2FsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGJvdHRvbTogJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC0gbm9kZS5oZWlnaHQgLSBub2RlLnl9cHg7IHRvcDogJHtub2RlLnl9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfZiA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi52ZXJ0aWNhbCkgPT09IFwiQ0VOVEVSXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogY2FsYyg1MCUgLSAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLyAyIC0gbm9kZS55fXB4KTtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogJHtub2RlLnl9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBwb3NpdGlvbkZyb21QYXJlbnQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGF0aWM7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmU7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IGBhYnNvbHV0ZTsgJHtjb29yZH1gXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZTtcIn1gO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9uRnJvbVBhcmVudChub2RlKX1cclxuICAgIGA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fCBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3Qgc2hhZG93cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09IFwiRFJPUF9TSEFET1dcIik7XHJcbiAgICBpZiAoc2hhZG93cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBsZXQgY3NzID0gXCJib3gtc2hhZG93OiBcIjtcclxuICAgIGNzcyArPSBzaGFkb3dzXHJcbiAgICAgICAgLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtzLm9mZnNldC54fXB4ICR7cy5vZmZzZXQueX1weCAke3MucmFkaXVzfXB4ICR7cy5zcHJlYWR9cHggJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX1gO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIiwgXCIpO1xyXG4gICAgcmV0dXJuIChgJHtub2RlLmVmZmVjdFN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIn1gICtcclxuICAgICAgICBjc3MgK1xyXG4gICAgICAgIFwiO1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFN0eWxlQXNPYmplY3QoZm9udE5hbWUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBpc0l0YWxpYyA9IChfYSA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpdGFsaWNcIik7XHJcbiAgICBjb25zdCB3ZWlnaHRNYXAgPSB7XHJcbiAgICAgICAgdGhpbjogMTAwLFxyXG4gICAgICAgIFwiZXh0cmEgbGlnaHRcIjogMjAwLFxyXG4gICAgICAgIGV4dHJhbGlnaHQ6IDIwMCxcclxuICAgICAgICBsaWdodDogMzAwLFxyXG4gICAgICAgIG5vcm1hbDogNDAwLFxyXG4gICAgICAgIHJlZ3VsYXI6IDQwMCxcclxuICAgICAgICBtZWRpdW06IDUwMCxcclxuICAgICAgICBcInNlbWkgYm9sZFwiOiA2MDAsXHJcbiAgICAgICAgc2VtaWJvbGQ6IDYwMCxcclxuICAgICAgICBib2xkOiA3MDAsXHJcbiAgICAgICAgXCJleHRyYSBib2xkXCI6IDgwMCxcclxuICAgICAgICBleHRyYWJvbGQ6IDgwMCxcclxuICAgICAgICBibGFjazogOTAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHdlaWdodCA9IChfYiA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIml0YWxpY1wiLCBcIlwiKS50cmltKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0TWFwW3dlaWdodF0gPyB3ZWlnaHRNYXBbd2VpZ2h0XSA6IFwiNDAwXCIsXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICBjb25zdCBmaWxsID0gKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKGZpbGwsIG5vZGUuZmlsbFN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1zKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnJvdGF0aW9uICYmIG5vZGUudHlwZSAhPT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoJHtub2RlLnJvdGF0aW9uICogLTF9ZGVnKTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBncmFkaWVudExpbmVhcihmaWxsKSB7XHJcbiAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IGZpbGw7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX0gJHtzLnBvc2l0aW9uICogMTAwfSVgO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICBpZiAoIW5vZGUuY29ybmVyUmFkaXVzICYmICFub2RlLnRvcExlZnRSYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYGJvcmRlci1yYWRpdXM6ICR7dHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBub2RlLmNvcm5lclJhZGl1cyArIFwicHhcIlxyXG4gICAgICAgIDogYCR7bm9kZS50b3BMZWZ0UmFkaXVzfXB4ICR7bm9kZS50b3BSaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbUxlZnRSYWRpdXN9cHhgfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBzdHJva2UgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihzdHJva2UsIG5vZGUuc3Ryb2tlU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yKGZpbGxPckNvbG9yLCBzdHlsZUlkKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmICghZmlsbE9yQ29sb3IudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbE9yQ29sb3IudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBncmFkaWVudExpbmVhcihmaWxsT3JDb2xvcik7XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChzdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBgdmFyKC0tJHtzdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgdW5pdE1hcCA9IHtcclxuICAgICAgICBQSVhFTFM6IFwicHhcIixcclxuICAgICAgICBQRVJDRU5UOiBcIiVcIixcclxuICAgIH07XHJcbiAgICBjb25zdCB1bml0ID0gdW5pdE1hcFtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXRdO1xyXG4gICAgcmV0dXJuIGAke25vZGVPclN0eWxlLmxpbmVIZWlnaHQudmFsdWV9JHt1bml0fWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoeyBsaW5lSGVpZ2h0LCBmb250U2l6ZSwgd2VpZ2h0LCBmb250RmFtaWx5LCBpc0l0YWxpYywgfSkge1xyXG4gICAgY29uc3QgaXRhbGljID0gaXNJdGFsaWMgPyBcIml0YWxpYyBcIiA6IFwiXCI7XHJcbiAgICByZXR1cm4gYCR7d2VpZ2h0fSAke2l0YWxpY30ke2ZvbnRTaXplfXB4JHtsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIn0gJyR7Zm9udEZhbWlseX0nYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KG5vZGUuZm9udE5hbWUpO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBub2RlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChub2RlKTtcclxuICAgIGNvbnN0IHNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9KTtcclxuICAgIGlmIChub2RlLnRleHRTdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9jID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUudGV4dFN0eWxlSWQudG9TdHJpbmcoKSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYGZvbnQ6IHZhcigtLSR7c3R5bGVOYW1lfSwgJHtzaG9ydGhhbmR9KTtgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBmb250OiAke3Nob3J0aGFuZH07YDtcclxufVxyXG4iLCIvKlxyXG5UaGlzIGZpbGUgdHJpZXMgdG8gY29udmVydCBmaWdtYSBpbnRvIHRhaWx3aW5kLlxyXG5JdCB0cmllcyB0byBpbnRlcnByZXQgdGhlIGNzcyBhbHJlYWR5IGdlbmVyYXRlZCBmcm9tIHRoaXMgcGx1Z2luIGFzIHRhaWx3aW5kIGNsYXNzZXMuXHJcblRoaXMgd2lsbCBuZXZlciB3b3JrIHBlcmZlY3RseSBidXQgbWF5IHByb3ZpZGUgYSBzdGFydGluZyBwb2ludCBmb3IgZGV2ZWxvcG1lbnQuXHJcbiovXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgY3JlYXRlU1ZHIH0gZnJvbSBcIi4vY29kZVwiO1xyXG5jb25zdCBzaXplc01hcCA9IHtcclxuICAgIFwiMHB4XCI6IDAsXHJcbiAgICBcIjFweFwiOiBcInB4XCIsXHJcbiAgICBcIjJweFwiOiAwLjUsXHJcbiAgICBcIjRweFwiOiAxLFxyXG4gICAgXCI2cHhcIjogMS41LFxyXG4gICAgXCI4cHhcIjogMixcclxuICAgIFwiMTBweFwiOiAyLjUsXHJcbiAgICBcIjEycHhcIjogMyxcclxuICAgIFwiMTRweFwiOiAzLjUsXHJcbiAgICBcIjE2cHhcIjogNCxcclxuICAgIFwiMjBweFwiOiA1LFxyXG4gICAgXCIyNHB4XCI6IDYsXHJcbiAgICAvKiBhbmQgbWFueSBtb3JlICovXHJcbn07XHJcbmNvbnN0IGZsZXhEaXJlY3Rpb25NYXAgPSB7XHJcbiAgICByb3c6IFwicm93XCIsXHJcbiAgICBjb2x1bW46IFwiY29sXCIsXHJcbn07XHJcbmNvbnN0IHR3TWFwID0ge1xyXG4gICAgcGFkZGluZzogc2l6ZXNNYXAsXHJcbiAgICBnYXA6IHNpemVzTWFwLFxyXG4gICAgdG9wOiBzaXplc01hcCxcclxuICAgIGxlZnQ6IHNpemVzTWFwLFxyXG4gICAgXCJmbGV4LWRpcmVjdGlvblwiOiBmbGV4RGlyZWN0aW9uTWFwLFxyXG4gICAgXCJib3JkZXItcmFkaXVzXCI6IHtcclxuICAgICAgICBcIjBweFwiOiBcIm5vbmVcIixcclxuICAgICAgICBcIjJweFwiOiBcInNtXCIsXHJcbiAgICAgICAgXCI0cHhcIjogXCJcIixcclxuICAgICAgICBcIjZweFwiOiBcIm1kXCIsXHJcbiAgICAgICAgXCI4cHhcIjogXCJsZ1wiLFxyXG4gICAgICAgIFwiMTJweFwiOiBcInhsXCIsXHJcbiAgICAgICAgXCIxNnB4XCI6IFwiMnhsXCIsXHJcbiAgICAgICAgXCIyNHB4XCI6IFwiM3hsXCIsXHJcbiAgICAgICAgXCI5OTk5cHhcIjogXCJmdWxsXCIsXHJcbiAgICB9LFxyXG4gICAgYmFja2dyb3VuZDogeyB0cmFuc3BhcmVudDogXCJ0cmFuc3BhcmVudFwiIH0sXHJcbiAgICBcImp1c3RpZnktY29udGVudFwiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiLFxyXG4gICAgfSxcclxuICAgIFwiYWxpZ24taXRlbXNcIjoge1xyXG4gICAgICAgIFwiZmxleC1zdGFydFwiOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgXCJmbGV4LWVuZFwiOiBcImVuZFwiLFxyXG4gICAgICAgIGNlbnRlcjogXCJjZW50ZXJcIixcclxuICAgIH0sXHJcbiAgICBcImFsaWduLXNlbGZcIjoge1xyXG4gICAgICAgIHN0cmV0Y2g6IFwic3RyZXRjaFwiLFxyXG4gICAgfSxcclxuICAgIG92ZXJmbG93OiB7XHJcbiAgICAgICAgaGlkZGVuOiBcImhpZGRlblwiLFxyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHRhaWx3aW5kKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbCA9IHlpZWxkIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcCgodHJlZUVsZW1lbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhY2t5Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5saW5lU3R5bGVzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXN9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzIHNob3VsZCBiZWNvbWUgbW9yZSBEUlkuLi5cclxuICAgICAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgaHRtbCA9IHlpZWxkIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgYCR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzfVwiPlxcbiR7dHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gdGFpbHdpbmRDbGFzc05hbWVzKGNzcywgbm9kZSkge1xyXG4gICAgY29uc3QgY3NzTGluZUJ5TGluZSA9IGNzc1xyXG4gICAgICAgIC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgIC5tYXAoKGUpID0+IGUudHJpbSgpKVxyXG4gICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IFwiXCIpO1xyXG4gICAgY29uc3Qga2V5VmFsdWVQYWlycyA9IGNzc0xpbmVCeUxpbmUubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gbGluZS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgcmV0dXJuIHsga2V5OiBrZXkgPT09IG51bGwgfHwga2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXkudHJpbSgpLCB2YWx1ZTogdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRyaW0oKSB9O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjc3NQcm9wc01hcCA9IHtcclxuICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCJyb3VuZGVkXCIsXHJcbiAgICAgICAgd2lkdGg6IFwid1wiLFxyXG4gICAgICAgIGhlaWdodDogXCJoXCIsXHJcbiAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwidGV4dFwiLFxyXG4gICAgICAgIFwiZmxleC1kaXJlY3Rpb25cIjogXCJmbGV4XCIsXHJcbiAgICAgICAgcG9zaXRpb246IFwiXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJcIixcclxuICAgICAgICBmbGV4OiBcImZsZXhcIixcclxuICAgICAgICBnYXA6IFwiZ2FwXCIsXHJcbiAgICAgICAgdG9wOiBcInRvcFwiLFxyXG4gICAgICAgIGxlZnQ6IFwibGVmdFwiLFxyXG4gICAgICAgIFwianVzdGlmeS1jb250ZW50XCI6IFwianVzdGlmeVwiLFxyXG4gICAgICAgIFwiYWxpZ24taXRlbXNcIjogXCJpdGVtc1wiLFxyXG4gICAgICAgIFwiYWxpZ24tc2VsZlwiOiBcInNlbGZcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJvdmVyZmxvd1wiLFxyXG4gICAgfTtcclxuICAgIC8vIHRoZXNlIHdpbGwgYmUgZ2VuZXJhdGVkIGZyb20gbm9kZSBvciBhcmUgbm90IG5lZWRlZCBhdCBhbGxcclxuICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gW1wicGFkZGluZ1wiLCBcIm1hcmdpblwiLCBcImJveC1zaXppbmdcIl07XHJcbiAgICBjb25zdCBpbmxpbmVTdHlsZXMgPSBbXTtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBrZXlWYWx1ZVBhaXJzLm1hcCgoeyBrZXksIHZhbHVlIH0pID0+IHtcclxuICAgICAgICBpZiAoZXhjbHVkZUxpc3QuaW5jbHVkZXMoa2V5KSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgdHdWYWx1ZSA9IGxvb2tVcFRhaWx3aW5kVmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgdHdLZXkgPSBjc3NQcm9wc01hcFtrZXldO1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlubGluZVN0eWxlcy5wdXNoKGAke2tleX06ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBmb3IgcHJvcHMgbGlrZSBkaXNwbGF5IGV0Yy4gKi9cclxuICAgICAgICBpZiAodHdLZXkgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0d0tleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFt0d0tleSwgdHdWYWx1ZV0uam9pbihcIi1cIik7XHJcbiAgICB9KTtcclxuICAgIC8vIHBhZGRpbmcsIGZvbnRTaXplIGV0Yy5cclxuICAgIGNvbnN0IGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlID0gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lc1xyXG4gICAgICAgICAgICAuY29uY2F0KGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChlKSA9PiBlICE9PSBudWxsKVxyXG4gICAgICAgICAgICAuam9pbihcIiBcIiksXHJcbiAgICAgICAgaW5saW5lU3R5bGVzOiBpbmxpbmVTdHlsZXMuam9pbihcIjsgXCIpLFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBsb29rVXBUYWlsd2luZFZhbHVlKHByb3BLZXksIHZhbHVlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCB2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZSA9IFtcImRpc3BsYXlcIiwgXCJwb3NpdGlvblwiLCBcInRleHQtYWxpZ25cIiwgXCJmbGV4XCJdO1xyXG4gICAgY29uc3QgdHdWYWx1ZSA9IChfYSA9IHR3TWFwW3Byb3BLZXldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdmFsdWVdO1xyXG4gICAgaWYgKHZhbHVlc05vdE5lZWRlZFRvQ2hhbmdlLmluY2x1ZGVzKHByb3BLZXkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBgWyR7dmFsdWV9XWA7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR3VmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0gW107XHJcbiAgICAvKiBwYWRkaW5ncyAqL1xyXG4gICAgaWYgKG5vZGUucGFkZGluZ0xlZnQpIHtcclxuICAgICAgICBjb25zdCBwYWRkaW5ncyA9IFtcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdSaWdodCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nQm90dG9tLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdMZWZ0LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHBhZGRpbmdzLmV2ZXJ5KChwKSA9PiBwID09PSBwYWRkaW5nc1swXSkpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGBwLSR7bG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcGFkZGluZ3NbMF0gKyBcInB4XCIpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gW1widFwiLCBcInJcIiwgXCJiXCIsIFwibFwiXTtcclxuICAgICAgICAgICAgcGFkZGluZ3MuZm9yRWFjaCgocCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGBwJHtkaXJlY3Rpb25baV19LSR7bG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcCArIFwicHhcIil9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHBhZGRpbmdzIGVuZCAqL1xyXG4gICAgcmV0dXJuIGNsYXNzTmFtZXM7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9