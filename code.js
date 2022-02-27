/* helpers */
function componentToHex(c) {
    var hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function componentTo255(c) {
    return Math.round(c * 255);
}
function rgbToHex(rgb) {
    if (typeof rgb !== 'object')
        return;
    const { r, g, b, a } = rgb;
    if (!a) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}
function rgbaColor({ r, g, b }, a) {
    return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(b)}, ${a})`;
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
            return '-';
        if (c >= 65 && c <= 90)
            return s.toLowerCase();
        return '-';
    });
}
/* helpers end */
/* css props helpers */
function borderProp(node) {
    if (!node.strokes || !node.strokeWeight || node.strokes.length < 1)
        return '';
    return `border: ${node.strokeWeight}px solid ${node.strokes[0].opacity < 1 ? rgbaColor(node.strokes[0].color, node.strokes[0].opacity) : rgbToHex(node.strokes[0].color)};`;
}
function paddingProp(node) {
    if (!node.paddingTop)
        return '';
    return `padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`;
}
function displayProp(node) {
    const coord = node.id === figma.currentPage.selection[0].id ? '' : `left: ${node.x}px; top: ${node.y}px;`;
    const positionFromParent = (node) => {
        if (node.id === figma.currentPage.selection[0].id) {
            return 'relative';
        }
        return `${(node.parent.layoutMode === 'NONE' || !node.parent.layoutMode) ? `absolute; ${coord}` : 'relative'}`;
    };
    if (!node.layoutMode || (node.layoutMode === 'NONE'))
        return `
    height: ${node.type === 'TEXT' ? 'auto' : node.height + 'px'};
    width: ${node.type === 'TEXT' ? 'auto' : node.width + 'px'};
    position: ${positionFromParent(node)};
  `;
    const alignItemsMap = {
        "MIN": 'start',
        "MAX": 'end',
        "CENTER": 'center',
        "SPACE_BETWEEN": 'space-between'
    };
    const justifyContentMap = {
        "MIN": 'flex-start',
        "MAX": 'flex-end',
        "CENTER": 'center',
        "SPACE_BETWEEN": 'space-between'
    };
    if (node.layoutMode === 'VERTICAL') {
        // position: ${["FRAME", "COMPONENT", "INSTANCE"].includes(node.type) ? 'relative' : 'static'}; /* dont get this... */
        return `
      display: flex;
      position: relative;
      flex-direction: column;
      gap: ${node.itemSpacing}px;
      height: ${node.primaryAxisSizingMode === 'AUTO' ? 'auto' : node.height + 'px'};
      width: ${node.counterAxisSizingMode === 'AUTO' ? 'auto' : node.width + 'px'};
      align-items: ${alignItemsMap[node.counterAxisAlignItems]};
      justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
    `;
    }
    if (node.layoutMode === 'HORIZONTAL') {
        return `
      display: flex;
      position: relative;
      flex-direction: row;
      gap: ${node.itemSpacing}px;
      width: ${node.primaryAxisSizingMode === 'AUTO' ? 'auto' : node.width + 'px'};
      height: ${node.counterAxisSizingMode === 'AUTO' ? 'auto' : node.height + 'px'};
      align-items: ${alignItemsMap[node.counterAxisAlignItems]};
      justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
    `;
    }
}
function boxShadow(node) {
    if (!node.effects || node.effects.length === 0)
        return '';
    const shadows = node.effects.filter(effect => effect.type === 'DROP_SHADOW');
    if (shadows.length === 0)
        return '';
    let css = 'box-shadow: ';
    shadows.forEach(s => {
        css += `${s.offset.x}px ${s.offset.y}px ${s.radius}px ${s.spread}px ${rgbaColor(s.color, s.color.a)}`;
    });
    return css + ';';
}
function fontStyle(node) {
    var _a, _b, _c, _d;
    const isItalic = (_b = (_a = node.fontName) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('italic');
    const weightMap = {
        'thin': 100,
        'extra light': 200,
        'light': 300,
        'normal': 400,
        'regular': 400,
        'medium': 500,
        'semi bold': 600,
        'bold': 700,
        'extra bold': 800,
        'black': 900
    };
    const weight = (_d = (_c = node.fontName) === null || _c === void 0 ? void 0 : _c.style) === null || _d === void 0 ? void 0 : _d.toLowerCase().replace('italic', '').trim();
    return `font-weight: ${weightMap[weight]}; ${isItalic ? 'font-style: italic;' : ''}`;
}
/* css props helepers end */
function nodeCSS(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    console.log(node);
    if (node.type === 'TEXT') {
        return `
      color: ${((_b = (_a = node.fills) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.opacity) < 1 ? rgbaColor((_d = (_c = node.fills) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.color, (_f = (_e = node.fills) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.opacity) : rgbToHex((_h = (_g = node.fills) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.color)};
      font-size: ${node.fontSize}px;
      font-family: ${node.fontName.family};
      text-align: ${(_j = node.textAlignHorizontal) === null || _j === void 0 ? void 0 : _j.toLowerCase()};
      ${fontStyle(node)}
      opacity: ${node.opacity};
      ${displayProp(node)}
      margin: 0;
    `;
    }
    else {
        return `
      box-sizing: border-box;
      background-color: ${((_l = (_k = node.fills) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.opacity) < 1 ? rgbaColor((_o = (_m = node.fills) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.color, (_q = (_p = node.fills) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.opacity) : rgbToHex((_s = (_r = node.fills) === null || _r === void 0 ? void 0 : _r[0]) === null || _s === void 0 ? void 0 : _s.color)};
      border-radius: ${(typeof node.cornerRadius === "number") ? (node.cornerRadius + 'px') : `${node.topLeftRadius}px ${node.topRightRadius}px ${node.bottomRightRadius}px ${node.bottomLeftRadius}px`};
      ${borderProp(node)}
      opacity: ${node.opacity};
      ${paddingProp(node)}
      ${displayProp(node)}
      ${boxShadow(node)}
      margin: 0;
    `;
    }
}
var subClasses = []; //make sure there arent same css classes
function checkIfClassExists(className) {
    console.log(subClasses);
    if (subClasses.includes(className)) {
        className = className + '0';
        return checkIfClassExists(className);
    }
    else {
        subClasses.push(className);
        return className;
    }
}
function createCSS() {
    var _a;
    let css = '';
    let componentName = 'component';
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        figma.notify('Nothing selected', { error: true });
        return;
    }
    if (selection.length > 1) {
        figma.notify('Select only 1 Component', { error: true });
        return;
    }
    const frame = selection[0];
    componentName = makeSafeForCSS(frame.name);
    css += `.${componentName} {\n ${nodeCSS(frame)}}\n`;
    if (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        theChildren(frame.children);
    }
    function theChildren(children) {
        children.forEach(frame => {
            var _a;
            if (frame.type === 'VECTOR')
                return;
            css += `.${componentName}__${checkIfClassExists(makeSafeForCSS(frame.name))} {${nodeCSS(frame)}}\n`;
            if (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                theChildren(frame.children);
            }
        });
    }
    return css;
}
function createSVG(frame) {
    var _a, _b, _c, _d, _e, _f;
    const paths = (_a = frame.vectorPaths) === null || _a === void 0 ? void 0 : _a.map(p => {
        return `<path d="${p.data}"  />`;
    });
    return `<svg width="${frame.width}" height="${frame.height}" stroke-width="${frame.strokeWeight}" stroke="${rgbToHex((_c = (_b = frame.strokes) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.color)}" fill="${((_d = frame.fills) === null || _d === void 0 ? void 0 : _d.length) === 0 ? 'none' : rgbToHex((_f = (_e = frame.fills) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.color)}">
    ${paths.join('')}
  </svg>`;
}
function createHTML() {
    let html = '';
    let componentName = 'component';
    const selection = figma.currentPage.selection;
    const frame = selection[0];
    componentName = makeSafeForCSS(frame.name);
    let i = 0; // used to iterate through classes...
    function childrenEl(frame) {
        var _a;
        if (((_a = frame.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return theChildren(frame.children);
        }
        else {
            return '';
        }
    }
    function theChildren(children) {
        return children.map((frame) => {
            if (frame.type === 'VECTOR') {
                return createSVG(frame);
            }
            ;
            i++;
            return `<div class="${componentName}__${subClasses[i - 1]}">\n${frame.characters ? frame.characters : ''} ${childrenEl(frame)}\n</div>`;
        }).join('');
    }
    if (frame.type === 'VECTOR') {
        // Is a Vector able to have children?
        html = createSVG(frame);
    }
    else {
        html += `<div class="${componentName}">\n${childrenEl(frame)}\n</div>`;
    }
    return html;
}
figma.parameters.on('input', ({ parameters, key, query, result }) => {
    switch (key) {
        case 'framework':
            const frameworks = ['react', 'html'];
            result.setSuggestions(frameworks.filter(s => s.includes(query)));
            break;
        default:
            return;
    }
});
figma.on('run', ({ command, parameters }) => {
    var _a, _b, _c;
    console.log(command, parameters);
    figma.showUI(__html__, { height: 800, width: 600 });
    figma.ui.postMessage({
        css: createCSS(),
        html: createHTML(),
        framework: parameters.framework,
        name: (_c = (_b = (_a = figma.currentPage) === null || _a === void 0 ? void 0 : _a.selection) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name
    });
});
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();
