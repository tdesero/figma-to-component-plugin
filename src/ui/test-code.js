export const testCss = `
.frame-29 {
box-sizing: border-box;
background: #ff5c5c;
border: 1px solid #000000;
padding: 10px 10px 10px 10px;
display: flex;
flex-direction: column;
gap: 10px;
align-items: flex-start;
justify-content: flex-start;
align-self: stretch;
width: auto;
height: auto;
position: relative;
margin: 0;
}

.frame-29__frame-28 {
box-sizing: border-box;
background: #ffffff;
padding: 32px 12px 32px 12px;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: 110px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-29__group-50 {
box-sizing: border-box;
background: transparent;
width: 388px;
height: 81px;
position: static;
margin: 0;
}

.frame-29__rectangle-56 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
left: 18px;
top: 14px;
margin: 0;
}

.frame-29__rectangle-57 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
right: 18px;
bottom: 15px;
margin: 0;
}

.frame-29__frame-29 {
box-sizing: border-box;
background: #ffffff;
padding: 32px 12px 32px 12px;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: 110px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-29__rectangle-562 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
left: 18px;
top: 14px;
margin: 0;
}

.frame-29__rectangle-572 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
right: 18px;
bottom: 15px;
margin: 0;
}

.frame-29__frame-30 {
box-sizing: border-box;
background: #ffffff;
padding: 32px 12px 32px 12px;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: 110px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-29__rectangle-563 {
box-sizing: border-box;
background: #c4c4c4;
width: auto;
height: 46px;
position: absolute;
right: 276px;
left: 18px;
top: 14px;
margin: 0;
}

.frame-29__rectangle-573 {
box-sizing: border-box;
background: #c4c4c4;
width: auto;
height: 46px;
position: absolute;
right: 18px;
left: 276px;
bottom: 15px;
margin: 0;
}

.frame-29__frame-31 {
box-sizing: border-box;
background: #ffffff;
padding: 32px 12px 32px 12px;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: 110px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-29__rectangle-564 {
box-sizing: border-box;
background: #c4c4c4;
width: auto;
height: auto;
position: absolute;
right: 276px;
left: 18px;
bottom: 50px;
top: 14px;
margin: 0;
}

.frame-29__rectangle-574 {
box-sizing: border-box;
background: #c4c4c4;
width: auto;
height: auto;
position: absolute;
right: 18px;
left: 276px;
bottom: 15px;
top: 27px;
margin: 0;
}

.frame-29__frame-32 {
box-sizing: border-box;
background: #ffffff;
padding: 32px 12px 32px 12px;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: 110px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-29__rectangle-565 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
left: calc(50% - 204px);
top: calc(50% - 41px);
margin: 0;
}

.frame-29__rectangle-575 {
box-sizing: border-box;
background: #c4c4c4;
width: 58px;
height: 46px;
position: absolute;
left: calc(50% - -146px);
bottom: 15px;
margin: 0;
}
`;

export const testHtml = `<div class="frame-29">
<div class="frame-29__frame-28">
  <div class="frame-29__group-50">
    <div class="frame-29__rectangle-56">

    </div>
    <div class="frame-29__rectangle-57">

    </div>
  </div>
</div>
<div class="frame-29__frame-29">
  <div class="frame-29__rectangle-562">

  </div>
  <div class="frame-29__rectangle-572">

  </div>
</div>
<div class="frame-29__frame-30">
  <div class="frame-29__rectangle-563">

  </div>
  <div class="frame-29__rectangle-573">

  </div>
</div>
<div class="frame-29__frame-31">
  <div class="frame-29__rectangle-564">

  </div>
  <div class="frame-29__rectangle-574">

  </div>
</div>
<div class="frame-29__frame-32">
  <div class="frame-29__rectangle-565">

  </div>
  <div class="frame-29__rectangle-575">

  </div>
</div>
</div>
`;

