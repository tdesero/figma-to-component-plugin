import "./CodePreview.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "./Button";
import copyToClipboard from "../helpers/copyToClipboard";

/*
const prettier = require("prettier/standalone");
const parserHtml = require("prettier/parser-html");
const parserCss = require("prettier/parser-postcss");
const parserBabel = require("prettier/parser-babel");*/

var beautify = require('js-beautify');

export const CodePreview = ({ codeString, language }) => {
  const syntaxLang = {
    html: "xml",
    javascript: "javascript",
    css: "css"
  };

  const beautifyLang = {
    html: "html",
    javascript: "js",
    css: "css"
  };

  const beautifyLangName = beautifyLang[language];

  const options = {
    css: {
      indent_size: "2",
      indent_char: " ",
      max_preserve_newlines: "-1",
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: "normal",
      brace_style: "collapse",
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: "0",
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    },
    default: {
      indent_size: "2",
      indent_char: " ",
      max_preserve_newlines: "5",
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: "normal",
      brace_style: "collapse",
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: "0",
      indent_inner_html: false,
      comma_first: false,
      e4x: true,
      indent_empty_lines: false,
    }
  }

  const langOptions = options[language] ? options[language] : options['default']

  const formattedCode = beautify[beautifyLangName](codeString, langOptions) /*prettier.format(codeString, {
    parser: prettierLang[language],
    plugins: [parserHtml, parserCss, parserBabel]
  });*/

  return (
    <div className="code-preview">
      <Button
        style={{ position: "fixed", left: 0, bottom: 0, margin: 16 }}
        onClick={() => {
          copyToClipboard(formattedCode);
        }}
      >
        Copy
      </Button>
      <SyntaxHighlighter language={syntaxLang[language]} style={vs2015} customStyle={{padding: 16, paddingBottom: 64}}>
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
};
