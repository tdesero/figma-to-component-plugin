import { CodeIcon } from "./components/icons/CodeIcon";
import { StyleIcon } from "./components/icons/StyleIcon";
import { VariablesIcon } from "./components/icons/VariablesIcon";
import { VisibleIcon } from "./components/icons/VisibleIcon";
import { Toolbar } from "./components/Toolbar";
import { ToolbarBtn } from "./components/ToolbarBtn";
import "./styles.css";
import { useState } from "react";
import { PreviewIFrame } from "./components/PreviewIFrame";
import { CodePreview } from "./components/CodePreview";

var beautify = require('js-beautify');

/* temp */
import {
  testCss,
  testHtml,
  testPreview,
  testReact,
  testVars
} from "./test-code";

 /* helpers */
 function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
/* helpers end */


export default function App() {
  const [selectedTab, setSelectedTab] = useState("preview");
  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');
  const [css, setCss] = useState('');
  const [vars, setVars] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('html');


  window.onmessage = (event) => {
    const framework = event.data.pluginMessage.framework;
    const styles = event.data.pluginMessage.styles;
  
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
        ? "No preview possible"
        : html + "<style>" + css + "</style>";
  
    const frameworkCode = (framework) => {
      let code = '';
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
    }
   
    setPreview(preview);
    setCss(css.replaceAll('\n \n', '\n'));
    setCode(frameworkCode(framework));
    setVars(variables);

    const languages = {
      react: 'javascript',
      html: 'html'
    }
    const language = languages[framework] ? languages[framework] : 'html' 

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
      {selectedTab === "preview" && (
        <PreviewIFrame title="Preview" html={preview}></PreviewIFrame>
      )}
      {selectedTab === "code" && (
        <CodePreview language={codeLanguage} codeString={code} />
      )}
      {selectedTab === "style" && (
        <CodePreview language="css" codeString={css} />
      )}
      {selectedTab === "variables" && (
        <CodePreview language="css" codeString={vars} />
      )}
    </div>
  );
}
