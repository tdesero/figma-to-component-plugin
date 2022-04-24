/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createSVG = void 0;
var propsHelpers_1 = __webpack_require__(/*! ./helpers/propsHelpers */ "./src/helpers/propsHelpers.ts");
var helpers_1 = __webpack_require__(/*! ./helpers/helpers */ "./src/helpers/helpers.ts");
var getStyles_1 = __webpack_require__(/*! ./getStyles */ "./src/getStyles.ts");
/* Beta */
var tailwind_1 = __webpack_require__(/*! ./tailwind */ "./src/tailwind.ts");
function nodeCSS(node) {
    var _a, _b;
    console.log("node", node);
    if (((_a = node.type) === null || _a === void 0 ? void 0 : _a.toString()) === "TEXT") {
        return "\n      color: ".concat((0, propsHelpers_1.fillColor)(node), ";\n      text-align: ").concat((_b = node.textAlignHorizontal) === null || _b === void 0 ? void 0 : _b.toLowerCase(), ";\n      ").concat((0, propsHelpers_1.fontProp)(node), "\n      ").concat((0, propsHelpers_1.textTransformProp)(node), "\n      ").concat((0, propsHelpers_1.textDecorationProp)(node), "\n      ").concat((0, propsHelpers_1.opacity)(node), "\n      ").concat((0, propsHelpers_1.position)(node), "\n      ").concat((0, propsHelpers_1.displayProp)(node), "\n      ").concat((0, propsHelpers_1.dimensions)(node), "\n      margin: 0;\n      ").concat((0, propsHelpers_1.transforms)(node), "\n    ");
    }
    else {
        return "\n      box-sizing: border-box;\n      background: ".concat((0, propsHelpers_1.fillColor)(node), ";\n      ").concat((0, propsHelpers_1.borderRadius)(node), "\n      ").concat((0, propsHelpers_1.borderProp)(node), "\n      ").concat((0, propsHelpers_1.opacity)(node), "\n      ").concat((0, propsHelpers_1.paddingProp)(node), "\n      ").concat((0, propsHelpers_1.displayProp)(node), "\n      ").concat((0, propsHelpers_1.dimensions)(node), "\n      ").concat((0, propsHelpers_1.position)(node), "\n      ").concat((0, propsHelpers_1.boxShadow)(node), "\n      margin: 0;\n      ").concat((0, propsHelpers_1.transforms)(node), "\n      ").concat((0, propsHelpers_1.overflow)(node), "\n    ");
    }
}
function segmentCss(textSegment) {
    return "\n      color: ".concat((0, propsHelpers_1.fillColor)(textSegment), ";\n      ").concat((0, propsHelpers_1.fontProp)(textSegment), "\n      ").concat((0, propsHelpers_1.textTransformProp)(textSegment), "\n      ").concat((0, propsHelpers_1.textDecorationProp)(textSegment), "\n    ");
}
function createTree(selection) {
    var _a;
    var componentName = "component";
    // Only to prevent duplicate Names
    var allNames = [];
    function uniqueName(className, n) {
        if (n === void 0) { n = 1; }
        var suffix = n > 1 ? n : "";
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
    var selectionNode = selection[0];
    var isComponentSet = selectionNode.type === "COMPONENT_SET";
    var originalNode = isComponentSet
        ? selectionNode.defaultVariant
        : selectionNode;
    componentName = (0, helpers_1.makeSafeForCSS)(selectionNode.name);
    var tree = {
        name: componentName,
        css: nodeCSS(originalNode),
        allChildrenAreVector: (0, helpers_1.allChildrenAreVector)(originalNode),
        children: [],
        type: originalNode.type,
        characters: originalNode.characters,
        originalNode: originalNode,
        textSegments: [],
        variants: isComponentSet && []
    };
    function theChildren(children, treeChildren, baseSelector) {
        if (baseSelector === void 0) { baseSelector = ""; }
        children.forEach(function (node) {
            var _a;
            if (!node.visible)
                return;
            var name = "".concat(componentName, "__").concat(uniqueName((0, helpers_1.makeSafeForCSS)(node.name)));
            var newElement = {
                name: name,
                css: nodeCSS(node),
                allChildrenAreVector: (0, helpers_1.allChildrenAreVector)(node),
                children: [],
                type: node.type,
                characters: node.characters,
                originalNode: node,
                textSegments: [],
                baseSelector: baseSelector
            };
            treeChildren === null || treeChildren === void 0 ? void 0 : treeChildren.push(newElement);
            if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(node.children, newElement.children, baseSelector);
            }
            if (node.type === "TEXT") {
                var textSegments = getTextSegments(node, name, uniqueName);
                newElement.textSegments = textSegments;
            }
        });
    }
    if (((_a = originalNode.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        theChildren(originalNode.children, tree.children);
        /* Component Variants */
        if (isComponentSet) {
            selectionNode.children.forEach(function (variant) {
                var _a;
                var variantName = (0, helpers_1.makeSafeForCSS)("".concat(componentName, "--").concat(variant === null || variant === void 0 ? void 0 : variant.name));
                var newVariant = {
                    name: componentName,
                    css: nodeCSS(variant),
                    allChildrenAreVector: (0, helpers_1.allChildrenAreVector)(variant),
                    children: [],
                    type: variant === null || variant === void 0 ? void 0 : variant.type,
                    characters: variant === null || variant === void 0 ? void 0 : variant.characters,
                    originalNode: variant,
                    textSegments: [],
                    baseSelector: "." + variantName
                };
                (_a = tree.variants) === null || _a === void 0 ? void 0 : _a.push(newVariant);
                allNames = []; // reset classNames so the new generated match the ones in the defaultVariant
                theChildren(variant.children, newVariant.children, "." + variantName);
            });
        }
    }
    if (originalNode.type === "TEXT") {
        var textSegments = getTextSegments(originalNode, tree.name, uniqueName);
        tree.textSegments = textSegments;
    }
    return tree;
}
function getTextSegments(node, componentName, uniqueName) {
    var segments = node.getStyledTextSegments([
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
    return segments.map(function (s) {
        return __assign(__assign({}, s), { name: "".concat(uniqueName((0, helpers_1.makeSafeForCSS)(componentName + "-span"))), css: segmentCss(s) });
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
    var modArr = modifierCSS.split(";").map(function (l) { return l.trim(); });
    var baseArr = baseCSS.split(";").map(function (l) { return l.trim(); });
    // detect css lines included in base but not in modifier and unset the value
    var cssPropsToBeUnset = baseArr
        .map(function (l) {
        var _a;
        return (_a = l.split(":")) === null || _a === void 0 ? void 0 : _a[0];
    })
        .filter(function (prop) {
        return !modifierCSS.includes("".concat(prop, ":"));
    })
        .map(function (prop) { return prop + ": unset"; });
    return modArr
        .filter(function (line) {
        return !baseArr.includes(line);
    })
        .concat(cssPropsToBeUnset)
        .map(function (l) { return l + ";"; })
        .join("");
}
var tree = createTree(figma.currentPage.selection);
console.log(tree);
function printCSS(tree) {
    var css = "";
    css += ".".concat(tree.name, " {").concat(tree.css, "}\n");
    function theChildren(children, isVariant) {
        if (isVariant === void 0) { isVariant = false; }
        children.forEach(function (treeElement) {
            var _a;
            var elementCSS = treeElement.css;
            var className = "." + treeElement.name;
            if (isVariant) {
                var baseCSS = (_a = getTreeElementByName(tree, treeElement.name)) === null || _a === void 0 ? void 0 : _a.css;
                className =
                    tree.name === treeElement.name ? "" : "." + treeElement.name;
                if (baseCSS) {
                    elementCSS = eraseDuplicateCSS(treeElement.css, baseCSS);
                }
            }
            if (elementCSS !== "") {
                css += "".concat(treeElement.baseSelector || "", " ").concat(className, " {").concat(elementCSS, "}\n");
            }
            if (treeElement.allChildrenAreVector) {
                return;
            }
            if (treeElement.textSegments.length > 1) {
                treeElement.textSegments.forEach(function (s) {
                    css += ".".concat(s.name, " {").concat(s.css, "}\n");
                });
            }
            if (treeElement.children.length > 0) {
                theChildren(treeElement.children, isVariant);
            }
        });
    }
    if (tree.textSegments.length > 1) {
        tree.textSegments.forEach(function (s) {
            css += ".".concat(s.name, " {").concat(s.css, "}\n");
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
    return __awaiter(this, void 0, void 0, function () {
        function theChildren(children) {
            return __awaiter(this, void 0, void 0, function () {
                var all;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!((children === null || children === void 0 ? void 0 : children.length) > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(children.map(function (treeElement) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!(treeElement.type === "VECTOR" ||
                                                    treeElement.type === "BOOLEAN_OPERATION" ||
                                                    treeElement.allChildrenAreVector)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, createSVG(treeElement.originalNode, treeElement.name)];
                                            case 1: return [2 /*return*/, _c.sent()];
                                            case 2:
                                                _b = (_a = "<div class=\"".concat(treeElement.name, "\">\n").concat(treeElement.textSegments
                                                    ? printTextSegments(treeElement.textSegments)
                                                    : "", " ")).concat;
                                                return [4 /*yield*/, theChildren(treeElement.children)];
                                            case 3: return [2 /*return*/, _b.apply(_a, [_c.sent(), "\n</div>"])];
                                        }
                                    });
                                }); }))];
                        case 1:
                            all = _a.sent();
                            return [2 /*return*/, all.join("")];
                        case 2: return [2 /*return*/, ""];
                    }
                });
            });
        }
        var html, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    html = "";
                    if (!(tree.type === "VECTOR" ||
                        tree.type === "BOOLEAN_OPERATION" ||
                        tree.allChildrenAreVector)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createSVG(tree.originalNode, tree.name)];
                case 1:
                    html = _d.sent();
                    return [3 /*break*/, 4];
                case 2:
                    _a = html;
                    _c = (_b = "<div class=\"".concat(tree.name, "\">\n").concat(tree.textSegments ? printTextSegments(tree.textSegments) : "", " ")).concat;
                    return [4 /*yield*/, theChildren(tree.children)];
                case 3:
                    html = _a + _c.apply(_b, [_d.sent(), "\n</div>"]);
                    _d.label = 4;
                case 4: return [2 /*return*/, html];
            }
        });
    });
}
function printTextSegments(segments) {
    if (segments.length === 1) {
        // do not wrap in span
        return (0, helpers_1.escapeHtml)(segments[0].characters)
            .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
            .replace(/\n/g, "<br/>");
    }
    return segments
        .map(function (s) {
        return "<span class=\"".concat(s.name, "\">").concat((0, helpers_1.escapeHtml)(s.characters)
            .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
            .replace(/\n/g, "<br/>"), "</span>");
    })
        .join("");
}
function createSVG(node, className) {
    return __awaiter(this, void 0, void 0, function () {
        var svg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node
                        .exportAsync({ format: "SVG", useAbsoluteBounds: true })
                        .then(function (res) {
                        // Uint8Array to string and inject classname
                        return String.fromCharCode
                            .apply(null, res)
                            .replace("<svg ", "<svg class=\"".concat(className, "\" "));
                    })["catch"](function (err) { return console.error(err); })];
                case 1:
                    svg = _a.sent();
                    return [2 /*return*/, svg];
            }
        });
    });
}
exports.createSVG = createSVG;
figma.parameters.on("input", function (_a) {
    var parameters = _a.parameters, key = _a.key, query = _a.query, result = _a.result;
    switch (key) {
        case "framework":
            var frameworks = ["react", "html", "tailwind(beta)"];
            result.setSuggestions(frameworks.filter(function (s) { return s.includes(query); }));
            break;
        default:
            return;
    }
});
figma.on("run", function (_a) {
    var command = _a.command, parameters = _a.parameters;
    return __awaiter(void 0, void 0, void 0, function () {
        var css, html, _b;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    figma.showUI(__html__, { height: 600, width: 500 });
                    css = parameters.framework === "tailwind(beta)" ? "-" : printCSS(tree);
                    if (!(parameters.framework === "tailwind(beta)")) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, tailwind_1.tailwind)(tree)];
                case 1:
                    _b = _f.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, printHTML(tree)];
                case 3:
                    _b = _f.sent();
                    _f.label = 4;
                case 4:
                    html = _b;
                    figma.ui.postMessage({
                        css: css,
                        html: html,
                        framework: parameters.framework,
                        styles: (0, getStyles_1.getStyles)(figma),
                        name: (_e = (_d = (_c = figma.currentPage) === null || _c === void 0 ? void 0 : _c.selection) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.name
                    });
                    return [2 /*return*/];
            }
        });
    });
});


/***/ }),

/***/ "./src/getStyles.ts":
/*!**************************!*\
  !*** ./src/getStyles.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getStyles = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers/helpers */ "./src/helpers/helpers.ts");
