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
    /* NOTE: The Order of these if statements is important! */
    var _a, _b, _c;
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
    if (node.parent.layoutMode === "HORIZONTAL" &&
        node.layoutAlign === "STRETCH") {
        height = "auto";
    }
    if ((!node.children || ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) === 0) && node.type !== "TEXT") {
        height = node.height + "px";
        width = node.width + "px";
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
        if (node.type === "GROUP") {
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
It tries to interpret the css already generated from this plugin into tailwind classes.
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
    console.log(cssLineByLine);
    const keyValuePairs = cssLineByLine.map((line) => {
        const [key, value] = line.split(":");
        return { key: key === null || key === void 0 ? void 0 : key.trim(), value: value === null || value === void 0 ? void 0 : value.trim() };
    });
    const cssPropsMap = {
        border: "border",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtREFBbUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsYUFBYSxHQUFHLHlDQUF5QztBQUM3RixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvZ2V0U3R5bGVzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL3Byb3BzSGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy90YWlsd2luZC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGJvcmRlclByb3AsIGRpc3BsYXlQcm9wLCBwYWRkaW5nUHJvcCwgdHJhbnNmb3JtcywgYm9yZGVyUmFkaXVzLCBmaWxsQ29sb3IsIGJveFNoYWRvdywgZGltZW5zaW9ucywgcG9zaXRpb24sIG92ZXJmbG93LCBvcGFjaXR5LCBmb250UHJvcCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBtYWtlU2FmZUZvckNTUyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRTdHlsZXMgfSBmcm9tIFwiLi9nZXRTdHlsZXNcIjtcclxuLyogQmV0YSAqL1xyXG5pbXBvcnQgeyB0YWlsd2luZCB9IGZyb20gXCIuL3RhaWx3aW5kXCI7XHJcbmZ1bmN0aW9uIG5vZGVDU1Mobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnNvbGUubG9nKFwibm9kZVwiLCBub2RlKTtcclxuICAgIGlmICgoKF9hID0gbm9kZS50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSkgPT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgY29sb3I6ICR7ZmlsbENvbG9yKG5vZGUpfTtcclxuICAgICAgdGV4dC1hbGlnbjogJHsoX2IgPSBub2RlLnRleHRBbGlnbkhvcml6b250YWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpfTtcclxuICAgICAgJHtmb250UHJvcChub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxyXG4gICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgIGJhY2tncm91bmQ6ICR7ZmlsbENvbG9yKG5vZGUpfTtcclxuICAgICAgJHtib3JkZXJSYWRpdXMobm9kZSl9XHJcbiAgICAgICR7Ym9yZGVyUHJvcChub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3BhZGRpbmdQcm9wKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgICR7cG9zaXRpb24obm9kZSl9XHJcbiAgICAgICR7Ym94U2hhZG93KG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgICAgJHtvdmVyZmxvdyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIGNvbnN0IGFsbE5hbWVzID0gW107XHJcbiAgICBmdW5jdGlvbiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiA9IDApIHtcclxuICAgICAgICBjb25zdCBzdWZmaXggPSBuID4gMCA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxsTmFtZXMucHVzaChjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgc3VmZml4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTm90aGluZyBzZWxlY3RlZFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBvbmx5IDEgQ29tcG9uZW50XCIsIHsgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZnJhbWUgPSBzZWxlY3Rpb25bMF07XHJcbiAgICBjb21wb25lbnROYW1lID0gbWFrZVNhZmVGb3JDU1MoZnJhbWUubmFtZSk7XHJcbiAgICBjb25zdCB0cmVlID0ge1xyXG4gICAgICAgIG5hbWU6IGNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgY3NzOiBub2RlQ1NTKGZyYW1lKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICB0eXBlOiBmcmFtZS50eXBlLFxyXG4gICAgICAgIGNoYXJhY3RlcnM6IGZyYW1lLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBmcmFtZSxcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYCR7Y29tcG9uZW50TmFtZX1fXyR7dW5pcXVlTmFtZShtYWtlU2FmZUZvckNTUyhub2RlLm5hbWUpKX1gLFxyXG4gICAgICAgICAgICAgICAgY3NzOiBub2RlQ1NTKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6IGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczogbm9kZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiBub2RlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlQ2hpbGRyZW4gPT09IG51bGwgfHwgdHJlZUNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlQ2hpbGRyZW4ucHVzaChuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKG5vZGUuY2hpbGRyZW4sIG5ld0VsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICB0aGVDaGlsZHJlbihmcmFtZS5jaGlsZHJlbiwgdHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5jb25zdCB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICBsZXQgY3NzID0gXCJcIjtcclxuICAgIGNzcyArPSBgLiR7dHJlZS5uYW1lfSB7JHt0cmVlLmNzc319XFxuYDtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgodHJlZUVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY3NzICs9IGAuJHt0cmVlRWxlbWVudC5uYW1lfSB7JHt0cmVlRWxlbWVudC5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzcztcclxufVxyXG5mdW5jdGlvbiBwcmludEhUTUwodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsID0geWllbGQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKCh0cmVlRWxlbWVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dHJlZUVsZW1lbnQubmFtZX1cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlY29tZSBtb3JlIERSWS4uLlxyXG4gICAgICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICBodG1sID0geWllbGQgY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cIiR7dHJlZS5uYW1lfVwiPlxcbiR7dHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzdmcgPSB5aWVsZCBub2RlXHJcbiAgICAgICAgICAgIC5leHBvcnRBc3luYyh7IGZvcm1hdDogXCJTVkdcIiwgdXNlQWJzb2x1dGVCb3VuZHM6IHRydWUgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gXHJcbiAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiPHN2ZyBcIiwgYDxzdmcgY2xhc3M9XCIke2NsYXNzTmFtZX1cIiBgKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHN2ZztcclxuICAgIH0pO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIiwgXCJ0YWlsd2luZChiZXRhKVwiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGZyYW1ld29ya3MuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn0pO1xyXG5maWdtYS5vbihcInJ1blwiLCAoeyBjb21tYW5kLCBwYXJhbWV0ZXJzIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiA0MDAgfSk7XHJcbiAgICBjb25zdCBjc3MgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiID8gXCItXCIgOiBwcmludENTUyh0cmVlKTtcclxuICAgIGNvbnN0IGh0bWwgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiXHJcbiAgICAgICAgPyB5aWVsZCB0YWlsd2luZCh0cmVlKVxyXG4gICAgICAgIDogeWllbGQgcHJpbnRIVE1MKHRyZWUpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzcyxcclxuICAgICAgICBodG1sLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBnZXRTdHlsZXMoZmlnbWEpLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pKTtcclxuIiwiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZm9udFN0eWxlQXNPYmplY3QsIGxpbmVIZWlnaHQsIGZvbnRTaG9ydGhhbmQsIGdldENvbG9yLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgoeyBuYW1lLCBwYWludHMgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKG5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0Q29sb3IocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChzdHlsZS5mb250TmFtZSk7XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQoc3R5bGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKHN0eWxlLm5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWMsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlcyxcclxuICAgIH07XHJcbn1cclxuIiwiLyogaGVscGVycyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHJnYjtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIGByZ2JhKCR7Y29tcG9uZW50VG8yNTUocil9LCAke2NvbXBvbmVudFRvMjU1KGcpfSwgJHtjb21wb25lbnRUbzI1NShiKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICBpZiAoIW5hbWUpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCJcIikpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCByZWxldmFudCB0cmFuc2Zvcm1hdGlvbiBpbmZvcm1hdGlvbiBmcm9tIGEgKGZpZ21hKSB0cmFuc2Zvcm0gbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtcyhmbSkge1xyXG4gICAgLy8gYW55dGhpbmcgd3Jvbmcgd2l0aCB0aGUgdHJhbnNmb3Jtcz8gTm90IHN1cmUgaWYgaSBzb3J0ZWQgaXQgcmlnaHQgaGVyZS4uLlxyXG4gICAgLy9jb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG1hdHJpeCA9IHtcclxuICAgICAgICBhOiBtWzBdLFxyXG4gICAgICAgIGI6IG1bMV0sXHJcbiAgICAgICAgYzogbVsyXSxcclxuICAgICAgICBkOiBtWzNdLFxyXG4gICAgICAgIGU6IG1bNF0sXHJcbiAgICAgICAgZjogbVs1XSxcclxuICAgIH07XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZGVjb21wb3NlTWF0cml4MkRXMyhtYXRyaXgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhbmdsZTogdHJhbnNmb3Jtcy5yb3RhdGVaLFxyXG4gICAgICAgIHNjYWxlWDogdHJhbnNmb3Jtcy5zY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiB0cmFuc2Zvcm1zLnNjYWxlWSxcclxuICAgICAgICB0cmFuc2xhdGVYOiBtWzRdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG1bNV0sXHJcbiAgICAgICAgc3ZnTWF0cml4OiBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIHN2Z01hdHJpeFdpdGhvdXRUcmFuc2xhdGU6IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXV0uam9pbihcIiBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGRlY29tcG9zZU1hdHJpeDJEVzMobSkge1xyXG4gICAgdmFyIHJvdzB4ID0gbS5hO1xyXG4gICAgdmFyIHJvdzB5ID0gbS5iO1xyXG4gICAgdmFyIHJvdzF4ID0gbS5jO1xyXG4gICAgdmFyIHJvdzF5ID0gbS5kO1xyXG4gICAgdmFyIHNjYWxlWCA9IE1hdGguc3FydChyb3cweCAqIHJvdzB4ICsgcm93MHkgKiByb3cweSk7XHJcbiAgICB2YXIgc2NhbGVZID0gTWF0aC5zcXJ0KHJvdzF4ICogcm93MXggKyByb3cxeSAqIHJvdzF5KTtcclxuICAgIC8vIElmIGRldGVybWluYW50IGlzIG5lZ2F0aXZlLCBvbmUgYXhpcyB3YXMgZmxpcHBlZC5cclxuICAgIHZhciBkZXRlcm1pbmFudCA9IHJvdzB4ICogcm93MXkgLSByb3cweSAqIHJvdzF4O1xyXG4gICAgaWYgKGRldGVybWluYW50IDwgMClcclxuICAgICAgICBpZiAocm93MHggPCByb3cxeSlcclxuICAgICAgICAgICAgLy8gRmxpcCBheGlzIHdpdGggbWluaW11bSB1bml0IHZlY3RvciBkb3QgcHJvZHVjdC5cclxuICAgICAgICAgICAgc2NhbGVYID0gLXNjYWxlWDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNjYWxlWSA9IC1zY2FsZVk7XHJcbiAgICAvLyBSZW5vcm1hbGl6ZSBtYXRyaXggdG8gcmVtb3ZlIHNjYWxlLlxyXG4gICAgaWYgKHNjYWxlWCkge1xyXG4gICAgICAgIHJvdzB4ICo9IDEgLyBzY2FsZVg7XHJcbiAgICAgICAgcm93MHkgKj0gMSAvIHNjYWxlWDtcclxuICAgIH1cclxuICAgIGlmIChzY2FsZVkpIHtcclxuICAgICAgICByb3cxeCAqPSAxIC8gc2NhbGVZO1xyXG4gICAgICAgIHJvdzF5ICo9IDEgLyBzY2FsZVk7XHJcbiAgICB9XHJcbiAgICAvLyBDb21wdXRlIHJvdGF0aW9uIGFuZCByZW5vcm1hbGl6ZSBtYXRyaXguXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHJvdzB5LCByb3cweCk7XHJcbiAgICBpZiAoYW5nbGUpIHtcclxuICAgICAgICAvLyBSb3RhdGUoLWFuZ2xlKSA9IFtjb3MoYW5nbGUpLCBzaW4oYW5nbGUpLCAtc2luKGFuZ2xlKSwgY29zKGFuZ2xlKV1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICA9IFtyb3cweCwgLXJvdzB5LCByb3cweSwgcm93MHhdXHJcbiAgICAgICAgLy8gVGhhbmtzIHRvIHRoZSBub3JtYWxpemF0aW9uIGFib3ZlLlxyXG4gICAgICAgIHZhciBzbiA9IC1yb3cweTtcclxuICAgICAgICB2YXIgY3MgPSByb3cweDtcclxuICAgICAgICB2YXIgbTExID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMiA9IHJvdzB5O1xyXG4gICAgICAgIHZhciBtMjEgPSByb3cxeDtcclxuICAgICAgICB2YXIgbTIyID0gcm93MXk7XHJcbiAgICAgICAgcm93MHggPSBjcyAqIG0xMSArIHNuICogbTIxO1xyXG4gICAgICAgIHJvdzB5ID0gY3MgKiBtMTIgKyBzbiAqIG0yMjtcclxuICAgICAgICByb3cxeCA9IC1zbiAqIG0xMSArIGNzICogbTIxO1xyXG4gICAgICAgIHJvdzF5ID0gLXNuICogbTEyICsgY3MgKiBtMjI7XHJcbiAgICB9XHJcbiAgICBtMTEgPSByb3cweDtcclxuICAgIG0xMiA9IHJvdzB5O1xyXG4gICAgbTIxID0gcm93MXg7XHJcbiAgICBtMjIgPSByb3cxeTtcclxuICAgIC8vIENvbnZlcnQgaW50byBkZWdyZWVzIGJlY2F1c2Ugb3VyIHJvdGF0aW9uIGZ1bmN0aW9ucyBleHBlY3QgaXQuXHJcbiAgICBhbmdsZSA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xyXG4gICAgLy8gVGhlIHJlcXVlc3RlZCBwYXJhbWV0ZXJzIGFyZSB0aGVuIHRoZXRhLFxyXG4gICAgLy8gc3gsIHN5LCBwaGksXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG0uZSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtLmYsXHJcbiAgICAgICAgcm90YXRlWjogYW5nbGUsXHJcbiAgICAgICAgc2NhbGVYOiBzY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiBzY2FsZVksXHJcbiAgICAgICAgbWF0cml4OiBbbTExLCBtMTIsIG0yMSwgbTIyLCAwLCAwXSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgcmdiVG9IZXgsIHJnYmFDb2xvciwgZ2V0VHJhbnNmb3JtcywgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCFub2RlLnN0cm9rZXMgfHwgIW5vZGUuc3Ryb2tlV2VpZ2h0IHx8IG5vZGUuc3Ryb2tlcy5sZW5ndGggPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCgoX2IgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnR5cGUpID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIGJvcmRlci13aWR0aDogICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25JdGVtc01hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBjb25zdCBqdXN0aWZ5Q29udGVudE1hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgLy8gcG9zaXRpb246ICR7W1wiRlJBTUVcIiwgXCJDT01QT05FTlRcIiwgXCJJTlNUQU5DRVwiXS5pbmNsdWRlcyhub2RlLnR5cGUpID8gJ3JlbGF0aXZlJyA6ICdzdGF0aWMnfTsgLyogZG9udCBnZXQgdGhpcy4uLiAqL1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAke25vZGUuaXRlbVNwYWNpbmd9cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc01hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5Q29udGVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGBcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgLyogTk9URTogVGhlIE9yZGVyIG9mIHRoZXNlIGlmIHN0YXRlbWVudHMgaXMgaW1wb3J0YW50ISAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBsZXQgaGVpZ2h0ID0gXCJcIjtcclxuICAgIGxldCB3aWR0aCA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICB3aWR0aCA9IG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFub2RlLmxheW91dE1vZGUgfHwgbm9kZS5sYXlvdXRNb2RlID09PSBcIk5PTkVcIikge1xyXG4gICAgICAgIGhlaWdodCA9ICgoX2EgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkhFSUdIVFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgaGVpZ2h0OiAke2hlaWdodH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgb3BhY2l0eTogJHtub2RlLm9wYWNpdHl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcclxuICAgIGNvbnN0IGNvb3JkID0gbm9kZS5pZCA9PT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkXHJcbiAgICAgICAgPyBcIlwiXHJcbiAgICAgICAgOiBgbGVmdDogJHtub2RlLnh9cHg7IHRvcDogJHtub2RlLnl9cHhgO1xyXG4gICAgY29uc3QgcG9zaXRpb25Gcm9tUGFyZW50ID0gKG5vZGUpID0+IHtcclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RhdGljXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke25vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiTk9ORVwiIHx8ICFub2RlLnBhcmVudC5sYXlvdXRNb2RlXHJcbiAgICAgICAgICAgID8gYGFic29sdXRlOyAke2Nvb3JkfWBcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlXCJ9YDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBwb3NpdGlvbjogJHtwb3NpdGlvbkZyb21QYXJlbnQobm9kZSl9O1xyXG4gICAgYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8IG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSxcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy9hdG0gb25seSBvbmUgZmlsbCBpcyBzdXBwb3J0ZWRcclxuICAgIGNvbnN0IGZpbGwgPSAoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3IoZmlsbCwgbm9kZS5maWxsU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUucm90YXRpb24gJiYgbm9kZS50eXBlICE9PSBcIkdST1VQXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgke25vZGUucm90YXRpb24gKiAtMX1kZWcpO1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdyYWRpZW50TGluZWFyKGZpbGwpIHtcclxuICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gZmlsbDtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc29sZS5sb2coZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICBjb25zdCBncmFkaWVudE1hcCA9IGdyYWRpZW50U3RvcHMubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgbGluZWFyLWdyYWRpZW50KCR7dHJhbnNmb3Jtcy5hbmdsZSArIDkwfWRlZywgJHtncmFkaWVudE1hcC5qb2luKFwiLFwiKX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIHJldHVybiBgYm9yZGVyLXJhZGl1czogJHt0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBgJHtub2RlLnRvcExlZnRSYWRpdXN9cHggJHtub2RlLnRvcFJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21SaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tTGVmdFJhZGl1c31weGB9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKHN0cm9rZSwgbm9kZS5zdHJva2VTdHlsZUlkKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sb3IoZmlsbE9yQ29sb3IsIHN0eWxlSWQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghZmlsbE9yQ29sb3IpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFmaWxsT3JDb2xvci52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsT3JDb2xvci50eXBlID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGdyYWRpZW50TGluZWFyKGZpbGxPckNvbG9yKTtcclxuICAgIH1cclxuICAgIGlmIChzdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3N0eWxlTmFtZX0sICR7Y29sb3J9KWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGluZUhlaWdodChub2RlT3JTdHlsZSkge1xyXG4gICAgaWYgKCFub2RlT3JTdHlsZS5saW5lSGVpZ2h0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKG5vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdCA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVuaXQgPSB1bml0TWFwW25vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdF07XHJcbiAgICByZXR1cm4gYCR7bm9kZU9yU3R5bGUubGluZUhlaWdodC52YWx1ZX0ke3VuaXR9YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFNob3J0aGFuZCh7IGxpbmVIZWlnaHQsIGZvbnRTaXplLCB3ZWlnaHQsIGZvbnRGYW1pbHksIGlzSXRhbGljLCB9KSB7XHJcbiAgICBjb25zdCBpdGFsaWMgPSBpc0l0YWxpYyA/IFwiaXRhbGljIFwiIDogXCJcIjtcclxuICAgIHJldHVybiBgJHt3ZWlnaHR9ICR7aXRhbGljfSR7Zm9udFNpemV9cHgke2xpbmVIZWlnaHQgIT09IFwiXCIgPyBcIi9cIiArIGxpbmVIZWlnaHQgOiBcIlwifSAnJHtmb250RmFtaWx5fSdgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250UHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnN0IHsgd2VpZ2h0LCBpc0l0YWxpYyB9ID0gZm9udFN0eWxlQXNPYmplY3Qobm9kZS5mb250TmFtZSk7XHJcbiAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IG5vZGUuZm9udFNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KG5vZGUpO1xyXG4gICAgY29uc3Qgc2hvcnRoYW5kID0gZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgZm9udEZhbWlseSxcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH0pO1xyXG4gICAgaWYgKG5vZGUudGV4dFN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2MgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS50ZXh0U3R5bGVJZC50b1N0cmluZygpKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBgZm9udDogdmFyKC0tJHtzdHlsZU5hbWV9LCAke3Nob3J0aGFuZH0pO2A7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGZvbnQ6ICR7c2hvcnRoYW5kfTtgO1xyXG59XHJcbiIsIi8qXHJcblRoaXMgZmlsZSB0cmllcyB0byBjb252ZXJ0IGZpZ21hIGludG8gdGFpbHdpbmQuXHJcbkl0IHRyaWVzIHRvIGludGVycHJldCB0aGUgY3NzIGFscmVhZHkgZ2VuZXJhdGVkIGZyb20gdGhpcyBwbHVnaW4gaW50byB0YWlsd2luZCBjbGFzc2VzLlxyXG5UaGlzIHdpbGwgbmV2ZXIgd29yayBwZXJmZWN0bHkgYnV0IG1heSBwcm92aWRlIGEgc3RhcnRpbmcgcG9pbnQgZm9yIGRldmVsb3BtZW50LlxyXG4qL1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGNyZWF0ZVNWRyB9IGZyb20gXCIuL2NvZGVcIjtcclxuY29uc3Qgc2l6ZXNNYXAgPSB7XHJcbiAgICBcIjBweFwiOiAwLFxyXG4gICAgXCIxcHhcIjogXCJweFwiLFxyXG4gICAgXCIycHhcIjogMC41LFxyXG4gICAgXCI0cHhcIjogMSxcclxuICAgIFwiNnB4XCI6IDEuNSxcclxuICAgIFwiOHB4XCI6IDIsXHJcbiAgICBcIjEwcHhcIjogMi41LFxyXG4gICAgXCIxMnB4XCI6IDMsXHJcbiAgICBcIjE0cHhcIjogMy41LFxyXG4gICAgXCIxNnB4XCI6IDQsXHJcbiAgICBcIjIwcHhcIjogNSxcclxuICAgIFwiMjRweFwiOiA2LFxyXG4gICAgLyogYW5kIG1hbnkgbW9yZSAqL1xyXG59O1xyXG5jb25zdCBmbGV4RGlyZWN0aW9uTWFwID0ge1xyXG4gICAgcm93OiBcInJvd1wiLFxyXG4gICAgY29sdW1uOiBcImNvbFwiLFxyXG59O1xyXG5jb25zdCB0d01hcCA9IHtcclxuICAgIHBhZGRpbmc6IHNpemVzTWFwLFxyXG4gICAgZ2FwOiBzaXplc01hcCxcclxuICAgIHRvcDogc2l6ZXNNYXAsXHJcbiAgICBsZWZ0OiBzaXplc01hcCxcclxuICAgIFwiZmxleC1kaXJlY3Rpb25cIjogZmxleERpcmVjdGlvbk1hcCxcclxuICAgIFwiYm9yZGVyLXJhZGl1c1wiOiB7XHJcbiAgICAgICAgXCIwcHhcIjogXCJub25lXCIsXHJcbiAgICAgICAgXCIycHhcIjogXCJzbVwiLFxyXG4gICAgICAgIFwiNHB4XCI6IFwiXCIsXHJcbiAgICAgICAgXCI2cHhcIjogXCJtZFwiLFxyXG4gICAgICAgIFwiOHB4XCI6IFwibGdcIixcclxuICAgICAgICBcIjEycHhcIjogXCJ4bFwiLFxyXG4gICAgICAgIFwiMTZweFwiOiBcIjJ4bFwiLFxyXG4gICAgICAgIFwiMjRweFwiOiBcIjN4bFwiLFxyXG4gICAgICAgIFwiOTk5OXB4XCI6IFwiZnVsbFwiLFxyXG4gICAgfSxcclxuICAgIGJhY2tncm91bmQ6IHsgdHJhbnNwYXJlbnQ6IFwidHJhbnNwYXJlbnRcIiB9LFxyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gdGFpbHdpbmQodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsID0geWllbGQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKCh0cmVlRWxlbWVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFja3kuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlc31cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlY29tZSBtb3JlIERSWS4uLlxyXG4gICAgICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICBodG1sID0geWllbGQgY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCBgJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiB0YWlsd2luZENsYXNzTmFtZXMoY3NzLCBub2RlKSB7XHJcbiAgICBjb25zdCBjc3NMaW5lQnlMaW5lID0gY3NzXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgLm1hcCgoZSkgPT4gZS50cmltKCkpXHJcbiAgICAgICAgLmZpbHRlcigoZSkgPT4gZSAhPT0gXCJcIik7XHJcbiAgICBjb25zb2xlLmxvZyhjc3NMaW5lQnlMaW5lKTtcclxuICAgIGNvbnN0IGtleVZhbHVlUGFpcnMgPSBjc3NMaW5lQnlMaW5lLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGxpbmUuc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgIHJldHVybiB7IGtleToga2V5ID09PSBudWxsIHx8IGtleSA9PT0gdm9pZCAwID8gdm9pZCAwIDoga2V5LnRyaW0oKSwgdmFsdWU6IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50cmltKCkgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY3NzUHJvcHNNYXAgPSB7XHJcbiAgICAgICAgYm9yZGVyOiBcImJvcmRlclwiLFxyXG4gICAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcInJvdW5kZWRcIixcclxuICAgICAgICB3aWR0aDogXCJ3XCIsXHJcbiAgICAgICAgaGVpZ2h0OiBcImhcIixcclxuICAgICAgICBcInRleHQtYWxpZ25cIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJmbGV4LWRpcmVjdGlvblwiOiBcImZsZXhcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJcIixcclxuICAgICAgICBkaXNwbGF5OiBcIlwiLFxyXG4gICAgICAgIGZsZXg6IFwiZmxleFwiLFxyXG4gICAgICAgIGdhcDogXCJnYXBcIixcclxuICAgICAgICB0b3A6IFwidG9wXCIsXHJcbiAgICAgICAgbGVmdDogXCJsZWZ0XCIsXHJcbiAgICB9O1xyXG4gICAgLy8gdGhlc2Ugd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSBub2RlIG9yIGFyZSBub3QgbmVlZGVkIGF0IGFsbFxyXG4gICAgY29uc3QgZXhjbHVkZUxpc3QgPSBbXCJwYWRkaW5nXCIsIFwibWFyZ2luXCIsIFwiYm94LXNpemluZ1wiXTtcclxuICAgIGNvbnN0IGlubGluZVN0eWxlcyA9IFtdO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGtleVZhbHVlUGFpcnMubWFwKCh7IGtleSwgdmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIGlmIChleGNsdWRlTGlzdC5pbmNsdWRlcyhrZXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCB0d1ZhbHVlID0gbG9va1VwVGFpbHdpbmRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICBjb25zdCB0d0tleSA9IGNzc1Byb3BzTWFwW2tleV07XHJcbiAgICAgICAgaWYgKHR3S2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5saW5lU3R5bGVzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3R3S2V5LCB0d1ZhbHVlXS5qb2luKFwiLVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gcGFkZGluZywgZm9udFNpemUgZXRjLlxyXG4gICAgY29uc3QgY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUgPSBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzXHJcbiAgICAgICAgICAgIC5jb25jYXQoY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IG51bGwpXHJcbiAgICAgICAgICAgIC5qb2luKFwiIFwiKSxcclxuICAgICAgICBpbmxpbmVTdHlsZXM6IGlubGluZVN0eWxlcy5qb2luKFwiOyBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGxvb2tVcFRhaWx3aW5kVmFsdWUocHJvcEtleSwgdmFsdWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHZhbHVlc05vdE5lZWRlZFRvQ2hhbmdlID0gW1wiZGlzcGxheVwiLCBcInBvc2l0aW9uXCIsIFwidGV4dC1hbGlnblwiLCBcImZsZXhcIl07XHJcbiAgICBjb25zdCB0d1ZhbHVlID0gKF9hID0gdHdNYXBbcHJvcEtleV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt2YWx1ZV07XHJcbiAgICBpZiAodmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UuaW5jbHVkZXMocHJvcEtleSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGBbJHt2YWx1ZX1dYDtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHdWYWx1ZTtcclxufVxyXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbXTtcclxuICAgIC8qIHBhZGRpbmdzICovXHJcbiAgICBpZiAobm9kZS5wYWRkaW5nTGVmdCkge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmdzID0gW1xyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdCb3R0b20sXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0xlZnQsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAocGFkZGluZ3MuZXZlcnkoKHApID0+IHAgPT09IHBhZGRpbmdzWzBdKSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAtJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwYWRkaW5nc1swXSArIFwicHhcIil9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbXCJ0XCIsIFwiclwiLCBcImJcIiwgXCJsXCJdO1xyXG4gICAgICAgICAgICBwYWRkaW5ncy5mb3JFYWNoKChwLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAke2RpcmVjdGlvbltpXX0tJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwICsgXCJweFwiKX1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogcGFkZGluZ3MgZW5kICovXHJcbiAgICByZXR1cm4gY2xhc3NOYW1lcztcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=