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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvZ2V0U3R5bGVzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL3Byb3BzSGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy90YWlsd2luZC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGJvcmRlclByb3AsIGRpc3BsYXlQcm9wLCBwYWRkaW5nUHJvcCwgdHJhbnNmb3JtcywgYm9yZGVyUmFkaXVzLCBmaWxsQ29sb3IsIGJveFNoYWRvdywgZGltZW5zaW9ucywgcG9zaXRpb24sIG92ZXJmbG93LCBvcGFjaXR5LCBmb250UHJvcCwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5pbXBvcnQgeyBlc2NhcGVIdG1sLCBtYWtlU2FmZUZvckNTUyB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRTdHlsZXMgfSBmcm9tIFwiLi9nZXRTdHlsZXNcIjtcclxuLyogQmV0YSAqL1xyXG5pbXBvcnQgeyB0YWlsd2luZCB9IGZyb20gXCIuL3RhaWx3aW5kXCI7XHJcbmZ1bmN0aW9uIG5vZGVDU1Mobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnNvbGUubG9nKFwibm9kZVwiLCBub2RlKTtcclxuICAgIGlmICgoKF9hID0gbm9kZS50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSkgPT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgY29sb3I6ICR7ZmlsbENvbG9yKG5vZGUpfTtcclxuICAgICAgdGV4dC1hbGlnbjogJHsoX2IgPSBub2RlLnRleHRBbGlnbkhvcml6b250YWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpfTtcclxuICAgICAgJHtmb250UHJvcChub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgJHt0cmFuc2Zvcm1zKG5vZGUpfVxyXG4gICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgIGJhY2tncm91bmQ6ICR7ZmlsbENvbG9yKG5vZGUpfTtcclxuICAgICAgJHtib3JkZXJSYWRpdXMobm9kZSl9XHJcbiAgICAgICR7Ym9yZGVyUHJvcChub2RlKX1cclxuICAgICAgJHtvcGFjaXR5KG5vZGUpfVxyXG4gICAgICAke3BhZGRpbmdQcm9wKG5vZGUpfVxyXG4gICAgICAke2Rpc3BsYXlQcm9wKG5vZGUpfVxyXG4gICAgICAke2RpbWVuc2lvbnMobm9kZSl9XHJcbiAgICAgICR7cG9zaXRpb24obm9kZSl9XHJcbiAgICAgICR7Ym94U2hhZG93KG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgICAgJHtvdmVyZmxvdyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2VnbWVudENzcyh0ZXh0U2VnbWVudCkge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgY29sb3I6ICR7ZmlsbENvbG9yKHRleHRTZWdtZW50KX07XHJcbiAgICAgICR7Zm9udFByb3AodGV4dFNlZ21lbnQpfVxyXG4gICAgYDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVUcmVlKHNlbGVjdGlvbikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgbGV0IGNvbXBvbmVudE5hbWUgPSBcImNvbXBvbmVudFwiO1xyXG4gICAgLy8gT25seSB0byBwcmV2ZW50IGR1cGxpY2F0ZSBOYW1lc1xyXG4gICAgbGV0IGFsbE5hbWVzID0gW107XHJcbiAgICBmdW5jdGlvbiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiA9IDEpIHtcclxuICAgICAgICBjb25zdCBzdWZmaXggPSBuID4gMSA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxsTmFtZXMucHVzaChjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgc3VmZml4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTm90aGluZyBzZWxlY3RlZFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBvbmx5IDEgTm9kZVwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNlbGVjdGlvbk5vZGUgPSBzZWxlY3Rpb25bMF07XHJcbiAgICBjb25zdCBpc0NvbXBvbmVudFNldCA9IHNlbGVjdGlvbk5vZGUudHlwZSA9PT0gXCJDT01QT05FTlRfU0VUXCI7XHJcbiAgICBjb25zdCBvcmlnaW5hbE5vZGUgPSBpc0NvbXBvbmVudFNldFxyXG4gICAgICAgID8gc2VsZWN0aW9uTm9kZS5kZWZhdWx0VmFyaWFudFxyXG4gICAgICAgIDogc2VsZWN0aW9uTm9kZTtcclxuICAgIGNvbXBvbmVudE5hbWUgPSBtYWtlU2FmZUZvckNTUyhzZWxlY3Rpb25Ob2RlLm5hbWUpO1xyXG4gICAgY29uc3QgdHJlZSA9IHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIGNzczogbm9kZUNTUyhvcmlnaW5hbE5vZGUpLFxyXG4gICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3RvcihvcmlnaW5hbE5vZGUpLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICB0eXBlOiBvcmlnaW5hbE5vZGUudHlwZSxcclxuICAgICAgICBjaGFyYWN0ZXJzOiBvcmlnaW5hbE5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICBvcmlnaW5hbE5vZGU6IG9yaWdpbmFsTm9kZSxcclxuICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgIHZhcmlhbnRzOiBpc0NvbXBvbmVudFNldCAmJiBbXSxcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuLCBiYXNlU2VsZWN0b3IgPSBcIlwiKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7Y29tcG9uZW50TmFtZX1fXyR7dW5pcXVlTmFtZShtYWtlU2FmZUZvckNTUyhub2RlLm5hbWUpKX1gO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyhub2RlKSxcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgIHRleHRTZWdtZW50czogW10sXHJcbiAgICAgICAgICAgICAgICBiYXNlU2VsZWN0b3IsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbiwgYmFzZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dFNlZ21lbnRzID0gZ2V0VGV4dFNlZ21lbnRzKG5vZGUsIG5hbWUsIHVuaXF1ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudC50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICgoKF9hID0gb3JpZ2luYWxOb2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICB0aGVDaGlsZHJlbihvcmlnaW5hbE5vZGUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgICAgIC8qIENvbXBvbmVudCBWYXJpYW50cyAqL1xyXG4gICAgICAgIGlmIChpc0NvbXBvbmVudFNldCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Ob2RlLmNoaWxkcmVuLmZvckVhY2goKHZhcmlhbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhbnROYW1lID0gbWFrZVNhZmVGb3JDU1MoYCR7Y29tcG9uZW50TmFtZX0tLSR7dmFyaWFudCA9PT0gbnVsbCB8fCB2YXJpYW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YXJpYW50Lm5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYXJpYW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBub2RlQ1NTKHZhcmlhbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQXJlVmVjdG9yOiBhbGxDaGlsZHJlbkFyZVZlY3Rvcih2YXJpYW50KSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdmFyaWFudCA9PT0gbnVsbCB8fCB2YXJpYW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YXJpYW50LnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyczogdmFyaWFudCA9PT0gbnVsbCB8fCB2YXJpYW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YXJpYW50LmNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiB2YXJpYW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRTZWdtZW50czogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yOiBcIi5cIiArIHZhcmlhbnROYW1lLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIChfYSA9IHRyZWUudmFyaWFudHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG5ld1ZhcmlhbnQpO1xyXG4gICAgICAgICAgICAgICAgYWxsTmFtZXMgPSBbXTsgLy8gcmVzZXQgY2xhc3NOYW1lcyBzbyB0aGUgbmV3IGdlbmVyYXRlZCBtYXRjaCB0aGUgb25lcyBpbiB0aGUgZGVmYXVsdFZhcmlhbnRcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKHZhcmlhbnQuY2hpbGRyZW4sIG5ld1ZhcmlhbnQuY2hpbGRyZW4sIFwiLlwiICsgdmFyaWFudE5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob3JpZ2luYWxOb2RlLnR5cGUgPT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dFNlZ21lbnRzID0gZ2V0VGV4dFNlZ21lbnRzKG9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICB0cmVlLnRleHRTZWdtZW50cyA9IHRleHRTZWdtZW50cztcclxuICAgIH1cclxuICAgIHJldHVybiB0cmVlO1xyXG59XHJcbmZ1bmN0aW9uIGdldFRleHRTZWdtZW50cyhub2RlLCBjb21wb25lbnROYW1lLCB1bmlxdWVOYW1lKSB7XHJcbiAgICBjb25zdCBzZWdtZW50cyA9IG5vZGUuZ2V0U3R5bGVkVGV4dFNlZ21lbnRzKFtcclxuICAgICAgICBcImZvbnRTaXplXCIsXHJcbiAgICAgICAgXCJmb250TmFtZVwiLFxyXG4gICAgICAgIFwidGV4dERlY29yYXRpb25cIixcclxuICAgICAgICBcInRleHRDYXNlXCIsXHJcbiAgICAgICAgXCJsaW5lSGVpZ2h0XCIsXHJcbiAgICAgICAgXCJsZXR0ZXJTcGFjaW5nXCIsXHJcbiAgICAgICAgXCJmaWxsc1wiLFxyXG4gICAgICAgIFwidGV4dFN0eWxlSWRcIixcclxuICAgICAgICBcImZpbGxTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJsaXN0T3B0aW9uc1wiLFxyXG4gICAgICAgIFwiaW5kZW50YXRpb25cIixcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHNlZ21lbnRzLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHMpLCB7IG5hbWU6IGAke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1MoY29tcG9uZW50TmFtZSArIFwiLXNwYW5cIikpfWAsIGNzczogc2VnbWVudENzcyhzKSB9KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGdldFRyZWVFbGVtZW50QnlOYW1lKHRyZWUsIG5hbWUpIHtcclxuICAgIGZ1bmN0aW9uIHNlYXJjaFRyZWUoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgICAgIGlmIChlbGVtZW50Lm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuY2hpbGRyZW4gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IHJlc3VsdCA9PSBudWxsICYmIGkgPCBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzZWFyY2hUcmVlKGVsZW1lbnQuY2hpbGRyZW5baV0sIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYXJjaFRyZWUodHJlZSwgbmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gZXJhc2VEdXBsaWNhdGVDU1MobW9kaWZpZXJDU1MsIGJhc2VDU1MpIHtcclxuICAgIGNvbnN0IG1vZEFyciA9IG1vZGlmaWVyQ1NTLnNwbGl0KFwiO1wiKS5tYXAoKGwpID0+IGwudHJpbSgpKTtcclxuICAgIGNvbnN0IGJhc2VBcnIgPSBiYXNlQ1NTLnNwbGl0KFwiO1wiKS5tYXAoKGwpID0+IGwudHJpbSgpKTtcclxuICAgIC8vIGRldGVjdCBjc3MgbGluZXMgaW5jbHVkZWQgaW4gYmFzZSBidXQgbm90IGluIG1vZGlmaWVyIGFuZCB1bnNldCB0aGUgdmFsdWVcclxuICAgIGNvbnN0IGNzc1Byb3BzVG9CZVVuc2V0ID0gYmFzZUFyclxyXG4gICAgICAgIC5tYXAoKGwpID0+IHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IGwuc3BsaXQoXCI6XCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICB9KVxyXG4gICAgICAgIC5maWx0ZXIoKHByb3ApID0+IHtcclxuICAgICAgICByZXR1cm4gIW1vZGlmaWVyQ1NTLmluY2x1ZGVzKGAke3Byb3B9OmApO1xyXG4gICAgfSlcclxuICAgICAgICAubWFwKChwcm9wKSA9PiBwcm9wICsgXCI6IHVuc2V0XCIpO1xyXG4gICAgcmV0dXJuIG1vZEFyclxyXG4gICAgICAgIC5maWx0ZXIoKGxpbmUpID0+IHtcclxuICAgICAgICByZXR1cm4gIWJhc2VBcnIuaW5jbHVkZXMobGluZSk7XHJcbiAgICB9KVxyXG4gICAgICAgIC5jb25jYXQoY3NzUHJvcHNUb0JlVW5zZXQpXHJcbiAgICAgICAgLm1hcCgobCkgPT4gbCArIFwiO1wiKVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbmNvbnN0IHRyZWUgPSBjcmVhdGVUcmVlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XHJcbmNvbnNvbGUubG9nKHRyZWUpO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICBsZXQgY3NzID0gXCJcIjtcclxuICAgIGNzcyArPSBgLiR7dHJlZS5uYW1lfSB7JHt0cmVlLmNzc319XFxuYDtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCBpc1ZhcmlhbnQgPSBmYWxzZSkge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKHRyZWVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnRDU1MgPSB0cmVlRWxlbWVudC5jc3M7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIi5cIiArIHRyZWVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhcmlhbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDU1MgPSAoX2EgPSBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCB0cmVlRWxlbWVudC5uYW1lKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNzcztcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5uYW1lID09PSB0cmVlRWxlbWVudC5uYW1lID8gXCJcIiA6IFwiLlwiICsgdHJlZUVsZW1lbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ1NTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudENTUyA9IGVyYXNlRHVwbGljYXRlQ1NTKHRyZWVFbGVtZW50LmNzcywgYmFzZUNTUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRDU1MgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGNzcyArPSBgJHt0cmVlRWxlbWVudC5iYXNlU2VsZWN0b3IgfHwgXCJcIn0gJHtjbGFzc05hbWV9IHske2VsZW1lbnRDU1N9fVxcbmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnRleHRTZWdtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNzcyArPSBgLiR7cy5uYW1lfSB7JHtzLmNzc319XFxuYDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbiwgaXNWYXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyZWUudGV4dFNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0cmVlLnRleHRTZWdtZW50cy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgICAgIGNzcyArPSBgLiR7cy5uYW1lfSB7JHtzLmNzc319XFxuYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyZWUudmFyaWFudHMpIHtcclxuICAgICAgICBjc3MgKz0gXCJcXG4vKiB2YXJpYW50IHN0eWxlcyAqL1xcblwiO1xyXG4gICAgICAgIHRoZUNoaWxkcmVuKHRyZWUudmFyaWFudHMsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzcztcclxufVxyXG5mdW5jdGlvbiBwcmludEhUTUwodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsID0geWllbGQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKCh0cmVlRWxlbWVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNyZWF0ZVNWRyh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIHRyZWVFbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dHJlZUVsZW1lbnQubmFtZX1cIj5cXG4ke3RyZWVFbGVtZW50LnRleHRTZWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmludFRleHRTZWdtZW50cyh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJ9ICR7eWllbGQgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlY29tZSBtb3JlIERSWS4uLlxyXG4gICAgICAgIGlmICh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICBodG1sID0geWllbGQgY3JlYXRlU1ZHKHRyZWUub3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cIiR7dHJlZS5uYW1lfVwiPlxcbiR7dHJlZS50ZXh0U2VnbWVudHMgPyBwcmludFRleHRTZWdtZW50cyh0cmVlLnRleHRTZWdtZW50cykgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRUZXh0U2VnbWVudHMoc2VnbWVudHMpIHtcclxuICAgIGlmIChzZWdtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvLyBkbyBub3Qgd3JhcCBpbiBzcGFuXHJcbiAgICAgICAgcmV0dXJuIGVzY2FwZUh0bWwoc2VnbWVudHNbMF0uY2hhcmFjdGVycylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXG5cIikgLy8gbWFrZXMgYW5ub3lpbmcgTC1TRVAgTGluZWJyZWFrcyBkaXNhcHBlYXJcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlZ21lbnRzXHJcbiAgICAgICAgLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke3MubmFtZX1cIj4ke2VzY2FwZUh0bWwocy5jaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcblwiKSAvLyBtYWtlcyBhbm5veWluZyBMLVNFUCBMaW5lYnJlYWtzIGRpc2FwcGVhclxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIil9PC9zcGFuPmA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGFsbENoaWxkcmVuQXJlVmVjdG9yKGZyYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHJldHVybiAoKChfYSA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDAgJiZcclxuICAgICAgICAoKF9iID0gZnJhbWUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoKG4pID0+IG4udHlwZSA9PT0gXCJWRUNUT1JcIikubGVuZ3RoKSA9PT1cclxuICAgICAgICAgICAgKChfYyA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWRyhub2RlLCBjbGFzc05hbWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc3ZnID0geWllbGQgbm9kZVxyXG4gICAgICAgICAgICAuZXhwb3J0QXN5bmMoeyBmb3JtYXQ6IFwiU1ZHXCIsIHVzZUFic29sdXRlQm91bmRzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IFxyXG4gICAgICAgIC8vIFVpbnQ4QXJyYXkgdG8gc3RyaW5nIGFuZCBpbmplY3QgY2xhc3NuYW1lXHJcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZVxyXG4gICAgICAgICAgICAuYXBwbHkobnVsbCwgcmVzKVxyXG4gICAgICAgICAgICAucmVwbGFjZShcIjxzdmcgXCIsIGA8c3ZnIGNsYXNzPVwiJHtjbGFzc05hbWV9XCIgYCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xyXG4gICAgICAgIHJldHVybiBzdmc7XHJcbiAgICB9KTtcclxufVxyXG5maWdtYS5wYXJhbWV0ZXJzLm9uKFwiaW5wdXRcIiwgKHsgcGFyYW1ldGVycywga2V5LCBxdWVyeSwgcmVzdWx0IH0pID0+IHtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSBcImZyYW1ld29ya1wiOlxyXG4gICAgICAgICAgICBjb25zdCBmcmFtZXdvcmtzID0gW1wicmVhY3RcIiwgXCJodG1sXCIsIFwidGFpbHdpbmQoYmV0YSlcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcigocykgPT4gcy5pbmNsdWRlcyhxdWVyeSkpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgKHsgY29tbWFuZCwgcGFyYW1ldGVycyB9KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogNDAwIH0pO1xyXG4gICAgY29uc3QgY3NzID0gcGFyYW1ldGVycy5mcmFtZXdvcmsgPT09IFwidGFpbHdpbmQoYmV0YSlcIiA/IFwiLVwiIDogcHJpbnRDU1ModHJlZSk7XHJcbiAgICBjb25zdCBodG1sID0gcGFyYW1ldGVycy5mcmFtZXdvcmsgPT09IFwidGFpbHdpbmQoYmV0YSlcIlxyXG4gICAgICAgID8geWllbGQgdGFpbHdpbmQodHJlZSlcclxuICAgICAgICA6IHlpZWxkIHByaW50SFRNTCh0cmVlKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBjc3MsXHJcbiAgICAgICAgaHRtbCxcclxuICAgICAgICBmcmFtZXdvcms6IHBhcmFtZXRlcnMuZnJhbWV3b3JrLFxyXG4gICAgICAgIHN0eWxlczogZ2V0U3R5bGVzKGZpZ21hKSxcclxuICAgICAgICBuYW1lOiAoX2MgPSAoX2IgPSAoX2EgPSBmaWdtYS5jdXJyZW50UGFnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbGVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iWzBdKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSxcclxuICAgIH0pO1xyXG59KSk7XHJcbiIsImltcG9ydCB7IGNsZWFuU3R5bGVOYW1lIH0gZnJvbSBcIi4vaGVscGVycy9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGZvbnRTdHlsZUFzT2JqZWN0LCBsaW5lSGVpZ2h0LCBmb250U2hvcnRoYW5kLCBnZXRDb2xvciwgfSBmcm9tIFwiLi9oZWxwZXJzL3Byb3BzSGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGZpZ21hKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgcGFpbnRTdHlsZXMgPSAoX2EgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHsgbmFtZSwgcGFpbnRzIH0pID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGdldENvbG9yKHBhaW50cyA9PT0gbnVsbCB8fCBwYWludHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaW50c1swXSwgZmFsc2UpLFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHRTdHlsZXMgPSAoX2IgPSBmaWdtYS5nZXRMb2NhbFRleHRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm1hcCgoc3R5bGUpID0+IHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IHsgd2VpZ2h0LCBpc0l0YWxpYyB9ID0gZm9udFN0eWxlQXNPYmplY3Qoc3R5bGUuZm9udE5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gKF9hID0gc3R5bGUuZm9udFNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBzdHlsZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KHN0eWxlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBjbGVhblN0eWxlTmFtZShzdHlsZS5uYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIGlzSXRhbGljLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhaW50U3R5bGVzLFxyXG4gICAgICAgIHRleHRTdHlsZXMsXHJcbiAgICB9O1xyXG59XHJcbiIsIi8qIGhlbHBlcnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcclxuICAgIHZhciBoZXggPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50VG8yNTUoYykge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYyAqIDI1NSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHJnYikge1xyXG4gICAgaWYgKHR5cGVvZiByZ2IgIT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgeyByLCBnLCBiLCBhIH0gPSByZ2I7XHJcbiAgICBpZiAoIWEpIHtcclxuICAgICAgICByZXR1cm4gXCIjXCIgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJnYmFDb2xvcihvYmosIGEpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInJnYiBjb2xvciBtdXN0IGJlIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IG9iajtcclxuICAgIHJldHVybiBgcmdiYSgke2NvbXBvbmVudFRvMjU1KHIpfSwgJHtjb21wb25lbnRUbzI1NShnKX0sICR7Y29tcG9uZW50VG8yNTUoYil9LCAke2EudG9GaXhlZCgyKX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29sb3JBc0hleE9yUmdiYShmaWxsKSB7XHJcbiAgICBpZiAoIWZpbGwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiY29sb3JBc0hleE9yUmdiYSB3YXMgY2FsbGVkIHdpdGhvdXQgZmlsbCBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGwub3BhY2l0eSAmJiBmaWxsLm9wYWNpdHkgPCAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHJnYmFDb2xvcihmaWxsLmNvbG9yLCBmaWxsLm9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHJnYlRvSGV4KGZpbGwuY29sb3IpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xyXG4gICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVNhZmVGb3JDU1MobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvW15hLXowLTlfLV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICBpZiAoIW5hbWUpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCJcIikpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCByZWxldmFudCB0cmFuc2Zvcm1hdGlvbiBpbmZvcm1hdGlvbiBmcm9tIGEgKGZpZ21hKSB0cmFuc2Zvcm0gbWF0cml4XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtcyhmbSkge1xyXG4gICAgLy8gYW55dGhpbmcgd3Jvbmcgd2l0aCB0aGUgdHJhbnNmb3Jtcz8gTm90IHN1cmUgaWYgaSBzb3J0ZWQgaXQgcmlnaHQgaGVyZS4uLlxyXG4gICAgLy9jb25zdCBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG1hdHJpeCA9IHtcclxuICAgICAgICBhOiBtWzBdLFxyXG4gICAgICAgIGI6IG1bMV0sXHJcbiAgICAgICAgYzogbVsyXSxcclxuICAgICAgICBkOiBtWzNdLFxyXG4gICAgICAgIGU6IG1bNF0sXHJcbiAgICAgICAgZjogbVs1XSxcclxuICAgIH07XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZGVjb21wb3NlTWF0cml4MkRXMyhtYXRyaXgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhbmdsZTogdHJhbnNmb3Jtcy5yb3RhdGVaLFxyXG4gICAgICAgIHNjYWxlWDogdHJhbnNmb3Jtcy5zY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiB0cmFuc2Zvcm1zLnNjYWxlWSxcclxuICAgICAgICB0cmFuc2xhdGVYOiBtWzRdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG1bNV0sXHJcbiAgICAgICAgc3ZnTWF0cml4OiBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIHN2Z01hdHJpeFdpdGhvdXRUcmFuc2xhdGU6IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXV0uam9pbihcIiBcIiksXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGRlY29tcG9zZU1hdHJpeDJEVzMobSkge1xyXG4gICAgdmFyIHJvdzB4ID0gbS5hO1xyXG4gICAgdmFyIHJvdzB5ID0gbS5iO1xyXG4gICAgdmFyIHJvdzF4ID0gbS5jO1xyXG4gICAgdmFyIHJvdzF5ID0gbS5kO1xyXG4gICAgdmFyIHNjYWxlWCA9IE1hdGguc3FydChyb3cweCAqIHJvdzB4ICsgcm93MHkgKiByb3cweSk7XHJcbiAgICB2YXIgc2NhbGVZID0gTWF0aC5zcXJ0KHJvdzF4ICogcm93MXggKyByb3cxeSAqIHJvdzF5KTtcclxuICAgIC8vIElmIGRldGVybWluYW50IGlzIG5lZ2F0aXZlLCBvbmUgYXhpcyB3YXMgZmxpcHBlZC5cclxuICAgIHZhciBkZXRlcm1pbmFudCA9IHJvdzB4ICogcm93MXkgLSByb3cweSAqIHJvdzF4O1xyXG4gICAgaWYgKGRldGVybWluYW50IDwgMClcclxuICAgICAgICBpZiAocm93MHggPCByb3cxeSlcclxuICAgICAgICAgICAgLy8gRmxpcCBheGlzIHdpdGggbWluaW11bSB1bml0IHZlY3RvciBkb3QgcHJvZHVjdC5cclxuICAgICAgICAgICAgc2NhbGVYID0gLXNjYWxlWDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNjYWxlWSA9IC1zY2FsZVk7XHJcbiAgICAvLyBSZW5vcm1hbGl6ZSBtYXRyaXggdG8gcmVtb3ZlIHNjYWxlLlxyXG4gICAgaWYgKHNjYWxlWCkge1xyXG4gICAgICAgIHJvdzB4ICo9IDEgLyBzY2FsZVg7XHJcbiAgICAgICAgcm93MHkgKj0gMSAvIHNjYWxlWDtcclxuICAgIH1cclxuICAgIGlmIChzY2FsZVkpIHtcclxuICAgICAgICByb3cxeCAqPSAxIC8gc2NhbGVZO1xyXG4gICAgICAgIHJvdzF5ICo9IDEgLyBzY2FsZVk7XHJcbiAgICB9XHJcbiAgICAvLyBDb21wdXRlIHJvdGF0aW9uIGFuZCByZW5vcm1hbGl6ZSBtYXRyaXguXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHJvdzB5LCByb3cweCk7XHJcbiAgICBpZiAoYW5nbGUpIHtcclxuICAgICAgICAvLyBSb3RhdGUoLWFuZ2xlKSA9IFtjb3MoYW5nbGUpLCBzaW4oYW5nbGUpLCAtc2luKGFuZ2xlKSwgY29zKGFuZ2xlKV1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICA9IFtyb3cweCwgLXJvdzB5LCByb3cweSwgcm93MHhdXHJcbiAgICAgICAgLy8gVGhhbmtzIHRvIHRoZSBub3JtYWxpemF0aW9uIGFib3ZlLlxyXG4gICAgICAgIHZhciBzbiA9IC1yb3cweTtcclxuICAgICAgICB2YXIgY3MgPSByb3cweDtcclxuICAgICAgICB2YXIgbTExID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMiA9IHJvdzB5O1xyXG4gICAgICAgIHZhciBtMjEgPSByb3cxeDtcclxuICAgICAgICB2YXIgbTIyID0gcm93MXk7XHJcbiAgICAgICAgcm93MHggPSBjcyAqIG0xMSArIHNuICogbTIxO1xyXG4gICAgICAgIHJvdzB5ID0gY3MgKiBtMTIgKyBzbiAqIG0yMjtcclxuICAgICAgICByb3cxeCA9IC1zbiAqIG0xMSArIGNzICogbTIxO1xyXG4gICAgICAgIHJvdzF5ID0gLXNuICogbTEyICsgY3MgKiBtMjI7XHJcbiAgICB9XHJcbiAgICBtMTEgPSByb3cweDtcclxuICAgIG0xMiA9IHJvdzB5O1xyXG4gICAgbTIxID0gcm93MXg7XHJcbiAgICBtMjIgPSByb3cxeTtcclxuICAgIC8vIENvbnZlcnQgaW50byBkZWdyZWVzIGJlY2F1c2Ugb3VyIHJvdGF0aW9uIGZ1bmN0aW9ucyBleHBlY3QgaXQuXHJcbiAgICBhbmdsZSA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xyXG4gICAgLy8gVGhlIHJlcXVlc3RlZCBwYXJhbWV0ZXJzIGFyZSB0aGVuIHRoZXRhLFxyXG4gICAgLy8gc3gsIHN5LCBwaGksXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG0uZSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtLmYsXHJcbiAgICAgICAgcm90YXRlWjogYW5nbGUsXHJcbiAgICAgICAgc2NhbGVYOiBzY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiBzY2FsZVksXHJcbiAgICAgICAgbWF0cml4OiBbbTExLCBtMTIsIG0yMSwgbTIyLCAwLCAwXSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgcmdiVG9IZXgsIHJnYmFDb2xvciwgZ2V0VHJhbnNmb3JtcywgY2xlYW5TdHlsZU5hbWUgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBib3JkZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCFub2RlLnN0cm9rZXMgfHwgIW5vZGUuc3Ryb2tlV2VpZ2h0IHx8IG5vZGUuc3Ryb2tlcy5sZW5ndGggPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKCgoX2IgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnR5cGUpID09PSBcIkdSQURJRU5UX0xJTkVBUlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgIGJvcmRlci13aWR0aDogJHtub2RlLnN0cm9rZVdlaWdodH1weDsgXHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkOyBcclxuICAgIGJvcmRlci1pbWFnZTogJHtzdHJva2VDb2xvcihub2RlKX07IFxyXG4gICAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xyXG4gICAgYDtcclxuICAgIH1cclxuICAgIHJldHVybiBgYm9yZGVyOiAke25vZGUuc3Ryb2tlV2VpZ2h0fXB4IHNvbGlkICR7c3Ryb2tlQ29sb3Iobm9kZSl9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIGBwYWRkaW5nOiAke25vZGUucGFkZGluZ1RvcH1weCAke25vZGUucGFkZGluZ1JpZ2h0fXB4ICR7bm9kZS5wYWRkaW5nQm90dG9tfXB4ICR7bm9kZS5wYWRkaW5nTGVmdH1weDtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICBjb25zdCBmbGV4U2hyaW5rR3JvdyA9IG5vZGUubGF5b3V0R3JvdyA9PT0gMSA/IFwiZmxleDogMTtcIiA6IHNocmluaygpO1xyXG4gICAgZnVuY3Rpb24gc2hyaW5rKCkge1xyXG4gICAgICAgIHJldHVybiAhKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpICYmICEobm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgICAgICA/IFwiZmxleC1zaHJpbms6IDA7XCJcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5b3V0QWxpZ24gPSBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIiA/IFwiYWxpZ24tc2VsZjogc3RyZXRjaDtcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBhbGlnbm1lbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZmxleFByb3BzID0gKGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiAke2RpcmVjdGlvbn07XHJcbiAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICBhbGlnbi1pdGVtczogJHthbGlnbm1lbnRNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAganVzdGlmeS1jb250ZW50OiAke2FsaWdubWVudE1hcFtub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtc119O1xyXG4gICAgYDtcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBmbGV4UHJvcHMoXCJjb2x1bW5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gZmxleFByb3BzKFwicm93XCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiIHx8XHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgKz0gbGF5b3V0QWxpZ24gKyBmbGV4U2hyaW5rR3JvdztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRQcm9wcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGltZW5zaW9ucyhub2RlKSB7XHJcbiAgICAvKiBOT1RFOiBUaGUgT3JkZXIgb2YgdGhlc2UgaWYgc3RhdGVtZW50cyBpcyBpbXBvcnRhbnQhICovXHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xyXG4gICAgbGV0IGhlaWdodCA9IFwiXCI7XHJcbiAgICBsZXQgd2lkdGggPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICghbm9kZS5sYXlvdXRNb2RlIHx8IG5vZGUubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSAoKF9hID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJIRUlHSFRcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9ICgoX2IgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKS5pbmNsdWRlcyhcIldJRFRIXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKChfZCA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5ob3Jpem9udGFsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHx8XHJcbiAgICAgICAgKChfZSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS52ZXJ0aWNhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgaGVpZ2h0OiAke2hlaWdodH07YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgb3BhY2l0eTogJHtub2RlLm9wYWNpdHl9O2A7XHJcbn1cclxuZnVuY3Rpb24gZmluZEFic29sdXRlUGFyZW50KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnBhcmVudC50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICByZXR1cm4gZmluZEFic29sdXRlUGFyZW50KG5vZGUucGFyZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBub2RlLnBhcmVudDtcclxufVxyXG5mdW5jdGlvbiBjc3NGcm9tQ29uc3RyYWludHMobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGxldCBjb29yZCA9IFwiXCI7XHJcbiAgICBzd2l0Y2ggKChfYSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ob3Jpem9udGFsKSB7XHJcbiAgICAgICAgY2FzZSBcIk1BWFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBgcmlnaHQ6ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLndpZHRoIC0gbm9kZS53aWR0aCAtIG5vZGUueH1weDtgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiU1RSRVRDSFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBgcmlnaHQ6ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLndpZHRoIC0gbm9kZS53aWR0aCAtIG5vZGUueH1weDsgbGVmdDogJHtub2RlLnh9cHg7YDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkNFTlRFUlwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBgbGVmdDogY2FsYyg1MCUgLSAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAvIDIgLSBub2RlLnh9cHgpO2A7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBsZWZ0OiAke25vZGUueH1weDtgO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICgoX2IgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmVydGljYWwpIHtcclxuICAgICAgICBjYXNlIFwiTUFYXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBib3R0b206ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55fXB4O2A7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJTVFJFVENIXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IGBib3R0b206ICR7ZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55fXB4OyB0b3A6ICR7bm9kZS55fXB4O2A7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJDRU5URVJcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogY2FsYyg1MCUgLSAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLyAyIC0gbm9kZS55fXB4KTtgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb29yZCArPSBgdG9wOiAke25vZGUueX1weDtgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvb3JkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICBsZXQgY29vcmQgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUuaWQgIT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgIC8vIFN1cGVyIHVnbHkgYnV0IHdvcmtzIGZvciBub3cuLi5cclxuICAgICAgICBjb29yZCA9IGNzc0Zyb21Db25zdHJhaW50cyhub2RlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBvc2l0aW9uRnJvbVBhcmVudCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXTtcclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RhdGljO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5pZCA9PT0gc2VsZWN0aW9uLmlkIHx8ICgoX2EgPSBub2RlLnBhcmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGUpID09PSBcIkNPTVBPTkVOVF9TRVRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZWxhdGl2ZTtcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke25vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiTk9ORVwiIHx8ICFub2RlLnBhcmVudC5sYXlvdXRNb2RlXHJcbiAgICAgICAgICAgID8gYGFic29sdXRlOyAke2Nvb3JkfWBcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlO1wifWA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgcG9zaXRpb246ICR7cG9zaXRpb25Gcm9tUGFyZW50KG5vZGUpfVxyXG4gICAgYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8IG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcigoZWZmZWN0KSA9PiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiKTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGxldCBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Mub2Zmc2V0Lnh9cHggJHtzLm9mZnNldC55fXB4ICR7cy5yYWRpdXN9cHggJHtzLnNwcmVhZH1weCAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfWA7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICByZXR1cm4gKGAke25vZGUuZWZmZWN0U3R5bGVJZCAmJlxyXG4gICAgICAgIFwiLypcIiArICgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5lZmZlY3RTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpICsgXCIqL1wifWAgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIGNvbnN0IHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSA/IHdlaWdodE1hcFt3ZWlnaHRdIDogXCI0MDBcIixcclxuICAgICAgICBpc0l0YWxpYyxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IG5vZGUudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy9hdG0gb25seSBvbmUgZmlsbCBpcyBzdXBwb3J0ZWRcclxuICAgIGNvbnN0IGZpbGwgPSAoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3IoZmlsbCwgbm9kZS5maWxsU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUucm90YXRpb24gJiYgbm9kZS50eXBlICE9PSBcIkdST1VQXCIpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgke25vZGUucm90YXRpb24gKiAtMX1kZWcpO1xyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdyYWRpZW50TGluZWFyKGZpbGwpIHtcclxuICAgIGNvbnN0IHsgZ3JhZGllbnRTdG9wcyB9ID0gZmlsbDtcclxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc29sZS5sb2coZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICBjb25zdCBncmFkaWVudE1hcCA9IGdyYWRpZW50U3RvcHMubWFwKChzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke3JnYmFDb2xvcihzLmNvbG9yLCBzLmNvbG9yLmEpfSAke3MucG9zaXRpb24gKiAxMDB9JWA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBgbGluZWFyLWdyYWRpZW50KCR7dHJhbnNmb3Jtcy5hbmdsZSArIDkwfWRlZywgJHtncmFkaWVudE1hcC5qb2luKFwiLFwiKX0pYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIGlmICghbm9kZS5jb3JuZXJSYWRpdXMgJiYgIW5vZGUudG9wTGVmdFJhZGl1cylcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgYm9yZGVyLXJhZGl1czogJHt0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBgJHtub2RlLnRvcExlZnRSYWRpdXN9cHggJHtub2RlLnRvcFJpZ2h0UmFkaXVzfXB4ICR7bm9kZS5ib3R0b21SaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tTGVmdFJhZGl1c31weGB9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKHN0cm9rZSwgbm9kZS5zdHJva2VTdHlsZUlkKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sb3IoZmlsbE9yQ29sb3IsIHN0eWxlSWQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghZmlsbE9yQ29sb3IgfHwgIWZpbGxPckNvbG9yLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGxPckNvbG9yLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRMaW5lYXIoZmlsbE9yQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZSgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQoc3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9IGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgICAgICA6IHJnYlRvSGV4KGZpbGxPckNvbG9yLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4gYHZhcigtLSR7c3R5bGVOYW1lfSwgJHtjb2xvcn0pYDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaWxsT3JDb2xvci5vcGFjaXR5IDwgMVxyXG4gICAgICAgID8gcmdiYUNvbG9yKGZpbGxPckNvbG9yLmNvbG9yLCBmaWxsT3JDb2xvci5vcGFjaXR5KVxyXG4gICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGVPclN0eWxlKSB7XHJcbiAgICBpZiAoIW5vZGVPclN0eWxlLmxpbmVIZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAobm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0ID09PSBcIkFVVE9cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdW5pdCA9IHVuaXRNYXBbbm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBgJHtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnZhbHVlfSR7dW5pdH1gO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb250U2hvcnRoYW5kKHsgbGluZUhlaWdodCwgZm9udFNpemUsIHdlaWdodCwgZm9udEZhbWlseSwgaXNJdGFsaWMsIH0pIHtcclxuICAgIGNvbnN0IGl0YWxpYyA9IGlzSXRhbGljID8gXCJpdGFsaWMgXCIgOiBcIlwiO1xyXG4gICAgcmV0dXJuIGAke3dlaWdodH0gJHtpdGFsaWN9JHtmb250U2l6ZX1weCR7bGluZUhlaWdodCAhPT0gXCJcIiA/IFwiL1wiICsgbGluZUhlaWdodCA6IFwiXCJ9ICcke2ZvbnRGYW1pbHl9J2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgY29uc3QgeyB3ZWlnaHQsIGlzSXRhbGljIH0gPSBmb250U3R5bGVBc09iamVjdChub2RlLmZvbnROYW1lKTtcclxuICAgIGNvbnN0IGZvbnRTaXplID0gKF9hID0gbm9kZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gbm9kZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgY29uc3QgbGluZUhlaWdodFN0ciA9IGxpbmVIZWlnaHQobm9kZSk7XHJcbiAgICBjb25zdCBzaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgIGZvbnRTaXplLFxyXG4gICAgICAgIHdlaWdodCxcclxuICAgICAgICBmb250RmFtaWx5LFxyXG4gICAgICAgIGlzSXRhbGljLFxyXG4gICAgfSk7XHJcbiAgICBpZiAobm9kZS50ZXh0U3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYyA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnRleHRTdHlsZUlkLnRvU3RyaW5nKCkpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGBmb250OiB2YXIoLS0ke3N0eWxlTmFtZX0sICR7c2hvcnRoYW5kfSk7YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgZm9udDogJHtzaG9ydGhhbmR9O2A7XHJcbn1cclxuIiwiLypcclxuVGhpcyBmaWxlIHRyaWVzIHRvIGNvbnZlcnQgZmlnbWEgaW50byB0YWlsd2luZC5cclxuSXQgdHJpZXMgdG8gaW50ZXJwcmV0IHRoZSBjc3MgYWxyZWFkeSBnZW5lcmF0ZWQgZnJvbSB0aGlzIHBsdWdpbiBhcyB0YWlsd2luZCBjbGFzc2VzLlxyXG5UaGlzIHdpbGwgbmV2ZXIgd29yayBwZXJmZWN0bHkgYnV0IG1heSBwcm92aWRlIGEgc3RhcnRpbmcgcG9pbnQgZm9yIGRldmVsb3BtZW50LlxyXG4qL1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGNyZWF0ZVNWRyB9IGZyb20gXCIuL2NvZGVcIjtcclxuY29uc3Qgc2l6ZXNNYXAgPSB7XHJcbiAgICBcIjBweFwiOiAwLFxyXG4gICAgXCIxcHhcIjogXCJweFwiLFxyXG4gICAgXCIycHhcIjogMC41LFxyXG4gICAgXCI0cHhcIjogMSxcclxuICAgIFwiNnB4XCI6IDEuNSxcclxuICAgIFwiOHB4XCI6IDIsXHJcbiAgICBcIjEwcHhcIjogMi41LFxyXG4gICAgXCIxMnB4XCI6IDMsXHJcbiAgICBcIjE0cHhcIjogMy41LFxyXG4gICAgXCIxNnB4XCI6IDQsXHJcbiAgICBcIjIwcHhcIjogNSxcclxuICAgIFwiMjRweFwiOiA2LFxyXG4gICAgLyogYW5kIG1hbnkgbW9yZSAqL1xyXG59O1xyXG5jb25zdCBmbGV4RGlyZWN0aW9uTWFwID0ge1xyXG4gICAgcm93OiBcInJvd1wiLFxyXG4gICAgY29sdW1uOiBcImNvbFwiLFxyXG59O1xyXG5jb25zdCB0d01hcCA9IHtcclxuICAgIHBhZGRpbmc6IHNpemVzTWFwLFxyXG4gICAgZ2FwOiBzaXplc01hcCxcclxuICAgIHRvcDogc2l6ZXNNYXAsXHJcbiAgICBsZWZ0OiBzaXplc01hcCxcclxuICAgIFwiZmxleC1kaXJlY3Rpb25cIjogZmxleERpcmVjdGlvbk1hcCxcclxuICAgIFwiYm9yZGVyLXJhZGl1c1wiOiB7XHJcbiAgICAgICAgXCIwcHhcIjogXCJub25lXCIsXHJcbiAgICAgICAgXCIycHhcIjogXCJzbVwiLFxyXG4gICAgICAgIFwiNHB4XCI6IFwiXCIsXHJcbiAgICAgICAgXCI2cHhcIjogXCJtZFwiLFxyXG4gICAgICAgIFwiOHB4XCI6IFwibGdcIixcclxuICAgICAgICBcIjEycHhcIjogXCJ4bFwiLFxyXG4gICAgICAgIFwiMTZweFwiOiBcIjJ4bFwiLFxyXG4gICAgICAgIFwiMjRweFwiOiBcIjN4bFwiLFxyXG4gICAgICAgIFwiOTk5OXB4XCI6IFwiZnVsbFwiLFxyXG4gICAgfSxcclxuICAgIGJhY2tncm91bmQ6IHsgdHJhbnNwYXJlbnQ6IFwidHJhbnNwYXJlbnRcIiB9LFxyXG4gICAgXCJqdXN0aWZ5LWNvbnRlbnRcIjoge1xyXG4gICAgICAgIFwiZmxleC1zdGFydFwiOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgXCJmbGV4LWVuZFwiOiBcImVuZFwiLFxyXG4gICAgICAgIGNlbnRlcjogXCJjZW50ZXJcIixcclxuICAgIH0sXHJcbiAgICBcImFsaWduLWl0ZW1zXCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1zZWxmXCI6IHtcclxuICAgICAgICBzdHJldGNoOiBcInN0cmV0Y2hcIixcclxuICAgIH0sXHJcbiAgICBvdmVyZmxvdzoge1xyXG4gICAgICAgIGhpZGRlbjogXCJoaWRkZW5cIixcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiB0YWlsd2luZCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBodG1sID0gXCJcIjtcclxuICAgICAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjaGlsZHJlbiA9PT0gbnVsbCB8fCBjaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGRyZW4ubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGwgPSB5aWVsZCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoKHRyZWVFbGVtZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYWNreS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlc31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc05hbWVzfVwiIHN0eWxlPVwiJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5saW5lU3R5bGVzfVwiPlxcbiR7dHJlZUVsZW1lbnQuY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmVlRWxlbWVudC5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbil9XFxuPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYmVjb21lIG1vcmUgRFJZLi4uXHJcbiAgICAgICAgaWYgKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCB0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGh0bWwgPSB5aWVsZCBjcmVhdGVTVkcodHJlZS5vcmlnaW5hbE5vZGUsIGAke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlc31gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlc31cIj5cXG4ke3RyZWUuY2hhcmFjdGVycyA/IHRyZWUuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHRhaWx3aW5kQ2xhc3NOYW1lcyhjc3MsIG5vZGUpIHtcclxuICAgIGNvbnN0IGNzc0xpbmVCeUxpbmUgPSBjc3NcclxuICAgICAgICAucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIjtcIilcclxuICAgICAgICAubWFwKChlKSA9PiBlLnRyaW0oKSlcclxuICAgICAgICAuZmlsdGVyKChlKSA9PiBlICE9PSBcIlwiKTtcclxuICAgIGNvbnN0IGtleVZhbHVlUGFpcnMgPSBjc3NMaW5lQnlMaW5lLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGxpbmUuc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgIHJldHVybiB7IGtleToga2V5ID09PSBudWxsIHx8IGtleSA9PT0gdm9pZCAwID8gdm9pZCAwIDoga2V5LnRyaW0oKSwgdmFsdWU6IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50cmltKCkgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY3NzUHJvcHNNYXAgPSB7XHJcbiAgICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwicm91bmRlZFwiLFxyXG4gICAgICAgIHdpZHRoOiBcIndcIixcclxuICAgICAgICBoZWlnaHQ6IFwiaFwiLFxyXG4gICAgICAgIFwidGV4dC1hbGlnblwiOiBcInRleHRcIixcclxuICAgICAgICBcImZsZXgtZGlyZWN0aW9uXCI6IFwiZmxleFwiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcIlwiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiXCIsXHJcbiAgICAgICAgZmxleDogXCJmbGV4XCIsXHJcbiAgICAgICAgZ2FwOiBcImdhcFwiLFxyXG4gICAgICAgIHRvcDogXCJ0b3BcIixcclxuICAgICAgICBsZWZ0OiBcImxlZnRcIixcclxuICAgICAgICBcImp1c3RpZnktY29udGVudFwiOiBcImp1c3RpZnlcIixcclxuICAgICAgICBcImFsaWduLWl0ZW1zXCI6IFwiaXRlbXNcIixcclxuICAgICAgICBcImFsaWduLXNlbGZcIjogXCJzZWxmXCIsXHJcbiAgICAgICAgb3ZlcmZsb3c6IFwib3ZlcmZsb3dcIixcclxuICAgIH07XHJcbiAgICAvLyB0aGVzZSB3aWxsIGJlIGdlbmVyYXRlZCBmcm9tIG5vZGUgb3IgYXJlIG5vdCBuZWVkZWQgYXQgYWxsXHJcbiAgICBjb25zdCBleGNsdWRlTGlzdCA9IFtcInBhZGRpbmdcIiwgXCJtYXJnaW5cIiwgXCJib3gtc2l6aW5nXCJdO1xyXG4gICAgY29uc3QgaW5saW5lU3R5bGVzID0gW107XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0ga2V5VmFsdWVQYWlycy5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVMaXN0LmluY2x1ZGVzKGtleSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHR3VmFsdWUgPSBsb29rVXBUYWlsd2luZFZhbHVlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IHR3S2V5ID0gY3NzUHJvcHNNYXBba2V5XTtcclxuICAgICAgICBpZiAodHdLZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmxpbmVTdHlsZXMucHVzaChgJHtrZXl9OiAke3ZhbHVlfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZm9yIHByb3BzIGxpa2UgZGlzcGxheSBldGMuICovXHJcbiAgICAgICAgaWYgKHR3S2V5ID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0d1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbdHdLZXksIHR3VmFsdWVdLmpvaW4oXCItXCIpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBwYWRkaW5nLCBmb250U2l6ZSBldGMuXHJcbiAgICBjb25zdCBjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSA9IGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IGNsYXNzTmFtZXNcclxuICAgICAgICAgICAgLmNvbmNhdChjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZSkgPT4gZSAhPT0gbnVsbClcclxuICAgICAgICAgICAgLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIGlubGluZVN0eWxlczogaW5saW5lU3R5bGVzLmpvaW4oXCI7IFwiKSxcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gbG9va1VwVGFpbHdpbmRWYWx1ZShwcm9wS2V5LCB2YWx1ZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgdmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UgPSBbXCJkaXNwbGF5XCIsIFwicG9zaXRpb25cIiwgXCJ0ZXh0LWFsaWduXCIsIFwiZmxleFwiXTtcclxuICAgIGNvbnN0IHR3VmFsdWUgPSAoX2EgPSB0d01hcFtwcm9wS2V5XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ZhbHVlXTtcclxuICAgIGlmICh2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZS5pbmNsdWRlcyhwcm9wS2V5KSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYFske3ZhbHVlfV1gO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0d1ZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IFtdO1xyXG4gICAgLyogcGFkZGluZ3MgKi9cclxuICAgIGlmIChub2RlLnBhZGRpbmdMZWZ0KSB7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZ3MgPSBbXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0JvdHRvbSxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nTGVmdCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChwYWRkaW5ncy5ldmVyeSgocCkgPT4gcCA9PT0gcGFkZGluZ3NbMF0pKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChgcC0ke2xvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHBhZGRpbmdzWzBdICsgXCJweFwiKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFtcInRcIiwgXCJyXCIsIFwiYlwiLCBcImxcIl07XHJcbiAgICAgICAgICAgIHBhZGRpbmdzLmZvckVhY2goKHAsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChgcCR7ZGlyZWN0aW9uW2ldfS0ke2xvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHAgKyBcInB4XCIpfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiBwYWRkaW5ncyBlbmQgKi9cclxuICAgIHJldHVybiBjbGFzc05hbWVzO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29kZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==