import { cleanComponentPropertyName, willBeRenderedAsSVG } from "./helpers";
import { createSVG } from "./createSVG";
import { printTextSegments } from "./printTextSegments";
import { PARAMETERS } from "../constants";

export async function printHTML(tree, { framework }): Promise<string> {
  let html: string = "";

  if (tree.componentPropertiesDefinitions) {
    const componentPropsList = Object.keys(tree.componentPropertiesDefinitions);
    html +=
      componentPropsList.length > 0
        ? "<!-- props: " +
          componentPropsList
            .map(
              (key) =>
                `${key} = ${tree.componentPropertiesDefinitions[key]?.defaultValue}`
            )
            .join(", ") +
          " -->"
        : "";

    if (tree.variants) {
      html +=
        "<!-- variants: " +
        componentPropsList
          .filter(
            (key) => tree.componentPropertiesDefinitions[key].type === "VARIANT"
          )
          .join(", ") +
        " -->";
    }
  }

  const componentPropsCharactersReference = (node) => {
    const propName = node.componentPropertyReferences?.characters;
    return propName ? `{${cleanComponentPropertyName(propName)}}` : undefined;
  };

  const componentPropsVisibleReference = (node) => {
    const propName = node.componentPropertyReferences?.visible;
    return propName ? `${cleanComponentPropertyName(propName)}` : undefined;
  };

  async function theChildren(children) {
    if (children?.length > 0) {
      const all = await Promise.all(
        children.map(async (treeElement) => {
          const visibleProp = componentPropsVisibleReference(
            treeElement.originalNode
          );

          const visiblePropStart = visibleProp
            ? `<!-- if: ${visibleProp} -->`
            : "";
          const visiblePropEnd = visibleProp ? "<!-- end if -->" : "";

          if (willBeRenderedAsSVG(treeElement)) {
            return (
              visiblePropStart +
              (await createSVG(treeElement.originalNode, treeElement.name)) +
              visiblePropEnd
            );
          }
          const innerText = treeElement.textSegments
            ? printTextSegments(treeElement.textSegments)
            : "";

          return `${visiblePropStart}<div class="${treeElement.name}">\n${
            componentPropsCharactersReference(treeElement.originalNode) ||
            innerText
          } ${await theChildren(
            treeElement.children
          )}\n</div>${visiblePropEnd}`;
        })
      );
      return all.join("");
    } else {
      return "";
    }
  }

  // this should become more DRY...
  if (willBeRenderedAsSVG(tree)) {
    html = await createSVG(tree.originalNode, tree.name);
  } else {
    html += `<div class="${tree.name}">\n${
      tree.textSegments ? printTextSegments(tree.textSegments) : ""
    } ${await theChildren(tree.children)}\n</div>`;
  }

  return html;
}