var propsHelpers_1 = __webpack_require__(/*! ./helpers/propsHelpers */ "./src/helpers/propsHelpers.ts");
function getStyles(figma) {
    var _a, _b;
    var paintStyles = (_a = figma.getLocalPaintStyles()) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
        var name = _a.name, paints = _a.paints;
        return {
            name: (0, helpers_1.cleanStyleName)(name),
            value: (0, propsHelpers_1.getColor)(paints === null || paints === void 0 ? void 0 : paints[0], false)
        };
    });
    var textStyles = (_b = figma.getLocalTextStyles()) === null || _b === void 0 ? void 0 : _b.map(function (style) {
        var _a, _b;
        var _c = (0, propsHelpers_1.fontStyleAsObject)(style.fontName), weight = _c.weight, isItalic = _c.isItalic;
        var fontSize = (_a = style.fontSize) === null || _a === void 0 ? void 0 : _a.toString();
        var fontFamily = (_b = style.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
        var lineHeightStr = (0, propsHelpers_1.lineHeight)(style);
        return {
            name: (0, helpers_1.cleanStyleName)(style.name),
            value: (0, propsHelpers_1.fontShorthand)({
                lineHeight: lineHeightStr,
                fontSize: fontSize,
                weight: weight,
                fontFamily: fontFamily,
                isItalic: isItalic
            })
        };
    });
    return {
        paintStyles: paintStyles,
        textStyles: textStyles
    };
}
exports.getStyles = getStyles;


/***/ }),

/***/ "./src/helpers/helpers.ts":
/*!********************************!*\
  !*** ./src/helpers/helpers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.getTransforms = exports.willBeRenderedAsSVG = exports.allChildrenAreVector = exports.cleanStyleName = exports.makeSafeForCSS = exports.escapeHtml = exports.colorAsHexOrRgba = exports.rgbaColor = exports.rgbToHex = exports.componentTo255 = exports.componentToHex = void 0;
/* helpers */
function componentToHex(c) {
    var hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
exports.componentToHex = componentToHex;
function componentTo255(c) {
    return Math.round(c * 255);
}
exports.componentTo255 = componentTo255;
function rgbToHex(rgb) {
    if (typeof rgb !== "object")
        return;
    var r = rgb.r, g = rgb.g, b = rgb.b, a = rgb.a;
    if (!a) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}
exports.rgbToHex = rgbToHex;
function rgbaColor(obj, a) {
    if (typeof obj !== "object") {
        console.error("rgb color must be object");
        return;
    }
    var r = obj.r, g = obj.g, b = obj.b;
    return "rgba(".concat(componentTo255(r), ", ").concat(componentTo255(g), ", ").concat(componentTo255(b), ", ").concat(a.toFixed(2), ")");
}
exports.rgbaColor = rgbaColor;
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
exports.colorAsHexOrRgba = colorAsHexOrRgba;
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
exports.escapeHtml = escapeHtml;
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
exports.makeSafeForCSS = makeSafeForCSS;
function cleanStyleName(name) {
    //const nameArr = name.split("/");
    //return makeSafeForCSS(nameArr[nameArr.length - 1].trim());
    if (!name)
        return;
    return makeSafeForCSS(name.replaceAll(" ", ""));
}
exports.cleanStyleName = cleanStyleName;
function allChildrenAreVector(node) {
    var _a, _b, _c;
    var vectorTypes = ["VECTOR", "BOOLEAN_OPERATION"];
    return (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        ((_b = node.children) === null || _b === void 0 ? void 0 : _b.filter(function (n) { return vectorTypes.includes(n.type); }).length) ===
            ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length));
}
exports.allChildrenAreVector = allChildrenAreVector;
function willBeRenderedAsSVG(node) {
    return (allChildrenAreVector(node) ||
        node.type === "VECTOR" ||
        node.type === "BOOLEAN_OPERATION");
}
exports.willBeRenderedAsSVG = willBeRenderedAsSVG;
/**
 * Returns all relevant transformation information from a (figma) transform matrix
 */
function getTransforms(fm) {
    // anything wrong with the transforms? Not sure if i sorted it right here...
    //const m = [fm[0][0], fm[0][1], fm[1][0], fm[1][1], fm[0][2], fm[1][2]];
    var m = [fm[0][0], fm[0][1], fm[1][0], fm[1][1], fm[0][2], fm[1][2]];
    var matrix = {
        a: m[0],
        b: m[1],
        c: m[2],
        d: m[3],
        e: m[4],
        f: m[5]
    };
    var transforms = decomposeMatrix2DW3(matrix);
    return {
        angle: transforms.rotateZ,
        scaleX: transforms.scaleX,
        scaleY: transforms.scaleY,
        translateX: m[4],
        translateY: m[5],
        svgMatrix: m.join(" "),
        svgMatrixWithoutTranslate: [fm[0][0], fm[0][1], fm[1][0], fm[1][1]].join(" ")
    };
}
exports.getTransforms = getTransforms;
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
        matrix: [m11, m12, m21, m22, 0, 0]
    };
}


/***/ }),

/***/ "./src/helpers/propsHelpers.ts":
/*!*************************************!*\
  !*** ./src/helpers/propsHelpers.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.textDecorationProp = exports.textTransformProp = exports.fontProp = exports.fontShorthand = exports.lineHeight = exports.getColor = exports.strokeColor = exports.borderRadius = exports.gradientLinear = exports.transforms = exports.fillColor = exports.fontStyleAsObject = exports.boxShadow = exports.position = exports.opacity = exports.overflow = exports.dimensions = exports.displayProp = exports.paddingProp = exports.borderProp = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/helpers/helpers.ts");
function borderProp(node) {
    var _a, _b;
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    if (((_b = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "GRADIENT_LINEAR") {
        return "\n    border-width: ".concat(node.strokeWeight, "px; \n    border-style: solid; \n    border-image: ").concat(strokeColor(node), "; \n    border-image-slice: 1;\n    ");
    }
    return "border: ".concat(node.strokeWeight, "px solid ").concat(strokeColor(node), ";");
}
exports.borderProp = borderProp;
function paddingProp(node) {
    if (!node.paddingTop &&
        !node.paddingRight &&
        !node.paddingBottom &&
        !node.paddingLeft)
        return "";
    return "padding: ".concat(node.paddingTop, "px ").concat(node.paddingRight, "px ").concat(node.paddingBottom, "px ").concat(node.paddingLeft, "px;");
}
exports.paddingProp = paddingProp;
function displayProp(node) {
    var flexShrinkGrow = node.layoutGrow === 1 ? "flex: 1;" : shrink();
    function shrink() {
        return !(node.type === "TEXT") && !(node.primaryAxisSizingMode === "AUTO")
            ? "flex-shrink: 0;"
            : "";
    }
    var layoutAlign = node.layoutAlign === "STRETCH" ? "align-self: stretch;" : "";
    var alignmentMap = {
        MIN: "flex-start",
        MAX: "flex-end",
        CENTER: "center",
        SPACE_BETWEEN: "space-between"
    };
    var flexProps = function (direction) {
        return "\n      display: flex;\n      flex-direction: ".concat(direction, ";\n      gap: ").concat(node.itemSpacing, "px;\n      align-items: ").concat(alignmentMap[node.counterAxisAlignItems], ";\n      justify-content: ").concat(alignmentMap[node.primaryAxisAlignItems], ";\n    ");
    };
    var layoutProps = "";
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
exports.displayProp = displayProp;
function dimensions(node) {
    var _a, _b, _c, _d, _e;
    // in this case the dimensions are defined inside the svg
    if ((0, helpers_1.willBeRenderedAsSVG)(node)) {
        return "";
    }
    /* NOTE: The Order of these if statements is important! */
    var height = "";
    var width = "";
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
    return "width: ".concat(width, "; height: ").concat(height, ";");
}
exports.dimensions = dimensions;
function overflow(node) {
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "overflow: visible;";
    return node.clipsContent ? "overflow: hidden;" : "";
}
exports.overflow = overflow;
function opacity(node) {
    if (node.opacity === 1)
        return "";
    return "opacity: ".concat(node.opacity, ";");
}
exports.opacity = opacity;
function findAbsoluteParent(node) {
    if (node.parent.type === "GROUP") {
        return findAbsoluteParent(node.parent);
    }
    return node.parent;
}
function cssFromConstraints(node) {
    var _a, _b;
    var coord = "";
    switch ((_a = node.constraints) === null || _a === void 0 ? void 0 : _a.horizontal) {
        case "MAX":
            coord += "right: ".concat(findAbsoluteParent(node).width - node.width - node.x, "px;");
            break;
        case "STRETCH":
            coord += "right: ".concat(findAbsoluteParent(node).width - node.width - node.x, "px; left: ").concat(node.x, "px;");
            break;
        case "CENTER":
            coord += "left: calc(50% - ".concat(findAbsoluteParent(node).width / 2 - node.x, "px);");
            break;
        default:
            coord += "left: ".concat(node.x, "px;");
    }
    switch ((_b = node.constraints) === null || _b === void 0 ? void 0 : _b.vertical) {
        case "MAX":
            coord += "bottom: ".concat(findAbsoluteParent(node).height - node.height - node.y, "px;");
            break;
        case "STRETCH":
            coord += "bottom: ".concat(findAbsoluteParent(node).height - node.height - node.y, "px; top: ").concat(node.y, "px;");
            break;
        case "CENTER":
            coord += "top: calc(50% - ".concat(findAbsoluteParent(node).height / 2 - node.y, "px);");
            break;
        default:
            coord += "top: ".concat(node.y, "px;");
    }
    return coord;
}
function position(node) {
    var coord = "";
    if (node.id !== figma.currentPage.selection[0].id) {
        // Super ugly but works for now...
        coord = cssFromConstraints(node);
    }
    var positionFromParent = function (node) {
        var _a;
        var selection = figma.currentPage.selection[0];
        if (node.type === "GROUP" && !(0, helpers_1.willBeRenderedAsSVG)(node)) {
            return "static;";
        }
        if (node.id === selection.id || ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "COMPONENT_SET") {
            return "relative;";
        }
        return "".concat(node.parent.layoutMode === "NONE" || !node.parent.layoutMode
            ? "absolute; ".concat(coord)
            : "relative;");
    };
    return "\n      position: ".concat(positionFromParent(node), "\n    ");
}
exports.position = position;
function boxShadow(node) {
    var _a;
    if (!node.effects ||
        node.effects.length === 0 ||
        (0, helpers_1.willBeRenderedAsSVG)(node) ||
        node.type === "GROUP")
        return "";
    var shadows = node.effects.filter(function (effect) { return effect.type === "DROP_SHADOW"; });
    if (shadows.length === 0)
        return "";
    var css = "box-shadow: ";
    css += shadows
        .map(function (s) {
        return "".concat(s.offset.x, "px ").concat(s.offset.y, "px ").concat(s.radius, "px ").concat(s.spread, "px ").concat((0, helpers_1.rgbaColor)(s.color, s.color.a));
    })
        .join(", ");
    return ("".concat(node.effectStyleId &&
        "/*" + ((_a = figma.getStyleById(node.effectStyleId)) === null || _a === void 0 ? void 0 : _a.name) + "*/") +
        css +
        ";");
}
exports.boxShadow = boxShadow;
function fontStyleAsObject(fontName) {
    var _a, _b;
    var isItalic = (_a = fontName === null || fontName === void 0 ? void 0 : fontName.style) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("italic");
    var weightMap = {
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
        black: 900
    };
    var weight = (_b = fontName === null || fontName === void 0 ? void 0 : fontName.style) === null || _b === void 0 ? void 0 : _b.toLowerCase().replace("italic", "").trim();
    return {
        weight: weightMap[weight] ? weightMap[weight] : "400",
        isItalic: isItalic
    };
}
exports.fontStyleAsObject = fontStyleAsObject;
function fillColor(node) {
    var _a;
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "";
    //atm only one fill is supported
    var fill = (_a = node.fills) === null || _a === void 0 ? void 0 : _a[0];
    return getColor(fill, node.fillStyleId);
}
exports.fillColor = fillColor;
function transforms(node) {
    var isSVG = (0, helpers_1.willBeRenderedAsSVG)(node);
    if (node.type === "GROUP" && !isSVG) {
        return "";
    }
    var transforms = (0, helpers_1.getTransforms)(node.relativeTransform);
    var absoluteTransforms = (0, helpers_1.getTransforms)(node.absoluteTransform);
    if (transforms.angle === 0 &&
        transforms.scaleX === 1 &&
        transforms.scaleY === 1) {
        return "";
    }
    // TODO: check if it is rendered inside an autolayout & fix transform origin...
    if (isSVG) {
        if (!node.absoluteRenderBounds)
            return;
        return "\n      transform: translate(".concat((absoluteTransforms.translateX - node.absoluteRenderBounds.x) * -1, "px, ").concat((absoluteTransforms.translateY - node.absoluteRenderBounds.y) * -1, "px);\n    ");
    }
    return "\n    transform-origin: 0 0;\n    transform: rotate(".concat(transforms.angle * -1, "deg) scale(").concat(transforms.scaleX, ", ").concat(transforms.scaleY, ");\n  ");
}
exports.transforms = transforms;
function gradientLinear(fill) {
    var gradientStops = fill.gradientStops;
    var transforms = (0, helpers_1.getTransforms)(fill.gradientTransform);
    console.log(fill.gradientTransform);
    var gradientMap = gradientStops.map(function (s) {
        return "".concat((0, helpers_1.rgbaColor)(s.color, s.color.a), " ").concat(s.position * 100, "%");
    });
    return "linear-gradient(".concat(transforms.angle + 90, "deg, ").concat(gradientMap.join(","), ")");
}
exports.gradientLinear = gradientLinear;
function borderRadius(node) {
    if (node.type === "ELLIPSE")
        return "border-radius: 50%;";
    if (!node.cornerRadius && !node.topLeftRadius)
        return "";
    return "border-radius: ".concat(typeof node.cornerRadius === "number"
        ? node.cornerRadius + "px"
        : "".concat(node.topLeftRadius, "px ").concat(node.topRightRadius, "px ").concat(node.bottomRightRadius, "px ").concat(node.bottomLeftRadius, "px"), ";");
}
exports.borderRadius = borderRadius;
function strokeColor(node) {
    var _a;
    var stroke = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0];
    return getColor(stroke, node.strokeStyleId);
}
exports.strokeColor = strokeColor;
function getColor(fillOrColor, styleId) {
    var _a;
    if (!fillOrColor || !fillOrColor.visible) {
        return "transparent";
    }
    if (fillOrColor.type === "GRADIENT_LINEAR") {
        return gradientLinear(fillOrColor);
    }
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        var color = fillOrColor.opacity < 1
            ? (0, helpers_1.rgbaColor)(fillOrColor.color, fillOrColor.opacity)
            : (0, helpers_1.rgbToHex)(fillOrColor.color);
        return "var(--".concat(styleName, ", ").concat(color, ")");
    }
    return fillOrColor.opacity < 1
        ? (0, helpers_1.rgbaColor)(fillOrColor.color, fillOrColor.opacity)
        : (0, helpers_1.rgbToHex)(fillOrColor.color);
}
exports.getColor = getColor;
function lineHeight(nodeOrStyle) {
    if (!nodeOrStyle.lineHeight)
        return "";
    if (nodeOrStyle.lineHeight.unit === "AUTO")
        return "";
    var unitMap = {
        PIXELS: "px",
        PERCENT: "%"
    };
    var unit = unitMap[nodeOrStyle.lineHeight.unit];
    return "".concat(nodeOrStyle.lineHeight.value).concat(unit);
}
exports.lineHeight = lineHeight;
function fontShorthand(_a) {
    var lineHeight = _a.lineHeight, fontSize = _a.fontSize, weight = _a.weight, fontFamily = _a.fontFamily, isItalic = _a.isItalic;
    var italic = isItalic ? "italic " : "";
    return "".concat(weight, " ").concat(italic).concat(fontSize, "px").concat(lineHeight !== "" ? "/" + lineHeight : "", " '").concat(fontFamily, "'");
}
exports.fontShorthand = fontShorthand;
function fontProp(node) {
    var _a, _b, _c;
    var _d = fontStyleAsObject(node.fontName), weight = _d.weight, isItalic = _d.isItalic;
    var fontSize = (_a = node.fontSize) === null || _a === void 0 ? void 0 : _a.toString();
    var fontFamily = (_b = node.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
    var lineHeightStr = lineHeight(node);
    var shorthand = fontShorthand({
        lineHeight: lineHeightStr,
        fontSize: fontSize,
        weight: weight,
        fontFamily: fontFamily,
        isItalic: isItalic
    });
    if (node.textStyleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_c = figma.getStyleById(node.textStyleId.toString())) === null || _c === void 0 ? void 0 : _c.name);
        return "font: var(--".concat(styleName, ", ").concat(shorthand, ");");
    }
    return "font: ".concat(shorthand, ";");
}
exports.fontProp = fontProp;
function textTransformProp(node) {
    var caseMap = {
        UPPER: "uppercase",
        LOWER: "lowercase"
    };
    return caseMap[node.textCase]
        ? "text-transform: ".concat(caseMap[node.textCase], ";")
        : "";
}
exports.textTransformProp = textTransformProp;
function textDecorationProp(node) {
    if (!node.textDecoration)
        return "";
    var decoMap = {
        STRIKETHROUGH: "line-through",
        UNDERLINE: "underline"
    };
    return decoMap[node.textDecoration]
        ? "text-decoration: ".concat(decoMap[node.textDecoration], ";")
        : "";
}
exports.textDecorationProp = textDecorationProp;


