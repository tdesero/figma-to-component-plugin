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
                        return `<div class="${treeElement.name}">\n${treeElement.characters
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
            html = yield createSVG(tree.originalNode, tree.name);
        }
        else {
            html += `<div class="${tree.name}">\n${tree.characters ? tree.characters.replaceAll("\n", "<br />") : ""} ${yield theChildren(tree.children)}\n</div>`;
        }
        return html;
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2dldFN0eWxlcy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9wcm9wc0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvdGFpbHdpbmQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBib3JkZXJQcm9wLCBkaXNwbGF5UHJvcCwgcGFkZGluZ1Byb3AsIHRyYW5zZm9ybXMsIGJvcmRlclJhZGl1cywgZmlsbENvbG9yLCBib3hTaGFkb3csIGRpbWVuc2lvbnMsIHBvc2l0aW9uLCBvdmVyZmxvdywgb3BhY2l0eSwgZm9udFByb3AsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgbWFrZVNhZmVGb3JDU1MgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0U3R5bGVzIH0gZnJvbSBcIi4vZ2V0U3R5bGVzXCI7XHJcbi8qIEJldGEgKi9cclxuaW1wb3J0IHsgdGFpbHdpbmQgfSBmcm9tIFwiLi90YWlsd2luZFwiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zb2xlLmxvZyhcIm5vZGVcIiwgbm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBsZXQgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICBjb25zdCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDAgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIENvbXBvbmVudFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZyYW1lID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29tcG9uZW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGZyYW1lLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhmcmFtZSksXHJcbiAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogZnJhbWUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBmcmFtZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgIG9yaWdpbmFsTm9kZTogZnJhbWUsXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YCxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZUNoaWxkcmVuID09PSBudWxsIHx8IHRyZWVDaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJlZUNoaWxkcmVuLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbihub2RlLmNoaWxkcmVuLCBuZXdFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4oZnJhbWUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7dHJlZUVsZW1lbnQubmFtZX0geyR7dHJlZUVsZW1lbnQuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbCA9IHlpZWxkIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcCgodHJlZUVsZW1lbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzIHNob3VsZCBiZWNvbWUgbW9yZSBEUlkuLi5cclxuICAgICAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgaHRtbCA9IHlpZWxkIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RyZWUubmFtZX1cIj5cXG4ke3RyZWUuY2hhcmFjdGVycyA/IHRyZWUuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHJldHVybiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDAgJiZcclxuICAgICAgICAoKF9iID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoKG4pID0+IG4udHlwZSA9PT0gXCJWRUNUT1JcIikubGVuZ3RoKSA9PT1cclxuICAgICAgICAgICAgKChfYyA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWRyhub2RlLCBjbGFzc05hbWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc3ZnID0geWllbGQgbm9kZVxyXG4gICAgICAgICAgICAuZXhwb3J0QXN5bmMoeyBmb3JtYXQ6IFwiU1ZHXCIsIHVzZUFic29sdXRlQm91bmRzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IFxyXG4gICAgICAgIC8vIFVpbnQ4QXJyYXkgdG8gc3RyaW5nIGFuZCBpbmplY3QgY2xhc3NuYW1lXHJcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZVxyXG4gICAgICAgICAgICAuYXBwbHkobnVsbCwgcmVzKVxyXG4gICAgICAgICAgICAucmVwbGFjZShcIjxzdmcgXCIsIGA8c3ZnIGNsYXNzPVwiJHtjbGFzc05hbWV9XCIgYCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG4gICAgICAgIHJldHVybiBzdmc7XHJcbiAgICB9KTtcclxufVxyXG5maWdtYS5wYXJhbWV0ZXJzLm9uKFwiaW5wdXRcIiwgKHsgcGFyYW1ldGVycywga2V5LCBxdWVyeSwgcmVzdWx0IH0pID0+IHtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSBcImZyYW1ld29ya1wiOlxyXG4gICAgICAgICAgICBjb25zdCBmcmFtZXdvcmtzID0gW1wicmVhY3RcIiwgXCJodG1sXCIsIFwidGFpbHdpbmQoYmV0YSlcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogNDAwIH0pO1xyXG4gICAgY29uc3QgY3NzID0gcGFyYW1ldGVycy5mcmFtZXdvcmsgPT09IFwidGFpbHdpbmQoYmV0YSlcIiA/IFwiLVwiIDogcHJpbnRDU1ModHJlZSk7XHJcbiAgICBjb25zdCBodG1sID0gcGFyYW1ldGVycy5mcmFtZXdvcmsgPT09IFwidGFpbHdpbmQoYmV0YSlcIlxyXG4gICAgICAgID8geWllbGQgdGFpbHdpbmQodHJlZSlcclxuICAgICAgICA6IHlpZWxkIHByaW50SFRNTCh0cmVlKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjc3MsXHJcbiAgICAgICAgaHRtbCxcclxuICAgICAgICBmcmFtZXdvcms6IHBhcmFtZXRlcnMuZnJhbWV3b3JrLFxyXG4gICAgICAgIHN0eWxlczogZ2V0U3R5bGVzKGZpZ21hKSxcclxuICAgICAgICBuYW1lOiAoX2MgPSAoX2IgPSAoX2EgPSBmaWdtYS5jdXJyZW50UGFnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbGVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iWzBdKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSxcclxuICAgIH0pO1xyXG59KSk7XHJcbiIsImltcG9ydCB7IGNsZWFuU3R5bGVOYW1lIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGZvbnRTdHlsZUFzT2JqZWN0LCBsaW5lSGVpZ2h0LCBmb250U2hvcnRoYW5kLCBnZXRDb2xvciwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGZpZ21hKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgcGFpbnRTdHlsZXMgPSAoX2EgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHsgbmFtZSwgcGFpbnRzIH0pID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGdldENvbG9yKHBhaW50cyA9PT0gbnVsbCB8fCBwYWludHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaW50c1swXSwgZmFsc2UpLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHRTdHlsZXMgPSAoX2IgPSBmaWdtYS5nZXRMb2NhbFRleHRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm1hcCgoc3R5bGUpID0+IHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IHsgd2VpZ2h0LCBpc0l0YWxpYyB9ID0gZm9udFN0eWxlQXNPYmplY3Qoc3R5bGUuZm9udE5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gKF9hID0gc3R5bGUuZm9udFNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBzdHlsZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KHN0eWxlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShzdHlsZS5uYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIGlzSXRhbGljLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhaW50U3R5bGVzLFxyXG4gICAgICAgIHRleHRTdHlsZXMsXHJcbiAgICB9O1xyXG59XHJcbiIsIi8qIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcclxuICAgIHZhciBoZXggPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG8yNTUoYykge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYyAqIDI1NSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHJnYikge1xyXG4gICAgaWYgKHR5cGVvZiByZ2IgIT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgeyByLCBnLCBiLCBhIH0gPSByZ2I7XHJcbiAgICBpZiAoIWEpIHtcclxuICAgICAgICByZXR1cm4gXCIjXCIgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYmFDb2xvcihvYmosIGEpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInJnYiBjb2xvciBtdXN0IGJlIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IG9iajtcclxuICAgIHJldHVybiBgcmdiYSgke2NvbXBvbmVudFRvMjU1KHIpfSwgJHtjb21wb25lbnRUbzI1NShnKX0sICR7Y29tcG9uZW50VG8yNTUoYil9LCAke2EudG9GaXhlZCgyKX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JBc0hleE9yUmdiYShmaWxsKSB7XHJcbiAgICBpZiAoIWZpbGwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiY29sb3JBc0hleE9yUmdiYSB3YXMgY2FsbGVkIHdpdGhvdXQgZmlsbCBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGwub3BhY2l0eSAmJiBmaWxsLm9wYWNpdHkgPCAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHJnYmFDb2xvcihmaWxsLmNvbG9yLCBmaWxsLm9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHJnYlRvSGV4KGZpbGwuY29sb3IpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xyXG4gICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVNhZmVGb3JDU1MobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvW15hLXowLTldL2csIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgaWYgKGMgPT0gMzIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIi1cIjtcclxuICAgICAgICBpZiAoYyA+PSA2NSAmJiBjIDw9IDkwKVxyXG4gICAgICAgICAgICByZXR1cm4gcy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhblN0eWxlTmFtZShuYW1lKSB7XHJcbiAgICAvL2NvbnN0IG5hbWVBcnIgPSBuYW1lLnNwbGl0KFwiL1wiKTtcclxuICAgIC8vcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWVBcnJbbmFtZUFyci5sZW5ndGggLSAxXS50cmltKCkpO1xyXG4gICAgaWYgKCFuYW1lKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhbGwgcmVsZXZhbnQgdHJhbnNmb3JtYXRpb24gaW5mb3JtYXRpb24gZnJvbSBhIChmaWdtYSkgdHJhbnNmb3JtIG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtYXRyaXggPSB7XHJcbiAgICAgICAgYTogbVswXSxcclxuICAgICAgICBiOiBtWzFdLFxyXG4gICAgICAgIGM6IG1bMl0sXHJcbiAgICAgICAgZDogbVszXSxcclxuICAgICAgICBlOiBtWzRdLFxyXG4gICAgICAgIGY6IG1bNV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU1hdHJpeDJEVzMobWF0cml4KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYW5nbGU6IHRyYW5zZm9ybXMucm90YXRlWixcclxuICAgICAgICBzY2FsZVg6IHRyYW5zZm9ybXMuc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogdHJhbnNmb3Jtcy5zY2FsZVksXHJcbiAgICAgICAgdHJhbnNsYXRlWDogbVs0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxyXG4gICAgICAgIHN2Z01hdHJpeDogbS5qb2luKFwiIFwiKSxcclxuICAgICAgICBzdmdNYXRyaXhXaXRob3V0VHJhbnNsYXRlOiBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV1dLmpvaW4oXCIgXCIpLFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBkZWNvbXBvc2VNYXRyaXgyRFczKG0pIHtcclxuICAgIHZhciByb3cweCA9IG0uYTtcclxuICAgIHZhciByb3cweSA9IG0uYjtcclxuICAgIHZhciByb3cxeCA9IG0uYztcclxuICAgIHZhciByb3cxeSA9IG0uZDtcclxuICAgIHZhciBzY2FsZVggPSBNYXRoLnNxcnQocm93MHggKiByb3cweCArIHJvdzB5ICogcm93MHkpO1xyXG4gICAgdmFyIHNjYWxlWSA9IE1hdGguc3FydChyb3cxeCAqIHJvdzF4ICsgcm93MXkgKiByb3cxeSk7XHJcbiAgICAvLyBJZiBkZXRlcm1pbmFudCBpcyBuZWdhdGl2ZSwgb25lIGF4aXMgd2FzIGZsaXBwZWQuXHJcbiAgICB2YXIgZGV0ZXJtaW5hbnQgPSByb3cweCAqIHJvdzF5IC0gcm93MHkgKiByb3cxeDtcclxuICAgIGlmIChkZXRlcm1pbmFudCA8IDApXHJcbiAgICAgICAgaWYgKHJvdzB4IDwgcm93MXkpXHJcbiAgICAgICAgICAgIC8vIEZsaXAgYXhpcyB3aXRoIG1pbmltdW0gdW5pdCB2ZWN0b3IgZG90IHByb2R1Y3QuXHJcbiAgICAgICAgICAgIHNjYWxlWCA9IC1zY2FsZVg7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzY2FsZVkgPSAtc2NhbGVZO1xyXG4gICAgLy8gUmVub3JtYWxpemUgbWF0cml4IHRvIHJlbW92ZSBzY2FsZS5cclxuICAgIGlmIChzY2FsZVgpIHtcclxuICAgICAgICByb3cweCAqPSAxIC8gc2NhbGVYO1xyXG4gICAgICAgIHJvdzB5ICo9IDEgLyBzY2FsZVg7XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGVZKSB7XHJcbiAgICAgICAgcm93MXggKj0gMSAvIHNjYWxlWTtcclxuICAgICAgICByb3cxeSAqPSAxIC8gc2NhbGVZO1xyXG4gICAgfVxyXG4gICAgLy8gQ29tcHV0ZSByb3RhdGlvbiBhbmQgcmVub3JtYWxpemUgbWF0cml4LlxyXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihyb3cweSwgcm93MHgpO1xyXG4gICAgaWYgKGFuZ2xlKSB7XHJcbiAgICAgICAgLy8gUm90YXRlKC1hbmdsZSkgPSBbY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSwgLXNpbihhbmdsZSksIGNvcyhhbmdsZSldXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgPSBbcm93MHgsIC1yb3cweSwgcm93MHksIHJvdzB4XVxyXG4gICAgICAgIC8vIFRoYW5rcyB0byB0aGUgbm9ybWFsaXphdGlvbiBhYm92ZS5cclxuICAgICAgICB2YXIgc24gPSAtcm93MHk7XHJcbiAgICAgICAgdmFyIGNzID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMSA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTIgPSByb3cweTtcclxuICAgICAgICB2YXIgbTIxID0gcm93MXg7XHJcbiAgICAgICAgdmFyIG0yMiA9IHJvdzF5O1xyXG4gICAgICAgIHJvdzB4ID0gY3MgKiBtMTEgKyBzbiAqIG0yMTtcclxuICAgICAgICByb3cweSA9IGNzICogbTEyICsgc24gKiBtMjI7XHJcbiAgICAgICAgcm93MXggPSAtc24gKiBtMTEgKyBjcyAqIG0yMTtcclxuICAgICAgICByb3cxeSA9IC1zbiAqIG0xMiArIGNzICogbTIyO1xyXG4gICAgfVxyXG4gICAgbTExID0gcm93MHg7XHJcbiAgICBtMTIgPSByb3cweTtcclxuICAgIG0yMSA9IHJvdzF4O1xyXG4gICAgbTIyID0gcm93MXk7XHJcbiAgICAvLyBDb252ZXJ0IGludG8gZGVncmVlcyBiZWNhdXNlIG91ciByb3RhdGlvbiBmdW5jdGlvbnMgZXhwZWN0IGl0LlxyXG4gICAgYW5nbGUgPSBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcclxuICAgIC8vIFRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycyBhcmUgdGhlbiB0aGV0YSxcclxuICAgIC8vIHN4LCBzeSwgcGhpLFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2xhdGVYOiBtLmUsXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbS5mLFxyXG4gICAgICAgIHJvdGF0ZVo6IGFuZ2xlLFxyXG4gICAgICAgIHNjYWxlWDogc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogc2NhbGVZLFxyXG4gICAgICAgIG1hdHJpeDogW20xMSwgbTEyLCBtMjEsIG0yMiwgMCwgMF0sXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IHJnYlRvSGV4LCByZ2JhQ29sb3IsIGdldFRyYW5zZm9ybXMsIGNsZWFuU3R5bGVOYW1lIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICghbm9kZS5zdHJva2VzIHx8ICFub2RlLnN0cm9rZVdlaWdodCB8fCBub2RlLnN0cm9rZXMubGVuZ3RoIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICgoKF9iID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50eXBlKSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICBib3JkZXItd2lkdGg6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25JdGVtc01hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBjb25zdCBqdXN0aWZ5Q29udGVudE1hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiIHx8XHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgKz0gbGF5b3V0QWxpZ24gKyBmbGV4U2hyaW5rR3JvdztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRQcm9wcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGltZW5zaW9ucyhub2RlKSB7XHJcbiAgICAvKiBOT1RFOiBUaGUgT3JkZXIgb2YgdGhlc2UgaWYgc3RhdGVtZW50cyBpcyBpbXBvcnRhbnQhICovXHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xyXG4gICAgbGV0IGhlaWdodCA9IFwiXCI7XHJcbiAgICBsZXQgd2lkdGggPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICghbm9kZS5sYXlvdXRNb2RlIHx8IG5vZGUubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSAoKF9hID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJIRUlHSFRcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9ICgoX2IgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKS5pbmNsdWRlcyhcIldJRFRIXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKChfZCA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5ob3Jpem9udGFsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHx8XHJcbiAgICAgICAgKChfZSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS52ZXJ0aWNhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgaGVpZ2h0OiAke2hlaWdodH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgb3BhY2l0eTogJHtub2RlLm9wYWNpdHl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xyXG4gICAgbGV0IGNvb3JkID0gXCJcIjtcclxuICAgIGZ1bmN0aW9uIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmluZEFic29sdXRlUGFyZW50KG5vZGUucGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUucGFyZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUuaWQgIT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgIC8vIFN1cGVyIHVnbHkgYnV0IHdvcmtzIGZvciBub3cuLi5cclxuICAgICAgICBpZiAoKChfYSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ob3Jpem9udGFsKSA9PT0gXCJNQVhcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgcmlnaHQ6ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLndpZHRoIC0gbm9kZS53aWR0aCAtIG5vZGUueH1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoKF9iID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhvcml6b250YWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgcmlnaHQ6ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLndpZHRoIC0gbm9kZS53aWR0aCAtIG5vZGUueH1weDsgbGVmdDogJHtub2RlLnh9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfYyA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5ob3Jpem9udGFsKSA9PT0gXCJDRU5URVJcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgbGVmdDogY2FsYyg1MCUgLSAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAvIDIgLSBub2RlLnh9cHgpO2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgbGVmdDogJHtub2RlLnh9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCgoX2QgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudmVydGljYWwpID09PSBcIk1BWFwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBib3R0b206ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCgoX2UgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudmVydGljYWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgYm90dG9tOiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueX1weDsgdG9wOiAke25vZGUueX1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoKF9mID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnZlcnRpY2FsKSA9PT0gXCJDRU5URVJcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgdG9wOiBjYWxjKDUwJSAtICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAvIDIgLSBub2RlLnl9cHgpO2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgdG9wOiAke25vZGUueX1weDtgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHBvc2l0aW9uRnJvbVBhcmVudCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpYztcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZWxhdGl2ZTtcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke25vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiTk9ORVwiIHx8ICFub2RlLnBhcmVudC5sYXlvdXRNb2RlXHJcbiAgICAgICAgICAgID8gYGFic29sdXRlOyAke2Nvb3JkfWBcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlO1wifWA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgcG9zaXRpb246ICR7cG9zaXRpb25Gcm9tUGFyZW50KG5vZGUpfVxyXG4gICAgYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8IG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSA/IHdlaWdodE1hcFt3ZWlnaHRdIDogXCI0MDBcIixcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy9hdG0gb25seSBvbmUgZmlsbCBpcyBzdXBwb3J0ZWRcclxuICAgIGNvbnN0IGZpbGwgPSAoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3IoZmlsbCwgbm9kZS5maWxsU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUucm90YXRpb24gJiYgbm9kZS50eXBlICE9PSBcIkdST1VQXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgke25vZGUucm90YXRpb24gKiAtMX1kZWcpO1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdyYWRpZW50TGluZWFyKGZpbGwpIHtcclxuICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gZmlsbDtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc29sZS5sb2coZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICBjb25zdCBncmFkaWVudE1hcCA9IGdyYWRpZW50U3RvcHMubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgbGluZWFyLWdyYWRpZW50KCR7dHJhbnNmb3Jtcy5hbmdsZSArIDkwfWRlZywgJHtncmFkaWVudE1hcC5qb2luKFwiLFwiKX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIGlmICghbm9kZS5jb3JuZXJSYWRpdXMgJiYgIW5vZGUudG9wTGVmdFJhZGl1cylcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgYm9yZGVyLXJhZGl1czogJHt0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBgJHtub2RlLnRvcExlZnRSYWRpdXN9cHggJHtub2RlLnRvcFJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21SaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tTGVmdFJhZGl1c31weGB9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKHN0cm9rZSwgbm9kZS5zdHJva2VTdHlsZUlkKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sb3IoZmlsbE9yQ29sb3IsIHN0eWxlSWQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghZmlsbE9yQ29sb3IpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFmaWxsT3JDb2xvci52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsT3JDb2xvci50eXBlID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGdyYWRpZW50TGluZWFyKGZpbGxPckNvbG9yKTtcclxuICAgIH1cclxuICAgIGlmIChzdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3N0eWxlTmFtZX0sICR7Y29sb3J9KWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGluZUhlaWdodChub2RlT3JTdHlsZSkge1xyXG4gICAgaWYgKCFub2RlT3JTdHlsZS5saW5lSGVpZ2h0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKG5vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdCA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVuaXQgPSB1bml0TWFwW25vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdF07XHJcbiAgICByZXR1cm4gYCR7bm9kZU9yU3R5bGUubGluZUhlaWdodC52YWx1ZX0ke3VuaXR9YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFNob3J0aGFuZCh7IGxpbmVIZWlnaHQsIGZvbnRTaXplLCB3ZWlnaHQsIGZvbnRGYW1pbHksIGlzSXRhbGljLCB9KSB7XHJcbiAgICBjb25zdCBpdGFsaWMgPSBpc0l0YWxpYyA/IFwiaXRhbGljIFwiIDogXCJcIjtcclxuICAgIHJldHVybiBgJHt3ZWlnaHR9ICR7aXRhbGljfSR7Zm9udFNpemV9cHgke2xpbmVIZWlnaHQgIT09IFwiXCIgPyBcIi9cIiArIGxpbmVIZWlnaHQgOiBcIlwifSAnJHtmb250RmFtaWx5fSdgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250UHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnN0IHsgd2VpZ2h0LCBpc0l0YWxpYyB9ID0gZm9udFN0eWxlQXNPYmplY3Qobm9kZS5mb250TmFtZSk7XHJcbiAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IG5vZGUuZm9udFNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KG5vZGUpO1xyXG4gICAgY29uc3Qgc2hvcnRoYW5kID0gZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgZm9udEZhbWlseSxcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH0pO1xyXG4gICAgaWYgKG5vZGUudGV4dFN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2MgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS50ZXh0U3R5bGVJZC50b1N0cmluZygpKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBgZm9udDogdmFyKC0tJHtzdHlsZU5hbWV9LCAke3Nob3J0aGFuZH0pO2A7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGZvbnQ6ICR7c2hvcnRoYW5kfTtgO1xyXG59XHJcbiIsIi8qXHJcblRoaXMgZmlsZSB0cmllcyB0byBjb252ZXJ0IGZpZ21hIGludG8gdGFpbHdpbmQuXHJcbkl0IHRyaWVzIHRvIGludGVycHJldCB0aGUgY3NzIGFscmVhZHkgZ2VuZXJhdGVkIGZyb20gdGhpcyBwbHVnaW4gYXMgdGFpbHdpbmQgY2xhc3Nlcy5cclxuVGhpcyB3aWxsIG5ldmVyIHdvcmsgcGVyZmVjdGx5IGJ1dCBtYXkgcHJvdmlkZSBhIHN0YXJ0aW5nIHBvaW50IGZvciBkZXZlbG9wbWVudC5cclxuKi9cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBjcmVhdGVTVkcgfSBmcm9tIFwiLi9jb2RlXCI7XHJcbmNvbnN0IHNpemVzTWFwID0ge1xyXG4gICAgXCIwcHhcIjogMCxcclxuICAgIFwiMXB4XCI6IFwicHhcIixcclxuICAgIFwiMnB4XCI6IDAuNSxcclxuICAgIFwiNHB4XCI6IDEsXHJcbiAgICBcIjZweFwiOiAxLjUsXHJcbiAgICBcIjhweFwiOiAyLFxyXG4gICAgXCIxMHB4XCI6IDIuNSxcclxuICAgIFwiMTJweFwiOiAzLFxyXG4gICAgXCIxNHB4XCI6IDMuNSxcclxuICAgIFwiMTZweFwiOiA0LFxyXG4gICAgXCIyMHB4XCI6IDUsXHJcbiAgICBcIjI0cHhcIjogNixcclxuICAgIC8qIGFuZCBtYW55IG1vcmUgKi9cclxufTtcclxuY29uc3QgZmxleERpcmVjdGlvbk1hcCA9IHtcclxuICAgIHJvdzogXCJyb3dcIixcclxuICAgIGNvbHVtbjogXCJjb2xcIixcclxufTtcclxuY29uc3QgdHdNYXAgPSB7XHJcbiAgICBwYWRkaW5nOiBzaXplc01hcCxcclxuICAgIGdhcDogc2l6ZXNNYXAsXHJcbiAgICB0b3A6IHNpemVzTWFwLFxyXG4gICAgbGVmdDogc2l6ZXNNYXAsXHJcbiAgICBcImZsZXgtZGlyZWN0aW9uXCI6IGZsZXhEaXJlY3Rpb25NYXAsXHJcbiAgICBcImJvcmRlci1yYWRpdXNcIjoge1xyXG4gICAgICAgIFwiMHB4XCI6IFwibm9uZVwiLFxyXG4gICAgICAgIFwiMnB4XCI6IFwic21cIixcclxuICAgICAgICBcIjRweFwiOiBcIlwiLFxyXG4gICAgICAgIFwiNnB4XCI6IFwibWRcIixcclxuICAgICAgICBcIjhweFwiOiBcImxnXCIsXHJcbiAgICAgICAgXCIxMnB4XCI6IFwieGxcIixcclxuICAgICAgICBcIjE2cHhcIjogXCIyeGxcIixcclxuICAgICAgICBcIjI0cHhcIjogXCIzeGxcIixcclxuICAgICAgICBcIjk5OTlweFwiOiBcImZ1bGxcIixcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7IHRyYW5zcGFyZW50OiBcInRyYW5zcGFyZW50XCIgfSxcclxuICAgIFwianVzdGlmeS1jb250ZW50XCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1pdGVtc1wiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiLFxyXG4gICAgfSxcclxuICAgIFwiYWxpZ24tc2VsZlwiOiB7XHJcbiAgICAgICAgc3RyZXRjaDogXCJzdHJldGNoXCIsXHJcbiAgICB9LFxyXG4gICAgb3ZlcmZsb3c6IHtcclxuICAgICAgICBoaWRkZW46IFwiaGlkZGVuXCIsXHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gdGFpbHdpbmQodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsID0geWllbGQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKCh0cmVlRWxlbWVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFja3kuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlc31cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlY29tZSBtb3JlIERSWS4uLlxyXG4gICAgICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICBodG1sID0geWllbGQgY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCBgJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiB0YWlsd2luZENsYXNzTmFtZXMoY3NzLCBub2RlKSB7XHJcbiAgICBjb25zdCBjc3NMaW5lQnlMaW5lID0gY3NzXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgLm1hcCgoZSkgPT4gZS50cmltKCkpXHJcbiAgICAgICAgLmZpbHRlcigoZSkgPT4gZSAhPT0gXCJcIik7XHJcbiAgICBjb25zdCBrZXlWYWx1ZVBhaXJzID0gY3NzTGluZUJ5TGluZS5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtleS50cmltKCksIHZhbHVlOiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudHJpbSgpIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNzc1Byb3BzTWFwID0ge1xyXG4gICAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcInJvdW5kZWRcIixcclxuICAgICAgICB3aWR0aDogXCJ3XCIsXHJcbiAgICAgICAgaGVpZ2h0OiBcImhcIixcclxuICAgICAgICBcInRleHQtYWxpZ25cIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJmbGV4LWRpcmVjdGlvblwiOiBcImZsZXhcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJcIixcclxuICAgICAgICBkaXNwbGF5OiBcIlwiLFxyXG4gICAgICAgIGZsZXg6IFwiZmxleFwiLFxyXG4gICAgICAgIGdhcDogXCJnYXBcIixcclxuICAgICAgICB0b3A6IFwidG9wXCIsXHJcbiAgICAgICAgbGVmdDogXCJsZWZ0XCIsXHJcbiAgICAgICAgXCJqdXN0aWZ5LWNvbnRlbnRcIjogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgXCJhbGlnbi1pdGVtc1wiOiBcIml0ZW1zXCIsXHJcbiAgICAgICAgXCJhbGlnbi1zZWxmXCI6IFwic2VsZlwiLFxyXG4gICAgICAgIG92ZXJmbG93OiBcIm92ZXJmbG93XCIsXHJcbiAgICB9O1xyXG4gICAgLy8gdGhlc2Ugd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSBub2RlIG9yIGFyZSBub3QgbmVlZGVkIGF0IGFsbFxyXG4gICAgY29uc3QgZXhjbHVkZUxpc3QgPSBbXCJwYWRkaW5nXCIsIFwibWFyZ2luXCIsIFwiYm94LXNpemluZ1wiXTtcclxuICAgIGNvbnN0IGlubGluZVN0eWxlcyA9IFtdO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGtleVZhbHVlUGFpcnMubWFwKCh7IGtleSwgdmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIGlmIChleGNsdWRlTGlzdC5pbmNsdWRlcyhrZXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCB0d1ZhbHVlID0gbG9va1VwVGFpbHdpbmRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICBjb25zdCB0d0tleSA9IGNzc1Byb3BzTWFwW2tleV07XHJcbiAgICAgICAgaWYgKHR3S2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5saW5lU3R5bGVzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3R3S2V5LCB0d1ZhbHVlXS5qb2luKFwiLVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gcGFkZGluZywgZm9udFNpemUgZXRjLlxyXG4gICAgY29uc3QgY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUgPSBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzXHJcbiAgICAgICAgICAgIC5jb25jYXQoY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IG51bGwpXHJcbiAgICAgICAgICAgIC5qb2luKFwiIFwiKSxcclxuICAgICAgICBpbmxpbmVTdHlsZXM6IGlubGluZVN0eWxlcy5qb2luKFwiOyBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGxvb2tVcFRhaWx3aW5kVmFsdWUocHJvcEtleSwgdmFsdWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHZhbHVlc05vdE5lZWRlZFRvQ2hhbmdlID0gW1wiZGlzcGxheVwiLCBcInBvc2l0aW9uXCIsIFwidGV4dC1hbGlnblwiLCBcImZsZXhcIl07XHJcbiAgICBjb25zdCB0d1ZhbHVlID0gKF9hID0gdHdNYXBbcHJvcEtleV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt2YWx1ZV07XHJcbiAgICBpZiAodmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UuaW5jbHVkZXMocHJvcEtleSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGBbJHt2YWx1ZX1dYDtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHdWYWx1ZTtcclxufVxyXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbXTtcclxuICAgIC8qIHBhZGRpbmdzICovXHJcbiAgICBpZiAobm9kZS5wYWRkaW5nTGVmdCkge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmdzID0gW1xyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdCb3R0b20sXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0xlZnQsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAocGFkZGluZ3MuZXZlcnkoKHApID0+IHAgPT09IHBhZGRpbmdzWzBdKSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAtJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwYWRkaW5nc1swXSArIFwicHhcIil9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbXCJ0XCIsIFwiclwiLCBcImJcIiwgXCJsXCJdO1xyXG4gICAgICAgICAgICBwYWRkaW5ncy5mb3JFYWNoKChwLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAke2RpcmVjdGlvbltpXX0tJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwICsgXCJweFwiKX1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogcGFkZGluZ3MgZW5kICovXHJcbiAgICByZXR1cm4gY2xhc3NOYW1lcztcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=