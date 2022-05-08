(()=>{"use strict";var e={60480:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0;var a,i=n(96804),l=n(20675),c=n(32430),u=n(64242),s=n(46150),d=n(95601);function f(e,t){return r(this,void 0,void 0,(function(){var e,n,r;return o(this,(function(o){switch(o.label){case 0:return e=(0,c.createTree)(figma.currentPage.selection),console.log(e),n=t.framework===d.PARAMETERS.FRAMEWORKS.TAILWIND?"-":(0,u.printCSS)(e),t.framework!==d.PARAMETERS.FRAMEWORKS.TAILWIND?[3,2]:[4,(0,l.tailwind)(e)];case 1:return r=o.sent(),[3,4];case 2:return[4,(0,s.printHTML)(e)];case 3:r=o.sent(),o.label=4;case 4:return[2,{html:r,css:n}]}}))}))}function p(e){var t,n,a;return r(this,void 0,void 0,(function(){var r,l,c;return o(this,(function(o){switch(o.label){case 0:return 0===figma.currentPage.selection.length?(figma.ui.postMessage({loading:!1,notification:"Select a layer."}),[2]):figma.currentPage.selection.length>1?(figma.ui.postMessage({loading:!1,notification:"Select only one layer."}),[2]):[4,f(figma.currentPage.selection,e)];case 1:return r=o.sent(),l=r.html,c=r.css,figma.ui.postMessage({loading:!1,notification:!1,css:c,html:l,framework:e.framework,styles:(0,i.getStyles)(figma),name:null===(a=null===(n=null===(t=figma.currentPage)||void 0===t?void 0:t.selection)||void 0===n?void 0:n[0])||void 0===a?void 0:a.name}),[2]}}))}))}figma.parameters.on("input",(function(e){e.parameters;var t=e.key,n=e.query,r=e.result;if("framework"===t){var o=[d.PARAMETERS.FRAMEWORKS.HTML,d.PARAMETERS.FRAMEWORKS.REACT,d.PARAMETERS.FRAMEWORKS.TAILWIND];r.setSuggestions(o.filter((function(e){return e.includes(n)})))}})),figma.on("run",(function(e){e.command;var t=e.parameters;figma.showUI(__html__,{height:600,width:500}),p(a=t)})),figma.on("selectionchange",(function(){figma.ui.postMessage({loading:!0}),setTimeout((function(){p(a)}),100)}))},95601:(e,t)=>{t.__esModule=!0,t.PARAMETERS=void 0,t.PARAMETERS={FRAMEWORKS:{TAILWIND:"tailwind css (beta)",REACT:"react",HTML:"html"}}},91622:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0,t.createSVG=void 0,t.createSVG=function(e,t){return n(this,void 0,void 0,(function(){return r(this,(function(n){switch(n.label){case 0:return[4,e.exportAsync({format:"SVG",useAbsoluteBounds:!0}).then((function(e){return String.fromCharCode.apply(null,e).replace("<svg ",'<svg class="'.concat(t,'" '))})).catch((function(e){return console.error(e)}))];case 1:return[2,n.sent()]}}))}))}},32430:(e,t,n)=>{t.__esModule=!0,t.createTree=void 0;var r=n(81171),o=n(19654),a=n(59394),i=n(55354);t.createTree=function(e){var t,n,l=e[0],c="COMPONENT_SET"===l.type,u=c?l.defaultVariant:l;n=(0,r.makeSafeForCSS)(l.name);var s=function(e){var t=e.name,n=e.node,o=e.css,a=e.shortName,i=void 0===a?t:a,l=e.skipCss,c=void 0!==l&&l,u=e.baseSelector,s=void 0===u?"":u,d=e.isComponentSet,f=void 0!==d&&d;return{name:t,shortName:i,skipCss:c,css:o,willBeRenderedAsSVG:(0,r.willBeRenderedAsSVG)(n),children:[],type:n.type,characters:n.characters,originalNode:n,textSegments:[],baseSelector:s,variants:f&&[]}},d=s({name:n,node:u,css:(0,o.nodeCSS)(u),isComponentSet:c}),f=[];function p(e,t,n){void 0===t&&(t=1),void 0===n&&(n=null);var r=t>1?t:"";if(f.includes(e+r)){if(n){var o=(0,a.getTreeElementByProperty)(d,"shortName",e+r);if((null==o?void 0:o.css)===n&&!o.willBeRenderedAsSVG)return{existsWithSameCss:!0,name:e+r}}return p(e,t+1,n)}return f.push(e+r),{existsWithSameCss:!1,name:e+r}}function v(e,t,a){void 0===a&&(a=""),e.forEach((function(e){var l;if(e.visible){var c=(0,o.nodeCSS)(e),u=p((0,r.makeSafeForCSS)(e.name),1,c),d=u.name,f=u.existsWithSameCss,g="".concat(n,"__").concat(d),m=s({name:g,node:e,shortName:d,skipCss:f,css:c,baseSelector:a});if(null==t||t.push(m),(null===(l=e.children)||void 0===l?void 0:l.length)>0&&v(e.children,m.children,a),"TEXT"===e.type){var h=(0,i.getTextSegments)(e,g,p);m.textSegments=h}}}))}if((null===(t=u.children)||void 0===t?void 0:t.length)>0&&(v(u.children,d.children),c&&l.children.forEach((function(e){var t,a="."+(0,r.makeSafeForCSS)("".concat(n,"--").concat(null==e?void 0:e.name)),i=s({name:n,node:e,css:(0,o.nodeCSS)(e),baseSelector:a});null===(t=d.variants)||void 0===t||t.push(i),f=[],v(e.children,i.children,a)}))),"TEXT"===u.type){var g=(0,i.getTextSegments)(u,d.name,p);d.textSegments=g}return d}},88128:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t;if(!e.effects||0===e.effects.length||(0,r.willBeRenderedAsSVG)(e)||"GROUP"===e.type)return"";var n=e.effectStyleId,o=e.effects.filter((function(e){return"BACKGROUND_BLUR"===e.type&&e.visible}));if(0===o.length)return"";var a=o.map((function(e){return"blur(".concat((0,r.cleanNumber)(e.radius/2),"px)")})).join(" ");if(n){var i=(0,r.cleanStyleName)(null===(t=figma.getStyleById(n))||void 0===t?void 0:t.name);a="var(--".concat(i,"-backdrop-filter, ").concat(a,")")}return"backdrop-filter: "+a+";"}},59339:(e,t,n)=>{t.__esModule=!0;var r=n(90270);t.default=function(e){var t=(0,r.fillColor)(e);return t&&""!==t?"background: ".concat(t,";"):""}},74796:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(67526);t.default=function(e){var t,n;return(0,r.willBeRenderedAsSVG)(e)||!e.strokes||!e.strokeWeight||e.strokes.length<1?"":"GRADIENT_LINEAR"===(null===(n=null===(t=e.strokes)||void 0===t?void 0:t[0])||void 0===n?void 0:n.type)?"\n    border-width: ".concat((0,r.cleanNumber)(e.strokeWeight),"px; \n    border-style: solid; \n    border-image: ").concat((0,o.strokeColor)(e),"; \n    border-image-slice: 1;\n    "):"border: ".concat((0,r.cleanNumber)(e.strokeWeight),"px solid ").concat((0,o.strokeColor)(e),";")}},33143:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return"ELLIPSE"===e.type?"border-radius: 50%;":e.cornerRadius||e.topLeftRadius?"border-radius: ".concat("number"==typeof e.cornerRadius?(0,r.cleanNumber)(e.cornerRadius)+"px":"".concat((0,r.cleanNumber)(e.topLeftRadius),"px ").concat((0,r.cleanNumber)(e.topRightRadius),"px ").concat((0,r.cleanNumber)(e.bottomRightRadius),"px ").concat((0,r.cleanNumber)(e.bottomLeftRadius),"px"),";"):""}},80544:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t;if(!e.effects||0===e.effects.length||(0,r.willBeRenderedAsSVG)(e)||"GROUP"===e.type)return"";var n=e.effectStyleId,o=["INNER_SHADOW","DROP_SHADOW"],a=e.effects.filter((function(e){return o.includes(e.type)}));if(0===a.length)return"";var i=a.map((function(e){return"".concat("INNER_SHADOW"===e.type?"inset":""," ").concat((0,r.cleanNumber)(e.offset.x),"px ").concat((0,r.cleanNumber)(e.offset.y),"px ").concat((0,r.cleanNumber)(e.radius),"px ").concat((0,r.cleanNumber)(e.spread),"px ").concat((0,r.rgbaColor)(e.color,e.color.a))})).join(", ");if(n){var l=(0,r.cleanStyleName)(null===(t=figma.getStyleById(n))||void 0===t?void 0:t.name);i="var(--".concat(l,"-box-shadow, ").concat(i,")")}return"box-shadow: "+i+";"}},68491:(e,t,n)=>{t.__esModule=!0;var r=n(90270);t.default=function(e){var t=(0,r.fillColor)(e);return t&&""!==t?"color: ".concat(t,";"):""}},8094:(e,t,n)=>{t.__esModule=!0,t.cssFromConstraints=void 0;var r=n(81171),o=n(20304);function a(e){var t,n,a="";switch(null===(t=e.constraints)||void 0===t?void 0:t.horizontal){case"MAX":a+="right: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width-e.width-e.x),"px;");break;case"STRETCH":a+="right: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width-e.width-e.x),"px; left: ").concat(e.x,"px;");break;case"CENTER":a+="left: calc(50% - ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width/2-e.x),"px);");break;default:a+="left: ".concat((0,r.cleanNumber)(e.x),"px;")}switch(null===(n=e.constraints)||void 0===n?void 0:n.vertical){case"MAX":a+="bottom: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height-e.height-e.y),"px;");break;case"STRETCH":a+="bottom: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height-e.height-e.y),"px; top: ").concat(e.y,"px;");break;case"CENTER":a+="top: calc(50% - ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height/2-e.y),"px);");break;default:a+="top: ".concat((0,r.cleanNumber)(e.y),"px;")}return a}t.cssFromConstraints=a,t.default=a},25618:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t,n,o,a,i;if((0,r.willBeRenderedAsSVG)(e))return"";var l="",c="";return"VERTICAL"===e.layoutMode&&(l="AUTO"===e.primaryAxisSizingMode?"auto":(0,r.cleanNumber)(e.height)+"px",c="AUTO"===e.counterAxisSizingMode?"auto":(0,r.cleanNumber)(e.width)+"px"),"HORIZONTAL"===e.layoutMode&&(c="AUTO"===e.primaryAxisSizingMode?"auto":(0,r.cleanNumber)(e.width)+"px",l="AUTO"===e.counterAxisSizingMode?"auto":(0,r.cleanNumber)(e.height)+"px"),e.layoutMode&&"NONE"!==e.layoutMode||(l=(null===(t=e.textAutoResize)||void 0===t?void 0:t.toString().includes("HEIGHT"))?"auto":(0,r.cleanNumber)(e.height)+"px",c=(null===(n=e.textAutoResize)||void 0===n?void 0:n.toString().includes("WIDTH"))?"auto":(0,r.cleanNumber)(e.width)+"px"),e.children&&0!==(null===(o=e.children)||void 0===o?void 0:o.length)||"TEXT"===e.type||(l=(0,r.cleanNumber)(e.height)+"px",c=(0,r.cleanNumber)(e.width)+"px"),("VERTICAL"===e.parent.layoutMode&&"STRETCH"===e.layoutAlign||"STRETCH"===(null===(a=e.constraints)||void 0===a?void 0:a.horizontal))&&(c="auto"),"HORIZONTAL"===e.parent.layoutMode&&1===e.layoutGrow&&(c="auto"),("HORIZONTAL"===e.parent.layoutMode&&"STRETCH"===e.layoutAlign||"VERTICAL"===e.parent.layoutMode&&1===e.layoutGrow||"STRETCH"===(null===(i=e.constraints)||void 0===i?void 0:i.vertical))&&(l="auto"),"width: ".concat(c,"; height: ").concat(l,";")}},53997:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t=1===e.layoutGrow?"flex: 1;":"TEXT"!==e.type&&"AUTO"!==e.primaryAxisSizingMode?"flex-shrink: 0;":"",n="STRETCH"===e.layoutAlign?"align-self: stretch;":"",o={MIN:"flex-start",MAX:"flex-end",CENTER:"center",SPACE_BETWEEN:"space-between"},a=function(t){return"\n      display: flex;\n      flex-direction: ".concat(t,";\n      gap: ").concat((0,r.cleanNumber)(e.itemSpacing),"px;\n      align-items: ").concat(o[e.counterAxisAlignItems],";\n      justify-content: ").concat(o[e.primaryAxisAlignItems],";\n    ")},i="";return"VERTICAL"===e.layoutMode&&(i=a("column")),"HORIZONTAL"===e.layoutMode&&(i=a("row")),"HORIZONTAL"!==e.parent.layoutMode&&"VERTICAL"!==e.parent.layoutMode||(i+=n+t),i}},90270:(e,t,n)=>{t.__esModule=!0,t.fillColor=void 0;var r=n(81171),o=n(43743);function a(e){if((0,r.willBeRenderedAsSVG)(e))return"";var t=e.fills;return(null==t?void 0:t.length)>1?t.map((function(e){return(0,o.getColor)(e,!1,!0)})).filter((function(e){return""!==e})).filter((function(e){return e})).reverse().join(", "):(0,o.getColor)(null==t?void 0:t[0],e.fillStyleId)}t.fillColor=a,t.default=a},53015:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t;if(!e.effects||0===e.effects.length||(0,r.willBeRenderedAsSVG)(e)||"GROUP"===e.type)return"";var n=e.effectStyleId,o=e.effects.filter((function(e){return"LAYER_BLUR"===e.type&&e.visible}));if(0===o.length)return"";var a=o.map((function(e){return"blur(".concat((0,r.cleanNumber)(e.radius/2),"px)")})).join(" ");if(n){var i=(0,r.cleanStyleName)(null===(t=figma.getStyleById(n))||void 0===t?void 0:t.name);a="var(--".concat(i,"-filter, ").concat(a,")")}return"filter: "+a+";"}},20304:(e,t)=>{function n(e){return"GROUP"===e.parent.type?n(e.parent):e.parent}t.__esModule=!0,t.findAbsoluteParent=void 0,t.findAbsoluteParent=n,t.default=n},92889:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(65896),a=n(17522),i=n(52996);t.default=function(e){var t,n,l,c=(0,a.fontStyleAsObject)(e.fontName),u=c.weight,s=c.isItalic,d=Number(null===(t=e.fontSize)||void 0===t?void 0:t.toString()),f=null===(n=e.fontName.family)||void 0===n?void 0:n.toString(),p=(0,i.default)(e),v=(0,o.fontShorthand)({lineHeight:p,fontSize:d,weight:u,fontFamily:f,isItalic:s});if(e.textStyleId){var g=(0,r.cleanStyleName)(null===(l=figma.getStyleById(e.textStyleId.toString()))||void 0===l?void 0:l.name);return"font: var(--".concat(g,", ").concat(v,");")}return"font: ".concat(v,";")}},65896:(e,t,n)=>{t.__esModule=!0,t.fontShorthand=void 0;var r=n(81171);function o(e){var t=e.lineHeight,n=e.fontSize,o=e.weight,a=e.fontFamily,i=e.isItalic?"italic ":"";return"".concat(o," ").concat(i).concat((0,r.cleanNumber)(n),"px").concat(""!==t?"/"+t:""," '").concat(a,"'")}t.fontShorthand=o,t.default=o},17522:(e,t)=>{function n(e){var t,n,r=null===(t=null==e?void 0:e.style)||void 0===t?void 0:t.toLowerCase().includes("italic"),o={thin:100,"extra light":200,extralight:200,light:300,normal:400,regular:400,medium:500,"semi bold":600,semibold:600,bold:700,"extra bold":800,extrabold:800,black:900},a=null===(n=null==e?void 0:e.style)||void 0===n?void 0:n.toLowerCase().replace("italic","").trim();return{weight:o[a]?o[a]:"400",isItalic:r}}t.__esModule=!0,t.fontStyleAsObject=void 0,t.fontStyleAsObject=n,t.default=n},43743:(e,t,n)=>{t.__esModule=!0,t.getColor=void 0;var r=n(81171),o=n(2373);function a(e,t,n){var a;if(void 0===n&&(n=!1),n&&(!e||!e.visible))return"";if(!e||!e.visible)return"transparent";if(["GRADIENT_LINEAR","GRADIENT_RADIAL","GRADIENT_ANGULAR","GRADIENT_DIAMOND"].includes(e.type))return(0,o.gradientFill)(e);if(n&&"SOLID"===e.type){var i=(0,r.rgbaColor)(e.color,e.opacity);return"linear-gradient(to left, ".concat(i,", ").concat(i,")")}if(t){var l=(0,r.cleanStyleName)(null===(a=figma.getStyleById(t))||void 0===a?void 0:a.name),c=e.opacity<1?(0,r.rgbaColor)(e.color,e.opacity):(0,r.rgbToHex)(e.color);return"var(--".concat(l,", ").concat(c,")")}return e.opacity<1?(0,r.rgbaColor)(e.color,e.opacity):(0,r.rgbToHex)(e.color)}t.getColor=a,t.default=a},2373:(e,t,n)=>{t.__esModule=!0,t.gradientFill=void 0;var r=n(81171);function o(e){var t=e.gradientStops,n=(0,r.getTransforms)(e.gradientTransform);console.log(e.gradientTransform);var o=t.map((function(e){return"".concat((0,r.rgbaColor)(e.color,(0,r.cleanNumber)(e.color.a))," ").concat(100*e.position,"%")})),a={GRADIENT_LINEAR:"".concat((0,r.cleanNumber)(n.angle+90),"deg"),GRADIENT_RADIAL:"closest-side",GRADIENT_ANGULAR:"from ".concat((0,r.cleanNumber)(n.angle+90),"deg at 50% 50%"),GRADIENT_DIAMOND:"closest-side"};return"".concat({GRADIENT_LINEAR:"linear-gradient",GRADIENT_RADIAL:"radial-gradient",GRADIENT_ANGULAR:"conic-gradient",GRADIENT_DIAMOND:"radial-gradient"}[e.type],"(").concat(a[e.type],", ").concat(o.join(","),")")}t.gradientFill=o,t.default=o},60675:(e,t,n)=>{t.__esModule=!0,t.textDecorationProp=t.textTransformProp=t.fontProp=t.fontShorthand=t.lineHeight=t.getColor=t.strokeColor=t.borderRadiusProp=t.gradientFill=t.transformProps=t.colorProp=t.backgroundProp=t.fillColor=t.fontStyleAsObject=t.boxShadowProp=t.positionProps=t.cssFromConstraints=t.findAbsoluteParent=t.opacityProp=t.overflowProp=t.dimensions=t.displayProp=t.paddingProp=t.borderProp=void 0;var r=n(74796);t.borderProp=r.default;var o=n(16043);t.paddingProp=o.default;var a=n(53997);t.displayProp=a.default;var i=n(25618);t.dimensions=i.default;var l=n(23419);t.overflowProp=l.default;var c=n(89605);t.opacityProp=c.default;var u=n(20304);t.findAbsoluteParent=u.default;var s=n(8094);t.cssFromConstraints=s.default;var d=n(86204);t.positionProps=d.default;var f=n(80544);t.boxShadowProp=f.default;var p=n(17522);t.fontStyleAsObject=p.default;var v=n(90270);t.fillColor=v.default;var g=n(59339);t.backgroundProp=g.default;var m=n(68491);t.colorProp=m.default;var h=n(77871);t.transformProps=h.default;var b=n(2373);t.gradientFill=b.default;var y=n(33143);t.borderRadiusProp=y.default;var S=n(67526);t.strokeColor=S.default;var x=n(43743);t.getColor=x.default;var A=n(52996);t.lineHeight=A.default;var N=n(65896);t.fontShorthand=N.default;var R=n(92889);t.fontProp=R.default;var T=n(73708);t.textTransformProp=T.default;var _=n(2094);t.textDecorationProp=_.default},52996:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){if(!e.lineHeight)return"";if("AUTO"===e.lineHeight.unit)return"";var t={PIXELS:"px",PERCENT:"%"}[e.lineHeight.unit];return"".concat((0,r.cleanNumber)(e.lineHeight.value)).concat(t)}},89605:(e,t)=>{t.__esModule=!0,t.default=function(e){return 1===e.opacity?"":"opacity: ".concat(e.opacity,";")}},23419:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return(0,r.willBeRenderedAsSVG)(e)?"overflow: visible;":e.clipsContent?"overflow: hidden;":""}},16043:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return e.paddingTop||e.paddingRight||e.paddingBottom||e.paddingLeft?"padding: ".concat((0,r.cleanNumber)(e.paddingTop),"px ").concat((0,r.cleanNumber)(e.paddingRight),"px ").concat((0,r.cleanNumber)(e.paddingBottom),"px ").concat((0,r.cleanNumber)(e.paddingLeft),"px;"):""}},86204:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(8094);t.default=function(e){var t="";return e.id!==figma.currentPage.selection[0].id&&(t=(0,o.cssFromConstraints)(e)),"\n      position: ".concat(function(e){var n,o=figma.currentPage.selection[0];return"GROUP"!==e.type||(0,r.willBeRenderedAsSVG)(e)?e.id===o.id||"COMPONENT_SET"===(null===(n=e.parent)||void 0===n?void 0:n.type)?"relative;":"".concat("NONE"!==e.parent.layoutMode&&e.parent.layoutMode?"relative;":"absolute; ".concat(t)):"static;"}(e),"\n    ")}},67526:(e,t,n)=>{t.__esModule=!0,t.strokeColor=void 0;var r=n(43743);function o(e){var t,n=null===(t=e.strokes)||void 0===t?void 0:t[0];return(0,r.getColor)(n,e.strokeStyleId)}t.strokeColor=o,t.default=o},2094:(e,t)=>{t.__esModule=!0,t.default=function(e){if(!e.textDecoration)return"";var t={STRIKETHROUGH:"line-through",UNDERLINE:"underline"};return t[e.textDecoration]?"text-decoration: ".concat(t[e.textDecoration],";"):""}},73708:(e,t)=>{t.__esModule=!0,t.default=function(e){var t={UPPER:"uppercase",LOWER:"lowercase"};return t[e.textCase]?"text-transform: ".concat(t[e.textCase],";"):""}},77871:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t=(0,r.willBeRenderedAsSVG)(e);if("GROUP"===e.type&&!t)return"";var n=(0,r.getTransforms)(e.relativeTransform),o=(0,r.getTransforms)(e.absoluteTransform);return 0===n.angle&&1===n.scaleX&&1===n.scaleY?"":t?e.absoluteRenderBounds?"\n      transform: translate(".concat((0,r.cleanNumber)(-1*(o.translateX-e.absoluteRenderBounds.x)),"px, ").concat((0,r.cleanNumber)(-1*(o.translateY-e.absoluteRenderBounds.y)),"px);\n    "):"":"\n    transform-origin: 0 0;\n    transform: rotate(".concat((0,r.cleanNumber)(-1*n.angle,3),"deg) scale(").concat((0,r.cleanNumber)(n.scaleX,3),", ").concat((0,r.cleanNumber)(n.scaleY,3),");\n  ")}},75763:(e,t)=>{t.__esModule=!0,t.eraseDuplicateCSS=void 0,t.eraseDuplicateCSS=function(e,t){var n=e.split(";").map((function(e){return e.trim()})),r=t.split(";").map((function(e){return e.trim()})),o=r.map((function(e){var t;return null===(t=e.split(":"))||void 0===t?void 0:t[0]})).filter((function(t){return!e.includes("".concat(t,":"))})).map((function(e){return e+": unset"}));return n.filter((function(e){return!r.includes(e)})).concat(o).map((function(e){return e+";"})).join("")}},96804:(e,t,n)=>{t.__esModule=!0,t.getStyles=void 0;var r=n(81171),o=n(60675);t.getStyles=function(e){var t,n,a=null===(t=e.getLocalPaintStyles())||void 0===t?void 0:t.map((function(e){var t=e.name,n=e.paints;return{name:(0,r.cleanStyleName)(t),value:(0,o.getColor)(null==n?void 0:n[0],!1)}})),i=null===(n=e.getLocalTextStyles())||void 0===n?void 0:n.map((function(e){var t,n,a=(0,o.fontStyleAsObject)(e.fontName),i=a.weight,l=a.isItalic,c=null===(t=e.fontSize)||void 0===t?void 0:t.toString(),u=null===(n=e.fontName.family)||void 0===n?void 0:n.toString(),s=(0,o.lineHeight)(e);return{name:(0,r.cleanStyleName)(e.name),value:(0,o.fontShorthand)({lineHeight:s,fontSize:c,weight:i,fontFamily:u,isItalic:l})}}));return{paintStyles:a,textStyles:i}}},55354:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};t.__esModule=!0,t.getTextSegments=void 0;var o=n(81171),a=n(95055);t.getTextSegments=function(e,t,n){return e.getStyledTextSegments(["fontSize","fontName","textDecoration","textCase","lineHeight","letterSpacing","fills","textStyleId","fillStyleId","listOptions","indentation"]).map((function(e){return r(r({},e),{name:"".concat(n((0,o.makeSafeForCSS)(t+"-span")).name),css:(0,a.textSegmentCSS)(e)})}))}},28906:(e,t)=>{t.__esModule=!0,t.getTreeElementByName=void 0,t.getTreeElementByName=function(e,t){return function e(t,n){if(t.name===n)return t;if(null!=t.children){var r,o=null;for(r=0;null==o&&r<t.children.length;r++)o=e(t.children[r],n);return o}return null}(e,t)}},59394:(e,t)=>{t.__esModule=!0,t.getTreeElementByProperty=void 0,t.getTreeElementByProperty=function(e,t,n){return function e(t,n,r){if(t[n]===r)return t;if(null!=t.children){var o,a=null;for(o=0;null==a&&o<t.children.length;o++)a=e(t.children[o],n,r);return a}return null}(e,t,n)}},81171:(e,t)=>{function n(e){var t=Math.round(255*e).toString(16);return 1==t.length?"0"+t:t}function r(e){return Math.round(255*e)}function o(e){if("object"==typeof e){var t=e.r,r=e.g,o=e.b;return e.a?void 0:"#"+n(t)+n(r)+n(o)}}function a(e,t){if("object"==typeof e){var n=e.r,o=e.g,a=e.b;return"rgba(".concat(r(n),", ").concat(r(o),", ").concat(r(a),", ").concat(t.toFixed(2),")")}console.error("rgb color must be object")}function i(e){return e.replace(/[^a-z0-9_-]/g,(function(e){var t=e.charCodeAt(0);return 32==t?"-":t>=65&&t<=90?e.toLowerCase():"-"}))}function l(e){var t,n,r,o=["VECTOR","BOOLEAN_OPERATION","STAR"];return(null===(t=e.children)||void 0===t?void 0:t.length)>0&&(null===(n=e.children)||void 0===n?void 0:n.filter((function(e){return o.includes(e.type)})).length)===(null===(r=e.children)||void 0===r?void 0:r.length)}t.__esModule=!0,t.getTransforms=t.willBeRenderedAsSVG=t.allChildrenAreVector=t.cleanNumber=t.cleanStyleName=t.makeSafeForCSS=t.escapeHtml=t.colorAsHexOrRgba=t.rgbaColor=t.rgbToHex=t.componentTo255=t.componentToHex=void 0,t.componentToHex=n,t.componentTo255=r,t.rgbToHex=o,t.rgbaColor=a,t.colorAsHexOrRgba=function(e){if(e)return e.opacity&&e.opacity<1?a(e.color,e.opacity):o(e.color);console.error("colorAsHexOrRgba was called without fill object")},t.escapeHtml=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},t.makeSafeForCSS=i,t.cleanStyleName=function(e){if(e)return i(e.replaceAll(" ",""))},t.cleanNumber=function(e,t){return void 0===t&&(t=2),e?parseFloat(Number(e).toFixed(t)):0},t.allChildrenAreVector=l,t.willBeRenderedAsSVG=function(e){return l(e)||"VECTOR"===e.type||"BOOLEAN_OPERATION"===e.type||"STAR"===e.type},t.getTransforms=function(e){var t=[e[0][0],e[0][1],e[1][0],e[1][1],e[0][2],e[1][2]],n=function(e){var t=e.a,n=e.b,r=e.c,o=e.d,a=Math.sqrt(t*t+n*n),i=Math.sqrt(r*r+o*o);t*o-n*r<0&&(t<o?a=-a:i=-i),a&&(t*=1/a,n*=1/a),i&&(r*=1/i,o*=1/i);var l=Math.atan2(n,t);if(l){var c=-n,u=t,s=t,d=n,f=r,p=o;t=u*s+c*f,n=u*d+c*p,r=-c*s+u*f,o=-c*d+u*p}return s=t,d=n,f=r,p=o,l*=180/Math.PI,{translateX:e.e,translateY:e.f,rotateZ:l,scaleX:a,scaleY:i,matrix:[s,d,f,p,0,0]}}({a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]});return{angle:n.rotateZ,scaleX:n.scaleX,scaleY:n.scaleY,translateX:t[4],translateY:t[5],svgMatrix:t.join(" "),svgMatrixWithoutTranslate:[e[0][0],e[0][1],e[1][0],e[1][1]].join(" ")}}},19654:(e,t,n)=>{t.__esModule=!0,t.nodeCSS=void 0;var r=n(60675),o=n(88128),a=n(53015);t.nodeCSS=function(e){var t,n;return console.log("node",e),"TEXT"===(null===(t=e.type)||void 0===t?void 0:t.toString())?"\n      margin: 0;\n      ".concat((0,r.colorProp)(e),"\n      text-align: ").concat(null===(n=e.textAlignHorizontal)||void 0===n?void 0:n.toLowerCase(),";\n      ").concat((0,r.fontProp)(e),"\n      ").concat((0,r.textTransformProp)(e),"\n      ").concat((0,r.textDecorationProp)(e),"\n      ").concat((0,r.opacityProp)(e),"\n      ").concat((0,r.positionProps)(e),"\n      ").concat((0,r.displayProp)(e),"\n      ").concat((0,r.dimensions)(e),"\n      ").concat((0,r.transformProps)(e),"\n      ").concat((0,a.default)(e),"\n    "):"\n      margin: 0;\n      box-sizing: border-box;\n      ".concat((0,r.backgroundProp)(e),"\n      ").concat((0,r.borderRadiusProp)(e),"\n      ").concat((0,r.borderProp)(e),"\n      ").concat((0,r.opacityProp)(e),"\n      ").concat((0,r.paddingProp)(e),"\n      ").concat((0,r.displayProp)(e),"\n      ").concat((0,r.dimensions)(e),"\n      ").concat((0,r.positionProps)(e),"\n      ").concat((0,r.boxShadowProp)(e),"\n      ").concat((0,r.transformProps)(e),"\n      ").concat((0,r.overflowProp)(e),"\n      ").concat((0,a.default)(e),"\n      ").concat((0,o.default)(e),"\n    ")}},64242:(e,t,n)=>{t.__esModule=!0,t.printCSS=void 0;var r=n(28906),o=n(75763);t.printCSS=function(e){var t="";function n(a,i){void 0===i&&(i=!1),a.forEach((function(a){var l,c=a.css,u="."+a.name;if(i){var s=null===(l=(0,r.getTreeElementByName)(e,a.name))||void 0===l?void 0:l.css;u=e.name===a.name?"":"."+a.name,s&&(c=(0,o.eraseDuplicateCSS)(a.css,s))}""===c||a.skipCss||(t+="".concat(a.baseSelector||""," ").concat(u," {").concat(c,"}\n")),a.willBeRenderedAsSVG||(a.textSegments.length>1&&a.textSegments.forEach((function(e){t+=".".concat(e.name," {").concat(e.css,"}\n")})),a.children.length>0&&n(a.children,i))}))}return t+=".".concat(e.name," {").concat(e.css,"}\n"),e.textSegments.length>1&&e.textSegments.forEach((function(e){t+=".".concat(e.name," {").concat(e.css,"}\n")})),e.willBeRenderedAsSVG||n(e.children),e.variants&&(t+="\n/* variant styles */\n",n(e.variants,!0)),t}},46150:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0,t.printHTML=void 0;var a=n(81171),i=n(91622),l=n(89376);t.printHTML=function(e){return r(this,void 0,void 0,(function(){function t(e){return r(this,void 0,void 0,(function(){var n=this;return o(this,(function(c){switch(c.label){case 0:return(null==e?void 0:e.length)>0?[4,Promise.all(e.map((function(e){return r(n,void 0,void 0,(function(){var n,r;return o(this,(function(o){switch(o.label){case 0:return(0,a.willBeRenderedAsSVG)(e)?[4,(0,i.createSVG)(e.originalNode,e.name)]:[3,2];case 1:return[2,o.sent()];case 2:return r=(n='<div class="'.concat(e.name,'">\n').concat(e.textSegments?(0,l.printTextSegments)(e.textSegments):""," ")).concat,[4,t(e.children)];case 3:return[2,r.apply(n,[o.sent(),"\n</div>"])]}}))}))})))]:[3,2];case 1:return[2,c.sent().join("")];case 2:return[2,""]}}))}))}var n,c,u,s;return o(this,(function(r){switch(r.label){case 0:return n="",(0,a.willBeRenderedAsSVG)(e)?[4,(0,i.createSVG)(e.originalNode,e.name)]:[3,2];case 1:return n=r.sent(),[3,4];case 2:return c=n,s=(u='<div class="'.concat(e.name,'">\n').concat(e.textSegments?(0,l.printTextSegments)(e.textSegments):""," ")).concat,[4,t(e.children)];case 3:n=c+s.apply(u,[r.sent(),"\n</div>"]),r.label=4;case 4:return[2,n]}}))}))}},89376:(e,t,n)=>{t.__esModule=!0,t.printTextSegments=void 0;var r=n(81171);t.printTextSegments=function(e){return 1===e.length?(0,r.escapeHtml)(e[0].characters).replace(/\u2028/g,"\n").replace(/\n/g,"<br/>"):e.map((function(e){return'<span class="'.concat(e.name,'">').concat((0,r.escapeHtml)(e.characters).replace(/\u2028/g,"\n").replace(/\n/g,"<br/>"),"</span>")})).join("")}},20675:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0,t.tailwind=void 0;var a=n(91622),i=n(81171),l={"0px":0,"1px":"px","2px":.5,"4px":1,"6px":1.5,"8px":2,"10px":2.5,"12px":3,"14px":3.5,"16px":4,"20px":5,"24px":6},c={padding:l,gap:l,top:l,left:l,"flex-direction":{row:"row",column:"col"},"border-radius":{"0px":"none","2px":"sm","4px":"","6px":"md","8px":"lg","12px":"xl","16px":"2xl","24px":"3xl","9999px":"full"},background:{transparent:"transparent"},"justify-content":{"flex-start":"start","flex-end":"end",center:"center"},"align-items":{"flex-start":"start","flex-end":"end",center:"center"},"align-self":{stretch:"stretch"},overflow:{hidden:"hidden",visible:"visible"}};function u(e,t){var n=e.replaceAll("\n","").split(";").map((function(e){return e.trim()})).filter((function(e){return""!==e})).map((function(e){var t=e.split(":"),n=t[0],r=t[1];return{key:null==n?void 0:n.trim(),value:null==r?void 0:r.trim()}})),r={"border-radius":"rounded",width:"w",height:"h","text-align":"text","flex-direction":"flex",position:"",display:"",flex:"flex",gap:"gap",top:"top",left:"left","justify-content":"justify","align-items":"items","align-self":"self",overflow:"overflow"},o=["padding","margin","box-sizing"],a=[],i=n.map((function(e){var t=e.key,n=e.value;if(o.includes(t))return null;var i=s(t,n),l=r[t];return void 0===l?(a.push("".concat(t,": ").concat(n)),null):""===l?i:""===i?l:[l,i].join("-")})),l=function(e){var t=[];if(e.paddingLeft){var n=[e.paddingTop,e.paddingRight,e.paddingBottom,e.paddingLeft];if(n.every((function(e){return e===n[0]})))t.push("p-".concat(s("padding",n[0]+"px")));else{var r=["t","r","b","l"];n.forEach((function(e,n){t.push("p".concat(r[n],"-").concat(s("padding",e+"px")))}))}}return t}(t);return{classNames:i.concat(l).filter((function(e){return null!==e})).join(" "),inlineStyles:a.join("; ")}}function s(e,t){var n,r=null===(n=c[e])||void 0===n?void 0:n[t];return["display","position","text-align","flex"].includes(e)?t:void 0===r?"[".concat(t.replace(/\s/g,""),"]"):""===r?"":r}t.tailwind=function(e){return r(this,void 0,void 0,(function(){function t(e){return r(this,void 0,void 0,(function(){var n=this;return o(this,(function(l){switch(l.label){case 0:return(null==e?void 0:e.length)>0?[4,Promise.all(e.map((function(e){return r(n,void 0,void 0,(function(){var n,r;return o(this,(function(o){switch(o.label){case 0:return(0,i.willBeRenderedAsSVG)(e)?[4,(0,a.createSVG)(e.originalNode,"".concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles))]:[3,2];case 1:return[2,o.sent()];case 2:return r=(n='<div class="'.concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles,'">\n').concat(e.characters?e.characters.replaceAll("\n","<br />"):""," ")).concat,[4,t(e.children)];case 3:return[2,r.apply(n,[o.sent(),"\n</div>"])]}}))}))})))]:[3,2];case 1:return[2,l.sent().join("")];case 2:return[2,""]}}))}))}var n,l,c,s;return o(this,(function(r){switch(r.label){case 0:return n="",(0,i.willBeRenderedAsSVG)(e)?[4,(0,a.createSVG)(e.originalNode,"".concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles))]:[3,2];case 1:return n=r.sent(),[3,4];case 2:return l=n,s=(c='<div class="'.concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles,'">\n').concat(e.characters?e.characters.replaceAll("\n","<br />"):""," ")).concat,[4,t(e.children)];case 3:n=l+s.apply(c,[r.sent(),"\n</div>"]),r.label=4;case 4:return[2,n]}}))}))}},95055:(e,t,n)=>{t.__esModule=!0,t.textSegmentCSS=void 0;var r=n(60675);t.textSegmentCSS=function(e){return"\n      color: ".concat((0,r.fillColor)(e),";\n      ").concat((0,r.fontProp)(e),"\n      ").concat((0,r.textTransformProp)(e),"\n      ").concat((0,r.textDecorationProp)(e),"\n    ")}}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}(60480)})();