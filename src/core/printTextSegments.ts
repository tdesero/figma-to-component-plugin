import { escapeHtml } from "./helpers";

export function printTextSegments(segments): any {
  if (segments?.length === 0) return "";

  if (segments.length === 1) {
    // do not wrap in span
    return escapeHtml(segments[0].characters)
      .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
      .replace(/\n/g, "<br/>");
  }

  return (
    "<span>" +
    segments
      .map((s) => {
        return `<span class="${s.name}">${escapeHtml(s.characters)
          .replace(/\u2028/g, "\n") // makes annoying L-SEP Linebreaks disappear
          .replace(/\n/g, "<br/>")}</span>`;
      })
      .join("") +
    "</span>"
  );
}
