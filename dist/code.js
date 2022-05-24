/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var getStyles_1 = __webpack_require__(/*! ./core/getStyles */ "./src/core/getStyles.ts");
/* Beta */
var tailwind_1 = __webpack_require__(/*! ./core/tailwind */ "./src/core/tailwind.ts");
var createTree_1 = __webpack_require__(/*! ./core/createTree */ "./src/core/createTree.ts");
var printCSS_1 = __webpack_require__(/*! ./core/printCSS */ "./src/core/printCSS.ts");
var printHTML_1 = __webpack_require__(/*! ./core/printHTML */ "./src/core/printHTML.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
figma.ui.onmessage = function (msg) {
    figma.clientStorage.setAsync(msg.key, msg.value);
};
function createHTMLandCSS(selection, parameters, _a) {
    var cssStyle = _a.cssStyle;
    return __awaiter(this, void 0, void 0, function () {
        var tree, css, html, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tree = (0, createTree_1.createTree)(selection, { cssStyle: cssStyle });
                    console.log("tree", tree);
                    css = parameters.framework === constants_1.PARAMETERS.FRAMEWORKS.TAILWIND
                        ? "-"
                        : (0, printCSS_1.printCSS)(tree);
                    if (!(parameters.framework === constants_1.PARAMETERS.FRAMEWORKS.TAILWIND)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, tailwind_1.tailwind)(tree)];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, printHTML_1.printHTML)(tree)];
                case 3:
                    _b = _c.sent();
                    _c.label = 4;
                case 4:
                    html = _b;
                    return [2 /*return*/, {
                            html: html,
                            css: css
                        }];
            }
        });
    });
}
figma.parameters.on("input", function (_a) {
    var parameters = _a.parameters, key = _a.key, query = _a.query, result = _a.result;
    switch (key) {
        case "framework":
            var frameworks = [
                constants_1.PARAMETERS.FRAMEWORKS.HTML,
                constants_1.PARAMETERS.FRAMEWORKS.REACT,
                constants_1.PARAMETERS.FRAMEWORKS.TAILWIND,
            ];
            result.setSuggestions(frameworks.filter(function (s) { return s.includes(query); }));
            break;
        default:
            return;
    }
});
var pluginParameters;
figma.on("run", function (_a) {
    var command = _a.command, parameters = _a.parameters;
    figma.showUI(__html__, { height: 600, width: 500 });
    pluginParameters = parameters;
    updateAndPostToUI(pluginParameters);
});
figma.on("selectionchange", function () {
    figma.ui.postMessage({ loading: true });
    setTimeout(function () {
        updateAndPostToUI(pluginParameters);
    }, 100);
});
function updateAndPostToUI(parameters) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var cssStyle, _g, html, css;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (figma.currentPage.selection.length === 0) {
                        figma.ui.postMessage({
                            loading: false,
                            notification: "Select a layer."
                        });
                        return [2 /*return*/];
                    }
                    if (figma.currentPage.selection.length > 1) {
                        figma.ui.postMessage({
                            loading: false,
                            notification: "Select only one layer."
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, figma.clientStorage.getAsync("cssStyle")];
                case 1:
                    cssStyle = _h.sent();
                    return [4 /*yield*/, createHTMLandCSS(figma.currentPage.selection, parameters, { cssStyle: cssStyle })];
                case 2:
                    _g = _h.sent(), html = _g.html, css = _g.css;
                    figma.ui.postMessage({
                        settings: { cssStyle: cssStyle },
                        loading: false,
                        notification: false,
                        css: css,
                        html: html,
                        framework: parameters.framework,
                        styles: (0, getStyles_1.getStyles)(figma),
                        name: (_c = (_b = (_a = figma.currentPage) === null || _a === void 0 ? void 0 : _a.selection) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name,
                        selectionWidth: (_f = (_e = (_d = figma.currentPage) === null || _d === void 0 ? void 0 : _d.selection) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.width
                    });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.SETTINGS = exports.PARAMETERS = void 0;
exports.PARAMETERS = {
    FRAMEWORKS: {
        TAILWIND: "tailwind css (beta)",
        REACT: "react",
        HTML: "html"
    }
};
exports.SETTINGS = {
    CSS_STYLES: {
        DEFAULT: "",
        BEM: "bem"
    }
};


/***/ }),

/***/ "./src/core/createSVG.ts":
/*!*******************************!*\
  !*** ./src/core/createSVG.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


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


/***/ }),

/***/ "./src/core/createTree.ts":
/*!********************************!*\
  !*** ./src/core/createTree.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.createTree = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
var nodeCSS_1 = __webpack_require__(/*! ./nodeCSS */ "./src/core/nodeCSS.ts");
var getTreeElementByProperty_1 = __webpack_require__(/*! ./getTreeElementByProperty */ "./src/core/getTreeElementByProperty.ts");
var getTextSegments_1 = __webpack_require__(/*! ./getTextSegments */ "./src/core/getTextSegments.ts");
var constants_1 = __webpack_require__(/*! ../constants */ "./src/constants.ts");
function createTree(selection, _a) {
    var _b;
    var cssStyle = _a.cssStyle;
    var componentName = "component";
    var selectionNode = selection[0];
    var isComponentSet = selectionNode.type === "COMPONENT_SET";
    var originalNode = isComponentSet
        ? selectionNode.defaultVariant
        : selectionNode;
    // Only to prevent duplicate Names
    var allNames = [];
    function uniqueName(className, n, css) {
        if (n === void 0) { n = 1; }
        if (css === void 0) { css = null; }
        var suffix = n > 1 ? n : "";
        if (allNames.includes(className + suffix)) {
            // check if there is already a css class with that name
            if (css) {
                var elementWithSameName = (0, getTreeElementByProperty_1.getTreeElementByProperty)(tree, "shortName", className + suffix);
                if ((elementWithSameName === null || elementWithSameName === void 0 ? void 0 : elementWithSameName.css) === css &&
                    !elementWithSameName.willBeRenderedAsSVG) {
                    return {
                        existsWithSameCss: true,
                        name: className + suffix
                    };
                }
            }
            return uniqueName(className, n + 1, css);
        }
        else {
            allNames.push(className + suffix);
            return {
                existsWithSameCss: false,
                name: className + suffix
            };
        }
    }
    componentName = uniqueName((0, helpers_1.makeSafeForCSS)(selectionNode.name)).name;
    var createTreeElement = function (_a) {
        var name = _a.name, node = _a.node, css = _a.css, _b = _a.shortName, shortName = _b === void 0 ? name : _b, _c = _a.skipCss, skipCss = _c === void 0 ? false : _c, _d = _a.baseSelector, baseSelector = _d === void 0 ? "" : _d, _e = _a.isComponentSet, isComponentSet = _e === void 0 ? false : _e;
        return {
            name: name,
            shortName: shortName,
            skipCss: skipCss,
            css: css,
            willBeRenderedAsSVG: (0, helpers_1.willBeRenderedAsSVG)(node),
            children: [],
            type: node.type,
            characters: node.characters,
            originalNode: node,
            textSegments: [],
            baseSelector: baseSelector,
            variants: isComponentSet && []
        };
    };
    var tree = createTreeElement({
        name: componentName,
        node: originalNode,
        css: (0, nodeCSS_1.nodeCSS)(originalNode),
        isComponentSet: isComponentSet
    });
    function theChildren(children, treeChildren, baseSelector) {
        if (baseSelector === void 0) { baseSelector = ""; }
        children.forEach(function (node) {
            var _a;
            if (!node.visible)
                return;
            var css = (0, nodeCSS_1.nodeCSS)(node);
            var uniqueNameInformation = uniqueName((0, helpers_1.makeSafeForCSS)(node.name), 1, css);
            var shortName = uniqueNameInformation.name;
            var skipCss = uniqueNameInformation.existsWithSameCss;
            var prefix = cssStyle === constants_1.SETTINGS.CSS_STYLES.BEM ? "".concat(componentName, "__") : "";
            var name = "".concat(prefix).concat(shortName);
            var newElement = createTreeElement({
                name: name,
                node: node,
                shortName: shortName,
                skipCss: skipCss,
                css: css,
                baseSelector: baseSelector
            });
            treeChildren === null || treeChildren === void 0 ? void 0 : treeChildren.push(newElement);
            if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(node.children, newElement.children, baseSelector);
            }
            if (node.type === "TEXT") {
                var textSegments = (0, getTextSegments_1.getTextSegments)(node, name, uniqueName);
                newElement.textSegments = textSegments;
            }
        });
    }
    if (((_b = originalNode.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        theChildren(originalNode.children, tree.children);
        /* Component Variants */
        if (isComponentSet) {
            selectionNode.children.forEach(function (variant) {
                var _a;
                var variantName = (0, helpers_1.makeSafeForCSS)("".concat(componentName, "--").concat(variant === null || variant === void 0 ? void 0 : variant.name));
                var baseSelector = "." + variantName;
                var newVariant = createTreeElement({
                    name: componentName,
                    node: variant,
                    css: (0, nodeCSS_1.nodeCSS)(variant),
                    baseSelector: baseSelector
                });
                (_a = tree.variants) === null || _a === void 0 ? void 0 : _a.push(newVariant);
                allNames = []; // reset classNames so the new generated match the ones in the defaultVariant
                theChildren(variant.children, newVariant.children, baseSelector);
            });
        }
    }
    if (originalNode.type === "TEXT") {
        var textSegments = (0, getTextSegments_1.getTextSegments)(originalNode, tree.name, uniqueName);
        tree.textSegments = textSegments;
    }
    return tree;
}
exports.createTree = createTree;


/***/ }),

/***/ "./src/core/cssProperties/backdropFilterProp.ts":
/*!******************************************************!*\
  !*** ./src/core/cssProperties/backdropFilterProp.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function backdropFilterProp(node) {
    var _a;
    if (!node.effects ||
        node.effects.length === 0 ||
        (0, helpers_1.willBeRenderedAsSVG)(node) ||
        node.type === "GROUP")
        return "";
    var styleId = node.effectStyleId;
    var blur = node.effects.filter(function (effect) { return effect.type === "BACKGROUND_BLUR" && effect.visible; });
    if (blur.length === 0)
        return "";
    var css = "backdrop-filter: ";
    var value = blur
        .map(function (b) {
        return "blur(".concat((0, helpers_1.cleanNumber)(b.radius / 2), "px)");
    })
        .join(" ");
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        value = "var(--".concat(styleName, "-backdrop-filter, ").concat(value, ")");
    }
    return css + value + ";";
}
exports["default"] = backdropFilterProp;


/***/ }),

/***/ "./src/core/cssProperties/backgroundProp.ts":
/*!**************************************************!*\
  !*** ./src/core/cssProperties/backgroundProp.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var fillColor_1 = __webpack_require__(/*! ./fillColor */ "./src/core/cssProperties/fillColor.ts");
function backgroundProp(node) {
    var color = (0, fillColor_1.fillColor)(node);
    if (!color || color === "") {
        return "";
    }
    if (color === "transparent")
        return "";
    return "background: ".concat(color, ";");
}
exports["default"] = backgroundProp;


/***/ }),

/***/ "./src/core/cssProperties/borderProp.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/borderProp.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var strokeColor_1 = __webpack_require__(/*! ./strokeColor */ "./src/core/cssProperties/strokeColor.ts");
/**
 * CSS Property Functions
 *
 * All Functions ending with Prop or Props will return a css property string ending with a semicolon or an empty string
 * e.g. "background: #12345;"
 */
function borderProp(node) {
    var _a, _b;
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    if (((_b = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "GRADIENT_LINEAR") {
        return "\n    border-width: ".concat((0, helpers_1.cleanNumber)(node.strokeWeight), "px; \n    border-style: solid; \n    border-image: ").concat((0, strokeColor_1.strokeColor)(node), "; \n    border-image-slice: 1;\n    ");
    }
    return "border: ".concat((0, helpers_1.cleanNumber)(node.strokeWeight), "px solid ").concat((0, strokeColor_1.strokeColor)(node), ";");
}
exports["default"] = borderProp;


/***/ }),

/***/ "./src/core/cssProperties/borderRadiusProp.ts":
/*!****************************************************!*\
  !*** ./src/core/cssProperties/borderRadiusProp.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function borderRadiusProp(node) {
    if (node.type === "ELLIPSE")
        return "border-radius: 50%;";
    if (!node.cornerRadius && !node.topLeftRadius)
        return "";
    return "border-radius: ".concat(typeof node.cornerRadius === "number"
        ? (0, helpers_1.cleanNumber)(node.cornerRadius) + "px"
        : "".concat((0, helpers_1.cleanNumber)(node.topLeftRadius), "px ").concat((0, helpers_1.cleanNumber)(node.topRightRadius), "px ").concat((0, helpers_1.cleanNumber)(node.bottomRightRadius), "px ").concat((0, helpers_1.cleanNumber)(node.bottomLeftRadius), "px"), ";");
}
exports["default"] = borderRadiusProp;


/***/ }),

/***/ "./src/core/cssProperties/boxShadowProp.ts":
/*!*************************************************!*\
  !*** ./src/core/cssProperties/boxShadowProp.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function boxShadowProp(node) {
    var _a;
    if (!node.effects ||
        node.effects.length === 0 ||
        (0, helpers_1.willBeRenderedAsSVG)(node) ||
        node.type === "GROUP")
        return "";
    var styleId = node.effectStyleId;
    var shadowTypes = ["INNER_SHADOW", "DROP_SHADOW"];
    var shadows = node.effects.filter(function (effect) {
        return shadowTypes.includes(effect.type);
    });
    if (shadows.length === 0)
        return "";
    var css = "box-shadow: ";
    var value = shadows
        .map(function (s) {
        return "".concat(s.type === "INNER_SHADOW" ? "inset" : "", " ").concat((0, helpers_1.cleanNumber)(s.offset.x), "px ").concat((0, helpers_1.cleanNumber)(s.offset.y), "px ").concat((0, helpers_1.cleanNumber)(s.radius), "px ").concat((0, helpers_1.cleanNumber)(s.spread), "px ").concat((0, helpers_1.rgbaColor)(s.color, s.color.a));
    })
        .join(", ");
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        value = "var(--".concat(styleName, "-box-shadow, ").concat(value, ")");
    }
    return css + value + ";";
}
exports["default"] = boxShadowProp;


/***/ }),

/***/ "./src/core/cssProperties/colorProp.ts":
/*!*********************************************!*\
  !*** ./src/core/cssProperties/colorProp.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var fillColor_1 = __webpack_require__(/*! ./fillColor */ "./src/core/cssProperties/fillColor.ts");
function colorProp(node) {
    var color = (0, fillColor_1.fillColor)(node);
    if (!color || color === "") {
        return "";
    }
    if (color === "transparent")
        return "";
    return "color: ".concat(color, ";");
}
exports["default"] = colorProp;


/***/ }),

/***/ "./src/core/cssProperties/cssFromConstraints.ts":
/*!******************************************************!*\
  !*** ./src/core/cssProperties/cssFromConstraints.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.cssFromConstraints = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var findAbsoluteParent_1 = __webpack_require__(/*! ./findAbsoluteParent */ "./src/core/cssProperties/findAbsoluteParent.ts");
function cssFromConstraints(node) {
    var _a, _b;
    var coord = "";
    switch ((_a = node.constraints) === null || _a === void 0 ? void 0 : _a.horizontal) {
        case "MAX":
            coord += "right: ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).width - node.width - node.x), "px;");
            break;
        case "STRETCH":
            coord += "right: ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).width - node.width - node.x), "px; left: ").concat(node.x, "px;");
            break;
        case "CENTER":
            coord += "left: calc(50% - ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).width / 2 - node.x), "px);");
            break;
        default:
            coord += "left: ".concat((0, helpers_1.cleanNumber)(node.x), "px;");
    }
    switch ((_b = node.constraints) === null || _b === void 0 ? void 0 : _b.vertical) {
        case "MAX":
            coord += "bottom: ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).height - node.height - node.y), "px;");
            break;
        case "STRETCH":
            coord += "bottom: ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).height - node.height - node.y), "px; top: ").concat(node.y, "px;");
            break;
        case "CENTER":
            coord += "top: calc(50% - ".concat((0, helpers_1.cleanNumber)((0, findAbsoluteParent_1.findAbsoluteParent)(node).height / 2 - node.y), "px);");
            break;
        default:
            coord += "top: ".concat((0, helpers_1.cleanNumber)(node.y), "px;");
    }
    return coord;
}
exports.cssFromConstraints = cssFromConstraints;
exports["default"] = cssFromConstraints;


/***/ }),

/***/ "./src/core/cssProperties/dimensions.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/dimensions.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
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
            node.primaryAxisSizingMode === "AUTO"
                ? "auto"
                : (0, helpers_1.cleanNumber)(node.height) + "px";
        width =
            node.counterAxisSizingMode === "AUTO"
                ? "auto"
                : (0, helpers_1.cleanNumber)(node.width) + "px";
    }
    if (node.layoutMode === "HORIZONTAL") {
        width =
            node.primaryAxisSizingMode === "AUTO"
                ? "auto"
                : (0, helpers_1.cleanNumber)(node.width) + "px";
        height =
            node.counterAxisSizingMode === "AUTO"
                ? "auto"
                : (0, helpers_1.cleanNumber)(node.height) + "px";
    }
    if (!node.layoutMode || node.layoutMode === "NONE") {
        height = ((_a = node.textAutoResize) === null || _a === void 0 ? void 0 : _a.toString().includes("HEIGHT"))
            ? "auto"
            : (0, helpers_1.cleanNumber)(node.height) + "px";
        width = ((_b = node.textAutoResize) === null || _b === void 0 ? void 0 : _b.toString().includes("WIDTH"))
            ? "auto"
            : (0, helpers_1.cleanNumber)(node.width) + "px";
    }
    if ((!node.children || ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) === 0) && node.type !== "TEXT") {
        height = (0, helpers_1.cleanNumber)(node.height) + "px";
        width = (0, helpers_1.cleanNumber)(node.width) + "px";
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
    return [
        width !== "auto" ? "width: ".concat(width, ";") : undefined,
        height !== "auto" ? "height: ".concat(height, ";") : undefined,
    ]
        .filter(function (i) { return i; }) // delete undefined
        .join(" ");
}
exports["default"] = dimensions;


/***/ }),

/***/ "./src/core/cssProperties/displayProp.ts":
/*!***********************************************!*\
  !*** ./src/core/cssProperties/displayProp.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function displayProp(node) {
    var flexShrinkGrow = node.layoutGrow === 1 ? "flex: 1;" : shrink();
    function shrink() {
        return !(node.type === "TEXT") //&& !(node.primaryAxisSizingMode === "AUTO")
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
    function gap() {
        if (node.primaryAxisAlignItems === "SPACE_BETWEEN")
            return "";
        if (node.itemSpacing < 0)
            return "";
        return "gap: ".concat((0, helpers_1.cleanNumber)(node.itemSpacing), "px;");
    }
    var flexProps = function (direction) {
        return "\n      display: flex;\n      flex-direction: ".concat(direction, ";\n      ").concat(gap(), "\n      align-items: ").concat(alignmentMap[node.counterAxisAlignItems], ";\n      justify-content: ").concat(alignmentMap[node.primaryAxisAlignItems], ";\n    ");
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
exports["default"] = displayProp;


/***/ }),

/***/ "./src/core/cssProperties/fillColor.ts":
/*!*********************************************!*\
  !*** ./src/core/cssProperties/fillColor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.fillColor = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var getColor_1 = __webpack_require__(/*! ./getColor */ "./src/core/cssProperties/getColor.ts");
function fillColor(nodeOrStyle) {
    var _a;
    if ((0, helpers_1.willBeRenderedAsSVG)(nodeOrStyle))
        return "";
    var fills = nodeOrStyle.fills;
    // multiple fills
    if ((fills === null || fills === void 0 ? void 0 : fills.length) > 1) {
        var fillsAsGradients = fills
            .map(function (fill) {
            return (0, getColor_1.getColor)(fill, false, true);
        })
            .filter(function (str) { return str !== ""; })
            .filter(function (str) { return str; })
            .reverse()
            .join(", ");
        if (nodeOrStyle.fillStyleId) {
            var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(nodeOrStyle.fillStyleId)) === null || _a === void 0 ? void 0 : _a.name);
            return "var(--".concat(styleName, ", ").concat(fillsAsGradients, ")");
        }
        return fillsAsGradients;
    }
    // single fill
    return (0, getColor_1.getColor)(fills === null || fills === void 0 ? void 0 : fills[0], nodeOrStyle.fillStyleId);
}
exports.fillColor = fillColor;
exports["default"] = fillColor;


/***/ }),

/***/ "./src/core/cssProperties/filterProp.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/filterProp.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function filterProp(node) {
    var _a;
    if (!node.effects ||
        node.effects.length === 0 ||
        (0, helpers_1.willBeRenderedAsSVG)(node) ||
        node.type === "GROUP")
        return "";
    var styleId = node.effectStyleId;
    var blur = node.effects.filter(function (effect) { return effect.type === "LAYER_BLUR" && effect.visible; });
    if (blur.length === 0)
        return "";
    var css = "filter: ";
    var value = blur
        .map(function (b) {
        return "blur(".concat((0, helpers_1.cleanNumber)(b.radius / 2), "px)");
    })
        .join(" ");
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        value = "var(--".concat(styleName, "-filter, ").concat(value, ")");
    }
    return css + value + ";";
}
exports["default"] = filterProp;


/***/ }),

/***/ "./src/core/cssProperties/findAbsoluteParent.ts":
/*!******************************************************!*\
  !*** ./src/core/cssProperties/findAbsoluteParent.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.findAbsoluteParent = void 0;
function findAbsoluteParent(node) {
    if (node.parent.type === "GROUP") {
        return findAbsoluteParent(node.parent);
    }
    return node.parent;
}
exports.findAbsoluteParent = findAbsoluteParent;
exports["default"] = findAbsoluteParent;


/***/ }),

/***/ "./src/core/cssProperties/flexPropsForText.ts":
/*!****************************************************!*\
  !*** ./src/core/cssProperties/flexPropsForText.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
function flexPropsForText(node) {
    var _a;
    /* Don't do anything at all if textAlignVertical is set to top */
    if (node.textAlignVertical && node.textAlignVertical === "TOP")
        return "";
    var css = "display: flex;\n";
    if (node.textAlignVertical === "CENTER") {
        css += "align-items: center;";
    }
    else {
        css += "align-items: flex-end;";
    }
    // if vertical align is applied i also to additionally add horizontal align...
    var textAlign = (_a = node.textAlignHorizontal) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    var textToFlexAlignMap = {
        left: "flex-start",
        center: "center",
        right: "flex-end"
    };
    css += "justify-content: ".concat(textToFlexAlignMap[textAlign]);
    return css;
}
exports["default"] = flexPropsForText;


/***/ }),

