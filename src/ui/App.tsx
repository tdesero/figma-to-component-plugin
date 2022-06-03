import "./styles.css";
import { CodeIcon } from "./components/icons/CodeIcon";
import { StyleIcon } from "./components/icons/StyleIcon";
import { VariablesIcon } from "./components/icons/VariablesIcon";
import { VisibleIcon } from "./components/icons/VisibleIcon";
import { Toolbar } from "./components/Toolbar";
import { ToolbarBtn } from "./components/ToolbarBtn";
import { Loader } from "./components/Loader";
import { useState } from "react";
import { PreviewIFrame } from "./components/PreviewIFrame";
import { CodePreview } from "./components/CodePreview";
import { toPascalCase } from "./helpers/toPascalCase";
import Settings from "./components/Settings";

var beautify = require("js-beautify");

import { TailwindIFrame } from "./components/TailwindIFrame";
import { EmptyStateNotification } from "./components/EmptyStateNotification";
import { PARAMETERS, SETTINGS } from "../constants";
import { SettingsIcon } from "./components/icons/SettingsIcon";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("preview");
  const [code, setCode] = useState("");
  const [preview, setPreview] = useState("");
  const [css, setCss] = useState("");
  const [vars, setVars] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("html");
  const [framework, setFramework] = useState();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState();
  const [settings, setSettings] = useState();

  const [selectionWidth, setSelectionWidth] = useState();

  window.onmessage = (event) => {
    const {
      framework,
      styles,
      loading,
      notification,
      selectionWidth,
      settings,
    } = event.data.pluginMessage;
    setLoading(loading);
    setNotification(notification);
    setSettings(settings);

    if (loading || notification) {
      return;
    }

    const variables =
      ":root {\n" +
      "  /* Colors */\n" +
      styles?.paintStyles
        ?.map(({ name, value }) => {
          return `  --${name}: ${value};`;
        })
        .join("\n") +
      "\n\n  /* Fonts */\n" +
      styles?.textStyles
        ?.map(({ name, value }) => {
          return `  --${name}: ${value};`;
        })
        .join("\n") +
      "\n}\n\n";

    const html = event.data.pluginMessage.html;
    let css = event.data.pluginMessage.css;

    if (settings.varStyle === SETTINGS.VAR_STYLES.NONE) {
      css = css.replace(/var\(--[^,]*,(.*)\);/g, "$1;");
    }

    const name = toPascalCase(event.data.pluginMessage.name);

    var preview =
      framework === PARAMETERS.FRAMEWORKS.TAILWIND
        ? html
        : html + "<style>" + css + "</style>";

    const frameworkCode = (framework) => {
      let code = "";
      switch (framework) {
        case "react":
          code =
            "export const " +
            name +
            " = () => { \nreturn(\n" +
            beautify.html(html.replace(/class=/g, "className=")) +
            "\n)}";
          break;
        default:
          code = html;
      }
      return code;
    };

    setPreview(preview);
    setCss(css.replaceAll("\n \n", "\n"));
    setCode(frameworkCode(framework));
    setVars(variables);
    setFramework(framework);

    setSelectionWidth(selectionWidth);

    const languages = {
      react: "javascript",
      html: "html",
    };
    const language = languages[framework] ? languages[framework] : "html";

    setCodeLanguage(language);
  };

  return (
    <div className="App">
      <Toolbar>
        <ToolbarBtn
          icon={<VisibleIcon />}
          label="Preview"
          isSelected={selectedTab === "preview"}
          onClick={() => {
            setSelectedTab("preview");
          }}
        />
        <ToolbarBtn
          icon={<CodeIcon />}
          label="Code"
          isSelected={selectedTab === "code"}
          onClick={() => {
            setSelectedTab("code");
          }}
        />
        <ToolbarBtn
          icon={<StyleIcon />}
          label="Style"
          isSelected={selectedTab === "style"}
          onClick={() => {
            setSelectedTab("style");
          }}
        />
        <ToolbarBtn
          icon={<VariablesIcon />}
          label="Variables"
          isSelected={selectedTab === "variables"}
          onClick={() => {
            setSelectedTab("variables");
          }}
        />
        <ToolbarBtn
          icon={<SettingsIcon />}
          label="Settings"
          isSelected={selectedTab === "settings"}
          onClick={() => {
            setSelectedTab("settings");
          }}
        />
      </Toolbar>
      {notification ? (
        <EmptyStateNotification msg={notification} />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {selectedTab === "preview" &&
                (framework === PARAMETERS.FRAMEWORKS.TAILWIND ? (
                  <TailwindIFrame html={preview} />
                ) : (
                  <PreviewIFrame
                    selectionWidth={selectionWidth}
                    title="Preview"
                    html={preview}
                  ></PreviewIFrame>
                ))}
              {selectedTab === "code" && (
                <CodePreview language={codeLanguage} codeString={code} />
              )}
              {selectedTab === "style" && (
                <CodePreview language="css" codeString={css} />
              )}
              {selectedTab === "variables" && (
                <CodePreview language="css" codeString={vars} />
              )}
              {selectedTab === "settings" && <Settings settings={settings} />}
            </>
          )}
        </>
      )}
    </div>
  );
}
