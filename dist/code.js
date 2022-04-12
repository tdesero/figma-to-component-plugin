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
        allChildrenAreVector: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.allChildrenAreVector)(originalNode),
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
                allChildrenAreVector: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.allChildrenAreVector)(node),
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
                    allChildrenAreVector: (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.allChildrenAreVector)(variant),
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
    const modArr = modifierCSS.split(";").map((l) => l.trim());
    const baseArr = baseCSS.split(";").map((l) => l.trim());
    // detect css lines included in base but not in modifier and unset the value
    const cssPropsToBeUnset = baseArr
        .map((l) => {
        var _a;
        return (_a = l.split(":")) === null || _a === void 0 ? void 0 : _a[0];
    })
        .filter((prop) => {
        return !modifierCSS.includes(`${prop}:`);
    })
        .map((prop) => prop + ": unset");
    return modArr
        .filter((line) => {
        return !baseArr.includes(line);
    })
        .concat(cssPropsToBeUnset)
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
                }
            }
            if (elementCSS !== "") {
                css += `${treeElement.baseSelector || ""} ${className} {${elementCSS}}\n`;
            }
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
        if (tree.type === "VECTOR" ||
            tree.type === "BOOLEAN_OPERATION" ||
            tree.allChildrenAreVector) {
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
/* harmony export */   "allChildrenAreVector": () => (/* binding */ allChildrenAreVector),
/* harmony export */   "cleanStyleName": () => (/* binding */ cleanStyleName),
/* harmony export */   "colorAsHexOrRgba": () => (/* binding */ colorAsHexOrRgba),
/* harmony export */   "componentTo255": () => (/* binding */ componentTo255),
/* harmony export */   "componentToHex": () => (/* binding */ componentToHex),
/* harmony export */   "escapeHtml": () => (/* binding */ escapeHtml),
/* harmony export */   "getTransforms": () => (/* binding */ getTransforms),
/* harmony export */   "makeSafeForCSS": () => (/* binding */ makeSafeForCSS),
/* harmony export */   "rgbToHex": () => (/* binding */ rgbToHex),
/* harmony export */   "rgbaColor": () => (/* binding */ rgbaColor),
/* harmony export */   "willBeRenderedAsSVG": () => (/* binding */ willBeRenderedAsSVG)
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
function allChildrenAreVector(node) {
    var _a, _b, _c;
    const vectorTypes = ["VECTOR", "BOOLEAN_OPERATION"];
    return (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        ((_b = node.children) === null || _b === void 0 ? void 0 : _b.filter((n) => vectorTypes.includes(n.type)).length) ===
            ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length));
}
function willBeRenderedAsSVG(node) {
    return (allChildrenAreVector(node) ||
        node.type === "VECTOR" ||
        node.type === "BOOLEAN_OPERATION");
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
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.willBeRenderedAsSVG)(node))
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
    const alignmentMap = {
        MIN: "flex-start",
        MAX: "flex-end",
        CENTER: "center",
        SPACE_BETWEEN: "space-between",
    };
    const flexProps = (direction) => {
        return `
      display: flex;
      flex-direction: ${direction};
      gap: ${node.itemSpacing}px;
      align-items: ${alignmentMap[node.counterAxisAlignItems]};
      justify-content: ${alignmentMap[node.primaryAxisAlignItems]};
    `;
    };
    let layoutProps = "";
    if (node.layoutMode === "VERTICAL") {
        layoutProps = flexProps("column");
    }
    if (node.layoutMode === "HORIZONTAL") {
        layoutProps = flexProps("row");
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
function findAbsoluteParent(node) {
    if (node.parent.type === "GROUP") {
        return findAbsoluteParent(node.parent);
    }
    return node.parent;
}
function cssFromConstraints(node) {
    var _a, _b;
    let coord = "";
    switch ((_a = node.constraints) === null || _a === void 0 ? void 0 : _a.horizontal) {
        case "MAX":
            coord += `right: ${findAbsoluteParent(node).width - node.width - node.x}px;`;
            break;
        case "STRETCH":
            coord += `right: ${findAbsoluteParent(node).width - node.width - node.x}px; left: ${node.x}px;`;
            break;
        case "CENTER":
            coord += `left: calc(50% - ${findAbsoluteParent(node).width / 2 - node.x}px);`;
            break;
        default:
            coord += `left: ${node.x}px;`;
    }
    switch ((_b = node.constraints) === null || _b === void 0 ? void 0 : _b.vertical) {
        case "MAX":
            coord += `bottom: ${findAbsoluteParent(node).height - node.height - node.y}px;`;
            break;
        case "STRETCH":
            coord += `bottom: ${findAbsoluteParent(node).height - node.height - node.y}px; top: ${node.y}px;`;
            break;
        case "CENTER":
            coord += `top: calc(50% - ${findAbsoluteParent(node).height / 2 - node.y}px);`;
            break;
        default:
            coord += `top: ${node.y}px;`;
    }
    return coord;
}
function position(node) {
    let coord = "";
    if (node.id !== figma.currentPage.selection[0].id) {
        // Super ugly but works for now...
        coord = cssFromConstraints(node);
    }
    const positionFromParent = (node) => {
        var _a;
        const selection = figma.currentPage.selection[0];
        if (node.type === "GROUP" && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.willBeRenderedAsSVG)(node)) {
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
    if (!node.effects || node.effects.length === 0 || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.willBeRenderedAsSVG)(node))
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
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.willBeRenderedAsSVG)(node))
        return "";
    //atm only one fill is supported
    const fill = (_a = node.fills) === null || _a === void 0 ? void 0 : _a[0];
    return getColor(fill, node.fillStyleId);
}
function transforms(node) {
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.willBeRenderedAsSVG)(node) || node.type !== "GROUP" || !node.rotation) {
        return "";
    }
    return `
    transform-origin: 0 0;
    transform: rotate(${node.rotation * -1}deg);
  `;
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
    if (!fillOrColor || !fillOrColor.visible) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxhQUFhLEdBQUcseUNBQXlDO0FBQzdGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM01BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL3RhaWx3aW5kLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgYm9yZGVyUHJvcCwgZGlzcGxheVByb3AsIHBhZGRpbmdQcm9wLCB0cmFuc2Zvcm1zLCBib3JkZXJSYWRpdXMsIGZpbGxDb2xvciwgYm94U2hhZG93LCBkaW1lbnNpb25zLCBwb3NpdGlvbiwgb3ZlcmZsb3csIG9wYWNpdHksIGZvbnRQcm9wLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmltcG9ydCB7IGVzY2FwZUh0bWwsIG1ha2VTYWZlRm9yQ1NTLCBhbGxDaGlsZHJlbkFyZVZlY3RvciwgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0U3R5bGVzIH0gZnJvbSBcIi4vZ2V0U3R5bGVzXCI7XHJcbi8qIEJldGEgKi9cclxuaW1wb3J0IHsgdGFpbHdpbmQgfSBmcm9tIFwiLi90YWlsd2luZFwiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zb2xlLmxvZyhcIm5vZGVcIiwgbm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNlZ21lbnRDc3ModGV4dFNlZ21lbnQpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcih0ZXh0U2VnbWVudCl9O1xyXG4gICAgICAke2ZvbnRQcm9wKHRleHRTZWdtZW50KX1cclxuICAgIGA7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIGxldCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDEgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIE5vZGVcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29uc3QgaXNDb21wb25lbnRTZXQgPSBzZWxlY3Rpb25Ob2RlLnR5cGUgPT09IFwiQ09NUE9ORU5UX1NFVFwiO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gaXNDb21wb25lbnRTZXRcclxuICAgICAgICA/IHNlbGVjdGlvbk5vZGUuZGVmYXVsdFZhcmlhbnRcclxuICAgICAgICA6IHNlbGVjdGlvbk5vZGU7XHJcbiAgICBjb21wb25lbnROYW1lID0gbWFrZVNhZmVGb3JDU1Moc2VsZWN0aW9uTm9kZS5uYW1lKTtcclxuICAgIGNvbnN0IHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1Mob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogb3JpZ2luYWxOb2RlLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogb3JpZ2luYWxOb2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICB2YXJpYW50czogaXNDb21wb25lbnRTZXQgJiYgW10sXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbiwgYmFzZVNlbGVjdG9yID0gXCJcIikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YDtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1Mobm9kZSksXHJcbiAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSksXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiBub2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IG5vZGUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlQ2hpbGRyZW4gPT09IG51bGwgfHwgdHJlZUNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlQ2hpbGRyZW4ucHVzaChuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKG5vZGUuY2hpbGRyZW4sIG5ld0VsZW1lbnQuY2hpbGRyZW4sIGJhc2VTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IG9yaWdpbmFsTm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4ob3JpZ2luYWxOb2RlLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgICAgICAvKiBDb21wb25lbnQgVmFyaWFudHMgKi9cclxuICAgICAgICBpZiAoaXNDb21wb25lbnRTZXQpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGAke2NvbXBvbmVudE5hbWV9LS0ke3ZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyh2YXJpYW50KSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3IodmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogdmFyaWFudCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWxlY3RvcjogXCIuXCIgKyB2YXJpYW50TmFtZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0cmVlLnZhcmlhbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChuZXdWYXJpYW50KTtcclxuICAgICAgICAgICAgICAgIGFsbE5hbWVzID0gW107IC8vIHJlc2V0IGNsYXNzTmFtZXMgc28gdGhlIG5ldyBnZW5lcmF0ZWQgbWF0Y2ggdGhlIG9uZXMgaW4gdGhlIGRlZmF1bHRWYXJpYW50XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih2YXJpYW50LmNoaWxkcmVuLCBuZXdWYXJpYW50LmNoaWxkcmVuLCBcIi5cIiArIHZhcmlhbnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhvcmlnaW5hbE5vZGUsIHRyZWUubmFtZSwgdW5pcXVlTmFtZSk7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5mdW5jdGlvbiBnZXRUZXh0U2VnbWVudHMobm9kZSwgY29tcG9uZW50TmFtZSwgdW5pcXVlTmFtZSkge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBub2RlLmdldFN0eWxlZFRleHRTZWdtZW50cyhbXHJcbiAgICAgICAgXCJmb250U2l6ZVwiLFxyXG4gICAgICAgIFwiZm9udE5hbWVcIixcclxuICAgICAgICBcInRleHREZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgXCJ0ZXh0Q2FzZVwiLFxyXG4gICAgICAgIFwibGluZUhlaWdodFwiLFxyXG4gICAgICAgIFwibGV0dGVyU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiZmlsbHNcIixcclxuICAgICAgICBcInRleHRTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJmaWxsU3R5bGVJZFwiLFxyXG4gICAgICAgIFwibGlzdE9wdGlvbnNcIixcclxuICAgICAgICBcImluZGVudGF0aW9uXCIsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzZWdtZW50cy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzKSwgeyBuYW1lOiBgJHt1bmlxdWVOYW1lKG1ha2VTYWZlRm9yQ1NTKGNvbXBvbmVudE5hbWUgKyBcIi1zcGFuXCIpKX1gLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCBuYW1lKSB7XHJcbiAgICBmdW5jdGlvbiBzZWFyY2hUcmVlKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNoaWxkcmVuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VhcmNoVHJlZShlbGVtZW50LmNoaWxkcmVuW2ldLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICBjb25zdCBtb2RBcnIgPSBtb2RpZmllckNTUy5zcGxpdChcIjtcIikubWFwKChsKSA9PiBsLnRyaW0oKSk7XHJcbiAgICBjb25zdCBiYXNlQXJyID0gYmFzZUNTUy5zcGxpdChcIjtcIikubWFwKChsKSA9PiBsLnRyaW0oKSk7XHJcbiAgICAvLyBkZXRlY3QgY3NzIGxpbmVzIGluY2x1ZGVkIGluIGJhc2UgYnV0IG5vdCBpbiBtb2RpZmllciBhbmQgdW5zZXQgdGhlIHZhbHVlXHJcbiAgICBjb25zdCBjc3NQcm9wc1RvQmVVbnNldCA9IGJhc2VBcnJcclxuICAgICAgICAubWFwKChsKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBsLnNwbGl0KFwiOlwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgfSlcclxuICAgICAgICAuZmlsdGVyKChwcm9wKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFtb2RpZmllckNTUy5pbmNsdWRlcyhgJHtwcm9wfTpgKTtcclxuICAgIH0pXHJcbiAgICAgICAgLm1hcCgocHJvcCkgPT4gcHJvcCArIFwiOiB1bnNldFwiKTtcclxuICAgIHJldHVybiBtb2RBcnJcclxuICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFiYXNlQXJyLmluY2x1ZGVzKGxpbmUpO1xyXG4gICAgfSlcclxuICAgICAgICAuY29uY2F0KGNzc1Byb3BzVG9CZVVuc2V0KVxyXG4gICAgICAgIC5tYXAoKGwpID0+IGwgKyBcIjtcIilcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5jb25zdCB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5jb25zb2xlLmxvZyh0cmVlKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgaXNWYXJpYW50ID0gZmFsc2UpIHtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50Q1NTID0gdHJlZUVsZW1lbnQuY3NzO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoaXNWYXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ1NTID0gKF9hID0gZ2V0VHJlZUVsZW1lbnRCeU5hbWUodHJlZSwgdHJlZUVsZW1lbnQubmFtZSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jc3M7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUubmFtZSA9PT0gdHJlZUVsZW1lbnQubmFtZSA/IFwiXCIgOiBcIi5cIiArIHRyZWVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNTUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRDU1MgPSBlcmFzZUR1cGxpY2F0ZUNTUyh0cmVlRWxlbWVudC5jc3MsIGJhc2VDU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q1NTICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjc3MgKz0gYCR7dHJlZUVsZW1lbnQuYmFzZVNlbGVjdG9yIHx8IFwiXCJ9ICR7Y2xhc3NOYW1lfSB7JHtlbGVtZW50Q1NTfX1cXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gYC4ke3MubmFtZX0geyR7cy5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4sIGlzVmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0cmVlLnRleHRTZWdtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICAgICAgICBjc3MgKz0gYC4ke3MubmFtZX0geyR7cy5jc3N9fVxcbmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGlmICh0cmVlLnZhcmlhbnRzKSB7XHJcbiAgICAgICAgY3NzICs9IFwiXFxuLyogdmFyaWFudCBzdHlsZXMgKi9cXG5cIjtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLnZhcmlhbnRzLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbCA9IHlpZWxkIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcCgodHJlZUVsZW1lbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC50ZXh0U2VnbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJpbnRUZXh0U2VnbWVudHModHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzIHNob3VsZCBiZWNvbWUgbW9yZSBEUlkuLi5cclxuICAgICAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgIHRyZWUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgIHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgaHRtbCA9IHlpZWxkIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RyZWUubmFtZX1cIj5cXG4ke3RyZWUudGV4dFNlZ21lbnRzID8gcHJpbnRUZXh0U2VnbWVudHModHJlZS50ZXh0U2VnbWVudHMpIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50VGV4dFNlZ21lbnRzKHNlZ21lbnRzKSB7XHJcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gZG8gbm90IHdyYXAgaW4gc3BhblxyXG4gICAgICAgIHJldHVybiBlc2NhcGVIdG1sKHNlZ21lbnRzWzBdLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWdtZW50c1xyXG4gICAgICAgIC5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiJHtzLm5hbWV9XCI+JHtlc2NhcGVIdG1sKHMuY2hhcmFjdGVycylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXG5cIikgLy8gbWFrZXMgYW5ub3lpbmcgTC1TRVAgTGluZWJyZWFrcyBkaXNhcHBlYXJcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpfTwvc3Bhbj5gO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzdmcgPSB5aWVsZCBub2RlXHJcbiAgICAgICAgICAgIC5leHBvcnRBc3luYyh7IGZvcm1hdDogXCJTVkdcIiwgdXNlQWJzb2x1dGVCb3VuZHM6IHRydWUgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gXHJcbiAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiPHN2ZyBcIiwgYDxzdmcgY2xhc3M9XCIke2NsYXNzTmFtZX1cIiBgKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHN2ZztcclxuICAgIH0pO1xyXG59XHJcbmZpZ21hLnBhcmFtZXRlcnMub24oXCJpbnB1dFwiLCAoeyBwYXJhbWV0ZXJzLCBrZXksIHF1ZXJ5LCByZXN1bHQgfSkgPT4ge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1ld29ya3MgPSBbXCJyZWFjdFwiLCBcImh0bWxcIiwgXCJ0YWlsd2luZChiZXRhKVwiXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldFN1Z2dlc3Rpb25zKGZyYW1ld29ya3MuZmlsdGVyKChzKSA9PiBzLmluY2x1ZGVzKHF1ZXJ5KSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn0pO1xyXG5maWdtYS5vbihcInJ1blwiLCAoeyBjb21tYW5kLCBwYXJhbWV0ZXJzIH0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiA0MDAgfSk7XHJcbiAgICBjb25zdCBjc3MgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiID8gXCItXCIgOiBwcmludENTUyh0cmVlKTtcclxuICAgIGNvbnN0IGh0bWwgPSBwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gXCJ0YWlsd2luZChiZXRhKVwiXHJcbiAgICAgICAgPyB5aWVsZCB0YWlsd2luZCh0cmVlKVxyXG4gICAgICAgIDogeWllbGQgcHJpbnRIVE1MKHRyZWUpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNzcyxcclxuICAgICAgICBodG1sLFxyXG4gICAgICAgIGZyYW1ld29yazogcGFyYW1ldGVycy5mcmFtZXdvcmssXHJcbiAgICAgICAgc3R5bGVzOiBnZXRTdHlsZXMoZmlnbWEpLFxyXG4gICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgfSk7XHJcbn0pKTtcclxuIiwiaW1wb3J0IHsgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZm9udFN0eWxlQXNPYmplY3QsIGxpbmVIZWlnaHQsIGZvbnRTaG9ydGhhbmQsIGdldENvbG9yLCB9IGZyb20gXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgoeyBuYW1lLCBwYWludHMgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKG5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0Q29sb3IocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChzdHlsZS5mb250TmFtZSk7XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQoc3R5bGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsZWFuU3R5bGVOYW1lKHN0eWxlLm5hbWUpLFxyXG4gICAgICAgICAgICB2YWx1ZTogZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWMsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlcyxcclxuICAgIH07XHJcbn1cclxuIiwiLyogaGVscGVycyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHIsIGcsIGIsIGEgfSA9IHJnYjtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIGByZ2JhKCR7Y29tcG9uZW50VG8yNTUocil9LCAke2NvbXBvbmVudFRvMjU1KGcpfSwgJHtjb21wb25lbnRUbzI1NShiKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XHJcbiAgICByZXR1cm4gdW5zYWZlXHJcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdHlsZU5hbWUobmFtZSkge1xyXG4gICAgLy9jb25zdCBuYW1lQXJyID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAvL3JldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lQXJyW25hbWVBcnIubGVuZ3RoIC0gMV0udHJpbSgpKTtcclxuICAgIGlmICghbmFtZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgY29uc3QgdmVjdG9yVHlwZXMgPSBbXCJWRUNUT1JcIiwgXCJCT09MRUFOX09QRVJBVElPTlwiXTtcclxuICAgIHJldHVybiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKChuKSA9PiB2ZWN0b3JUeXBlcy5pbmNsdWRlcyhuLnR5cGUpKS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxlbmd0aCkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB3aWxsQmVSZW5kZXJlZEFzU1ZHKG5vZGUpIHtcclxuICAgIHJldHVybiAoYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSkgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIik7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbWF0cml4ID0ge1xyXG4gICAgICAgIGE6IG1bMF0sXHJcbiAgICAgICAgYjogbVsxXSxcclxuICAgICAgICBjOiBtWzJdLFxyXG4gICAgICAgIGQ6IG1bM10sXHJcbiAgICAgICAgZTogbVs0XSxcclxuICAgICAgICBmOiBtWzVdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VNYXRyaXgyRFczKG1hdHJpeCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFuZ2xlOiB0cmFuc2Zvcm1zLnJvdGF0ZVosXHJcbiAgICAgICAgc2NhbGVYOiB0cmFuc2Zvcm1zLnNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHRyYW5zZm9ybXMuc2NhbGVZLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbVs1XSxcclxuICAgICAgICBzdmdNYXRyaXg6IG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgc3ZnTWF0cml4V2l0aG91dFRyYW5zbGF0ZTogW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdXS5qb2luKFwiIFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyByZ2JUb0hleCwgcmdiYUNvbG9yLCBnZXRUcmFuc2Zvcm1zLCBjbGVhblN0eWxlTmFtZSwgd2lsbEJlUmVuZGVyZWRBc1NWRywgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAod2lsbEJlUmVuZGVyZWRBc1NWRyhub2RlKSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICghbm9kZS5zdHJva2VzIHx8ICFub2RlLnN0cm9rZVdlaWdodCB8fCBub2RlLnN0cm9rZXMubGVuZ3RoIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICgoKF9iID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50eXBlKSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICBib3JkZXItd2lkdGg6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25tZW50TWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGZsZXhQcm9wcyA9IChkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogJHtkaXJlY3Rpb259O1xyXG4gICAgICBnYXA6ICR7bm9kZS5pdGVtU3BhY2luZ31weDtcclxuICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ25tZW50TWFwW25vZGUuY291bnRlckF4aXNBbGlnbkl0ZW1zXX07XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogJHthbGlnbm1lbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgIGA7XHJcbiAgICB9O1xyXG4gICAgbGV0IGxheW91dFByb3BzID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gZmxleFByb3BzKFwiY29sdW1uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGZsZXhQcm9wcyhcInJvd1wiKTtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgLyogTk9URTogVGhlIE9yZGVyIG9mIHRoZXNlIGlmIHN0YXRlbWVudHMgaXMgaW1wb3J0YW50ISAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcclxuICAgIGxldCBoZWlnaHQgPSBcIlwiO1xyXG4gICAgbGV0IHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSAoKF9iID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJXSURUSFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKCFub2RlLmNoaWxkcmVuIHx8ICgoX2MgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSA9PT0gMCkgJiYgbm9kZS50eXBlICE9PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGhlaWdodCA9IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgICgoX2QgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaG9yaXpvbnRhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJlxyXG4gICAgICAgIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB8fFxyXG4gICAgICAgICgoX2UgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudmVydGljYWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB3aWR0aDogJHt3aWR0aH07IGhlaWdodDogJHtoZWlnaHR9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcGFjaXR5KG5vZGUpIHtcclxuICAgIGlmIChub2RlLm9wYWNpdHkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYG9wYWNpdHk6ICR7bm9kZS5vcGFjaXR5fTtgO1xyXG59XHJcbmZ1bmN0aW9uIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKSB7XHJcbiAgICBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlLnBhcmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQ7XHJcbn1cclxuZnVuY3Rpb24gY3NzRnJvbUNvbnN0cmFpbnRzKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBsZXQgY29vcmQgPSBcIlwiO1xyXG4gICAgc3dpdGNoICgoX2EgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGNhc2UgXCJNQVhcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7YDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIlNUUkVUQ0hcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7IGxlZnQ6ICR7bm9kZS54fXB4O2A7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJDRU5URVJcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gYGxlZnQ6IGNhbGMoNTAlIC0gJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLyAyIC0gbm9kZS54fXB4KTtgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb29yZCArPSBgbGVmdDogJHtub2RlLnh9cHg7YDtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoKF9iID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgY2FzZSBcIk1BWFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBgYm90dG9tOiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueX1weDtgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiU1RSRVRDSFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBgYm90dG9tOiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueX1weDsgdG9wOiAke25vZGUueX1weDtgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQ0VOVEVSXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGB0b3A6IGNhbGMoNTAlIC0gJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC8gMiAtIG5vZGUueX1weCk7YDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogJHtub2RlLnl9cHg7YDtcclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xyXG4gICAgbGV0IGNvb3JkID0gXCJcIjtcclxuICAgIGlmIChub2RlLmlkICE9PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAvLyBTdXBlciB1Z2x5IGJ1dCB3b3JrcyBmb3Igbm93Li4uXHJcbiAgICAgICAgY29vcmQgPSBjc3NGcm9tQ29uc3RyYWludHMobm9kZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwb3NpdGlvbkZyb21QYXJlbnQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiICYmICF3aWxsQmVSZW5kZXJlZEFzU1ZHKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpYztcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IHNlbGVjdGlvbi5pZCB8fCAoKF9hID0gbm9kZS5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gXCJDT01QT05FTlRfU0VUXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmU7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IGBhYnNvbHV0ZTsgJHtjb29yZH1gXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZTtcIn1gO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9uRnJvbVBhcmVudChub2RlKX1cclxuICAgIGA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fCBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwIHx8IHdpbGxCZVJlbmRlcmVkQXNTVkcobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSA/IHdlaWdodE1hcFt3ZWlnaHRdIDogXCI0MDBcIixcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAod2lsbEJlUmVuZGVyZWRBc1NWRyhub2RlKSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICBjb25zdCBmaWxsID0gKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKGZpbGwsIG5vZGUuZmlsbFN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1zKG5vZGUpIHtcclxuICAgIGlmICh3aWxsQmVSZW5kZXJlZEFzU1ZHKG5vZGUpIHx8IG5vZGUudHlwZSAhPT0gXCJHUk9VUFwiIHx8ICFub2RlLnJvdGF0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFxyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoJHtub2RlLnJvdGF0aW9uICogLTF9ZGVnKTtcclxuICBgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBncmFkaWVudExpbmVhcihmaWxsKSB7XHJcbiAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IGZpbGw7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX0gJHtzLnBvc2l0aW9uICogMTAwfSVgO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICBpZiAoIW5vZGUuY29ybmVyUmFkaXVzICYmICFub2RlLnRvcExlZnRSYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYGJvcmRlci1yYWRpdXM6ICR7dHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBub2RlLmNvcm5lclJhZGl1cyArIFwicHhcIlxyXG4gICAgICAgIDogYCR7bm9kZS50b3BMZWZ0UmFkaXVzfXB4ICR7bm9kZS50b3BSaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbUxlZnRSYWRpdXN9cHhgfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBzdHJva2UgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihzdHJva2UsIG5vZGUuc3Ryb2tlU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yKGZpbGxPckNvbG9yLCBzdHlsZUlkKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yIHx8ICFmaWxsT3JDb2xvci52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsT3JDb2xvci50eXBlID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGdyYWRpZW50TGluZWFyKGZpbGxPckNvbG9yKTtcclxuICAgIH1cclxuICAgIGlmIChzdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIGB2YXIoLS0ke3N0eWxlTmFtZX0sICR7Y29sb3J9KWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICA/IHJnYmFDb2xvcihmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbGluZUhlaWdodChub2RlT3JTdHlsZSkge1xyXG4gICAgaWYgKCFub2RlT3JTdHlsZS5saW5lSGVpZ2h0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKG5vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdCA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVuaXQgPSB1bml0TWFwW25vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdF07XHJcbiAgICByZXR1cm4gYCR7bm9kZU9yU3R5bGUubGluZUhlaWdodC52YWx1ZX0ke3VuaXR9YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFNob3J0aGFuZCh7IGxpbmVIZWlnaHQsIGZvbnRTaXplLCB3ZWlnaHQsIGZvbnRGYW1pbHksIGlzSXRhbGljLCB9KSB7XHJcbiAgICBjb25zdCBpdGFsaWMgPSBpc0l0YWxpYyA/IFwiaXRhbGljIFwiIDogXCJcIjtcclxuICAgIHJldHVybiBgJHt3ZWlnaHR9ICR7aXRhbGljfSR7Zm9udFNpemV9cHgke2xpbmVIZWlnaHQgIT09IFwiXCIgPyBcIi9cIiArIGxpbmVIZWlnaHQgOiBcIlwifSAnJHtmb250RmFtaWx5fSdgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250UHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnN0IHsgd2VpZ2h0LCBpc0l0YWxpYyB9ID0gZm9udFN0eWxlQXNPYmplY3Qobm9kZS5mb250TmFtZSk7XHJcbiAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IG5vZGUuZm9udFNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgY29uc3QgZm9udEZhbWlseSA9IChfYiA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KG5vZGUpO1xyXG4gICAgY29uc3Qgc2hvcnRoYW5kID0gZm9udFNob3J0aGFuZCh7XHJcbiAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICB3ZWlnaHQsXHJcbiAgICAgICAgZm9udEZhbWlseSxcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH0pO1xyXG4gICAgaWYgKG5vZGUudGV4dFN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2MgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS50ZXh0U3R5bGVJZC50b1N0cmluZygpKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBgZm9udDogdmFyKC0tJHtzdHlsZU5hbWV9LCAke3Nob3J0aGFuZH0pO2A7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGZvbnQ6ICR7c2hvcnRoYW5kfTtgO1xyXG59XHJcbiIsIi8qXHJcblRoaXMgZmlsZSB0cmllcyB0byBjb252ZXJ0IGZpZ21hIGludG8gdGFpbHdpbmQuXHJcbkl0IHRyaWVzIHRvIGludGVycHJldCB0aGUgY3NzIGFscmVhZHkgZ2VuZXJhdGVkIGZyb20gdGhpcyBwbHVnaW4gYXMgdGFpbHdpbmQgY2xhc3Nlcy5cclxuVGhpcyB3aWxsIG5ldmVyIHdvcmsgcGVyZmVjdGx5IGJ1dCBtYXkgcHJvdmlkZSBhIHN0YXJ0aW5nIHBvaW50IGZvciBkZXZlbG9wbWVudC5cclxuKi9cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBjcmVhdGVTVkcgfSBmcm9tIFwiLi9jb2RlXCI7XHJcbmNvbnN0IHNpemVzTWFwID0ge1xyXG4gICAgXCIwcHhcIjogMCxcclxuICAgIFwiMXB4XCI6IFwicHhcIixcclxuICAgIFwiMnB4XCI6IDAuNSxcclxuICAgIFwiNHB4XCI6IDEsXHJcbiAgICBcIjZweFwiOiAxLjUsXHJcbiAgICBcIjhweFwiOiAyLFxyXG4gICAgXCIxMHB4XCI6IDIuNSxcclxuICAgIFwiMTJweFwiOiAzLFxyXG4gICAgXCIxNHB4XCI6IDMuNSxcclxuICAgIFwiMTZweFwiOiA0LFxyXG4gICAgXCIyMHB4XCI6IDUsXHJcbiAgICBcIjI0cHhcIjogNixcclxuICAgIC8qIGFuZCBtYW55IG1vcmUgKi9cclxufTtcclxuY29uc3QgZmxleERpcmVjdGlvbk1hcCA9IHtcclxuICAgIHJvdzogXCJyb3dcIixcclxuICAgIGNvbHVtbjogXCJjb2xcIixcclxufTtcclxuY29uc3QgdHdNYXAgPSB7XHJcbiAgICBwYWRkaW5nOiBzaXplc01hcCxcclxuICAgIGdhcDogc2l6ZXNNYXAsXHJcbiAgICB0b3A6IHNpemVzTWFwLFxyXG4gICAgbGVmdDogc2l6ZXNNYXAsXHJcbiAgICBcImZsZXgtZGlyZWN0aW9uXCI6IGZsZXhEaXJlY3Rpb25NYXAsXHJcbiAgICBcImJvcmRlci1yYWRpdXNcIjoge1xyXG4gICAgICAgIFwiMHB4XCI6IFwibm9uZVwiLFxyXG4gICAgICAgIFwiMnB4XCI6IFwic21cIixcclxuICAgICAgICBcIjRweFwiOiBcIlwiLFxyXG4gICAgICAgIFwiNnB4XCI6IFwibWRcIixcclxuICAgICAgICBcIjhweFwiOiBcImxnXCIsXHJcbiAgICAgICAgXCIxMnB4XCI6IFwieGxcIixcclxuICAgICAgICBcIjE2cHhcIjogXCIyeGxcIixcclxuICAgICAgICBcIjI0cHhcIjogXCIzeGxcIixcclxuICAgICAgICBcIjk5OTlweFwiOiBcImZ1bGxcIixcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7IHRyYW5zcGFyZW50OiBcInRyYW5zcGFyZW50XCIgfSxcclxuICAgIFwianVzdGlmeS1jb250ZW50XCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1pdGVtc1wiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiLFxyXG4gICAgfSxcclxuICAgIFwiYWxpZ24tc2VsZlwiOiB7XHJcbiAgICAgICAgc3RyZXRjaDogXCJzdHJldGNoXCIsXHJcbiAgICB9LFxyXG4gICAgb3ZlcmZsb3c6IHtcclxuICAgICAgICBoaWRkZW46IFwiaGlkZGVuXCIsXHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gdGFpbHdpbmQodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsID0geWllbGQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKCh0cmVlRWxlbWVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFja3kuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlc31cIj5cXG4ke3RyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlY29tZSBtb3JlIERSWS4uLlxyXG4gICAgICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICBodG1sID0geWllbGQgY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCBgJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXN9XCI+XFxuJHt0cmVlLmNoYXJhY3RlcnMgPyB0cmVlLmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKSA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiB0YWlsd2luZENsYXNzTmFtZXMoY3NzLCBub2RlKSB7XHJcbiAgICBjb25zdCBjc3NMaW5lQnlMaW5lID0gY3NzXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgLm1hcCgoZSkgPT4gZS50cmltKCkpXHJcbiAgICAgICAgLmZpbHRlcigoZSkgPT4gZSAhPT0gXCJcIik7XHJcbiAgICBjb25zdCBrZXlWYWx1ZVBhaXJzID0gY3NzTGluZUJ5TGluZS5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtleS50cmltKCksIHZhbHVlOiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudHJpbSgpIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNzc1Byb3BzTWFwID0ge1xyXG4gICAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcInJvdW5kZWRcIixcclxuICAgICAgICB3aWR0aDogXCJ3XCIsXHJcbiAgICAgICAgaGVpZ2h0OiBcImhcIixcclxuICAgICAgICBcInRleHQtYWxpZ25cIjogXCJ0ZXh0XCIsXHJcbiAgICAgICAgXCJmbGV4LWRpcmVjdGlvblwiOiBcImZsZXhcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJcIixcclxuICAgICAgICBkaXNwbGF5OiBcIlwiLFxyXG4gICAgICAgIGZsZXg6IFwiZmxleFwiLFxyXG4gICAgICAgIGdhcDogXCJnYXBcIixcclxuICAgICAgICB0b3A6IFwidG9wXCIsXHJcbiAgICAgICAgbGVmdDogXCJsZWZ0XCIsXHJcbiAgICAgICAgXCJqdXN0aWZ5LWNvbnRlbnRcIjogXCJqdXN0aWZ5XCIsXHJcbiAgICAgICAgXCJhbGlnbi1pdGVtc1wiOiBcIml0ZW1zXCIsXHJcbiAgICAgICAgXCJhbGlnbi1zZWxmXCI6IFwic2VsZlwiLFxyXG4gICAgICAgIG92ZXJmbG93OiBcIm92ZXJmbG93XCIsXHJcbiAgICB9O1xyXG4gICAgLy8gdGhlc2Ugd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSBub2RlIG9yIGFyZSBub3QgbmVlZGVkIGF0IGFsbFxyXG4gICAgY29uc3QgZXhjbHVkZUxpc3QgPSBbXCJwYWRkaW5nXCIsIFwibWFyZ2luXCIsIFwiYm94LXNpemluZ1wiXTtcclxuICAgIGNvbnN0IGlubGluZVN0eWxlcyA9IFtdO1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGtleVZhbHVlUGFpcnMubWFwKCh7IGtleSwgdmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIGlmIChleGNsdWRlTGlzdC5pbmNsdWRlcyhrZXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCB0d1ZhbHVlID0gbG9va1VwVGFpbHdpbmRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICBjb25zdCB0d0tleSA9IGNzc1Byb3BzTWFwW2tleV07XHJcbiAgICAgICAgaWYgKHR3S2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5saW5lU3R5bGVzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3R3S2V5LCB0d1ZhbHVlXS5qb2luKFwiLVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gcGFkZGluZywgZm9udFNpemUgZXRjLlxyXG4gICAgY29uc3QgY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUgPSBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzXHJcbiAgICAgICAgICAgIC5jb25jYXQoY2xhc3NOYW1lc0RpcmVjdGx5RXh0cmFjdGVkRnJvbU5vZGUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IG51bGwpXHJcbiAgICAgICAgICAgIC5qb2luKFwiIFwiKSxcclxuICAgICAgICBpbmxpbmVTdHlsZXM6IGlubGluZVN0eWxlcy5qb2luKFwiOyBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGxvb2tVcFRhaWx3aW5kVmFsdWUocHJvcEtleSwgdmFsdWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHZhbHVlc05vdE5lZWRlZFRvQ2hhbmdlID0gW1wiZGlzcGxheVwiLCBcInBvc2l0aW9uXCIsIFwidGV4dC1hbGlnblwiLCBcImZsZXhcIl07XHJcbiAgICBjb25zdCB0d1ZhbHVlID0gKF9hID0gdHdNYXBbcHJvcEtleV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt2YWx1ZV07XHJcbiAgICBpZiAodmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UuaW5jbHVkZXMocHJvcEtleSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGBbJHt2YWx1ZX1dYDtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHdWYWx1ZTtcclxufVxyXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbXTtcclxuICAgIC8qIHBhZGRpbmdzICovXHJcbiAgICBpZiAobm9kZS5wYWRkaW5nTGVmdCkge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmdzID0gW1xyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdCb3R0b20sXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0xlZnQsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAocGFkZGluZ3MuZXZlcnkoKHApID0+IHAgPT09IHBhZGRpbmdzWzBdKSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAtJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwYWRkaW5nc1swXSArIFwicHhcIil9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbXCJ0XCIsIFwiclwiLCBcImJcIiwgXCJsXCJdO1xyXG4gICAgICAgICAgICBwYWRkaW5ncy5mb3JFYWNoKChwLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goYHAke2RpcmVjdGlvbltpXX0tJHtsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwICsgXCJweFwiKX1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogcGFkZGluZ3MgZW5kICovXHJcbiAgICByZXR1cm4gY2xhc3NOYW1lcztcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=