/***/ "./src/core/cssProperties/fontProp.ts":
/*!********************************************!*\
  !*** ./src/core/cssProperties/fontProp.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var fontShorthand_1 = __webpack_require__(/*! ./fontShorthand */ "./src/core/cssProperties/fontShorthand.ts");
var fontStyleAsObject_1 = __webpack_require__(/*! ./fontStyleAsObject */ "./src/core/cssProperties/fontStyleAsObject.ts");
var lineHeight_1 = __webpack_require__(/*! ./lineHeight */ "./src/core/cssProperties/lineHeight.ts");
function fontProp(node) {
    var _a, _b, _c;
    var _d = (0, fontStyleAsObject_1.fontStyleAsObject)(node.fontName), weight = _d.weight, isItalic = _d.isItalic;
    var fontSize = Number((_a = node.fontSize) === null || _a === void 0 ? void 0 : _a.toString()); // toString is needed to convert Symbols into string first (i think)
    var fontFamily = (_b = node.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
    var lineHeightStr = (0, lineHeight_1["default"])(node);
    var shorthand = (0, fontShorthand_1.fontShorthand)({
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
exports["default"] = fontProp;


/***/ }),

/***/ "./src/core/cssProperties/fontShorthand.ts":
/*!*************************************************!*\
  !*** ./src/core/cssProperties/fontShorthand.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.fontShorthand = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function fontShorthand(_a) {
    var lineHeight = _a.lineHeight, fontSize = _a.fontSize, weight = _a.weight, fontFamily = _a.fontFamily, isItalic = _a.isItalic;
    var italic = isItalic ? "italic " : "";
    return "".concat(weight, " ").concat(italic).concat((0, helpers_1.cleanNumber)(fontSize), "px").concat(lineHeight !== "" ? "/" + lineHeight : "", " '").concat(fontFamily, "'");
}
exports.fontShorthand = fontShorthand;
exports["default"] = fontShorthand;


/***/ }),

/***/ "./src/core/cssProperties/fontStyleAsObject.ts":
/*!*****************************************************!*\
  !*** ./src/core/cssProperties/fontStyleAsObject.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.fontStyleAsObject = void 0;
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
exports["default"] = fontStyleAsObject;


/***/ }),

/***/ "./src/core/cssProperties/getColor.ts":
/*!********************************************!*\
  !*** ./src/core/cssProperties/getColor.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getColor = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var gradientFill_1 = __webpack_require__(/*! ./gradientFill */ "./src/core/cssProperties/gradientFill.ts");
function getColor(fillOrColor, styleId, isMultiFill // to enable multiple fills
) {
    var _a;
    if (isMultiFill === void 0) { isMultiFill = false; }
    if (isMultiFill && (!fillOrColor || !fillOrColor.visible)) {
        return "";
    }
    if (!fillOrColor || !fillOrColor.visible) {
        return "transparent";
    }
    var gradientTypes = [
        "GRADIENT_LINEAR",
        "GRADIENT_RADIAL",
        "GRADIENT_ANGULAR",
        "GRADIENT_DIAMOND",
    ];
    if (gradientTypes.includes(fillOrColor.type)) {
        return (0, gradientFill_1.gradientFill)(fillOrColor, styleId, isMultiFill);
    }
    var color = (0, helpers_1.colorAsHexOrRgba)(fillOrColor);
    if (isMultiFill && fillOrColor.type === "SOLID") {
        return "linear-gradient(to left, ".concat(color, ", ").concat(color, ")");
    }
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        return "var(--".concat(styleName, ", ").concat(color, ")");
    }
    return (0, helpers_1.colorAsHexOrRgba)(fillOrColor);
}
exports.getColor = getColor;
exports["default"] = getColor;


/***/ }),

/***/ "./src/core/cssProperties/gradientFill.ts":
/*!************************************************!*\
  !*** ./src/core/cssProperties/gradientFill.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.gradientFill = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function gradientFill(fill, styleId, isMultiFill) {
    var _a;
    if (isMultiFill === void 0) { isMultiFill = false; }
    var gradientStops = fill.gradientStops;
    var transforms = (0, helpers_1.getTransforms)(fill.gradientTransform);
    var gradientMap = gradientStops.map(function (s) {
        return "".concat((0, helpers_1.rgbaColor)(s.color, (0, helpers_1.cleanNumber)(s.color.a * fill.opacity)), " ").concat(s.position * 100, "%");
    });
    var gradientNameMap = {
        GRADIENT_LINEAR: "linear-gradient",
        GRADIENT_RADIAL: "radial-gradient",
        GRADIENT_ANGULAR: "conic-gradient",
        GRADIENT_DIAMOND: "radial-gradient"
    };
    var gradientSpecificTextMap = {
        GRADIENT_LINEAR: "".concat((0, helpers_1.cleanNumber)(transforms.angle + 90), "deg"),
        GRADIENT_RADIAL: "closest-side",
        GRADIENT_ANGULAR: "from ".concat((0, helpers_1.cleanNumber)(transforms.angle + 90), "deg at 50% 50%"),
        GRADIENT_DIAMOND: "closest-side"
    };
    var gradient = "".concat(gradientNameMap[fill.type], "(").concat(gradientSpecificTextMap[fill.type], ", ").concat(gradientMap.join(","), ")");
    if (styleId) {
        var styleName = (0, helpers_1.cleanStyleName)((_a = figma.getStyleById(styleId)) === null || _a === void 0 ? void 0 : _a.name);
        return "var(--".concat(styleName, ", ").concat(gradient, ")");
    }
    return gradient;
}
exports.gradientFill = gradientFill;
exports["default"] = gradientFill;


/***/ }),

/***/ "./src/core/cssProperties/index.ts":
/*!*****************************************!*\
  !*** ./src/core/cssProperties/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.marginProp = exports.flexPropsForText = exports.textDecorationProp = exports.textTransformProp = exports.fontProp = exports.fontShorthand = exports.lineHeight = exports.getColor = exports.strokeColor = exports.borderRadiusProp = exports.gradientFill = exports.transformProps = exports.colorProp = exports.backgroundProp = exports.fillColor = exports.fontStyleAsObject = exports.boxShadowProp = exports.positionProps = exports.cssFromConstraints = exports.findAbsoluteParent = exports.opacityProp = exports.overflowProp = exports.dimensions = exports.displayProp = exports.paddingProp = exports.borderProp = void 0;
var borderProp_1 = __webpack_require__(/*! ./borderProp */ "./src/core/cssProperties/borderProp.ts");
exports.borderProp = borderProp_1["default"];
var paddingProp_1 = __webpack_require__(/*! ./paddingProp */ "./src/core/cssProperties/paddingProp.ts");
exports.paddingProp = paddingProp_1["default"];
var displayProp_1 = __webpack_require__(/*! ./displayProp */ "./src/core/cssProperties/displayProp.ts");
exports.displayProp = displayProp_1["default"];
var dimensions_1 = __webpack_require__(/*! ./dimensions */ "./src/core/cssProperties/dimensions.ts");
exports.dimensions = dimensions_1["default"];
var overflowProp_1 = __webpack_require__(/*! ./overflowProp */ "./src/core/cssProperties/overflowProp.ts");
exports.overflowProp = overflowProp_1["default"];
var opacityProp_1 = __webpack_require__(/*! ./opacityProp */ "./src/core/cssProperties/opacityProp.ts");
exports.opacityProp = opacityProp_1["default"];
var findAbsoluteParent_1 = __webpack_require__(/*! ./findAbsoluteParent */ "./src/core/cssProperties/findAbsoluteParent.ts");
exports.findAbsoluteParent = findAbsoluteParent_1["default"];
var cssFromConstraints_1 = __webpack_require__(/*! ./cssFromConstraints */ "./src/core/cssProperties/cssFromConstraints.ts");
exports.cssFromConstraints = cssFromConstraints_1["default"];
var positionProps_1 = __webpack_require__(/*! ./positionProps */ "./src/core/cssProperties/positionProps.ts");
exports.positionProps = positionProps_1["default"];
var boxShadowProp_1 = __webpack_require__(/*! ./boxShadowProp */ "./src/core/cssProperties/boxShadowProp.ts");
exports.boxShadowProp = boxShadowProp_1["default"];
var fontStyleAsObject_1 = __webpack_require__(/*! ./fontStyleAsObject */ "./src/core/cssProperties/fontStyleAsObject.ts");
exports.fontStyleAsObject = fontStyleAsObject_1["default"];
var fillColor_1 = __webpack_require__(/*! ./fillColor */ "./src/core/cssProperties/fillColor.ts");
exports.fillColor = fillColor_1["default"];
var backgroundProp_1 = __webpack_require__(/*! ./backgroundProp */ "./src/core/cssProperties/backgroundProp.ts");
exports.backgroundProp = backgroundProp_1["default"];
var colorProp_1 = __webpack_require__(/*! ./colorProp */ "./src/core/cssProperties/colorProp.ts");
exports.colorProp = colorProp_1["default"];
var transformProps_1 = __webpack_require__(/*! ./transformProps */ "./src/core/cssProperties/transformProps.ts");
exports.transformProps = transformProps_1["default"];
var gradientFill_1 = __webpack_require__(/*! ./gradientFill */ "./src/core/cssProperties/gradientFill.ts");
exports.gradientFill = gradientFill_1["default"];
var borderRadiusProp_1 = __webpack_require__(/*! ./borderRadiusProp */ "./src/core/cssProperties/borderRadiusProp.ts");
exports.borderRadiusProp = borderRadiusProp_1["default"];
var strokeColor_1 = __webpack_require__(/*! ./strokeColor */ "./src/core/cssProperties/strokeColor.ts");
exports.strokeColor = strokeColor_1["default"];
var getColor_1 = __webpack_require__(/*! ./getColor */ "./src/core/cssProperties/getColor.ts");
exports.getColor = getColor_1["default"];
var lineHeight_1 = __webpack_require__(/*! ./lineHeight */ "./src/core/cssProperties/lineHeight.ts");
exports.lineHeight = lineHeight_1["default"];
var fontShorthand_1 = __webpack_require__(/*! ./fontShorthand */ "./src/core/cssProperties/fontShorthand.ts");
exports.fontShorthand = fontShorthand_1["default"];
var fontProp_1 = __webpack_require__(/*! ./fontProp */ "./src/core/cssProperties/fontProp.ts");
exports.fontProp = fontProp_1["default"];
var textTransformProp_1 = __webpack_require__(/*! ./textTransformProp */ "./src/core/cssProperties/textTransformProp.ts");
exports.textTransformProp = textTransformProp_1["default"];
var textDecorationProp_1 = __webpack_require__(/*! ./textDecorationProp */ "./src/core/cssProperties/textDecorationProp.ts");
exports.textDecorationProp = textDecorationProp_1["default"];
var flexPropsForText_1 = __webpack_require__(/*! ./flexPropsForText */ "./src/core/cssProperties/flexPropsForText.ts");
exports.flexPropsForText = flexPropsForText_1["default"];
var marginProp_1 = __webpack_require__(/*! ./marginProp */ "./src/core/cssProperties/marginProp.ts");
exports.marginProp = marginProp_1["default"];


/***/ }),

/***/ "./src/core/cssProperties/lineHeight.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/lineHeight.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
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
    return "".concat((0, helpers_1.cleanNumber)(nodeOrStyle.lineHeight.value)).concat(unit);
}
exports["default"] = lineHeight;


/***/ }),

/***/ "./src/core/cssProperties/marginProp.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/marginProp.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function marginProp(node) {
    if (node !== node.parent.children[0] &&
        node.parent.layoutMode &&
        node.parent.layoutMode !== "NONE" &&
        node.parent.itemSpacing < 0) {
        var val = "".concat((0, helpers_1.cleanNumber)(node.parent.itemSpacing), "px");
        if (node.parent.layoutMode === "HORIZONTAL") {
            return "margin: 0 0 0 ".concat(val, ";");
        }
        else {
            return "margin: ".concat(val, " 0 0 0;");
        }
    }
    return "";
}
exports["default"] = marginProp;


/***/ }),

/***/ "./src/core/cssProperties/opacityProp.ts":
/*!***********************************************!*\
  !*** ./src/core/cssProperties/opacityProp.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
function opacityProp(node) {
    if (node.opacity === 1)
        return "";
    return "opacity: ".concat(node.opacity, ";");
}
exports["default"] = opacityProp;


/***/ }),

/***/ "./src/core/cssProperties/overflowProp.ts":
/*!************************************************!*\
  !*** ./src/core/cssProperties/overflowProp.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function overflowProp(node) {
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "overflow: visible;";
    return node.clipsContent ? "overflow: hidden;" : "";
}
exports["default"] = overflowProp;


/***/ }),

/***/ "./src/core/cssProperties/paddingProp.ts":
/*!***********************************************!*\
  !*** ./src/core/cssProperties/paddingProp.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function paddingProp(node) {
    if (!node.paddingTop &&
        !node.paddingRight &&
        !node.paddingBottom &&
        !node.paddingLeft)
        return "";
    return "padding: ".concat((0, helpers_1.cleanNumber)(node.paddingTop), "px ").concat((0, helpers_1.cleanNumber)(node.paddingRight), "px ").concat((0, helpers_1.cleanNumber)(node.paddingBottom), "px ").concat((0, helpers_1.cleanNumber)(node.paddingLeft), "px;");
}
exports["default"] = paddingProp;


/***/ }),

/***/ "./src/core/cssProperties/positionProps.ts":
/*!*************************************************!*\
  !*** ./src/core/cssProperties/positionProps.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
var cssFromConstraints_1 = __webpack_require__(/*! ./cssFromConstraints */ "./src/core/cssProperties/cssFromConstraints.ts");
function positionProps(node) {
    var coord = "";
    if (node.id !== figma.currentPage.selection[0].id) {
        coord = (0, cssFromConstraints_1.cssFromConstraints)(node);
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
        return "".concat(node.layoutPositioning === "ABSOLUTE" ||
            node.parent.layoutMode === "NONE" ||
            !node.parent.layoutMode
            ? "absolute; ".concat(coord)
            : "relative;");
    };
    return "\n      position: ".concat(positionFromParent(node), "\n    ");
}
exports["default"] = positionProps;


/***/ }),

/***/ "./src/core/cssProperties/strokeColor.ts":
/*!***********************************************!*\
  !*** ./src/core/cssProperties/strokeColor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.strokeColor = void 0;
var getColor_1 = __webpack_require__(/*! ./getColor */ "./src/core/cssProperties/getColor.ts");
function strokeColor(node) {
    var _a;
    var stroke = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0];
    return (0, getColor_1.getColor)(stroke, node.strokeStyleId);
}
exports.strokeColor = strokeColor;
exports["default"] = strokeColor;


/***/ }),

/***/ "./src/core/cssProperties/styleColor.ts":
/*!**********************************************!*\
  !*** ./src/core/cssProperties/styleColor.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.styleColor = void 0;
var getColor_1 = __webpack_require__(/*! ./getColor */ "./src/core/cssProperties/getColor.ts");
function styleColor(paints) {
    // multiple fills (duplicate from fillColor.ts)
    if ((paints === null || paints === void 0 ? void 0 : paints.length) > 1) {
        var fillsAsGradients = paints
            .map(function (fill) {
            return (0, getColor_1.getColor)(fill, false, true);
        })
            .filter(function (str) { return str !== ""; })
            .filter(function (str) { return str; })
            .reverse()
            .join(", ");
        return fillsAsGradients;
    }
    // single fill
    return (0, getColor_1.getColor)(paints === null || paints === void 0 ? void 0 : paints[0], false);
}
exports.styleColor = styleColor;
exports["default"] = styleColor;


/***/ }),

/***/ "./src/core/cssProperties/textDecorationProp.ts":
/*!******************************************************!*\
  !*** ./src/core/cssProperties/textDecorationProp.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
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
exports["default"] = textDecorationProp;


/***/ }),

/***/ "./src/core/cssProperties/textTransformProp.ts":
/*!*****************************************************!*\
  !*** ./src/core/cssProperties/textTransformProp.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
function textTransformProp(node) {
    var caseMap = {
        UPPER: "uppercase",
        LOWER: "lowercase"
    };
    return caseMap[node.textCase]
        ? "text-transform: ".concat(caseMap[node.textCase], ";")
        : "";
}
exports["default"] = textTransformProp;


/***/ }),

/***/ "./src/core/cssProperties/transformProps.ts":
/*!**************************************************!*\
  !*** ./src/core/cssProperties/transformProps.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function transformProps(node) {
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
            return "";
        return "\n      transform: translate(".concat((0, helpers_1.cleanNumber)((absoluteTransforms.translateX - node.absoluteRenderBounds.x) * -1), "px, ").concat((0, helpers_1.cleanNumber)((absoluteTransforms.translateY - node.absoluteRenderBounds.y) * -1), "px);\n    ");
    }
    return "\n    transform-origin: 0 0;\n    transform: rotate(".concat((0, helpers_1.cleanNumber)(transforms.angle * -1, 3), "deg) scale(").concat((0, helpers_1.cleanNumber)(transforms.scaleX, 3), ", ").concat((0, helpers_1.cleanNumber)(transforms.scaleY, 3), ");\n  ");
}
exports["default"] = transformProps;


/***/ }),

/***/ "./src/core/eraseDuplicateCSS.ts":
/*!***************************************!*\
  !*** ./src/core/eraseDuplicateCSS.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.eraseDuplicateCSS = void 0;
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
exports.eraseDuplicateCSS = eraseDuplicateCSS;


/***/ }),

/***/ "./src/core/getStyles.ts":
/*!*******************************!*\
  !*** ./src/core/getStyles.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getStyles = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
var cssProperties_1 = __webpack_require__(/*! ./cssProperties */ "./src/core/cssProperties/index.ts");
var styleColor_1 = __webpack_require__(/*! ./cssProperties/styleColor */ "./src/core/cssProperties/styleColor.ts");
function getStyles(figma) {
    var _a, _b;
    var paintStyles = (_a = figma.getLocalPaintStyles()) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
        var name = _a.name, paints = _a.paints;
        return {
            name: (0, helpers_1.cleanStyleName)(name),
            value: (0, styleColor_1["default"])(paints)
        };
    });
    var textStyles = (_b = figma.getLocalTextStyles()) === null || _b === void 0 ? void 0 : _b.map(function (style) {
        var _a, _b;
        var _c = (0, cssProperties_1.fontStyleAsObject)(style.fontName), weight = _c.weight, isItalic = _c.isItalic;
        var fontSize = (_a = style.fontSize) === null || _a === void 0 ? void 0 : _a.toString();
        var fontFamily = (_b = style.fontName.family) === null || _b === void 0 ? void 0 : _b.toString();
        var lineHeightStr = (0, cssProperties_1.lineHeight)(style);
        return {
            name: (0, helpers_1.cleanStyleName)(style.name),
            value: (0, cssProperties_1.fontShorthand)({
                lineHeight: lineHeightStr,
                fontSize: fontSize,
                weight: weight,
                fontFamily: fontFamily,
                isItalic: isItalic
            })
        };
    });
    /* TODO: effectStyles */
    return {
        paintStyles: paintStyles,
        textStyles: textStyles
    };
}
exports.getStyles = getStyles;


/***/ }),

/***/ "./src/core/getTextSegments.ts":
/*!*************************************!*\
  !*** ./src/core/getTextSegments.ts ***!
  \*************************************/
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
exports.__esModule = true;
exports.getTextSegments = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
var textSegmentCSS_1 = __webpack_require__(/*! ./textSegmentCSS */ "./src/core/textSegmentCSS.ts");
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
        return __assign(__assign({}, s), { name: "".concat(uniqueName((0, helpers_1.makeSafeForCSS)(componentName + "-span")).name), css: (0, textSegmentCSS_1.textSegmentCSS)(s) });
    });
}
exports.getTextSegments = getTextSegments;


/***/ }),

/***/ "./src/core/getTreeElementByName.ts":
/*!******************************************!*\
  !*** ./src/core/getTreeElementByName.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.getTreeElementByName = void 0;
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
exports.getTreeElementByName = getTreeElementByName;


/***/ }),

/***/ "./src/core/getTreeElementByProperty.ts":
/*!**********************************************!*\
  !*** ./src/core/getTreeElementByProperty.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.getTreeElementByProperty = void 0;
function getTreeElementByProperty(tree, property, value) {
    function searchTree(element, property, value) {
        if (element[property] === value) {
            return element;
        }
        else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = searchTree(element.children[i], property, value);
            }
            return result;
        }
        return null;
    }
    return searchTree(tree, property, value);
}
exports.getTreeElementByProperty = getTreeElementByProperty;


/***/ }),

/***/ "./src/core/helpers.ts":
/*!*****************************!*\
  !*** ./src/core/helpers.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.getTransforms = exports.willBeRenderedAsSVG = exports.allChildrenAreVector = exports.cleanNumber = exports.cleanStyleName = exports.makeSafeForCSS = exports.escapeHtml = exports.colorAsHexOrRgba = exports.rgbaColor = exports.rgbToHex = exports.componentTo255 = exports.componentToHex = void 0;
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
    return name
        .replace(/^[0-9]/g, function (s) { return "_" + s; })
        .replace(/[^a-z0-9_-]/g, function (s) {
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
function cleanNumber(n, toFixed) {
    if (toFixed === void 0) { toFixed = 2; }
    if (!n)
        return 0;
    return parseFloat(Number(n).toFixed(toFixed));
}
exports.cleanNumber = cleanNumber;
function allChildrenAreVector(node) {
    var _a, _b, _c;
    var vectorTypes = ["VECTOR", "BOOLEAN_OPERATION", "STAR"];
    return (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        ((_b = node.children) === null || _b === void 0 ? void 0 : _b.filter(function (n) { return vectorTypes.includes(n.type); }).length) ===
            ((_c = node.children) === null || _c === void 0 ? void 0 : _c.length));
}
exports.allChildrenAreVector = allChildrenAreVector;
function willBeRenderedAsSVG(nodeOrTreeElement) {
    return (allChildrenAreVector(nodeOrTreeElement) ||
        nodeOrTreeElement.type === "VECTOR" ||
        nodeOrTreeElement.type === "BOOLEAN_OPERATION" ||
        nodeOrTreeElement.type === "STAR");
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

/***/ "./src/core/nodeCSS.ts":
/*!*****************************!*\
  !*** ./src/core/nodeCSS.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.nodeCSS = void 0;
var cssProperties_1 = __webpack_require__(/*! ./cssProperties */ "./src/core/cssProperties/index.ts");
var backdropFilterProp_1 = __webpack_require__(/*! ./cssProperties/backdropFilterProp */ "./src/core/cssProperties/backdropFilterProp.ts");
var filterProp_1 = __webpack_require__(/*! ./cssProperties/filterProp */ "./src/core/cssProperties/filterProp.ts");
function nodeCSS(node) {
    var _a, _b;
    console.log("node", node);
    if (((_a = node.type) === null || _a === void 0 ? void 0 : _a.toString()) === "TEXT") {
        return "\n      ".concat((0, cssProperties_1.marginProp)(node), "\n      ").concat((0, cssProperties_1.colorProp)(node), "\n      text-align: ").concat((_b = node.textAlignHorizontal) === null || _b === void 0 ? void 0 : _b.toLowerCase(), ";\n      ").concat((0, cssProperties_1.fontProp)(node), "\n      ").concat((0, cssProperties_1.textTransformProp)(node), "\n      ").concat((0, cssProperties_1.textDecorationProp)(node), "\n      ").concat((0, cssProperties_1.opacityProp)(node), "\n      ").concat((0, cssProperties_1.positionProps)(node), "\n      ").concat((0, cssProperties_1.displayProp)(node), "\n      ").concat((0, cssProperties_1.dimensions)(node), "\n      ").concat((0, cssProperties_1.transformProps)(node), "\n      ").concat((0, filterProp_1["default"])(node), "\n      ").concat((0, cssProperties_1.flexPropsForText)(node), "\n    ");
    }
    else {
        return "\n      ".concat((0, cssProperties_1.marginProp)(node), "\n      ").concat((0, cssProperties_1.backgroundProp)(node), "\n      ").concat((0, cssProperties_1.borderRadiusProp)(node), "\n      ").concat((0, cssProperties_1.borderProp)(node), "\n      ").concat((0, cssProperties_1.opacityProp)(node), "\n      ").concat((0, cssProperties_1.paddingProp)(node), "\n      ").concat((0, cssProperties_1.displayProp)(node), "\n      ").concat((0, cssProperties_1.dimensions)(node), "\n      ").concat((0, cssProperties_1.positionProps)(node), "\n      ").concat((0, cssProperties_1.boxShadowProp)(node), "\n      ").concat((0, cssProperties_1.transformProps)(node), "\n      ").concat((0, cssProperties_1.overflowProp)(node), "\n      ").concat((0, filterProp_1["default"])(node), "\n      ").concat((0, backdropFilterProp_1["default"])(node), "\n    ");
    }
}
exports.nodeCSS = nodeCSS;


