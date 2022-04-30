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
var cssProperties_1 = __webpack_require__(/*! ./core/cssProperties */ "./src/core/cssProperties/index.ts");
var helpers_1 = __webpack_require__(/*! ./core/helpers */ "./src/core/helpers.ts");
var getStyles_1 = __webpack_require__(/*! ./core/getStyles */ "./src/core/getStyles.ts");
/* Beta */
var tailwind_1 = __webpack_require__(/*! ./core/tailwind */ "./src/core/tailwind.ts");
function nodeCSS(node) {
    var _a, _b;
    console.log("node", node);
    if (((_a = node.type) === null || _a === void 0 ? void 0 : _a.toString()) === "TEXT") {
        return "\n      color: ".concat((0, cssProperties_1.fillColor)(node), ";\n      text-align: ").concat((_b = node.textAlignHorizontal) === null || _b === void 0 ? void 0 : _b.toLowerCase(), ";\n      ").concat((0, cssProperties_1.fontProp)(node), "\n      ").concat((0, cssProperties_1.textTransformProp)(node), "\n      ").concat((0, cssProperties_1.textDecorationProp)(node), "\n      ").concat((0, cssProperties_1.opacity)(node), "\n      ").concat((0, cssProperties_1.position)(node), "\n      ").concat((0, cssProperties_1.displayProp)(node), "\n      ").concat((0, cssProperties_1.dimensions)(node), "\n      margin: 0;\n      ").concat((0, cssProperties_1.transforms)(node), "\n    ");
    }
    else {
        return "\n      box-sizing: border-box;\n      background: ".concat((0, cssProperties_1.fillColor)(node), ";\n      ").concat((0, cssProperties_1.borderRadius)(node), "\n      ").concat((0, cssProperties_1.borderProp)(node), "\n      ").concat((0, cssProperties_1.opacity)(node), "\n      ").concat((0, cssProperties_1.paddingProp)(node), "\n      ").concat((0, cssProperties_1.displayProp)(node), "\n      ").concat((0, cssProperties_1.dimensions)(node), "\n      ").concat((0, cssProperties_1.position)(node), "\n      ").concat((0, cssProperties_1.boxShadow)(node), "\n      margin: 0;\n      ").concat((0, cssProperties_1.transforms)(node), "\n      ").concat((0, cssProperties_1.overflow)(node), "\n    ");
    }
}
function segmentCss(textSegment) {
    return "\n      color: ".concat((0, cssProperties_1.fillColor)(textSegment), ";\n      ").concat((0, cssProperties_1.fontProp)(textSegment), "\n      ").concat((0, cssProperties_1.textTransformProp)(textSegment), "\n      ").concat((0, cssProperties_1.textDecorationProp)(textSegment), "\n    ");
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

/***/ "./src/core/cssProperties/index.ts":
/*!*****************************************!*\
  !*** ./src/core/cssProperties/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.textDecorationProp = exports.textTransformProp = exports.fontProp = exports.fontShorthand = exports.lineHeight = exports.getColor = exports.strokeColor = exports.borderRadius = exports.gradientLinear = exports.transforms = exports.fillColor = exports.fontStyleAsObject = exports.boxShadow = exports.position = exports.opacity = exports.overflow = exports.dimensions = exports.displayProp = exports.paddingProp = exports.borderProp = void 0;
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/core/helpers.ts");
function borderProp(node) {
    var _a, _b;
    if ((0, helpers_1.willBeRenderedAsSVG)(node))
        return "";
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return "";
    if (((_b = (_a = node.strokes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === "GRADIENT_LINEAR") {
        return "\n    border-width: ".concat((0, helpers_1.cleanNumber)(node.strokeWeight), "px; \n    border-style: solid; \n    border-image: ").concat(strokeColor(node), "; \n    border-image-slice: 1;\n    ");
    }
    return "border: ".concat((0, helpers_1.cleanNumber)(node.strokeWeight), "px solid ").concat(strokeColor(node), ";");
}
exports.borderProp = borderProp;
function paddingProp(node) {
    if (!node.paddingTop &&
        !node.paddingRight &&
        !node.paddingBottom &&
        !node.paddingLeft)
        return "";
    return "padding: ".concat((0, helpers_1.cleanNumber)(node.paddingTop), "px ").concat((0, helpers_1.cleanNumber)(node.paddingRight), "px ").concat((0, helpers_1.cleanNumber)(node.paddingBottom), "px ").concat((0, helpers_1.cleanNumber)(node.paddingLeft), "px;");
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
        return "\n      display: flex;\n      flex-direction: ".concat(direction, ";\n      gap: ").concat((0, helpers_1.cleanNumber)(node.itemSpacing), "px;\n      align-items: ").concat(alignmentMap[node.counterAxisAlignItems], ";\n      justify-content: ").concat(alignmentMap[node.primaryAxisAlignItems], ";\n    ");
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
            coord += "right: ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).width - node.width - node.x), "px;");
            break;
        case "STRETCH":
            coord += "right: ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).width - node.width - node.x), "px; left: ").concat(node.x, "px;");
            break;
        case "CENTER":
            coord += "left: calc(50% - ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).width / 2 - node.x), "px);");
            break;
        default:
            coord += "left: ".concat((0, helpers_1.cleanNumber)(node.x), "px;");
    }
    switch ((_b = node.constraints) === null || _b === void 0 ? void 0 : _b.vertical) {
        case "MAX":
            coord += "bottom: ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).height - node.height - node.y), "px;");
            break;
        case "STRETCH":
            coord += "bottom: ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).height - node.height - node.y), "px; top: ").concat(node.y, "px;");
            break;
        case "CENTER":
            coord += "top: calc(50% - ".concat((0, helpers_1.cleanNumber)(findAbsoluteParent(node).height / 2 - node.y), "px);");
            break;
        default:
            coord += "top: ".concat((0, helpers_1.cleanNumber)(node.y), "px;");
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
        return "".concat((0, helpers_1.cleanNumber)(s.offset.x), "px ").concat((0, helpers_1.cleanNumber)(s.offset.y), "px ").concat((0, helpers_1.cleanNumber)(s.radius), "px ").concat((0, helpers_1.cleanNumber)(s.spread), "px ").concat((0, helpers_1.rgbaColor)(s.color, s.color.a));
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
        return "\n      transform: translate(".concat((0, helpers_1.cleanNumber)((absoluteTransforms.translateX - node.absoluteRenderBounds.x) * -1), "px, ").concat((0, helpers_1.cleanNumber)((absoluteTransforms.translateY - node.absoluteRenderBounds.y) * -1), "px);\n    ");
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
        ? (0, helpers_1.cleanNumber)(node.cornerRadius) + "px"
        : "".concat((0, helpers_1.cleanNumber)(node.topLeftRadius), "px ").concat((0, helpers_1.cleanNumber)(node.topRightRadius), "px ").concat((0, helpers_1.cleanNumber)(node.bottomRightRadius), "px ").concat((0, helpers_1.cleanNumber)(node.bottomLeftRadius), "px"), ";");
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
    return "".concat((0, helpers_1.cleanNumber)(nodeOrStyle.lineHeight.value)).concat(unit);
}
exports.lineHeight = lineHeight;
function fontShorthand(_a) {
    var lineHeight = _a.lineHeight, fontSize = _a.fontSize, weight = _a.weight, fontFamily = _a.fontFamily, isItalic = _a.isItalic;
    var italic = isItalic ? "italic " : "";
    return "".concat(weight, " ").concat(italic).concat((0, helpers_1.cleanNumber)(fontSize), "px").concat(lineHeight !== "" ? "/" + lineHeight : "", " '").concat(fontFamily, "'");
}
exports.fontShorthand = fontShorthand;
function fontProp(node) {
    var _a, _b, _c;
    var _d = fontStyleAsObject(node.fontName), weight = _d.weight, isItalic = _d.isItalic;
    var fontSize = Number((_a = node.fontSize) === null || _a === void 0 ? void 0 : _a.toString()); // toString is needed to convert Symbols into string first (i think)
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

/***/ "./src/core/getStyles.ts":
/*!*******************************!*\
  !*** ./src/core/getStyles.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getStyles = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./src/core/helpers.ts");
var cssProperties_1 = __webpack_require__(/*! ./cssProperties */ "./src/core/cssProperties/index.ts");
function getStyles(figma) {
    var _a, _b;
    var paintStyles = (_a = figma.getLocalPaintStyles()) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
        var name = _a.name, paints = _a.paints;
        return {
            name: (0, helpers_1.cleanStyleName)(name),
            value: (0, cssProperties_1.getColor)(paints === null || paints === void 0 ? void 0 : paints[0], false)
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
    return {
        paintStyles: paintStyles,
        textStyles: textStyles
    };
}
exports.getStyles = getStyles;


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
function cleanNumber(n) {
    return parseFloat(n.toFixed(2));
}
exports.cleanNumber = cleanNumber;
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
var code_1 = __webpack_require__(/*! ../code */ "./src/code.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwUUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vLi9zcmMvY29yZS9jc3NQcm9wZXJ0aWVzL2luZGV4LnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvZ2V0U3R5bGVzLnRzIiwid2VicGFjazovL015UGx1Z2luLy4vc3JjL2NvcmUvaGVscGVycy50cyIsIndlYnBhY2s6Ly9NeVBsdWdpbi8uL3NyYy9jb3JlL3RhaWx3aW5kLnRzIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vTXlQbHVnaW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL015UGx1Z2luL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5jcmVhdGVTVkcgPSB2b2lkIDA7XHJcbnZhciBjc3NQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9jb3JlL2Nzc1Byb3BlcnRpZXNcIik7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9jb3JlL2hlbHBlcnNcIik7XHJcbnZhciBnZXRTdHlsZXNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvZ2V0U3R5bGVzXCIpO1xyXG4vKiBCZXRhICovXHJcbnZhciB0YWlsd2luZF8xID0gcmVxdWlyZShcIi4vY29yZS90YWlsd2luZFwiKTtcclxuZnVuY3Rpb24gbm9kZUNTUyhub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc29sZS5sb2coXCJub2RlXCIsIG5vZGUpO1xyXG4gICAgaWYgKCgoX2EgPSBub2RlLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSA9PT0gXCJURVhUXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgICBjb2xvcjogXCIuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZmlsbENvbG9yKShub2RlKSwgXCI7XFxuICAgICAgdGV4dC1hbGlnbjogXCIpLmNvbmNhdCgoX2IgPSBub2RlLnRleHRBbGlnbkhvcml6b250YWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpLCBcIjtcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZm9udFByb3ApKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50ZXh0VHJhbnNmb3JtUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLnRleHREZWNvcmF0aW9uUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLm9wYWNpdHkpKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5wb3NpdGlvbikobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLmRpc3BsYXlQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZGltZW5zaW9ucykobm9kZSksIFwiXFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50cmFuc2Zvcm1zKShub2RlKSwgXCJcXG4gICAgXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICBiYWNrZ3JvdW5kOiBcIi5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5maWxsQ29sb3IpKG5vZGUpLCBcIjtcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuYm9yZGVyUmFkaXVzKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuYm9yZGVyUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLm9wYWNpdHkpKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5wYWRkaW5nUHJvcCkobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLmRpc3BsYXlQcm9wKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZGltZW5zaW9ucykobm9kZSksIFwiXFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLnBvc2l0aW9uKShub2RlKSwgXCJcXG4gICAgICBcIikuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuYm94U2hhZG93KShub2RlKSwgXCJcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgXCIpLmNvbmNhdCgoMCwgY3NzUHJvcGVydGllc18xLnRyYW5zZm9ybXMpKG5vZGUpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5vdmVyZmxvdykobm9kZSksIFwiXFxuICAgIFwiKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZWdtZW50Q3NzKHRleHRTZWdtZW50KSB7XHJcbiAgICByZXR1cm4gXCJcXG4gICAgICBjb2xvcjogXCIuY29uY2F0KCgwLCBjc3NQcm9wZXJ0aWVzXzEuZmlsbENvbG9yKSh0ZXh0U2VnbWVudCksIFwiO1xcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS5mb250UHJvcCkodGV4dFNlZ21lbnQpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50ZXh0VHJhbnNmb3JtUHJvcCkodGV4dFNlZ21lbnQpLCBcIlxcbiAgICAgIFwiKS5jb25jYXQoKDAsIGNzc1Byb3BlcnRpZXNfMS50ZXh0RGVjb3JhdGlvblByb3ApKHRleHRTZWdtZW50KSwgXCJcXG4gICAgXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWUoc2VsZWN0aW9uKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IFwiY29tcG9uZW50XCI7XHJcbiAgICAvLyBPbmx5IHRvIHByZXZlbnQgZHVwbGljYXRlIE5hbWVzXHJcbiAgICB2YXIgYWxsTmFtZXMgPSBbXTtcclxuICAgIGZ1bmN0aW9uIHVuaXF1ZU5hbWUoY2xhc3NOYW1lLCBuKSB7XHJcbiAgICAgICAgaWYgKG4gPT09IHZvaWQgMCkgeyBuID0gMTsgfVxyXG4gICAgICAgIHZhciBzdWZmaXggPSBuID4gMSA/IG4gOiBcIlwiO1xyXG4gICAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhjbGFzc05hbWUgKyBzdWZmaXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVOYW1lKGNsYXNzTmFtZSwgbiArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxsTmFtZXMucHVzaChjbGFzc05hbWUgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgc3VmZml4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTm90aGluZyBzZWxlY3RlZFwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBvbmx5IDEgTm9kZVwiLCB7IGVycm9yOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBzZWxlY3Rpb25Ob2RlID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgdmFyIGlzQ29tcG9uZW50U2V0ID0gc2VsZWN0aW9uTm9kZS50eXBlID09PSBcIkNPTVBPTkVOVF9TRVRcIjtcclxuICAgIHZhciBvcmlnaW5hbE5vZGUgPSBpc0NvbXBvbmVudFNldFxyXG4gICAgICAgID8gc2VsZWN0aW9uTm9kZS5kZWZhdWx0VmFyaWFudFxyXG4gICAgICAgIDogc2VsZWN0aW9uTm9kZTtcclxuICAgIGNvbXBvbmVudE5hbWUgPSAoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShzZWxlY3Rpb25Ob2RlLm5hbWUpO1xyXG4gICAgdmFyIHRyZWUgPSB7XHJcbiAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICBjc3M6IG5vZGVDU1Mob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBhbGxDaGlsZHJlbkFyZVZlY3RvcjogKDAsIGhlbHBlcnNfMS5hbGxDaGlsZHJlbkFyZVZlY3Rvcikob3JpZ2luYWxOb2RlKSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgdHlwZTogb3JpZ2luYWxOb2RlLnR5cGUsXHJcbiAgICAgICAgY2hhcmFjdGVyczogb3JpZ2luYWxOb2RlLmNoYXJhY3RlcnMsXHJcbiAgICAgICAgb3JpZ2luYWxOb2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICB2YXJpYW50czogaXNDb21wb25lbnRTZXQgJiYgW11cclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB0aGVDaGlsZHJlbihjaGlsZHJlbiwgdHJlZUNoaWxkcmVuLCBiYXNlU2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAoYmFzZVNlbGVjdG9yID09PSB2b2lkIDApIHsgYmFzZVNlbGVjdG9yID0gXCJcIjsgfVxyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUudmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIlwiLmNvbmNhdChjb21wb25lbnROYW1lLCBcIl9fXCIpLmNvbmNhdCh1bmlxdWVOYW1lKCgwLCBoZWxwZXJzXzEubWFrZVNhZmVGb3JDU1MpKG5vZGUubmFtZSkpKTtcclxuICAgICAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgY3NzOiBub2RlQ1NTKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6ICgwLCBoZWxwZXJzXzEuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKG5vZGUpLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczogbm9kZS5jaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxOb2RlOiBub2RlLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgIGJhc2VTZWxlY3RvcjogYmFzZVNlbGVjdG9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyZWVDaGlsZHJlbiA9PT0gbnVsbCB8fCB0cmVlQ2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyZWVDaGlsZHJlbi5wdXNoKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlQ2hpbGRyZW4obm9kZS5jaGlsZHJlbiwgbmV3RWxlbWVudC5jaGlsZHJlbiwgYmFzZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHRTZWdtZW50cyA9IGdldFRleHRTZWdtZW50cyhub2RlLCBuYW1lLCB1bmlxdWVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoKChfYSA9IG9yaWdpbmFsTm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4ob3JpZ2luYWxOb2RlLmNoaWxkcmVuLCB0cmVlLmNoaWxkcmVuKTtcclxuICAgICAgICAvKiBDb21wb25lbnQgVmFyaWFudHMgKi9cclxuICAgICAgICBpZiAoaXNDb21wb25lbnRTZXQpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh2YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFudE5hbWUgPSAoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShcIlwiLmNvbmNhdChjb21wb25lbnROYW1lLCBcIi0tXCIpLmNvbmNhdCh2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQubmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhcmlhbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjc3M6IG5vZGVDU1ModmFyaWFudCksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5BcmVWZWN0b3I6ICgwLCBoZWxwZXJzXzEuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKHZhcmlhbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzOiB2YXJpYW50ID09PSBudWxsIHx8IHZhcmlhbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhcmlhbnQuY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE5vZGU6IHZhcmlhbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFNlZ21lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBiYXNlU2VsZWN0b3I6IFwiLlwiICsgdmFyaWFudE5hbWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0cmVlLnZhcmlhbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChuZXdWYXJpYW50KTtcclxuICAgICAgICAgICAgICAgIGFsbE5hbWVzID0gW107IC8vIHJlc2V0IGNsYXNzTmFtZXMgc28gdGhlIG5ldyBnZW5lcmF0ZWQgbWF0Y2ggdGhlIG9uZXMgaW4gdGhlIGRlZmF1bHRWYXJpYW50XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih2YXJpYW50LmNoaWxkcmVuLCBuZXdWYXJpYW50LmNoaWxkcmVuLCBcIi5cIiArIHZhcmlhbnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG9yaWdpbmFsTm9kZS50eXBlID09PSBcIlRFWFRcIikge1xyXG4gICAgICAgIHZhciB0ZXh0U2VnbWVudHMgPSBnZXRUZXh0U2VnbWVudHMob3JpZ2luYWxOb2RlLCB0cmVlLm5hbWUsIHVuaXF1ZU5hbWUpO1xyXG4gICAgICAgIHRyZWUudGV4dFNlZ21lbnRzID0gdGV4dFNlZ21lbnRzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyZWU7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VGV4dFNlZ21lbnRzKG5vZGUsIGNvbXBvbmVudE5hbWUsIHVuaXF1ZU5hbWUpIHtcclxuICAgIHZhciBzZWdtZW50cyA9IG5vZGUuZ2V0U3R5bGVkVGV4dFNlZ21lbnRzKFtcclxuICAgICAgICBcImZvbnRTaXplXCIsXHJcbiAgICAgICAgXCJmb250TmFtZVwiLFxyXG4gICAgICAgIFwidGV4dERlY29yYXRpb25cIixcclxuICAgICAgICBcInRleHRDYXNlXCIsXHJcbiAgICAgICAgXCJsaW5lSGVpZ2h0XCIsXHJcbiAgICAgICAgXCJsZXR0ZXJTcGFjaW5nXCIsXHJcbiAgICAgICAgXCJmaWxsc1wiLFxyXG4gICAgICAgIFwidGV4dFN0eWxlSWRcIixcclxuICAgICAgICBcImZpbGxTdHlsZUlkXCIsXHJcbiAgICAgICAgXCJsaXN0T3B0aW9uc1wiLFxyXG4gICAgICAgIFwiaW5kZW50YXRpb25cIixcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHNlZ21lbnRzLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcyksIHsgbmFtZTogXCJcIi5jb25jYXQodW5pcXVlTmFtZSgoMCwgaGVscGVyc18xLm1ha2VTYWZlRm9yQ1NTKShjb21wb25lbnROYW1lICsgXCItc3BhblwiKSkpLCBjc3M6IHNlZ21lbnRDc3MocykgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRUcmVlRWxlbWVudEJ5TmFtZSh0cmVlLCBuYW1lKSB7XHJcbiAgICBmdW5jdGlvbiBzZWFyY2hUcmVlKGVsZW1lbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNoaWxkcmVuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VhcmNoVHJlZShlbGVtZW50LmNoaWxkcmVuW2ldLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWFyY2hUcmVlKHRyZWUsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVyYXNlRHVwbGljYXRlQ1NTKG1vZGlmaWVyQ1NTLCBiYXNlQ1NTKSB7XHJcbiAgICB2YXIgbW9kQXJyID0gbW9kaWZpZXJDU1Muc3BsaXQoXCI7XCIpLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbC50cmltKCk7IH0pO1xyXG4gICAgdmFyIGJhc2VBcnIgPSBiYXNlQ1NTLnNwbGl0KFwiO1wiKS5tYXAoZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwudHJpbSgpOyB9KTtcclxuICAgIC8vIGRldGVjdCBjc3MgbGluZXMgaW5jbHVkZWQgaW4gYmFzZSBidXQgbm90IGluIG1vZGlmaWVyIGFuZCB1bnNldCB0aGUgdmFsdWVcclxuICAgIHZhciBjc3NQcm9wc1RvQmVVbnNldCA9IGJhc2VBcnJcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChsKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBsLnNwbGl0KFwiOlwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG4gICAgfSlcclxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuICFtb2RpZmllckNTUy5pbmNsdWRlcyhcIlwiLmNvbmNhdChwcm9wLCBcIjpcIikpO1xyXG4gICAgfSlcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChwcm9wKSB7IHJldHVybiBwcm9wICsgXCI6IHVuc2V0XCI7IH0pO1xyXG4gICAgcmV0dXJuIG1vZEFyclxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGxpbmUpIHtcclxuICAgICAgICByZXR1cm4gIWJhc2VBcnIuaW5jbHVkZXMobGluZSk7XHJcbiAgICB9KVxyXG4gICAgICAgIC5jb25jYXQoY3NzUHJvcHNUb0JlVW5zZXQpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAobCkgeyByZXR1cm4gbCArIFwiO1wiOyB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbnZhciB0cmVlID0gY3JlYXRlVHJlZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG5jb25zb2xlLmxvZyh0cmVlKTtcclxuZnVuY3Rpb24gcHJpbnRDU1ModHJlZSkge1xyXG4gICAgdmFyIGNzcyA9IFwiXCI7XHJcbiAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHRyZWUubmFtZSwgXCIge1wiKS5jb25jYXQodHJlZS5jc3MsIFwifVxcblwiKTtcclxuICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuLCBpc1ZhcmlhbnQpIHtcclxuICAgICAgICBpZiAoaXNWYXJpYW50ID09PSB2b2lkIDApIHsgaXNWYXJpYW50ID0gZmFsc2U7IH1cclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50Q1NTID0gdHJlZUVsZW1lbnQuY3NzO1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoaXNWYXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNTUyA9IChfYSA9IGdldFRyZWVFbGVtZW50QnlOYW1lKHRyZWUsIHRyZWVFbGVtZW50Lm5hbWUpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3NzO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB0cmVlLm5hbWUgPT09IHRyZWVFbGVtZW50Lm5hbWUgPyBcIlwiIDogXCIuXCIgKyB0cmVlRWxlbWVudC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDU1MpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Q1NTID0gZXJhc2VEdXBsaWNhdGVDU1ModHJlZUVsZW1lbnQuY3NzLCBiYXNlQ1NTKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudENTUyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY3NzICs9IFwiXCIuY29uY2F0KHRyZWVFbGVtZW50LmJhc2VTZWxlY3RvciB8fCBcIlwiLCBcIiBcIikuY29uY2F0KGNsYXNzTmFtZSwgXCIge1wiKS5jb25jYXQoZWxlbWVudENTUywgXCJ9XFxuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5hbGxDaGlsZHJlbkFyZVZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQudGV4dFNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MgKz0gXCIuXCIuY29uY2F0KHMubmFtZSwgXCIge1wiKS5jb25jYXQocy5jc3MsIFwifVxcblwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmVlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbiwgaXNWYXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyZWUudGV4dFNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0cmVlLnRleHRTZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIGNzcyArPSBcIi5cIi5jb25jYXQocy5uYW1lLCBcIiB7XCIpLmNvbmNhdChzLmNzcywgXCJ9XFxuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICBpZiAodHJlZS52YXJpYW50cykge1xyXG4gICAgICAgIGNzcyArPSBcIlxcbi8qIHZhcmlhbnQgc3R5bGVzICovXFxuXCI7XHJcbiAgICAgICAgdGhlQ2hpbGRyZW4odHJlZS52YXJpYW50cywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50SFRNTCh0cmVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gdGhlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgoY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkcmVuLmxlbmd0aCkgPiAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoZnVuY3Rpb24gKHRyZWVFbGVtZW50KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRyZWVFbGVtZW50LnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUVsZW1lbnQuYWxsQ2hpbGRyZW5BcmVWZWN0b3IpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3JlYXRlU1ZHKHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSwgdHJlZUVsZW1lbnQubmFtZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9jLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IFwiPGRpdiBjbGFzcz1cXFwiXCIuY29uY2F0KHRyZWVFbGVtZW50Lm5hbWUsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWVFbGVtZW50LnRleHRTZWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmludFRleHRTZWdtZW50cyh0cmVlRWxlbWVudC50ZXh0U2VnbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsIFwiIFwiKSkuY29uY2F0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlRWxlbWVudC5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLmFwcGx5KF9hLCBbX2Muc2VudCgpLCBcIlxcbjwvZGl2PlwiXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFsbC5qb2luKFwiXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgXCJcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaHRtbCwgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0cmVlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5hbGxDaGlsZHJlbkFyZVZlY3RvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyZWF0ZVNWRyh0cmVlLm9yaWdpbmFsTm9kZSwgdHJlZS5uYW1lKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IF9kLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBfYSA9IGh0bWw7XHJcbiAgICAgICAgICAgICAgICAgICAgX2MgPSAoX2IgPSBcIjxkaXYgY2xhc3M9XFxcIlwiLmNvbmNhdCh0cmVlLm5hbWUsIFwiXFxcIj5cXG5cIikuY29uY2F0KHRyZWUudGV4dFNlZ21lbnRzID8gcHJpbnRUZXh0U2VnbWVudHModHJlZS50ZXh0U2VnbWVudHMpIDogXCJcIiwgXCIgXCIpKS5jb25jYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhlQ2hpbGRyZW4odHJlZS5jaGlsZHJlbildO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfYSArIF9jLmFwcGx5KF9iLCBbX2Quc2VudCgpLCBcIlxcbjwvZGl2PlwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgaHRtbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHByaW50VGV4dFNlZ21lbnRzKHNlZ21lbnRzKSB7XHJcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gZG8gbm90IHdyYXAgaW4gc3BhblxyXG4gICAgICAgIHJldHVybiAoMCwgaGVscGVyc18xLmVzY2FwZUh0bWwpKHNlZ21lbnRzWzBdLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWdtZW50c1xyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz1cXFwiXCIuY29uY2F0KHMubmFtZSwgXCJcXFwiPlwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5lc2NhcGVIdG1sKShzLmNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxuXCIpIC8vIG1ha2VzIGFubm95aW5nIEwtU0VQIExpbmVicmVha3MgZGlzYXBwZWFyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKSwgXCI8L3NwYW4+XCIpO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVTVkcobm9kZSwgY2xhc3NOYW1lKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN2ZztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwb3J0QXN5bmMoeyBmb3JtYXQ6IFwiU1ZHXCIsIHVzZUFic29sdXRlQm91bmRzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWludDhBcnJheSB0byBzdHJpbmcgYW5kIGluamVjdCBjbGFzc25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBseShudWxsLCByZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcIjxzdmcgXCIsIFwiPHN2ZyBjbGFzcz1cXFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJcXFwiIFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmVycm9yKGVycik7IH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzdmcgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHN2Z107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlU1ZHID0gY3JlYXRlU1ZHO1xyXG5maWdtYS5wYXJhbWV0ZXJzLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgcGFyYW1ldGVycyA9IF9hLnBhcmFtZXRlcnMsIGtleSA9IF9hLmtleSwgcXVlcnkgPSBfYS5xdWVyeSwgcmVzdWx0ID0gX2EucmVzdWx0O1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIFwiZnJhbWV3b3JrXCI6XHJcbiAgICAgICAgICAgIHZhciBmcmFtZXdvcmtzID0gW1wicmVhY3RcIiwgXCJodG1sXCIsIFwidGFpbHdpbmQoYmV0YSlcIl07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXRTdWdnZXN0aW9ucyhmcmFtZXdvcmtzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcy5pbmNsdWRlcyhxdWVyeSk7IH0pKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59KTtcclxuZmlnbWEub24oXCJydW5cIiwgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgY29tbWFuZCA9IF9hLmNvbW1hbmQsIHBhcmFtZXRlcnMgPSBfYS5wYXJhbWV0ZXJzO1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNzcywgaHRtbCwgX2I7XHJcbiAgICAgICAgdmFyIF9jLCBfZCwgX2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9mLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNjAwLCB3aWR0aDogNTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCIgPyBcIi1cIiA6IHByaW50Q1NTKHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHBhcmFtZXRlcnMuZnJhbWV3b3JrID09PSBcInRhaWx3aW5kKGJldGEpXCIpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCAoMCwgdGFpbHdpbmRfMS50YWlsd2luZCkodHJlZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIF9iID0gX2Yuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQgLyp5aWVsZCovLCBwcmludEhUTUwodHJlZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIF9iID0gX2Yuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IGNzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrOiBwYXJhbWV0ZXJzLmZyYW1ld29yayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiAoMCwgZ2V0U3R5bGVzXzEuZ2V0U3R5bGVzKShmaWdtYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IChfZSA9IChfZCA9IChfYyA9IGZpZ21hLmN1cnJlbnRQYWdlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2VsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbMF0pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLnRleHREZWNvcmF0aW9uUHJvcCA9IGV4cG9ydHMudGV4dFRyYW5zZm9ybVByb3AgPSBleHBvcnRzLmZvbnRQcm9wID0gZXhwb3J0cy5mb250U2hvcnRoYW5kID0gZXhwb3J0cy5saW5lSGVpZ2h0ID0gZXhwb3J0cy5nZXRDb2xvciA9IGV4cG9ydHMuc3Ryb2tlQ29sb3IgPSBleHBvcnRzLmJvcmRlclJhZGl1cyA9IGV4cG9ydHMuZ3JhZGllbnRMaW5lYXIgPSBleHBvcnRzLnRyYW5zZm9ybXMgPSBleHBvcnRzLmZpbGxDb2xvciA9IGV4cG9ydHMuZm9udFN0eWxlQXNPYmplY3QgPSBleHBvcnRzLmJveFNoYWRvdyA9IGV4cG9ydHMucG9zaXRpb24gPSBleHBvcnRzLm9wYWNpdHkgPSBleHBvcnRzLm92ZXJmbG93ID0gZXhwb3J0cy5kaW1lbnNpb25zID0gZXhwb3J0cy5kaXNwbGF5UHJvcCA9IGV4cG9ydHMucGFkZGluZ1Byb3AgPSBleHBvcnRzLmJvcmRlclByb3AgPSB2b2lkIDA7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vaGVscGVyc1wiKTtcclxuZnVuY3Rpb24gYm9yZGVyUHJvcChub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoIW5vZGUuc3Ryb2tlcyB8fCAhbm9kZS5zdHJva2VXZWlnaHQgfHwgbm9kZS5zdHJva2VzLmxlbmd0aCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoKChfYiA9IChfYSA9IG5vZGUuc3Ryb2tlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHlwZSkgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJcXG4gICAgYm9yZGVyLXdpZHRoOiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5zdHJva2VXZWlnaHQpLCBcInB4OyBcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsgXFxuICAgIGJvcmRlci1pbWFnZTogXCIpLmNvbmNhdChzdHJva2VDb2xvcihub2RlKSwgXCI7IFxcbiAgICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XFxuICAgIFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcImJvcmRlcjogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUuc3Ryb2tlV2VpZ2h0KSwgXCJweCBzb2xpZCBcIikuY29uY2F0KHN0cm9rZUNvbG9yKG5vZGUpLCBcIjtcIik7XHJcbn1cclxuZXhwb3J0cy5ib3JkZXJQcm9wID0gYm9yZGVyUHJvcDtcclxuZnVuY3Rpb24gcGFkZGluZ1Byb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnBhZGRpbmdUb3AgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nUmlnaHQgJiZcclxuICAgICAgICAhbm9kZS5wYWRkaW5nQm90dG9tICYmXHJcbiAgICAgICAgIW5vZGUucGFkZGluZ0xlZnQpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gXCJwYWRkaW5nOiBcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5wYWRkaW5nVG9wKSwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUucGFkZGluZ1JpZ2h0KSwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUucGFkZGluZ0JvdHRvbSksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnBhZGRpbmdMZWZ0KSwgXCJweDtcIik7XHJcbn1cclxuZXhwb3J0cy5wYWRkaW5nUHJvcCA9IHBhZGRpbmdQcm9wO1xyXG5mdW5jdGlvbiBkaXNwbGF5UHJvcChub2RlKSB7XHJcbiAgICB2YXIgZmxleFNocmlua0dyb3cgPSBub2RlLmxheW91dEdyb3cgPT09IDEgPyBcImZsZXg6IDE7XCIgOiBzaHJpbmsoKTtcclxuICAgIGZ1bmN0aW9uIHNocmluaygpIHtcclxuICAgICAgICByZXR1cm4gIShub2RlLnR5cGUgPT09IFwiVEVYVFwiKSAmJiAhKG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIilcclxuICAgICAgICAgICAgPyBcImZsZXgtc2hyaW5rOiAwO1wiXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuICAgIHZhciBsYXlvdXRBbGlnbiA9IG5vZGUubGF5b3V0QWxpZ24gPT09IFwiU1RSRVRDSFwiID8gXCJhbGlnbi1zZWxmOiBzdHJldGNoO1wiIDogXCJcIjtcclxuICAgIHZhciBhbGlnbm1lbnRNYXAgPSB7XHJcbiAgICAgICAgTUlOOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICBNQVg6IFwiZmxleC1lbmRcIixcclxuICAgICAgICBDRU5URVI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgU1BBQ0VfQkVUV0VFTjogXCJzcGFjZS1iZXR3ZWVuXCJcclxuICAgIH07XHJcbiAgICB2YXIgZmxleFByb3BzID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IFwiLmNvbmNhdChkaXJlY3Rpb24sIFwiO1xcbiAgICAgIGdhcDogXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLml0ZW1TcGFjaW5nKSwgXCJweDtcXG4gICAgICBhbGlnbi1pdGVtczogXCIpLmNvbmNhdChhbGlnbm1lbnRNYXBbbm9kZS5jb3VudGVyQXhpc0FsaWduSXRlbXNdLCBcIjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IFwiKS5jb25jYXQoYWxpZ25tZW50TWFwW25vZGUucHJpbWFyeUF4aXNBbGlnbkl0ZW1zXSwgXCI7XFxuICAgIFwiKTtcclxuICAgIH07XHJcbiAgICB2YXIgbGF5b3V0UHJvcHMgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgPSBmbGV4UHJvcHMoXCJjb2x1bW5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIGxheW91dFByb3BzID0gZmxleFByb3BzKFwicm93XCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiSE9SSVpPTlRBTFwiIHx8XHJcbiAgICAgICAgbm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiKSB7XHJcbiAgICAgICAgbGF5b3V0UHJvcHMgKz0gbGF5b3V0QWxpZ24gKyBmbGV4U2hyaW5rR3JvdztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRQcm9wcztcclxufVxyXG5leHBvcnRzLmRpc3BsYXlQcm9wID0gZGlzcGxheVByb3A7XHJcbmZ1bmN0aW9uIGRpbWVuc2lvbnMobm9kZSkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcclxuICAgIC8vIGluIHRoaXMgY2FzZSB0aGUgZGltZW5zaW9ucyBhcmUgZGVmaW5lZCBpbnNpZGUgdGhlIHN2Z1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIC8qIE5PVEU6IFRoZSBPcmRlciBvZiB0aGVzZSBpZiBzdGF0ZW1lbnRzIGlzIGltcG9ydGFudCEgKi9cclxuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xyXG4gICAgdmFyIHdpZHRoID0gXCJcIjtcclxuICAgIGlmIChub2RlLmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIikge1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUucHJpbWFyeUF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIlxyXG4gICAgICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmhlaWdodCkgKyBcInB4XCI7XHJcbiAgICAgICAgd2lkdGggPVxyXG4gICAgICAgICAgICBub2RlLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9PT0gXCJBVVRPXCJcclxuICAgICAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS53aWR0aCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5sYXlvdXRNb2RlID09PSBcIkhPUklaT05UQUxcIikge1xyXG4gICAgICAgIHdpZHRoID1cclxuICAgICAgICAgICAgbm9kZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPT09IFwiQVVUT1wiXHJcbiAgICAgICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgICAgICA6ICgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUud2lkdGgpICsgXCJweFwiO1xyXG4gICAgICAgIGhlaWdodCA9XHJcbiAgICAgICAgICAgIG5vZGUuY291bnRlckF4aXNTaXppbmdNb2RlID09PSBcIkFVVE9cIlxyXG4gICAgICAgICAgICAgICAgPyBcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmhlaWdodCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5vZGUubGF5b3V0TW9kZSB8fCBub2RlLmxheW91dE1vZGUgPT09IFwiTk9ORVwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKChfYSA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpLmluY2x1ZGVzKFwiSEVJR0hUXCIpKVxyXG4gICAgICAgICAgICA/IFwiYXV0b1wiXHJcbiAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5oZWlnaHQpICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKChfYiA9IG5vZGUudGV4dEF1dG9SZXNpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpLmluY2x1ZGVzKFwiV0lEVEhcIikpXHJcbiAgICAgICAgICAgID8gXCJhdXRvXCJcclxuICAgICAgICAgICAgOiAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLndpZHRoKSArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGlmICgoIW5vZGUuY2hpbGRyZW4gfHwgKChfYyA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID09PSAwKSAmJiBub2RlLnR5cGUgIT09IFwiVEVYVFwiKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5oZWlnaHQpICsgXCJweFwiO1xyXG4gICAgICAgIHdpZHRoID0gKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS53aWR0aCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoKG5vZGUucGFyZW50LmxheW91dE1vZGUgPT09IFwiVkVSVElDQUxcIiAmJiBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAoKF9kID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhvcml6b250YWwpID09PSBcIlNUUkVUQ0hcIikge1xyXG4gICAgICAgIHdpZHRoID0gXCJhdXRvXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiYgbm9kZS5sYXlvdXRHcm93ID09PSAxKSB7XHJcbiAgICAgICAgd2lkdGggPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIGlmICgobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJIT1JJWk9OVEFMXCIgJiZcclxuICAgICAgICBub2RlLmxheW91dEFsaWduID09PSBcIlNUUkVUQ0hcIikgfHxcclxuICAgICAgICAobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJWRVJUSUNBTFwiICYmIG5vZGUubGF5b3V0R3JvdyA9PT0gMSkgfHxcclxuICAgICAgICAoKF9lID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZlcnRpY2FsKSA9PT0gXCJTVFJFVENIXCIpIHtcclxuICAgICAgICBoZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBcIndpZHRoOiBcIi5jb25jYXQod2lkdGgsIFwiOyBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcIjtcIik7XHJcbn1cclxuZXhwb3J0cy5kaW1lbnNpb25zID0gZGltZW5zaW9ucztcclxuZnVuY3Rpb24gb3ZlcmZsb3cobm9kZSkge1xyXG4gICAgaWYgKCgwLCBoZWxwZXJzXzEud2lsbEJlUmVuZGVyZWRBc1NWRykobm9kZSkpXHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcmZsb3c6IHZpc2libGU7XCI7XHJcbiAgICByZXR1cm4gbm9kZS5jbGlwc0NvbnRlbnQgPyBcIm92ZXJmbG93OiBoaWRkZW47XCIgOiBcIlwiO1xyXG59XHJcbmV4cG9ydHMub3ZlcmZsb3cgPSBvdmVyZmxvdztcclxuZnVuY3Rpb24gb3BhY2l0eShub2RlKSB7XHJcbiAgICBpZiAobm9kZS5vcGFjaXR5ID09PSAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFwib3BhY2l0eTogXCIuY29uY2F0KG5vZGUub3BhY2l0eSwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMub3BhY2l0eSA9IG9wYWNpdHk7XHJcbmZ1bmN0aW9uIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKSB7XHJcbiAgICBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gXCJHUk9VUFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbmRBYnNvbHV0ZVBhcmVudChub2RlLnBhcmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQ7XHJcbn1cclxuZnVuY3Rpb24gY3NzRnJvbUNvbnN0cmFpbnRzKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICB2YXIgY29vcmQgPSBcIlwiO1xyXG4gICAgc3dpdGNoICgoX2EgPSBub2RlLmNvbnN0cmFpbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGNhc2UgXCJNQVhcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJyaWdodDogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLngpLCBcInB4O1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIlNUUkVUQ0hcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJyaWdodDogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS53aWR0aCAtIG5vZGUud2lkdGggLSBub2RlLngpLCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KG5vZGUueCwgXCJweDtcIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJDRU5URVJcIjpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJsZWZ0OiBjYWxjKDUwJSAtIFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkud2lkdGggLyAyIC0gbm9kZS54KSwgXCJweCk7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImxlZnQ6IFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLngpLCBcInB4O1wiKTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoKF9iID0gbm9kZS5jb25zdHJhaW50cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgY2FzZSBcIk1BWFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImJvdHRvbTogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueSksIFwicHg7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiU1RSRVRDSFwiOlxyXG4gICAgICAgICAgICBjb29yZCArPSBcImJvdHRvbTogXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKGZpbmRBYnNvbHV0ZVBhcmVudChub2RlKS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIG5vZGUueSksIFwicHg7IHRvcDogXCIpLmNvbmNhdChub2RlLnksIFwicHg7XCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQ0VOVEVSXCI6XHJcbiAgICAgICAgICAgIGNvb3JkICs9IFwidG9wOiBjYWxjKDUwJSAtIFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShmaW5kQWJzb2x1dGVQYXJlbnQobm9kZSkuaGVpZ2h0IC8gMiAtIG5vZGUueSksIFwicHgpO1wiKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29vcmQgKz0gXCJ0b3A6IFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnkpLCBcInB4O1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZDtcclxufVxyXG5mdW5jdGlvbiBwb3NpdGlvbihub2RlKSB7XHJcbiAgICB2YXIgY29vcmQgPSBcIlwiO1xyXG4gICAgaWYgKG5vZGUuaWQgIT09IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5pZCkge1xyXG4gICAgICAgIC8vIFN1cGVyIHVnbHkgYnV0IHdvcmtzIGZvciBub3cuLi5cclxuICAgICAgICBjb29yZCA9IGNzc0Zyb21Db25zdHJhaW50cyhub2RlKTtcclxuICAgIH1cclxuICAgIHZhciBwb3NpdGlvbkZyb21QYXJlbnQgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiR1JPVVBcIiAmJiAhKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGF0aWM7XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlkID09PSBzZWxlY3Rpb24uaWQgfHwgKChfYSA9IG5vZGUucGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHlwZSkgPT09IFwiQ09NUE9ORU5UX1NFVFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlbGF0aXZlO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQobm9kZS5wYXJlbnQubGF5b3V0TW9kZSA9PT0gXCJOT05FXCIgfHwgIW5vZGUucGFyZW50LmxheW91dE1vZGVcclxuICAgICAgICAgICAgPyBcImFic29sdXRlOyBcIi5jb25jYXQoY29vcmQpXHJcbiAgICAgICAgICAgIDogXCJyZWxhdGl2ZTtcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFwiXFxuICAgICAgcG9zaXRpb246IFwiLmNvbmNhdChwb3NpdGlvbkZyb21QYXJlbnQobm9kZSksIFwiXFxuICAgIFwiKTtcclxufVxyXG5leHBvcnRzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbmZ1bmN0aW9uIGJveFNoYWRvdyhub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoIW5vZGUuZWZmZWN0cyB8fFxyXG4gICAgICAgIG5vZGUuZWZmZWN0cy5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAoMCwgaGVscGVyc18xLndpbGxCZVJlbmRlcmVkQXNTVkcpKG5vZGUpIHx8XHJcbiAgICAgICAgbm9kZS50eXBlID09PSBcIkdST1VQXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgc2hhZG93cyA9IG5vZGUuZWZmZWN0cy5maWx0ZXIoZnVuY3Rpb24gKGVmZmVjdCkgeyByZXR1cm4gZWZmZWN0LnR5cGUgPT09IFwiRFJPUF9TSEFET1dcIjsgfSk7XHJcbiAgICBpZiAoc2hhZG93cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgY3NzID0gXCJib3gtc2hhZG93OiBcIjtcclxuICAgIGNzcyArPSBzaGFkb3dzXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShzLm9mZnNldC54KSwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKHMub2Zmc2V0LnkpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikocy5yYWRpdXMpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikocy5zcHJlYWQpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5yZ2JhQ29sb3IpKHMuY29sb3IsIHMuY29sb3IuYSkpO1xyXG4gICAgfSlcclxuICAgICAgICAuam9pbihcIiwgXCIpO1xyXG4gICAgcmV0dXJuIChcIlwiLmNvbmNhdChub2RlLmVmZmVjdFN0eWxlSWQgJiZcclxuICAgICAgICBcIi8qXCIgKyAoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSArIFwiKi9cIikgK1xyXG4gICAgICAgIGNzcyArXHJcbiAgICAgICAgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuYm94U2hhZG93ID0gYm94U2hhZG93O1xyXG5mdW5jdGlvbiBmb250U3R5bGVBc09iamVjdChmb250TmFtZSkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIHZhciBpc0l0YWxpYyA9IChfYSA9IGZvbnROYW1lID09PSBudWxsIHx8IGZvbnROYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmb250TmFtZS5zdHlsZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJpdGFsaWNcIik7XHJcbiAgICB2YXIgd2VpZ2h0TWFwID0ge1xyXG4gICAgICAgIHRoaW46IDEwMCxcclxuICAgICAgICBcImV4dHJhIGxpZ2h0XCI6IDIwMCxcclxuICAgICAgICBleHRyYWxpZ2h0OiAyMDAsXHJcbiAgICAgICAgbGlnaHQ6IDMwMCxcclxuICAgICAgICBub3JtYWw6IDQwMCxcclxuICAgICAgICByZWd1bGFyOiA0MDAsXHJcbiAgICAgICAgbWVkaXVtOiA1MDAsXHJcbiAgICAgICAgXCJzZW1pIGJvbGRcIjogNjAwLFxyXG4gICAgICAgIHNlbWlib2xkOiA2MDAsXHJcbiAgICAgICAgYm9sZDogNzAwLFxyXG4gICAgICAgIFwiZXh0cmEgYm9sZFwiOiA4MDAsXHJcbiAgICAgICAgZXh0cmFib2xkOiA4MDAsXHJcbiAgICAgICAgYmxhY2s6IDkwMFxyXG4gICAgfTtcclxuICAgIHZhciB3ZWlnaHQgPSAoX2IgPSBmb250TmFtZSA9PT0gbnVsbCB8fCBmb250TmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9udE5hbWUuc3R5bGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJpdGFsaWNcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB3ZWlnaHQ6IHdlaWdodE1hcFt3ZWlnaHRdID8gd2VpZ2h0TWFwW3dlaWdodF0gOiBcIjQwMFwiLFxyXG4gICAgICAgIGlzSXRhbGljOiBpc0l0YWxpY1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmZvbnRTdHlsZUFzT2JqZWN0ID0gZm9udFN0eWxlQXNPYmplY3Q7XHJcbmZ1bmN0aW9uIGZpbGxDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBpZiAoKDAsIGhlbHBlcnNfMS53aWxsQmVSZW5kZXJlZEFzU1ZHKShub2RlKSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIC8vYXRtIG9ubHkgb25lIGZpbGwgaXMgc3VwcG9ydGVkXHJcbiAgICB2YXIgZmlsbCA9IChfYSA9IG5vZGUuZmlsbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgIHJldHVybiBnZXRDb2xvcihmaWxsLCBub2RlLmZpbGxTdHlsZUlkKTtcclxufVxyXG5leHBvcnRzLmZpbGxDb2xvciA9IGZpbGxDb2xvcjtcclxuZnVuY3Rpb24gdHJhbnNmb3Jtcyhub2RlKSB7XHJcbiAgICB2YXIgaXNTVkcgPSAoMCwgaGVscGVyc18xLndpbGxCZVJlbmRlcmVkQXNTVkcpKG5vZGUpO1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gXCJHUk9VUFwiICYmICFpc1NWRykge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgdmFyIHRyYW5zZm9ybXMgPSAoMCwgaGVscGVyc18xLmdldFRyYW5zZm9ybXMpKG5vZGUucmVsYXRpdmVUcmFuc2Zvcm0pO1xyXG4gICAgdmFyIGFic29sdXRlVHJhbnNmb3JtcyA9ICgwLCBoZWxwZXJzXzEuZ2V0VHJhbnNmb3Jtcykobm9kZS5hYnNvbHV0ZVRyYW5zZm9ybSk7XHJcbiAgICBpZiAodHJhbnNmb3Jtcy5hbmdsZSA9PT0gMCAmJlxyXG4gICAgICAgIHRyYW5zZm9ybXMuc2NhbGVYID09PSAxICYmXHJcbiAgICAgICAgdHJhbnNmb3Jtcy5zY2FsZVkgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIC8vIFRPRE86IGNoZWNrIGlmIGl0IGlzIHJlbmRlcmVkIGluc2lkZSBhbiBhdXRvbGF5b3V0ICYgZml4IHRyYW5zZm9ybSBvcmlnaW4uLi5cclxuICAgIGlmIChpc1NWRykge1xyXG4gICAgICAgIGlmICghbm9kZS5hYnNvbHV0ZVJlbmRlckJvdW5kcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKFwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKSgoYWJzb2x1dGVUcmFuc2Zvcm1zLnRyYW5zbGF0ZVggLSBub2RlLmFic29sdXRlUmVuZGVyQm91bmRzLngpICogLTEpLCBcInB4LCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKChhYnNvbHV0ZVRyYW5zZm9ybXMudHJhbnNsYXRlWSAtIG5vZGUuYWJzb2x1dGVSZW5kZXJCb3VuZHMueSkgKiAtMSksIFwicHgpO1xcbiAgICBcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZShcIi5jb25jYXQodHJhbnNmb3Jtcy5hbmdsZSAqIC0xLCBcImRlZykgc2NhbGUoXCIpLmNvbmNhdCh0cmFuc2Zvcm1zLnNjYWxlWCwgXCIsIFwiKS5jb25jYXQodHJhbnNmb3Jtcy5zY2FsZVksIFwiKTtcXG4gIFwiKTtcclxufVxyXG5leHBvcnRzLnRyYW5zZm9ybXMgPSB0cmFuc2Zvcm1zO1xyXG5mdW5jdGlvbiBncmFkaWVudExpbmVhcihmaWxsKSB7XHJcbiAgICB2YXIgZ3JhZGllbnRTdG9wcyA9IGZpbGwuZ3JhZGllbnRTdG9wcztcclxuICAgIHZhciB0cmFuc2Zvcm1zID0gKDAsIGhlbHBlcnNfMS5nZXRUcmFuc2Zvcm1zKShmaWxsLmdyYWRpZW50VHJhbnNmb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbGwuZ3JhZGllbnRUcmFuc2Zvcm0pO1xyXG4gICAgdmFyIGdyYWRpZW50TWFwID0gZ3JhZGllbnRTdG9wcy5tYXAoZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoKDAsIGhlbHBlcnNfMS5yZ2JhQ29sb3IpKHMuY29sb3IsIHMuY29sb3IuYSksIFwiIFwiKS5jb25jYXQocy5wb3NpdGlvbiAqIDEwMCwgXCIlXCIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gXCJsaW5lYXItZ3JhZGllbnQoXCIuY29uY2F0KHRyYW5zZm9ybXMuYW5nbGUgKyA5MCwgXCJkZWcsIFwiKS5jb25jYXQoZ3JhZGllbnRNYXAuam9pbihcIixcIiksIFwiKVwiKTtcclxufVxyXG5leHBvcnRzLmdyYWRpZW50TGluZWFyID0gZ3JhZGllbnRMaW5lYXI7XHJcbmZ1bmN0aW9uIGJvcmRlclJhZGl1cyhub2RlKSB7XHJcbiAgICBpZiAobm9kZS50eXBlID09PSBcIkVMTElQU0VcIilcclxuICAgICAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiA1MCU7XCI7XHJcbiAgICBpZiAoIW5vZGUuY29ybmVyUmFkaXVzICYmICFub2RlLnRvcExlZnRSYWRpdXMpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQodHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyAoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLmNvcm5lclJhZGl1cykgKyBcInB4XCJcclxuICAgICAgICA6IFwiXCIuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUudG9wTGVmdFJhZGl1cyksIFwicHggXCIpLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlLnRvcFJpZ2h0UmFkaXVzKSwgXCJweCBcIikuY29uY2F0KCgwLCBoZWxwZXJzXzEuY2xlYW5OdW1iZXIpKG5vZGUuYm90dG9tUmlnaHRSYWRpdXMpLCBcInB4IFwiKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikobm9kZS5ib3R0b21MZWZ0UmFkaXVzKSwgXCJweFwiKSwgXCI7XCIpO1xyXG59XHJcbmV4cG9ydHMuYm9yZGVyUmFkaXVzID0gYm9yZGVyUmFkaXVzO1xyXG5mdW5jdGlvbiBzdHJva2VDb2xvcihub2RlKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgc3Ryb2tlID0gKF9hID0gbm9kZS5zdHJva2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbiAgICByZXR1cm4gZ2V0Q29sb3Ioc3Ryb2tlLCBub2RlLnN0cm9rZVN0eWxlSWQpO1xyXG59XHJcbmV4cG9ydHMuc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcclxuZnVuY3Rpb24gZ2V0Q29sb3IoZmlsbE9yQ29sb3IsIHN0eWxlSWQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmICghZmlsbE9yQ29sb3IgfHwgIWZpbGxPckNvbG9yLnZpc2libGUpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGxPckNvbG9yLnR5cGUgPT09IFwiR1JBRElFTlRfTElORUFSXCIpIHtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRMaW5lYXIoZmlsbE9yQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlSWQpIHtcclxuICAgICAgICB2YXIgc3R5bGVOYW1lID0gKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkoKF9hID0gZmlnbWEuZ2V0U3R5bGVCeUlkKHN0eWxlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSk7XHJcbiAgICAgICAgdmFyIGNvbG9yID0gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICAgICAgPyAoMCwgaGVscGVyc18xLnJnYmFDb2xvcikoZmlsbE9yQ29sb3IuY29sb3IsIGZpbGxPckNvbG9yLm9wYWNpdHkpXHJcbiAgICAgICAgICAgIDogKDAsIGhlbHBlcnNfMS5yZ2JUb0hleCkoZmlsbE9yQ29sb3IuY29sb3IpO1xyXG4gICAgICAgIHJldHVybiBcInZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLCBcIikuY29uY2F0KGNvbG9yLCBcIilcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsbE9yQ29sb3Iub3BhY2l0eSA8IDFcclxuICAgICAgICA/ICgwLCBoZWxwZXJzXzEucmdiYUNvbG9yKShmaWxsT3JDb2xvci5jb2xvciwgZmlsbE9yQ29sb3Iub3BhY2l0eSlcclxuICAgICAgICA6ICgwLCBoZWxwZXJzXzEucmdiVG9IZXgpKGZpbGxPckNvbG9yLmNvbG9yKTtcclxufVxyXG5leHBvcnRzLmdldENvbG9yID0gZ2V0Q29sb3I7XHJcbmZ1bmN0aW9uIGxpbmVIZWlnaHQobm9kZU9yU3R5bGUpIHtcclxuICAgIGlmICghbm9kZU9yU3R5bGUubGluZUhlaWdodClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIGlmIChub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnVuaXQgPT09IFwiQVVUT1wiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHVuaXRNYXAgPSB7XHJcbiAgICAgICAgUElYRUxTOiBcInB4XCIsXHJcbiAgICAgICAgUEVSQ0VOVDogXCIlXCJcclxuICAgIH07XHJcbiAgICB2YXIgdW5pdCA9IHVuaXRNYXBbbm9kZU9yU3R5bGUubGluZUhlaWdodC51bml0XTtcclxuICAgIHJldHVybiBcIlwiLmNvbmNhdCgoMCwgaGVscGVyc18xLmNsZWFuTnVtYmVyKShub2RlT3JTdHlsZS5saW5lSGVpZ2h0LnZhbHVlKSkuY29uY2F0KHVuaXQpO1xyXG59XHJcbmV4cG9ydHMubGluZUhlaWdodCA9IGxpbmVIZWlnaHQ7XHJcbmZ1bmN0aW9uIGZvbnRTaG9ydGhhbmQoX2EpIHtcclxuICAgIHZhciBsaW5lSGVpZ2h0ID0gX2EubGluZUhlaWdodCwgZm9udFNpemUgPSBfYS5mb250U2l6ZSwgd2VpZ2h0ID0gX2Eud2VpZ2h0LCBmb250RmFtaWx5ID0gX2EuZm9udEZhbWlseSwgaXNJdGFsaWMgPSBfYS5pc0l0YWxpYztcclxuICAgIHZhciBpdGFsaWMgPSBpc0l0YWxpYyA/IFwiaXRhbGljIFwiIDogXCJcIjtcclxuICAgIHJldHVybiBcIlwiLmNvbmNhdCh3ZWlnaHQsIFwiIFwiKS5jb25jYXQoaXRhbGljKS5jb25jYXQoKDAsIGhlbHBlcnNfMS5jbGVhbk51bWJlcikoZm9udFNpemUpLCBcInB4XCIpLmNvbmNhdChsaW5lSGVpZ2h0ICE9PSBcIlwiID8gXCIvXCIgKyBsaW5lSGVpZ2h0IDogXCJcIiwgXCIgJ1wiKS5jb25jYXQoZm9udEZhbWlseSwgXCInXCIpO1xyXG59XHJcbmV4cG9ydHMuZm9udFNob3J0aGFuZCA9IGZvbnRTaG9ydGhhbmQ7XHJcbmZ1bmN0aW9uIGZvbnRQcm9wKG5vZGUpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgdmFyIF9kID0gZm9udFN0eWxlQXNPYmplY3Qobm9kZS5mb250TmFtZSksIHdlaWdodCA9IF9kLndlaWdodCwgaXNJdGFsaWMgPSBfZC5pc0l0YWxpYztcclxuICAgIHZhciBmb250U2l6ZSA9IE51bWJlcigoX2EgPSBub2RlLmZvbnRTaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSk7IC8vIHRvU3RyaW5nIGlzIG5lZWRlZCB0byBjb252ZXJ0IFN5bWJvbHMgaW50byBzdHJpbmcgZmlyc3QgKGkgdGhpbmspXHJcbiAgICB2YXIgZm9udEZhbWlseSA9IChfYiA9IG5vZGUuZm9udE5hbWUuZmFtaWx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9TdHJpbmcoKTtcclxuICAgIHZhciBsaW5lSGVpZ2h0U3RyID0gbGluZUhlaWdodChub2RlKTtcclxuICAgIHZhciBzaG9ydGhhbmQgPSBmb250U2hvcnRoYW5kKHtcclxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0U3RyLFxyXG4gICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcclxuICAgICAgICBmb250RmFtaWx5OiBmb250RmFtaWx5LFxyXG4gICAgICAgIGlzSXRhbGljOiBpc0l0YWxpY1xyXG4gICAgfSk7XHJcbiAgICBpZiAobm9kZS50ZXh0U3R5bGVJZCkge1xyXG4gICAgICAgIHZhciBzdHlsZU5hbWUgPSAoMCwgaGVscGVyc18xLmNsZWFuU3R5bGVOYW1lKSgoX2MgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS50ZXh0U3R5bGVJZC50b1N0cmluZygpKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBcImZvbnQ6IHZhcigtLVwiLmNvbmNhdChzdHlsZU5hbWUsIFwiLCBcIikuY29uY2F0KHNob3J0aGFuZCwgXCIpO1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcImZvbnQ6IFwiLmNvbmNhdChzaG9ydGhhbmQsIFwiO1wiKTtcclxufVxyXG5leHBvcnRzLmZvbnRQcm9wID0gZm9udFByb3A7XHJcbmZ1bmN0aW9uIHRleHRUcmFuc2Zvcm1Qcm9wKG5vZGUpIHtcclxuICAgIHZhciBjYXNlTWFwID0ge1xyXG4gICAgICAgIFVQUEVSOiBcInVwcGVyY2FzZVwiLFxyXG4gICAgICAgIExPV0VSOiBcImxvd2VyY2FzZVwiXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGNhc2VNYXBbbm9kZS50ZXh0Q2FzZV1cclxuICAgICAgICA/IFwidGV4dC10cmFuc2Zvcm06IFwiLmNvbmNhdChjYXNlTWFwW25vZGUudGV4dENhc2VdLCBcIjtcIilcclxuICAgICAgICA6IFwiXCI7XHJcbn1cclxuZXhwb3J0cy50ZXh0VHJhbnNmb3JtUHJvcCA9IHRleHRUcmFuc2Zvcm1Qcm9wO1xyXG5mdW5jdGlvbiB0ZXh0RGVjb3JhdGlvblByb3Aobm9kZSkge1xyXG4gICAgaWYgKCFub2RlLnRleHREZWNvcmF0aW9uKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIGRlY29NYXAgPSB7XHJcbiAgICAgICAgU1RSSUtFVEhST1VHSDogXCJsaW5lLXRocm91Z2hcIixcclxuICAgICAgICBVTkRFUkxJTkU6IFwidW5kZXJsaW5lXCJcclxuICAgIH07XHJcbiAgICByZXR1cm4gZGVjb01hcFtub2RlLnRleHREZWNvcmF0aW9uXVxyXG4gICAgICAgID8gXCJ0ZXh0LWRlY29yYXRpb246IFwiLmNvbmNhdChkZWNvTWFwW25vZGUudGV4dERlY29yYXRpb25dLCBcIjtcIilcclxuICAgICAgICA6IFwiXCI7XHJcbn1cclxuZXhwb3J0cy50ZXh0RGVjb3JhdGlvblByb3AgPSB0ZXh0RGVjb3JhdGlvblByb3A7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLmdldFN0eWxlcyA9IHZvaWQgMDtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XHJcbnZhciBjc3NQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9jc3NQcm9wZXJ0aWVzXCIpO1xyXG5mdW5jdGlvbiBnZXRTdHlsZXMoZmlnbWEpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICB2YXIgcGFpbnRTdHlsZXMgPSAoX2EgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBwYWludHMgPSBfYS5wYWludHM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkobmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiAoMCwgY3NzUHJvcGVydGllc18xLmdldENvbG9yKShwYWludHMgPT09IG51bGwgfHwgcGFpbnRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYWludHNbMF0sIGZhbHNlKVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHZhciB0ZXh0U3R5bGVzID0gKF9iID0gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICB2YXIgX2MgPSAoMCwgY3NzUHJvcGVydGllc18xLmZvbnRTdHlsZUFzT2JqZWN0KShzdHlsZS5mb250TmFtZSksIHdlaWdodCA9IF9jLndlaWdodCwgaXNJdGFsaWMgPSBfYy5pc0l0YWxpYztcclxuICAgICAgICB2YXIgZm9udFNpemUgPSAoX2EgPSBzdHlsZS5mb250U2l6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIGZvbnRGYW1pbHkgPSAoX2IgPSBzdHlsZS5mb250TmFtZS5mYW1pbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1N0cmluZygpO1xyXG4gICAgICAgIHZhciBsaW5lSGVpZ2h0U3RyID0gKDAsIGNzc1Byb3BlcnRpZXNfMS5saW5lSGVpZ2h0KShzdHlsZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogKDAsIGhlbHBlcnNfMS5jbGVhblN0eWxlTmFtZSkoc3R5bGUubmFtZSksXHJcbiAgICAgICAgICAgIHZhbHVlOiAoMCwgY3NzUHJvcGVydGllc18xLmZvbnRTaG9ydGhhbmQpKHtcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRTdHIsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IGZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBpc0l0YWxpYzogaXNJdGFsaWNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhaW50U3R5bGVzOiBwYWludFN0eWxlcyxcclxuICAgICAgICB0ZXh0U3R5bGVzOiB0ZXh0U3R5bGVzXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZ2V0U3R5bGVzID0gZ2V0U3R5bGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxuZXhwb3J0cy5nZXRUcmFuc2Zvcm1zID0gZXhwb3J0cy53aWxsQmVSZW5kZXJlZEFzU1ZHID0gZXhwb3J0cy5hbGxDaGlsZHJlbkFyZVZlY3RvciA9IGV4cG9ydHMuY2xlYW5OdW1iZXIgPSBleHBvcnRzLmNsZWFuU3R5bGVOYW1lID0gZXhwb3J0cy5tYWtlU2FmZUZvckNTUyA9IGV4cG9ydHMuZXNjYXBlSHRtbCA9IGV4cG9ydHMuY29sb3JBc0hleE9yUmdiYSA9IGV4cG9ydHMucmdiYUNvbG9yID0gZXhwb3J0cy5yZ2JUb0hleCA9IGV4cG9ydHMuY29tcG9uZW50VG8yNTUgPSBleHBvcnRzLmNvbXBvbmVudFRvSGV4ID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuZXhwb3J0cy5jb21wb25lbnRUb0hleCA9IGNvbXBvbmVudFRvSGV4O1xyXG5mdW5jdGlvbiBjb21wb25lbnRUbzI1NShjKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjICogMjU1KTtcclxufVxyXG5leHBvcnRzLmNvbXBvbmVudFRvMjU1ID0gY29tcG9uZW50VG8yNTU7XHJcbmZ1bmN0aW9uIHJnYlRvSGV4KHJnYikge1xyXG4gICAgaWYgKHR5cGVvZiByZ2IgIT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgdmFyIHIgPSByZ2IuciwgZyA9IHJnYi5nLCBiID0gcmdiLmIsIGEgPSByZ2IuYTtcclxuICAgIGlmICghYSkge1xyXG4gICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJnYlRvSGV4ID0gcmdiVG9IZXg7XHJcbmZ1bmN0aW9uIHJnYmFDb2xvcihvYmosIGEpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInJnYiBjb2xvciBtdXN0IGJlIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgciA9IG9iai5yLCBnID0gb2JqLmcsIGIgPSBvYmouYjtcclxuICAgIHJldHVybiBcInJnYmEoXCIuY29uY2F0KGNvbXBvbmVudFRvMjU1KHIpLCBcIiwgXCIpLmNvbmNhdChjb21wb25lbnRUbzI1NShnKSwgXCIsIFwiKS5jb25jYXQoY29tcG9uZW50VG8yNTUoYiksIFwiLCBcIikuY29uY2F0KGEudG9GaXhlZCgyKSwgXCIpXCIpO1xyXG59XHJcbmV4cG9ydHMucmdiYUNvbG9yID0gcmdiYUNvbG9yO1xyXG5mdW5jdGlvbiBjb2xvckFzSGV4T3JSZ2JhKGZpbGwpIHtcclxuICAgIGlmICghZmlsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb2xvckFzSGV4T3JSZ2JhIHdhcyBjYWxsZWQgd2l0aG91dCBmaWxsIG9iamVjdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsbC5vcGFjaXR5ICYmIGZpbGwub3BhY2l0eSA8IDEpIHtcclxuICAgICAgICByZXR1cm4gcmdiYUNvbG9yKGZpbGwuY29sb3IsIGZpbGwub3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmdiVG9IZXgoZmlsbC5jb2xvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5jb2xvckFzSGV4T3JSZ2JhID0gY29sb3JBc0hleE9yUmdiYTtcclxuZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcclxuICAgIHJldHVybiB1bnNhZmVcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XHJcbn1cclxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcclxuZnVuY3Rpb24gbWFrZVNhZmVGb3JDU1MobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvW15hLXowLTlfLV0vZywgZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBpZiAoYyA9PSAzMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgIGlmIChjID49IDY1ICYmIGMgPD0gOTApXHJcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5tYWtlU2FmZUZvckNTUyA9IG1ha2VTYWZlRm9yQ1NTO1xyXG5mdW5jdGlvbiBjbGVhblN0eWxlTmFtZShuYW1lKSB7XHJcbiAgICAvL2NvbnN0IG5hbWVBcnIgPSBuYW1lLnNwbGl0KFwiL1wiKTtcclxuICAgIC8vcmV0dXJuIG1ha2VTYWZlRm9yQ1NTKG5hbWVBcnJbbmFtZUFyci5sZW5ndGggLSAxXS50cmltKCkpO1xyXG4gICAgaWYgKCFuYW1lKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJldHVybiBtYWtlU2FmZUZvckNTUyhuYW1lLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcclxufVxyXG5leHBvcnRzLmNsZWFuU3R5bGVOYW1lID0gY2xlYW5TdHlsZU5hbWU7XHJcbmZ1bmN0aW9uIGNsZWFuTnVtYmVyKG4pIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KG4udG9GaXhlZCgyKSk7XHJcbn1cclxuZXhwb3J0cy5jbGVhbk51bWJlciA9IGNsZWFuTnVtYmVyO1xyXG5mdW5jdGlvbiBhbGxDaGlsZHJlbkFyZVZlY3Rvcihub2RlKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHZhciB2ZWN0b3JUeXBlcyA9IFtcIlZFQ1RPUlwiLCBcIkJPT0xFQU5fT1BFUkFUSU9OXCJdO1xyXG4gICAgcmV0dXJuICgoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwICYmXHJcbiAgICAgICAgKChfYiA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIHZlY3RvclR5cGVzLmluY2x1ZGVzKG4udHlwZSk7IH0pLmxlbmd0aCkgPT09XHJcbiAgICAgICAgICAgICgoX2MgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGVuZ3RoKSk7XHJcbn1cclxuZXhwb3J0cy5hbGxDaGlsZHJlbkFyZVZlY3RvciA9IGFsbENoaWxkcmVuQXJlVmVjdG9yO1xyXG5mdW5jdGlvbiB3aWxsQmVSZW5kZXJlZEFzU1ZHKG5vZGUpIHtcclxuICAgIHJldHVybiAoYWxsQ2hpbGRyZW5BcmVWZWN0b3Iobm9kZSkgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiVkVDVE9SXCIgfHxcclxuICAgICAgICBub2RlLnR5cGUgPT09IFwiQk9PTEVBTl9PUEVSQVRJT05cIik7XHJcbn1cclxuZXhwb3J0cy53aWxsQmVSZW5kZXJlZEFzU1ZHID0gd2lsbEJlUmVuZGVyZWRBc1NWRztcclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIHJlbGV2YW50IHRyYW5zZm9ybWF0aW9uIGluZm9ybWF0aW9uIGZyb20gYSAoZmlnbWEpIHRyYW5zZm9ybSBtYXRyaXhcclxuICovXHJcbmZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoZm0pIHtcclxuICAgIC8vIGFueXRoaW5nIHdyb25nIHdpdGggdGhlIHRyYW5zZm9ybXM/IE5vdCBzdXJlIGlmIGkgc29ydGVkIGl0IHJpZ2h0IGhlcmUuLi5cclxuICAgIC8vY29uc3QgbSA9IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXSwgZm1bMF1bMl0sIGZtWzFdWzJdXTtcclxuICAgIHZhciBtID0gW2ZtWzBdWzBdLCBmbVswXVsxXSwgZm1bMV1bMF0sIGZtWzFdWzFdLCBmbVswXVsyXSwgZm1bMV1bMl1dO1xyXG4gICAgdmFyIG1hdHJpeCA9IHtcclxuICAgICAgICBhOiBtWzBdLFxyXG4gICAgICAgIGI6IG1bMV0sXHJcbiAgICAgICAgYzogbVsyXSxcclxuICAgICAgICBkOiBtWzNdLFxyXG4gICAgICAgIGU6IG1bNF0sXHJcbiAgICAgICAgZjogbVs1XVxyXG4gICAgfTtcclxuICAgIHZhciB0cmFuc2Zvcm1zID0gZGVjb21wb3NlTWF0cml4MkRXMyhtYXRyaXgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhbmdsZTogdHJhbnNmb3Jtcy5yb3RhdGVaLFxyXG4gICAgICAgIHNjYWxlWDogdHJhbnNmb3Jtcy5zY2FsZVgsXHJcbiAgICAgICAgc2NhbGVZOiB0cmFuc2Zvcm1zLnNjYWxlWSxcclxuICAgICAgICB0cmFuc2xhdGVYOiBtWzRdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG1bNV0sXHJcbiAgICAgICAgc3ZnTWF0cml4OiBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgIHN2Z01hdHJpeFdpdGhvdXRUcmFuc2xhdGU6IFtmbVswXVswXSwgZm1bMF1bMV0sIGZtWzFdWzBdLCBmbVsxXVsxXV0uam9pbihcIiBcIilcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5nZXRUcmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3JtcztcclxuZnVuY3Rpb24gZGVjb21wb3NlTWF0cml4MkRXMyhtKSB7XHJcbiAgICB2YXIgcm93MHggPSBtLmE7XHJcbiAgICB2YXIgcm93MHkgPSBtLmI7XHJcbiAgICB2YXIgcm93MXggPSBtLmM7XHJcbiAgICB2YXIgcm93MXkgPSBtLmQ7XHJcbiAgICB2YXIgc2NhbGVYID0gTWF0aC5zcXJ0KHJvdzB4ICogcm93MHggKyByb3cweSAqIHJvdzB5KTtcclxuICAgIHZhciBzY2FsZVkgPSBNYXRoLnNxcnQocm93MXggKiByb3cxeCArIHJvdzF5ICogcm93MXkpO1xyXG4gICAgLy8gSWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIG9uZSBheGlzIHdhcyBmbGlwcGVkLlxyXG4gICAgdmFyIGRldGVybWluYW50ID0gcm93MHggKiByb3cxeSAtIHJvdzB5ICogcm93MXg7XHJcbiAgICBpZiAoZGV0ZXJtaW5hbnQgPCAwKVxyXG4gICAgICAgIGlmIChyb3cweCA8IHJvdzF5KVxyXG4gICAgICAgICAgICAvLyBGbGlwIGF4aXMgd2l0aCBtaW5pbXVtIHVuaXQgdmVjdG9yIGRvdCBwcm9kdWN0LlxyXG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcclxuICAgIC8vIFJlbm9ybWFsaXplIG1hdHJpeCB0byByZW1vdmUgc2NhbGUuXHJcbiAgICBpZiAoc2NhbGVYKSB7XHJcbiAgICAgICAgcm93MHggKj0gMSAvIHNjYWxlWDtcclxuICAgICAgICByb3cweSAqPSAxIC8gc2NhbGVYO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlWSkge1xyXG4gICAgICAgIHJvdzF4ICo9IDEgLyBzY2FsZVk7XHJcbiAgICAgICAgcm93MXkgKj0gMSAvIHNjYWxlWTtcclxuICAgIH1cclxuICAgIC8vIENvbXB1dGUgcm90YXRpb24gYW5kIHJlbm9ybWFsaXplIG1hdHJpeC5cclxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocm93MHksIHJvdzB4KTtcclxuICAgIGlmIChhbmdsZSkge1xyXG4gICAgICAgIC8vIFJvdGF0ZSgtYW5nbGUpID0gW2NvcyhhbmdsZSksIHNpbihhbmdsZSksIC1zaW4oYW5nbGUpLCBjb3MoYW5nbGUpXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgID0gW3JvdzB4LCAtcm93MHksIHJvdzB5LCByb3cweF1cclxuICAgICAgICAvLyBUaGFua3MgdG8gdGhlIG5vcm1hbGl6YXRpb24gYWJvdmUuXHJcbiAgICAgICAgdmFyIHNuID0gLXJvdzB5O1xyXG4gICAgICAgIHZhciBjcyA9IHJvdzB4O1xyXG4gICAgICAgIHZhciBtMTEgPSByb3cweDtcclxuICAgICAgICB2YXIgbTEyID0gcm93MHk7XHJcbiAgICAgICAgdmFyIG0yMSA9IHJvdzF4O1xyXG4gICAgICAgIHZhciBtMjIgPSByb3cxeTtcclxuICAgICAgICByb3cweCA9IGNzICogbTExICsgc24gKiBtMjE7XHJcbiAgICAgICAgcm93MHkgPSBjcyAqIG0xMiArIHNuICogbTIyO1xyXG4gICAgICAgIHJvdzF4ID0gLXNuICogbTExICsgY3MgKiBtMjE7XHJcbiAgICAgICAgcm93MXkgPSAtc24gKiBtMTIgKyBjcyAqIG0yMjtcclxuICAgIH1cclxuICAgIG0xMSA9IHJvdzB4O1xyXG4gICAgbTEyID0gcm93MHk7XHJcbiAgICBtMjEgPSByb3cxeDtcclxuICAgIG0yMiA9IHJvdzF5O1xyXG4gICAgLy8gQ29udmVydCBpbnRvIGRlZ3JlZXMgYmVjYXVzZSBvdXIgcm90YXRpb24gZnVuY3Rpb25zIGV4cGVjdCBpdC5cclxuICAgIGFuZ2xlID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAvLyBUaGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMgYXJlIHRoZW4gdGhldGEsXHJcbiAgICAvLyBzeCwgc3ksIHBoaSxcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNsYXRlWDogbS5lLFxyXG4gICAgICAgIHRyYW5zbGF0ZVk6IG0uZixcclxuICAgICAgICByb3RhdGVaOiBhbmdsZSxcclxuICAgICAgICBzY2FsZVg6IHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk6IHNjYWxlWSxcclxuICAgICAgICBtYXRyaXg6IFttMTEsIG0xMiwgbTIxLCBtMjIsIDAsIDBdXHJcbiAgICB9O1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKlxyXG5UaGlzIGZpbGUgdHJpZXMgdG8gY29udmVydCBmaWdtYSBpbnRvIHRhaWx3aW5kLlxyXG5JdCB0cmllcyB0byBpbnRlcnByZXQgdGhlIGNzcyBhbHJlYWR5IGdlbmVyYXRlZCBmcm9tIHRoaXMgcGx1Z2luIGFzIHRhaWx3aW5kIGNsYXNzZXMuXHJcblRoaXMgd2lsbCBuZXZlciB3b3JrIHBlcmZlY3RseSBidXQgbWF5IHByb3ZpZGUgYSBzdGFydGluZyBwb2ludCBmb3IgZGV2ZWxvcG1lbnQuXHJcbiovXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5leHBvcnRzLnRhaWx3aW5kID0gdm9pZCAwO1xyXG52YXIgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XHJcbnZhciBzaXplc01hcCA9IHtcclxuICAgIFwiMHB4XCI6IDAsXHJcbiAgICBcIjFweFwiOiBcInB4XCIsXHJcbiAgICBcIjJweFwiOiAwLjUsXHJcbiAgICBcIjRweFwiOiAxLFxyXG4gICAgXCI2cHhcIjogMS41LFxyXG4gICAgXCI4cHhcIjogMixcclxuICAgIFwiMTBweFwiOiAyLjUsXHJcbiAgICBcIjEycHhcIjogMyxcclxuICAgIFwiMTRweFwiOiAzLjUsXHJcbiAgICBcIjE2cHhcIjogNCxcclxuICAgIFwiMjBweFwiOiA1LFxyXG4gICAgXCIyNHB4XCI6IDZcclxufTtcclxudmFyIGZsZXhEaXJlY3Rpb25NYXAgPSB7XHJcbiAgICByb3c6IFwicm93XCIsXHJcbiAgICBjb2x1bW46IFwiY29sXCJcclxufTtcclxudmFyIHR3TWFwID0ge1xyXG4gICAgcGFkZGluZzogc2l6ZXNNYXAsXHJcbiAgICBnYXA6IHNpemVzTWFwLFxyXG4gICAgdG9wOiBzaXplc01hcCxcclxuICAgIGxlZnQ6IHNpemVzTWFwLFxyXG4gICAgXCJmbGV4LWRpcmVjdGlvblwiOiBmbGV4RGlyZWN0aW9uTWFwLFxyXG4gICAgXCJib3JkZXItcmFkaXVzXCI6IHtcclxuICAgICAgICBcIjBweFwiOiBcIm5vbmVcIixcclxuICAgICAgICBcIjJweFwiOiBcInNtXCIsXHJcbiAgICAgICAgXCI0cHhcIjogXCJcIixcclxuICAgICAgICBcIjZweFwiOiBcIm1kXCIsXHJcbiAgICAgICAgXCI4cHhcIjogXCJsZ1wiLFxyXG4gICAgICAgIFwiMTJweFwiOiBcInhsXCIsXHJcbiAgICAgICAgXCIxNnB4XCI6IFwiMnhsXCIsXHJcbiAgICAgICAgXCIyNHB4XCI6IFwiM3hsXCIsXHJcbiAgICAgICAgXCI5OTk5cHhcIjogXCJmdWxsXCJcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7IHRyYW5zcGFyZW50OiBcInRyYW5zcGFyZW50XCIgfSxcclxuICAgIFwianVzdGlmeS1jb250ZW50XCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCJcclxuICAgIH0sXHJcbiAgICBcImFsaWduLWl0ZW1zXCI6IHtcclxuICAgICAgICBcImZsZXgtc3RhcnRcIjogXCJzdGFydFwiLFxyXG4gICAgICAgIFwiZmxleC1lbmRcIjogXCJlbmRcIixcclxuICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCJcclxuICAgIH0sXHJcbiAgICBcImFsaWduLXNlbGZcIjoge1xyXG4gICAgICAgIHN0cmV0Y2g6IFwic3RyZXRjaFwiXHJcbiAgICB9LFxyXG4gICAgb3ZlcmZsb3c6IHtcclxuICAgICAgICBoaWRkZW46IFwiaGlkZGVuXCJcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gdGFpbHdpbmQodHJlZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRoZUNoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZHJlbi5sZW5ndGgpID4gMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKGZ1bmN0aW9uICh0cmVlRWxlbWVudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0cmVlRWxlbWVudC50eXBlID09PSBcIlZFQ1RPUlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRWxlbWVudC50eXBlID09PSBcIkJPT0xFQU5fT1BFUkFUSU9OXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVFbGVtZW50LmFsbENoaWxkcmVuQXJlVmVjdG9yKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sICgwLCBjb2RlXzEuY3JlYXRlU1ZHKSh0cmVlRWxlbWVudC5vcmlnaW5hbE5vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFja3kuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5saW5lU3R5bGVzKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9jLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IFwiPGRpdiBjbGFzcz1cXFwiXCIuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlRWxlbWVudC5jc3MsIHRyZWVFbGVtZW50Lm9yaWdpbmFsTm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc05hbWVzLCBcIlxcXCIgc3R5bGU9XFxcIlwiKS5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWVFbGVtZW50LmNzcywgdHJlZUVsZW1lbnQub3JpZ2luYWxOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlubGluZVN0eWxlcywgXCJcXFwiPlxcblwiKS5jb25jYXQodHJlZUVsZW1lbnQuY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmVlRWxlbWVudC5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIiwgXCIgXCIpKS5jb25jYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoZUNoaWxkcmVuKHRyZWVFbGVtZW50LmNoaWxkcmVuKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2IuYXBwbHkoX2EsIFtfYy5zZW50KCksIFwiXFxuPC9kaXY+XCJdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGwgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgYWxsLmpvaW4oXCJcIildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBcIlwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBodG1sLCBfYSwgX2IsIF9jO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2QpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfZC5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRyZWUudHlwZSA9PT0gXCJWRUNUT1JcIiB8fCB0cmVlLmFsbENoaWxkcmVuQXJlVmVjdG9yKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgKDAsIGNvZGVfMS5jcmVhdGVTVkcpKHRyZWUub3JpZ2luYWxOb2RlLCBcIlwiLmNvbmNhdCh0YWlsd2luZENsYXNzTmFtZXModHJlZS5jc3MsIHRyZWUub3JpZ2luYWxOb2RlKS5jbGFzc05hbWVzLCBcIlxcXCIgc3R5bGU9XFxcIlwiKS5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuaW5saW5lU3R5bGVzKSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBfZC5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBodG1sO1xyXG4gICAgICAgICAgICAgICAgICAgIF9jID0gKF9iID0gXCI8ZGl2IGNsYXNzPVxcXCJcIi5jb25jYXQodGFpbHdpbmRDbGFzc05hbWVzKHRyZWUuY3NzLCB0cmVlLm9yaWdpbmFsTm9kZSkuY2xhc3NOYW1lcywgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KHRhaWx3aW5kQ2xhc3NOYW1lcyh0cmVlLmNzcywgdHJlZS5vcmlnaW5hbE5vZGUpLmlubGluZVN0eWxlcywgXCJcXFwiPlxcblwiKS5jb25jYXQodHJlZS5jaGFyYWN0ZXJzID8gdHJlZS5jaGFyYWN0ZXJzLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCI8YnIgLz5cIikgOiBcIlwiLCBcIiBcIikpLmNvbmNhdDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGVDaGlsZHJlbih0cmVlLmNoaWxkcmVuKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IF9hICsgX2MuYXBwbHkoX2IsIFtfZC5zZW50KCksIFwiXFxuPC9kaXY+XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCBodG1sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy50YWlsd2luZCA9IHRhaWx3aW5kO1xyXG5mdW5jdGlvbiB0YWlsd2luZENsYXNzTmFtZXMoY3NzLCBub2RlKSB7XHJcbiAgICB2YXIgY3NzTGluZUJ5TGluZSA9IGNzc1xyXG4gICAgICAgIC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudHJpbSgpOyB9KVxyXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgIT09IFwiXCI7IH0pO1xyXG4gICAgdmFyIGtleVZhbHVlUGFpcnMgPSBjc3NMaW5lQnlMaW5lLm1hcChmdW5jdGlvbiAobGluZSkge1xyXG4gICAgICAgIHZhciBfYSA9IGxpbmUuc3BsaXQoXCI6XCIpLCBrZXkgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtleS50cmltKCksIHZhbHVlOiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudHJpbSgpIH07XHJcbiAgICB9KTtcclxuICAgIHZhciBjc3NQcm9wc01hcCA9IHtcclxuICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCJyb3VuZGVkXCIsXHJcbiAgICAgICAgd2lkdGg6IFwid1wiLFxyXG4gICAgICAgIGhlaWdodDogXCJoXCIsXHJcbiAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwidGV4dFwiLFxyXG4gICAgICAgIFwiZmxleC1kaXJlY3Rpb25cIjogXCJmbGV4XCIsXHJcbiAgICAgICAgcG9zaXRpb246IFwiXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJcIixcclxuICAgICAgICBmbGV4OiBcImZsZXhcIixcclxuICAgICAgICBnYXA6IFwiZ2FwXCIsXHJcbiAgICAgICAgdG9wOiBcInRvcFwiLFxyXG4gICAgICAgIGxlZnQ6IFwibGVmdFwiLFxyXG4gICAgICAgIFwianVzdGlmeS1jb250ZW50XCI6IFwianVzdGlmeVwiLFxyXG4gICAgICAgIFwiYWxpZ24taXRlbXNcIjogXCJpdGVtc1wiLFxyXG4gICAgICAgIFwiYWxpZ24tc2VsZlwiOiBcInNlbGZcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJvdmVyZmxvd1wiXHJcbiAgICB9O1xyXG4gICAgLy8gdGhlc2Ugd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSBub2RlIG9yIGFyZSBub3QgbmVlZGVkIGF0IGFsbFxyXG4gICAgdmFyIGV4Y2x1ZGVMaXN0ID0gW1wicGFkZGluZ1wiLCBcIm1hcmdpblwiLCBcImJveC1zaXppbmdcIl07XHJcbiAgICB2YXIgaW5saW5lU3R5bGVzID0gW107XHJcbiAgICB2YXIgY2xhc3NOYW1lcyA9IGtleVZhbHVlUGFpcnMubWFwKGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYS5rZXksIHZhbHVlID0gX2EudmFsdWU7XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVMaXN0LmluY2x1ZGVzKGtleSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciB0d1ZhbHVlID0gbG9va1VwVGFpbHdpbmRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB2YXIgdHdLZXkgPSBjc3NQcm9wc01hcFtrZXldO1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlubGluZVN0eWxlcy5wdXNoKFwiXCIuY29uY2F0KGtleSwgXCI6IFwiKS5jb25jYXQodmFsdWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGZvciBwcm9wcyBsaWtlIGRpc3BsYXkgZXRjLiAqL1xyXG4gICAgICAgIGlmICh0d0tleSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR3S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3R3S2V5LCB0d1ZhbHVlXS5qb2luKFwiLVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gcGFkZGluZywgZm9udFNpemUgZXRjLlxyXG4gICAgdmFyIGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlID0gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lc1xyXG4gICAgICAgICAgICAuY29uY2F0KGNsYXNzTmFtZXNEaXJlY3RseUV4dHJhY3RlZEZyb21Ob2RlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBudWxsOyB9KVxyXG4gICAgICAgICAgICAuam9pbihcIiBcIiksXHJcbiAgICAgICAgaW5saW5lU3R5bGVzOiBpbmxpbmVTdHlsZXMuam9pbihcIjsgXCIpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGxvb2tVcFRhaWx3aW5kVmFsdWUocHJvcEtleSwgdmFsdWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHZhciB2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZSA9IFtcImRpc3BsYXlcIiwgXCJwb3NpdGlvblwiLCBcInRleHQtYWxpZ25cIiwgXCJmbGV4XCJdO1xyXG4gICAgdmFyIHR3VmFsdWUgPSAoX2EgPSB0d01hcFtwcm9wS2V5XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ZhbHVlXTtcclxuICAgIGlmICh2YWx1ZXNOb3ROZWVkZWRUb0NoYW5nZS5pbmNsdWRlcyhwcm9wS2V5KSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh0d1ZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gXCJbXCIuY29uY2F0KHZhbHVlLCBcIl1cIik7XHJcbiAgICB9XHJcbiAgICBpZiAodHdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR3VmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdENsYXNzTmFtZXNGcm9tTm9kZShub2RlKSB7XHJcbiAgICB2YXIgY2xhc3NOYW1lcyA9IFtdO1xyXG4gICAgLyogcGFkZGluZ3MgKi9cclxuICAgIGlmIChub2RlLnBhZGRpbmdMZWZ0KSB7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdzXzEgPSBbXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICAgIG5vZGUucGFkZGluZ0JvdHRvbSxcclxuICAgICAgICAgICAgbm9kZS5wYWRkaW5nTGVmdCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChwYWRkaW5nc18xLmV2ZXJ5KGZ1bmN0aW9uIChwKSB7IHJldHVybiBwID09PSBwYWRkaW5nc18xWzBdOyB9KSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goXCJwLVwiLmNvbmNhdChsb29rVXBUYWlsd2luZFZhbHVlKFwicGFkZGluZ1wiLCBwYWRkaW5nc18xWzBdICsgXCJweFwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbl8xID0gW1widFwiLCBcInJcIiwgXCJiXCIsIFwibFwiXTtcclxuICAgICAgICAgICAgcGFkZGluZ3NfMS5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goXCJwXCIuY29uY2F0KGRpcmVjdGlvbl8xW2ldLCBcIi1cIikuY29uY2F0KGxvb2tVcFRhaWx3aW5kVmFsdWUoXCJwYWRkaW5nXCIsIHAgKyBcInB4XCIpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIHBhZGRpbmdzIGVuZCAqL1xyXG4gICAgcmV0dXJuIGNsYXNzTmFtZXM7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=