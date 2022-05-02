export function fontStyleAsObject(fontName) {
  const isItalic = fontName?.style?.toLowerCase().includes("italic");

  const weightMap = {
    thin: 100,
    "extra light": 200,
    extralight: 200,
    light: 300,
    normal: 400,
    regular: 400,
    medium: 500,
    "semi bold": 600,
    semibold: 600,
    bold: 700,
    "extra bold": 800,
    extrabold: 800,
    black: 900,
  };

  const weight = fontName?.style?.toLowerCase().replace("italic", "").trim();

  return {
    weight: weightMap[weight] ? weightMap[weight] : "400",
    isItalic,
  };
}

export default fontStyleAsObject;