/***/ }),

/***/ "./src/core/printCSS.ts":
/*!******************************!*\
  !*** ./src/core/printCSS.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.printCSS = void 0;
var getTreeElementByName_1 = __webpack_require__(/*! ./getTreeElementByName */ "./src/core/getTreeElementByName.ts");
var eraseDuplicateCSS_1 = __webpack_require__(/*! ./eraseDuplicateCSS */ "./src/core/eraseDuplicateCSS.ts");
function printCSS(tree) {
    var css = "";
    // mini css reset
    css += ".".concat(tree.name, ", .").concat(tree.name, " * { box-sizing: border-box; }");
    css += ".".concat(tree.name, " {").concat(tree.css, "}\n");
    function theChildren(children, isVariant) {
        if (isVariant === void 0) { isVariant = false; }
        children.forEach(function (treeElement) {
            var _a;
            var elementCSS = treeElement.css;
            var className = "." + treeElement.name;
            if (isVariant) {
                var baseCSS = (_a = (0, getTreeElementByName_1.getTreeElementByName)(tree, treeElement.name)) === null || _a === void 0 ? void 0 : _a.css;
                className =
                    tree.name === treeElement.name ? "" : "." + treeElement.name;
                if (baseCSS) {
                    elementCSS = (0, eraseDuplicateCSS_1.eraseDuplicateCSS)(treeElement.css, baseCSS);
                }
            }
            if (elementCSS !== "" && !treeElement.skipCss) {
                css += "".concat(treeElement.baseSelector || "", " ").concat(className, " {").concat(elementCSS, "}\n");
            }
            // if rendered as svg there are no styles necessary for children
            if (treeElement.willBeRenderedAsSVG) {
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
    if (!tree.willBeRenderedAsSVG) {
        theChildren(tree.children);
    }
    if (tree.variants) {
        css += "\n/* variant styles */\n";
        theChildren(tree.variants, true);
    }
    return css;
}
exports.printCSS = printCSS;


/***/ }),

/***/ "./src/core/printHTML.ts":
/*!*******************************!*\
  !*** ./src/core/printHTML.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.printHTML = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
var createSVG_1 = __webpack_require__(/*! ./createSVG */ "./src/core/createSVG.ts");
var printTextSegments_1 = __webpack_require__(/*! ./printTextSegments */ "./src/core/printTextSegments.ts");
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
                                                if (!(0, helpers_1.willBeRenderedAsSVG)(treeElement)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, createSVG_1.createSVG)(treeElement.originalNode, treeElement.name)];
                                            case 1: return [2 /*return*/, _c.sent()];
                                            case 2:
                                                _b = (_a = "<div class=\"".concat(treeElement.name, "\">\n").concat(treeElement.textSegments
                                                    ? (0, printTextSegments_1.printTextSegments)(treeElement.textSegments)
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
                    if (!(0, helpers_1.willBeRenderedAsSVG)(tree)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, createSVG_1.createSVG)(tree.originalNode, tree.name)];
                case 1:
                    html = _d.sent();
                    return [3 /*break*/, 4];
                case 2:
                    _a = html;
                    _c = (_b = "<div class=\"".concat(tree.name, "\">\n").concat(tree.textSegments ? (0, printTextSegments_1.printTextSegments)(tree.textSegments) : "", " ")).concat;
                    return [4 /*yield*/, theChildren(tree.children)];
                case 3:
                    html = _a + _c.apply(_b, [_d.sent(), "\n</div>"]);
                    _d.label = 4;
                case 4: return [2 /*return*/, html];
            }
        });
    });
}
exports.printHTML = printHTML;


/***/ }),

/***/ "./src/core/printTextSegments.ts":
/*!***************************************!*\
  !*** ./src/core/printTextSegments.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.printTextSegments = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
function printTextSegments(segments) {
    if ((segments === null || segments === void 0 ? void 0 : segments.length) === 0)
        return "";
    if (segments.length === 1) {
        // do not wrap in span
        return (0, helpers_1.escapeHtml)(segments[0].characters)
            .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
            .replace(/\n/g, "<br/>");
    }
    return ("<span>" +
        segments
            .map(function (s) {
            return "<span class=\"".concat(s.name, "\">").concat((0, helpers_1.escapeHtml)(s.characters)
                .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
                .replace(/\n/g, "<br/>"), "</span>");
        })
            .join("") +
        "</span>");
}
exports.printTextSegments = printTextSegments;


/***/ }),

/***/ "./src/core/tailwind.ts":
/*!******************************!*\
  !*** ./src/core/tailwind.ts ***!
  \******************************/
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
var createSVG_1 = __webpack_require__(/*! ./createSVG */ "./src/core/createSVG.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
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
    "24px": 6,
    "28px": 7,
    "32px": 8,
    "36px": 9,
    "40px": 10,
    "44px": 11,
    "48px": 12,
    "56px": 14,
    "64px": 16,
    "80px": 20,
    "96px": 24,
    "112px": 28,
    "128px": 32,
    "144px": 36,
    "160px": 40,
    "176px": 44,
    "192px": 48,
    "208px": 52,
    "224px": 56,
    "240px": 60,
    "256px": 64,
    "288px": 72,
    "320px": 80,
    "384px": 96
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
    right: sizesMap,
    bottom: sizesMap,
    height: sizesMap,
    width: sizesMap,
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
        "space-between": "between",
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
        hidden: "hidden",
        visible: "visible"
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
                                                if (!(0, helpers_1.willBeRenderedAsSVG)(treeElement)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, createSVG_1.createSVG)(treeElement.originalNode, 
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
                    if (!(0, helpers_1.willBeRenderedAsSVG)(tree)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, createSVG_1.createSVG)(tree.originalNode, "".concat(tailwindClassNames(tree.css, tree.originalNode).classNames, "\" style=\"").concat(tailwindClassNames(tree.css, tree.originalNode).inlineStyles))];
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
        right: "right",
        bottom: "bottom",
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
        // return fallback and remove whitespace as this is added directly to classname
        return "[".concat(value.replace(/\s/g, ""), "]");
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


/***/ }),

