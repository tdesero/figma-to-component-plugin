function reactTransform(html, componentName, beautify) {
  /* extract props. regex is a mess... */
  const propsMatch = html.match(/<!-- props: (.*?) -->/);
  const variantsMatch = html.match(/<!-- variants: (.*?) -->/);

  let jsx = html
    .replace(/class=/g, "className=")
    .replace(/<!-- if: (.*) -->/g, "{$1 && (")
    .replace(/<!-- end if -->/g, ")}")
    .replaceAll(/<!--(.*)-->/g, "");

  if (variantsMatch) {
    jsx = jsx.replace(
      /className="(.*)"/,
      'className={"$1 " + variantsClassName}'
    );
  }

  const variantsClassName = `'${componentName.toLowerCase()}${variantsMatch?.[0]
    .replace("<!-- variants: ", "")
    .replace(" -->", "")
    .split(", ")
    .sort()
    .map((v, idx) => `${idx !== 0 ? "+ '" : ""}--` + v + `-' + ${v}`)
    .join("")}`;

  const code = `
    /* Code generated with AutoHTML for Figma */
    import './${componentName}.css';

    export const ${componentName} = ({ ${
    propsMatch
      ? propsMatch[0].replace("<!-- props: ", "").replace("-->", "") + ", "
      : ""
  } ...props}) => { 
    ${
      variantsMatch ? `const variantsClassName = ${variantsClassName};\n\n` : ""
    }
    return(\n${beautify.html(jsx)}\n)}`;
  return code;
}

export default reactTransform;
