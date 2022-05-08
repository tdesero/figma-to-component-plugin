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

var beautify = require("js-beautify");

import { TailwindIFrame } from "./components/TailwindIFrame";
import { EmptyStateNotification } from "./components/EmptyStateNotification";

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

  window.onmessage = (event) => {
    const { framework, styles, loading, notification } =
      event.data.pluginMessage;
    setLoading(loading);
    setNotification(notification);

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
    const css = event.data.pluginMessage.css;

    const name = toPascalCase(event.data.pluginMessage.name);

    var preview =
      framework === "tailwind(beta)"
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
                (framework === "tailwind(beta)" ? (
                  <TailwindIFrame html={preview} />
                ) : (
                  <PreviewIFrame title="Preview" html={preview}></PreviewIFrame>
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
            </>
          )}
        </>
      )}
    </div>
  );
}
