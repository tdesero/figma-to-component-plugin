import { useState } from "react";
import { SETTINGS } from "../../constants";
import { Button } from "./Button";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";

export default function Settings({ settings }) {
  const [cssStyle, setCssStyle] = useState(settings?.cssStyle);
  const [varStyle, setVarStyle] = useState(settings?.varStyle);

  const onCssStyleSelect = (style) => {
    setCssStyle(style);
    window.parent.postMessage(
      {
        pluginMessage: {
          type: "setting",
          key: "cssStyle",
          value: style,
        },
      },
      "*"
    );
  };

  const onVarStyleSelect = (style) => {
    setVarStyle(style);
    window.parent.postMessage(
      {
        pluginMessage: {
          type: "setting",
          key: "varStyle",
          value: style,
        },
      },
      "*"
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography tag="p" variant="copy-bold">
        CSS Class Naming Convention
      </Typography>
      <Spacer size="3" />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant={cssStyle === SETTINGS.CSS_STYLES.BEM ? "" : "outline"}
          onClick={() => onCssStyleSelect(SETTINGS.CSS_STYLES.BEM)}
        >
          Bem
        </Button>
        <Button
          variant={cssStyle === SETTINGS.CSS_STYLES.DEFAULT ? "" : "outline"}
          onClick={() => onCssStyleSelect(SETTINGS.CSS_STYLES.DEFAULT)}
        >
          Default
        </Button>
      </div>
      <Spacer size="5" />
      <Typography tag="p" variant="copy-bold">
        Variables
      </Typography>
      <Spacer size="3" />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant={varStyle === SETTINGS.VAR_STYLES.NONE ? "" : "outline"}
          onClick={() => onVarStyleSelect(SETTINGS.VAR_STYLES.NONE)}
        >
          None
        </Button>
        <Button
          variant={varStyle === SETTINGS.VAR_STYLES.CSS ? "" : "outline"}
          onClick={() => onVarStyleSelect(SETTINGS.VAR_STYLES.CSS)}
        >
          CSS Variables
        </Button>
      </div>
      <Spacer size="5" />
      <Typography tag="p" variant="copy-bold">
        After Updating your settings rerun the Plugin
      </Typography>
    </div>
  );
}
