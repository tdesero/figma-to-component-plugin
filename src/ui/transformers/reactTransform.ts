function reactTransform(html, componentName, beautify) {
  /* extract props. regex is a mess... */
  const propsMatch = html.match(/<!-- props: (.*?) -->/);
  const code = `
    /* Code generated with AutoHTML for Figma */
    import './${componentName}.css';

    export const ${componentName} = ({ ${
    propsMatch
      ? propsMatch[0].replace("<!-- props: ", "").replace("-->", "") + ", "
      : ""
  } ...props}) => { \nreturn(\n${beautify.html(
    html
      .replace(/class=/g, "className=")
      .replace(/<!-- if: (.*) -->/g, "{$1 && (")
      .replace(/<!-- end if -->/g, ")}")
      .replaceAll(/<!--(.*)-->/g, "")
  )}\n)}`;
  return code;
}

export default reactTransform;
