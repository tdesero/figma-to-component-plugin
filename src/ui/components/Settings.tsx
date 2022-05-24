import { useState } from "react";
import { SETTINGS } from "../../constants";
import { Button } from "./Button";

export default function Settings({ settings }) {
  const [cssStyle, setCssStyle] = useState(settings.cssStyle);

  return (
    <div style={{ padding: 16 }}>
      <p style={{ marginBottom: 8 }}>CSS Methodology</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant={cssStyle === SETTINGS.CSS_STYLES.BEM ? "" : "outline"}
          onClick={() => {
            setCssStyle(SETTINGS.CSS_STYLES.BEM);
            window.parent.postMessage(
              {
                pluginMessage: {
                  type: "setting",
                  key: "cssStyle",
                  value: SETTINGS.CSS_STYLES.BEM,
                },
              },
              "*"
            );
          }}
        >
          Bem
        </Button>
        <Button
          variant={cssStyle === SETTINGS.CSS_STYLES.DEFAULT ? "" : "outline"}
          onClick={() => {
            setCssStyle(SETTINGS.CSS_STYLES.DEFAULT);
            window.parent.postMessage(
              {
                pluginMessage: {
                  type: "setting",
                  key: "cssStyle",
                  value: SETTINGS.CSS_STYLES.DEFAULT,
                },
              },
              "*"
            );
          }}
        >
          Default
        </Button>
      </div>
    </div>
  );
}
