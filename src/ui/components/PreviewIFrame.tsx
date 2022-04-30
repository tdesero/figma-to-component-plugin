import "./PreviewIFrame.css";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ZoomSelect } from "./ZoomSelect";

export function PreviewIFrame({ html, title, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const [zoom, setZoom] = useState(1.0);

  function setZoomVal(e) {
    return setZoom(e.target.value);
  }

  function InnerHtml({ html }) {
    return <div style={{padding: 16, textAlign: 'center'}} dangerouslySetInnerHTML={{ __html: html }} />;
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
          height: 100 / zoom + "%",
        }}
      >
        {mountNode && createPortal(<InnerHtml html={html} />, mountNode)}
      </iframe>

      <ZoomSelect
        style={{ position: "absolute", bottom: 0, left: 0, margin: 16 }}
        value={zoom}
        onChange={setZoomVal}
        options={[
          {
            value: 0.5,
            label: "50%",
          },
          {
            value: 1.0,
            label: "100%",
          },
          {
            value: 2.0,
            label: "200%",
          },
        ]}
      />
    </div>
  );
}
