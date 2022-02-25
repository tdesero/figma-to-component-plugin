

/* helpers */
function componentToHex(c): String {
  var hex = Math.round(c * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function componentTo255(c) {
  return Math.round(c * 255);
}

function rgbToHex(rgb): String {
  if (typeof rgb !== 'object') return;
  const {r, g, b, a} = rgb;

  if (!a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
}

function rgbaColor({r, g, b}, a) {
  return `rgba(${componentTo255(r)}, ${componentTo255(g)}, ${componentTo255(b)}, ${a})`;
}

function escapeHtml(unsafe): String {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function makeSafeForCSS(name) {
  return name.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return s.toLowerCase();
      return '-';
  });
}
/* helpers end */

/* css props helpers */
function borderProp(node) {
  if (!node.strokes || !node.strokeWeight || node.strokes.length < 1) return '';

  return `border: ${node.strokeWeight}px solid ${node.strokes[0].opacity < 1 ? rgbaColor(node.strokes[0].color, node.strokes[0].opacity) : rgbToHex(node.strokes[0].color)};`
}

function paddingProp(node) {
  if (!node.paddingTop) return '';

  return `padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`
}

function displayProp(node) {
  const coord = node.id === figma.currentPage.selection[0].id ? '' : `left: ${node.x}px; top: ${node.y}px;`;

  if (!node.layoutMode || (node.layoutMode === 'NONE')) return `
    height: ${node.type === 'TEXT' ? 'auto' : node.height + 'px'};
    width: ${node.type === 'TEXT' ? 'auto' : node.width + 'px'};
    position: ${(node.parent.layoutMode === 'NONE' && !(node.id === figma.currentPage.selection[0].id)) ? 'absolute' : 'static'};
    ${coord}
  `;

  const alignItemsMap = {
    "MIN": 'start',
    "MAX":  'end',
    "CENTER": 'center',
    "SPACE_BETWEEN":  'space-between'
  }

  const justifyContentMap = {
    "MIN": 'flex-start',
    "MAX":  'flex-end',
    "CENTER": 'center',
    "SPACE_BETWEEN":  'space-between'
  }

  if (node.layoutMode === 'VERTICAL'){
    return `
      display: flex;
      position: ${["FRAME", "COMPONENT", "INSTANCE"].includes(node.type) ? 'relative' : 'static'};
      flex-direction: column;
      gap: ${node.itemSpacing}px;
      height: ${node.primaryAxisSizingMode === 'AUTO' ? 'auto' : node.height + 'px'};
      width: ${node.counterAxisSizingMode === 'AUTO' ? 'auto' : node.width + 'px'};
      align-items: ${alignItemsMap[node.counterAxisAlignItems]};
      justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
    `
  }

  if (node.layoutMode === 'HORIZONTAL'){
    return `
      display: flex;
      position: relative;
      flex-direction: row;
      gap: ${node.itemSpacing}px;
      width: ${node.primaryAxisSizingMode === 'AUTO' ? 'auto' : node.width + 'px'};
      height: ${node.counterAxisSizingMode === 'AUTO' ? 'auto' : node.height + 'px'};
      align-items: ${alignItemsMap[node.counterAxisAlignItems]};
      justify-content: ${justifyContentMap[node.primaryAxisAlignItems]};
    `
  }
}
/* css props helepers end */

function nodeCSS(node) {
  console.log(node);

  if (node.type === 'TEXT') {
    return `
      color: ${node.fills?.[0]?.opacity < 1 ? rgbaColor(node.fills?.[0]?.color, node.fills?.[0]?.opacity) : rgbToHex(node.fills?.[0]?.color)};
      font-size: ${node.fontSize}px;
      font-family: ${node.fontName.family};
      font-weight: ${node.fontName.style};
      opacity: ${node.opacity};
      ${displayProp(node)}
      margin: 0;
    `
  } else {
    return `
      box-sizing: border-box;
      background-color: ${node.fills?.[0]?.opacity < 1 ? rgbaColor(node.fills?.[0]?.color, node.fills?.[0]?.opacity) : rgbToHex(node.fills?.[0]?.color)};
      border-radius: ${node.cornerRadius}px;
      ${borderProp(node)}
      opacity: ${node.opacity};
      ${paddingProp(node)}
      ${displayProp(node)}
      margin: 0;
    `
  }
  
}

var subClasses = [] //make sure there arent same css classes

function checkIfClassExists(className) {
  console.log(subClasses)
  if (subClasses.includes(className)) {
    className = className + '0';
    return checkIfClassExists(className);
  } else {
    subClasses.push(className);
    return className;
  }
}

function createCSS() {
  let css = '';
  let componentName = 'component';
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('Nothing selected', {error: true});
    return;
  }

  if (selection.length > 1) {
    figma.notify('Select only 1 Component',{error: true});
    return;
  }

  const frame = selection[0];
  componentName = makeSafeForCSS(frame.name);
  css += `.${componentName} {\n ${nodeCSS(frame)}}\n`;
  if (frame.children?.length > 0) {
    theChildren(frame.children);
  }

  function theChildren(children) {
    children.forEach( frame => {
      css += `.${componentName}__${checkIfClassExists(makeSafeForCSS(frame.name))} {${nodeCSS(frame)}}\n`;
      if (frame.children?.length > 0) {
        theChildren(frame.children);
      }
    })
  }

  return css;
}

function createHTML() {
  let html = '';
  let componentName = 'component';
  const selection = figma.currentPage.selection;
  const frame = selection[0];
  componentName = makeSafeForCSS(frame.name);

  let i = 0; // used to iterate through classes...

  function childrenEl(frame) {
    if (frame.children?.length > 0) {
      return theChildren(frame.children);
    } else {
      return '';
    }
  }

  function theChildren(children) {
    return children.map( (frame) => {
      i++;
      return `<div class="${componentName}__${subClasses[i - 1]}">\n${frame.characters ? frame.characters : ''} ${childrenEl(frame)}\n</div>`;
    }).join('');
  }

  html += `<div class="${componentName}">\n${childrenEl(frame)}\n</div>`;

  return html;
}


figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case 'framework':
      const frameworks = ['react', 'html']
      result.setSuggestions(frameworks.filter(s => s.includes(query)))
      break
    default:
      return
  }
})

figma.on('run', ({ command, parameters }: RunEvent) => {
  console.log(command, parameters);
  figma.showUI(__html__);
  figma.ui.postMessage({
    css: createCSS(),
    html: createHTML(),
    framework: parameters.framework
  });
});

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();
