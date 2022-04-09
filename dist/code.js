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
    let allNames = [];
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
        figma.notify("Select only 1 Node", { error: true });
        return;
    }
    const selectionNode = selection[0];
    const isComponentSet = selectionNode.type === "COMPONENT_SET";
    const originalNode = isComponentSet
        ? selectionNode.defaultVariant
        : selectionNode;
    componentName = (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(selectionNode.name);
    const tree = {
        name: componentName,
        css: nodeCSS(originalNode),
        allChildrenAreVector: allChildrenAreVector(originalNode),
        children: [],
        type: originalNode.type,
        characters: originalNode.characters,
        originalNode: originalNode,
        textSegments: [],
        variants: isComponentSet && [],
    };
    function theChildren(children, treeChildren, baseSelector = "") {
        children.forEach((node) => {
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
                baseSelector,
            };
            treeChildren === null || treeChildren === void 0 ? void 0 : treeChildren.push(newElement);
            if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(node.children, newElement.children, baseSelector);
            }
            if (node.type === "TEXT") {
                const textSegments = getTextSegments(node, name, uniqueName);
                newElement.textSegments = textSegments;
            }
        });
    }
    if (((_a = originalNode.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        theChildren(originalNode.children, tree.children);
        /* Component Variants */
        if (isComponentSet) {
            selectionNode.children.forEach((variant) => {
                var _a;
                const variantName = (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.makeSafeForCSS)(`${componentName}--${variant === null || variant === void 0 ? void 0 : variant.name}`);
                const newVariant = {
                    name: componentName,
                    css: nodeCSS(variant),
                    allChildrenAreVector: allChildrenAreVector(variant),
                    children: [],
                    type: variant === null || variant === void 0 ? void 0 : variant.type,
                    characters: variant === null || variant === void 0 ? void 0 : variant.characters,
                    originalNode: variant,
                    textSegments: [],
                    baseSelector: "." + variantName,
                };
                (_a = tree.variants) === null || _a === void 0 ? void 0 : _a.push(newVariant);
                allNames = []; // reset classNames so the new generated match the ones in the defaultVariant
                theChildren(variant.children, newVariant.children, "." + variantName);
            });
        }
    }
    if (originalNode.type === "TEXT") {
        const textSegments = getTextSegments(originalNode, tree.name, uniqueName);
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
function getTreeElementByName(tree, name) {
    function searchTree(element, name) {
        if (element.name === name) {
            return element;
        }
        else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = searchTree(element.children[i], name);
            }
            return result;
        }
        return null;
    }
    return searchTree(tree, name);
}
function eraseDuplicateCSS(modifierCSS, baseCSS) {
    const modArr = modifierCSS.split(";");
    const baseArr = baseCSS.split(";");
    return modArr
        .filter((line) => {
        return !baseArr.includes(line);
    })
        .map((l) => l + ";")
        .join("");
}
const tree = createTree(figma.currentPage.selection);
console.log(tree);
function printCSS(tree) {
    let css = "";
    css += `.${tree.name} {${tree.css}}\n`;
    function theChildren(children, isVariant = false) {
        children.forEach((treeElement) => {
            var _a;
            let elementCSS = treeElement.css;
            let className = "." + treeElement.name;
            if (isVariant) {
                const baseCSS = (_a = getTreeElementByName(tree, treeElement.name)) === null || _a === void 0 ? void 0 : _a.css;
                className =
                    tree.name === treeElement.name ? "" : "." + treeElement.name;
                if (baseCSS) {
                    elementCSS = eraseDuplicateCSS(treeElement.css, baseCSS);
                    if (elementCSS === "")
                        return;
                }
            }
            css += `${treeElement.baseSelector || ""} ${className} {${elementCSS}}\n`;
            if (treeElement.allChildrenAreVector) {
                return;
            }
            if (treeElement.textSegments.length > 1) {
                treeElement.textSegments.forEach((s) => {
                    css += `.${s.name} {${s.css}}\n`;
                });
            }
            if (treeElement.children.length > 0) {
                theChildren(treeElement.children, isVariant);
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
    if (tree.variants) {
        css += "\n/* variant styles */\n";
        theChildren(tree.variants, true);
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
        flex-direction: column;
        gap: ${node.itemSpacing}px;
        align-items: ${alignItemsMap[node.counterAxisAlignItems]};
        justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
      `;
    }
    if (node.layoutMode === "HORIZONTAL") {
        layoutProps = `
        display: flex;
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
        var _a;
        const selection = figma.currentPage.selection[0];
        if (node.type === "GROUP") {
            return "static;";
        }
        if (node.id === selection.id || ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "COMPONENT_SET") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2dldFN0eWxlcy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9wcm9wc0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvdGFpbHdpbmQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBib3JkZXJQcm9wLCBkaXNwbGF5UHJvcCwgcGFkZGluZ1Byb3AsIHRyYW5zZm9ybXMsIGJvcmRlclJhZGl1cywgZmlsbENvbG9yLCBib3hTaGFkb3csIGRpbWVuc2lvbnMsIHBvc2l0aW9uLCBvdmVyZmxvdywgb3BhY2l0eSwgZm9udFByb3AsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZXNjYXBlSHRtbCwgbWFrZVNhZmVGb3JDU1MgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0U3R5bGVzIH0gZnJvbSBcIi4vZ2V0U3R5bGVzXCI7XHJcbi8qIEJldGEgKi9cclxuaW1wb3J0IHsgdGFpbHdpbmQgfSBmcm9tIFwiLi90YWlsd2luZFwiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zb2xlLmxvZyhcIm5vZGVcIiwgbm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNlZ21lbnRDc3ModGV4dFNlZ21lbnQpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcih0ZXh0U2VnbWVudCl9O1xyXG4gICAgICAke2ZvbnRQcm9wKHRleHRTZWdtZW50KX1cclxuICAgIGA7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIGxldCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDEgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIE5vZGVcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29uc3QgaXNDb21wb25lbnRTZXQgPSBzZWxlY3Rpb25Ob2RlLnR5cGUgPT09IFwiQ09NUE9ORU5UX1NFVFwiO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gaXNDb21wb25lbnRTZXRcclxuICAgICAgICA/IHNlbGVjdGlvbk5vZGUuZGVmYXVsdFZhcmlhbnRcclxuICAgICAgICA6IHNlbGVjdGlvbk5vZGU7XHJcbiAgICBjb21wb25lbnROYW1lID0gbWFrZVNhZmVGb3JDU1Moc2VsZWN0aW9uTm9kZS5uYW1lKTtcclxuICAgIGNvbnN0IHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1Mob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogb3JpZ2luYWxOb2RlLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogb3JpZ2luYWxOb2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICB2YXJpYW50czogaXNDb21wb25lbnRTZXQgJiYgW10sXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbiwgYmFzZVNlbGVjdG9yID0gXCJcIikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YDtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1Mobm9kZSksXHJcbiAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSksXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiBub2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IG5vZGUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlQ2hpbGRyZW4gPT09IG51bGwgfHwgdHJlZUNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlQ2hpbGRyZW4ucHVzaChuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKG5vZGUuY2hpbGRyZW4sIG5ld0VsZW1lbnQuY2hpbGRyZW4sIGJhc2VTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IG9yaWdpbmFsTm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4ob3JpZ2luYWxOb2RlLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgICAgICAvKiBDb21wb25lbnQgVmFyaWFudHMgKi9cclxuICAgICAgICBpZiAoaXNDb21wb25lbnRTZXQpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGAke2NvbXBvbmVudE5hbWV9LS0ke3ZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyh2YXJpYW50KSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3IodmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogdmFyaWFudCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWxlY3RvcjogXCIuXCIgKyB2YXJpYW50TmFtZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0cmVlLnZhcmlhbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChuZXdWYXJpYW50KTtcclxuICAgICAgICAgICAgICAgIGFsbE5hbWVzID0gW107IC8vIHJlc2V0IGNsYXNzTmFtZXMgc28gdGhlIG5ldyBnZW5lcmF0ZWQgbWF0Y2ggdGhlIG9uZXMgaW4gdGhlIGRlZmF1bHRWYXJpYW50XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih2YXJpYW50LmNoaWxkcmVuLCBuZXdWYXJpYW50LmNoaWxkcmVuLCBcIi5cIiArIHZhcmlhbnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhvcmlnaW5hbE5vZGUsIHRyZWUubmFtZSwgdW5pcXVlTmFtZSk7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5mdW5jdGlvbiBnZXRUZXh0U2VnbWVudHMobm9kZSwgY29tcG9uZW50TmFtZSwgdW5pcXVlTmFtZSkge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBub2RlLmdldFN0eWxlZFRleHRTZWdtZW50cyhbXHJcbiAgICAgICAgXCJmb250U2l6ZVwiLFxyXG4gICAgICAgIFwiZm9udE5hbWVcIixcclxuICAgICAgICBcInRleHREZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgXCJ0ZXh0Q2FzZVwiLFxyXG4gICAgICAgIFwibGluZUhlaWdodFwiLFxyXG4gICAgICAgIFwibGV0dGVyU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiZmlsbHNcIixcclxuICAgICAgICBcInRleHRTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJmaWxsU3R5bGVJZFwiLFxyXG4gICAgICAgIFwibGlzdE9wdGlvbnNcIixcclxuICAgICAgICBcImluZGVudGF0aW9uXCIsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzZWdtZW50cy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzKSwgeyBuYW1lOiBgJHt1bmlxdWVOYW1lKG1ha2VTYWZlRm9yQ1NTKGNvbXBvbmVudE5hbWUgKyBcIi1zcGFuXCIpKX1gLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCBuYW1lKSB7XHJcbiAgICBmdW5jdGlvbiBzZWFyY2hUcmVlKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNoaWxkcmVuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VhcmNoVHJlZShlbGVtZW50LmNoaWxkcmVuW2ldLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICBjb25zdCBtb2RBcnIgPSBtb2RpZmllckNTUy5zcGxpdChcIjtcIik7XHJcbiAgICBjb25zdCBiYXNlQXJyID0gYmFzZUNTUy5zcGxpdChcIjtcIik7XHJcbiAgICByZXR1cm4gbW9kQXJyXHJcbiAgICAgICAgLmZpbHRlcigobGluZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhYmFzZUFyci5pbmNsdWRlcyhsaW5lKTtcclxuICAgIH0pXHJcbiAgICAgICAgLm1hcCgobCkgPT4gbCArIFwiO1wiKVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbmNvbnN0IHRyZWUgPSBjcmVhdGVUcmVlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XHJcbmNvbnNvbGUubG9nKHRyZWUpO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICBsZXQgY3NzID0gXCJcIjtcclxuICAgIGNzcyArPSBgLiR7dHJlZS5uYW1lfSB7JHt0cmVlLmNzc319XFxuYDtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCBpc1ZhcmlhbnQgPSBmYWxzZSkge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnRDU1MgPSB0cmVlRWxlbWVudC5jc3M7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIi5cIiArIHRyZWVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhcmlhbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDU1MgPSAoX2EgPSBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCB0cmVlRWxlbWVudC5uYW1lKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNzcztcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5uYW1lID09PSB0cmVlRWxlbWVudC5uYW1lID8gXCJcIiA6IFwiLlwiICsgdHJlZUVsZW1lbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ1NTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudENTUyA9IGVyYXNlRHVwbGljYXRlQ1NTKHRyZWVFbGVtZW50LmNzcywgYmFzZUNTUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRDU1MgPT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjc3MgKz0gYCR7dHJlZUVsZW1lbnQuYmFzZVNlbGVjdG9yIHx8IFwiXCJ9ICR7Y2xhc3NOYW1lfSB7JHtlbGVtZW50Q1NTfX1cXG5gO1xyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnRleHRTZWdtZW50cy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzICs9IGAuJHtzLm5hbWV9IHske3MuY3NzfX1cXG5gO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuLCBpc1ZhcmlhbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHJlZS50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRyZWUudGV4dFNlZ21lbnRzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgY3NzICs9IGAuJHtzLm5hbWV9IHske3MuY3NzfX1cXG5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICBpZiAodHJlZS52YXJpYW50cykge1xyXG4gICAgICAgIGNzcyArPSBcIlxcbi8qIHZhcmlhbnQgc3R5bGVzICovXFxuXCI7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS52YXJpYW50cywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50SFRNTCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgICAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjaGlsZHJlbiA9PT0gbnVsbCB8fCBjaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGRyZW4ubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGwgPSB5aWVsZCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoKHRyZWVFbGVtZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0cmVlRWxlbWVudC5uYW1lfVwiPlxcbiR7dHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByaW50VGV4dFNlZ21lbnRzKHRyZWVFbGVtZW50LnRleHRTZWdtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYmVjb21lIG1vcmUgRFJZLi4uXHJcbiAgICAgICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCB0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGh0bWwgPSB5aWVsZCBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIHRyZWUubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0cmVlLm5hbWV9XCI+XFxuJHt0cmVlLnRleHRTZWdtZW50cyA/IHByaW50VGV4dFNlZ21lbnRzKHRyZWUudGV4dFNlZ21lbnRzKSA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBwcmludFRleHRTZWdtZW50cyhzZWdtZW50cykge1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vIGRvIG5vdCB3cmFwIGluIHNwYW5cclxuICAgICAgICByZXR1cm4gZXNjYXBlSHRtbChzZWdtZW50c1swXS5jaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcblwiKSAvLyBtYWtlcyBhbm5veWluZyBMLVNFUCBMaW5lYnJlYWtzIGRpc2FwcGVhclxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VnbWVudHNcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7cy5uYW1lfVwiPiR7ZXNjYXBlSHRtbChzLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKX08L3NwYW4+YDtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3IoZnJhbWUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuICgoKF9hID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigobikgPT4gbi50eXBlID09PSBcIlZFQ1RPUlwiKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzdmcgPSB5aWVsZCBub2RlXHJcbiAgICAgICAgICAgIC5leHBvcnRBc3luYyh7IGZvcm1hdDogXCJTVkdcIiwgdXNlQWJzb2x1dGVCb3VuZHM6IHRydWUgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gXHJcbiAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiPHN2ZyBcIiwgYDxzdmcgY2xhc3M9XCIke2NsYXNzTmFtZX1cIiBgKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHN2ZztcclxuICAgIH0pO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIiwgXCJ0YWlsd2luZChiZXRhKVwiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGZyYW1ld29ya3MuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn0pO1xyXG5maWdtYS5vbihcInJ1blwiLCAoeyBjb21tYW5kLCBwYXJhbWV0ZXJzIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiA0MDAgfSk7XHJcbiAgICBjb25zdCBjc3MgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiID8gXCItXCIgOiBwcmludENTUyh0cmVlKTtcclxuICAgIGNvbnN0IGh0bWwgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiXHJcbiAgICAgICAgPyB5aWVsZCB0YWlsd2luZCh0cmVlKVxyXG4gICAgICAgIDogeWllbGQgcHJpbnRIVE1MKHRyZWUpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzcyxcclxuICAgICAgICBodG1sLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBnZXRTdHlsZXMoZmlnbWEpLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pKTtcclxuIiwiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZm9udFN0eWxlQXNPYmplY3QsIGxpbmVIZWlnaHQsIGZvbnRTaG9ydGhhbmQsIGdldENvbG9yLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgoeyBuYW1lLCBwYWludHMgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKG5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0Q29sb3IocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChzdHlsZS5mb250TmFtZSk7XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQoc3R5bGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKHN0eWxlLm5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWMsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlcyxcclxuICAgIH07XHJcbn1cclxuIiwiLyogaGVscGVycyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHJnYjtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIGByZ2JhKCR7Y29tcG9uZW50VG8yNTUocil9LCAke2NvbXBvbmVudFRvMjU1KGcpfSwgJHtjb21wb25lbnRUbzI1NShiKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIGlmICghbmFtZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgYm9yZGVyLXdpZHRoOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4OyBcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7IFxyXG4gICAgYm9yZGVyLWltYWdlOiAke3N0cm9rZUNvbG9yKG5vZGUpfTsgXHJcbiAgICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XHJcbiAgICBgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBib3JkZXI6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHggc29saWQgJHtzdHJva2VDb2xvcihub2RlKX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZ1Byb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnBhZGRpbmdUb3AgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nUmlnaHQgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nQm90dG9tICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0xlZnQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYHBhZGRpbmc6ICR7bm9kZS5wYWRkaW5nVG9wfXB4ICR7bm9kZS5wYWRkaW5nUmlnaHR9cHggJHtub2RlLnBhZGRpbmdCb3R0b219cHggJHtub2RlLnBhZGRpbmdMZWZ0fXB4O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQcm9wKG5vZGUpIHtcclxuICAgIGNvbnN0IGZsZXhTaHJpbmtHcm93ID0gbm9kZS5sYXlvdXRHcm93ID09PSAxID8gXCJmbGV4OiAxO1wiIDogc2hyaW5rKCk7XHJcbiAgICBmdW5jdGlvbiBzaHJpbmsoKSB7XHJcbiAgICAgICAgcmV0dXJuICEobm9kZS50eXBlID09PSBcIlRFWFRcIikgJiYgIShub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgICAgID8gXCJmbGV4LXNocmluazogMDtcIlxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXlvdXRBbGlnbiA9IG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiID8gXCJhbGlnbi1zZWxmOiBzdHJldGNoO1wiIDogXCJcIjtcclxuICAgIGNvbnN0IGFsaWduSXRlbXNNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QganVzdGlmeUNvbnRlbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgbGV0IGxheW91dFByb3BzID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gYFxyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgICBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zTWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke2p1c3RpZnlDb250ZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgfHxcclxuICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyArPSBsYXlvdXRBbGlnbiArIGZsZXhTaHJpbmtHcm93O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheW91dFByb3BzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaW1lbnNpb25zKG5vZGUpIHtcclxuICAgIC8qIE5PVEU6IFRoZSBPcmRlciBvZiB0aGVzZSBpZiBzdGF0ZW1lbnRzIGlzIGltcG9ydGFudCEgKi9cclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XHJcbiAgICBsZXQgaGVpZ2h0ID0gXCJcIjtcclxuICAgIGxldCB3aWR0aCA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICB3aWR0aCA9IG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBoZWlnaHQgPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFub2RlLmxheW91dE1vZGUgfHwgbm9kZS5sYXlvdXRNb2RlID09PSBcIk5PTkVcIikge1xyXG4gICAgICAgIGhlaWdodCA9ICgoX2EgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkhFSUdIVFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCghbm9kZS5jaGlsZHJlbiB8fCAoKF9jID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxlbmd0aCkgPT09IDApICYmIG5vZGUudHlwZSAhPT0gXCJURVhUXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAoKF9kID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhvcml6b250YWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiZcclxuICAgICAgICBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkgfHxcclxuICAgICAgICAoKF9lID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZlcnRpY2FsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgd2lkdGg6ICR7d2lkdGh9OyBoZWlnaHQ6ICR7aGVpZ2h0fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVyZmxvdyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIm92ZXJmbG93OiB2aXNpYmxlO1wiO1xyXG4gICAgcmV0dXJuIG5vZGUuY2xpcHNDb250ZW50ID8gXCJvdmVyZmxvdzogaGlkZGVuO1wiIDogXCJcIjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3BhY2l0eShub2RlKSB7XHJcbiAgICBpZiAobm9kZS5vcGFjaXR5ID09PSAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBvcGFjaXR5OiAke25vZGUub3BhY2l0eX07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XHJcbiAgICBsZXQgY29vcmQgPSBcIlwiO1xyXG4gICAgZnVuY3Rpb24gZmluZEFic29sdXRlUGFyZW50KG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaW5kQWJzb2x1dGVQYXJlbnQobm9kZS5wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZS5wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5pZCAhPT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkKSB7XHJcbiAgICAgICAgLy8gU3VwZXIgdWdseSBidXQgd29ya3MgZm9yIG5vdy4uLlxyXG4gICAgICAgIGlmICgoKF9hID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhvcml6b250YWwpID09PSBcIk1BWFwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGByaWdodDogJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLSBub2RlLndpZHRoIC0gbm9kZS54fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCgoX2IgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaG9yaXpvbnRhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGByaWdodDogJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLSBub2RlLndpZHRoIC0gbm9kZS54fXB4OyBsZWZ0OiAke25vZGUueH1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoKF9jID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhvcml6b250YWwpID09PSBcIkNFTlRFUlwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBsZWZ0OiBjYWxjKDUwJSAtICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLndpZHRoIC8gMiAtIG5vZGUueH1weCk7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBsZWZ0OiAke25vZGUueH1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKChfZCA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC52ZXJ0aWNhbCkgPT09IFwiTUFYXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGJvdHRvbTogJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC0gbm9kZS5oZWlnaHQgLSBub2RlLnl9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfZSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS52ZXJ0aWNhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBib3R0b206ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55fXB4OyB0b3A6ICR7bm9kZS55fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCgoX2YgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YudmVydGljYWwpID09PSBcIkNFTlRFUlwiKSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGB0b3A6IGNhbGMoNTAlIC0gJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC8gMiAtIG5vZGUueX1weCk7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGB0b3A6ICR7bm9kZS55fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgcG9zaXRpb25Gcm9tUGFyZW50ID0gKG5vZGUpID0+IHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGF0aWM7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBzZWxlY3Rpb24uaWQgfHwgKChfYSA9IG5vZGUucGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHlwZSkgPT09IFwiQ09NUE9ORU5UX1NFVFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlbGF0aXZlO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7bm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIgfHwgIW5vZGUucGFyZW50LmxheW91dE1vZGVcclxuICAgICAgICAgICAgPyBgYWJzb2x1dGU7ICR7Y29vcmR9YFxyXG4gICAgICAgICAgICA6IFwicmVsYXRpdmU7XCJ9YDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBwb3NpdGlvbjogJHtwb3NpdGlvbkZyb21QYXJlbnQobm9kZSl9XHJcbiAgICBgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3hTaGFkb3cobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFub2RlLmVmZmVjdHMgfHwgbm9kZS5lZmZlY3RzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHNoYWRvd3MgPSBub2RlLmVmZmVjdHMuZmlsdGVyKChlZmZlY3QpID0+IGVmZmVjdC50eXBlID09PSBcIkRST1BfU0hBRE9XXCIpO1xyXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgbGV0IGNzcyA9IFwiYm94LXNoYWRvdzogXCI7XHJcbiAgICBjc3MgKz0gc2hhZG93c1xyXG4gICAgICAgIC5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7cy5vZmZzZXQueH1weCAke3Mub2Zmc2V0Lnl9cHggJHtzLnJhZGl1c31weCAke3Muc3ByZWFkfXB4ICR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9YDtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIsIFwiKTtcclxuICAgIHJldHVybiAoYCR7bm9kZS5lZmZlY3RTdHlsZUlkICYmXHJcbiAgICAgICAgXCIvKlwiICsgKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmVmZmVjdFN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkgKyBcIiovXCJ9YCArXHJcbiAgICAgICAgY3NzICtcclxuICAgICAgICBcIjtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTdHlsZUFzT2JqZWN0KGZvbnROYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgaXNJdGFsaWMgPSAoX2EgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiaXRhbGljXCIpO1xyXG4gICAgY29uc3Qgd2VpZ2h0TWFwID0ge1xyXG4gICAgICAgIHRoaW46IDEwMCxcclxuICAgICAgICBcImV4dHJhIGxpZ2h0XCI6IDIwMCxcclxuICAgICAgICBleHRyYWxpZ2h0OiAyMDAsXHJcbiAgICAgICAgbGlnaHQ6IDMwMCxcclxuICAgICAgICBub3JtYWw6IDQwMCxcclxuICAgICAgICByZWd1bGFyOiA0MDAsXHJcbiAgICAgICAgbWVkaXVtOiA1MDAsXHJcbiAgICAgICAgXCJzZW1pIGJvbGRcIjogNjAwLFxyXG4gICAgICAgIHNlbWlib2xkOiA2MDAsXHJcbiAgICAgICAgYm9sZDogNzAwLFxyXG4gICAgICAgIFwiZXh0cmEgYm9sZFwiOiA4MDAsXHJcbiAgICAgICAgZXh0cmFib2xkOiA4MDAsXHJcbiAgICAgICAgYmxhY2s6IDkwMCxcclxuICAgIH07XHJcbiAgICBjb25zdCB3ZWlnaHQgPSAoX2IgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJpdGFsaWNcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB3ZWlnaHQ6IHdlaWdodE1hcFt3ZWlnaHRdID8gd2VpZ2h0TWFwW3dlaWdodF0gOiBcIjQwMFwiLFxyXG4gICAgICAgIGlzSXRhbGljLFxyXG4gICAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbENvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvL2F0bSBvbmx5IG9uZSBmaWxsIGlzIHN1cHBvcnRlZFxyXG4gICAgY29uc3QgZmlsbCA9IChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihmaWxsLCBub2RlLmZpbGxTdHlsZUlkKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3Jtcyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS5yb3RhdGlvbiAmJiBub2RlLnR5cGUgIT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCR7bm9kZS5yb3RhdGlvbiAqIC0xfWRlZyk7XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ3JhZGllbnRMaW5lYXIoZmlsbCkge1xyXG4gICAgY29uc3QgeyBncmFkaWVudFN0b3BzIH0gPSBmaWxsO1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGdldFRyYW5zZm9ybXMoZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICBjb25zb2xlLmxvZyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnN0IGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYCR7cmdiYUNvbG9yKHMuY29sb3IsIHMuY29sb3IuYSl9ICR7cy5wb3NpdGlvbiAqIDEwMH0lYDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHt0cmFuc2Zvcm1zLmFuZ2xlICsgOTB9ZGVnLCAke2dyYWRpZW50TWFwLmpvaW4oXCIsXCIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJSYWRpdXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJFTExJUFNFXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXJhZGl1czogNTAlO1wiO1xyXG4gICAgaWYgKCFub2RlLmNvcm5lclJhZGl1cyAmJiAhbm9kZS50b3BMZWZ0UmFkaXVzKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBib3JkZXItcmFkaXVzOiAke3R5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgID8gbm9kZS5jb3JuZXJSYWRpdXMgKyBcInB4XCJcclxuICAgICAgICA6IGAke25vZGUudG9wTGVmdFJhZGl1c31weCAke25vZGUudG9wUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbVJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21MZWZ0UmFkaXVzfXB4YH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc3Ryb2tlQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3Ioc3Ryb2tlLCBub2RlLnN0cm9rZVN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xvcihmaWxsT3JDb2xvciwgc3R5bGVJZCkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFmaWxsT3JDb2xvcikge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGxPckNvbG9yLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRMaW5lYXIoZmlsbE9yQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQoc3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9IGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4gYHZhcigtLSR7c3R5bGVOYW1lfSwgJHtjb2xvcn0pYDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGVPclN0eWxlKSB7XHJcbiAgICBpZiAoIW5vZGVPclN0eWxlLmxpbmVIZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAobm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0ID09PSBcIkFVVE9cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdW5pdCA9IHVuaXRNYXBbbm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBgJHtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnZhbHVlfSR7dW5pdH1gO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U2hvcnRoYW5kKHsgbGluZUhlaWdodCwgZm9udFNpemUsIHdlaWdodCwgZm9udEZhbWlseSwgaXNJdGFsaWMsIH0pIHtcclxuICAgIGNvbnN0IGl0YWxpYyA9IGlzSXRhbGljID8gXCJpdGFsaWMgXCIgOiBcIlwiO1xyXG4gICAgcmV0dXJuIGAke3dlaWdodH0gJHtpdGFsaWN9JHtmb250U2l6ZX1weCR7bGluZUhlaWdodCAhPT0gXCJcIiA/IFwiL1wiICsgbGluZUhlaWdodCA6IFwiXCJ9ICcke2ZvbnRGYW1pbHl9J2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChub2RlLmZvbnROYW1lKTtcclxuICAgIGNvbnN0IGZvbnRTaXplID0gKF9hID0gbm9kZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gbm9kZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQobm9kZSk7XHJcbiAgICBjb25zdCBzaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgIGZvbnRTaXplLFxyXG4gICAgICAgIHdlaWdodCxcclxuICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgIGlzSXRhbGljLFxyXG4gICAgfSk7XHJcbiAgICBpZiAobm9kZS50ZXh0U3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYyA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnRleHRTdHlsZUlkLnRvU3RyaW5nKCkpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGBmb250OiB2YXIoLS0ke3N0eWxlTmFtZX0sICR7c2hvcnRoYW5kfSk7YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgZm9udDogJHtzaG9ydGhhbmR9O2A7XHJcbn1cclxuIiwiLypcclxuVGhpcyBmaWxlIHRyaWVzIHRvIGNvbnZlcnQgZmlnbWEgaW50byB0YWlsd2luZC5cclxuSXQgdHJpZXMgdG8gaW50ZXJwcmV0IHRoZSBjc3MgYWxyZWFkeSBnZW5lcmF0ZWQgZnJvbSB0aGlzIHBsdWdpbiBhcyB0YWlsd2luZCBjbGFzc2VzLlxyXG5UaGlzIHdpbGwgbmV2ZXIgd29yayBwZXJmZWN0bHkgYnV0IG1heSBwcm92aWRlIGEgc3RhcnRpbmcgcG9pbnQgZm9yIGRldmVsb3BtZW50LlxyXG4qL1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGNyZWF0ZVNWRyB9IGZyb20gXCIuL2NvZGVcIjtcclxuY29uc3Qgc2l6ZXNNYXAgPSB7XHJcbiAgICBcIjBweFwiOiAwLFxyXG4gICAgXCIxcHhcIjogXCJweFwiLFxyXG4gICAgXCIycHhcIjogMC41LFxyXG4gICAgXCI0cHhcIjogMSxcclxuICAgIFwiNnB4XCI6IDEuNSxcclxuICAgIFwiOHB4XCI6IDIsXHJcbiAgICBcIjEwcHhcIjogMi41LFxyXG4gICAgXCIxMnB4XCI6IDMsXHJcbiAgICBcIjE0cHhcIjogMy41LFxyXG4gICAgXCIxNnB4XCI6IDQsXHJcbiAgICBcIjIwcHhcIjogNSxcclxuICAgIFwiMjRweFwiOiA2LFxyXG4gICAgLyogYW5kIG1hbnkgbW9yZSAqL1xyXG59O1xyXG5jb25zdCBmbGV4RGlyZWN0aW9uTWFwID0ge1xyXG4gICAgcm93OiBcInJvd1wiLFxyXG4gICAgY29sdW1uOiBcImNvbFwiLFxyXG59O1xyXG5jb25zdCB0d01hcCA9IHtcclxuICAgIHBhZGRpbmc6IHNpemVzTWFwLFxyXG4gICAgZ2FwOiBzaXplc01hcCxcclxuICAgIHRvcDogc2l6ZXNNYXAsXHJcbiAgICBsZWZ0OiBzaXplc01hcCxcclxuICAgIFwiZmxleC1kaXJlY3Rpb25cIjogZmxleERpcmVjdGlvbk1hcCxcclxuICAgIFwiYm9yZGVyLXJhZGl1c1wiOiB7XHJcbiAgICAgICAgXCIwcHhcIjogXCJub25lXCIsXHJcbiAgICAgICAgXCIycHhcIjogXCJzbVwiLFxyXG4gICAgICAgIFwiNHB4XCI6IFwiXCIsXHJcbiAgICAgICAgXCI2cHhcIjogXCJtZFwiLFxyXG4gICAgICAgIFwiOHB4XCI6IFwibGdcIixcclxuICAgICAgICBcIjEycHhcIjogXCJ4bFwiLFxyXG4gICAgICAgIFwiMTZweFwiOiBcIjJ4bFwiLFxyXG4gICAgICAgIFwiMjRweFwiOiBcIjN4bFwiLFxyXG4gICAgICAgIFwiOTk5OXB4XCI6IFwiZnVsbFwiLFxyXG4gICAgfSxcclxuICAgIGJhY2tncm91bmQ6IHsgdHJhbnNwYXJlbnQ6IFwidHJhbnNwYXJlbnRcIiB9LFxyXG4gICAgXCJqdXN0aWZ5LWNvbnRlbnRcIjoge1xyXG4gICAgICAgIFwiZmxleC1zdGFydFwiOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgXCJmbGV4LWVuZFwiOiBcImVuZFwiLFxyXG4gICAgICAgIGNlbnRlcjogXCJjZW50ZXJcIixcclxuICAgIH0sXHJcbiAgICBcImFsaWduLWl0ZW1zXCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1zZWxmXCI6IHtcclxuICAgICAgICBzdHJldGNoOiBcInN0cmV0Y2hcIixcclxuICAgIH0sXHJcbiAgICBvdmVyZmxvdzoge1xyXG4gICAgICAgIGhpZGRlbjogXCJoaWRkZW5cIixcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiB0YWlsd2luZCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgICAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjaGlsZHJlbiA9PT0gbnVsbCB8fCBjaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGRyZW4ubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGwgPSB5aWVsZCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoKHRyZWVFbGVtZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYWNreS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlc31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5saW5lU3R5bGVzfVwiPlxcbiR7dHJlZUVsZW1lbnQuY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmVlRWxlbWVudC5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYmVjb21lIG1vcmUgRFJZLi4uXHJcbiAgICAgICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCB0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGh0bWwgPSB5aWVsZCBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIGAke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlc31gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlc31cIj5cXG4ke3RyZWUuY2hhcmFjdGVycyA/IHRyZWUuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHRhaWx3aW5kQ2xhc3NOYW1lcyhjc3MsIG5vZGUpIHtcclxuICAgIGNvbnN0IGNzc0xpbmVCeUxpbmUgPSBjc3NcclxuICAgICAgICAucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIjtcIilcclxuICAgICAgICAubWFwKChlKSA9PiBlLnRyaW0oKSlcclxuICAgICAgICAuZmlsdGVyKChlKSA9PiBlICE9PSBcIlwiKTtcclxuICAgIGNvbnN0IGtleVZhbHVlUGFpcnMgPSBjc3NMaW5lQnlMaW5lLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGxpbmUuc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgIHJldHVybiB7IGtleToga2V5ID09PSBudWxsIHx8IGtleSA9PT0gdm9pZCAwID8gdm9pZCAwIDoga2V5LnRyaW0oKSwgdmFsdWU6IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50cmltKCkgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY3NzUHJvcHNNYXAgPSB7XHJcbiAgICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwicm91bmRlZFwiLFxyXG4gICAgICAgIHdpZHRoOiBcIndcIixcclxuICAgICAgICBoZWlnaHQ6IFwiaFwiLFxyXG4gICAgICAgIFwidGV4dC1hbGlnblwiOiBcInRleHRcIixcclxuICAgICAgICBcImZsZXgtZGlyZWN0aW9uXCI6IFwiZmxleFwiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcIlwiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiXCIsXHJcbiAgICAgICAgZmxleDogXCJmbGV4XCIsXHJcbiAgICAgICAgZ2FwOiBcImdhcFwiLFxyXG4gICAgICAgIHRvcDogXCJ0b3BcIixcclxuICAgICAgICBsZWZ0OiBcImxlZnRcIixcclxuICAgICAgICBcImp1c3RpZnktY29udGVudFwiOiBcImp1c3RpZnlcIixcclxuICAgICAgICBcImFsaWduLWl0ZW1zXCI6IFwiaXRlbXNcIixcclxuICAgICAgICBcImFsaWduLXNlbGZcIjogXCJzZWxmXCIsXHJcbiAgICAgICAgb3ZlcmZsb3c6IFwib3ZlcmZsb3dcIixcclxuICAgIH07XHJcbiAgICAvLyB0aGVzZSB3aWxsIGJlIGdlbmVyYXRlZCBmcm9tIG5vZGUgb3IgYXJlIG5vdCBuZWVkZWQgYXQgYWxsXHJcbiAgICBjb25zdCBleGNsdWRlTGlzdCA9IFtcInBhZGRpbmdcIiwgXCJtYXJnaW5cIiwgXCJib3gtc2l6aW5nXCJdO1xyXG4gICAgY29uc3QgaW5saW5lU3R5bGVzID0gW107XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0ga2V5VmFsdWVQYWlycy5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVMaXN0LmluY2x1ZGVzKGtleSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHR3VmFsdWUgPSBsb29rVXBUYWlsd2luZFZhbHVlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IHR3S2V5ID0gY3NzUHJvcHNNYXBba2V5XTtcclxuICAgICAgICBpZiAodHdLZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmxpbmVTdHlsZXMucHVzaChgJHtrZXl9OiAke3ZhbHVlfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZm9yIHByb3BzIGxpa2UgZGlzcGxheSBldGMuICovXHJcbiAgICAgICAgaWYgKHR3S2V5ID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0d1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbdHdLZXksIHR3VmFsdWVdLmpvaW4oXCItXCIpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBwYWRkaW5nLCBmb250U2l6ZSBldGMuXHJcbiAgICBjb25zdCBjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSA9IGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IGNsYXNzTmFtZXNcclxuICAgICAgICAgICAgLmNvbmNhdChjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZSkgPT4gZSAhPT0gbnVsbClcclxuICAgICAgICAgICAgLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIGlubGluZVN0eWxlczogaW5saW5lU3R5bGVzLmpvaW4oXCI7IFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gbG9va1VwVGFpbHdpbmRWYWx1ZShwcm9wS2V5LCB2YWx1ZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgdmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UgPSBbXCJkaXNwbGF5XCIsIFwicG9zaXRpb25cIiwgXCJ0ZXh0LWFsaWduXCIsIFwiZmxleFwiXTtcclxuICAgIGNvbnN0IHR3VmFsdWUgPSAoX2EgPSB0d01hcFtwcm9wS2V5XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ZhbHVlXTtcclxuICAgIGlmICh2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZS5pbmNsdWRlcyhwcm9wS2V5KSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYFske3ZhbHVlfV1gO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0d1ZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IFtdO1xyXG4gICAgLyogcGFkZGluZ3MgKi9cclxuICAgIGlmIChub2RlLnBhZGRpbmdMZWZ0KSB7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZ3MgPSBbXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0JvdHRvbSxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nTGVmdCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChwYWRkaW5ncy5ldmVyeSgocCkgPT4gcCA9PT0gcGFkZGluZ3NbMF0pKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChgcC0ke2xvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHBhZGRpbmdzWzBdICsgXCJweFwiKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFtcInRcIiwgXCJyXCIsIFwiYlwiLCBcImxcIl07XHJcbiAgICAgICAgICAgIHBhZGRpbmdzLmZvckVhY2goKHAsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChgcCR7ZGlyZWN0aW9uW2ldfS0ke2xvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHAgKyBcInB4XCIpfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiBwYWRkaW5ncyBlbmQgKi9cclxuICAgIHJldHVybiBjbGFzc05hbWVzO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29kZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==