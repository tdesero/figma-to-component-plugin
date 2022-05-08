export async function createSVG(node, className): Promise<string> {
  const svg: string = await node
    .exportAsync({ format: "SVG", useAbsoluteBounds: true })
    .then((res) =>
      // Uint8Array to string and inject classname
      String.fromCharCode
        .apply(null, res)
        .replace("<svg ", `<svg class="${className}" `)
    )
    .catch((err) => console.error(err));

  return svg;
}