export const testReact = `import "./PreviewIFrame.css";

import React, { useState } from "react";
import { createPortal } from "react-dom";

export function PreviewIFrame({ children, title, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const [zoom, setZoom] = useState("1.0");

  function setZoomVal(e) {
    return setZoom(e.target.value);
  }

  return (
    <div className="preview-iframe">
      <iframe
        className="preview-iframe__iframe"
        title={title}
        {...props}
        ref={setContentRef}
        style={{
          transform: "scale(" + zoom + ")",
          width: 100 / zoom + "%",
          height: 100 / zoom + "%"
        }}
      >
        <meta name="viewport" content="width=device-width, initial-scale=4.0" />
        {mountNode && createPortal(children, mountNode)}
      </iframe>

      <select
        style={{ position: "absolute", top: 0, right: 0 }}
        value={zoom}
        onChange={setZoomVal}
      >
        <option value=".5" label="50%" />
        <option value="1.0" label="100%" />
        <option value="2.0" label="200%" />
      </select>
    </div>
  );
}
`;

export const testVars = `:root {
  /* Colors */
  --systemred-light: #ff3b30;
  --systemred-dark: #ff453a;
  --systemorange-light: #ff9500;
  --systemorange-dark: #ff9f0a;
  --systemyellow-light: #ffcc00;
  --systemyellow-dark: #ffd60a;
  --systemgreen-light: #34c759;
  --systemgreen-dark: #32d74b;
  --systemmint-light: #00c7be;
  --systemmint-dark: #66d4cf;
  --systemteal-light: #5ac8fa;
  --systemteal-dark: #40c8e0;
  --systemcyan-light: #32ade6;
  --systemcyan-dark: #64d2ff;
  --systemblue-light: #007aff;
  --systemblue-dark: #0a84ff;
  --systemindigo-light: #5856d6;
  --systemindigo-dark: #5e5ce6;
  --systempurple-light: #af52de;
  --systempurple-dark: #bf5af2;
  --systempink-light: #ff2d55;
  --systempink-dark: #ff2d55;
  --systembrown-light: #a2845e;
  --systembrown-dark: #ac8e68;
  --systemgray-light: #8e8e93;
  --systemgray-dark: #8e8e93;
  --systemgray-02-light: #aeaeb2;
  --systemgray-02-dark: #636366;
  --systemgray-03-light: #c7c7cc;
  --systemgray-03-dark: #48484a;
  --systemgray-04-light: #d1d1d6;
  --systemgray-04-dark: #3a3a3c;
  --systemgray-05-light: #e5e5ea;
  --systemgray-05-dark: #1c1c1e;
  --systemgray-06-light: #f2f2f7;
  --systemgray-06-dark: #1c1c1e;
  --systembackground-light-primary: #ffffff;
  --systembackground-light-secondary: #f2f2f7;
  --systembackground-light-tertiary: #ffffff;
  --systembackground-darkelevated-primary: #1c1c1e;
  --systembackground-darkelevated-secondary: #2c2c2e;
  --systembackground-darkelevated-tertiary: #3a3a3c;
  --systembackground-darkbase-primary: #000000;
  --systembackground-darkbase-secondary: #1c1c1e;
  --systembackground-darkbase-tertiary: #2c2c2e;
  --labelcolor-light-primary: #000000;
  --labelcolor-light-secondary: rgba(60, 60, 67, 0.60);
  --labelcolor-light-tertiary: rgba(60, 60, 67, 0.30);
  --labelcolor-light-quaternary: rgba(60, 60, 67, 0.18);
  --labelcolor-dark-primary: #ffffff;
  --labelcolor-dark-secondary: rgba(235, 235, 245, 0.60);
  --labelcolor-dark-tertiary: rgba(235, 235, 245, 0.30);
  --labelcolor-dark-quaternary: rgba(235, 235, 245, 0.16);
  --separatorcolor-light-notransparency: #c6c6c8;
  --separatorcolor-light-withtransparency: rgba(60, 60, 67, 0.29);
  --separatorcolor-dark-notransparency: #38383a;
  --separatorcolor-dark-withtransparency: rgba(84, 84, 88, 0.60);
  --fillcolor-light-primary: rgba(120, 120, 128, 0.20);
  --fillcolor-light-secondary: rgba(120, 120, 128, 0.16);
  --fillcolor-light-tertiary: rgba(118, 118, 128, 0.12);
  --fillcolor-light-quaternary: rgba(116, 116, 128, 0.08);
  --fillcolor-dark-primary: rgba(120, 120, 128, 0.36);
  --fillcolor-dark-secondary: rgba(120, 120, 128, 0.32);
  --fillcolor-dark-tertiary: rgba(118, 118, 128, 0.24);
  --fillcolor-dark-quaternary: rgba(116, 116, 128, 0.18);

  /* Fonts */
  --sf-regular-caption2: 400 11px/13px 'Inter';
  --sf-regular-caption1: 400 12px/16px 'Inter';
  --sf-regular-footnote: 400 13px/18px 'Inter';
  --sf-regular-subhead: 400 15px/20px 'Inter';
  --sf-regular-callout: 400 16px/21px 'Inter';
  --sf-regular-body: 400 17px/22px 'Inter';
  --sf-regular-headline: 100 17px/22px 'Inter';
  --sf-regular-title3: 400 20px/25px 'Inter';
  --sf-regular-title2: 400 22px/28px 'Inter';
  --sf-regular-title1: 400 28px/34px 'Inter';
  --sf-regular-largetitle: 400 34px/41px 'Inter';
  --sf-bold-caption2: 100 11px/13px 'Inter';
  --sf-bold-caption1: 500 12px/16px 'Inter';
  --sf-bold-footnote: 100 13px/18px 'Inter';
  --sf-bold-subhead: 100 15px/20px 'Inter';
  --sf-bold-callout: 100 16px/21px 'Inter';
  --sf-bold-body: 700 17px/22px 'Inter';
  --sf-bold-headline: 100 17px/22px 'Inter';
  --sf-bold-title3: 100 20px/25px 'Inter';
  --sf-bold-title2: 700 22px/28px 'Inter';
  --sf-bold-title1: 700 28px/34px 'Inter';
  --sf-bold-largetitle: 700 34px/41px 'Inter';
  --ny-regular-caption2: 400 11px/13px 'Inter';
  --ny-regular-caption1: 400 12px/16px 'Inter';
  --ny-regular-footnote: 400 13px/18px 'Inter';
  --ny-regular-subhead: 400 15px/20px 'Inter';
  --ny-regular-callout: 400 16px/21px 'Inter';
  --ny-regular-body: 400 17px/22px 'Inter';
  --ny-regular-headline: 100 17px/22px 'Inter';
  --ny-regular-title3: 400 20px/25px 'Inter';
  --ny-regular-title2: 400 22px/28px 'Inter';
  --ny-regular-title1: 400 28px/34px 'Inter';
  --ny-regular-largetitle: 400 34px/41px 'Inter';
  --ny-bold-caption2: 100 11px/13px 'Inter';
  --ny-bold-caption1: 500 12px/16px 'Inter';
  --ny-bold-footnote: 100 13px/18px 'Inter';
  --ny-bold-subhead: 100 15px/20px 'Inter';
  --ny-bold-callout: 100 16px/21px 'Inter';
  --ny-bold-body: 700 17px/22px 'Inter';
  --ny-bold-headline: 100 17px/22px 'Inter';
  --ny-bold-title3: 100 20px/25px 'Inter';
  --ny-bold-title2: 700 22px/28px 'Inter';
  --ny-bold-title1: 700 28px/34px 'Inter';
  --ny-bold-largetitle: 700 34px/41px 'Inter';
}

`;

