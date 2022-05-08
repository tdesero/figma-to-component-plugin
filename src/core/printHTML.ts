import { willBeRenderedAsSVG } from "./helpers";
import { createSVG } from "./createSVG";
import { printTextSegments } from "./printTextSegments";

export async function printHTML(tree): Promise<string> {
  let html: string = "";

  async function theChildren(children) {
    if (children?.length > 0) {
      const all = await Promise.all(
        children.map(async (treeElement) => {
          if (willBeRenderedAsSVG(treeElement)) {
            return await createSVG(treeElement.originalNode, treeElement.name);
          }
          return `<div class="${treeElement.name}">\n${
            treeElement.textSegments
              ? printTextSegments(treeElement.textSegments)
              : ""
          } ${await theChildren(treeElement.children)}\n</div>`;
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