/***/ "./src/core/textSegmentCSS.ts":
/*!************************************!*\
  !*** ./src/core/textSegmentCSS.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.textSegmentCSS = void 0;
var cssProperties_1 = __webpack_require__(/*! ./cssProperties */ "./src/core/cssProperties/index.ts");
function textSegmentCSS(textSegment) {
    return "\n      color: ".concat((0, cssProperties_1.fillColor)(textSegment), ";\n      ").concat((0, cssProperties_1.fontProp)(textSegment), "\n      ").concat((0, cssProperties_1.textTransformProp)(textSegment), "\n      ").concat((0, cssProperties_1.textDecorationProp)(textSegment), "\n    ");
}
exports.textSegmentCSS = textSegmentCSS;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QiwwQkFBMEIsY0FBYyxxQkFBcUI7QUFDeEcsaUJBQWlCLG9EQUFvRCxxRUFBcUUsY0FBYztBQUN4Six1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QyxtQ0FBbUMsU0FBUztBQUM1QyxtQ0FBbUMsV0FBVyxVQUFVO0FBQ3hELDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0EsOEdBQThHLE9BQU87QUFDckgsaUZBQWlGLGlCQUFpQjtBQUNsRyx5REFBeUQsZ0JBQWdCLFFBQVE7QUFDakYsK0NBQStDLGdCQUFnQixnQkFBZ0I7QUFDL0U7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLFVBQVUsWUFBWSxhQUFhLFNBQVMsVUFBVTtBQUN0RCxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQixtQkFBTyxDQUFDLGlEQUFrQjtBQUM1QztBQUNBLGlCQUFpQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMxQyxtQkFBbUIsbUJBQU8sQ0FBQyxtREFBbUI7QUFDOUMsaUJBQWlCLG1CQUFPLENBQUMsK0NBQWlCO0FBQzFDLGtCQUFrQixtQkFBTyxDQUFDLGlEQUFrQjtBQUM1QyxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxvQkFBb0I7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSwyQkFBMkI7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHlCQUF5QjtBQUN0RDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMkJBQTJCLGVBQWU7QUFDMUM7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFHQUFxRyxvQkFBb0I7QUFDekg7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7Ozs7OztBQ3JKYTtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsR0FBRyxrQkFBa0I7QUFDckMsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2ZhO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHdDQUF3QztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRCQUE0Qiw0QkFBNEI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsaUJBQWlCOzs7Ozs7Ozs7OztBQzNESjtBQUNiLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZ0JBQWdCLG1CQUFPLENBQUMsd0NBQVc7QUFDbkMsZ0JBQWdCLG1CQUFPLENBQUMsd0NBQVc7QUFDbkMsaUNBQWlDLG1CQUFPLENBQUMsMEVBQTRCO0FBQ3JFLHdCQUF3QixtQkFBTyxDQUFDLHdEQUFtQjtBQUNuRCxrQkFBa0IsbUJBQU8sQ0FBQyx3Q0FBYztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDN0hMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsNkRBQTZEO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzFCTDtBQUNiLGtCQUFrQjtBQUNsQixrQkFBa0IsbUJBQU8sQ0FBQywwREFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNaTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQyxvQkFBb0IsbUJBQU8sQ0FBQyw4REFBZTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUdBQWlHLDJCQUEyQix1RUFBdUUsNEJBQTRCO0FBQy9OO0FBQ0Esd0lBQXdJO0FBQ3hJO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ3JCTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK1FBQStRO0FBQy9RO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ1pMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDN0JMO0FBQ2Isa0JBQWtCO0FBQ2xCLGtCQUFrQixtQkFBTyxDQUFDLDBEQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ1pMO0FBQ2Isa0JBQWtCO0FBQ2xCLDBCQUEwQjtBQUMxQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQywyQkFBMkIsbUJBQU8sQ0FBQyw0RUFBc0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNKQUFzSjtBQUN0SjtBQUNBO0FBQ0EsdUpBQXVKLDRCQUE0QjtBQUNuTDtBQUNBO0FBQ0Esd0pBQXdKO0FBQ3hKO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0EseUpBQXlKO0FBQ3pKO0FBQ0E7QUFDQSwwSkFBMEosMkJBQTJCO0FBQ3JMO0FBQ0E7QUFDQSx3SkFBd0o7QUFDeEo7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsa0JBQWtCOzs7Ozs7Ozs7OztBQ3JDTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCx3REFBd0Q7QUFDeEQ7QUFDQSwrQkFBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ2hFTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRjtBQUNoRjtBQUNBO0FBQ0Esc0NBQXNDLDhDQUE4QyxxR0FBcUcsK0VBQStFO0FBQ3hRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDeENMO0FBQ2Isa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQyxpQkFBaUIsbUJBQU8sQ0FBQyx3REFBWTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQ0FBcUMsb0JBQW9CO0FBQ3pELHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsa0JBQWtCOzs7Ozs7Ozs7OztBQzlCTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHdEQUF3RDtBQUMvRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUMxQkw7QUFDYixrQkFBa0I7QUFDbEIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixrQkFBa0I7Ozs7Ozs7Ozs7O0FDVkw7QUFDYixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDeEJMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDLHNCQUFzQixtQkFBTyxDQUFDLGtFQUFpQjtBQUMvQywwQkFBMEIsbUJBQU8sQ0FBQywwRUFBcUI7QUFDdkQsbUJBQW1CLG1CQUFPLENBQUMsNERBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0Esb0dBQW9HO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTtBQUNBLHdDQUF3QztBQUN4QztBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUN6Qkw7QUFDYixrQkFBa0I7QUFDbEIscUJBQXFCO0FBQ3JCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsa0JBQWtCOzs7Ozs7Ozs7OztBQ1ZMO0FBQ2Isa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsa0JBQWtCOzs7Ozs7Ozs7OztBQzVCTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0I7QUFDaEIsZ0JBQWdCLG1CQUFPLENBQUMseUNBQVk7QUFDcEMscUJBQXFCLG1CQUFPLENBQUMsZ0VBQWdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixrQkFBa0I7Ozs7Ozs7Ozs7O0FDbkNMO0FBQ2Isa0JBQWtCO0FBQ2xCLG9CQUFvQjtBQUNwQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNoQ0w7QUFDYixrQkFBa0I7QUFDbEIsa0JBQWtCLEdBQUcsd0JBQXdCLEdBQUcsMEJBQTBCLEdBQUcseUJBQXlCLEdBQUcsZ0JBQWdCLEdBQUcscUJBQXFCLEdBQUcsa0JBQWtCLEdBQUcsZ0JBQWdCLEdBQUcsbUJBQW1CLEdBQUcsd0JBQXdCLEdBQUcsb0JBQW9CLEdBQUcsc0JBQXNCLEdBQUcsaUJBQWlCLEdBQUcsc0JBQXNCLEdBQUcsaUJBQWlCLEdBQUcseUJBQXlCLEdBQUcscUJBQXFCLEdBQUcscUJBQXFCLEdBQUcsMEJBQTBCLEdBQUcsMEJBQTBCLEdBQUcsbUJBQW1CLEdBQUcsb0JBQW9CLEdBQUcsa0JBQWtCLEdBQUcsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCO0FBQ3BtQixtQkFBbUIsbUJBQU8sQ0FBQyw0REFBYztBQUN6QyxrQkFBa0I7QUFDbEIsb0JBQW9CLG1CQUFPLENBQUMsOERBQWU7QUFDM0MsbUJBQW1CO0FBQ25CLG9CQUFvQixtQkFBTyxDQUFDLDhEQUFlO0FBQzNDLG1CQUFtQjtBQUNuQixtQkFBbUIsbUJBQU8sQ0FBQyw0REFBYztBQUN6QyxrQkFBa0I7QUFDbEIscUJBQXFCLG1CQUFPLENBQUMsZ0VBQWdCO0FBQzdDLG9CQUFvQjtBQUNwQixvQkFBb0IsbUJBQU8sQ0FBQyw4REFBZTtBQUMzQyxtQkFBbUI7QUFDbkIsMkJBQTJCLG1CQUFPLENBQUMsNEVBQXNCO0FBQ3pELDBCQUEwQjtBQUMxQiwyQkFBMkIsbUJBQU8sQ0FBQyw0RUFBc0I7QUFDekQsMEJBQTBCO0FBQzFCLHNCQUFzQixtQkFBTyxDQUFDLGtFQUFpQjtBQUMvQyxxQkFBcUI7QUFDckIsc0JBQXNCLG1CQUFPLENBQUMsa0VBQWlCO0FBQy9DLHFCQUFxQjtBQUNyQiwwQkFBMEIsbUJBQU8sQ0FBQywwRUFBcUI7QUFDdkQseUJBQXlCO0FBQ3pCLGtCQUFrQixtQkFBTyxDQUFDLDBEQUFhO0FBQ3ZDLGlCQUFpQjtBQUNqQix1QkFBdUIsbUJBQU8sQ0FBQyxvRUFBa0I7QUFDakQsc0JBQXNCO0FBQ3RCLGtCQUFrQixtQkFBTyxDQUFDLDBEQUFhO0FBQ3ZDLGlCQUFpQjtBQUNqQix1QkFBdUIsbUJBQU8sQ0FBQyxvRUFBa0I7QUFDakQsc0JBQXNCO0FBQ3RCLHFCQUFxQixtQkFBTyxDQUFDLGdFQUFnQjtBQUM3QyxvQkFBb0I7QUFDcEIseUJBQXlCLG1CQUFPLENBQUMsd0VBQW9CO0FBQ3JELHdCQUF3QjtBQUN4QixvQkFBb0IsbUJBQU8sQ0FBQyw4REFBZTtBQUMzQyxtQkFBbUI7QUFDbkIsaUJBQWlCLG1CQUFPLENBQUMsd0RBQVk7QUFDckMsZ0JBQWdCO0FBQ2hCLG1CQUFtQixtQkFBTyxDQUFDLDREQUFjO0FBQ3pDLGtCQUFrQjtBQUNsQixzQkFBc0IsbUJBQU8sQ0FBQyxrRUFBaUI7QUFDL0MscUJBQXFCO0FBQ3JCLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFZO0FBQ3JDLGdCQUFnQjtBQUNoQiwwQkFBMEIsbUJBQU8sQ0FBQywwRUFBcUI7QUFDdkQseUJBQXlCO0FBQ3pCLDJCQUEyQixtQkFBTyxDQUFDLDRFQUFzQjtBQUN6RCwwQkFBMEI7QUFDMUIseUJBQXlCLG1CQUFPLENBQUMsd0VBQW9CO0FBQ3JELHdCQUF3QjtBQUN4QixtQkFBbUIsbUJBQU8sQ0FBQyw0REFBYztBQUN6QyxrQkFBa0I7Ozs7Ozs7Ozs7O0FDdERMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNmTDtBQUNiLGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ2xCTDtBQUNiLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDUEw7QUFDYixrQkFBa0I7QUFDbEIsZ0JBQWdCLG1CQUFPLENBQUMseUNBQVk7QUFDcEM7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQ7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDUkw7QUFDYixrQkFBa0I7QUFDbEIsZ0JBQWdCLG1CQUFPLENBQUMseUNBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc1FBQXNRO0FBQ3RRO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ1hMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDLDJCQUEyQixtQkFBTyxDQUFDLDRFQUFzQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzFCTDtBQUNiLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsaUJBQWlCLG1CQUFPLENBQUMsd0RBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixrQkFBa0I7Ozs7Ozs7Ozs7O0FDVkw7QUFDYixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQ0FBcUMsb0JBQW9CO0FBQ3pELHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNyQkw7QUFDYixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ2JMO0FBQ2Isa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ1hMO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMFFBQTBRO0FBQzFRO0FBQ0Esd0NBQXdDLGlPQUFpTztBQUN6UTtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUN2Qkw7QUFDYixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCO0FBQ0EscUNBQXFDLHNCQUFzQixrQkFBa0I7QUFDN0Usa0NBQWtDLHNCQUFzQixrQkFBa0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLCtCQUErQiwwQkFBMEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNEJBQTRCLGFBQWEsSUFBSTtBQUM3QztBQUNBO0FBQ0EseUJBQXlCOzs7Ozs7Ozs7OztBQ3hCWjtBQUNiLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakIsZ0JBQWdCLG1CQUFPLENBQUMsd0NBQVc7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsMERBQWlCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLDBFQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOzs7Ozs7Ozs7OztBQ3RDSjtBQUNiO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2QixnQkFBZ0IsbUJBQU8sQ0FBQyx3Q0FBVztBQUNuQyx1QkFBdUIsbUJBQU8sQ0FBQyxzREFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVEsd0lBQXdJO0FBQ25MLEtBQUs7QUFDTDtBQUNBLHVCQUF1Qjs7Ozs7Ozs7Ozs7QUNsQ1Y7QUFDYixrQkFBa0I7QUFDbEIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQStDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7Ozs7Ozs7Ozs7O0FDcEJmO0FBQ2Isa0JBQWtCO0FBQ2xCLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtDQUErQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDOzs7Ozs7Ozs7OztBQ3BCbkI7QUFDYixrQkFBa0I7QUFDbEIscUJBQXFCLEdBQUcsMkJBQTJCLEdBQUcsNEJBQTRCLEdBQUcsbUJBQW1CLEdBQUcsc0JBQXNCLEdBQUcsc0JBQXNCLEdBQUcsa0JBQWtCLEdBQUcsd0JBQXdCLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQWdCLEdBQUcsc0JBQXNCLEdBQUcsc0JBQXNCO0FBQ25TO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSwyQ0FBMkMsaUJBQWlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGLHNDQUFzQztBQUNsSTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25MYTtBQUNiLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2Ysc0JBQXNCLG1CQUFPLENBQUMsMERBQWlCO0FBQy9DLDJCQUEyQixtQkFBTyxDQUFDLDBGQUFvQztBQUN2RSxtQkFBbUIsbUJBQU8sQ0FBQywwRUFBNEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5UEFBeVA7QUFDelA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDaEJGO0FBQ2Isa0JBQWtCO0FBQ2xCLGdCQUFnQjtBQUNoQiw2QkFBNkIsbUJBQU8sQ0FBQyxrRUFBd0I7QUFDN0QsMEJBQTBCLG1CQUFPLENBQUMsNERBQXFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSx5QkFBeUI7QUFDekYsb0NBQW9DLHNCQUFzQjtBQUMxRDtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRix3QkFBd0I7QUFDbkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsbUJBQW1CO0FBQzVELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7Ozs7Ozs7QUN2REg7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QiwwQkFBMEIsY0FBYyxxQkFBcUI7QUFDeEcsaUJBQWlCLG9EQUFvRCxxRUFBcUUsY0FBYztBQUN4Six1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QyxtQ0FBbUMsU0FBUztBQUM1QyxtQ0FBbUMsV0FBVyxVQUFVO0FBQ3hELDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0EsOEdBQThHLE9BQU87QUFDckgsaUZBQWlGLGlCQUFpQjtBQUNsRyx5REFBeUQsZ0JBQWdCLFFBQVE7QUFDakYsK0NBQStDLGdCQUFnQixnQkFBZ0I7QUFDL0U7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLFVBQVUsWUFBWSxhQUFhLFNBQVMsVUFBVTtBQUN0RCxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixnQkFBZ0IsbUJBQU8sQ0FBQyx3Q0FBVztBQUNuQyxrQkFBa0IsbUJBQU8sQ0FBQyw0Q0FBYTtBQUN2QywwQkFBMEIsbUJBQU8sQ0FBQyw0REFBcUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtR0FBbUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxpQ0FBaUMsSUFBSTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7QUNuR0o7QUFDYixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLGdCQUFnQixtQkFBTyxDQUFDLHdDQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7Ozs7O0FDdkJaO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGtCQUFrQixtQkFBTyxDQUFDLDRDQUFhO0FBQ3ZDLGdCQUFnQixtQkFBTyxDQUFDLHdDQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDLGlDQUFpQyxJQUFJO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiw0QkFBNEIsa0JBQWtCO0FBQzlDLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvQkFBb0I7QUFDdkQ7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsNkJBQTZCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25TYTtBQUNiLGtCQUFrQjtBQUNsQixzQkFBc0I7QUFDdEIsc0JBQXNCLG1CQUFPLENBQUMsMERBQWlCO0FBQy9DO0FBQ0EsbUZBQW1GO0FBQ25GO0FBQ0Esc0JBQXNCOzs7Ozs7O1VDUHRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2NyZWF0ZVNWRy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2NyZWF0ZVRyZWUudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2JhY2tkcm9wRmlsdGVyUHJvcC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvYmFja2dyb3VuZFByb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2JvcmRlclByb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2JvcmRlclJhZGl1c1Byb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2JveFNoYWRvd1Byb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2NvbG9yUHJvcC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvY3NzRnJvbUNvbnN0cmFpbnRzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9kaW1lbnNpb25zLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9kaXNwbGF5UHJvcC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvZmlsbENvbG9yLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9maWx0ZXJQcm9wLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9maW5kQWJzb2x1dGVQYXJlbnQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2ZsZXhQcm9wc0ZvclRleHQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2ZvbnRQcm9wLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9mb250U2hvcnRoYW5kLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9mb250U3R5bGVBc09iamVjdC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvZ2V0Q29sb3IudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2dyYWRpZW50RmlsbC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2xpbmVIZWlnaHQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL21hcmdpblByb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL29wYWNpdHlQcm9wLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9vdmVyZmxvd1Byb3AudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL3BhZGRpbmdQcm9wLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9wb3NpdGlvblByb3BzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy9zdHJva2VDb2xvci50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvc3R5bGVDb2xvci50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvdGV4dERlY29yYXRpb25Qcm9wLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvY3NzUHJvcGVydGllcy90ZXh0VHJhbnNmb3JtUHJvcC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2Nzc1Byb3BlcnRpZXMvdHJhbnNmb3JtUHJvcHMudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9lcmFzZUR1cGxpY2F0ZUNTUy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2dldFN0eWxlcy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2dldFRleHRTZWdtZW50cy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL2dldFRyZWVFbGVtZW50QnlOYW1lLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvZ2V0VHJlZUVsZW1lbnRCeVByb3BlcnR5LnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL25vZGVDU1MudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9wcmludENTUy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL3ByaW50SFRNTC50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL3ByaW50VGV4dFNlZ21lbnRzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvdGFpbHdpbmQudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS90ZXh0U2VnbWVudENTUy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9NeVBsdWdpbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgZ2V0U3R5bGVzXzEgPSByZXF1aXJlKFwiLi9jb3JlL2dldFN0eWxlc1wiKTtcclxuLyogQmV0YSAqL1xyXG52YXIgdGFpbHdpbmRfMSA9IHJlcXVpcmUoXCIuL2NvcmUvdGFpbHdpbmRcIik7XHJcbnZhciBjcmVhdGVUcmVlXzEgPSByZXF1aXJlKFwiLi9jb3JlL2NyZWF0ZVRyZWVcIik7XHJcbnZhciBwcmludENTU18xID0gcmVxdWlyZShcIi4vY29yZS9wcmludENTU1wiKTtcclxudmFyIHByaW50SFRNTF8xID0gcmVxdWlyZShcIi4vY29yZS9wcmludEhUTUxcIik7XHJcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcclxuZmlnbWEudWkub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhtc2cua2V5LCBtc2cudmFsdWUpO1xyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVIVE1MYW5kQ1NTKHNlbGVjdGlvbiwgcGFyYW1ldGVycywgX2EpIHtcclxuICAgIHZhciBjc3NTdHlsZSA9IF9hLmNzc1N0eWxlO1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0cmVlLCBjc3MsIGh0bWwsIF9iO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUgPSAoMCwgY3JlYXRlVHJlZV8xLmNyZWF0ZVRyZWUpKHNlbGVjdGlvbiwgeyBjc3NTdHlsZTogY3NzU3R5bGUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmVlXCIsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBjb25zdGFudHNfMS5QQVJBTUVURVJTLkZSQU1FV09SS1MuVEFJTFdJTkRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIi1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICgwLCBwcmludENTU18xLnByaW50Q1NTKSh0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShwYXJhbWV0ZXJzLmZyYW1ld29yayA9PT0gY29uc3RhbnRzXzEuUEFSQU1FVEVSUy5GUkFNRVdPUktTLlRBSUxXSU5EKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgKDAsIHRhaWx3aW5kXzEudGFpbHdpbmQpKHRyZWUpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBfYiA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0IC8qeWllbGQqLywgKDAsIHByaW50SFRNTF8xLnByaW50SFRNTCkodHJlZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIF9iID0gX2Muc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IGh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IGNzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZmlnbWEucGFyYW1ldGVycy5vbihcImlucHV0XCIsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgdmFyIHBhcmFtZXRlcnMgPSBfYS5wYXJhbWV0ZXJzLCBrZXkgPSBfYS5rZXksIHF1ZXJ5ID0gX2EucXVlcnksIHJlc3VsdCA9IF9hLnJlc3VsdDtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSBcImZyYW1ld29ya1wiOlxyXG4gICAgICAgICAgICB2YXIgZnJhbWV3b3JrcyA9IFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50c18xLlBBUkFNRVRFUlMuRlJBTUVXT1JLUy5IVE1MLFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzXzEuUEFSQU1FVEVSUy5GUkFNRVdPUktTLlJFQUNULFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzXzEuUEFSQU1FVEVSUy5GUkFNRVdPUktTLlRBSUxXSU5ELFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0U3VnZ2VzdGlvbnMoZnJhbWV3b3Jrcy5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuaW5jbHVkZXMocXVlcnkpOyB9KSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufSk7XHJcbnZhciBwbHVnaW5QYXJhbWV0ZXJzO1xyXG5maWdtYS5vbihcInJ1blwiLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgIHZhciBjb21tYW5kID0gX2EuY29tbWFuZCwgcGFyYW1ldGVycyA9IF9hLnBhcmFtZXRlcnM7XHJcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA2MDAsIHdpZHRoOiA1MDAgfSk7XHJcbiAgICBwbHVnaW5QYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICAgIHVwZGF0ZUFuZFBvc3RUb1VJKHBsdWdpblBhcmFtZXRlcnMpO1xyXG59KTtcclxuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBsb2FkaW5nOiB0cnVlIH0pO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdXBkYXRlQW5kUG9zdFRvVUkocGx1Z2luUGFyYW1ldGVycyk7XHJcbiAgICB9LCAxMDApO1xyXG59KTtcclxuZnVuY3Rpb24gdXBkYXRlQW5kUG9zdFRvVUkocGFyYW1ldGVycykge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNzc1N0eWxlLCBfZywgaHRtbCwgY3NzO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2gpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfaC5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBcIlNlbGVjdCBhIGxheWVyLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbjogXCJTZWxlY3Qgb25seSBvbmUgbGF5ZXIuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcImNzc1N0eWxlXCIpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBjc3NTdHlsZSA9IF9oLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcmVhdGVIVE1MYW5kQ1NTKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiwgcGFyYW1ldGVycywgeyBjc3NTdHlsZTogY3NzU3R5bGUgfSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIF9nID0gX2guc2VudCgpLCBodG1sID0gX2cuaHRtbCwgY3NzID0gX2cuY3NzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHsgY3NzU3R5bGU6IGNzc1N0eWxlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IGNzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrOiBwYXJhbWV0ZXJzLmZyYW1ld29yayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiAoMCwgZ2V0U3R5bGVzXzEuZ2V0U3R5bGVzKShmaWdtYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IChfYyA9IChfYiA9IChfYSA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbMF0pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25XaWR0aDogKF9mID0gKF9lID0gKF9kID0gZmlnbWEuY3VycmVudFBhZ2UpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5zZWxlY3Rpb24pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVswXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5TRVRUSU5HUyA9IGV4cG9ydHMuUEFSQU1FVEVSUyA9IHZvaWQgMDtcclxuZXhwb3J0cy5QQVJBTUVURVJTID0ge1xyXG4gICAgRlJBTUVXT1JLUzoge1xyXG4gICAgICAgIFRBSUxXSU5EOiBcInRhaWx3aW5kIGNzcyAoYmV0YSlcIixcclxuICAgICAgICBSRUFDVDogXCJyZWFjdFwiLFxyXG4gICAgICAgIEhUTUw6IFwiaHRtbFwiXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuU0VUVElOR1MgPSB7XHJcbiAgICBDU1NfU1RZTEVTOiB7XHJcbiAgICAgICAgREVGQVVMVDogXCJcIixcclxuICAgICAgICBCRU06IFwiYmVtXCJcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLmNyZWF0ZVNWRyA9IHZvaWQgMDtcclxuZnVuY3Rpb24gY3JlYXRlU1ZHKG5vZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdmc7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIG5vZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cG9ydEFzeW5jKHsgZm9ybWF0OiBcIlNWR1wiLCB1c2VBYnNvbHV0ZUJvdW5kczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVpbnQ4QXJyYXkgdG8gc3RyaW5nIGFuZCBpbmplY3QgY2xhc3NuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwbHkobnVsbCwgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCI8c3ZnIFwiLCBcIjxzdmcgY2xhc3M9XFxcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiXFxcIiBcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikgeyByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpOyB9KV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ZnID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzdmddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVNWRyA9IGNyZWF0ZVNWRztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuY3JlYXRlVHJlZSA9IHZvaWQgMDtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XHJcbnZhciBub2RlQ1NTXzEgPSByZXF1aXJlKFwiLi9ub2RlQ1NTXCIpO1xyXG52YXIgZ2V0VHJlZUVsZW1lbnRCeVByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9nZXRUcmVlRWxlbWVudEJ5UHJvcGVydHlcIik7XHJcbnZhciBnZXRUZXh0U2VnbWVudHNfMSA9IHJlcXVpcmUoXCIuL2dldFRleHRTZWdtZW50c1wiKTtcclxudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcclxuZnVuY3Rpb24gY3JlYXRlVHJlZShzZWxlY3Rpb24sIF9hKSB7XHJcbiAgICB2YXIgX2I7XHJcbiAgICB2YXIgY3NzU3R5bGUgPSBfYS5jc3NTdHlsZTtcclxuICAgIHZhciBjb21wb25lbnROYW1lID0gXCJjb21wb25lbnRcIjtcclxuICAgIHZhciBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgdmFyIGlzQ29tcG9uZW50U2V0ID0gc2VsZWN0aW9uTm9kZS50eXBlID09PSBcIkNPTVBPTkVOVF9TRVRcIjtcclxuICAgIHZhciBvcmlnaW5hbE5vZGUgPSBpc0NvbXBvbmVudFNldFxyXG4gICAgICAgID8gc2VsZWN0aW9uTm9kZS5kZWZhdWx0VmFyaWFudFxyXG4gICAgICAgIDogc2VsZWN0aW9uTm9kZTtcclxuICAgIC8vIE9ubHkgdG8gcHJldmVudCBkdXBsaWNhdGUgTmFtZXNcclxuICAgIHZhciBhbGxOYW1lcyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gdW5pcXVlTmFtZShjbGFzc05hbWUsIG4sIGNzcykge1xyXG4gICAgICAgIGlmIChuID09PSB2b2lkIDApIHsgbiA9IDE7IH1cclxuICAgICAgICBpZiAoY3NzID09PSB2b2lkIDApIHsgY3NzID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBzdWZmaXggPSBuID4gMSA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBjc3MgY2xhc3Mgd2l0aCB0aGF0IG5hbWVcclxuICAgICAgICAgICAgaWYgKGNzcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRXaXRoU2FtZU5hbWUgPSAoMCwgZ2V0VHJlZUVsZW1lbnRCeVByb3BlcnR5XzEuZ2V0VHJlZUVsZW1lbnRCeVByb3BlcnR5KSh0cmVlLCBcInNob3J0TmFtZVwiLCBjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKChlbGVtZW50V2l0aFNhbWVOYW1lID09PSBudWxsIHx8IGVsZW1lbnRXaXRoU2FtZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnRXaXRoU2FtZU5hbWUuY3NzKSA9PT0gY3NzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWVsZW1lbnRXaXRoU2FtZU5hbWUud2lsbEJlUmVuZGVyZWRBc1NWRykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0c1dpdGhTYW1lQ3NzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjbGFzc05hbWUgKyBzdWZmaXhcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEsIGNzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGxOYW1lcy5wdXNoKGNsYXNzTmFtZSArIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBleGlzdHNXaXRoU2FtZUNzczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBjbGFzc05hbWUgKyBzdWZmaXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnROYW1lID0gdW5pcXVlTmFtZSgoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShzZWxlY3Rpb25Ob2RlLm5hbWUpKS5uYW1lO1xyXG4gICAgdmFyIGNyZWF0ZVRyZWVFbGVtZW50ID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBub2RlID0gX2Eubm9kZSwgY3NzID0gX2EuY3NzLCBfYiA9IF9hLnNob3J0TmFtZSwgc2hvcnROYW1lID0gX2IgPT09IHZvaWQgMCA/IG5hbWUgOiBfYiwgX2MgPSBfYS5za2lwQ3NzLCBza2lwQ3NzID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2MsIF9kID0gX2EuYmFzZVNlbGVjdG9yLCBiYXNlU2VsZWN0b3IgPSBfZCA9PT0gdm9pZCAwID8gXCJcIiA6IF9kLCBfZSA9IF9hLmlzQ29tcG9uZW50U2V0LCBpc0NvbXBvbmVudFNldCA9IF9lID09PSB2b2lkIDAgPyBmYWxzZSA6IF9lO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHNob3J0TmFtZTogc2hvcnROYW1lLFxyXG4gICAgICAgICAgICBza2lwQ3NzOiBza2lwQ3NzLFxyXG4gICAgICAgICAgICBjc3M6IGNzcyxcclxuICAgICAgICAgICAgd2lsbEJlUmVuZGVyZWRBc1NWRzogKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiBub2RlLFxyXG4gICAgICAgICAgICB0ZXh0U2VnbWVudHM6IFtdLFxyXG4gICAgICAgICAgICBiYXNlU2VsZWN0b3I6IGJhc2VTZWxlY3RvcixcclxuICAgICAgICAgICAgdmFyaWFudHM6IGlzQ29tcG9uZW50U2V0ICYmIFtdXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICB2YXIgdHJlZSA9IGNyZWF0ZVRyZWVFbGVtZW50KHtcclxuICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lLFxyXG4gICAgICAgIG5vZGU6IG9yaWdpbmFsTm9kZSxcclxuICAgICAgICBjc3M6ICgwLCBub2RlQ1NTXzEubm9kZUNTUykob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBpc0NvbXBvbmVudFNldDogaXNDb21wb25lbnRTZXRcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4sIHRyZWVDaGlsZHJlbiwgYmFzZVNlbGVjdG9yKSB7XHJcbiAgICAgICAgaWYgKGJhc2VTZWxlY3RvciA9PT0gdm9pZCAwKSB7IGJhc2VTZWxlY3RvciA9IFwiXCI7IH1cclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgaWYgKCFub2RlLnZpc2libGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBjc3MgPSAoMCwgbm9kZUNTU18xLm5vZGVDU1MpKG5vZGUpO1xyXG4gICAgICAgICAgICB2YXIgdW5pcXVlTmFtZUluZm9ybWF0aW9uID0gdW5pcXVlTmFtZSgoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShub2RlLm5hbWUpLCAxLCBjc3MpO1xyXG4gICAgICAgICAgICB2YXIgc2hvcnROYW1lID0gdW5pcXVlTmFtZUluZm9ybWF0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBza2lwQ3NzID0gdW5pcXVlTmFtZUluZm9ybWF0aW9uLmV4aXN0c1dpdGhTYW1lQ3NzO1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gY3NzU3R5bGUgPT09IGNvbnN0YW50c18xLlNFVFRJTkdTLkNTU19TVFlMRVMuQkVNID8gXCJcIi5jb25jYXQoY29tcG9uZW50TmFtZSwgXCJfX1wiKSA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJcIi5jb25jYXQocHJlZml4KS5jb25jYXQoc2hvcnROYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSBjcmVhdGVUcmVlRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgIHNob3J0TmFtZTogc2hvcnROYW1lLFxyXG4gICAgICAgICAgICAgICAgc2tpcENzczogc2tpcENzcyxcclxuICAgICAgICAgICAgICAgIGNzczogY3NzLFxyXG4gICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yOiBiYXNlU2VsZWN0b3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbiwgYmFzZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHRTZWdtZW50cyA9ICgwLCBnZXRUZXh0U2VnbWVudHNfMS5nZXRUZXh0U2VnbWVudHMpKG5vZGUsIG5hbWUsIHVuaXF1ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudC50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICgoKF9iID0gb3JpZ2luYWxOb2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGVuZ3RoKSA+IDApIHtcclxuICAgICAgICB0aGVDaGlsZHJlbihvcmlnaW5hbE5vZGUuY2hpbGRyZW4sIHRyZWUuY2hpbGRyZW4pO1xyXG4gICAgICAgIC8qIENvbXBvbmVudCBWYXJpYW50cyAqL1xyXG4gICAgICAgIGlmIChpc0NvbXBvbmVudFNldCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Ob2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHZhcmlhbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgICAgIHZhciB2YXJpYW50TmFtZSA9ICgwLCBoZWxwZXJzXzEubWFrZVNhZmVGb3JDU1MpKFwiXCIuY29uY2F0KGNvbXBvbmVudE5hbWUsIFwiLS1cIikuY29uY2F0KHZhcmlhbnQgPT09IG51bGwgfHwgdmFyaWFudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFyaWFudC5uYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVNlbGVjdG9yID0gXCIuXCIgKyB2YXJpYW50TmFtZTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdWYXJpYW50ID0gY3JlYXRlVHJlZUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogdmFyaWFudCxcclxuICAgICAgICAgICAgICAgICAgICBjc3M6ICgwLCBub2RlQ1NTXzEubm9kZUNTUykodmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZVNlbGVjdG9yOiBiYXNlU2VsZWN0b3JcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgKF9hID0gdHJlZS52YXJpYW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2gobmV3VmFyaWFudCk7XHJcbiAgICAgICAgICAgICAgICBhbGxOYW1lcyA9IFtdOyAvLyByZXNldCBjbGFzc05hbWVzIHNvIHRoZSBuZXcgZ2VuZXJhdGVkIG1hdGNoIHRoZSBvbmVzIGluIHRoZSBkZWZhdWx0VmFyaWFudFxyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4odmFyaWFudC5jaGlsZHJlbiwgbmV3VmFyaWFudC5jaGlsZHJlbiwgYmFzZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHZhciB0ZXh0U2VnbWVudHMgPSAoMCwgZ2V0VGV4dFNlZ21lbnRzXzEuZ2V0VGV4dFNlZ21lbnRzKShvcmlnaW5hbE5vZGUsIHRyZWUubmFtZSwgdW5pcXVlTmFtZSk7XHJcbiAgICAgICAgdHJlZS50ZXh0U2VnbWVudHMgPSB0ZXh0U2VnbWVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJlZTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVRyZWUgPSBjcmVhdGVUcmVlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG5mdW5jdGlvbiBiYWNrZHJvcEZpbHRlclByb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFub2RlLmVmZmVjdHMgfHxcclxuICAgICAgICBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSB8fFxyXG4gICAgICAgIG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHN0eWxlSWQgPSBub2RlLmVmZmVjdFN0eWxlSWQ7XHJcbiAgICB2YXIgYmx1ciA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoZnVuY3Rpb24gKGVmZmVjdCkgeyByZXR1cm4gZWZmZWN0LnR5cGUgPT09IFwiQkFDS0dST1VORF9CTFVSXCIgJiYgZWZmZWN0LnZpc2libGU7IH0pO1xyXG4gICAgaWYgKGJsdXIubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIGNzcyA9IFwiYmFja2Ryb3AtZmlsdGVyOiBcIjtcclxuICAgIHZhciB2YWx1ZSA9IGJsdXJcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiYmx1cihcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoYi5yYWRpdXMgLyAyKSwgXCJweClcIik7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxuICAgIGlmIChzdHlsZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlTmFtZSA9ICgwLCBoZWxwZXJzXzEuY2xlYW5TdHlsZU5hbWUpKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChzdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgIHZhbHVlID0gXCJ2YXIoLS1cIi5jb25jYXQoc3R5bGVOYW1lLCBcIi1iYWNrZHJvcC1maWx0ZXIsIFwiKS5jb25jYXQodmFsdWUsIFwiKVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3MgKyB2YWx1ZSArIFwiO1wiO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gYmFja2Ryb3BGaWx0ZXJQcm9wO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGZpbGxDb2xvcl8xID0gcmVxdWlyZShcIi4vZmlsbENvbG9yXCIpO1xyXG5mdW5jdGlvbiBiYWNrZ3JvdW5kUHJvcChub2RlKSB7XHJcbiAgICB2YXIgY29sb3IgPSAoMCwgZmlsbENvbG9yXzEuZmlsbENvbG9yKShub2RlKTtcclxuICAgIGlmICghY29sb3IgfHwgY29sb3IgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGlmIChjb2xvciA9PT0gXCJ0cmFuc3BhcmVudFwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwiYmFja2dyb3VuZDogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBiYWNrZ3JvdW5kUHJvcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vaGVscGVyc1wiKTtcclxudmFyIHN0cm9rZUNvbG9yXzEgPSByZXF1aXJlKFwiLi9zdHJva2VDb2xvclwiKTtcclxuLyoqXHJcbiAqIENTUyBQcm9wZXJ0eSBGdW5jdGlvbnNcclxuICpcclxuICogQWxsIEZ1bmN0aW9ucyBlbmRpbmcgd2l0aCBQcm9wIG9yIFByb3BzIHdpbGwgcmV0dXJuIGEgY3NzIHByb3BlcnR5IHN0cmluZyBlbmRpbmcgd2l0aCBhIHNlbWljb2xvbiBvciBhbiBlbXB0eSBzdHJpbmdcclxuICogZS5nLiBcImJhY2tncm91bmQ6ICMxMjM0NTtcIlxyXG4gKi9cclxuZnVuY3Rpb24gYm9yZGVyUHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgYm9yZGVyLXdpZHRoOiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5zdHJva2VXZWlnaHQpLCBcInB4OyBcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXFxuICAgIGJvcmRlci1pbWFnZTogXCIpLmNvbmNhdCgoMCwgc3Ryb2tlQ29sb3JfMS5zdHJva2VDb2xvcikobm9kZSksIFwiOyBcXG4gICAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xcbiAgICBcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJib3JkZXI6IFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnN0cm9rZVdlaWdodCksIFwicHggc29saWQgXCIpLmNvbmNhdCgoMCwgc3Ryb2tlQ29sb3JfMS5zdHJva2VDb2xvcikobm9kZSksIFwiO1wiKTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGJvcmRlclByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGJvcmRlclJhZGl1c1Byb3Aobm9kZSkge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJFTExJUFNFXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiYm9yZGVyLXJhZGl1czogNTAlO1wiO1xyXG4gICAgaWYgKCFub2RlLmNvcm5lclJhZGl1cyAmJiAhbm9kZS50b3BMZWZ0UmFkaXVzKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KHR5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgID8gKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5jb3JuZXJSYWRpdXMpICsgXCJweFwiXHJcbiAgICAgICAgOiBcIlwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnRvcExlZnRSYWRpdXMpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS50b3BSaWdodFJhZGl1cyksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmJvdHRvbVJpZ2h0UmFkaXVzKSwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUuYm90dG9tTGVmdFJhZGl1cyksIFwicHhcIiksIFwiO1wiKTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGJvcmRlclJhZGl1c1Byb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGJveFNoYWRvd1Byb3Aobm9kZSkge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKCFub2RlLmVmZmVjdHMgfHxcclxuICAgICAgICBub2RlLmVmZmVjdHMubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSB8fFxyXG4gICAgICAgIG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHN0eWxlSWQgPSBub2RlLmVmZmVjdFN0eWxlSWQ7XHJcbiAgICB2YXIgc2hhZG93VHlwZXMgPSBbXCJJTk5FUl9TSEFET1dcIiwgXCJEUk9QX1NIQURPV1wiXTtcclxuICAgIHZhciBzaGFkb3dzID0gbm9kZS5lZmZlY3RzLmZpbHRlcihmdW5jdGlvbiAoZWZmZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHNoYWRvd1R5cGVzLmluY2x1ZGVzKGVmZmVjdC50eXBlKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIGNzcyA9IFwiYm94LXNoYWRvdzogXCI7XHJcbiAgICB2YXIgdmFsdWUgPSBzaGFkb3dzXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChzLnR5cGUgPT09IFwiSU5ORVJfU0hBRE9XXCIgPyBcImluc2V0XCIgOiBcIlwiLCBcIiBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHMub2Zmc2V0LngpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikocy5vZmZzZXQueSksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShzLnJhZGl1cyksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShzLnNwcmVhZCksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLnJnYmFDb2xvcikocy5jb2xvciwgcy5jb2xvci5hKSk7XHJcbiAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICBpZiAoc3R5bGVJZCkge1xyXG4gICAgICAgIHZhciBzdHlsZU5hbWUgPSAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKSgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQoc3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKTtcclxuICAgICAgICB2YWx1ZSA9IFwidmFyKC0tXCIuY29uY2F0KHN0eWxlTmFtZSwgXCItYm94LXNoYWRvdywgXCIpLmNvbmNhdCh2YWx1ZSwgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzcyArIHZhbHVlICsgXCI7XCI7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBib3hTaGFkb3dQcm9wO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGZpbGxDb2xvcl8xID0gcmVxdWlyZShcIi4vZmlsbENvbG9yXCIpO1xyXG5mdW5jdGlvbiBjb2xvclByb3Aobm9kZSkge1xyXG4gICAgdmFyIGNvbG9yID0gKDAsIGZpbGxDb2xvcl8xLmZpbGxDb2xvcikobm9kZSk7XHJcbiAgICBpZiAoIWNvbG9yIHx8IGNvbG9yID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoY29sb3IgPT09IFwidHJhbnNwYXJlbnRcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBcImNvbG9yOiBcIi5jb25jYXQoY29sb3IsIFwiO1wiKTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbG9yUHJvcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuY3NzRnJvbUNvbnN0cmFpbnRzID0gdm9pZCAwO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbnZhciBmaW5kQWJzb2x1dGVQYXJlbnRfMSA9IHJlcXVpcmUoXCIuL2ZpbmRBYnNvbHV0ZVBhcmVudFwiKTtcclxuZnVuY3Rpb24gY3NzRnJvbUNvbnN0cmFpbnRzKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICB2YXIgY29vcmQgPSBcIlwiO1xyXG4gICAgc3dpdGNoICgoX2EgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGNhc2UgXCJNQVhcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJyaWdodDogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKCgwLCBmaW5kQWJzb2x1dGVQYXJlbnRfMS5maW5kQWJzb2x1dGVQYXJlbnQpKG5vZGUpLndpZHRoIC0gbm9kZS53aWR0aCAtIG5vZGUueCksIFwicHg7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiU1RSRVRDSFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcInJpZ2h0OiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoKDAsIGZpbmRBYnNvbHV0ZVBhcmVudF8xLmZpbmRBYnNvbHV0ZVBhcmVudCkobm9kZSkud2lkdGggLSBub2RlLndpZHRoIC0gbm9kZS54KSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdChub2RlLngsIFwicHg7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQ0VOVEVSXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IFwibGVmdDogY2FsYyg1MCUgLSBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoKDAsIGZpbmRBYnNvbHV0ZVBhcmVudF8xLmZpbmRBYnNvbHV0ZVBhcmVudCkobm9kZSkud2lkdGggLyAyIC0gbm9kZS54KSwgXCJweCk7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImxlZnQ6IFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLngpLCBcInB4O1wiKTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoKF9iID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgY2FzZSBcIk1BWFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImJvdHRvbTogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKCgwLCBmaW5kQWJzb2x1dGVQYXJlbnRfMS5maW5kQWJzb2x1dGVQYXJlbnQpKG5vZGUpLmhlaWdodCAtIG5vZGUuaGVpZ2h0IC0gbm9kZS55KSwgXCJweDtcIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJTVFJFVENIXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IFwiYm90dG9tOiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoKDAsIGZpbmRBYnNvbHV0ZVBhcmVudF8xLmZpbmRBYnNvbHV0ZVBhcmVudCkobm9kZSkuaGVpZ2h0IC0gbm9kZS5oZWlnaHQgLSBub2RlLnkpLCBcInB4OyB0b3A6IFwiKS5jb25jYXQobm9kZS55LCBcInB4O1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkNFTlRFUlwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcInRvcDogY2FsYyg1MCUgLSBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoKDAsIGZpbmRBYnNvbHV0ZVBhcmVudF8xLmZpbmRBYnNvbHV0ZVBhcmVudCkobm9kZSkuaGVpZ2h0IC8gMiAtIG5vZGUueSksIFwicHgpO1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJ0b3A6IFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnkpLCBcInB4O1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZDtcclxufVxyXG5leHBvcnRzLmNzc0Zyb21Db25zdHJhaW50cyA9IGNzc0Zyb21Db25zdHJhaW50cztcclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjc3NGcm9tQ29uc3RyYWludHM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcclxuICAgIC8vIGluIHRoaXMgY2FzZSB0aGUgZGltZW5zaW9ucyBhcmUgZGVmaW5lZCBpbnNpZGUgdGhlIHN2Z1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIC8qIE5PVEU6IFRoZSBPcmRlciBvZiB0aGVzZSBpZiBzdGF0ZW1lbnRzIGlzIGltcG9ydGFudCEgKi9cclxuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xyXG4gICAgdmFyIHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIlxyXG4gICAgICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmhlaWdodCkgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCJcclxuICAgICAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS53aWR0aCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiXHJcbiAgICAgICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgICAgICA6ICgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUud2lkdGgpICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIlxyXG4gICAgICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmhlaWdodCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5oZWlnaHQpICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLndpZHRoKSArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5oZWlnaHQpICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS53aWR0aCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAoKF9kID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhvcml6b250YWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiZcclxuICAgICAgICBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkgfHxcclxuICAgICAgICAoKF9lID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZlcnRpY2FsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgd2lkdGggIT09IFwiYXV0b1wiID8gXCJ3aWR0aDogXCIuY29uY2F0KHdpZHRoLCBcIjtcIikgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgaGVpZ2h0ICE9PSBcImF1dG9cIiA/IFwiaGVpZ2h0OiBcIi5jb25jYXQoaGVpZ2h0LCBcIjtcIikgOiB1bmRlZmluZWQsXHJcbiAgICBdXHJcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgLy8gZGVsZXRlIHVuZGVmaW5lZFxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRpbWVuc2lvbnM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9wKG5vZGUpIHtcclxuICAgIHZhciBmbGV4U2hyaW5rR3JvdyA9IG5vZGUubGF5b3V0R3JvdyA9PT0gMSA/IFwiZmxleDogMTtcIiA6IHNocmluaygpO1xyXG4gICAgZnVuY3Rpb24gc2hyaW5rKCkge1xyXG4gICAgICAgIHJldHVybiAhKG5vZGUudHlwZSA9PT0gXCJURVhUXCIpIC8vJiYgIShub2RlLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCIpXHJcbiAgICAgICAgICAgID8gXCJmbGV4LXNocmluazogMDtcIlxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICB2YXIgbGF5b3V0QWxpZ24gPSBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIiA/IFwiYWxpZ24tc2VsZjogc3RyZXRjaDtcIiA6IFwiXCI7XHJcbiAgICB2YXIgYWxpZ25tZW50TWFwID0ge1xyXG4gICAgICAgIE1JTjogXCJmbGV4LXN0YXJ0XCIsXHJcbiAgICAgICAgTUFYOiBcImZsZXgtZW5kXCIsXHJcbiAgICAgICAgQ0VOVEVSOiBcImNlbnRlclwiLFxyXG4gICAgICAgIFNQQUNFX0JFVFdFRU46IFwic3BhY2UtYmV0d2VlblwiXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gZ2FwKCkge1xyXG4gICAgICAgIGlmIChub2RlLnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9PT0gXCJTUEFDRV9CRVRXRUVOXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIGlmIChub2RlLml0ZW1TcGFjaW5nIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIFwiZ2FwOiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5pdGVtU3BhY2luZyksIFwicHg7XCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGZsZXhQcm9wcyA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBcIi5jb25jYXQoZGlyZWN0aW9uLCBcIjtcXG4gICAgICBcIikuY29uY2F0KGdhcCgpLCBcIlxcbiAgICAgIGFsaWduLWl0ZW1zOiBcIikuY29uY2F0KGFsaWdubWVudE1hcFtub2RlLmNvdW50ZXJBeGlzQWxpZ25JdGVtc10sIFwiO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogXCIpLmNvbmNhdChhbGlnbm1lbnRNYXBbbm9kZS5wcmltYXJ5QXhpc0FsaWduSXRlbXNdLCBcIjtcXG4gICAgXCIpO1xyXG4gICAgfTtcclxuICAgIHZhciBsYXlvdXRQcm9wcyA9IFwiXCI7XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyA9IGZsZXhQcm9wcyhcImNvbHVtblwiKTtcclxuICAgIH1cclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBmbGV4UHJvcHMoXCJyb3dcIik7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgfHxcclxuICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcclxuICAgICAgICBsYXlvdXRQcm9wcyArPSBsYXlvdXRBbGlnbiArIGZsZXhTaHJpbmtHcm93O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheW91dFByb3BzO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGlzcGxheVByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLmZpbGxDb2xvciA9IHZvaWQgMDtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG52YXIgZ2V0Q29sb3JfMSA9IHJlcXVpcmUoXCIuL2dldENvbG9yXCIpO1xyXG5mdW5jdGlvbiBmaWxsQ29sb3Iobm9kZU9yU3R5bGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICgoMCwgaGVscGVyc18xLndpbGxCZVJlbmRlcmVkQXNTVkcpKG5vZGVPclN0eWxlKSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBmaWxscyA9IG5vZGVPclN0eWxlLmZpbGxzO1xyXG4gICAgLy8gbXVsdGlwbGUgZmlsbHNcclxuICAgIGlmICgoZmlsbHMgPT09IG51bGwgfHwgZmlsbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZpbGxzLmxlbmd0aCkgPiAxKSB7XHJcbiAgICAgICAgdmFyIGZpbGxzQXNHcmFkaWVudHMgPSBmaWxsc1xyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChmaWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgZ2V0Q29sb3JfMS5nZXRDb2xvcikoZmlsbCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gc3RyICE9PSBcIlwiOyB9KVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0cjsgfSlcclxuICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpO1xyXG4gICAgICAgIGlmIChub2RlT3JTdHlsZS5maWxsU3R5bGVJZCkge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGVOYW1lID0gKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGVPclN0eWxlLmZpbGxTdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ2YXIoLS1cIi5jb25jYXQoc3R5bGVOYW1lLCBcIiwgXCIpLmNvbmNhdChmaWxsc0FzR3JhZGllbnRzLCBcIilcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaWxsc0FzR3JhZGllbnRzO1xyXG4gICAgfVxyXG4gICAgLy8gc2luZ2xlIGZpbGxcclxuICAgIHJldHVybiAoMCwgZ2V0Q29sb3JfMS5nZXRDb2xvcikoZmlsbHMgPT09IG51bGwgfHwgZmlsbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZpbGxzWzBdLCBub2RlT3JTdHlsZS5maWxsU3R5bGVJZCk7XHJcbn1cclxuZXhwb3J0cy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZmlsbENvbG9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG5mdW5jdGlvbiBmaWx0ZXJQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghbm9kZS5lZmZlY3RzIHx8XHJcbiAgICAgICAgbm9kZS5lZmZlY3RzLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiR1JPVVBcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBzdHlsZUlkID0gbm9kZS5lZmZlY3RTdHlsZUlkO1xyXG4gICAgdmFyIGJsdXIgPSBub2RlLmVmZmVjdHMuZmlsdGVyKGZ1bmN0aW9uIChlZmZlY3QpIHsgcmV0dXJuIGVmZmVjdC50eXBlID09PSBcIkxBWUVSX0JMVVJcIiAmJiBlZmZlY3QudmlzaWJsZTsgfSk7XHJcbiAgICBpZiAoYmx1ci5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgY3NzID0gXCJmaWx0ZXI6IFwiO1xyXG4gICAgdmFyIHZhbHVlID0gYmx1clxyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGIpIHtcclxuICAgICAgICByZXR1cm4gXCJibHVyKFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShiLnJhZGl1cyAvIDIpLCBcInB4KVwiKTtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICB2YXIgc3R5bGVOYW1lID0gKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgdmFsdWUgPSBcInZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLWZpbHRlciwgXCIpLmNvbmNhdCh2YWx1ZSwgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzcyArIHZhbHVlICsgXCI7XCI7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmaWx0ZXJQcm9wO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5maW5kQWJzb2x1dGVQYXJlbnQgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKSB7XHJcbiAgICBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlLnBhcmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQ7XHJcbn1cclxuZXhwb3J0cy5maW5kQWJzb2x1dGVQYXJlbnQgPSBmaW5kQWJzb2x1dGVQYXJlbnQ7XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZmluZEFic29sdXRlUGFyZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZnVuY3Rpb24gZmxleFByb3BzRm9yVGV4dChub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICAvKiBEb24ndCBkbyBhbnl0aGluZyBhdCBhbGwgaWYgdGV4dEFsaWduVmVydGljYWwgaXMgc2V0IHRvIHRvcCAqL1xyXG4gICAgaWYgKG5vZGUudGV4dEFsaWduVmVydGljYWwgJiYgbm9kZS50ZXh0QWxpZ25WZXJ0aWNhbCA9PT0gXCJUT1BcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBjc3MgPSBcImRpc3BsYXk6IGZsZXg7XFxuXCI7XHJcbiAgICBpZiAobm9kZS50ZXh0QWxpZ25WZXJ0aWNhbCA9PT0gXCJDRU5URVJcIikge1xyXG4gICAgICAgIGNzcyArPSBcImFsaWduLWl0ZW1zOiBjZW50ZXI7XCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjc3MgKz0gXCJhbGlnbi1pdGVtczogZmxleC1lbmQ7XCI7XHJcbiAgICB9XHJcbiAgICAvLyBpZiB2ZXJ0aWNhbCBhbGlnbiBpcyBhcHBsaWVkIGkgYWxzbyB0byBhZGRpdGlvbmFsbHkgYWRkIGhvcml6b250YWwgYWxpZ24uLi5cclxuICAgIHZhciB0ZXh0QWxpZ24gPSAoX2EgPSBub2RlLnRleHRBbGlnbkhvcml6b250YWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdmFyIHRleHRUb0ZsZXhBbGlnbk1hcCA9IHtcclxuICAgICAgICBsZWZ0OiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgcmlnaHQ6IFwiZmxleC1lbmRcIlxyXG4gICAgfTtcclxuICAgIGNzcyArPSBcImp1c3RpZnktY29udGVudDogXCIuY29uY2F0KHRleHRUb0ZsZXhBbGlnbk1hcFt0ZXh0QWxpZ25dKTtcclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmbGV4UHJvcHNGb3JUZXh0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG52YXIgZm9udFNob3J0aGFuZF8xID0gcmVxdWlyZShcIi4vZm9udFNob3J0aGFuZFwiKTtcclxudmFyIGZvbnRTdHlsZUFzT2JqZWN0XzEgPSByZXF1aXJlKFwiLi9mb250U3R5bGVBc09iamVjdFwiKTtcclxudmFyIGxpbmVIZWlnaHRfMSA9IHJlcXVpcmUoXCIuL2xpbmVIZWlnaHRcIik7XHJcbmZ1bmN0aW9uIGZvbnRQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgdmFyIF9kID0gKDAsIGZvbnRTdHlsZUFzT2JqZWN0XzEuZm9udFN0eWxlQXNPYmplY3QpKG5vZGUuZm9udE5hbWUpLCB3ZWlnaHQgPSBfZC53ZWlnaHQsIGlzSXRhbGljID0gX2QuaXNJdGFsaWM7XHJcbiAgICB2YXIgZm9udFNpemUgPSBOdW1iZXIoKF9hID0gbm9kZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpOyAvLyB0b1N0cmluZyBpcyBuZWVkZWQgdG8gY29udmVydCBTeW1ib2xzIGludG8gc3RyaW5nIGZpcnN0IChpIHRoaW5rKVxyXG4gICAgdmFyIGZvbnRGYW1pbHkgPSAoX2IgPSBub2RlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgbGluZUhlaWdodFN0ciA9ICgwLCBsaW5lSGVpZ2h0XzFbXCJkZWZhdWx0XCJdKShub2RlKTtcclxuICAgIHZhciBzaG9ydGhhbmQgPSAoMCwgZm9udFNob3J0aGFuZF8xLmZvbnRTaG9ydGhhbmQpKHtcclxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcclxuICAgICAgICBmb250RmFtaWx5OiBmb250RmFtaWx5LFxyXG4gICAgICAgIGlzSXRhbGljOiBpc0l0YWxpY1xyXG4gICAgfSk7XHJcbiAgICBpZiAobm9kZS50ZXh0U3R5bGVJZCkge1xyXG4gICAgICAgIHZhciBzdHlsZU5hbWUgPSAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKSgoX2MgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS50ZXh0U3R5bGVJZC50b1N0cmluZygpKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBcImZvbnQ6IHZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLCBcIikuY29uY2F0KHNob3J0aGFuZCwgXCIpO1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcImZvbnQ6IFwiLmNvbmNhdChzaG9ydGhhbmQsIFwiO1wiKTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZvbnRQcm9wO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5mb250U2hvcnRoYW5kID0gdm9pZCAwO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoX2EpIHtcclxuICAgIHZhciBsaW5lSGVpZ2h0ID0gX2EubGluZUhlaWdodCwgZm9udFNpemUgPSBfYS5mb250U2l6ZSwgd2VpZ2h0ID0gX2Eud2VpZ2h0LCBmb250RmFtaWx5ID0gX2EuZm9udEZhbWlseSwgaXNJdGFsaWMgPSBfYS5pc0l0YWxpYztcclxuICAgIHZhciBpdGFsaWMgPSBpc0l0YWxpYyA/IFwiaXRhbGljIFwiIDogXCJcIjtcclxuICAgIHJldHVybiBcIlwiLmNvbmNhdCh3ZWlnaHQsIFwiIFwiKS5jb25jYXQoaXRhbGljKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoZm9udFNpemUpLCBcInB4XCIpLmNvbmNhdChsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIiwgXCIgJ1wiKS5jb25jYXQoZm9udEZhbWlseSwgXCInXCIpO1xyXG59XHJcbmV4cG9ydHMuZm9udFNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQ7XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9udFNob3J0aGFuZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZm9udFN0eWxlQXNPYmplY3QgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGZvbnRTdHlsZUFzT2JqZWN0KGZvbnROYW1lKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgdmFyIGlzSXRhbGljID0gKF9hID0gZm9udE5hbWUgPT09IG51bGwgfHwgZm9udE5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvbnROYW1lLnN0eWxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcIml0YWxpY1wiKTtcclxuICAgIHZhciB3ZWlnaHRNYXAgPSB7XHJcbiAgICAgICAgdGhpbjogMTAwLFxyXG4gICAgICAgIFwiZXh0cmEgbGlnaHRcIjogMjAwLFxyXG4gICAgICAgIGV4dHJhbGlnaHQ6IDIwMCxcclxuICAgICAgICBsaWdodDogMzAwLFxyXG4gICAgICAgIG5vcm1hbDogNDAwLFxyXG4gICAgICAgIHJlZ3VsYXI6IDQwMCxcclxuICAgICAgICBtZWRpdW06IDUwMCxcclxuICAgICAgICBcInNlbWkgYm9sZFwiOiA2MDAsXHJcbiAgICAgICAgc2VtaWJvbGQ6IDYwMCxcclxuICAgICAgICBib2xkOiA3MDAsXHJcbiAgICAgICAgXCJleHRyYSBib2xkXCI6IDgwMCxcclxuICAgICAgICBleHRyYWJvbGQ6IDgwMCxcclxuICAgICAgICBibGFjazogOTAwXHJcbiAgICB9O1xyXG4gICAgdmFyIHdlaWdodCA9IChfYiA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIml0YWxpY1wiLCBcIlwiKS50cmltKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0TWFwW3dlaWdodF0gPyB3ZWlnaHRNYXBbd2VpZ2h0XSA6IFwiNDAwXCIsXHJcbiAgICAgICAgaXNJdGFsaWM6IGlzSXRhbGljXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZm9udFN0eWxlQXNPYmplY3QgPSBmb250U3R5bGVBc09iamVjdDtcclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmb250U3R5bGVBc09iamVjdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZ2V0Q29sb3IgPSB2b2lkIDA7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vaGVscGVyc1wiKTtcclxudmFyIGdyYWRpZW50RmlsbF8xID0gcmVxdWlyZShcIi4vZ3JhZGllbnRGaWxsXCIpO1xyXG5mdW5jdGlvbiBnZXRDb2xvcihmaWxsT3JDb2xvciwgc3R5bGVJZCwgaXNNdWx0aUZpbGwgLy8gdG8gZW5hYmxlIG11bHRpcGxlIGZpbGxzXHJcbikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgaWYgKGlzTXVsdGlGaWxsID09PSB2b2lkIDApIHsgaXNNdWx0aUZpbGwgPSBmYWxzZTsgfVxyXG4gICAgaWYgKGlzTXVsdGlGaWxsICYmICghZmlsbE9yQ29sb3IgfHwgIWZpbGxPckNvbG9yLnZpc2libGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZpbGxPckNvbG9yIHx8ICFmaWxsT3JDb2xvci52aXNpYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIHZhciBncmFkaWVudFR5cGVzID0gW1xyXG4gICAgICAgIFwiR1JBRElFTlRfTElORUFSXCIsXHJcbiAgICAgICAgXCJHUkFESUVOVF9SQURJQUxcIixcclxuICAgICAgICBcIkdSQURJRU5UX0FOR1VMQVJcIixcclxuICAgICAgICBcIkdSQURJRU5UX0RJQU1PTkRcIixcclxuICAgIF07XHJcbiAgICBpZiAoZ3JhZGllbnRUeXBlcy5pbmNsdWRlcyhmaWxsT3JDb2xvci50eXBlKSkge1xyXG4gICAgICAgIHJldHVybiAoMCwgZ3JhZGllbnRGaWxsXzEuZ3JhZGllbnRGaWxsKShmaWxsT3JDb2xvciwgc3R5bGVJZCwgaXNNdWx0aUZpbGwpO1xyXG4gICAgfVxyXG4gICAgdmFyIGNvbG9yID0gKDAsIGhlbHBlcnNfMS5jb2xvckFzSGV4T3JSZ2JhKShmaWxsT3JDb2xvcik7XHJcbiAgICBpZiAoaXNNdWx0aUZpbGwgJiYgZmlsbE9yQ29sb3IudHlwZSA9PT0gXCJTT0xJRFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwibGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIFwiLmNvbmNhdChjb2xvciwgXCIsIFwiKS5jb25jYXQoY29sb3IsIFwiKVwiKTtcclxuICAgIH1cclxuICAgIGlmIChzdHlsZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlTmFtZSA9ICgwLCBoZWxwZXJzXzEuY2xlYW5TdHlsZU5hbWUpKChfYSA9IGZpZ21hLmdldFN0eWxlQnlJZChzdHlsZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBcInZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLCBcIikuY29uY2F0KGNvbG9yLCBcIilcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDAsIGhlbHBlcnNfMS5jb2xvckFzSGV4T3JSZ2JhKShmaWxsT3JDb2xvcik7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xvciA9IGdldENvbG9yO1xyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGdldENvbG9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5ncmFkaWVudEZpbGwgPSB2b2lkIDA7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vaGVscGVyc1wiKTtcclxuZnVuY3Rpb24gZ3JhZGllbnRGaWxsKGZpbGwsIHN0eWxlSWQsIGlzTXVsdGlGaWxsKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoaXNNdWx0aUZpbGwgPT09IHZvaWQgMCkgeyBpc011bHRpRmlsbCA9IGZhbHNlOyB9XHJcbiAgICB2YXIgZ3JhZGllbnRTdG9wcyA9IGZpbGwuZ3JhZGllbnRTdG9wcztcclxuICAgIHZhciB0cmFuc2Zvcm1zID0gKDAsIGhlbHBlcnNfMS5nZXRUcmFuc2Zvcm1zKShmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIHZhciBncmFkaWVudE1hcCA9IGdyYWRpZW50U3RvcHMubWFwKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEucmdiYUNvbG9yKShzLmNvbG9yLCAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShzLmNvbG9yLmEgKiBmaWxsLm9wYWNpdHkpKSwgXCIgXCIpLmNvbmNhdChzLnBvc2l0aW9uICogMTAwLCBcIiVcIik7XHJcbiAgICB9KTtcclxuICAgIHZhciBncmFkaWVudE5hbWVNYXAgPSB7XHJcbiAgICAgICAgR1JBRElFTlRfTElORUFSOiBcImxpbmVhci1ncmFkaWVudFwiLFxyXG4gICAgICAgIEdSQURJRU5UX1JBRElBTDogXCJyYWRpYWwtZ3JhZGllbnRcIixcclxuICAgICAgICBHUkFESUVOVF9BTkdVTEFSOiBcImNvbmljLWdyYWRpZW50XCIsXHJcbiAgICAgICAgR1JBRElFTlRfRElBTU9ORDogXCJyYWRpYWwtZ3JhZGllbnRcIlxyXG4gICAgfTtcclxuICAgIHZhciBncmFkaWVudFNwZWNpZmljVGV4dE1hcCA9IHtcclxuICAgICAgICBHUkFESUVOVF9MSU5FQVI6IFwiXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHRyYW5zZm9ybXMuYW5nbGUgKyA5MCksIFwiZGVnXCIpLFxyXG4gICAgICAgIEdSQURJRU5UX1JBRElBTDogXCJjbG9zZXN0LXNpZGVcIixcclxuICAgICAgICBHUkFESUVOVF9BTkdVTEFSOiBcImZyb20gXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHRyYW5zZm9ybXMuYW5nbGUgKyA5MCksIFwiZGVnIGF0IDUwJSA1MCVcIiksXHJcbiAgICAgICAgR1JBRElFTlRfRElBTU9ORDogXCJjbG9zZXN0LXNpZGVcIlxyXG4gICAgfTtcclxuICAgIHZhciBncmFkaWVudCA9IFwiXCIuY29uY2F0KGdyYWRpZW50TmFtZU1hcFtmaWxsLnR5cGVdLCBcIihcIikuY29uY2F0KGdyYWRpZW50U3BlY2lmaWNUZXh0TWFwW2ZpbGwudHlwZV0sIFwiLCBcIikuY29uY2F0KGdyYWRpZW50TWFwLmpvaW4oXCIsXCIpLCBcIilcIik7XHJcbiAgICBpZiAoc3R5bGVJZCkge1xyXG4gICAgICAgIHZhciBzdHlsZU5hbWUgPSAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKSgoX2EgPSBmaWdtYS5nZXRTdHlsZUJ5SWQoc3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKTtcclxuICAgICAgICByZXR1cm4gXCJ2YXIoLS1cIi5jb25jYXQoc3R5bGVOYW1lLCBcIiwgXCIpLmNvbmNhdChncmFkaWVudCwgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdyYWRpZW50O1xyXG59XHJcbmV4cG9ydHMuZ3JhZGllbnRGaWxsID0gZ3JhZGllbnRGaWxsO1xyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGdyYWRpZW50RmlsbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMubWFyZ2luUHJvcCA9IGV4cG9ydHMuZmxleFByb3BzRm9yVGV4dCA9IGV4cG9ydHMudGV4dERlY29yYXRpb25Qcm9wID0gZXhwb3J0cy50ZXh0VHJhbnNmb3JtUHJvcCA9IGV4cG9ydHMuZm9udFByb3AgPSBleHBvcnRzLmZvbnRTaG9ydGhhbmQgPSBleHBvcnRzLmxpbmVIZWlnaHQgPSBleHBvcnRzLmdldENvbG9yID0gZXhwb3J0cy5zdHJva2VDb2xvciA9IGV4cG9ydHMuYm9yZGVyUmFkaXVzUHJvcCA9IGV4cG9ydHMuZ3JhZGllbnRGaWxsID0gZXhwb3J0cy50cmFuc2Zvcm1Qcm9wcyA9IGV4cG9ydHMuY29sb3JQcm9wID0gZXhwb3J0cy5iYWNrZ3JvdW5kUHJvcCA9IGV4cG9ydHMuZmlsbENvbG9yID0gZXhwb3J0cy5mb250U3R5bGVBc09iamVjdCA9IGV4cG9ydHMuYm94U2hhZG93UHJvcCA9IGV4cG9ydHMucG9zaXRpb25Qcm9wcyA9IGV4cG9ydHMuY3NzRnJvbUNvbnN0cmFpbnRzID0gZXhwb3J0cy5maW5kQWJzb2x1dGVQYXJlbnQgPSBleHBvcnRzLm9wYWNpdHlQcm9wID0gZXhwb3J0cy5vdmVyZmxvd1Byb3AgPSBleHBvcnRzLmRpbWVuc2lvbnMgPSBleHBvcnRzLmRpc3BsYXlQcm9wID0gZXhwb3J0cy5wYWRkaW5nUHJvcCA9IGV4cG9ydHMuYm9yZGVyUHJvcCA9IHZvaWQgMDtcclxudmFyIGJvcmRlclByb3BfMSA9IHJlcXVpcmUoXCIuL2JvcmRlclByb3BcIik7XHJcbmV4cG9ydHMuYm9yZGVyUHJvcCA9IGJvcmRlclByb3BfMVtcImRlZmF1bHRcIl07XHJcbnZhciBwYWRkaW5nUHJvcF8xID0gcmVxdWlyZShcIi4vcGFkZGluZ1Byb3BcIik7XHJcbmV4cG9ydHMucGFkZGluZ1Byb3AgPSBwYWRkaW5nUHJvcF8xW1wiZGVmYXVsdFwiXTtcclxudmFyIGRpc3BsYXlQcm9wXzEgPSByZXF1aXJlKFwiLi9kaXNwbGF5UHJvcFwiKTtcclxuZXhwb3J0cy5kaXNwbGF5UHJvcCA9IGRpc3BsYXlQcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgZGltZW5zaW9uc18xID0gcmVxdWlyZShcIi4vZGltZW5zaW9uc1wiKTtcclxuZXhwb3J0cy5kaW1lbnNpb25zID0gZGltZW5zaW9uc18xW1wiZGVmYXVsdFwiXTtcclxudmFyIG92ZXJmbG93UHJvcF8xID0gcmVxdWlyZShcIi4vb3ZlcmZsb3dQcm9wXCIpO1xyXG5leHBvcnRzLm92ZXJmbG93UHJvcCA9IG92ZXJmbG93UHJvcF8xW1wiZGVmYXVsdFwiXTtcclxudmFyIG9wYWNpdHlQcm9wXzEgPSByZXF1aXJlKFwiLi9vcGFjaXR5UHJvcFwiKTtcclxuZXhwb3J0cy5vcGFjaXR5UHJvcCA9IG9wYWNpdHlQcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgZmluZEFic29sdXRlUGFyZW50XzEgPSByZXF1aXJlKFwiLi9maW5kQWJzb2x1dGVQYXJlbnRcIik7XHJcbmV4cG9ydHMuZmluZEFic29sdXRlUGFyZW50ID0gZmluZEFic29sdXRlUGFyZW50XzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgY3NzRnJvbUNvbnN0cmFpbnRzXzEgPSByZXF1aXJlKFwiLi9jc3NGcm9tQ29uc3RyYWludHNcIik7XHJcbmV4cG9ydHMuY3NzRnJvbUNvbnN0cmFpbnRzID0gY3NzRnJvbUNvbnN0cmFpbnRzXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgcG9zaXRpb25Qcm9wc18xID0gcmVxdWlyZShcIi4vcG9zaXRpb25Qcm9wc1wiKTtcclxuZXhwb3J0cy5wb3NpdGlvblByb3BzID0gcG9zaXRpb25Qcm9wc18xW1wiZGVmYXVsdFwiXTtcclxudmFyIGJveFNoYWRvd1Byb3BfMSA9IHJlcXVpcmUoXCIuL2JveFNoYWRvd1Byb3BcIik7XHJcbmV4cG9ydHMuYm94U2hhZG93UHJvcCA9IGJveFNoYWRvd1Byb3BfMVtcImRlZmF1bHRcIl07XHJcbnZhciBmb250U3R5bGVBc09iamVjdF8xID0gcmVxdWlyZShcIi4vZm9udFN0eWxlQXNPYmplY3RcIik7XHJcbmV4cG9ydHMuZm9udFN0eWxlQXNPYmplY3QgPSBmb250U3R5bGVBc09iamVjdF8xW1wiZGVmYXVsdFwiXTtcclxudmFyIGZpbGxDb2xvcl8xID0gcmVxdWlyZShcIi4vZmlsbENvbG9yXCIpO1xyXG5leHBvcnRzLmZpbGxDb2xvciA9IGZpbGxDb2xvcl8xW1wiZGVmYXVsdFwiXTtcclxudmFyIGJhY2tncm91bmRQcm9wXzEgPSByZXF1aXJlKFwiLi9iYWNrZ3JvdW5kUHJvcFwiKTtcclxuZXhwb3J0cy5iYWNrZ3JvdW5kUHJvcCA9IGJhY2tncm91bmRQcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgY29sb3JQcm9wXzEgPSByZXF1aXJlKFwiLi9jb2xvclByb3BcIik7XHJcbmV4cG9ydHMuY29sb3JQcm9wID0gY29sb3JQcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgdHJhbnNmb3JtUHJvcHNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zZm9ybVByb3BzXCIpO1xyXG5leHBvcnRzLnRyYW5zZm9ybVByb3BzID0gdHJhbnNmb3JtUHJvcHNfMVtcImRlZmF1bHRcIl07XHJcbnZhciBncmFkaWVudEZpbGxfMSA9IHJlcXVpcmUoXCIuL2dyYWRpZW50RmlsbFwiKTtcclxuZXhwb3J0cy5ncmFkaWVudEZpbGwgPSBncmFkaWVudEZpbGxfMVtcImRlZmF1bHRcIl07XHJcbnZhciBib3JkZXJSYWRpdXNQcm9wXzEgPSByZXF1aXJlKFwiLi9ib3JkZXJSYWRpdXNQcm9wXCIpO1xyXG5leHBvcnRzLmJvcmRlclJhZGl1c1Byb3AgPSBib3JkZXJSYWRpdXNQcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgc3Ryb2tlQ29sb3JfMSA9IHJlcXVpcmUoXCIuL3N0cm9rZUNvbG9yXCIpO1xyXG5leHBvcnRzLnN0cm9rZUNvbG9yID0gc3Ryb2tlQ29sb3JfMVtcImRlZmF1bHRcIl07XHJcbnZhciBnZXRDb2xvcl8xID0gcmVxdWlyZShcIi4vZ2V0Q29sb3JcIik7XHJcbmV4cG9ydHMuZ2V0Q29sb3IgPSBnZXRDb2xvcl8xW1wiZGVmYXVsdFwiXTtcclxudmFyIGxpbmVIZWlnaHRfMSA9IHJlcXVpcmUoXCIuL2xpbmVIZWlnaHRcIik7XHJcbmV4cG9ydHMubGluZUhlaWdodCA9IGxpbmVIZWlnaHRfMVtcImRlZmF1bHRcIl07XHJcbnZhciBmb250U2hvcnRoYW5kXzEgPSByZXF1aXJlKFwiLi9mb250U2hvcnRoYW5kXCIpO1xyXG5leHBvcnRzLmZvbnRTaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kXzFbXCJkZWZhdWx0XCJdO1xyXG52YXIgZm9udFByb3BfMSA9IHJlcXVpcmUoXCIuL2ZvbnRQcm9wXCIpO1xyXG5leHBvcnRzLmZvbnRQcm9wID0gZm9udFByb3BfMVtcImRlZmF1bHRcIl07XHJcbnZhciB0ZXh0VHJhbnNmb3JtUHJvcF8xID0gcmVxdWlyZShcIi4vdGV4dFRyYW5zZm9ybVByb3BcIik7XHJcbmV4cG9ydHMudGV4dFRyYW5zZm9ybVByb3AgPSB0ZXh0VHJhbnNmb3JtUHJvcF8xW1wiZGVmYXVsdFwiXTtcclxudmFyIHRleHREZWNvcmF0aW9uUHJvcF8xID0gcmVxdWlyZShcIi4vdGV4dERlY29yYXRpb25Qcm9wXCIpO1xyXG5leHBvcnRzLnRleHREZWNvcmF0aW9uUHJvcCA9IHRleHREZWNvcmF0aW9uUHJvcF8xW1wiZGVmYXVsdFwiXTtcclxudmFyIGZsZXhQcm9wc0ZvclRleHRfMSA9IHJlcXVpcmUoXCIuL2ZsZXhQcm9wc0ZvclRleHRcIik7XHJcbmV4cG9ydHMuZmxleFByb3BzRm9yVGV4dCA9IGZsZXhQcm9wc0ZvclRleHRfMVtcImRlZmF1bHRcIl07XHJcbnZhciBtYXJnaW5Qcm9wXzEgPSByZXF1aXJlKFwiLi9tYXJnaW5Qcm9wXCIpO1xyXG5leHBvcnRzLm1hcmdpblByb3AgPSBtYXJnaW5Qcm9wXzFbXCJkZWZhdWx0XCJdO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG5mdW5jdGlvbiBsaW5lSGVpZ2h0KG5vZGVPclN0eWxlKSB7XHJcbiAgICBpZiAoIW5vZGVPclN0eWxlLmxpbmVIZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAobm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0ID09PSBcIkFVVE9cIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciB1bml0TWFwID0ge1xyXG4gICAgICAgIFBJWEVMUzogXCJweFwiLFxyXG4gICAgICAgIFBFUkNFTlQ6IFwiJVwiXHJcbiAgICB9O1xyXG4gICAgdmFyIHVuaXQgPSB1bml0TWFwW25vZGVPclN0eWxlLmxpbmVIZWlnaHQudW5pdF07XHJcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZU9yU3R5bGUubGluZUhlaWdodC52YWx1ZSkpLmNvbmNhdCh1bml0KTtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGxpbmVIZWlnaHQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIG1hcmdpblByb3Aobm9kZSkge1xyXG4gICAgaWYgKG5vZGUgIT09IG5vZGUucGFyZW50LmNoaWxkcmVuWzBdICYmXHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSAmJlxyXG4gICAgICAgIG5vZGUucGFyZW50LmxheW91dE1vZGUgIT09IFwiTk9ORVwiICYmXHJcbiAgICAgICAgbm9kZS5wYXJlbnQuaXRlbVNwYWNpbmcgPCAwKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IFwiXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUucGFyZW50Lml0ZW1TcGFjaW5nKSwgXCJweFwiKTtcclxuICAgICAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwibWFyZ2luOiAwIDAgMCBcIi5jb25jYXQodmFsLCBcIjtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJtYXJnaW46IFwiLmNvbmNhdCh2YWwsIFwiIDAgMCAwO1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxufVxyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1hcmdpblByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5mdW5jdGlvbiBvcGFjaXR5UHJvcChub2RlKSB7XHJcbiAgICBpZiAobm9kZS5vcGFjaXR5ID09PSAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwib3BhY2l0eTogXCIuY29uY2F0KG5vZGUub3BhY2l0eSwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gb3BhY2l0eVByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIG92ZXJmbG93UHJvcChub2RlKSB7XHJcbiAgICBpZiAoKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSlcclxuICAgICAgICByZXR1cm4gXCJvdmVyZmxvdzogdmlzaWJsZTtcIjtcclxuICAgIHJldHVybiBub2RlLmNsaXBzQ29udGVudCA/IFwib3ZlcmZsb3c6IGhpZGRlbjtcIiA6IFwiXCI7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBvdmVyZmxvd1Byb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIHBhZGRpbmdQcm9wKG5vZGUpIHtcclxuICAgIGlmICghbm9kZS5wYWRkaW5nVG9wICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ1JpZ2h0ICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgICFub2RlLnBhZGRpbmdMZWZ0KVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwicGFkZGluZzogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUucGFkZGluZ1RvcCksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnBhZGRpbmdSaWdodCksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnBhZGRpbmdCb3R0b20pLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5wYWRkaW5nTGVmdCksIFwicHg7XCIpO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcGFkZGluZ1Byb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbnZhciBjc3NGcm9tQ29uc3RyYWludHNfMSA9IHJlcXVpcmUoXCIuL2Nzc0Zyb21Db25zdHJhaW50c1wiKTtcclxuZnVuY3Rpb24gcG9zaXRpb25Qcm9wcyhub2RlKSB7XHJcbiAgICB2YXIgY29vcmQgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUuaWQgIT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgIGNvb3JkID0gKDAsIGNzc0Zyb21Db25zdHJhaW50c18xLmNzc0Zyb21Db25zdHJhaW50cykobm9kZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcG9zaXRpb25Gcm9tUGFyZW50ID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXTtcclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIgJiYgISgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RhdGljO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5pZCA9PT0gc2VsZWN0aW9uLmlkIHx8ICgoX2EgPSBub2RlLnBhcmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGUpID09PSBcIkNPTVBPTkVOVF9TRVRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZWxhdGl2ZTtcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KG5vZGUubGF5b3V0UG9zaXRpb25pbmcgPT09IFwiQUJTT0xVVEVcIiB8fFxyXG4gICAgICAgICAgICBub2RlLnBhcmVudC5sYXlvdXRNb2RlID09PSBcIk5PTkVcIiB8fFxyXG4gICAgICAgICAgICAhbm9kZS5wYXJlbnQubGF5b3V0TW9kZVxyXG4gICAgICAgICAgICA/IFwiYWJzb2x1dGU7IFwiLmNvbmNhdChjb29yZClcclxuICAgICAgICAgICAgOiBcInJlbGF0aXZlO1wiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gXCJcXG4gICAgICBwb3NpdGlvbjogXCIuY29uY2F0KHBvc2l0aW9uRnJvbVBhcmVudChub2RlKSwgXCJcXG4gICAgXCIpO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcG9zaXRpb25Qcm9wcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuc3Ryb2tlQ29sb3IgPSB2b2lkIDA7XHJcbnZhciBnZXRDb2xvcl8xID0gcmVxdWlyZShcIi4vZ2V0Q29sb3JcIik7XHJcbmZ1bmN0aW9uIHN0cm9rZUNvbG9yKG5vZGUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHZhciBzdHJva2UgPSAoX2EgPSBub2RlLnN0cm9rZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiAoMCwgZ2V0Q29sb3JfMS5nZXRDb2xvcikoc3Ryb2tlLCBub2RlLnN0cm9rZVN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydHMuc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBzdHJva2VDb2xvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuc3R5bGVDb2xvciA9IHZvaWQgMDtcclxudmFyIGdldENvbG9yXzEgPSByZXF1aXJlKFwiLi9nZXRDb2xvclwiKTtcclxuZnVuY3Rpb24gc3R5bGVDb2xvcihwYWludHMpIHtcclxuICAgIC8vIG11bHRpcGxlIGZpbGxzIChkdXBsaWNhdGUgZnJvbSBmaWxsQ29sb3IudHMpXHJcbiAgICBpZiAoKHBhaW50cyA9PT0gbnVsbCB8fCBwYWludHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaW50cy5sZW5ndGgpID4gMSkge1xyXG4gICAgICAgIHZhciBmaWxsc0FzR3JhZGllbnRzID0gcGFpbnRzXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGZpbGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgwLCBnZXRDb2xvcl8xLmdldENvbG9yKShmaWxsLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHIgIT09IFwiXCI7IH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gc3RyOyB9KVxyXG4gICAgICAgICAgICAucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIik7XHJcbiAgICAgICAgcmV0dXJuIGZpbGxzQXNHcmFkaWVudHM7XHJcbiAgICB9XHJcbiAgICAvLyBzaW5nbGUgZmlsbFxyXG4gICAgcmV0dXJuICgwLCBnZXRDb2xvcl8xLmdldENvbG9yKShwYWludHMgPT09IG51bGwgfHwgcGFpbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludHNbMF0sIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLnN0eWxlQ29sb3IgPSBzdHlsZUNvbG9yO1xyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHN0eWxlQ29sb3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5mdW5jdGlvbiB0ZXh0RGVjb3JhdGlvblByb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnRleHREZWNvcmF0aW9uKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIGRlY29NYXAgPSB7XHJcbiAgICAgICAgU1RSSUtFVEhST1VHSDogXCJsaW5lLXRocm91Z2hcIixcclxuICAgICAgICBVTkRFUkxJTkU6IFwidW5kZXJsaW5lXCJcclxuICAgIH07XHJcbiAgICByZXR1cm4gZGVjb01hcFtub2RlLnRleHREZWNvcmF0aW9uXVxyXG4gICAgICAgID8gXCJ0ZXh0LWRlY29yYXRpb246IFwiLmNvbmNhdChkZWNvTWFwW25vZGUudGV4dERlY29yYXRpb25dLCBcIjtcIilcclxuICAgICAgICA6IFwiXCI7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB0ZXh0RGVjb3JhdGlvblByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5mdW5jdGlvbiB0ZXh0VHJhbnNmb3JtUHJvcChub2RlKSB7XHJcbiAgICB2YXIgY2FzZU1hcCA9IHtcclxuICAgICAgICBVUFBFUjogXCJ1cHBlcmNhc2VcIixcclxuICAgICAgICBMT1dFUjogXCJsb3dlcmNhc2VcIlxyXG4gICAgfTtcclxuICAgIHJldHVybiBjYXNlTWFwW25vZGUudGV4dENhc2VdXHJcbiAgICAgICAgPyBcInRleHQtdHJhbnNmb3JtOiBcIi5jb25jYXQoY2FzZU1hcFtub2RlLnRleHRDYXNlXSwgXCI7XCIpXHJcbiAgICAgICAgOiBcIlwiO1xyXG59XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdGV4dFRyYW5zZm9ybVByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVByb3BzKG5vZGUpIHtcclxuICAgIHZhciBpc1NWRyA9ICgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSk7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkdST1VQXCIgJiYgIWlzU1ZHKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICB2YXIgdHJhbnNmb3JtcyA9ICgwLCBoZWxwZXJzXzEuZ2V0VHJhbnNmb3Jtcykobm9kZS5yZWxhdGl2ZVRyYW5zZm9ybSk7XHJcbiAgICB2YXIgYWJzb2x1dGVUcmFuc2Zvcm1zID0gKDAsIGhlbHBlcnNfMS5nZXRUcmFuc2Zvcm1zKShub2RlLmFic29sdXRlVHJhbnNmb3JtKTtcclxuICAgIGlmICh0cmFuc2Zvcm1zLmFuZ2xlID09PSAwICYmXHJcbiAgICAgICAgdHJhbnNmb3Jtcy5zY2FsZVggPT09IDEgJiZcclxuICAgICAgICB0cmFuc2Zvcm1zLnNjYWxlWSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogY2hlY2sgaWYgaXQgaXMgcmVuZGVyZWQgaW5zaWRlIGFuIGF1dG9sYXlvdXQgJiBmaXggdHJhbnNmb3JtIG9yaWdpbi4uLlxyXG4gICAgaWYgKGlzU1ZHKSB7XHJcbiAgICAgICAgaWYgKCFub2RlLmFic29sdXRlUmVuZGVyQm91bmRzKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZShcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoKGFic29sdXRlVHJhbnNmb3Jtcy50cmFuc2xhdGVYIC0gbm9kZS5hYnNvbHV0ZVJlbmRlckJvdW5kcy54KSAqIC0xKSwgXCJweCwgXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKSgoYWJzb2x1dGVUcmFuc2Zvcm1zLnRyYW5zbGF0ZVkgLSBub2RlLmFic29sdXRlUmVuZGVyQm91bmRzLnkpICogLTEpLCBcInB4KTtcXG4gICAgXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHRyYW5zZm9ybXMuYW5nbGUgKiAtMSwgMyksIFwiZGVnKSBzY2FsZShcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHRyYW5zZm9ybXMuc2NhbGVYLCAzKSwgXCIsIFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikodHJhbnNmb3Jtcy5zY2FsZVksIDMpLCBcIik7XFxuICBcIik7XHJcbn1cclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB0cmFuc2Zvcm1Qcm9wcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZXJhc2VEdXBsaWNhdGVDU1MgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICB2YXIgbW9kQXJyID0gbW9kaWZpZXJDU1Muc3BsaXQoXCI7XCIpLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbC50cmltKCk7IH0pO1xyXG4gICAgdmFyIGJhc2VBcnIgPSBiYXNlQ1NTLnNwbGl0KFwiO1wiKS5tYXAoZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwudHJpbSgpOyB9KTtcclxuICAgIC8vIGRldGVjdCBjc3MgbGluZXMgaW5jbHVkZWQgaW4gYmFzZSBidXQgbm90IGluIG1vZGlmaWVyIGFuZCB1bnNldCB0aGUgdmFsdWVcclxuICAgIHZhciBjc3NQcm9wc1RvQmVVbnNldCA9IGJhc2VBcnJcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChsKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBsLnNwbGl0KFwiOlwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgfSlcclxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuICFtb2RpZmllckNTUy5pbmNsdWRlcyhcIlwiLmNvbmNhdChwcm9wLCBcIjpcIikpO1xyXG4gICAgfSlcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChwcm9wKSB7IHJldHVybiBwcm9wICsgXCI6IHVuc2V0XCI7IH0pO1xyXG4gICAgcmV0dXJuIG1vZEFyclxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGxpbmUpIHtcclxuICAgICAgICByZXR1cm4gIWJhc2VBcnIuaW5jbHVkZXMobGluZSk7XHJcbiAgICB9KVxyXG4gICAgICAgIC5jb25jYXQoY3NzUHJvcHNUb0JlVW5zZXQpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbCArIFwiO1wiOyB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbmV4cG9ydHMuZXJhc2VEdXBsaWNhdGVDU1MgPSBlcmFzZUR1cGxpY2F0ZUNTUztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZ2V0U3R5bGVzID0gdm9pZCAwO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcclxudmFyIGNzc1Byb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2Nzc1Byb3BlcnRpZXNcIik7XHJcbnZhciBzdHlsZUNvbG9yXzEgPSByZXF1aXJlKFwiLi9jc3NQcm9wZXJ0aWVzL3N0eWxlQ29sb3JcIik7XHJcbmZ1bmN0aW9uIGdldFN0eWxlcyhmaWdtYSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIHZhciBwYWludFN0eWxlcyA9IChfYSA9IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHBhaW50cyA9IF9hLnBhaW50cztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKShuYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6ICgwLCBzdHlsZUNvbG9yXzFbXCJkZWZhdWx0XCJdKShwYWludHMpXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHRleHRTdHlsZXMgPSAoX2IgPSBmaWdtYS5nZXRMb2NhbFRleHRTdHlsZXMoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIHZhciBfYyA9ICgwLCBjc3NQcm9wZXJ0aWVzXzEuZm9udFN0eWxlQXNPYmplY3QpKHN0eWxlLmZvbnROYW1lKSwgd2VpZ2h0ID0gX2Mud2VpZ2h0LCBpc0l0YWxpYyA9IF9jLmlzSXRhbGljO1xyXG4gICAgICAgIHZhciBmb250U2l6ZSA9IChfYSA9IHN0eWxlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKTtcclxuICAgICAgICB2YXIgZm9udEZhbWlseSA9IChfYiA9IHN0eWxlLmZvbnROYW1lLmZhbWlseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIGxpbmVIZWlnaHRTdHIgPSAoMCwgY3NzUHJvcGVydGllc18xLmxpbmVIZWlnaHQpKHN0eWxlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKShzdHlsZS5uYW1lKSxcclxuICAgICAgICAgICAgdmFsdWU6ICgwLCBjc3NQcm9wZXJ0aWVzXzEuZm9udFNob3J0aGFuZCkoe1xyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogbGluZUhlaWdodFN0cixcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodDogd2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIGlzSXRhbGljOiBpc0l0YWxpY1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIC8qIFRPRE86IGVmZmVjdFN0eWxlcyAqL1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYWludFN0eWxlczogcGFpbnRTdHlsZXMsXHJcbiAgICAgICAgdGV4dFN0eWxlczogdGV4dFN0eWxlc1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmdldFN0eWxlcyA9IGdldFN0eWxlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5nZXRUZXh0U2VnbWVudHMgPSB2b2lkIDA7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzXCIpO1xyXG52YXIgdGV4dFNlZ21lbnRDU1NfMSA9IHJlcXVpcmUoXCIuL3RleHRTZWdtZW50Q1NTXCIpO1xyXG5mdW5jdGlvbiBnZXRUZXh0U2VnbWVudHMobm9kZSwgY29tcG9uZW50TmFtZSwgdW5pcXVlTmFtZSkge1xyXG4gICAgdmFyIHNlZ21lbnRzID0gbm9kZS5nZXRTdHlsZWRUZXh0U2VnbWVudHMoW1xyXG4gICAgICAgIFwiZm9udFNpemVcIixcclxuICAgICAgICBcImZvbnROYW1lXCIsXHJcbiAgICAgICAgXCJ0ZXh0RGVjb3JhdGlvblwiLFxyXG4gICAgICAgIFwidGV4dENhc2VcIixcclxuICAgICAgICBcImxpbmVIZWlnaHRcIixcclxuICAgICAgICBcImxldHRlclNwYWNpbmdcIixcclxuICAgICAgICBcImZpbGxzXCIsXHJcbiAgICAgICAgXCJ0ZXh0U3R5bGVJZFwiLFxyXG4gICAgICAgIFwiZmlsbFN0eWxlSWRcIixcclxuICAgICAgICBcImxpc3RPcHRpb25zXCIsXHJcbiAgICAgICAgXCJpbmRlbnRhdGlvblwiLFxyXG4gICAgXSk7XHJcbiAgICByZXR1cm4gc2VnbWVudHMubWFwKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBzKSwgeyBuYW1lOiBcIlwiLmNvbmNhdCh1bmlxdWVOYW1lKCgwLCBoZWxwZXJzXzEubWFrZVNhZmVGb3JDU1MpKGNvbXBvbmVudE5hbWUgKyBcIi1zcGFuXCIpKS5uYW1lKSwgY3NzOiAoMCwgdGV4dFNlZ21lbnRDU1NfMS50ZXh0U2VnbWVudENTUykocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmdldFRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMuZ2V0VHJlZUVsZW1lbnRCeU5hbWUgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGdldFRyZWVFbGVtZW50QnlOYW1lKHRyZWUsIG5hbWUpIHtcclxuICAgIGZ1bmN0aW9uIHNlYXJjaFRyZWUoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgICAgIGlmIChlbGVtZW50Lm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuY2hpbGRyZW4gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IHJlc3VsdCA9PSBudWxsICYmIGkgPCBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzZWFyY2hUcmVlKGVsZW1lbnQuY2hpbGRyZW5baV0sIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYXJjaFRyZWUodHJlZSwgbmFtZSk7XHJcbn1cclxuZXhwb3J0cy5nZXRUcmVlRWxlbWVudEJ5TmFtZSA9IGdldFRyZWVFbGVtZW50QnlOYW1lO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5nZXRUcmVlRWxlbWVudEJ5UHJvcGVydHkgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGdldFRyZWVFbGVtZW50QnlQcm9wZXJ0eSh0cmVlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIGZ1bmN0aW9uIHNlYXJjaFRyZWUoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnRbcHJvcGVydHldID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5jaGlsZHJlbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgcmVzdWx0ID09IG51bGwgJiYgaSA8IGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNlYXJjaFRyZWUoZWxlbWVudC5jaGlsZHJlbltpXSwgcHJvcGVydHksIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIHByb3BlcnR5LCB2YWx1ZSk7XHJcbn1cclxuZXhwb3J0cy5nZXRUcmVlRWxlbWVudEJ5UHJvcGVydHkgPSBnZXRUcmVlRWxlbWVudEJ5UHJvcGVydHk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLmdldFRyYW5zZm9ybXMgPSBleHBvcnRzLndpbGxCZVJlbmRlcmVkQXNTVkcgPSBleHBvcnRzLmFsbENoaWxkcmVuQXJlVmVjdG9yID0gZXhwb3J0cy5jbGVhbk51bWJlciA9IGV4cG9ydHMuY2xlYW5TdHlsZU5hbWUgPSBleHBvcnRzLm1ha2VTYWZlRm9yQ1NTID0gZXhwb3J0cy5lc2NhcGVIdG1sID0gZXhwb3J0cy5jb2xvckFzSGV4T3JSZ2JhID0gZXhwb3J0cy5yZ2JhQ29sb3IgPSBleHBvcnRzLnJnYlRvSGV4ID0gZXhwb3J0cy5jb21wb25lbnRUbzI1NSA9IGV4cG9ydHMuY29tcG9uZW50VG9IZXggPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcclxuICAgIHZhciBoZXggPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcclxufVxyXG5leHBvcnRzLmNvbXBvbmVudFRvSGV4ID0gY29tcG9uZW50VG9IZXg7XHJcbmZ1bmN0aW9uIGNvbXBvbmVudFRvMjU1KGMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGMgKiAyNTUpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9uZW50VG8yNTUgPSBjb21wb25lbnRUbzI1NTtcclxuZnVuY3Rpb24gcmdiVG9IZXgocmdiKSB7XHJcbiAgICBpZiAodHlwZW9mIHJnYiAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB2YXIgciA9IHJnYi5yLCBnID0gcmdiLmcsIGIgPSByZ2IuYiwgYSA9IHJnYi5hO1xyXG4gICAgaWYgKCFhKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmdiVG9IZXggPSByZ2JUb0hleDtcclxuZnVuY3Rpb24gcmdiYUNvbG9yKG9iaiwgYSkge1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicmdiIGNvbG9yIG11c3QgYmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciByID0gb2JqLnIsIGcgPSBvYmouZywgYiA9IG9iai5iO1xyXG4gICAgcmV0dXJuIFwicmdiYShcIi5jb25jYXQoY29tcG9uZW50VG8yNTUociksIFwiLCBcIikuY29uY2F0KGNvbXBvbmVudFRvMjU1KGcpLCBcIiwgXCIpLmNvbmNhdChjb21wb25lbnRUbzI1NShiKSwgXCIsIFwiKS5jb25jYXQoYS50b0ZpeGVkKDIpLCBcIilcIik7XHJcbn1cclxuZXhwb3J0cy5yZ2JhQ29sb3IgPSByZ2JhQ29sb3I7XHJcbmZ1bmN0aW9uIGNvbG9yQXNIZXhPclJnYmEoZmlsbCkge1xyXG4gICAgaWYgKCFmaWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImNvbG9yQXNIZXhPclJnYmEgd2FzIGNhbGxlZCB3aXRob3V0IGZpbGwgb2JqZWN0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWxsLm9wYWNpdHkgJiYgZmlsbC5vcGFjaXR5IDwgMSkge1xyXG4gICAgICAgIHJldHVybiByZ2JhQ29sb3IoZmlsbC5jb2xvciwgZmlsbC5vcGFjaXR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZ2JUb0hleChmaWxsLmNvbG9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmNvbG9yQXNIZXhPclJnYmEgPSBjb2xvckFzSGV4T3JSZ2JhO1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xyXG4gICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcclxufVxyXG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xyXG5mdW5jdGlvbiBtYWtlU2FmZUZvckNTUyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZVxyXG4gICAgICAgIC5yZXBsYWNlKC9eWzAtOV0vZywgZnVuY3Rpb24gKHMpIHsgcmV0dXJuIFwiX1wiICsgczsgfSlcclxuICAgICAgICAucmVwbGFjZSgvW15hLXowLTlfLV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5tYWtlU2FmZUZvckNTUyA9IG1ha2VTYWZlRm9yQ1NTO1xyXG5mdW5jdGlvbiBjbGVhblN0eWxlTmFtZShuYW1lKSB7XHJcbiAgICAvL2NvbnN0IG5hbWVBcnIgPSBuYW1lLnNwbGl0KFwiL1wiKTtcclxuICAgIC8vcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWVBcnJbbmFtZUFyci5sZW5ndGggLSAxXS50cmltKCkpO1xyXG4gICAgaWYgKCFuYW1lKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcclxufVxyXG5leHBvcnRzLmNsZWFuU3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWU7XHJcbmZ1bmN0aW9uIGNsZWFuTnVtYmVyKG4sIHRvRml4ZWQpIHtcclxuICAgIGlmICh0b0ZpeGVkID09PSB2b2lkIDApIHsgdG9GaXhlZCA9IDI7IH1cclxuICAgIGlmICghbilcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KE51bWJlcihuKS50b0ZpeGVkKHRvRml4ZWQpKTtcclxufVxyXG5leHBvcnRzLmNsZWFuTnVtYmVyID0gY2xlYW5OdW1iZXI7XHJcbmZ1bmN0aW9uIGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgdmFyIHZlY3RvclR5cGVzID0gW1wiVkVDVE9SXCIsIFwiQk9PTEVBTl9PUEVSQVRJT05cIiwgXCJTVEFSXCJdO1xyXG4gICAgcmV0dXJuICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwICYmXHJcbiAgICAgICAgKChfYiA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIHZlY3RvclR5cGVzLmluY2x1ZGVzKG4udHlwZSk7IH0pLmxlbmd0aCkgPT09XHJcbiAgICAgICAgICAgICgoX2MgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSk7XHJcbn1cclxuZXhwb3J0cy5hbGxDaGlsZHJlbkFyZVZlY3RvciA9IGFsbENoaWxkcmVuQXJlVmVjdG9yO1xyXG5mdW5jdGlvbiB3aWxsQmVSZW5kZXJlZEFzU1ZHKG5vZGVPclRyZWVFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gKGFsbENoaWxkcmVuQXJlVmVjdG9yKG5vZGVPclRyZWVFbGVtZW50KSB8fFxyXG4gICAgICAgIG5vZGVPclRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICBub2RlT3JUcmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICBub2RlT3JUcmVlRWxlbWVudC50eXBlID09PSBcIlNUQVJcIik7XHJcbn1cclxuZXhwb3J0cy53aWxsQmVSZW5kZXJlZEFzU1ZHID0gd2lsbEJlUmVuZGVyZWRBc1NWRztcclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIHZhciBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgdmFyIG1hdHJpeCA9IHtcclxuICAgICAgICBhOiBtWzBdLFxyXG4gICAgICAgIGI6IG1bMV0sXHJcbiAgICAgICAgYzogbVsyXSxcclxuICAgICAgICBkOiBtWzNdLFxyXG4gICAgICAgIGU6IG1bNF0sXHJcbiAgICAgICAgZjogbVs1XVxyXG4gICAgfTtcclxuICAgIHZhciB0cmFuc2Zvcm1zID0gZGVjb21wb3NlTWF0cml4MkRXMyhtYXRyaXgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhbmdsZTogdHJhbnNmb3Jtcy5yb3RhdGVaLFxyXG4gICAgICAgIHNjYWxlWDogdHJhbnNmb3Jtcy5zY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiB0cmFuc2Zvcm1zLnNjYWxlWSxcclxuICAgICAgICB0cmFuc2xhdGVYOiBtWzRdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG1bNV0sXHJcbiAgICAgICAgc3ZnTWF0cml4OiBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIHN2Z01hdHJpeFdpdGhvdXRUcmFuc2xhdGU6IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXV0uam9pbihcIiBcIilcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5nZXRUcmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcztcclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdXHJcbiAgICB9O1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLm5vZGVDU1MgPSB2b2lkIDA7XHJcbnZhciBjc3NQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9jc3NQcm9wZXJ0aWVzXCIpO1xyXG52YXIgYmFja2Ryb3BGaWx0ZXJQcm9wXzEgPSByZXF1aXJlKFwiLi9jc3NQcm9wZXJ0aWVzL2JhY2tkcm9wRmlsdGVyUHJvcFwiKTtcclxudmFyIGZpbHRlclByb3BfMSA9IHJlcXVpcmUoXCIuL2Nzc1Byb3BlcnRpZXMvZmlsdGVyUHJvcFwiKTtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2coXCJub2RlXCIsIG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICBcIi5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5tYXJnaW5Qcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuY29sb3JQcm9wKShub2RlKSwgXCJcXG4gICAgICB0ZXh0LWFsaWduOiBcIikuY29uY2F0KChfYiA9IG5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5mb250UHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLnRleHRUcmFuc2Zvcm1Qcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEudGV4dERlY29yYXRpb25Qcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEub3BhY2l0eVByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5wb3NpdGlvblByb3BzKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZGlzcGxheVByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5kaW1lbnNpb25zKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEudHJhbnNmb3JtUHJvcHMpKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGZpbHRlclByb3BfMVtcImRlZmF1bHRcIl0pKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5mbGV4UHJvcHNGb3JUZXh0KShub2RlKSwgXCJcXG4gICAgXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgXCIuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEubWFyZ2luUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLmJhY2tncm91bmRQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuYm9yZGVyUmFkaXVzUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLmJvcmRlclByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5vcGFjaXR5UHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLnBhZGRpbmdQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZGlzcGxheVByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5kaW1lbnNpb25zKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEucG9zaXRpb25Qcm9wcykobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLmJveFNoYWRvd1Byb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50cmFuc2Zvcm1Qcm9wcykobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLm92ZXJmbG93UHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgZmlsdGVyUHJvcF8xW1wiZGVmYXVsdFwiXSkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgYmFja2Ryb3BGaWx0ZXJQcm9wXzFbXCJkZWZhdWx0XCJdKShub2RlKSwgXCJcXG4gICAgXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubm9kZUNTUyA9IG5vZGVDU1M7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLnByaW50Q1NTID0gdm9pZCAwO1xyXG52YXIgZ2V0VHJlZUVsZW1lbnRCeU5hbWVfMSA9IHJlcXVpcmUoXCIuL2dldFRyZWVFbGVtZW50QnlOYW1lXCIpO1xyXG52YXIgZXJhc2VEdXBsaWNhdGVDU1NfMSA9IHJlcXVpcmUoXCIuL2VyYXNlRHVwbGljYXRlQ1NTXCIpO1xyXG5mdW5jdGlvbiBwcmludENTUyh0cmVlKSB7XHJcbiAgICB2YXIgY3NzID0gXCJcIjtcclxuICAgIC8vIG1pbmkgY3NzIHJlc2V0XHJcbiAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHRyZWUubmFtZSwgXCIsIC5cIikuY29uY2F0KHRyZWUubmFtZSwgXCIgKiB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cIik7XHJcbiAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHRyZWUubmFtZSwgXCIge1wiKS5jb25jYXQodHJlZS5jc3MsIFwifVxcblwiKTtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCBpc1ZhcmlhbnQpIHtcclxuICAgICAgICBpZiAoaXNWYXJpYW50ID09PSB2b2lkIDApIHsgaXNWYXJpYW50ID0gZmFsc2U7IH1cclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50Q1NTID0gdHJlZUVsZW1lbnQuY3NzO1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoaXNWYXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNTUyA9IChfYSA9ICgwLCBnZXRUcmVlRWxlbWVudEJ5TmFtZV8xLmdldFRyZWVFbGVtZW50QnlOYW1lKSh0cmVlLCB0cmVlRWxlbWVudC5uYW1lKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNzcztcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5uYW1lID09PSB0cmVlRWxlbWVudC5uYW1lID8gXCJcIiA6IFwiLlwiICsgdHJlZUVsZW1lbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ1NTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudENTUyA9ICgwLCBlcmFzZUR1cGxpY2F0ZUNTU18xLmVyYXNlRHVwbGljYXRlQ1NTKSh0cmVlRWxlbWVudC5jc3MsIGJhc2VDU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q1NTICE9PSBcIlwiICYmICF0cmVlRWxlbWVudC5za2lwQ3NzKSB7XHJcbiAgICAgICAgICAgICAgICBjc3MgKz0gXCJcIi5jb25jYXQodHJlZUVsZW1lbnQuYmFzZVNlbGVjdG9yIHx8IFwiXCIsIFwiIFwiKS5jb25jYXQoY2xhc3NOYW1lLCBcIiB7XCIpLmNvbmNhdChlbGVtZW50Q1NTLCBcIn1cXG5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgcmVuZGVyZWQgYXMgc3ZnIHRoZXJlIGFyZSBubyBzdHlsZXMgbmVjZXNzYXJ5IGZvciBjaGlsZHJlblxyXG4gICAgICAgICAgICBpZiAodHJlZUVsZW1lbnQud2lsbEJlUmVuZGVyZWRBc1NWRykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHMubmFtZSwgXCIge1wiKS5jb25jYXQocy5jc3MsIFwifVxcblwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbiwgaXNWYXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyZWUudGV4dFNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0cmVlLnRleHRTZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIGNzcyArPSBcIi5cIi5jb25jYXQocy5uYW1lLCBcIiB7XCIpLmNvbmNhdChzLmNzcywgXCJ9XFxuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLndpbGxCZVJlbmRlcmVkQXNTVkcpIHtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGlmICh0cmVlLnZhcmlhbnRzKSB7XHJcbiAgICAgICAgY3NzICs9IFwiXFxuLyogdmFyaWFudCBzdHlsZXMgKi9cXG5cIjtcclxuICAgICAgICB0aGVDaGlsZHJlbih0cmVlLnZhcmlhbnRzLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjc3M7XHJcbn1cclxuZXhwb3J0cy5wcmludENTUyA9IHByaW50Q1NTO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbmV4cG9ydHMucHJpbnRIVE1MID0gdm9pZCAwO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcclxudmFyIGNyZWF0ZVNWR18xID0gcmVxdWlyZShcIi4vY3JlYXRlU1ZHXCIpO1xyXG52YXIgcHJpbnRUZXh0U2VnbWVudHNfMSA9IHJlcXVpcmUoXCIuL3ByaW50VGV4dFNlZ21lbnRzXCIpO1xyXG5mdW5jdGlvbiBwcmludEhUTUwodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykodHJlZUVsZW1lbnQpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgKDAsIGNyZWF0ZVNWR18xLmNyZWF0ZVNWRykodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCB0cmVlRWxlbWVudC5uYW1lKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Muc2VudCgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gKF9hID0gXCI8ZGl2IGNsYXNzPVxcXCJcIi5jb25jYXQodHJlZUVsZW1lbnQubmFtZSwgXCJcXFwiPlxcblwiKS5jb25jYXQodHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICgwLCBwcmludFRleHRTZWdtZW50c18xLnByaW50VGV4dFNlZ21lbnRzKSh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsIFwiIFwiKSkuY29uY2F0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLmFwcGx5KF9hLCBbX2Muc2VudCgpLCBcIlxcbjwvZGl2PlwiXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFsbC5qb2luKFwiXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaHRtbCwgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykodHJlZSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sICgwLCBjcmVhdGVTVkdfMS5jcmVhdGVTVkcpKHRyZWUub3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gX2Quc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gaHRtbDtcclxuICAgICAgICAgICAgICAgICAgICBfYyA9IChfYiA9IFwiPGRpdiBjbGFzcz1cXFwiXCIuY29uY2F0KHRyZWUubmFtZSwgXCJcXFwiPlxcblwiKS5jb25jYXQodHJlZS50ZXh0U2VnbWVudHMgPyAoMCwgcHJpbnRUZXh0U2VnbWVudHNfMS5wcmludFRleHRTZWdtZW50cykodHJlZS50ZXh0U2VnbWVudHMpIDogXCJcIiwgXCIgXCIpKS5jb25jYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfYSArIF9jLmFwcGx5KF9iLCBbX2Quc2VudCgpLCBcIlxcbjwvZGl2PlwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgaHRtbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucHJpbnRIVE1MID0gcHJpbnRIVE1MO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5wcmludFRleHRTZWdtZW50cyA9IHZvaWQgMDtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XHJcbmZ1bmN0aW9uIHByaW50VGV4dFNlZ21lbnRzKHNlZ21lbnRzKSB7XHJcbiAgICBpZiAoKHNlZ21lbnRzID09PSBudWxsIHx8IHNlZ21lbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWdtZW50cy5sZW5ndGgpID09PSAwKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vIGRvIG5vdCB3cmFwIGluIHNwYW5cclxuICAgICAgICByZXR1cm4gKDAsIGhlbHBlcnNfMS5lc2NhcGVIdG1sKShzZWdtZW50c1swXS5jaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcblwiKSAvLyBtYWtlcyBhbm5veWluZyBMLVNFUCBMaW5lYnJlYWtzIGRpc2FwcGVhclxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFwiPHNwYW4+XCIgK1xyXG4gICAgICAgIHNlZ21lbnRzXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gY2xhc3M9XFxcIlwiLmNvbmNhdChzLm5hbWUsIFwiXFxcIj5cIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuZXNjYXBlSHRtbCkocy5jaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXG5cIikgLy8gbWFrZXMgYW5ub3lpbmcgTC1TRVAgTGluZWJyZWFrcyBkaXNhcHBlYXJcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKSwgXCI8L3NwYW4+XCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKFwiXCIpICtcclxuICAgICAgICBcIjwvc3Bhbj5cIik7XHJcbn1cclxuZXhwb3J0cy5wcmludFRleHRTZWdtZW50cyA9IHByaW50VGV4dFNlZ21lbnRzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLypcclxuVGhpcyBmaWxlIHRyaWVzIHRvIGNvbnZlcnQgZmlnbWEgaW50byB0YWlsd2luZC5cclxuSXQgdHJpZXMgdG8gaW50ZXJwcmV0IHRoZSBjc3MgYWxyZWFkeSBnZW5lcmF0ZWQgZnJvbSB0aGlzIHBsdWdpbiBhcyB0YWlsd2luZCBjbGFzc2VzLlxyXG5UaGlzIHdpbGwgbmV2ZXIgd29yayBwZXJmZWN0bHkgYnV0IG1heSBwcm92aWRlIGEgc3RhcnRpbmcgcG9pbnQgZm9yIGRldmVsb3BtZW50LlxyXG4qL1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy50YWlsd2luZCA9IHZvaWQgMDtcclxudmFyIGNyZWF0ZVNWR18xID0gcmVxdWlyZShcIi4vY3JlYXRlU1ZHXCIpO1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcclxudmFyIHNpemVzTWFwID0ge1xyXG4gICAgXCIwcHhcIjogMCxcclxuICAgIFwiMXB4XCI6IFwicHhcIixcclxuICAgIFwiMnB4XCI6IDAuNSxcclxuICAgIFwiNHB4XCI6IDEsXHJcbiAgICBcIjZweFwiOiAxLjUsXHJcbiAgICBcIjhweFwiOiAyLFxyXG4gICAgXCIxMHB4XCI6IDIuNSxcclxuICAgIFwiMTJweFwiOiAzLFxyXG4gICAgXCIxNHB4XCI6IDMuNSxcclxuICAgIFwiMTZweFwiOiA0LFxyXG4gICAgXCIyMHB4XCI6IDUsXHJcbiAgICBcIjI0cHhcIjogNixcclxuICAgIFwiMjhweFwiOiA3LFxyXG4gICAgXCIzMnB4XCI6IDgsXHJcbiAgICBcIjM2cHhcIjogOSxcclxuICAgIFwiNDBweFwiOiAxMCxcclxuICAgIFwiNDRweFwiOiAxMSxcclxuICAgIFwiNDhweFwiOiAxMixcclxuICAgIFwiNTZweFwiOiAxNCxcclxuICAgIFwiNjRweFwiOiAxNixcclxuICAgIFwiODBweFwiOiAyMCxcclxuICAgIFwiOTZweFwiOiAyNCxcclxuICAgIFwiMTEycHhcIjogMjgsXHJcbiAgICBcIjEyOHB4XCI6IDMyLFxyXG4gICAgXCIxNDRweFwiOiAzNixcclxuICAgIFwiMTYwcHhcIjogNDAsXHJcbiAgICBcIjE3NnB4XCI6IDQ0LFxyXG4gICAgXCIxOTJweFwiOiA0OCxcclxuICAgIFwiMjA4cHhcIjogNTIsXHJcbiAgICBcIjIyNHB4XCI6IDU2LFxyXG4gICAgXCIyNDBweFwiOiA2MCxcclxuICAgIFwiMjU2cHhcIjogNjQsXHJcbiAgICBcIjI4OHB4XCI6IDcyLFxyXG4gICAgXCIzMjBweFwiOiA4MCxcclxuICAgIFwiMzg0cHhcIjogOTZcclxufTtcclxudmFyIGZsZXhEaXJlY3Rpb25NYXAgPSB7XHJcbiAgICByb3c6IFwicm93XCIsXHJcbiAgICBjb2x1bW46IFwiY29sXCJcclxufTtcclxudmFyIHR3TWFwID0ge1xyXG4gICAgcGFkZGluZzogc2l6ZXNNYXAsXHJcbiAgICBnYXA6IHNpemVzTWFwLFxyXG4gICAgdG9wOiBzaXplc01hcCxcclxuICAgIGxlZnQ6IHNpemVzTWFwLFxyXG4gICAgcmlnaHQ6IHNpemVzTWFwLFxyXG4gICAgYm90dG9tOiBzaXplc01hcCxcclxuICAgIGhlaWdodDogc2l6ZXNNYXAsXHJcbiAgICB3aWR0aDogc2l6ZXNNYXAsXHJcbiAgICBcImZsZXgtZGlyZWN0aW9uXCI6IGZsZXhEaXJlY3Rpb25NYXAsXHJcbiAgICBcImJvcmRlci1yYWRpdXNcIjoge1xyXG4gICAgICAgIFwiMHB4XCI6IFwibm9uZVwiLFxyXG4gICAgICAgIFwiMnB4XCI6IFwic21cIixcclxuICAgICAgICBcIjRweFwiOiBcIlwiLFxyXG4gICAgICAgIFwiNnB4XCI6IFwibWRcIixcclxuICAgICAgICBcIjhweFwiOiBcImxnXCIsXHJcbiAgICAgICAgXCIxMnB4XCI6IFwieGxcIixcclxuICAgICAgICBcIjE2cHhcIjogXCIyeGxcIixcclxuICAgICAgICBcIjI0cHhcIjogXCIzeGxcIixcclxuICAgICAgICBcIjk5OTlweFwiOiBcImZ1bGxcIlxyXG4gICAgfSxcclxuICAgIGJhY2tncm91bmQ6IHsgdHJhbnNwYXJlbnQ6IFwidHJhbnNwYXJlbnRcIiB9LFxyXG4gICAgXCJqdXN0aWZ5LWNvbnRlbnRcIjoge1xyXG4gICAgICAgIFwiZmxleC1zdGFydFwiOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgXCJmbGV4LWVuZFwiOiBcImVuZFwiLFxyXG4gICAgICAgIFwic3BhY2UtYmV0d2VlblwiOiBcImJldHdlZW5cIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCJcclxuICAgIH0sXHJcbiAgICBcImFsaWduLWl0ZW1zXCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCJcclxuICAgIH0sXHJcbiAgICBcImFsaWduLXNlbGZcIjoge1xyXG4gICAgICAgIHN0cmV0Y2g6IFwic3RyZXRjaFwiXHJcbiAgICB9LFxyXG4gICAgb3ZlcmZsb3c6IHtcclxuICAgICAgICBoaWRkZW46IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgdmlzaWJsZTogXCJ2aXNpYmxlXCJcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gdGFpbHdpbmQodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykodHJlZUVsZW1lbnQpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgKDAsIGNyZWF0ZVNWR18xLmNyZWF0ZVNWRykodHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhY2t5Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzTmFtZXMsIFwiXFxcIiBzdHlsZT1cXFwiXCIpLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlcykpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYy5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBcIjxkaXYgY2xhc3M9XFxcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZUVsZW1lbnQuY3NzLCB0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmxpbmVTdHlsZXMsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWVFbGVtZW50LmNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJlZUVsZW1lbnQuY2hhcmFjdGVycy5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiPGJyIC8+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsIFwiIFwiKSkuY29uY2F0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLmFwcGx5KF9hLCBbX2Muc2VudCgpLCBcIlxcbjwvZGl2PlwiXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFsbC5qb2luKFwiXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaHRtbCwgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykodHJlZSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sICgwLCBjcmVhdGVTVkdfMS5jcmVhdGVTVkcpKHRyZWUub3JpZ2luYWxOb2RlLCBcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzLCBcIlxcXCIgc3R5bGU9XFxcIlwiKS5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzKSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfZC5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBodG1sO1xyXG4gICAgICAgICAgICAgICAgICAgIF9jID0gKF9iID0gXCI8ZGl2IGNsYXNzPVxcXCJcIi5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlcywgXCJcXFwiPlxcblwiKS5jb25jYXQodHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwiLCBcIiBcIikpLmNvbmNhdDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IF9hICsgX2MuYXBwbHkoX2IsIFtfZC5zZW50KCksIFwiXFxuPC9kaXY+XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCBodG1sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy50YWlsd2luZCA9IHRhaWx3aW5kO1xyXG5mdW5jdGlvbiB0YWlsd2luZENsYXNzTmFtZXMoY3NzLCBub2RlKSB7XHJcbiAgICB2YXIgY3NzTGluZUJ5TGluZSA9IGNzc1xyXG4gICAgICAgIC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudHJpbSgpOyB9KVxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgIT09IFwiXCI7IH0pO1xyXG4gICAgdmFyIGtleVZhbHVlUGFpcnMgPSBjc3NMaW5lQnlMaW5lLm1hcChmdW5jdGlvbiAobGluZSkge1xyXG4gICAgICAgIHZhciBfYSA9IGxpbmUuc3BsaXQoXCI6XCIpLCBrZXkgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtleS50cmltKCksIHZhbHVlOiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudHJpbSgpIH07XHJcbiAgICB9KTtcclxuICAgIHZhciBjc3NQcm9wc01hcCA9IHtcclxuICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCJyb3VuZGVkXCIsXHJcbiAgICAgICAgd2lkdGg6IFwid1wiLFxyXG4gICAgICAgIGhlaWdodDogXCJoXCIsXHJcbiAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwidGV4dFwiLFxyXG4gICAgICAgIFwiZmxleC1kaXJlY3Rpb25cIjogXCJmbGV4XCIsXHJcbiAgICAgICAgcG9zaXRpb246IFwiXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJcIixcclxuICAgICAgICBmbGV4OiBcImZsZXhcIixcclxuICAgICAgICBnYXA6IFwiZ2FwXCIsXHJcbiAgICAgICAgdG9wOiBcInRvcFwiLFxyXG4gICAgICAgIGxlZnQ6IFwibGVmdFwiLFxyXG4gICAgICAgIHJpZ2h0OiBcInJpZ2h0XCIsXHJcbiAgICAgICAgYm90dG9tOiBcImJvdHRvbVwiLFxyXG4gICAgICAgIFwianVzdGlmeS1jb250ZW50XCI6IFwianVzdGlmeVwiLFxyXG4gICAgICAgIFwiYWxpZ24taXRlbXNcIjogXCJpdGVtc1wiLFxyXG4gICAgICAgIFwiYWxpZ24tc2VsZlwiOiBcInNlbGZcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJvdmVyZmxvd1wiXHJcbiAgICB9O1xyXG4gICAgLy8gdGhlc2Ugd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSBub2RlIG9yIGFyZSBub3QgbmVlZGVkIGF0IGFsbFxyXG4gICAgdmFyIGV4Y2x1ZGVMaXN0ID0gW1wicGFkZGluZ1wiLCBcIm1hcmdpblwiLCBcImJveC1zaXppbmdcIl07XHJcbiAgICB2YXIgaW5saW5lU3R5bGVzID0gW107XHJcbiAgICB2YXIgY2xhc3NOYW1lcyA9IGtleVZhbHVlUGFpcnMubWFwKGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYS5rZXksIHZhbHVlID0gX2EudmFsdWU7XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVMaXN0LmluY2x1ZGVzKGtleSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciB0d1ZhbHVlID0gbG9va1VwVGFpbHdpbmRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB2YXIgdHdLZXkgPSBjc3NQcm9wc01hcFtrZXldO1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlubGluZVN0eWxlcy5wdXNoKFwiXCIuY29uY2F0KGtleSwgXCI6IFwiKS5jb25jYXQodmFsdWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3R3S2V5LCB0d1ZhbHVlXS5qb2luKFwiLVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gcGFkZGluZywgZm9udFNpemUgZXRjLlxyXG4gICAgdmFyIGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlID0gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lc1xyXG4gICAgICAgICAgICAuY29uY2F0KGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBudWxsOyB9KVxyXG4gICAgICAgICAgICAuam9pbihcIiBcIiksXHJcbiAgICAgICAgaW5saW5lU3R5bGVzOiBpbmxpbmVTdHlsZXMuam9pbihcIjsgXCIpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGxvb2tVcFRhaWx3aW5kVmFsdWUocHJvcEtleSwgdmFsdWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHZhciB2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZSA9IFtcImRpc3BsYXlcIiwgXCJwb3NpdGlvblwiLCBcInRleHQtYWxpZ25cIiwgXCJmbGV4XCJdO1xyXG4gICAgdmFyIHR3VmFsdWUgPSAoX2EgPSB0d01hcFtwcm9wS2V5XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ZhbHVlXTtcclxuICAgIGlmICh2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZS5pbmNsdWRlcyhwcm9wS2V5KSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyByZXR1cm4gZmFsbGJhY2sgYW5kIHJlbW92ZSB3aGl0ZXNwYWNlIGFzIHRoaXMgaXMgYWRkZWQgZGlyZWN0bHkgdG8gY2xhc3NuYW1lXHJcbiAgICAgICAgcmV0dXJuIFwiW1wiLmNvbmNhdCh2YWx1ZS5yZXBsYWNlKC9cXHMvZywgXCJcIiksIFwiXVwiKTtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHdWYWx1ZTtcclxufVxyXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NOYW1lc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIHZhciBjbGFzc05hbWVzID0gW107XHJcbiAgICAvKiBwYWRkaW5ncyAqL1xyXG4gICAgaWYgKG5vZGUucGFkZGluZ0xlZnQpIHtcclxuICAgICAgICB2YXIgcGFkZGluZ3NfMSA9IFtcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdSaWdodCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nQm90dG9tLFxyXG4gICAgICAgICAgICBub2RlLnBhZGRpbmdMZWZ0LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHBhZGRpbmdzXzEuZXZlcnkoZnVuY3Rpb24gKHApIHsgcmV0dXJuIHAgPT09IHBhZGRpbmdzXzFbMF07IH0pKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChcInAtXCIuY29uY2F0KGxvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHBhZGRpbmdzXzFbMF0gKyBcInB4XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uXzEgPSBbXCJ0XCIsIFwiclwiLCBcImJcIiwgXCJsXCJdO1xyXG4gICAgICAgICAgICBwYWRkaW5nc18xLmZvckVhY2goZnVuY3Rpb24gKHAsIGkpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaChcInBcIi5jb25jYXQoZGlyZWN0aW9uXzFbaV0sIFwiLVwiKS5jb25jYXQobG9va1VwVGFpbHdpbmRWYWx1ZShcInBhZGRpbmdcIiwgcCArIFwicHhcIikpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogcGFkZGluZ3MgZW5kICovXHJcbiAgICByZXR1cm4gY2xhc3NOYW1lcztcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy50ZXh0U2VnbWVudENTUyA9IHZvaWQgMDtcclxudmFyIGNzc1Byb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2Nzc1Byb3BlcnRpZXNcIik7XHJcbmZ1bmN0aW9uIHRleHRTZWdtZW50Q1NTKHRleHRTZWdtZW50KSB7XHJcbiAgICByZXR1cm4gXCJcXG4gICAgICBjb2xvcjogXCIuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZmlsbENvbG9yKSh0ZXh0U2VnbWVudCksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5mb250UHJvcCkodGV4dFNlZ21lbnQpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50ZXh0VHJhbnNmb3JtUHJvcCkodGV4dFNlZ21lbnQpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50ZXh0RGVjb3JhdGlvblByb3ApKHRleHRTZWdtZW50KSwgXCJcXG4gICAgXCIpO1xyXG59XHJcbmV4cG9ydHMudGV4dFNlZ21lbnRDU1MgPSB0ZXh0U2VnbWVudENTUztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=