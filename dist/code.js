(()=>{"use strict";var e={60480:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0,t.createSVG=void 0;var i=n(60675),l=n(81171),c=n(96804),u=n(20675);function s(e){var t,n;return console.log("node",e),"TEXT"===(null===(t=e.type)||void 0===t?void 0:t.toString())?"\n      ".concat((0,i.colorProp)(e),"\n      text-align: ").concat(null===(n=e.textAlignHorizontal)||void 0===n?void 0:n.toLowerCase(),";\n      ").concat((0,i.fontProp)(e),"\n      ").concat((0,i.textTransformProp)(e),"\n      ").concat((0,i.textDecorationProp)(e),"\n      ").concat((0,i.opacityProp)(e),"\n      ").concat((0,i.positionProps)(e),"\n      ").concat((0,i.displayProp)(e),"\n      ").concat((0,i.dimensions)(e),"\n      margin: 0;\n      ").concat((0,i.transformProps)(e),"\n    "):"\n      box-sizing: border-box;\n      ".concat((0,i.backgroundProp)(e),"\n      ").concat((0,i.borderRadiusProp)(e),"\n      ").concat((0,i.borderProp)(e),"\n      ").concat((0,i.opacityProp)(e),"\n      ").concat((0,i.paddingProp)(e),"\n      ").concat((0,i.displayProp)(e),"\n      ").concat((0,i.dimensions)(e),"\n      ").concat((0,i.positionProps)(e),"\n      ").concat((0,i.boxShadowProp)(e),"\n      margin: 0;\n      ").concat((0,i.transformProps)(e),"\n      ").concat((0,i.overflowProp)(e),"\n    ")}function d(e,t,n){return e.getStyledTextSegments(["fontSize","fontName","textDecoration","textCase","lineHeight","letterSpacing","fills","textStyleId","fillStyleId","listOptions","indentation"]).map((function(e){return r(r({},e),{name:"".concat(n((0,l.makeSafeForCSS)(t+"-span"))),css:(o=e,"\n      color: ".concat((0,i.fillColor)(o),";\n      ").concat((0,i.fontProp)(o),"\n      ").concat((0,i.textTransformProp)(o),"\n      ").concat((0,i.textDecorationProp)(o),"\n    "))});var o}))}function f(e){return o(this,void 0,void 0,(function(){function t(e){return o(this,void 0,void 0,(function(){var n=this;return a(this,(function(r){switch(r.label){case 0:return(null==e?void 0:e.length)>0?[4,Promise.all(e.map((function(e){return o(n,void 0,void 0,(function(){var n,r;return a(this,(function(o){switch(o.label){case 0:return(0,l.willBeRenderedAsSVG)(e)?[4,v(e.originalNode,e.name)]:[3,2];case 1:return[2,o.sent()];case 2:return r=(n='<div class="'.concat(e.name,'">\n').concat(e.textSegments?p(e.textSegments):""," ")).concat,[4,t(e.children)];case 3:return[2,r.apply(n,[o.sent(),"\n</div>"])]}}))}))})))]:[3,2];case 1:return[2,r.sent().join("")];case 2:return[2,""]}}))}))}var n,r,i,c;return a(this,(function(o){switch(o.label){case 0:return n="",(0,l.willBeRenderedAsSVG)(e)?[4,v(e.originalNode,e.name)]:[3,2];case 1:return n=o.sent(),[3,4];case 2:return r=n,c=(i='<div class="'.concat(e.name,'">\n').concat(e.textSegments?p(e.textSegments):""," ")).concat,[4,t(e.children)];case 3:n=r+c.apply(i,[o.sent(),"\n</div>"]),o.label=4;case 4:return[2,n]}}))}))}function p(e){return 1===e.length?(0,l.escapeHtml)(e[0].characters).replace(/\u2028/g,"\n").replace(/\n/g,"<br/>"):e.map((function(e){return'<span class="'.concat(e.name,'">').concat((0,l.escapeHtml)(e.characters).replace(/\u2028/g,"\n").replace(/\n/g,"<br/>"),"</span>")})).join("")}function v(e,t){return o(this,void 0,void 0,(function(){return a(this,(function(n){switch(n.label){case 0:return[4,e.exportAsync({format:"SVG",useAbsoluteBounds:!0}).then((function(e){return String.fromCharCode.apply(null,e).replace("<svg ",'<svg class="'.concat(t,'" '))})).catch((function(e){return console.error(e)}))];case 1:return[2,n.sent()]}}))}))}t.createSVG=v,figma.parameters.on("input",(function(e){e.parameters;var t=e.key,n=e.query,r=e.result;"framework"===t&&r.setSuggestions(["react","html","tailwind(beta)"].filter((function(e){return e.includes(n)})))})),figma.on("run",(function(e){e.command;var t=e.parameters;return o(void 0,void 0,void 0,(function(){var e,n,r,o,i,p,v;return a(this,(function(a){switch(a.label){case 0:return e=function(e){var t,n,r=[];function o(e,t){void 0===t&&(t=1);var n=t>1?t:"";return r.includes(e+n)?o(e,t+1):(r.push(e+n),e+n)}if(0!==e.length){if(!(e.length>1)){var a=e[0],i="COMPONENT_SET"===a.type,c=i?a.defaultVariant:a,u={name:n=(0,l.makeSafeForCSS)(a.name),css:s(c),allChildrenAreVector:(0,l.allChildrenAreVector)(c),children:[],type:c.type,characters:c.characters,originalNode:c,textSegments:[],variants:i&&[]};if((null===(t=c.children)||void 0===t?void 0:t.length)>0&&(p(c.children,u.children),i&&a.children.forEach((function(e){var t,o=(0,l.makeSafeForCSS)("".concat(n,"--").concat(null==e?void 0:e.name)),a={name:n,css:s(e),allChildrenAreVector:(0,l.allChildrenAreVector)(e),children:[],type:null==e?void 0:e.type,characters:null==e?void 0:e.characters,originalNode:e,textSegments:[],baseSelector:"."+o};null===(t=u.variants)||void 0===t||t.push(a),r=[],p(e.children,a.children,"."+o)}))),"TEXT"===c.type){var f=d(c,u.name,o);u.textSegments=f}return u}figma.notify("Select only 1 Node",{error:!0})}else figma.notify("Nothing selected",{error:!0});function p(e,t,r){void 0===r&&(r=""),e.forEach((function(e){var a;if(e.visible){var i="".concat(n,"__").concat(o((0,l.makeSafeForCSS)(e.name))),c={name:i,css:s(e),allChildrenAreVector:(0,l.allChildrenAreVector)(e),children:[],type:e.type,characters:e.characters,originalNode:e,textSegments:[],baseSelector:r};if(null==t||t.push(c),(null===(a=e.children)||void 0===a?void 0:a.length)>0&&p(e.children,c.children,r),"TEXT"===e.type){var u=d(e,i,o);c.textSegments=u}}}))}}(figma.currentPage.selection),console.log(e),figma.showUI(__html__,{height:600,width:500}),n="tailwind(beta)"===t.framework?"-":function(e){var t="";function n(r,o){void 0===o&&(o=!1),r.forEach((function(r){var a,i=r.css,l="."+r.name;if(o){var c=null===(a=function(e,t){return function e(t,n){if(t.name===n)return t;if(null!=t.children){var r,o=null;for(r=0;null==o&&r<t.children.length;r++)o=e(t.children[r],n);return o}return null}(e,t)}(e,r.name))||void 0===a?void 0:a.css;l=e.name===r.name?"":"."+r.name,c&&(i=function(e,t){var n=e.split(";").map((function(e){return e.trim()})),r=t.split(";").map((function(e){return e.trim()})),o=r.map((function(e){var t;return null===(t=e.split(":"))||void 0===t?void 0:t[0]})).filter((function(t){return!e.includes("".concat(t,":"))})).map((function(e){return e+": unset"}));return n.filter((function(e){return!r.includes(e)})).concat(o).map((function(e){return e+";"})).join("")}(r.css,c))}""!==i&&(t+="".concat(r.baseSelector||""," ").concat(l," {").concat(i,"}\n")),r.allChildrenAreVector||(r.textSegments.length>1&&r.textSegments.forEach((function(e){t+=".".concat(e.name," {").concat(e.css,"}\n")})),r.children.length>0&&n(r.children,o))}))}return t+=".".concat(e.name," {").concat(e.css,"}\n"),e.textSegments.length>1&&e.textSegments.forEach((function(e){t+=".".concat(e.name," {").concat(e.css,"}\n")})),e.allChildrenAreVector||n(e.children),e.variants&&(t+="\n/* variant styles */\n",n(e.variants,!0)),t}(e),"tailwind(beta)"!==t.framework?[3,2]:[4,(0,u.tailwind)(e)];case 1:return o=a.sent(),[3,4];case 2:return[4,f(e)];case 3:o=a.sent(),a.label=4;case 4:return r=o,figma.ui.postMessage({css:n,html:r,framework:t.framework,styles:(0,c.getStyles)(figma),name:null===(v=null===(p=null===(i=figma.currentPage)||void 0===i?void 0:i.selection)||void 0===p?void 0:p[0])||void 0===v?void 0:v.name}),[2]}}))}))}))},59339:(e,t,n)=>{t.__esModule=!0;var r=n(90270);t.default=function(e){var t=(0,r.fillColor)(e);return t&&""!==t?"background: ".concat(t,";"):""}},74796:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(67526);t.default=function(e){var t,n;return(0,r.willBeRenderedAsSVG)(e)||!e.strokes||!e.strokeWeight||e.strokes.length<1?"":"GRADIENT_LINEAR"===(null===(n=null===(t=e.strokes)||void 0===t?void 0:t[0])||void 0===n?void 0:n.type)?"\n    border-width: ".concat((0,r.cleanNumber)(e.strokeWeight),"px; \n    border-style: solid; \n    border-image: ").concat((0,o.strokeColor)(e),"; \n    border-image-slice: 1;\n    "):"border: ".concat((0,r.cleanNumber)(e.strokeWeight),"px solid ").concat((0,o.strokeColor)(e),";")}},33143:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return"ELLIPSE"===e.type?"border-radius: 50%;":e.cornerRadius||e.topLeftRadius?"border-radius: ".concat("number"==typeof e.cornerRadius?(0,r.cleanNumber)(e.cornerRadius)+"px":"".concat((0,r.cleanNumber)(e.topLeftRadius),"px ").concat((0,r.cleanNumber)(e.topRightRadius),"px ").concat((0,r.cleanNumber)(e.bottomRightRadius),"px ").concat((0,r.cleanNumber)(e.bottomLeftRadius),"px"),";"):""}},80544:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t;if(!e.effects||0===e.effects.length||(0,r.willBeRenderedAsSVG)(e)||"GROUP"===e.type)return"";var n=e.effects.filter((function(e){return"DROP_SHADOW"===e.type}));if(0===n.length)return"";var o="box-shadow: ";return o+=n.map((function(e){return"".concat((0,r.cleanNumber)(e.offset.x),"px ").concat((0,r.cleanNumber)(e.offset.y),"px ").concat((0,r.cleanNumber)(e.radius),"px ").concat((0,r.cleanNumber)(e.spread),"px ").concat((0,r.rgbaColor)(e.color,e.color.a))})).join(", "),"".concat(e.effectStyleId&&"/*"+(null===(t=figma.getStyleById(e.effectStyleId))||void 0===t?void 0:t.name)+"*/")+o+";"}},68491:(e,t,n)=>{t.__esModule=!0;var r=n(90270);t.default=function(e){var t=(0,r.fillColor)(e);return t&&""!==t?"color: ".concat(t,";"):""}},8094:(e,t,n)=>{t.__esModule=!0,t.cssFromConstraints=void 0;var r=n(81171),o=n(20304);function a(e){var t,n,a="";switch(null===(t=e.constraints)||void 0===t?void 0:t.horizontal){case"MAX":a+="right: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width-e.width-e.x),"px;");break;case"STRETCH":a+="right: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width-e.width-e.x),"px; left: ").concat(e.x,"px;");break;case"CENTER":a+="left: calc(50% - ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).width/2-e.x),"px);");break;default:a+="left: ".concat((0,r.cleanNumber)(e.x),"px;")}switch(null===(n=e.constraints)||void 0===n?void 0:n.vertical){case"MAX":a+="bottom: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height-e.height-e.y),"px;");break;case"STRETCH":a+="bottom: ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height-e.height-e.y),"px; top: ").concat(e.y,"px;");break;case"CENTER":a+="top: calc(50% - ".concat((0,r.cleanNumber)((0,o.findAbsoluteParent)(e).height/2-e.y),"px);");break;default:a+="top: ".concat((0,r.cleanNumber)(e.y),"px;")}return a}t.cssFromConstraints=a,t.default=a},25618:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t,n,o,a,i;if((0,r.willBeRenderedAsSVG)(e))return"";var l="",c="";return"VERTICAL"===e.layoutMode&&(l="AUTO"===e.primaryAxisSizingMode?"auto":(0,r.cleanNumber)(e.height)+"px",c="AUTO"===e.counterAxisSizingMode?"auto":(0,r.cleanNumber)(e.width)+"px"),"HORIZONTAL"===e.layoutMode&&(c="AUTO"===e.primaryAxisSizingMode?"auto":(0,r.cleanNumber)(e.width)+"px",l="AUTO"===e.counterAxisSizingMode?"auto":(0,r.cleanNumber)(e.height)+"px"),e.layoutMode&&"NONE"!==e.layoutMode||(l=(null===(t=e.textAutoResize)||void 0===t?void 0:t.toString().includes("HEIGHT"))?"auto":(0,r.cleanNumber)(e.height)+"px",c=(null===(n=e.textAutoResize)||void 0===n?void 0:n.toString().includes("WIDTH"))?"auto":(0,r.cleanNumber)(e.width)+"px"),e.children&&0!==(null===(o=e.children)||void 0===o?void 0:o.length)||"TEXT"===e.type||(l=(0,r.cleanNumber)(e.height)+"px",c=(0,r.cleanNumber)(e.width)+"px"),("VERTICAL"===e.parent.layoutMode&&"STRETCH"===e.layoutAlign||"STRETCH"===(null===(a=e.constraints)||void 0===a?void 0:a.horizontal))&&(c="auto"),"HORIZONTAL"===e.parent.layoutMode&&1===e.layoutGrow&&(c="auto"),("HORIZONTAL"===e.parent.layoutMode&&"STRETCH"===e.layoutAlign||"VERTICAL"===e.parent.layoutMode&&1===e.layoutGrow||"STRETCH"===(null===(i=e.constraints)||void 0===i?void 0:i.vertical))&&(l="auto"),"width: ".concat(c,"; height: ").concat(l,";")}},53997:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t=1===e.layoutGrow?"flex: 1;":"TEXT"!==e.type&&"AUTO"!==e.primaryAxisSizingMode?"flex-shrink: 0;":"",n="STRETCH"===e.layoutAlign?"align-self: stretch;":"",o={MIN:"flex-start",MAX:"flex-end",CENTER:"center",SPACE_BETWEEN:"space-between"},a=function(t){return"\n      display: flex;\n      flex-direction: ".concat(t,";\n      gap: ").concat((0,r.cleanNumber)(e.itemSpacing),"px;\n      align-items: ").concat(o[e.counterAxisAlignItems],";\n      justify-content: ").concat(o[e.primaryAxisAlignItems],";\n    ")},i="";return"VERTICAL"===e.layoutMode&&(i=a("column")),"HORIZONTAL"===e.layoutMode&&(i=a("row")),"HORIZONTAL"!==e.parent.layoutMode&&"VERTICAL"!==e.parent.layoutMode||(i+=n+t),i}},90270:(e,t,n)=>{t.__esModule=!0,t.fillColor=void 0;var r=n(81171),o=n(43743);function a(e){var t;if((0,r.willBeRenderedAsSVG)(e))return"";var n=null===(t=e.fills)||void 0===t?void 0:t[0];return(0,o.getColor)(n,e.fillStyleId)}t.fillColor=a,t.default=a},20304:(e,t)=>{function n(e){return"GROUP"===e.parent.type?n(e.parent):e.parent}t.__esModule=!0,t.findAbsoluteParent=void 0,t.findAbsoluteParent=n,t.default=n},92889:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(65896),a=n(17522),i=n(52996);t.default=function(e){var t,n,l,c=(0,a.fontStyleAsObject)(e.fontName),u=c.weight,s=c.isItalic,d=Number(null===(t=e.fontSize)||void 0===t?void 0:t.toString()),f=null===(n=e.fontName.family)||void 0===n?void 0:n.toString(),p=(0,i.default)(e),v=(0,o.fontShorthand)({lineHeight:p,fontSize:d,weight:u,fontFamily:f,isItalic:s});if(e.textStyleId){var g=(0,r.cleanStyleName)(null===(l=figma.getStyleById(e.textStyleId.toString()))||void 0===l?void 0:l.name);return"font: var(--".concat(g,", ").concat(v,");")}return"font: ".concat(v,";")}},65896:(e,t,n)=>{t.__esModule=!0,t.fontShorthand=void 0;var r=n(81171);function o(e){var t=e.lineHeight,n=e.fontSize,o=e.weight,a=e.fontFamily,i=e.isItalic?"italic ":"";return"".concat(o," ").concat(i).concat((0,r.cleanNumber)(n),"px").concat(""!==t?"/"+t:""," '").concat(a,"'")}t.fontShorthand=o,t.default=o},17522:(e,t)=>{function n(e){var t,n,r=null===(t=null==e?void 0:e.style)||void 0===t?void 0:t.toLowerCase().includes("italic"),o={thin:100,"extra light":200,extralight:200,light:300,normal:400,regular:400,medium:500,"semi bold":600,semibold:600,bold:700,"extra bold":800,extrabold:800,black:900},a=null===(n=null==e?void 0:e.style)||void 0===n?void 0:n.toLowerCase().replace("italic","").trim();return{weight:o[a]?o[a]:"400",isItalic:r}}t.__esModule=!0,t.fontStyleAsObject=void 0,t.fontStyleAsObject=n,t.default=n},43743:(e,t,n)=>{t.__esModule=!0,t.getColor=void 0;var r=n(81171),o=n(18207);function a(e,t){var n;if(!e||!e.visible)return"transparent";if("GRADIENT_LINEAR"===e.type)return(0,o.gradientLinear)(e);if(t){var a=(0,r.cleanStyleName)(null===(n=figma.getStyleById(t))||void 0===n?void 0:n.name),i=e.opacity<1?(0,r.rgbaColor)(e.color,e.opacity):(0,r.rgbToHex)(e.color);return"var(--".concat(a,", ").concat(i,")")}return e.opacity<1?(0,r.rgbaColor)(e.color,e.opacity):(0,r.rgbToHex)(e.color)}t.getColor=a,t.default=a},18207:(e,t,n)=>{t.__esModule=!0,t.gradientLinear=void 0;var r=n(81171);function o(e){var t=e.gradientStops,n=(0,r.getTransforms)(e.gradientTransform);console.log(e.gradientTransform);var o=t.map((function(e){return"".concat((0,r.rgbaColor)(e.color,e.color.a)," ").concat(100*e.position,"%")}));return"linear-gradient(".concat(n.angle+90,"deg, ").concat(o.join(","),")")}t.gradientLinear=o,t.default=o},60675:(e,t,n)=>{t.__esModule=!0,t.textDecorationProp=t.textTransformProp=t.fontProp=t.fontShorthand=t.lineHeight=t.getColor=t.strokeColor=t.borderRadiusProp=t.gradientLinear=t.transformProps=t.colorProp=t.backgroundProp=t.fillColor=t.fontStyleAsObject=t.boxShadowProp=t.positionProps=t.cssFromConstraints=t.findAbsoluteParent=t.opacityProp=t.overflowProp=t.dimensions=t.displayProp=t.paddingProp=t.borderProp=void 0;var r=n(74796);t.borderProp=r.default;var o=n(16043);t.paddingProp=o.default;var a=n(53997);t.displayProp=a.default;var i=n(25618);t.dimensions=i.default;var l=n(23419);t.overflowProp=l.default;var c=n(89605);t.opacityProp=c.default;var u=n(20304);t.findAbsoluteParent=u.default;var s=n(8094);t.cssFromConstraints=s.default;var d=n(86204);t.positionProps=d.default;var f=n(80544);t.boxShadowProp=f.default;var p=n(17522);t.fontStyleAsObject=p.default;var v=n(90270);t.fillColor=v.default;var g=n(59339);t.backgroundProp=g.default;var h=n(68491);t.colorProp=h.default;var m=n(77871);t.transformProps=m.default;var b=n(18207);t.gradientLinear=b.default;var y=n(33143);t.borderRadiusProp=y.default;var x=n(67526);t.strokeColor=x.default;var S=n(43743);t.getColor=S.default;var w=n(52996);t.lineHeight=w.default;var N=n(65896);t.fontShorthand=N.default;var A=n(92889);t.fontProp=A.default;var T=n(73708);t.textTransformProp=T.default;var P=n(2094);t.textDecorationProp=P.default},52996:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){if(!e.lineHeight)return"";if("AUTO"===e.lineHeight.unit)return"";var t={PIXELS:"px",PERCENT:"%"}[e.lineHeight.unit];return"".concat((0,r.cleanNumber)(e.lineHeight.value)).concat(t)}},89605:(e,t)=>{t.__esModule=!0,t.default=function(e){return 1===e.opacity?"":"opacity: ".concat(e.opacity,";")}},23419:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return(0,r.willBeRenderedAsSVG)(e)?"overflow: visible;":e.clipsContent?"overflow: hidden;":""}},16043:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){return e.paddingTop||e.paddingRight||e.paddingBottom||e.paddingLeft?"padding: ".concat((0,r.cleanNumber)(e.paddingTop),"px ").concat((0,r.cleanNumber)(e.paddingRight),"px ").concat((0,r.cleanNumber)(e.paddingBottom),"px ").concat((0,r.cleanNumber)(e.paddingLeft),"px;"):""}},86204:(e,t,n)=>{t.__esModule=!0;var r=n(81171),o=n(8094);t.default=function(e){var t="";return e.id!==figma.currentPage.selection[0].id&&(t=(0,o.cssFromConstraints)(e)),"\n      position: ".concat(function(e){var n,o=figma.currentPage.selection[0];return"GROUP"!==e.type||(0,r.willBeRenderedAsSVG)(e)?e.id===o.id||"COMPONENT_SET"===(null===(n=e.parent)||void 0===n?void 0:n.type)?"relative;":"".concat("NONE"!==e.parent.layoutMode&&e.parent.layoutMode?"relative;":"absolute; ".concat(t)):"static;"}(e),"\n    ")}},67526:(e,t,n)=>{t.__esModule=!0,t.strokeColor=void 0;var r=n(43743);function o(e){var t,n=null===(t=e.strokes)||void 0===t?void 0:t[0];return(0,r.getColor)(n,e.strokeStyleId)}t.strokeColor=o,t.default=o},2094:(e,t)=>{t.__esModule=!0,t.default=function(e){if(!e.textDecoration)return"";var t={STRIKETHROUGH:"line-through",UNDERLINE:"underline"};return t[e.textDecoration]?"text-decoration: ".concat(t[e.textDecoration],";"):""}},73708:(e,t)=>{t.__esModule=!0,t.default=function(e){var t={UPPER:"uppercase",LOWER:"lowercase"};return t[e.textCase]?"text-transform: ".concat(t[e.textCase],";"):""}},77871:(e,t,n)=>{t.__esModule=!0;var r=n(81171);t.default=function(e){var t=(0,r.willBeRenderedAsSVG)(e);if("GROUP"===e.type&&!t)return"";var n=(0,r.getTransforms)(e.relativeTransform),o=(0,r.getTransforms)(e.absoluteTransform);if(0===n.angle&&1===n.scaleX&&1===n.scaleY)return"";if(t){if(!e.absoluteRenderBounds)return;return"\n      transform: translate(".concat((0,r.cleanNumber)(-1*(o.translateX-e.absoluteRenderBounds.x)),"px, ").concat((0,r.cleanNumber)(-1*(o.translateY-e.absoluteRenderBounds.y)),"px);\n    ")}return"\n    transform-origin: 0 0;\n    transform: rotate(".concat((0,r.cleanNumber)(-1*n.angle,3),"deg) scale(").concat((0,r.cleanNumber)(n.scaleX,3),", ").concat((0,r.cleanNumber)(n.scaleY,3),");\n  ")}},96804:(e,t,n)=>{t.__esModule=!0,t.getStyles=void 0;var r=n(81171),o=n(60675);t.getStyles=function(e){var t,n,a=null===(t=e.getLocalPaintStyles())||void 0===t?void 0:t.map((function(e){var t=e.name,n=e.paints;return{name:(0,r.cleanStyleName)(t),value:(0,o.getColor)(null==n?void 0:n[0],!1)}})),i=null===(n=e.getLocalTextStyles())||void 0===n?void 0:n.map((function(e){var t,n,a=(0,o.fontStyleAsObject)(e.fontName),i=a.weight,l=a.isItalic,c=null===(t=e.fontSize)||void 0===t?void 0:t.toString(),u=null===(n=e.fontName.family)||void 0===n?void 0:n.toString(),s=(0,o.lineHeight)(e);return{name:(0,r.cleanStyleName)(e.name),value:(0,o.fontShorthand)({lineHeight:s,fontSize:c,weight:i,fontFamily:u,isItalic:l})}}));return{paintStyles:a,textStyles:i}}},81171:(e,t)=>{function n(e){var t=Math.round(255*e).toString(16);return 1==t.length?"0"+t:t}function r(e){return Math.round(255*e)}function o(e){if("object"==typeof e){var t=e.r,r=e.g,o=e.b;return e.a?void 0:"#"+n(t)+n(r)+n(o)}}function a(e,t){if("object"==typeof e){var n=e.r,o=e.g,a=e.b;return"rgba(".concat(r(n),", ").concat(r(o),", ").concat(r(a),", ").concat(t.toFixed(2),")")}console.error("rgb color must be object")}function i(e){return e.replace(/[^a-z0-9_-]/g,(function(e){var t=e.charCodeAt(0);return 32==t?"-":t>=65&&t<=90?e.toLowerCase():"-"}))}function l(e){var t,n,r,o=["VECTOR","BOOLEAN_OPERATION","STAR"];return(null===(t=e.children)||void 0===t?void 0:t.length)>0&&(null===(n=e.children)||void 0===n?void 0:n.filter((function(e){return o.includes(e.type)})).length)===(null===(r=e.children)||void 0===r?void 0:r.length)}t.__esModule=!0,t.getTransforms=t.willBeRenderedAsSVG=t.allChildrenAreVector=t.cleanNumber=t.cleanStyleName=t.makeSafeForCSS=t.escapeHtml=t.colorAsHexOrRgba=t.rgbaColor=t.rgbToHex=t.componentTo255=t.componentToHex=void 0,t.componentToHex=n,t.componentTo255=r,t.rgbToHex=o,t.rgbaColor=a,t.colorAsHexOrRgba=function(e){if(e)return e.opacity&&e.opacity<1?a(e.color,e.opacity):o(e.color);console.error("colorAsHexOrRgba was called without fill object")},t.escapeHtml=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},t.makeSafeForCSS=i,t.cleanStyleName=function(e){if(e)return i(e.replaceAll(" ",""))},t.cleanNumber=function(e,t){return void 0===t&&(t=2),e?parseFloat(e.toFixed(t)):0},t.allChildrenAreVector=l,t.willBeRenderedAsSVG=function(e){return l(e)||"VECTOR"===e.type||"BOOLEAN_OPERATION"===e.type||"STAR"===e.type},t.getTransforms=function(e){var t=[e[0][0],e[0][1],e[1][0],e[1][1],e[0][2],e[1][2]],n=function(e){var t=e.a,n=e.b,r=e.c,o=e.d,a=Math.sqrt(t*t+n*n),i=Math.sqrt(r*r+o*o);t*o-n*r<0&&(t<o?a=-a:i=-i),a&&(t*=1/a,n*=1/a),i&&(r*=1/i,o*=1/i);var l=Math.atan2(n,t);if(l){var c=-n,u=t,s=t,d=n,f=r,p=o;t=u*s+c*f,n=u*d+c*p,r=-c*s+u*f,o=-c*d+u*p}return s=t,d=n,f=r,p=o,l*=180/Math.PI,{translateX:e.e,translateY:e.f,rotateZ:l,scaleX:a,scaleY:i,matrix:[s,d,f,p,0,0]}}({a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]});return{angle:n.rotateZ,scaleX:n.scaleX,scaleY:n.scaleY,translateX:t[4],translateY:t[5],svgMatrix:t.join(" "),svgMatrixWithoutTranslate:[e[0][0],e[0][1],e[1][0],e[1][1]].join(" ")}}},20675:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function l(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}};t.__esModule=!0,t.tailwind=void 0;var a=n(60480),i=n(81171),l={"0px":0,"1px":"px","2px":.5,"4px":1,"6px":1.5,"8px":2,"10px":2.5,"12px":3,"14px":3.5,"16px":4,"20px":5,"24px":6},c={padding:l,gap:l,top:l,left:l,"flex-direction":{row:"row",column:"col"},"border-radius":{"0px":"none","2px":"sm","4px":"","6px":"md","8px":"lg","12px":"xl","16px":"2xl","24px":"3xl","9999px":"full"},background:{transparent:"transparent"},"justify-content":{"flex-start":"start","flex-end":"end",center:"center"},"align-items":{"flex-start":"start","flex-end":"end",center:"center"},"align-self":{stretch:"stretch"},overflow:{hidden:"hidden",visible:"visible"}};function u(e,t){var n=e.replaceAll("\n","").split(";").map((function(e){return e.trim()})).filter((function(e){return""!==e})).map((function(e){var t=e.split(":"),n=t[0],r=t[1];return{key:null==n?void 0:n.trim(),value:null==r?void 0:r.trim()}})),r={"border-radius":"rounded",width:"w",height:"h","text-align":"text","flex-direction":"flex",position:"",display:"",flex:"flex",gap:"gap",top:"top",left:"left","justify-content":"justify","align-items":"items","align-self":"self",overflow:"overflow"},o=["padding","margin","box-sizing"],a=[],i=n.map((function(e){var t=e.key,n=e.value;if(o.includes(t))return null;var i=s(t,n),l=r[t];return void 0===l?(a.push("".concat(t,": ").concat(n)),null):""===l?i:""===i?l:[l,i].join("-")})),l=function(e){var t=[];if(e.paddingLeft){var n=[e.paddingTop,e.paddingRight,e.paddingBottom,e.paddingLeft];if(n.every((function(e){return e===n[0]})))t.push("p-".concat(s("padding",n[0]+"px")));else{var r=["t","r","b","l"];n.forEach((function(e,n){t.push("p".concat(r[n],"-").concat(s("padding",e+"px")))}))}}return t}(t);return{classNames:i.concat(l).filter((function(e){return null!==e})).join(" "),inlineStyles:a.join("; ")}}function s(e,t){var n,r=null===(n=c[e])||void 0===n?void 0:n[t];return["display","position","text-align","flex"].includes(e)?t:void 0===r?"[".concat(t.replace(/\s/g,""),"]"):""===r?"":r}t.tailwind=function(e){return r(this,void 0,void 0,(function(){function t(e){return r(this,void 0,void 0,(function(){var n=this;return o(this,(function(l){switch(l.label){case 0:return(null==e?void 0:e.length)>0?[4,Promise.all(e.map((function(e){return r(n,void 0,void 0,(function(){var n,r;return o(this,(function(o){switch(o.label){case 0:return(0,i.willBeRenderedAsSVG)(e)?[4,(0,a.createSVG)(e.originalNode,"".concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles))]:[3,2];case 1:return[2,o.sent()];case 2:return r=(n='<div class="'.concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles,'">\n').concat(e.characters?e.characters.replaceAll("\n","<br />"):""," ")).concat,[4,t(e.children)];case 3:return[2,r.apply(n,[o.sent(),"\n</div>"])]}}))}))})))]:[3,2];case 1:return[2,l.sent().join("")];case 2:return[2,""]}}))}))}var n,l,c,s;return o(this,(function(r){switch(r.label){case 0:return n="",(0,i.willBeRenderedAsSVG)(e)?[4,(0,a.createSVG)(e.originalNode,"".concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles))]:[3,2];case 1:return n=r.sent(),[3,4];case 2:return l=n,s=(c='<div class="'.concat(u(e.css,e.originalNode).classNames,'" style="').concat(u(e.css,e.originalNode).inlineStyles,'">\n').concat(e.characters?e.characters.replaceAll("\n","<br />"):""," ")).concat,[4,t(e.children)];case 3:n=l+s.apply(c,[r.sent(),"\n</div>"]),r.label=4;case 4:return[2,n]}}))}))}}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}(60480)})();