/***/ }),

/***/ "./src/tailwind.ts":
/*!*************************!*\
  !*** ./src/tailwind.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*
This file tries to convert figma into tailwind.
It tries to interpret the css already generated from this plugin as tailwind classes.
This will never work perfectly but may provide a starting point for development.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.tailwind = void 0;
var code_1 = __webpack_require__(/*! ./code */ "./src/code.ts");
var sizesMap = {
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
    "24px": 6
};
var flexDirectionMap = {
    row: "row",
    column: "col"
};
var twMap = {
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
        "9999px": "full"
    },
    background: { transparent: "transparent" },
    "justify-content": {
        "flex-start": "start",
        "flex-end": "end",
        center: "center"
    },
    "align-items": {
        "flex-start": "start",
        "flex-end": "end",
        center: "center"
    },
    "align-self": {
        stretch: "stretch"
    },
    overflow: {
        hidden: "hidden"
    }
};
function tailwind(tree) {
    return __awaiter(this, void 0, void 0, function () {
        function theChildren(children) {
            return __awaiter(this, void 0, void 0, function () {
                var all;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!((children === null || children === void 0 ? void 0 : children.length) > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(children.map(function (treeElement) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!(treeElement.type === "VECTOR" ||
                                                    treeElement.type === "BOOLEAN_OPERATION" ||
                                                    treeElement.allChildrenAreVector)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, code_1.createSVG)(treeElement.originalNode, 
                                                    // hacky...
                                                    "".concat(tailwindClassNames(treeElement.css, treeElement.originalNode)
                                                        .classNames, "\" style=\"").concat(tailwindClassNames(treeElement.css, treeElement.originalNode)
                                                        .inlineStyles))];
                                            case 1: return [2 /*return*/, _c.sent()];
                                            case 2:
                                                _b = (_a = "<div class=\"".concat(tailwindClassNames(treeElement.css, treeElement.originalNode)
                                                    .classNames, "\" style=\"").concat(tailwindClassNames(treeElement.css, treeElement.originalNode)
                                                    .inlineStyles, "\">\n").concat(treeElement.characters
                                                    ? treeElement.characters.replaceAll("\n", "<br />")
                                                    : "", " ")).concat;
                                                return [4 /*yield*/, theChildren(treeElement.children)];
                                            case 3: return [2 /*return*/, _b.apply(_a, [_c.sent(), "\n</div>"])];
                                        }
                                    });
                                }); }))];
                        case 1:
                            all = _a.sent();
                            return [2 /*return*/, all.join("")];
                        case 2: return [2 /*return*/, ""];
                    }
                });
            });
        }
        var html, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    html = "";
                    if (!(tree.type === "VECTOR" || tree.allChildrenAreVector)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, code_1.createSVG)(tree.originalNode, "".concat(tailwindClassNames(tree.css, tree.originalNode).classNames, "\" style=\"").concat(tailwindClassNames(tree.css, tree.originalNode).inlineStyles))];
                case 1:
                    html = _d.sent();
                    return [3 /*break*/, 4];
                case 2:
                    _a = html;
                    _c = (_b = "<div class=\"".concat(tailwindClassNames(tree.css, tree.originalNode).classNames, "\" style=\"").concat(tailwindClassNames(tree.css, tree.originalNode).inlineStyles, "\">\n").concat(tree.characters ? tree.characters.replaceAll("\n", "<br />") : "", " ")).concat;
                    return [4 /*yield*/, theChildren(tree.children)];
                case 3:
                    html = _a + _c.apply(_b, [_d.sent(), "\n</div>"]);
                    _d.label = 4;
                case 4: return [2 /*return*/, html];
            }
        });
    });
}
exports.tailwind = tailwind;
function tailwindClassNames(css, node) {
    var cssLineByLine = css
        .replaceAll("\n", "")
        .split(";")
        .map(function (e) { return e.trim(); })
        .filter(function (e) { return e !== ""; });
    var keyValuePairs = cssLineByLine.map(function (line) {
        var _a = line.split(":"), key = _a[0], value = _a[1];
        return { key: key === null || key === void 0 ? void 0 : key.trim(), value: value === null || value === void 0 ? void 0 : value.trim() };
    });
    var cssPropsMap = {
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
        overflow: "overflow"
    };
    // these will be generated from node or are not needed at all
    var excludeList = ["padding", "margin", "box-sizing"];
    var inlineStyles = [];
    var classNames = keyValuePairs.map(function (_a) {
        var key = _a.key, value = _a.value;
        if (excludeList.includes(key))
            return null;
        var twValue = lookUpTailwindValue(key, value);
        var twKey = cssPropsMap[key];
        if (twKey === undefined) {
            inlineStyles.push("".concat(key, ": ").concat(value));
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
    var classNamesDirectlyExtractedFromNode = extractClassNamesFromNode(node);
    return {
        classNames: classNames
            .concat(classNamesDirectlyExtractedFromNode)
            .filter(function (e) { return e !== null; })
            .join(" "),
        inlineStyles: inlineStyles.join("; ")
    };
}
function lookUpTailwindValue(propKey, value) {
    var _a;
    var valuesNotNeededToChange = ["display", "position", "text-align", "flex"];
    var twValue = (_a = twMap[propKey]) === null || _a === void 0 ? void 0 : _a[value];
    if (valuesNotNeededToChange.includes(propKey)) {
        return value;
    }
    if (twValue === undefined) {
        return "[".concat(value, "]");
    }
    if (twValue === "") {
        return "";
    }
    return twValue;
}
function extractClassNamesFromNode(node) {
    var classNames = [];
    /* paddings */
    if (node.paddingLeft) {
        var paddings_1 = [
            node.paddingTop,
            node.paddingRight,
            node.paddingBottom,
            node.paddingLeft,
        ];
        if (paddings_1.every(function (p) { return p === paddings_1[0]; })) {
            classNames.push("p-".concat(lookUpTailwindValue("padding", paddings_1[0] + "px")));
        }
        else {
            var direction_1 = ["t", "r", "b", "l"];
            paddings_1.forEach(function (p, i) {
                classNames.push("p".concat(direction_1[i], "-").concat(lookUpTailwindValue("padding", p + "px")));
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29kZS50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9nZXRTdHlsZXMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2hlbHBlcnMvcHJvcHNIZWxwZXJzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL3RhaWx3aW5kLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5jcmVhdGVTVkcgPSB2b2lkIDA7XHJcbnZhciBwcm9wc0hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvcHJvcHNIZWxwZXJzXCIpO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVycy9oZWxwZXJzXCIpO1xyXG52YXIgZ2V0U3R5bGVzXzEgPSByZXF1aXJlKFwiLi9nZXRTdHlsZXNcIik7XHJcbi8qIEJldGEgKi9cclxudmFyIHRhaWx3aW5kXzEgPSByZXF1aXJlKFwiLi90YWlsd2luZFwiKTtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2coXCJub2RlXCIsIG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICBjb2xvcjogXCIuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS5maWxsQ29sb3IpKG5vZGUpLCBcIjtcXG4gICAgICB0ZXh0LWFsaWduOiBcIikuY29uY2F0KChfYiA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmZvbnRQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS50ZXh0VHJhbnNmb3JtUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEudGV4dERlY29yYXRpb25Qcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS5vcGFjaXR5KShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS5wb3NpdGlvbikobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEuZGlzcGxheVByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmRpbWVuc2lvbnMpKG5vZGUpLCBcIlxcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS50cmFuc2Zvcm1zKShub2RlKSwgXCJcXG4gICAgXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICBiYWNrZ3JvdW5kOiBcIi5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmZpbGxDb2xvcikobm9kZSksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmJvcmRlclJhZGl1cykobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEuYm9yZGVyUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEub3BhY2l0eSkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEucGFkZGluZ1Byb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmRpc3BsYXlQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS5kaW1lbnNpb25zKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS5wb3NpdGlvbikobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEuYm94U2hhZG93KShub2RlKSwgXCJcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEudHJhbnNmb3Jtcykobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEub3ZlcmZsb3cpKG5vZGUpLCBcIlxcbiAgICBcIik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2VnbWVudENzcyh0ZXh0U2VnbWVudCkge1xyXG4gICAgcmV0dXJuIFwiXFxuICAgICAgY29sb3I6IFwiLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEuZmlsbENvbG9yKSh0ZXh0U2VnbWVudCksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIHByb3BzSGVscGVyc18xLmZvbnRQcm9wKSh0ZXh0U2VnbWVudCksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgcHJvcHNIZWxwZXJzXzEudGV4dFRyYW5zZm9ybVByb3ApKHRleHRTZWdtZW50KSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBwcm9wc0hlbHBlcnNfMS50ZXh0RGVjb3JhdGlvblByb3ApKHRleHRTZWdtZW50KSwgXCJcXG4gICAgXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICB2YXIgYWxsTmFtZXMgPSBbXTtcclxuICAgIGZ1bmN0aW9uIHVuaXF1ZU5hbWUoY2xhc3NOYW1lLCBuKSB7XHJcbiAgICAgICAgaWYgKG4gPT09IHZvaWQgMCkgeyBuID0gMTsgfVxyXG4gICAgICAgIHZhciBzdWZmaXggPSBuID4gMSA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxsTmFtZXMucHVzaChjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgc3VmZml4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTm90aGluZyBzZWxlY3RlZFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBvbmx5IDEgTm9kZVwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgdmFyIGlzQ29tcG9uZW50U2V0ID0gc2VsZWN0aW9uTm9kZS50eXBlID09PSBcIkNPTVBPTkVOVF9TRVRcIjtcclxuICAgIHZhciBvcmlnaW5hbE5vZGUgPSBpc0NvbXBvbmVudFNldFxyXG4gICAgICAgID8gc2VsZWN0aW9uTm9kZS5kZWZhdWx0VmFyaWFudFxyXG4gICAgICAgIDogc2VsZWN0aW9uTm9kZTtcclxuICAgIGNvbXBvbmVudE5hbWUgPSAoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShzZWxlY3Rpb25Ob2RlLm5hbWUpO1xyXG4gICAgdmFyIHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1Mob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogKDAsIGhlbHBlcnNfMS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogb3JpZ2luYWxOb2RlLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogb3JpZ2luYWxOb2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICB2YXJpYW50czogaXNDb21wb25lbnRTZXQgJiYgW11cclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuLCBiYXNlU2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAoYmFzZVNlbGVjdG9yID09PSB2b2lkIDApIHsgYmFzZVNlbGVjdG9yID0gXCJcIjsgfVxyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIlwiLmNvbmNhdChjb21wb25lbnROYW1lLCBcIl9fXCIpLmNvbmNhdCh1bmlxdWVOYW1lKCgwLCBoZWxwZXJzXzEubWFrZVNhZmVGb3JDU1MpKG5vZGUubmFtZSkpKTtcclxuICAgICAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgY3NzOiBub2RlQ1NTKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6ICgwLCBoZWxwZXJzXzEuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczogbm9kZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiBub2RlLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgIGJhc2VTZWxlY3RvcjogYmFzZVNlbGVjdG9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbiwgYmFzZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IG9yaWdpbmFsTm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4ob3JpZ2luYWxOb2RlLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgICAgICAvKiBDb21wb25lbnQgVmFyaWFudHMgKi9cclxuICAgICAgICBpZiAoaXNDb21wb25lbnRTZXQpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh2YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFudE5hbWUgPSAoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShcIlwiLmNvbmNhdChjb21wb25lbnROYW1lLCBcIi0tXCIpLmNvbmNhdCh2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQubmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhcmlhbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1ModmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6ICgwLCBoZWxwZXJzXzEuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKHZhcmlhbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiB2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IHZhcmlhbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBiYXNlU2VsZWN0b3I6IFwiLlwiICsgdmFyaWFudE5hbWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0cmVlLnZhcmlhbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChuZXdWYXJpYW50KTtcclxuICAgICAgICAgICAgICAgIGFsbE5hbWVzID0gW107IC8vIHJlc2V0IGNsYXNzTmFtZXMgc28gdGhlIG5ldyBnZW5lcmF0ZWQgbWF0Y2ggdGhlIG9uZXMgaW4gdGhlIGRlZmF1bHRWYXJpYW50XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih2YXJpYW50LmNoaWxkcmVuLCBuZXdWYXJpYW50LmNoaWxkcmVuLCBcIi5cIiArIHZhcmlhbnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHZhciB0ZXh0U2VnbWVudHMgPSBnZXRUZXh0U2VnbWVudHMob3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUsIHVuaXF1ZU5hbWUpO1xyXG4gICAgICAgIHRyZWUudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VGV4dFNlZ21lbnRzKG5vZGUsIGNvbXBvbmVudE5hbWUsIHVuaXF1ZU5hbWUpIHtcclxuICAgIHZhciBzZWdtZW50cyA9IG5vZGUuZ2V0U3R5bGVkVGV4dFNlZ21lbnRzKFtcclxuICAgICAgICBcImZvbnRTaXplXCIsXHJcbiAgICAgICAgXCJmb250TmFtZVwiLFxyXG4gICAgICAgIFwidGV4dERlY29yYXRpb25cIixcclxuICAgICAgICBcInRleHRDYXNlXCIsXHJcbiAgICAgICAgXCJsaW5lSGVpZ2h0XCIsXHJcbiAgICAgICAgXCJsZXR0ZXJTcGFjaW5nXCIsXHJcbiAgICAgICAgXCJmaWxsc1wiLFxyXG4gICAgICAgIFwidGV4dFN0eWxlSWRcIixcclxuICAgICAgICBcImZpbGxTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJsaXN0T3B0aW9uc1wiLFxyXG4gICAgICAgIFwiaW5kZW50YXRpb25cIixcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHNlZ21lbnRzLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcyksIHsgbmFtZTogXCJcIi5jb25jYXQodW5pcXVlTmFtZSgoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShjb21wb25lbnROYW1lICsgXCItc3BhblwiKSkpLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCBuYW1lKSB7XHJcbiAgICBmdW5jdGlvbiBzZWFyY2hUcmVlKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNoaWxkcmVuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VhcmNoVHJlZShlbGVtZW50LmNoaWxkcmVuW2ldLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICB2YXIgbW9kQXJyID0gbW9kaWZpZXJDU1Muc3BsaXQoXCI7XCIpLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbC50cmltKCk7IH0pO1xyXG4gICAgdmFyIGJhc2VBcnIgPSBiYXNlQ1NTLnNwbGl0KFwiO1wiKS5tYXAoZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwudHJpbSgpOyB9KTtcclxuICAgIC8vIGRldGVjdCBjc3MgbGluZXMgaW5jbHVkZWQgaW4gYmFzZSBidXQgbm90IGluIG1vZGlmaWVyIGFuZCB1bnNldCB0aGUgdmFsdWVcclxuICAgIHZhciBjc3NQcm9wc1RvQmVVbnNldCA9IGJhc2VBcnJcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChsKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBsLnNwbGl0KFwiOlwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgfSlcclxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuICFtb2RpZmllckNTUy5pbmNsdWRlcyhcIlwiLmNvbmNhdChwcm9wLCBcIjpcIikpO1xyXG4gICAgfSlcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChwcm9wKSB7IHJldHVybiBwcm9wICsgXCI6IHVuc2V0XCI7IH0pO1xyXG4gICAgcmV0dXJuIG1vZEFyclxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGxpbmUpIHtcclxuICAgICAgICByZXR1cm4gIWJhc2VBcnIuaW5jbHVkZXMobGluZSk7XHJcbiAgICB9KVxyXG4gICAgICAgIC5jb25jYXQoY3NzUHJvcHNUb0JlVW5zZXQpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbCArIFwiO1wiOyB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbnZhciB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5jb25zb2xlLmxvZyh0cmVlKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgdmFyIGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHRyZWUubmFtZSwgXCIge1wiKS5jb25jYXQodHJlZS5jc3MsIFwifVxcblwiKTtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCBpc1ZhcmlhbnQpIHtcclxuICAgICAgICBpZiAoaXNWYXJpYW50ID09PSB2b2lkIDApIHsgaXNWYXJpYW50ID0gZmFsc2U7IH1cclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50Q1NTID0gdHJlZUVsZW1lbnQuY3NzO1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoaXNWYXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNTUyA9IChfYSA9IGdldFRyZWVFbGVtZW50QnlOYW1lKHRyZWUsIHRyZWVFbGVtZW50Lm5hbWUpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3NzO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB0cmVlLm5hbWUgPT09IHRyZWVFbGVtZW50Lm5hbWUgPyBcIlwiIDogXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDU1MpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Q1NTID0gZXJhc2VEdXBsaWNhdGVDU1ModHJlZUVsZW1lbnQuY3NzLCBiYXNlQ1NTKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudENTUyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY3NzICs9IFwiXCIuY29uY2F0KHRyZWVFbGVtZW50LmJhc2VTZWxlY3RvciB8fCBcIlwiLCBcIiBcIikuY29uY2F0KGNsYXNzTmFtZSwgXCIge1wiKS5jb25jYXQoZWxlbWVudENTUywgXCJ9XFxuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHMubmFtZSwgXCIge1wiKS5jb25jYXQocy5jc3MsIFwifVxcblwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbiwgaXNWYXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyZWUudGV4dFNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0cmVlLnRleHRTZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIGNzcyArPSBcIi5cIi5jb25jYXQocy5uYW1lLCBcIiB7XCIpLmNvbmNhdChzLmNzcywgXCJ9XFxuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICBpZiAodHJlZS52YXJpYW50cykge1xyXG4gICAgICAgIGNzcyArPSBcIlxcbi8qIHZhcmlhbnQgc3R5bGVzICovXFxuXCI7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS52YXJpYW50cywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50SFRNTCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoZnVuY3Rpb24gKHRyZWVFbGVtZW50KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9jLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IFwiPGRpdiBjbGFzcz1cXFwiXCIuY29uY2F0KHRyZWVFbGVtZW50Lm5hbWUsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWVFbGVtZW50LnRleHRTZWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmludFRleHRTZWdtZW50cyh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsIFwiIFwiKSkuY29uY2F0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLmFwcGx5KF9hLCBbX2Muc2VudCgpLCBcIlxcbjwvZGl2PlwiXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFsbC5qb2luKFwiXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaHRtbCwgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3RvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IF9kLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBfYSA9IGh0bWw7XHJcbiAgICAgICAgICAgICAgICAgICAgX2MgPSAoX2IgPSBcIjxkaXYgY2xhc3M9XFxcIlwiLmNvbmNhdCh0cmVlLm5hbWUsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWUudGV4dFNlZ21lbnRzID8gcHJpbnRUZXh0U2VnbWVudHModHJlZS50ZXh0U2VnbWVudHMpIDogXCJcIiwgXCIgXCIpKS5jb25jYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfYSArIF9jLmFwcGx5KF9iLCBbX2Quc2VudCgpLCBcIlxcbjwvZGl2PlwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgaHRtbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50VGV4dFNlZ21lbnRzKHNlZ21lbnRzKSB7XHJcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gZG8gbm90IHdyYXAgaW4gc3BhblxyXG4gICAgICAgIHJldHVybiAoMCwgaGVscGVyc18xLmVzY2FwZUh0bWwpKHNlZ21lbnRzWzBdLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWdtZW50c1xyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz1cXFwiXCIuY29uY2F0KHMubmFtZSwgXCJcXFwiPlwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5lc2NhcGVIdG1sKShzLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKSwgXCI8L3NwYW4+XCIpO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN2ZztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwb3J0QXN5bmMoeyBmb3JtYXQ6IFwiU1ZHXCIsIHVzZUFic29sdXRlQm91bmRzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcIjxzdmcgXCIsIFwiPHN2ZyBjbGFzcz1cXFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJcXFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmVycm9yKGVycik7IH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzdmcgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHN2Z107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlU1ZHID0gY3JlYXRlU1ZHO1xyXG5maWdtYS5wYXJhbWV0ZXJzLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgcGFyYW1ldGVycyA9IF9hLnBhcmFtZXRlcnMsIGtleSA9IF9hLmtleSwgcXVlcnkgPSBfYS5xdWVyeSwgcmVzdWx0ID0gX2EucmVzdWx0O1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIHZhciBmcmFtZXdvcmtzID0gW1wicmVhY3RcIiwgXCJodG1sXCIsIFwidGFpbHdpbmQoYmV0YSlcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcy5pbmNsdWRlcyhxdWVyeSk7IH0pKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgY29tbWFuZCA9IF9hLmNvbW1hbmQsIHBhcmFtZXRlcnMgPSBfYS5wYXJhbWV0ZXJzO1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNzcywgaHRtbCwgX2I7XHJcbiAgICAgICAgdmFyIF9jLCBfZCwgX2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9mLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNjAwLCB3aWR0aDogNTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCIgPyBcIi1cIiA6IHByaW50Q1NTKHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCIpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCAoMCwgdGFpbHdpbmRfMS50YWlsd2luZCkodHJlZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIF9iID0gX2Yuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQgLyp5aWVsZCovLCBwcmludEhUTUwodHJlZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIF9iID0gX2Yuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IGNzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrOiBwYXJhbWV0ZXJzLmZyYW1ld29yayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiAoMCwgZ2V0U3R5bGVzXzEuZ2V0U3R5bGVzKShmaWdtYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IChfZSA9IChfZCA9IChfYyA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbMF0pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLmdldFN0eWxlcyA9IHZvaWQgMDtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvaGVscGVyc1wiKTtcclxudmFyIHByb3BzSGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVycy9wcm9wc0hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGdldFN0eWxlcyhmaWdtYSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIHZhciBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHBhaW50cyA9IF9hLnBhaW50cztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6ICgwLCBwcm9wc0hlbHBlcnNfMS5nZXRDb2xvcikocGFpbnRzID09PSBudWxsIHx8IHBhaW50cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpbnRzWzBdLCBmYWxzZSlcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgdGV4dFN0eWxlcyA9IChfYiA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgdmFyIF9jID0gKDAsIHByb3BzSGVscGVyc18xLmZvbnRTdHlsZUFzT2JqZWN0KShzdHlsZS5mb250TmFtZSksIHdlaWdodCA9IF9jLndlaWdodCwgaXNJdGFsaWMgPSBfYy5pc0l0YWxpYztcclxuICAgICAgICB2YXIgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIGZvbnRGYW1pbHkgPSAoX2IgPSBzdHlsZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgICAgIHZhciBsaW5lSGVpZ2h0U3RyID0gKDAsIHByb3BzSGVscGVyc18xLmxpbmVIZWlnaHQpKHN0eWxlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKShzdHlsZS5uYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6ICgwLCBwcm9wc0hlbHBlcnNfMS5mb250U2hvcnRoYW5kKSh7XHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiB3ZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiBmb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgaXNJdGFsaWM6IGlzSXRhbGljXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYWludFN0eWxlczogcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlczogdGV4dFN0eWxlc1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmdldFN0eWxlcyA9IGdldFN0eWxlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZ2V0VHJhbnNmb3JtcyA9IGV4cG9ydHMud2lsbEJlUmVuZGVyZWRBc1NWRyA9IGV4cG9ydHMuYWxsQ2hpbGRyZW5BcmVWZWN0b3IgPSBleHBvcnRzLmNsZWFuU3R5bGVOYW1lID0gZXhwb3J0cy5tYWtlU2FmZUZvckNTUyA9IGV4cG9ydHMuZXNjYXBlSHRtbCA9IGV4cG9ydHMuY29sb3JBc0hleE9yUmdiYSA9IGV4cG9ydHMucmdiYUNvbG9yID0gZXhwb3J0cy5yZ2JUb0hleCA9IGV4cG9ydHMuY29tcG9uZW50VG8yNTUgPSBleHBvcnRzLmNvbXBvbmVudFRvSGV4ID0gdm9pZCAwO1xyXG4vKiBoZWxwZXJzICovXHJcbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcclxuICAgIHZhciBoZXggPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcclxufVxyXG5leHBvcnRzLmNvbXBvbmVudFRvSGV4ID0gY29tcG9uZW50VG9IZXg7XHJcbmZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9uZW50VG8yNTUgPSBjb21wb25lbnRUbzI1NTtcclxuZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB2YXIgciA9IHJnYi5yLCBnID0gcmdiLmcsIGIgPSByZ2IuYiwgYSA9IHJnYi5hO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmdiVG9IZXggPSByZ2JUb0hleDtcclxuZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciByID0gb2JqLnIsIGcgPSBvYmouZywgYiA9IG9iai5iO1xyXG4gICAgcmV0dXJuIFwicmdiYShcIi5jb25jYXQoY29tcG9uZW50VG8yNTUociksIFwiLCBcIikuY29uY2F0KGNvbXBvbmVudFRvMjU1KGcpLCBcIiwgXCIpLmNvbmNhdChjb21wb25lbnRUbzI1NShiKSwgXCIsIFwiKS5jb25jYXQoYS50b0ZpeGVkKDIpLCBcIilcIik7XHJcbn1cclxuZXhwb3J0cy5yZ2JhQ29sb3IgPSByZ2JhQ29sb3I7XHJcbmZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmNvbG9yQXNIZXhPclJnYmEgPSBjb2xvckFzSGV4T3JSZ2JhO1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xyXG4gICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxufVxyXG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xyXG5mdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjID09IDMyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICAgICAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm1ha2VTYWZlRm9yQ1NTID0gbWFrZVNhZmVGb3JDU1M7XHJcbmZ1bmN0aW9uIGNsZWFuU3R5bGVOYW1lKG5hbWUpIHtcclxuICAgIC8vY29uc3QgbmFtZUFyciA9IG5hbWUuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy9yZXR1cm4gbWFrZVNhZmVGb3JDU1MobmFtZUFycltuYW1lQXJyLmxlbmd0aCAtIDFdLnRyaW0oKSk7XHJcbiAgICBpZiAoIW5hbWUpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCJcIikpO1xyXG59XHJcbmV4cG9ydHMuY2xlYW5TdHlsZU5hbWUgPSBjbGVhblN0eWxlTmFtZTtcclxuZnVuY3Rpb24gYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICB2YXIgdmVjdG9yVHlwZXMgPSBbXCJWRUNUT1JcIiwgXCJCT09MRUFOX09QRVJBVElPTlwiXTtcclxuICAgIHJldHVybiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCAmJlxyXG4gICAgICAgICgoX2IgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKGZ1bmN0aW9uIChuKSB7IHJldHVybiB2ZWN0b3JUeXBlcy5pbmNsdWRlcyhuLnR5cGUpOyB9KS5sZW5ndGgpID09PVxyXG4gICAgICAgICAgICAoKF9jID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxlbmd0aCkpO1xyXG59XHJcbmV4cG9ydHMuYWxsQ2hpbGRyZW5BcmVWZWN0b3IgPSBhbGxDaGlsZHJlbkFyZVZlY3RvcjtcclxuZnVuY3Rpb24gd2lsbEJlUmVuZGVyZWRBc1NWRyhub2RlKSB7XHJcbiAgICByZXR1cm4gKGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGUpIHx8XHJcbiAgICAgICAgbm9kZS50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgbm9kZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIpO1xyXG59XHJcbmV4cG9ydHMud2lsbEJlUmVuZGVyZWRBc1NWRyA9IHdpbGxCZVJlbmRlcmVkQXNTVkc7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCByZWxldmFudCB0cmFuc2Zvcm1hdGlvbiBpbmZvcm1hdGlvbiBmcm9tIGEgKGZpZ21hKSB0cmFuc2Zvcm0gbWF0cml4XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKGZtKSB7XHJcbiAgICAvLyBhbnl0aGluZyB3cm9uZyB3aXRoIHRoZSB0cmFuc2Zvcm1zPyBOb3Qgc3VyZSBpZiBpIHNvcnRlZCBpdCByaWdodCBoZXJlLi4uXHJcbiAgICAvL2NvbnN0IG0gPSBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV0sIGZtWzBdWzJdLCBmbVsxXVsyXV07XHJcbiAgICB2YXIgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIHZhciBtYXRyaXggPSB7XHJcbiAgICAgICAgYTogbVswXSxcclxuICAgICAgICBiOiBtWzFdLFxyXG4gICAgICAgIGM6IG1bMl0sXHJcbiAgICAgICAgZDogbVszXSxcclxuICAgICAgICBlOiBtWzRdLFxyXG4gICAgICAgIGY6IG1bNV1cclxuICAgIH07XHJcbiAgICB2YXIgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU1hdHJpeDJEVzMobWF0cml4KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYW5nbGU6IHRyYW5zZm9ybXMucm90YXRlWixcclxuICAgICAgICBzY2FsZVg6IHRyYW5zZm9ybXMuc2NhbGVYLFxyXG4gICAgICAgIHNjYWxlWTogdHJhbnNmb3Jtcy5zY2FsZVksXHJcbiAgICAgICAgdHJhbnNsYXRlWDogbVs0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxyXG4gICAgICAgIHN2Z01hdHJpeDogbS5qb2luKFwiIFwiKSxcclxuICAgICAgICBzdmdNYXRyaXhXaXRob3V0VHJhbnNsYXRlOiBbZm1bMF1bMF0sIGZtWzBdWzFdLCBmbVsxXVswXSwgZm1bMV1bMV1dLmpvaW4oXCIgXCIpXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZ2V0VHJhbnNmb3JtcyA9IGdldFRyYW5zZm9ybXM7XHJcbmZ1bmN0aW9uIGRlY29tcG9zZU1hdHJpeDJEVzMobSkge1xyXG4gICAgdmFyIHJvdzB4ID0gbS5hO1xyXG4gICAgdmFyIHJvdzB5ID0gbS5iO1xyXG4gICAgdmFyIHJvdzF4ID0gbS5jO1xyXG4gICAgdmFyIHJvdzF5ID0gbS5kO1xyXG4gICAgdmFyIHNjYWxlWCA9IE1hdGguc3FydChyb3cweCAqIHJvdzB4ICsgcm93MHkgKiByb3cweSk7XHJcbiAgICB2YXIgc2NhbGVZID0gTWF0aC5zcXJ0KHJvdzF4ICogcm93MXggKyByb3cxeSAqIHJvdzF5KTtcclxuICAgIC8vIElmIGRldGVybWluYW50IGlzIG5lZ2F0aXZlLCBvbmUgYXhpcyB3YXMgZmxpcHBlZC5cclxuICAgIHZhciBkZXRlcm1pbmFudCA9IHJvdzB4ICogcm93MXkgLSByb3cweSAqIHJvdzF4O1xyXG4gICAgaWYgKGRldGVybWluYW50IDwgMClcclxuICAgICAgICBpZiAocm93MHggPCByb3cxeSlcclxuICAgICAgICAgICAgLy8gRmxpcCBheGlzIHdpdGggbWluaW11bSB1bml0IHZlY3RvciBkb3QgcHJvZHVjdC5cclxuICAgICAgICAgICAgc2NhbGVYID0gLXNjYWxlWDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNjYWxlWSA9IC1zY2FsZVk7XHJcbiAgICAvLyBSZW5vcm1hbGl6ZSBtYXRyaXggdG8gcmVtb3ZlIHNjYWxlLlxyXG4gICAgaWYgKHNjYWxlWCkge1xyXG4gICAgICAgIHJvdzB4ICo9IDEgLyBzY2FsZVg7XHJcbiAgICAgICAgcm93MHkgKj0gMSAvIHNjYWxlWDtcclxuICAgIH1cclxuICAgIGlmIChzY2FsZVkpIHtcclxuICAgICAgICByb3cxeCAqPSAxIC8gc2NhbGVZO1xyXG4gICAgICAgIHJvdzF5ICo9IDEgLyBzY2FsZVk7XHJcbiAgICB9XHJcbiAgICAvLyBDb21wdXRlIHJvdGF0aW9uIGFuZCByZW5vcm1hbGl6ZSBtYXRyaXguXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHJvdzB5LCByb3cweCk7XHJcbiAgICBpZiAoYW5nbGUpIHtcclxuICAgICAgICAvLyBSb3RhdGUoLWFuZ2xlKSA9IFtjb3MoYW5nbGUpLCBzaW4oYW5nbGUpLCAtc2luKGFuZ2xlKSwgY29zKGFuZ2xlKV1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICA9IFtyb3cweCwgLXJvdzB5LCByb3cweSwgcm93MHhdXHJcbiAgICAgICAgLy8gVGhhbmtzIHRvIHRoZSBub3JtYWxpemF0aW9uIGFib3ZlLlxyXG4gICAgICAgIHZhciBzbiA9IC1yb3cweTtcclxuICAgICAgICB2YXIgY3MgPSByb3cweDtcclxuICAgICAgICB2YXIgbTExID0gcm93MHg7XHJcbiAgICAgICAgdmFyIG0xMiA9IHJvdzB5O1xyXG4gICAgICAgIHZhciBtMjEgPSByb3cxeDtcclxuICAgICAgICB2YXIgbTIyID0gcm93MXk7XHJcbiAgICAgICAgcm93MHggPSBjcyAqIG0xMSArIHNuICogbTIxO1xyXG4gICAgICAgIHJvdzB5ID0gY3MgKiBtMTIgKyBzbiAqIG0yMjtcclxuICAgICAgICByb3cxeCA9IC1zbiAqIG0xMSArIGNzICogbTIxO1xyXG4gICAgICAgIHJvdzF5ID0gLXNuICogbTEyICsgY3MgKiBtMjI7XHJcbiAgICB9XHJcbiAgICBtMTEgPSByb3cweDtcclxuICAgIG0xMiA9IHJvdzB5O1xyXG4gICAgbTIxID0gcm93MXg7XHJcbiAgICBtMjIgPSByb3cxeTtcclxuICAgIC8vIENvbnZlcnQgaW50byBkZWdyZWVzIGJlY2F1c2Ugb3VyIHJvdGF0aW9uIGZ1bmN0aW9ucyBleHBlY3QgaXQuXHJcbiAgICBhbmdsZSA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xyXG4gICAgLy8gVGhlIHJlcXVlc3RlZCBwYXJhbWV0ZXJzIGFyZSB0aGVuIHRoZXRhLFxyXG4gICAgLy8gc3gsIHN5LCBwaGksXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG0uZSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBtLmYsXHJcbiAgICAgICAgcm90YXRlWjogYW5nbGUsXHJcbiAgICAgICAgc2NhbGVYOiBzY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiBzY2FsZVksXHJcbiAgICAgICAgbWF0cml4OiBbbTExLCBtMTIsIG0yMSwgbTIyLCAwLCAwXVxyXG4gICAgfTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy50ZXh0RGVjb3JhdGlvblByb3AgPSBleHBvcnRzLnRleHRUcmFuc2Zvcm1Qcm9wID0gZXhwb3J0cy5mb250UHJvcCA9IGV4cG9ydHMuZm9udFNob3J0aGFuZCA9IGV4cG9ydHMubGluZUhlaWdodCA9IGV4cG9ydHMuZ2V0Q29sb3IgPSBleHBvcnRzLnN0cm9rZUNvbG9yID0gZXhwb3J0cy5ib3JkZXJSYWRpdXMgPSBleHBvcnRzLmdyYWRpZW50TGluZWFyID0gZXhwb3J0cy50cmFuc2Zvcm1zID0gZXhwb3J0cy5maWxsQ29sb3IgPSBleHBvcnRzLmZvbnRTdHlsZUFzT2JqZWN0ID0gZXhwb3J0cy5ib3hTaGFkb3cgPSBleHBvcnRzLnBvc2l0aW9uID0gZXhwb3J0cy5vcGFjaXR5ID0gZXhwb3J0cy5vdmVyZmxvdyA9IGV4cG9ydHMuZGltZW5zaW9ucyA9IGV4cG9ydHMuZGlzcGxheVByb3AgPSBleHBvcnRzLnBhZGRpbmdQcm9wID0gZXhwb3J0cy5ib3JkZXJQcm9wID0gdm9pZCAwO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcclxuZnVuY3Rpb24gYm9yZGVyUHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgYm9yZGVyLXdpZHRoOiBcIi5jb25jYXQobm9kZS5zdHJva2VXZWlnaHQsIFwicHg7IFxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkOyBcXG4gICAgYm9yZGVyLWltYWdlOiBcIikuY29uY2F0KHN0cm9rZUNvbG9yKG5vZGUpLCBcIjsgXFxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcXG4gICAgXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiYm9yZGVyOiBcIi5jb25jYXQobm9kZS5zdHJva2VXZWlnaHQsIFwicHggc29saWQgXCIpLmNvbmNhdChzdHJva2VDb2xvcihub2RlKSwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuYm9yZGVyUHJvcCA9IGJvcmRlclByb3A7XHJcbmZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwicGFkZGluZzogXCIuY29uY2F0KG5vZGUucGFkZGluZ1RvcCwgXCJweCBcIikuY29uY2F0KG5vZGUucGFkZGluZ1JpZ2h0LCBcInB4IFwiKS5jb25jYXQobm9kZS5wYWRkaW5nQm90dG9tLCBcInB4IFwiKS5jb25jYXQobm9kZS5wYWRkaW5nTGVmdCwgXCJweDtcIik7XHJcbn1cclxuZXhwb3J0cy5wYWRkaW5nUHJvcCA9IHBhZGRpbmdQcm9wO1xyXG5mdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICB2YXIgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIHZhciBsYXlvdXRBbGlnbiA9IG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiID8gXCJhbGlnbi1zZWxmOiBzdHJldGNoO1wiIDogXCJcIjtcclxuICAgIHZhciBhbGlnbm1lbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCJcclxuICAgIH07XHJcbiAgICB2YXIgZmxleFByb3BzID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IFwiLmNvbmNhdChkaXJlY3Rpb24sIFwiO1xcbiAgICAgIGdhcDogXCIpLmNvbmNhdChub2RlLml0ZW1TcGFjaW5nLCBcInB4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBcIikuY29uY2F0KGFsaWdubWVudE1hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc10sIFwiO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogXCIpLmNvbmNhdChhbGlnbm1lbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdLCBcIjtcXG4gICAgXCIpO1xyXG4gICAgfTtcclxuICAgIHZhciBsYXlvdXRQcm9wcyA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGZsZXhQcm9wcyhcImNvbHVtblwiKTtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBmbGV4UHJvcHMoXCJyb3dcIik7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgfHxcclxuICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyArPSBsYXlvdXRBbGlnbiArIGZsZXhTaHJpbmtHcm93O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheW91dFByb3BzO1xyXG59XHJcbmV4cG9ydHMuZGlzcGxheVByb3AgPSBkaXNwbGF5UHJvcDtcclxuZnVuY3Rpb24gZGltZW5zaW9ucyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xyXG4gICAgLy8gaW4gdGhpcyBjYXNlIHRoZSBkaW1lbnNpb25zIGFyZSBkZWZpbmVkIGluc2lkZSB0aGUgc3ZnXHJcbiAgICBpZiAoKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgLyogTk9URTogVGhlIE9yZGVyIG9mIHRoZXNlIGlmIHN0YXRlbWVudHMgaXMgaW1wb3J0YW50ISAqL1xyXG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XHJcbiAgICB2YXIgd2lkdGggPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9IG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIiA/IFwiYXV0b1wiIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIgPyBcImF1dG9cIiA6IG5vZGUud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgaGVpZ2h0ID1cclxuICAgICAgICAgICAgbm9kZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiID8gXCJhdXRvXCIgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICghbm9kZS5sYXlvdXRNb2RlIHx8IG5vZGUubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSAoKF9hID0gbm9kZS50ZXh0QXV0b1Jlc2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJIRUlHSFRcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiBub2RlLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB3aWR0aCA9ICgoX2IgPSBub2RlLnRleHRBdXRvUmVzaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKS5pbmNsdWRlcyhcIldJRFRIXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogbm9kZS53aWR0aCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIgJiYgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKChfZCA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5ob3Jpem9udGFsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICB3aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiICYmXHJcbiAgICAgICAgbm9kZS5sYXlvdXRBbGlnbiA9PT0gXCJTVFJFVENIXCIpIHx8XHJcbiAgICAgICAgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEdyb3cgPT09IDEpIHx8XHJcbiAgICAgICAgKChfZSA9IG5vZGUuY29uc3RyYWludHMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS52ZXJ0aWNhbCkgPT09IFwiU1RSRVRDSFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJ3aWR0aDogXCIuY29uY2F0KHdpZHRoLCBcIjsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuZGltZW5zaW9ucyA9IGRpbWVuc2lvbnM7XHJcbmZ1bmN0aW9uIG92ZXJmbG93KG5vZGUpIHtcclxuICAgIGlmICgoMCwgaGVscGVyc18xLndpbGxCZVJlbmRlcmVkQXNTVkcpKG5vZGUpKVxyXG4gICAgICAgIHJldHVybiBcIm92ZXJmbG93OiB2aXNpYmxlO1wiO1xyXG4gICAgcmV0dXJuIG5vZGUuY2xpcHNDb250ZW50ID8gXCJvdmVyZmxvdzogaGlkZGVuO1wiIDogXCJcIjtcclxufVxyXG5leHBvcnRzLm92ZXJmbG93ID0gb3ZlcmZsb3c7XHJcbmZ1bmN0aW9uIG9wYWNpdHkobm9kZSkge1xyXG4gICAgaWYgKG5vZGUub3BhY2l0eSA9PT0gMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBcIm9wYWNpdHk6IFwiLmNvbmNhdChub2RlLm9wYWNpdHksIFwiO1wiKTtcclxufVxyXG5leHBvcnRzLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG5mdW5jdGlvbiBmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkge1xyXG4gICAgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09IFwiR1JPVVBcIikge1xyXG4gICAgICAgIHJldHVybiBmaW5kQWJzb2x1dGVQYXJlbnQobm9kZS5wYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGUucGFyZW50O1xyXG59XHJcbmZ1bmN0aW9uIGNzc0Zyb21Db25zdHJhaW50cyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgdmFyIGNvb3JkID0gXCJcIjtcclxuICAgIHN3aXRjaCAoKF9hID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhvcml6b250YWwpIHtcclxuICAgICAgICBjYXNlIFwiTUFYXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IFwicmlnaHQ6IFwiLmNvbmNhdChmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLSBub2RlLndpZHRoIC0gbm9kZS54LCBcInB4O1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIlNUUkVUQ0hcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJyaWdodDogXCIuY29uY2F0KGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLngsIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQobm9kZS54LCBcInB4O1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkNFTlRFUlwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImxlZnQ6IGNhbGMoNTAlIC0gXCIuY29uY2F0KGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAvIDIgLSBub2RlLngsIFwicHgpO1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJsZWZ0OiBcIi5jb25jYXQobm9kZS54LCBcInB4O1wiKTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoKF9iID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgY2FzZSBcIk1BWFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImJvdHRvbTogXCIuY29uY2F0KGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueSwgXCJweDtcIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJTVFJFVENIXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IFwiYm90dG9tOiBcIi5jb25jYXQoZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55LCBcInB4OyB0b3A6IFwiKS5jb25jYXQobm9kZS55LCBcInB4O1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkNFTlRFUlwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcInRvcDogY2FsYyg1MCUgLSBcIi5jb25jYXQoZmluZEFic29sdXRlUGFyZW50KG5vZGUpLmhlaWdodCAvIDIgLSBub2RlLnksIFwicHgpO1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJ0b3A6IFwiLmNvbmNhdChub2RlLnksIFwicHg7XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvb3JkO1xyXG59XHJcbmZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUpIHtcclxuICAgIHZhciBjb29yZCA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5pZCAhPT0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmlkKSB7XHJcbiAgICAgICAgLy8gU3VwZXIgdWdseSBidXQgd29ya3MgZm9yIG5vdy4uLlxyXG4gICAgICAgIGNvb3JkID0gY3NzRnJvbUNvbnN0cmFpbnRzKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHBvc2l0aW9uRnJvbVBhcmVudCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiICYmICEoMCwgaGVscGVyc18xLndpbGxCZVJlbmRlcmVkQXNTVkcpKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0YXRpYztcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaWQgPT09IHNlbGVjdGlvbi5pZCB8fCAoKF9hID0gbm9kZS5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gXCJDT01QT05FTlRfU0VUXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVsYXRpdmU7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fCAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IFwiYWJzb2x1dGU7IFwiLmNvbmNhdChjb29yZClcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlO1wiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gXCJcXG4gICAgICBwb3NpdGlvbjogXCIuY29uY2F0KHBvc2l0aW9uRnJvbVBhcmVudChub2RlKSwgXCJcXG4gICAgXCIpO1xyXG59XHJcbmV4cG9ydHMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuZnVuY3Rpb24gYm94U2hhZG93KG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8XHJcbiAgICAgICAgbm9kZS5lZmZlY3RzLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiR1JPVVBcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcihmdW5jdGlvbiAoZWZmZWN0KSB7IHJldHVybiBlZmZlY3QudHlwZSA9PT0gXCJEUk9QX1NIQURPV1wiOyB9KTtcclxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBjc3MgPSBcImJveC1zaGFkb3c6IFwiO1xyXG4gICAgY3NzICs9IHNoYWRvd3NcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHMub2Zmc2V0LngsIFwicHggXCIpLmNvbmNhdChzLm9mZnNldC55LCBcInB4IFwiKS5jb25jYXQocy5yYWRpdXMsIFwicHggXCIpLmNvbmNhdChzLnNwcmVhZCwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEucmdiYUNvbG9yKShzLmNvbG9yLCBzLmNvbG9yLmEpKTtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIsIFwiKTtcclxuICAgIHJldHVybiAoXCJcIi5jb25jYXQobm9kZS5lZmZlY3RTdHlsZUlkICYmXHJcbiAgICAgICAgXCIvKlwiICsgKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmVmZmVjdFN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkgKyBcIiovXCIpICtcclxuICAgICAgICBjc3MgK1xyXG4gICAgICAgIFwiO1wiKTtcclxufVxyXG5leHBvcnRzLmJveFNoYWRvdyA9IGJveFNoYWRvdztcclxuZnVuY3Rpb24gZm9udFN0eWxlQXNPYmplY3QoZm9udE5hbWUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICB2YXIgaXNJdGFsaWMgPSAoX2EgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiaXRhbGljXCIpO1xyXG4gICAgdmFyIHdlaWdodE1hcCA9IHtcclxuICAgICAgICB0aGluOiAxMDAsXHJcbiAgICAgICAgXCJleHRyYSBsaWdodFwiOiAyMDAsXHJcbiAgICAgICAgZXh0cmFsaWdodDogMjAwLFxyXG4gICAgICAgIGxpZ2h0OiAzMDAsXHJcbiAgICAgICAgbm9ybWFsOiA0MDAsXHJcbiAgICAgICAgcmVndWxhcjogNDAwLFxyXG4gICAgICAgIG1lZGl1bTogNTAwLFxyXG4gICAgICAgIFwic2VtaSBib2xkXCI6IDYwMCxcclxuICAgICAgICBzZW1pYm9sZDogNjAwLFxyXG4gICAgICAgIGJvbGQ6IDcwMCxcclxuICAgICAgICBcImV4dHJhIGJvbGRcIjogODAwLFxyXG4gICAgICAgIGV4dHJhYm9sZDogODAwLFxyXG4gICAgICAgIGJsYWNrOiA5MDBcclxuICAgIH07XHJcbiAgICB2YXIgd2VpZ2h0ID0gKF9iID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiaXRhbGljXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2VpZ2h0OiB3ZWlnaHRNYXBbd2VpZ2h0XSA/IHdlaWdodE1hcFt3ZWlnaHRdIDogXCI0MDBcIixcclxuICAgICAgICBpc0l0YWxpYzogaXNJdGFsaWNcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5mb250U3R5bGVBc09iamVjdCA9IGZvbnRTdHlsZUFzT2JqZWN0O1xyXG5mdW5jdGlvbiBmaWxsQ29sb3Iobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvL2F0bSBvbmx5IG9uZSBmaWxsIGlzIHN1cHBvcnRlZFxyXG4gICAgdmFyIGZpbGwgPSAoX2EgPSBub2RlLmZpbGxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3IoZmlsbCwgbm9kZS5maWxsU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0cy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybXMobm9kZSkge1xyXG4gICAgdmFyIGlzU1ZHID0gKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKTtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIiAmJiAhaXNTVkcpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHZhciB0cmFuc2Zvcm1zID0gKDAsIGhlbHBlcnNfMS5nZXRUcmFuc2Zvcm1zKShub2RlLnJlbGF0aXZlVHJhbnNmb3JtKTtcclxuICAgIHZhciBhYnNvbHV0ZVRyYW5zZm9ybXMgPSAoMCwgaGVscGVyc18xLmdldFRyYW5zZm9ybXMpKG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pO1xyXG4gICAgaWYgKHRyYW5zZm9ybXMuYW5nbGUgPT09IDAgJiZcclxuICAgICAgICB0cmFuc2Zvcm1zLnNjYWxlWCA9PT0gMSAmJlxyXG4gICAgICAgIHRyYW5zZm9ybXMuc2NhbGVZID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBjaGVjayBpZiBpdCBpcyByZW5kZXJlZCBpbnNpZGUgYW4gYXV0b2xheW91dCAmIGZpeCB0cmFuc2Zvcm0gb3JpZ2luLi4uXHJcbiAgICBpZiAoaXNTVkcpIHtcclxuICAgICAgICBpZiAoIW5vZGUuYWJzb2x1dGVSZW5kZXJCb3VuZHMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZShcIi5jb25jYXQoKGFic29sdXRlVHJhbnNmb3Jtcy50cmFuc2xhdGVYIC0gbm9kZS5hYnNvbHV0ZVJlbmRlckJvdW5kcy54KSAqIC0xLCBcInB4LCBcIikuY29uY2F0KChhYnNvbHV0ZVRyYW5zZm9ybXMudHJhbnNsYXRlWSAtIG5vZGUuYWJzb2x1dGVSZW5kZXJCb3VuZHMueSkgKiAtMSwgXCJweCk7XFxuICAgIFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlxcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKFwiLmNvbmNhdCh0cmFuc2Zvcm1zLmFuZ2xlICogLTEsIFwiZGVnKSBzY2FsZShcIikuY29uY2F0KHRyYW5zZm9ybXMuc2NhbGVYLCBcIiwgXCIpLmNvbmNhdCh0cmFuc2Zvcm1zLnNjYWxlWSwgXCIpO1xcbiAgXCIpO1xyXG59XHJcbmV4cG9ydHMudHJhbnNmb3JtcyA9IHRyYW5zZm9ybXM7XHJcbmZ1bmN0aW9uIGdyYWRpZW50TGluZWFyKGZpbGwpIHtcclxuICAgIHZhciBncmFkaWVudFN0b3BzID0gZmlsbC5ncmFkaWVudFN0b3BzO1xyXG4gICAgdmFyIHRyYW5zZm9ybXMgPSAoMCwgaGVscGVyc18xLmdldFRyYW5zZm9ybXMpKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgY29uc29sZS5sb2coZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XHJcbiAgICB2YXIgZ3JhZGllbnRNYXAgPSBncmFkaWVudFN0b3BzLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCgoMCwgaGVscGVyc18xLnJnYmFDb2xvcikocy5jb2xvciwgcy5jb2xvci5hKSwgXCIgXCIpLmNvbmNhdChzLnBvc2l0aW9uICogMTAwLCBcIiVcIik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBcImxpbmVhci1ncmFkaWVudChcIi5jb25jYXQodHJhbnNmb3Jtcy5hbmdsZSArIDkwLCBcImRlZywgXCIpLmNvbmNhdChncmFkaWVudE1hcC5qb2luKFwiLFwiKSwgXCIpXCIpO1xyXG59XHJcbmV4cG9ydHMuZ3JhZGllbnRMaW5lYXIgPSBncmFkaWVudExpbmVhcjtcclxuZnVuY3Rpb24gYm9yZGVyUmFkaXVzKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09IFwiRUxMSVBTRVwiKVxyXG4gICAgICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IDUwJTtcIjtcclxuICAgIGlmICghbm9kZS5jb3JuZXJSYWRpdXMgJiYgIW5vZGUudG9wTGVmdFJhZGl1cylcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdCh0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IG5vZGUuY29ybmVyUmFkaXVzICsgXCJweFwiXHJcbiAgICAgICAgOiBcIlwiLmNvbmNhdChub2RlLnRvcExlZnRSYWRpdXMsIFwicHggXCIpLmNvbmNhdChub2RlLnRvcFJpZ2h0UmFkaXVzLCBcInB4IFwiKS5jb25jYXQobm9kZS5ib3R0b21SaWdodFJhZGl1cywgXCJweCBcIikuY29uY2F0KG5vZGUuYm90dG9tTGVmdFJhZGl1cywgXCJweFwiKSwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuYm9yZGVyUmFkaXVzID0gYm9yZGVyUmFkaXVzO1xyXG5mdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3Ioc3Ryb2tlLCBub2RlLnN0cm9rZVN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydHMuc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcclxuZnVuY3Rpb24gZ2V0Q29sb3IoZmlsbE9yQ29sb3IsIHN0eWxlSWQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghZmlsbE9yQ29sb3IgfHwgIWZpbGxPckNvbG9yLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGxPckNvbG9yLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRMaW5lYXIoZmlsbE9yQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICB2YXIgc3R5bGVOYW1lID0gKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgdmFyIGNvbG9yID0gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICAgICAgPyAoMCwgaGVscGVyc18xLnJnYmFDb2xvcikoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5yZ2JUb0hleCkoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBcInZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLCBcIikuY29uY2F0KGNvbG9yLCBcIilcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICA/ICgwLCBoZWxwZXJzXzEucmdiYUNvbG9yKShmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICA6ICgwLCBoZWxwZXJzXzEucmdiVG9IZXgpKGZpbGxPckNvbG9yLmNvbG9yKTtcclxufVxyXG5leHBvcnRzLmdldENvbG9yID0gZ2V0Q29sb3I7XHJcbmZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCJcclxuICAgIH07XHJcbiAgICB2YXIgdW5pdCA9IHVuaXRNYXBbbm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBcIlwiLmNvbmNhdChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnZhbHVlKS5jb25jYXQodW5pdCk7XHJcbn1cclxuZXhwb3J0cy5saW5lSGVpZ2h0ID0gbGluZUhlaWdodDtcclxuZnVuY3Rpb24gZm9udFNob3J0aGFuZChfYSkge1xyXG4gICAgdmFyIGxpbmVIZWlnaHQgPSBfYS5saW5lSGVpZ2h0LCBmb250U2l6ZSA9IF9hLmZvbnRTaXplLCB3ZWlnaHQgPSBfYS53ZWlnaHQsIGZvbnRGYW1pbHkgPSBfYS5mb250RmFtaWx5LCBpc0l0YWxpYyA9IF9hLmlzSXRhbGljO1xyXG4gICAgdmFyIGl0YWxpYyA9IGlzSXRhbGljID8gXCJpdGFsaWMgXCIgOiBcIlwiO1xyXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHdlaWdodCwgXCIgXCIpLmNvbmNhdChpdGFsaWMpLmNvbmNhdChmb250U2l6ZSwgXCJweFwiKS5jb25jYXQobGluZUhlaWdodCAhPT0gXCJcIiA/IFwiL1wiICsgbGluZUhlaWdodCA6IFwiXCIsIFwiICdcIikuY29uY2F0KGZvbnRGYW1pbHksIFwiJ1wiKTtcclxufVxyXG5leHBvcnRzLmZvbnRTaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kO1xyXG5mdW5jdGlvbiBmb250UHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHZhciBfZCA9IGZvbnRTdHlsZUFzT2JqZWN0KG5vZGUuZm9udE5hbWUpLCB3ZWlnaHQgPSBfZC53ZWlnaHQsIGlzSXRhbGljID0gX2QuaXNJdGFsaWM7XHJcbiAgICB2YXIgZm9udFNpemUgPSAoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgIHZhciBmb250RmFtaWx5ID0gKF9iID0gbm9kZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgdmFyIGxpbmVIZWlnaHRTdHIgPSBsaW5lSGVpZ2h0KG5vZGUpO1xyXG4gICAgdmFyIHNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQoe1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0LFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IGZvbnRGYW1pbHksXHJcbiAgICAgICAgaXNJdGFsaWM6IGlzSXRhbGljXHJcbiAgICB9KTtcclxuICAgIGlmIChub2RlLnRleHRTdHlsZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlTmFtZSA9ICgwLCBoZWxwZXJzXzEuY2xlYW5TdHlsZU5hbWUpKChfYyA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnRleHRTdHlsZUlkLnRvU3RyaW5nKCkpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFwiZm9udDogdmFyKC0tXCIuY29uY2F0KHN0eWxlTmFtZSwgXCIsIFwiKS5jb25jYXQoc2hvcnRoYW5kLCBcIik7XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiZm9udDogXCIuY29uY2F0KHNob3J0aGFuZCwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuZm9udFByb3AgPSBmb250UHJvcDtcclxuZnVuY3Rpb24gdGV4dFRyYW5zZm9ybVByb3Aobm9kZSkge1xyXG4gICAgdmFyIGNhc2VNYXAgPSB7XHJcbiAgICAgICAgVVBQRVI6IFwidXBwZXJjYXNlXCIsXHJcbiAgICAgICAgTE9XRVI6IFwibG93ZXJjYXNlXCJcclxuICAgIH07XHJcbiAgICByZXR1cm4gY2FzZU1hcFtub2RlLnRleHRDYXNlXVxyXG4gICAgICAgID8gXCJ0ZXh0LXRyYW5zZm9ybTogXCIuY29uY2F0KGNhc2VNYXBbbm9kZS50ZXh0Q2FzZV0sIFwiO1wiKVxyXG4gICAgICAgIDogXCJcIjtcclxufVxyXG5leHBvcnRzLnRleHRUcmFuc2Zvcm1Qcm9wID0gdGV4dFRyYW5zZm9ybVByb3A7XHJcbmZ1bmN0aW9uIHRleHREZWNvcmF0aW9uUHJvcChub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUudGV4dERlY29yYXRpb24pXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgZGVjb01hcCA9IHtcclxuICAgICAgICBTVFJJS0VUSFJPVUdIOiBcImxpbmUtdGhyb3VnaFwiLFxyXG4gICAgICAgIFVOREVSTElORTogXCJ1bmRlcmxpbmVcIlxyXG4gICAgfTtcclxuICAgIHJldHVybiBkZWNvTWFwW25vZGUudGV4dERlY29yYXRpb25dXHJcbiAgICAgICAgPyBcInRleHQtZGVjb3JhdGlvbjogXCIuY29uY2F0KGRlY29NYXBbbm9kZS50ZXh0RGVjb3JhdGlvbl0sIFwiO1wiKVxyXG4gICAgICAgIDogXCJcIjtcclxufVxyXG5leHBvcnRzLnRleHREZWNvcmF0aW9uUHJvcCA9IHRleHREZWNvcmF0aW9uUHJvcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qXHJcblRoaXMgZmlsZSB0cmllcyB0byBjb252ZXJ0IGZpZ21hIGludG8gdGFpbHdpbmQuXHJcbkl0IHRyaWVzIHRvIGludGVycHJldCB0aGUgY3NzIGFscmVhZHkgZ2VuZXJhdGVkIGZyb20gdGhpcyBwbHVnaW4gYXMgdGFpbHdpbmQgY2xhc3Nlcy5cclxuVGhpcyB3aWxsIG5ldmVyIHdvcmsgcGVyZmVjdGx5IGJ1dCBtYXkgcHJvdmlkZSBhIHN0YXJ0aW5nIHBvaW50IGZvciBkZXZlbG9wbWVudC5cclxuKi9cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMudGFpbHdpbmQgPSB2b2lkIDA7XHJcbnZhciBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xyXG52YXIgc2l6ZXNNYXAgPSB7XHJcbiAgICBcIjBweFwiOiAwLFxyXG4gICAgXCIxcHhcIjogXCJweFwiLFxyXG4gICAgXCIycHhcIjogMC41LFxyXG4gICAgXCI0cHhcIjogMSxcclxuICAgIFwiNnB4XCI6IDEuNSxcclxuICAgIFwiOHB4XCI6IDIsXHJcbiAgICBcIjEwcHhcIjogMi41LFxyXG4gICAgXCIxMnB4XCI6IDMsXHJcbiAgICBcIjE0cHhcIjogMy41LFxyXG4gICAgXCIxNnB4XCI6IDQsXHJcbiAgICBcIjIwcHhcIjogNSxcclxuICAgIFwiMjRweFwiOiA2XHJcbn07XHJcbnZhciBmbGV4RGlyZWN0aW9uTWFwID0ge1xyXG4gICAgcm93OiBcInJvd1wiLFxyXG4gICAgY29sdW1uOiBcImNvbFwiXHJcbn07XHJcbnZhciB0d01hcCA9IHtcclxuICAgIHBhZGRpbmc6IHNpemVzTWFwLFxyXG4gICAgZ2FwOiBzaXplc01hcCxcclxuICAgIHRvcDogc2l6ZXNNYXAsXHJcbiAgICBsZWZ0OiBzaXplc01hcCxcclxuICAgIFwiZmxleC1kaXJlY3Rpb25cIjogZmxleERpcmVjdGlvbk1hcCxcclxuICAgIFwiYm9yZGVyLXJhZGl1c1wiOiB7XHJcbiAgICAgICAgXCIwcHhcIjogXCJub25lXCIsXHJcbiAgICAgICAgXCIycHhcIjogXCJzbVwiLFxyXG4gICAgICAgIFwiNHB4XCI6IFwiXCIsXHJcbiAgICAgICAgXCI2cHhcIjogXCJtZFwiLFxyXG4gICAgICAgIFwiOHB4XCI6IFwibGdcIixcclxuICAgICAgICBcIjEycHhcIjogXCJ4bFwiLFxyXG4gICAgICAgIFwiMTZweFwiOiBcIjJ4bFwiLFxyXG4gICAgICAgIFwiMjRweFwiOiBcIjN4bFwiLFxyXG4gICAgICAgIFwiOTk5OXB4XCI6IFwiZnVsbFwiXHJcbiAgICB9LFxyXG4gICAgYmFja2dyb3VuZDogeyB0cmFuc3BhcmVudDogXCJ0cmFuc3BhcmVudFwiIH0sXHJcbiAgICBcImp1c3RpZnktY29udGVudFwiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1pdGVtc1wiOiB7XHJcbiAgICAgICAgXCJmbGV4LXN0YXJ0XCI6IFwic3RhcnRcIixcclxuICAgICAgICBcImZsZXgtZW5kXCI6IFwiZW5kXCIsXHJcbiAgICAgICAgY2VudGVyOiBcImNlbnRlclwiXHJcbiAgICB9LFxyXG4gICAgXCJhbGlnbi1zZWxmXCI6IHtcclxuICAgICAgICBzdHJldGNoOiBcInN0cmV0Y2hcIlxyXG4gICAgfSxcclxuICAgIG92ZXJmbG93OiB7XHJcbiAgICAgICAgaGlkZGVuOiBcImhpZGRlblwiXHJcbiAgICB9XHJcbn07XHJcbmZ1bmN0aW9uIHRhaWx3aW5kKHRyZWUpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKChjaGlsZHJlbiA9PT0gbnVsbCB8fCBjaGlsZHJlbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGRyZW4ubGVuZ3RoKSA+IDApKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcChmdW5jdGlvbiAodHJlZUVsZW1lbnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHJlZUVsZW1lbnQudHlwZSA9PT0gXCJWRUNUT1JcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudHlwZSA9PT0gXCJCT09MRUFOX09QRVJBVElPTlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3RvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCAoMCwgY29kZV8xLmNyZWF0ZVNWRykodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhY2t5Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXMsIFwiXFxcIiBzdHlsZT1cXFwiXCIpLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlcykpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYy5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBcIjxkaXYgY2xhc3M9XFxcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXMsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsIFwiIFwiKSkuY29uY2F0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLmFwcGx5KF9hLCBbX2Muc2VudCgpLCBcIlxcbjwvZGl2PlwiXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFsbC5qb2luKFwiXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaHRtbCwgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHwgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3RvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sICgwLCBjb2RlXzEuY3JlYXRlU1ZHKSh0cmVlLm9yaWdpbmFsTm9kZSwgXCJcIi5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlcykpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gX2Quc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gaHRtbDtcclxuICAgICAgICAgICAgICAgICAgICBfYyA9IChfYiA9IFwiPGRpdiBjbGFzcz1cXFwiXCIuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmNsYXNzTmFtZXMsIFwiXFxcIiBzdHlsZT1cXFwiXCIpLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5pbmxpbmVTdHlsZXMsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWUuY2hhcmFjdGVycyA/IHRyZWUuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpIDogXCJcIiwgXCIgXCIpKS5jb25jYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfYSArIF9jLmFwcGx5KF9iLCBbX2Quc2VudCgpLCBcIlxcbjwvZGl2PlwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgaHRtbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMudGFpbHdpbmQgPSB0YWlsd2luZDtcclxuZnVuY3Rpb24gdGFpbHdpbmRDbGFzc05hbWVzKGNzcywgbm9kZSkge1xyXG4gICAgdmFyIGNzc0xpbmVCeUxpbmUgPSBjc3NcclxuICAgICAgICAucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIjtcIilcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRyaW0oKTsgfSlcclxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBcIlwiOyB9KTtcclxuICAgIHZhciBrZXlWYWx1ZVBhaXJzID0gY3NzTGluZUJ5TGluZS5tYXAoZnVuY3Rpb24gKGxpbmUpIHtcclxuICAgICAgICB2YXIgX2EgPSBsaW5lLnNwbGl0KFwiOlwiKSwga2V5ID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgcmV0dXJuIHsga2V5OiBrZXkgPT09IG51bGwgfHwga2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXkudHJpbSgpLCB2YWx1ZTogdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRyaW0oKSB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgY3NzUHJvcHNNYXAgPSB7XHJcbiAgICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwicm91bmRlZFwiLFxyXG4gICAgICAgIHdpZHRoOiBcIndcIixcclxuICAgICAgICBoZWlnaHQ6IFwiaFwiLFxyXG4gICAgICAgIFwidGV4dC1hbGlnblwiOiBcInRleHRcIixcclxuICAgICAgICBcImZsZXgtZGlyZWN0aW9uXCI6IFwiZmxleFwiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcIlwiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiXCIsXHJcbiAgICAgICAgZmxleDogXCJmbGV4XCIsXHJcbiAgICAgICAgZ2FwOiBcImdhcFwiLFxyXG4gICAgICAgIHRvcDogXCJ0b3BcIixcclxuICAgICAgICBsZWZ0OiBcImxlZnRcIixcclxuICAgICAgICBcImp1c3RpZnktY29udGVudFwiOiBcImp1c3RpZnlcIixcclxuICAgICAgICBcImFsaWduLWl0ZW1zXCI6IFwiaXRlbXNcIixcclxuICAgICAgICBcImFsaWduLXNlbGZcIjogXCJzZWxmXCIsXHJcbiAgICAgICAgb3ZlcmZsb3c6IFwib3ZlcmZsb3dcIlxyXG4gICAgfTtcclxuICAgIC8vIHRoZXNlIHdpbGwgYmUgZ2VuZXJhdGVkIGZyb20gbm9kZSBvciBhcmUgbm90IG5lZWRlZCBhdCBhbGxcclxuICAgIHZhciBleGNsdWRlTGlzdCA9IFtcInBhZGRpbmdcIiwgXCJtYXJnaW5cIiwgXCJib3gtc2l6aW5nXCJdO1xyXG4gICAgdmFyIGlubGluZVN0eWxlcyA9IFtdO1xyXG4gICAgdmFyIGNsYXNzTmFtZXMgPSBrZXlWYWx1ZVBhaXJzLm1hcChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIga2V5ID0gX2Eua2V5LCB2YWx1ZSA9IF9hLnZhbHVlO1xyXG4gICAgICAgIGlmIChleGNsdWRlTGlzdC5pbmNsdWRlcyhrZXkpKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgdHdWYWx1ZSA9IGxvb2tVcFRhaWx3aW5kVmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgdmFyIHR3S2V5ID0gY3NzUHJvcHNNYXBba2V5XTtcclxuICAgICAgICBpZiAodHdLZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmxpbmVTdHlsZXMucHVzaChcIlwiLmNvbmNhdChrZXksIFwiOiBcIikuY29uY2F0KHZhbHVlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBmb3IgcHJvcHMgbGlrZSBkaXNwbGF5IGV0Yy4gKi9cclxuICAgICAgICBpZiAodHdLZXkgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0d0tleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFt0d0tleSwgdHdWYWx1ZV0uam9pbihcIi1cIik7XHJcbiAgICB9KTtcclxuICAgIC8vIHBhZGRpbmcsIGZvbnRTaXplIGV0Yy5cclxuICAgIHZhciBjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSA9IGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IGNsYXNzTmFtZXNcclxuICAgICAgICAgICAgLmNvbmNhdChjbGFzc05hbWVzRGlyZWN0bHlFeHRyYWN0ZWRGcm9tTm9kZSlcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSAhPT0gbnVsbDsgfSlcclxuICAgICAgICAgICAgLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIGlubGluZVN0eWxlczogaW5saW5lU3R5bGVzLmpvaW4oXCI7IFwiKVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBsb29rVXBUYWlsd2luZFZhbHVlKHByb3BLZXksIHZhbHVlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgdmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UgPSBbXCJkaXNwbGF5XCIsIFwicG9zaXRpb25cIiwgXCJ0ZXh0LWFsaWduXCIsIFwiZmxleFwiXTtcclxuICAgIHZhciB0d1ZhbHVlID0gKF9hID0gdHdNYXBbcHJvcEtleV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt2YWx1ZV07XHJcbiAgICBpZiAodmFsdWVzTm90TmVlZGVkVG9DaGFuZ2UuaW5jbHVkZXMocHJvcEtleSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiW1wiLmNvbmNhdCh2YWx1ZSwgXCJdXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0d1ZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGV4dHJhY3RDbGFzc05hbWVzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgdmFyIGNsYXNzTmFtZXMgPSBbXTtcclxuICAgIC8qIHBhZGRpbmdzICovXHJcbiAgICBpZiAobm9kZS5wYWRkaW5nTGVmdCkge1xyXG4gICAgICAgIHZhciBwYWRkaW5nc18xID0gW1xyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdCb3R0b20sXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0xlZnQsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAocGFkZGluZ3NfMS5ldmVyeShmdW5jdGlvbiAocCkgeyByZXR1cm4gcCA9PT0gcGFkZGluZ3NfMVswXTsgfSkpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKFwicC1cIi5jb25jYXQobG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcGFkZGluZ3NfMVswXSArIFwicHhcIikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25fMSA9IFtcInRcIiwgXCJyXCIsIFwiYlwiLCBcImxcIl07XHJcbiAgICAgICAgICAgIHBhZGRpbmdzXzEuZm9yRWFjaChmdW5jdGlvbiAocCwgaSkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKFwicFwiLmNvbmNhdChkaXJlY3Rpb25fMVtpXSwgXCItXCIpLmNvbmNhdChsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwICsgXCJweFwiKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiBwYWRkaW5ncyBlbmQgKi9cclxuICAgIHJldHVybiBjbGFzc05hbWVzO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9