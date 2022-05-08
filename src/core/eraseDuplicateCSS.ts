export function eraseDuplicateCSS(
  modifierCSS: string,
  baseCSS: string
): string {
  const modArr = modifierCSS.split(";").map((l) => l.trim());
  const baseArr = baseCSS.split(";").map((l) => l.trim());

  // detect css lines included in base but not in modifier and unset the value
  const cssPropsToBeUnset = baseArr
    .map((l) => {
      return l.split(":")?.[0];
    })
    .filter((prop) => {
      return !modifierCSS.includes(`${prop}:`);
    })
    .map((prop) => prop + ": unset");

  return modArr
    .filter((line) => {
      return !baseArr.includes(line);
    })
    .concat(cssPropsToBeUnset)
    .map((l) => l + ";")
    .join("");
}