export const testPreview = `<div class="frame-44">
<div class="frame-44__plugin">
  <div class="frame-44__floating-window-background">
    <div class="frame-44__background">

    </div>
  </div>
  <div class="frame-44__body">
    <div class="frame-44__tools">
      <div class="frame-44__toolbar-btn">
        <div class="frame-44__16---visible--16-16-">
          <svg class="frame-44__32---visible" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 19C13.7003 19 11.678 17.8058 10.5218 16C11.678 14.1942 13.7003 13 16.0002 13C18.3 13 20.3223 14.1942 21.4785 16C20.3223 17.8058 18.3 19 16.0002 19ZM16.0002 12C18.8782 12 21.3776 13.6211 22.6351 16C21.3776 18.3789 18.8782 20 16.0002 20C13.1221 20 10.6227 18.3789 9.36523 16C10.6227 13.6211 13.1221 12 16.0002 12ZM16.0005 18C17.1051 18 18.0005 17.1046 18.0005 16C18.0005 14.8954 17.1051 14 16.0005 14C14.8959 14 14.0005 14.8954 14.0005 16C14.0005 17.1046 14.8959 18 16.0005 18Z" fill="white" />
          </svg>

        </div>
        <div class="frame-44__preview">
          Preview
        </div>
      </div>
      <div class="frame-44__toolbar-btn2">
        <svg class="frame-44__code" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.6665 8L15.0201 8.35355C15.2153 8.15829 15.2153 7.84171 15.0201 7.64645L14.6665 8ZM11.0201 12.3536L15.0201 8.35355L14.313 7.64645L10.313 11.6464L11.0201 12.3536ZM15.0201 7.64645L11.0201 3.64645L10.313 4.35355L14.313 8.35355L15.0201 7.64645Z" fill="white" />
          <path d="M1.3335 8L0.979943 7.64645C0.784681 7.84171 0.784681 8.15829 0.979943 8.35355L1.3335 8ZM4.97994 3.64645L0.979943 7.64645L1.68705 8.35355L5.68705 4.35355L4.97994 3.64645ZM0.979943 8.35355L4.97994 12.3536L5.68705 11.6464L1.68705 7.64645L0.979943 8.35355Z" fill="white" />
        </svg>
        <div class="frame-44__preview2">
          Code
        </div>
      </div>
      <div class="frame-44__toolbar-btn3">
        <svg class="frame-44__32---blend-empty" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.69485 3.72005C8.47476 3.49109 8.24368 3.25204 8.00162 3.00162C8.00109 3.00108 8.00057 3.00054 8.00005 3L7.99961 3.00046C7.99926 3.00081 7.99892 3.00117 7.99857 3.00153C7.75647 3.25198 7.52537 3.49106 7.30526 3.72005C5.10181 6.01238 4.00001 7.29386 4.00001 8.85188C3.9975 9.91425 4.38812 10.9775 5.17166 11.788C6.73374 13.404 9.26637 13.404 10.8284 11.788C11.612 10.9775 12.0025 9.91429 12 8.85191C12 7.29389 10.8983 6.01238 8.69485 3.72005ZM8.00005 4.4404C7.02355 5.457 6.30665 6.23086 5.80482 6.91125C5.20502 7.72447 5.00001 8.2912 5.00001 8.85188V8.85424C4.99808 9.67196 5.29843 10.4804 5.89065 11.093C7.05965 12.3023 8.94046 12.3023 10.1095 11.093C10.7016 10.4804 11.0019 9.67205 11 8.85428L11 8.85191C11 8.29121 10.795 7.72446 10.1952 6.91125C9.69341 6.23086 8.97654 5.45699 8.00005 4.4404Z" fill="white" />
        </svg>
        <div class="frame-44__preview3">
          CSS
        </div>
      </div>
      <div class="frame-44__toolbar-btn4">
        <svg class="frame-44__32---library" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55755 12.5836H8.4455C8.50866 12.5114 8.57581 12.4424 8.64667 12.3767C8.79769 12.2367 8.96559 12.1121 9.14784 12.0058C10.1914 11.397 11.9748 11.364 12.95 12.0823H13H14V11.0823V5.58823C14 5.58823 13.4375 4 10.88 4C9.77452 4 9.08663 4.29675 8.66187 4.6337C8.22217 4.98251 8.06443 5.37441 8.01733 5.52482H7.98267C7.93557 5.37441 7.77783 4.98251 7.33813 4.6337C6.91337 4.29675 6.22548 4 5.12 4C2.5625 4 2 5.58823 2 5.58823V11.0753V12.0753H3H3.05C4.02605 11.3564 5.81096 11.3907 6.85381 12.0016C7.0365 12.1086 7.20471 12.234 7.35587 12.3749C7.42696 12.4411 7.49427 12.5108 7.55755 12.5836ZM8.5 5.78723V11.2302C8.54726 11.1998 8.59526 11.1704 8.64397 11.142C9.35376 10.7279 10.2467 10.5399 11.0824 10.5464C11.7133 10.5514 12.3962 10.6683 13 10.9545V5.83286C12.9494 5.7581 12.8681 5.65676 12.7459 5.55133C12.4771 5.3195 11.9325 5 10.88 5C9.82661 5 9.37254 5.31824 9.18515 5.5041C9.0804 5.60801 9.02353 5.70572 8.99487 5.7665C8.98051 5.79697 8.97363 5.81739 8.97181 5.8231C8.97092 5.82588 8.97138 5.82475 8.97284 5.81907L8.97576 5.80693L8.97773 5.79806L8.97883 5.7929L8.97941 5.79013L8.9797 5.78869C8.97973 5.78857 8.97975 5.78844 8.97445 5.78723H8.5ZM7.5 5.78723H7.02555C7.02025 5.78844 7.02027 5.78857 7.0203 5.78869L7.02059 5.79013L7.02117 5.7929L7.02227 5.79806L7.02423 5.80693L7.02716 5.81907C7.02798 5.82223 7.02848 5.82398 7.02861 5.82443L7.02819 5.8231C7.02637 5.81739 7.01949 5.79697 7.00513 5.7665C6.97647 5.70572 6.9196 5.60801 6.81485 5.5041C6.62746 5.31824 6.17339 5 5.12 5C4.06753 5 3.52287 5.3195 3.2541 5.55133C3.13187 5.65676 3.05062 5.7581 3 5.83286V10.9475C3.60452 10.661 4.28818 10.5442 4.91981 10.5398C5.75607 10.5339 6.64956 10.723 7.35926 11.1387C7.40686 11.1666 7.45378 11.1955 7.5 11.2252V5.78723ZM7.02863 5.82453C7.02865 5.82459 7.02864 5.82456 7.02861 5.82443Z" fill="white" />
        </svg>
        <div class="frame-44__preview4">
          Variables
        </div>
      </div>
    </div>
    <div class="frame-44__iframe">

    </div>
  </div>
  <div class="frame-44__floating-title-bar">
    <svg class="frame-44__-" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 15.2931L20.6465 10.6466L21.3536 11.3537L16.7071 16.0002L21.3536 20.6466L20.6465 21.3537L16 16.7073L11.3536 21.3537L10.6465 20.6466L15.2929 16.0002L10.6465 11.3538L11.3536 10.6467L16 15.2931Z" fill="black" fill-opacity="0.8" />
    </svg>
    <div class="frame-44__rectangle-23">

    </div>
  </div>
  <div class="frame-44__title">
    Dialog
  </div>
</div>
</div>

<style>
.frame-44 {
box-sizing: border-box;
background: #ffffff;
padding: 10px 10px 10px 10px;
display: flex;
flex-direction: row;
gap: 10px;
align-items: flex-start;
justify-content: flex-start;
width: 468px;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__plugin {
box-sizing: border-box;
background: transparent;
flex: 1;
width: auto;
height: 383px;
position: relative;
margin: 0;
}

.frame-44__floating-window-background {
box-sizing: border-box;
background: transparent;
width: auto;
height: auto;
position: absolute;
right: 0px;
left: 0px;
bottom: 0px;
top: 0px;
margin: 0;
}

.frame-44__background {
box-sizing: border-box;
background: #ffffff;
border-radius: 2px;
border: 0.5px solid rgba(0, 0, 0, 0.20);
width: auto;
height: auto;
position: absolute;
right: 0px;
left: 0px;
bottom: 0px;
top: 0px;
box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.15);
margin: 0;
}

.frame-44__body {
box-sizing: border-box;
background: transparent;
display: flex;
flex-direction: column;
gap: 0px;
align-items: flex-start;
justify-content: flex-start;
width: auto;
height: auto;
position: absolute;
right: 0px;
left: 0px;
bottom: 0px;
top: 41px;
margin: 0;
overflow: hidden;
}

.frame-44__tools {
box-sizing: border-box;
background: var(--background-toolbar, #2c2c2c);
display: flex;
flex-direction: row;
gap: 0px;
align-items: flex-start;
justify-content: flex-start;
align-self: stretch;
flex-shrink: 0;
width: auto;
height: auto;
position: relative;
margin: 0;
}

.frame-44__toolbar-btn {
box-sizing: border-box;
background: var(--figma-primary, #18a0fb);
padding: 12px 16px 12px 16px;
display: flex;
flex-direction: row;
gap: 8px;
align-items: flex-start;
justify-content: flex-start;
width: auto;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__16---visible--16-16- {
box-sizing: border-box;
background: transparent;
width: 16px;
height: 16px;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__32---visible {
box-sizing: border-box;
background: ;
position: absolute;
left: -8px;
top: -8px;
margin: 0;
overflow: visible;
}

.frame-44__preview {
color: var(--white, #ffffff);
text-align: left;
font: var(--pos-ui11medium, 500 11px/16px 'Inter');
position: relative;
width: auto;
height: auto;
margin: 0;
}

.frame-44__toolbar-btn2 {
box-sizing: border-box;
background: transparent;
padding: 12px 16px 12px 16px;
display: flex;
flex-direction: row;
gap: 8px;
align-items: flex-start;
justify-content: flex-start;
width: auto;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__code {
box-sizing: border-box;
background: ;
position: relative;
margin: 0;
overflow: visible;
}

.frame-44__preview2 {
color: var(--white, #ffffff);
text-align: left;
font: var(--pos-ui11medium, 500 11px/16px 'Inter');
position: relative;
width: auto;
height: auto;
margin: 0;
}

.frame-44__toolbar-btn3 {
box-sizing: border-box;
background: transparent;
padding: 12px 16px 12px 16px;
display: flex;
flex-direction: row;
gap: 8px;
align-items: flex-start;
justify-content: flex-start;
width: auto;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__32---blend-empty {
box-sizing: border-box;
background: ;
position: relative;
margin: 0;
overflow: visible;
}

.frame-44__preview3 {
color: var(--white, #ffffff);
text-align: left;
font: var(--pos-ui11medium, 500 11px/16px 'Inter');
position: relative;
width: auto;
height: auto;
margin: 0;
}

.frame-44__toolbar-btn4 {
box-sizing: border-box;
background: transparent;
padding: 12px 16px 12px 16px;
display: flex;
flex-direction: row;
gap: 8px;
align-items: flex-start;
justify-content: flex-start;
width: auto;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__32---library {
box-sizing: border-box;
background: ;
position: relative;
margin: 0;
overflow: visible;
}

.frame-44__preview4 {
color: var(--white, #ffffff);
text-align: left;
font: var(--pos-ui11medium, 500 11px/16px 'Inter');
position: relative;
width: auto;
height: auto;
margin: 0;
}

.frame-44__iframe {
box-sizing: border-box;
background: #e5e5e5;
align-self: stretch;
flex: 1;
width: auto;
height: auto;
position: relative;
margin: 0;
overflow: hidden;
}

.frame-44__floating-title-bar {
box-sizing: border-box;
background: transparent;
width: auto;
height: 40px;
position: absolute;
right: 0px;
left: 0px;
top: 0px;
margin: 0;
}

.frame-44__- {
box-sizing: border-box;
background: ;
position: absolute;
right: 4px;
top: 4px;
margin: 0;
overflow: visible;
}

.frame-44__rectangle-23 {
box-sizing: border-box;
background: var(--special-black1, rgba(0, 0, 0, 0.10));
width: auto;
height: 1px;
position: absolute;
right: 0px;
left: 0px;
bottom: -1px;
margin: 0;
}

.frame-44__title {
color: var(--black8, rgba(0, 0, 0, 0.80));
text-align: left;
font: var(--pos-ui11bold, 600 11px/16px 'Inter');
position: absolute;
right: 48px;
left: 16px;
top: 12px;
width: auto;
height: 16px;
margin: 0;
}
</style>`;
