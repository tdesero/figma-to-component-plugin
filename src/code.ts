import { getStyles } from "./core/getStyles";

/* Beta */
import { tailwind } from "./core/tailwind";

import { createTree } from "./core/createTree";
import { printCSS } from "./core/printCSS";
import { printHTML } from "./core/printHTML";

import { PARAMETERS } from "./constants";

figma.ui.onmessage = (msg) => {
  figma.clientStorage.setAsync(msg.key, msg.value);
};

async function createHTMLandCSS(selection, parameters, { cssStyle }) {
  const tree = createTree(selection, {
    cssStyle,
  });
  console.log("tree", tree);

  const css =
    parameters.framework === PARAMETERS.FRAMEWORKS.TAILWIND
      ? "-"
      : printCSS(tree);
  const html =
    parameters.framework === PARAMETERS.FRAMEWORKS.TAILWIND
      ? await tailwind(tree)
      : await printHTML(tree, { framework: parameters.framework });

  return {
    html,
    css,
  };
}

figma.parameters.on(
  "input",
  ({ parameters, key, query, result }: ParameterInputEvent) => {
    switch (key) {
      case "framework":
        const frameworks = [
          PARAMETERS.FRAMEWORKS.HTML,
          PARAMETERS.FRAMEWORKS.REACT,
          PARAMETERS.FRAMEWORKS.TAILWIND,
        ];
        result.setSuggestions(frameworks.filter((s) => s.includes(query)));
        break;
      default:
        return;
    }
  }
);

let pluginParameters;

figma.on("run", ({ command, parameters }: RunEvent) => {
  figma.showUI(__html__, { height: 600, width: 500 });
  pluginParameters = parameters;

  updateAndPostToUI(pluginParameters);
});

figma.on("selectionchange", () => {
  figma.ui.postMessage({ loading: true });

  setTimeout(() => {
    updateAndPostToUI(pluginParameters);
  }, 100);
});

async function updateAndPostToUI(parameters: ParameterValues) {
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      loading: false,
      notification: "Select a layer.",
    });
    return;
  }

  if (figma.currentPage.selection.length > 1) {
    figma.ui.postMessage({
      loading: false,
      notification: "Select only one layer.",
    });
    return;
  }

  const cssStyle = await figma.clientStorage.getAsync("cssStyle");
  const varStyle = await figma.clientStorage.getAsync("varStyle");

  const { html, css } = await createHTMLandCSS(
    figma.currentPage.selection,
    parameters,
    { cssStyle }
  );

  figma.ui.postMessage({
    settings: { cssStyle, varStyle },
    loading: false,
    notification: false,
    css,
    html,
    framework: parameters.framework,
    styles: getStyles(figma),
    name: figma.currentPage?.selection?.[0]?.name,
    selectionWidth: figma.currentPage?.selection?.[0]?.width,
  });
}
