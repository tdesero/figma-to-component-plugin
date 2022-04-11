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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDa0w7QUFDbkg7QUFDdkI7QUFDeEM7QUFDc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0VBQVM7QUFDeEIsb0JBQW9CO0FBQ3BCLFFBQVEsK0RBQVE7QUFDaEIsUUFBUSw4REFBTztBQUNmLFFBQVEsK0RBQVE7QUFDaEIsUUFBUSxrRUFBVztBQUNuQixRQUFRLGlFQUFVO0FBQ2xCO0FBQ0EsUUFBUSxpRUFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdFQUFTO0FBQzdCLFFBQVEsbUVBQVk7QUFDcEIsUUFBUSxpRUFBVTtBQUNsQixRQUFRLDhEQUFPO0FBQ2YsUUFBUSxrRUFBVztBQUNuQixRQUFRLGtFQUFXO0FBQ25CLFFBQVEsaUVBQVU7QUFDbEIsUUFBUSwrREFBUTtBQUNoQixRQUFRLGdFQUFTO0FBQ2pCO0FBQ0EsUUFBUSxpRUFBVTtBQUNsQixRQUFRLCtEQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFTO0FBQ3hCLFFBQVEsK0RBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGFBQWE7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGFBQWE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0VBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYyxJQUFJLFdBQVcsZ0VBQWMsYUFBYTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnRUFBYyxJQUFJLGNBQWMsSUFBSSwrREFBK0Q7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUSxTQUFTLFdBQVcsZ0VBQWMsMkJBQTJCLHVCQUF1QjtBQUN6SSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtDQUErQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3Q0FBd0MsS0FBSztBQUM3QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZLEVBQUUsVUFBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdDQUFnQyxFQUFFLFlBQVksRUFBRSxZQUFZO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixTQUFTLEVBQUUsT0FBTztBQUNqRCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsRUFBRSxPQUFPO0FBQ3pDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxpQkFBaUIsTUFBTTtBQUNyRTtBQUNBLGtDQUFrQyxFQUFFLHdDQUF3QztBQUM1RSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVSxNQUFNLCtEQUErRCxFQUFFLGlDQUFpQztBQUNySjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw0REFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sSUFBSSw0REFBVTtBQUNwRDtBQUNBLHFDQUFxQztBQUNyQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLDJCQUEyQix3Q0FBd0M7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsVUFBVTtBQUN2RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZ0NBQWdDLGdDQUFnQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxREFBUztBQUN6QjtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFWa0Q7QUFDOEM7QUFDMUY7QUFDUDtBQUNBLDBHQUEwRyxjQUFjO0FBQ3hIO0FBQ0Esa0JBQWtCLGdFQUFjO0FBQ2hDLG1CQUFtQiwrREFBUTtBQUMzQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQixFQUFFLHdFQUFpQjtBQUN0RDtBQUNBO0FBQ0EsOEJBQThCLGlFQUFVO0FBQ3hDO0FBQ0Esa0JBQWtCLGdFQUFjO0FBQ2hDLG1CQUFtQixvRUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLG1CQUFtQixrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxhQUFhO0FBQ2xHO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKK0U7QUFDeEU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQixXQUFXLG1CQUFtQjtBQUN0RTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0IsS0FBSyxrQkFBa0IsS0FBSyxtQkFBbUIsS0FBSyxpQkFBaUIsR0FBRztBQUMvRztBQUNPO0FBQ1AsNERBQTREO0FBQzVEO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsdUJBQXVCO0FBQ3ZCLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQyx1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLFVBQVUsUUFBUTtBQUMvQztBQUNPO0FBQ1A7QUFDQSxrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pEO0FBQ087QUFDUDtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IscURBQXFELEdBQUc7QUFDdkY7QUFDQTtBQUNBLCtCQUErQixxREFBcUQsSUFBSSxRQUFRLE9BQU8sR0FBRztBQUMxRztBQUNBO0FBQ0EseUNBQXlDLDRDQUE0QyxJQUFJO0FBQ3pGO0FBQ0E7QUFDQSw4QkFBOEIsT0FBTyxHQUFHO0FBQ3hDO0FBQ0E7QUFDQSxnQ0FBZ0MsdURBQXVELEdBQUc7QUFDMUY7QUFDQTtBQUNBLGdDQUFnQyx1REFBdUQsSUFBSSxPQUFPLE9BQU8sR0FBRztBQUM1RztBQUNBO0FBQ0Esd0NBQXdDLDZDQUE2QyxJQUFJO0FBQ3pGO0FBQ0E7QUFDQSw2QkFBNkIsT0FBTyxHQUFHO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QixFQUFFLE1BQU07QUFDakMsd0JBQXdCLEVBQUU7QUFDMUI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVyxLQUFLLFdBQVcsS0FBSyxTQUFTLEtBQUssU0FBUyxLQUFLLG1EQUFTLHFCQUFxQjtBQUM1RyxLQUFLO0FBQ0w7QUFDQSxlQUFlO0FBQ2YsbUhBQW1IO0FBQ25IO0FBQ0EsVUFBVTtBQUNWO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFlBQVksZ0JBQWdCO0FBQzVCLHVCQUF1Qix1REFBYTtBQUNwQztBQUNBO0FBQ0Esa0JBQWtCLG1EQUFTLHNCQUFzQixFQUFFLGlCQUFpQjtBQUNwRSxLQUFLO0FBQ0wsOEJBQThCLHNCQUFzQixPQUFPLHNCQUFzQjtBQUNqRjtBQUNPO0FBQ1A7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWEsbUJBQW1CLEtBQUssb0JBQW9CLEtBQUssdUJBQXVCLEtBQUssc0JBQXNCLEtBQUs7QUFDckg7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFjO0FBQ3hDO0FBQ0EsY0FBYyxtREFBUztBQUN2QixjQUFjLGtEQUFRO0FBQ3RCLHdCQUF3QixVQUFVLElBQUksTUFBTTtBQUM1QztBQUNBO0FBQ0EsVUFBVSxtREFBUztBQUNuQixVQUFVLGtEQUFRO0FBQ2xCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QixFQUFFLEtBQUs7QUFDbEQ7QUFDTyx5QkFBeUIscURBQXFEO0FBQ3JGO0FBQ0EsY0FBYyxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsSUFBSSwyQ0FBMkMsR0FBRyxXQUFXO0FBQ3ZHO0FBQ087QUFDUDtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDBCQUEwQix3REFBYztBQUN4Qyw4QkFBOEIsVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUN4RDtBQUNBLG9CQUFvQixXQUFXO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7O0FDM1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQkFBa0IsNEJBQTRCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGdEQUFTO0FBQ2xEO0FBQ0EsK0JBQStCO0FBQy9CLDRDQUE0QyxXQUFXO0FBQ3ZELDhDQUE4QztBQUM5QztBQUNBLDhDQUE4QztBQUM5Qyx3Q0FBd0MsV0FBVztBQUNuRCwwQ0FBMEMsTUFBTTtBQUNoRDtBQUNBLGtDQUFrQyxFQUFFLHdDQUF3QztBQUM1RSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0RBQVMsdUJBQXVCLDJEQUEyRCxXQUFXLDZEQUE2RDtBQUM1TDtBQUNBO0FBQ0EsbUNBQW1DLDJEQUEyRCxXQUFXLDZEQUE2RCxNQUFNLG1FQUFtRSxFQUFFLGlDQUFpQztBQUNsUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFlBQVk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxJQUFJLElBQUksTUFBTTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbURBQW1EO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGFBQWEsR0FBRyx5Q0FBeUM7QUFDN0YsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzTUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2dldFN0eWxlcy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9wcm9wc0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvdGFpbHdpbmQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBib3JkZXJQcm9wLCBkaXNwbGF5UHJvcCwgcGFkZGluZ1Byb3AsIHRyYW5zZm9ybXMsIGJvcmRlclJhZGl1cywgZmlsbENvbG9yLCBib3hTaGFkb3csIGRpbWVuc2lvbnMsIHBvc2l0aW9uLCBvdmVyZmxvdywgb3BhY2l0eSwgZm9udFByb3AsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZXNjYXBlSHRtbCwgbWFrZVNhZmVGb3JDU1MgfSBmcm9tIFwiLi9oZWxwZXJzL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0U3R5bGVzIH0gZnJvbSBcIi4vZ2V0U3R5bGVzXCI7XHJcbi8qIEJldGEgKi9cclxuaW1wb3J0IHsgdGFpbHdpbmQgfSBmcm9tIFwiLi90YWlsd2luZFwiO1xyXG5mdW5jdGlvbiBub2RlQ1NTKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zb2xlLmxvZyhcIm5vZGVcIiwgbm9kZSk7XHJcbiAgICBpZiAoKChfYSA9IG5vZGUudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgIHRleHQtYWxpZ246ICR7KF9iID0gbm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKX07XHJcbiAgICAgICR7Zm9udFByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwb3NpdGlvbihub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgICR7dHJhbnNmb3Jtcyhub2RlKX1cclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAke2ZpbGxDb2xvcihub2RlKX07XHJcbiAgICAgICR7Ym9yZGVyUmFkaXVzKG5vZGUpfVxyXG4gICAgICAke2JvcmRlclByb3Aobm9kZSl9XHJcbiAgICAgICR7b3BhY2l0eShub2RlKX1cclxuICAgICAgJHtwYWRkaW5nUHJvcChub2RlKX1cclxuICAgICAgJHtkaXNwbGF5UHJvcChub2RlKX1cclxuICAgICAgJHtkaW1lbnNpb25zKG5vZGUpfVxyXG4gICAgICAke3Bvc2l0aW9uKG5vZGUpfVxyXG4gICAgICAke2JveFNoYWRvdyhub2RlKX1cclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAke3RyYW5zZm9ybXMobm9kZSl9XHJcbiAgICAgICR7b3ZlcmZsb3cobm9kZSl9XHJcbiAgICBgO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNlZ21lbnRDc3ModGV4dFNlZ21lbnQpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIGNvbG9yOiAke2ZpbGxDb2xvcih0ZXh0U2VnbWVudCl9O1xyXG4gICAgICAke2ZvbnRQcm9wKHRleHRTZWdtZW50KX1cclxuICAgIGA7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIGxldCBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbiA+IDEgPyBuIDogXCJcIjtcclxuICAgICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoY2xhc3NOYW1lICsgc3VmZml4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4gKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbE5hbWVzLnB1c2goY2xhc3NOYW1lICsgc3VmZml4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIHN1ZmZpeDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk5vdGhpbmcgc2VsZWN0ZWRcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3Qgb25seSAxIE5vZGVcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgY29uc3QgaXNDb21wb25lbnRTZXQgPSBzZWxlY3Rpb25Ob2RlLnR5cGUgPT09IFwiQ09NUE9ORU5UX1NFVFwiO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gaXNDb21wb25lbnRTZXRcclxuICAgICAgICA/IHNlbGVjdGlvbk5vZGUuZGVmYXVsdFZhcmlhbnRcclxuICAgICAgICA6IHNlbGVjdGlvbk5vZGU7XHJcbiAgICBjb21wb25lbnROYW1lID0gbWFrZVNhZmVGb3JDU1Moc2VsZWN0aW9uTm9kZS5uYW1lKTtcclxuICAgIGNvbnN0IHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1Mob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogb3JpZ2luYWxOb2RlLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogb3JpZ2luYWxOb2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICB2YXJpYW50czogaXNDb21wb25lbnRTZXQgJiYgW10sXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbiwgYmFzZVNlbGVjdG9yID0gXCJcIikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke2NvbXBvbmVudE5hbWV9X18ke3VuaXF1ZU5hbWUobWFrZVNhZmVGb3JDU1Mobm9kZS5uYW1lKSl9YDtcclxuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1Mobm9kZSksXHJcbiAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSksXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiBub2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IG5vZGUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlQ2hpbGRyZW4gPT09IG51bGwgfHwgdHJlZUNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlQ2hpbGRyZW4ucHVzaChuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZUNoaWxkcmVuKG5vZGUuY2hpbGRyZW4sIG5ld0VsZW1lbnQuY2hpbGRyZW4sIGJhc2VTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IG9yaWdpbmFsTm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4ob3JpZ2luYWxOb2RlLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgICAgICAvKiBDb21wb25lbnQgVmFyaWFudHMgKi9cclxuICAgICAgICBpZiAoaXNDb21wb25lbnRTZXQpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50TmFtZSA9IG1ha2VTYWZlRm9yQ1NTKGAke2NvbXBvbmVudE5hbWV9LS0ke3ZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzczogbm9kZUNTUyh2YXJpYW50KSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogYWxsQ2hpbGRyZW5BcmVWZWN0b3IodmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM6IHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZTogdmFyaWFudCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWxlY3RvcjogXCIuXCIgKyB2YXJpYW50TmFtZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0cmVlLnZhcmlhbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChuZXdWYXJpYW50KTtcclxuICAgICAgICAgICAgICAgIGFsbE5hbWVzID0gW107IC8vIHJlc2V0IGNsYXNzTmFtZXMgc28gdGhlIG5ldyBnZW5lcmF0ZWQgbWF0Y2ggdGhlIG9uZXMgaW4gdGhlIGRlZmF1bHRWYXJpYW50XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih2YXJpYW50LmNoaWxkcmVuLCBuZXdWYXJpYW50LmNoaWxkcmVuLCBcIi5cIiArIHZhcmlhbnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGNvbnN0IHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhvcmlnaW5hbE5vZGUsIHRyZWUubmFtZSwgdW5pcXVlTmFtZSk7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5mdW5jdGlvbiBnZXRUZXh0U2VnbWVudHMobm9kZSwgY29tcG9uZW50TmFtZSwgdW5pcXVlTmFtZSkge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBub2RlLmdldFN0eWxlZFRleHRTZWdtZW50cyhbXHJcbiAgICAgICAgXCJmb250U2l6ZVwiLFxyXG4gICAgICAgIFwiZm9udE5hbWVcIixcclxuICAgICAgICBcInRleHREZWNvcmF0aW9uXCIsXHJcbiAgICAgICAgXCJ0ZXh0Q2FzZVwiLFxyXG4gICAgICAgIFwibGluZUhlaWdodFwiLFxyXG4gICAgICAgIFwibGV0dGVyU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiZmlsbHNcIixcclxuICAgICAgICBcInRleHRTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJmaWxsU3R5bGVJZFwiLFxyXG4gICAgICAgIFwibGlzdE9wdGlvbnNcIixcclxuICAgICAgICBcImluZGVudGF0aW9uXCIsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzZWdtZW50cy5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzKSwgeyBuYW1lOiBgJHt1bmlxdWVOYW1lKG1ha2VTYWZlRm9yQ1NTKGNvbXBvbmVudE5hbWUgKyBcIi1zcGFuXCIpKX1gLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCBuYW1lKSB7XHJcbiAgICBmdW5jdGlvbiBzZWFyY2hUcmVlKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNoaWxkcmVuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VhcmNoVHJlZShlbGVtZW50LmNoaWxkcmVuW2ldLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICBjb25zdCBtb2RBcnIgPSBtb2RpZmllckNTUy5zcGxpdChcIjtcIikubWFwKChsKSA9PiBsLnRyaW0oKSk7XHJcbiAgICBjb25zdCBiYXNlQXJyID0gYmFzZUNTUy5zcGxpdChcIjtcIikubWFwKChsKSA9PiBsLnRyaW0oKSk7XHJcbiAgICAvLyBkZXRlY3QgY3NzIGxpbmVzIGluY2x1ZGVkIGluIGJhc2UgYnV0IG5vdCBpbiBtb2RpZmllciBhbmQgdW5zZXQgdGhlIHZhbHVlXHJcbiAgICBjb25zdCBjc3NQcm9wc1RvQmVVbnNldCA9IGJhc2VBcnJcclxuICAgICAgICAubWFwKChsKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBsLnNwbGl0KFwiOlwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgfSlcclxuICAgICAgICAuZmlsdGVyKChwcm9wKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFtb2RpZmllckNTUy5pbmNsdWRlcyhgJHtwcm9wfTpgKTtcclxuICAgIH0pXHJcbiAgICAgICAgLm1hcCgocHJvcCkgPT4gcHJvcCArIFwiOiB1bnNldFwiKTtcclxuICAgIHJldHVybiBtb2RBcnJcclxuICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFiYXNlQXJyLmluY2x1ZGVzKGxpbmUpO1xyXG4gICAgfSlcclxuICAgICAgICAuY29uY2F0KGNzc1Byb3BzVG9CZVVuc2V0KVxyXG4gICAgICAgIC5tYXAoKGwpID0+IGwgKyBcIjtcIilcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5jb25zdCB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5jb25zb2xlLmxvZyh0cmVlKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgbGV0IGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gYC4ke3RyZWUubmFtZX0geyR7dHJlZS5jc3N9fVxcbmA7XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgaXNWYXJpYW50ID0gZmFsc2UpIHtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKCh0cmVlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50Q1NTID0gdHJlZUVsZW1lbnQuY3NzO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoaXNWYXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ1NTID0gKF9hID0gZ2V0VHJlZUVsZW1lbnRCeU5hbWUodHJlZSwgdHJlZUVsZW1lbnQubmFtZSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jc3M7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUubmFtZSA9PT0gdHJlZUVsZW1lbnQubmFtZSA/IFwiXCIgOiBcIi5cIiArIHRyZWVFbGVtZW50Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNTUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRDU1MgPSBlcmFzZUR1cGxpY2F0ZUNTUyh0cmVlRWxlbWVudC5jc3MsIGJhc2VDU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q1NTICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjc3MgKz0gYCR7dHJlZUVsZW1lbnQuYmFzZVNlbGVjdG9yIHx8IFwiXCJ9ICR7Y2xhc3NOYW1lfSB7JHtlbGVtZW50Q1NTfX1cXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gYC4ke3MubmFtZX0geyR7cy5jc3N9fVxcbmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odHJlZUVsZW1lbnQuY2hpbGRyZW4sIGlzVmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0cmVlLnRleHRTZWdtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMuZm9yRWFjaCgocykgPT4ge1xyXG4gICAgICAgICAgICBjc3MgKz0gYC4ke3MubmFtZX0geyR7cy5jc3N9fVxcbmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGlmICh0cmVlLnZhcmlhbnRzKSB7XHJcbiAgICAgICAgY3NzICs9IFwiXFxuLyogdmFyaWFudCBzdHlsZXMgKi9cXG5cIjtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLnZhcmlhbnRzLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRIVE1MKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbCA9IHlpZWxkIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcCgodHJlZUVsZW1lbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RyZWVFbGVtZW50Lm5hbWV9XCI+XFxuJHt0cmVlRWxlbWVudC50ZXh0U2VnbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJpbnRUZXh0U2VnbWVudHModHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzIHNob3VsZCBiZWNvbWUgbW9yZSBEUlkuLi5cclxuICAgICAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgaHRtbCA9IHlpZWxkIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCIke3RyZWUubmFtZX1cIj5cXG4ke3RyZWUudGV4dFNlZ21lbnRzID8gcHJpbnRUZXh0U2VnbWVudHModHJlZS50ZXh0U2VnbWVudHMpIDogXCJcIn0gJHt5aWVsZCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50VGV4dFNlZ21lbnRzKHNlZ21lbnRzKSB7XHJcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gZG8gbm90IHdyYXAgaW4gc3BhblxyXG4gICAgICAgIHJldHVybiBlc2NhcGVIdG1sKHNlZ21lbnRzWzBdLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWdtZW50c1xyXG4gICAgICAgIC5tYXAoKHMpID0+IHtcclxuICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiJHtzLm5hbWV9XCI+JHtlc2NhcGVIdG1sKHMuY2hhcmFjdGVycylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXG5cIikgLy8gbWFrZXMgYW5ub3lpbmcgTC1TRVAgTGluZWJyZWFrcyBkaXNhcHBlYXJcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpfTwvc3Bhbj5gO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBhbGxDaGlsZHJlbkFyZVZlY3RvcihmcmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICByZXR1cm4gKCgoX2EgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwICYmXHJcbiAgICAgICAgKChfYiA9IGZyYW1lLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKChuKSA9PiBuLnR5cGUgPT09IFwiVkVDVE9SXCIpLmxlbmd0aCkgPT09XHJcbiAgICAgICAgICAgICgoX2MgPSBmcmFtZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxlbmd0aCkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHN2ZyA9IHlpZWxkIG5vZGVcclxuICAgICAgICAgICAgLmV4cG9ydEFzeW5jKHsgZm9ybWF0OiBcIlNWR1wiLCB1c2VBYnNvbHV0ZUJvdW5kczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiBcclxuICAgICAgICAvLyBVaW50OEFycmF5IHRvIHN0cmluZyBhbmQgaW5qZWN0IGNsYXNzbmFtZVxyXG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGVcclxuICAgICAgICAgICAgLmFwcGx5KG51bGwsIHJlcylcclxuICAgICAgICAgICAgLnJlcGxhY2UoXCI8c3ZnIFwiLCBgPHN2ZyBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiIGApKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuICAgICAgICByZXR1cm4gc3ZnO1xyXG4gICAgfSk7XHJcbn1cclxuZmlnbWEucGFyYW1ldGVycy5vbihcImlucHV0XCIsICh7IHBhcmFtZXRlcnMsIGtleSwgcXVlcnksIHJlc3VsdCB9KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgIGNhc2UgXCJmcmFtZXdvcmtcIjpcclxuICAgICAgICAgICAgY29uc3QgZnJhbWV3b3JrcyA9IFtcInJlYWN0XCIsIFwiaHRtbFwiLCBcInRhaWx3aW5kKGJldGEpXCJdO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0U3VnZ2VzdGlvbnMoZnJhbWV3b3Jrcy5maWx0ZXIoKHMpID0+IHMuaW5jbHVkZXMocXVlcnkpKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufSk7XHJcbmZpZ21hLm9uKFwicnVuXCIsICh7IGNvbW1hbmQsIHBhcmFtZXRlcnMgfSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDQwMCB9KTtcclxuICAgIGNvbnN0IGNzcyA9IHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCIgPyBcIi1cIiA6IHByaW50Q1NTKHRyZWUpO1xyXG4gICAgY29uc3QgaHRtbCA9IHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCJcclxuICAgICAgICA/IHlpZWxkIHRhaWx3aW5kKHRyZWUpXHJcbiAgICAgICAgOiB5aWVsZCBwcmludEhUTUwodHJlZSk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgY3NzLFxyXG4gICAgICAgIGh0bWwsXHJcbiAgICAgICAgZnJhbWV3b3JrOiBwYXJhbWV0ZXJzLmZyYW1ld29yayxcclxuICAgICAgICBzdHlsZXM6IGdldFN0eWxlcyhmaWdtYSksXHJcbiAgICAgICAgbmFtZTogKF9jID0gKF9iID0gKF9hID0gZmlnbWEuY3VycmVudFBhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlswXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUsXHJcbiAgICB9KTtcclxufSkpO1xyXG4iLCJpbXBvcnQgeyBjbGVhblN0eWxlTmFtZSB9IGZyb20gXCIuL2hlbHBlcnMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBmb250U3R5bGVBc09iamVjdCwgbGluZUhlaWdodCwgZm9udFNob3J0aGFuZCwgZ2V0Q29sb3IsIH0gZnJvbSBcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlcyhmaWdtYSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IHBhaW50U3R5bGVzID0gKF9hID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKCh7IG5hbWUsIHBhaW50cyB9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUobmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBnZXRDb2xvcihwYWludHMgPT09IG51bGwgfHwgcGFpbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludHNbMF0sIGZhbHNlKSxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0U3R5bGVzID0gKF9iID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5tYXAoKHN0eWxlKSA9PiB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KHN0eWxlLmZvbnROYW1lKTtcclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IChfYSA9IHN0eWxlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gKF9iID0gc3R5bGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChzdHlsZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY2xlYW5TdHlsZU5hbWUoc3R5bGUubmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodCxcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBpc0l0YWxpYyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYWludFN0eWxlcyxcclxuICAgICAgICB0ZXh0U3R5bGVzLFxyXG4gICAgfTtcclxufVxyXG4iLCIvKiBoZWxwZXJzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcclxuICAgIGlmICh0eXBlb2YgcmdiICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcmdiO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZ2JhQ29sb3Iob2JqLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZ2IgY29sb3IgbXVzdCBiZSBvYmplY3RcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBvYmo7XHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wb25lbnRUbzI1NShyKX0sICR7Y29tcG9uZW50VG8yNTUoZyl9LCAke2NvbXBvbmVudFRvMjU1KGIpfSwgJHthLnRvRml4ZWQoMil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcclxuICAgIHJldHVybiB1bnNhZmVcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTYWZlRm9yQ1NTKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1teYS16MC05Xy1dL2csIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgaWYgKGMgPT0gMzIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIi1cIjtcclxuICAgICAgICBpZiAoYyA+PSA2NSAmJiBjIDw9IDkwKVxyXG4gICAgICAgICAgICByZXR1cm4gcy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhblN0eWxlTmFtZShuYW1lKSB7XHJcbiAgICAvL2NvbnN0IG5hbWVBcnIgPSBuYW1lLnNwbGl0KFwiL1wiKTtcclxuICAgIC8vcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWVBcnJbbmFtZUFyci5sZW5ndGggLSAxXS50cmltKCkpO1xyXG4gICAgaWYgKCFuYW1lKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhbGwgcmVsZXZhbnQgdHJhbnNmb3JtYXRpb24gaW5mb3JtYXRpb24gZnJvbSBhIChmaWdtYSkgdHJhbnNmb3JtIG1hdHJpeFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIGNvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICBjb25zdCBtYXRyaXggPSB7XHJcbiAgICAgICAgYTogbVswXSxcclxuICAgICAgICBiOiBtWzFdLFxyXG4gICAgICAgIGM6IG1bMl0sXHJcbiAgICAgICAgZDogbVszXSxcclxuICAgICAgICBlOiBtWzRdLFxyXG4gICAgICAgIGY6IG1bNV0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU1hdHJpeDJEVzMobWF0cml4KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYW5nbGU6IHRyYW5zZm9ybXMucm90YXRlWixcclxuICAgICAgICBzY2FsZVg6IHRyYW5zZm9ybXMuc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogdHJhbnNmb3Jtcy5zY2FsZVksXHJcbiAgICAgICAgdHJhbnNsYXRlWDogbVs0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxyXG4gICAgICAgIHN2Z01hdHJpeDogbS5qb2luKFwiIFwiKSxcclxuICAgICAgICBzdmdNYXRyaXhXaXRob3V0VHJhbnNsYXRlOiBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV1dLmpvaW4oXCIgXCIpLFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBkZWNvbXBvc2VNYXRyaXgyRFczKG0pIHtcclxuICAgIHZhciByb3cweCA9IG0uYTtcclxuICAgIHZhciByb3cweSA9IG0uYjtcclxuICAgIHZhciByb3cxeCA9IG0uYztcclxuICAgIHZhciByb3cxeSA9IG0uZDtcclxuICAgIHZhciBzY2FsZVggPSBNYXRoLnNxcnQocm93MHggKiByb3cweCArIHJvdzB5ICogcm93MHkpO1xyXG4gICAgdmFyIHNjYWxlWSA9IE1hdGguc3FydChyb3cxeCAqIHJvdzF4ICsgcm93MXkgKiByb3cxeSk7XHJcbiAgICAvLyBJZiBkZXRlcm1pbmFudCBpcyBuZWdhdGl2ZSwgb25lIGF4aXMgd2FzIGZsaXBwZWQuXHJcbiAgICB2YXIgZGV0ZXJtaW5hbnQgPSByb3cweCAqIHJvdzF5IC0gcm93MHkgKiByb3cxeDtcclxuICAgIGlmIChkZXRlcm1pbmFudCA8IDApXHJcbiAgICAgICAgaWYgKHJvdzB4IDwgcm93MXkpXHJcbiAgICAgICAgICAgIC8vIEZsaXAgYXhpcyB3aXRoIG1pbmltdW0gdW5pdCB2ZWN0b3IgZG90IHByb2R1Y3QuXHJcbiAgICAgICAgICAgIHNjYWxlWCA9IC1zY2FsZVg7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzY2FsZVkgPSAtc2NhbGVZO1xyXG4gICAgLy8gUmVub3JtYWxpemUgbWF0cml4IHRvIHJlbW92ZSBzY2FsZS5cclxuICAgIGlmIChzY2FsZVgpIHtcclxuICAgICAgICByb3cweCAqPSAxIC8gc2NhbGVYO1xyXG4gICAgICAgIHJvdzB5ICo9IDEgLyBzY2FsZVg7XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGVZKSB7XHJcbiAgICAgICAgcm93MXggKj0gMSAvIHNjYWxlWTtcclxuICAgICAgICByb3cxeSAqPSAxIC8gc2NhbGVZO1xyXG4gICAgfVxyXG4gICAgLy8gQ29tcHV0ZSByb3RhdGlvbiBhbmQgcmVub3JtYWxpemUgbWF0cml4LlxyXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihyb3cweSwgcm93MHgpO1xyXG4gICAgaWYgKGFuZ2xlKSB7XHJcbiAgICAgICAgLy8gUm90YXRlKC1hbmdsZSkgPSBbY29zKGFuZ2xlKSwgc2luKGFuZ2xlKSwgLXNpbihhbmdsZSksIGNvcyhhbmdsZSldXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgPSBbcm93MHgsIC1yb3cweSwgcm93MHksIHJvdzB4XVxyXG4gICAgICAgIC8vIFRoYW5rcyB0byB0aGUgbm9ybWFsaXphdGlvbiBhYm92ZS5cclxuICAgICAgICB2YXIgc24gPSAtcm93MHk7XHJcbiAgICAgICAgdmFyIGNzID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMSA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTIgPSByb3cweTtcclxuICAgICAgICB2YXIgbTIxID0gcm93MXg7XHJcbiAgICAgICAgdmFyIG0yMiA9IHJvdzF5O1xyXG4gICAgICAgIHJvdzB4ID0gY3MgKiBtMTEgKyBzbiAqIG0yMTtcclxuICAgICAgICByb3cweSA9IGNzICogbTEyICsgc24gKiBtMjI7XHJcbiAgICAgICAgcm93MXggPSAtc24gKiBtMTEgKyBjcyAqIG0yMTtcclxuICAgICAgICByb3cxeSA9IC1zbiAqIG0xMiArIGNzICogbTIyO1xyXG4gICAgfVxyXG4gICAgbTExID0gcm93MHg7XHJcbiAgICBtMTIgPSByb3cweTtcclxuICAgIG0yMSA9IHJvdzF4O1xyXG4gICAgbTIyID0gcm93MXk7XHJcbiAgICAvLyBDb252ZXJ0IGludG8gZGVncmVlcyBiZWNhdXNlIG91ciByb3RhdGlvbiBmdW5jdGlvbnMgZXhwZWN0IGl0LlxyXG4gICAgYW5nbGUgPSBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcclxuICAgIC8vIFRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycyBhcmUgdGhlbiB0aGV0YSxcclxuICAgIC8vIHN4LCBzeSwgcGhpLFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2xhdGVYOiBtLmUsXHJcbiAgICAgICAgdHJhbnNsYXRlWTogbS5mLFxyXG4gICAgICAgIHJvdGF0ZVo6IGFuZ2xlLFxyXG4gICAgICAgIHNjYWxlWDogc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogc2NhbGVZLFxyXG4gICAgICAgIG1hdHJpeDogW20xMSwgbTEyLCBtMjEsIG0yMiwgMCwgMF0sXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IHJnYlRvSGV4LCByZ2JhQ29sb3IsIGdldFRyYW5zZm9ybXMsIGNsZWFuU3R5bGVOYW1lIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gYm9yZGVyUHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICghbm9kZS5zdHJva2VzIHx8ICFub2RlLnN0cm9rZVdlaWdodCB8fCBub2RlLnN0cm9rZXMubGVuZ3RoIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmICgoKF9iID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50eXBlKSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICBib3JkZXItd2lkdGg6ICR7bm9kZS5zdHJva2VXZWlnaHR9cHg7IFxyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXHJcbiAgICBib3JkZXItaW1hZ2U6ICR7c3Ryb2tlQ29sb3Iobm9kZSl9OyBcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxuICAgIGA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGJvcmRlcjogJHtub2RlLnN0cm9rZVdlaWdodH1weCBzb2xpZCAke3N0cm9rZUNvbG9yKG5vZGUpfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUucGFkZGluZ1RvcCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdSaWdodCAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdCb3R0b20gJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nTGVmdClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBgcGFkZGluZzogJHtub2RlLnBhZGRpbmdUb3B9cHggJHtub2RlLnBhZGRpbmdSaWdodH1weCAke25vZGUucGFkZGluZ0JvdHRvbX1weCAke25vZGUucGFkZGluZ0xlZnR9cHg7YDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb3Aobm9kZSkge1xyXG4gICAgY29uc3QgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheW91dEFsaWduID0gbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIgPyBcImFsaWduLXNlbGY6IHN0cmV0Y2g7XCIgOiBcIlwiO1xyXG4gICAgY29uc3QgYWxpZ25JdGVtc01hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBjb25zdCBqdXN0aWZ5Q29udGVudE1hcCA9IHtcclxuICAgICAgICBNSU46IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgIE1BWDogXCJmbGV4LWVuZFwiLFxyXG4gICAgICAgIENFTlRFUjogXCJjZW50ZXJcIixcclxuICAgICAgICBTUEFDRV9CRVRXRUVOOiBcInNwYWNlLWJldHdlZW5cIixcclxuICAgIH07XHJcbiAgICBsZXQgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBgXHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGdhcDogJHtub2RlLml0ZW1TcGFjaW5nfXB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke2FsaWduSXRlbXNNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeUNvbnRlbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdfTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiB8fFxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzICs9IGxheW91dEFsaWduICsgZmxleFNocmlua0dyb3c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0UHJvcHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgLyogTk9URTogVGhlIE9yZGVyIG9mIHRoZXNlIGlmIHN0YXRlbWVudHMgaXMgaW1wb3J0YW50ISAqL1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcclxuICAgIGxldCBoZWlnaHQgPSBcIlwiO1xyXG4gICAgbGV0IHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSAoKF9iID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJXSURUSFwiKSlcclxuICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKCFub2RlLmNoaWxkcmVuIHx8ICgoX2MgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSA9PT0gMCkgJiYgbm9kZS50eXBlICE9PSBcIlRFWFRcIikge1xyXG4gICAgICAgIGhlaWdodCA9IG5vZGUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgICgoX2QgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaG9yaXpvbnRhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIiAmJlxyXG4gICAgICAgIG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiKSB8fFxyXG4gICAgICAgIChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB8fFxyXG4gICAgICAgICgoX2UgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudmVydGljYWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIGhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB3aWR0aDogJHt3aWR0aH07IGhlaWdodDogJHtoZWlnaHR9O2A7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcGFjaXR5KG5vZGUpIHtcclxuICAgIGlmIChub2RlLm9wYWNpdHkgPT09IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYG9wYWNpdHk6ICR7bm9kZS5vcGFjaXR5fTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgIGxldCBjb29yZCA9IFwiXCI7XHJcbiAgICBmdW5jdGlvbiBmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLnBhcmVudC50eXBlID09PSBcIkdST1VQXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlLnBhcmVudDtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmlkICE9PSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uaWQpIHtcclxuICAgICAgICAvLyBTdXBlciB1Z2x5IGJ1dCB3b3JrcyBmb3Igbm93Li4uXHJcbiAgICAgICAgaWYgKCgoX2EgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaG9yaXpvbnRhbCkgPT09IFwiTUFYXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfYiA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5ob3Jpem9udGFsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHJpZ2h0OiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLnh9cHg7IGxlZnQ6ICR7bm9kZS54fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCgoX2MgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaG9yaXpvbnRhbCkgPT09IFwiQ0VOVEVSXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGxlZnQ6IGNhbGMoNTAlIC0gJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLyAyIC0gbm9kZS54fXB4KTtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGxlZnQ6ICR7bm9kZS54fXB4O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoKF9kID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnZlcnRpY2FsKSA9PT0gXCJNQVhcIikge1xyXG4gICAgICAgICAgICBjb29yZCArPSBgYm90dG9tOiAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueX1weDtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoKF9lID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZlcnRpY2FsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYGJvdHRvbTogJHtmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC0gbm9kZS5oZWlnaHQgLSBub2RlLnl9cHg7IHRvcDogJHtub2RlLnl9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKChfZiA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi52ZXJ0aWNhbCkgPT09IFwiQ0VOVEVSXCIpIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogY2FsYyg1MCUgLSAke2ZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLyAyIC0gbm9kZS55fXB4KTtgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29vcmQgKz0gYHRvcDogJHtub2RlLnl9cHg7YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBwb3NpdGlvbkZyb21QYXJlbnQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpYztcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IHNlbGVjdGlvbi5pZCB8fCAoKF9hID0gbm9kZS5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gXCJDT01QT05FTlRfU0VUXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmU7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IGBhYnNvbHV0ZTsgJHtjb29yZH1gXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZTtcIn1gO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9uRnJvbVBhcmVudChub2RlKX1cclxuICAgIGA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fCBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3Qgc2hhZG93cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoKGVmZmVjdCkgPT4gZWZmZWN0LnR5cGUgPT09IFwiRFJPUF9TSEFET1dcIik7XHJcbiAgICBpZiAoc2hhZG93cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBsZXQgY3NzID0gXCJib3gtc2hhZG93OiBcIjtcclxuICAgIGNzcyArPSBzaGFkb3dzXHJcbiAgICAgICAgLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtzLm9mZnNldC54fXB4ICR7cy5vZmZzZXQueX1weCAke3MucmFkaXVzfXB4ICR7cy5zcHJlYWR9cHggJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX1gO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIiwgXCIpO1xyXG4gICAgcmV0dXJuIChgJHtub2RlLmVmZmVjdFN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIn1gICtcclxuICAgICAgICBjc3MgK1xyXG4gICAgICAgIFwiO1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFN0eWxlQXNPYmplY3QoZm9udE5hbWUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCBpc0l0YWxpYyA9IChfYSA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpdGFsaWNcIik7XHJcbiAgICBjb25zdCB3ZWlnaHRNYXAgPSB7XHJcbiAgICAgICAgdGhpbjogMTAwLFxyXG4gICAgICAgIFwiZXh0cmEgbGlnaHRcIjogMjAwLFxyXG4gICAgICAgIGV4dHJhbGlnaHQ6IDIwMCxcclxuICAgICAgICBsaWdodDogMzAwLFxyXG4gICAgICAgIG5vcm1hbDogNDAwLFxyXG4gICAgICAgIHJlZ3VsYXI6IDQwMCxcclxuICAgICAgICBtZWRpdW06IDUwMCxcclxuICAgICAgICBcInNlbWkgYm9sZFwiOiA2MDAsXHJcbiAgICAgICAgc2VtaWJvbGQ6IDYwMCxcclxuICAgICAgICBib2xkOiA3MDAsXHJcbiAgICAgICAgXCJleHRyYSBib2xkXCI6IDgwMCxcclxuICAgICAgICBleHRyYWJvbGQ6IDgwMCxcclxuICAgICAgICBibGFjazogOTAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHdlaWdodCA9IChfYiA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIml0YWxpY1wiLCBcIlwiKS50cmltKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0TWFwW3dlaWdodF0gPyB3ZWlnaHRNYXBbd2VpZ2h0XSA6IFwiNDAwXCIsXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICBjb25zdCBmaWxsID0gKF9hID0gbm9kZS5maWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgcmV0dXJuIGdldENvbG9yKGZpbGwsIG5vZGUuZmlsbFN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1zKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnJvdGF0aW9uICYmIG5vZGUudHlwZSAhPT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoJHtub2RlLnJvdGF0aW9uICogLTF9ZGVnKTtcclxuICAgICAgYDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBncmFkaWVudExpbmVhcihmaWxsKSB7XHJcbiAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMgfSA9IGZpbGw7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcyhmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc3QgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcCgocykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtyZ2JhQ29sb3Iocy5jb2xvciwgcy5jb2xvci5hKX0gJHtzLnBvc2l0aW9uICogMTAwfSVgO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCgke3RyYW5zZm9ybXMuYW5nbGUgKyA5MH1kZWcsICR7Z3JhZGllbnRNYXAuam9pbihcIixcIil9KWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICBpZiAoIW5vZGUuY29ybmVyUmFkaXVzICYmICFub2RlLnRvcExlZnRSYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gYGJvcmRlci1yYWRpdXM6ICR7dHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBub2RlLmNvcm5lclJhZGl1cyArIFwicHhcIlxyXG4gICAgICAgIDogYCR7bm9kZS50b3BMZWZ0UmFkaXVzfXB4ICR7bm9kZS50b3BSaWdodFJhZGl1c31weCAke25vZGUuYm90dG9tUmlnaHRSYWRpdXN9cHggJHtub2RlLmJvdHRvbUxlZnRSYWRpdXN9cHhgfTtgO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCBzdHJva2UgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihzdHJva2UsIG5vZGUuc3Ryb2tlU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yKGZpbGxPckNvbG9yLCBzdHlsZUlkKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIGlmICghZmlsbE9yQ29sb3IudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbE9yQ29sb3IudHlwZSA9PT0gXCJHUkFESUVOVF9MSU5FQVJcIikge1xyXG4gICAgICAgIHJldHVybiBncmFkaWVudExpbmVhcihmaWxsT3JDb2xvcik7XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGNsZWFuU3R5bGVOYW1lKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChzdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogcmdiVG9IZXgoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBgdmFyKC0tJHtzdHlsZU5hbWV9LCAke2NvbG9yfSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGxPckNvbG9yLm9wYWNpdHkgPCAxXHJcbiAgICAgICAgPyByZ2JhQ29sb3IoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgOiByZ2JUb0hleChmaWxsT3JDb2xvci5jb2xvcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgdW5pdE1hcCA9IHtcclxuICAgICAgICBQSVhFTFM6IFwicHhcIixcclxuICAgICAgICBQRVJDRU5UOiBcIiVcIixcclxuICAgIH07XHJcbiAgICBjb25zdCB1bml0ID0gdW5pdE1hcFtub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXRdO1xyXG4gICAgcmV0dXJuIGAke25vZGVPclN0eWxlLmxpbmVIZWlnaHQudmFsdWV9JHt1bml0fWA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoeyBsaW5lSGVpZ2h0LCBmb250U2l6ZSwgd2VpZ2h0LCBmb250RmFtaWx5LCBpc0l0YWxpYywgfSkge1xyXG4gICAgY29uc3QgaXRhbGljID0gaXNJdGFsaWMgPyBcIml0YWxpYyBcIiA6IFwiXCI7XHJcbiAgICByZXR1cm4gYCR7d2VpZ2h0fSAke2l0YWxpY30ke2ZvbnRTaXplfXB4JHtsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIn0gJyR7Zm9udEZhbWlseX0nYDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9udFByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICBjb25zdCB7IHdlaWdodCwgaXNJdGFsaWMgfSA9IGZvbnRTdHlsZUFzT2JqZWN0KG5vZGUuZm9udE5hbWUpO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSAoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAoX2IgPSBub2RlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChub2RlKTtcclxuICAgIGNvbnN0IHNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgZm9udFNpemUsXHJcbiAgICAgICAgd2VpZ2h0LFxyXG4gICAgICAgIGZvbnRGYW1pbHksXHJcbiAgICAgICAgaXNJdGFsaWMsXHJcbiAgICB9KTtcclxuICAgIGlmIChub2RlLnRleHRTdHlsZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWUoKF9jID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUudGV4dFN0eWxlSWQudG9TdHJpbmcoKSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYGZvbnQ6IHZhcigtLSR7c3R5bGVOYW1lfSwgJHtzaG9ydGhhbmR9KTtgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBmb250OiAke3Nob3J0aGFuZH07YDtcclxufVxyXG4iLCIvKlxyXG5UaGlzIGZpbGUgdHJpZXMgdG8gY29udmVydCBmaWdtYSBpbnRvIHRhaWx3aW5kLlxyXG5JdCB0cmllcyB0byBpbnRlcnByZXQgdGhlIGNzcyBhbHJlYWR5IGdlbmVyYXRlZCBmcm9tIHRoaXMgcGx1Z2luIGFzIHRhaWx3aW5kIGNsYXNzZXMuXHJcblRoaXMgd2lsbCBuZXZlciB3b3JrIHBlcmZlY3RseSBidXQgbWF5IHByb3ZpZGUgYSBzdGFydGluZyBwb2ludCBmb3IgZGV2ZWxvcG1lbnQuXHJcbiovXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgY3JlYXRlU1ZHIH0gZnJvbSBcIi4vY29kZVwiO1xyXG5jb25zdCBzaXplc01hcCA9IHtcclxuICAgIFwiMHB4XCI6IDAsXHJcbiAgICBcIjFweFwiOiBcInB4XCIsXHJcbiAgICBcIjJweFwiOiAwLjUsXHJcbiAgICBcIjRweFwiOiAxLFxyXG4gICAgXCI2cHhcIjogMS41LFxyXG4gICAgXCI4cHhcIjogMixcclxuICAgIFwiMTBweFwiOiAyLjUsXHJcbiAgICBcIjEycHhcIjogMyxcclxuICAgIFwiMTRweFwiOiAzLjUsXHJcbiAgICBcIjE2cHhcIjogNCxcclxuICAgIFwiMjBweFwiOiA1LFxyXG4gICAgXCIyNHB4XCI6IDYsXHJcbiAgICAvKiBhbmQgbWFueSBtb3JlICovXHJcbn07XHJcbmNvbnN0IGZsZXhEaXJlY3Rpb25NYXAgPSB7XHJcbiAgICByb3c6IFwicm93XCIsXHJcbiAgICBjb2x1bW46IFwiY29sXCIsXHJcbn07XHJcbmNvbnN0IHR3TWFwID0ge1xyXG4gICAgcGFkZGluZzogc2l6ZXNNYXAsXHJcbiAgICBnYXA6IHNpemVzTWFwLFxyXG4gICAgdG9wOiBzaXplc01hcCxcclxuICAgIGxlZnQ6IHNpemVzTWFwLFxyXG4gICAgXCJmbGV4LWRpcmVjdGlvblwiOiBmbGV4RGlyZWN0aW9uTWFwLFxyXG4gICAgXCJib3JkZXItcmFkaXVzXCI6IHtcclxuICAgICAgICBcIjBweFwiOiBcIm5vbmVcIixcclxuICAgICAgICBcIjJweFwiOiBcInNtXCIsXHJcbiAgICAgICAgXCI0cHhcIjogXCJcIixcclxuICAgICAgICBcIjZweFwiOiBcIm1kXCIsXHJcbiAgICAgICAgXCI4cHhcIjogXCJsZ1wiLFxyXG4gICAgICAgIFwiMTJweFwiOiBcInhsXCIsXHJcbiAgICAgICAgXCIxNnB4XCI6IFwiMnhsXCIsXHJcbiAgICAgICAgXCIyNHB4XCI6IFwiM3hsXCIsXHJcbiAgICAgICAgXCI5OTk5cHhcIjogXCJmdWxsXCIsXHJcbiAgICB9LFxyXG4gICAgYmFja2dyb3VuZDogeyB0cmFuc3BhcmVudDogXCJ0cmFuc3BhcmVudFwiIH0sXHJcbiAgICBcImp1c3RpZnktY29udGVudFwiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiLFxyXG4gICAgfSxcclxuICAgIFwiYWxpZ24taXRlbXNcIjoge1xyXG4gICAgICAgIFwiZmxleC1zdGFydFwiOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgXCJmbGV4LWVuZFwiOiBcImVuZFwiLFxyXG4gICAgICAgIGNlbnRlcjogXCJjZW50ZXJcIixcclxuICAgIH0sXHJcbiAgICBcImFsaWduLXNlbGZcIjoge1xyXG4gICAgICAgIHN0cmV0Y2g6IFwic3RyZXRjaFwiLFxyXG4gICAgfSxcclxuICAgIG92ZXJmbG93OiB7XHJcbiAgICAgICAgaGlkZGVuOiBcImhpZGRlblwiLFxyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHRhaWx3aW5kKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbCA9IHlpZWxkIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcCgodHJlZUVsZW1lbnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjcmVhdGVTVkcodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhY2t5Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5saW5lU3R5bGVzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXN9XCIgc3R5bGU9XCIke3RhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXN9XCI+XFxuJHt0cmVlRWxlbWVudC5jaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRyZWVFbGVtZW50LmNoYXJhY3RlcnMucmVwbGFjZUFsbChcIlxcblwiLCBcIjxiciAvPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKX1cXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzIHNob3VsZCBiZWNvbWUgbW9yZSBEUlkuLi5cclxuICAgICAgICBpZiAodHJlZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8IHRyZWUuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpIHtcclxuICAgICAgICAgICAgaHRtbCA9IHlpZWxkIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgYCR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lc31cIiBzdHlsZT1cIiR7dGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzfVwiPlxcbiR7dHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwifSAke3lpZWxkIHRoZUNoaWxkcmVuKHRyZWUuY2hpbGRyZW4pfVxcbjwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gdGFpbHdpbmRDbGFzc05hbWVzKGNzcywgbm9kZSkge1xyXG4gICAgY29uc3QgY3NzTGluZUJ5TGluZSA9IGNzc1xyXG4gICAgICAgIC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgIC5tYXAoKGUpID0+IGUudHJpbSgpKVxyXG4gICAgICAgIC5maWx0ZXIoKGUpID0+IGUgIT09IFwiXCIpO1xyXG4gICAgY29uc3Qga2V5VmFsdWVQYWlycyA9IGNzc0xpbmVCeUxpbmUubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gbGluZS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgcmV0dXJuIHsga2V5OiBrZXkgPT09IG51bGwgfHwga2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXkudHJpbSgpLCB2YWx1ZTogdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRyaW0oKSB9O1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjc3NQcm9wc01hcCA9IHtcclxuICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCJyb3VuZGVkXCIsXHJcbiAgICAgICAgd2lkdGg6IFwid1wiLFxyXG4gICAgICAgIGhlaWdodDogXCJoXCIsXHJcbiAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwidGV4dFwiLFxyXG4gICAgICAgIFwiZmxleC1kaXJlY3Rpb25cIjogXCJmbGV4XCIsXHJcbiAgICAgICAgcG9zaXRpb246IFwiXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJcIixcclxuICAgICAgICBmbGV4OiBcImZsZXhcIixcclxuICAgICAgICBnYXA6IFwiZ2FwXCIsXHJcbiAgICAgICAgdG9wOiBcInRvcFwiLFxyXG4gICAgICAgIGxlZnQ6IFwibGVmdFwiLFxyXG4gICAgICAgIFwianVzdGlmeS1jb250ZW50XCI6IFwianVzdGlmeVwiLFxyXG4gICAgICAgIFwiYWxpZ24taXRlbXNcIjogXCJpdGVtc1wiLFxyXG4gICAgICAgIFwiYWxpZ24tc2VsZlwiOiBcInNlbGZcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJvdmVyZmxvd1wiLFxyXG4gICAgfTtcclxuICAgIC8vIHRoZXNlIHdpbGwgYmUgZ2VuZXJhdGVkIGZyb20gbm9kZSBvciBhcmUgbm90IG5lZWRlZCBhdCBhbGxcclxuICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gW1wicGFkZGluZ1wiLCBcIm1hcmdpblwiLCBcImJveC1zaXppbmdcIl07XHJcbiAgICBjb25zdCBpbmxpbmVTdHlsZXMgPSBbXTtcclxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBrZXlWYWx1ZVBhaXJzLm1hcCgoeyBrZXksIHZhbHVlIH0pID0+IHtcclxuICAgICAgICBpZiAoZXhjbHVkZUxpc3QuaW5jbHVkZXMoa2V5KSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgdHdWYWx1ZSA9IGxvb2tVcFRhaWx3aW5kVmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgdHdLZXkgPSBjc3NQcm9wc01hcFtrZXldO1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlubGluZVN0eWxlcy5wdXNoKGAke2tleX06ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBmb3IgcHJvcHMgbGlrZSBkaXNwbGF5IGV0Yy4gKi9cclxuICAgICAgICBpZiAodHdLZXkgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0d0tleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFt0d0tleSwgdHdWYWx1ZV0uam9pbihcIi1cIik7XHJcbiAgICB9KTtcclxuICAgIC8vIHBhZGRpbmcsIGZvbnRTaXplIGV0Yy5cclxuICAgIGNvbnN0IGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlID0gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lc1xyXG4gICAgICAgICAgICAuY29uY2F0KGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChlKSA9PiBlICE9PSBudWxsKVxyXG4gICAgICAgICAgICAuam9pbihcIiBcIiksXHJcbiAgICAgICAgaW5saW5lU3R5bGVzOiBpbmxpbmVTdHlsZXMuam9pbihcIjsgXCIpLFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBsb29rVXBUYWlsd2luZFZhbHVlKHByb3BLZXksIHZhbHVlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCB2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZSA9IFtcImRpc3BsYXlcIiwgXCJwb3NpdGlvblwiLCBcInRleHQtYWxpZ25cIiwgXCJmbGV4XCJdO1xyXG4gICAgY29uc3QgdHdWYWx1ZSA9IChfYSA9IHR3TWFwW3Byb3BLZXldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdmFsdWVdO1xyXG4gICAgaWYgKHZhbHVlc05vdE5lZWRlZFRvQ2hhbmdlLmluY2x1ZGVzKHByb3BLZXkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBgWyR7dmFsdWV9XWA7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR3VmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWVzID0gW107XHJcbiAgICAvKiBwYWRkaW5ncyAqL1xyXG4gICAgaWYgKG5vZGUucGFkZGluZ0xlZnQpIHtcclxuICAgICAgICBjb25zdCBwYWRkaW5ncyA9IFtcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdSaWdodCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nQm90dG9tLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdMZWZ0LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHBhZGRpbmdzLmV2ZXJ5KChwKSA9PiBwID09PSBwYWRkaW5nc1swXSkpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGBwLSR7bG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcGFkZGluZ3NbMF0gKyBcInB4XCIpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gW1widFwiLCBcInJcIiwgXCJiXCIsIFwibFwiXTtcclxuICAgICAgICAgICAgcGFkZGluZ3MuZm9yRWFjaCgocCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGBwJHtkaXJlY3Rpb25baV19LSR7bG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcCArIFwicHhcIil9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHBhZGRpbmdzIGVuZCAqL1xyXG4gICAgcmV0dXJuIGNsYXNzTmFtZXM7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9