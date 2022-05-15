import displayProp from "../displayProp";

function normalizeString(str) {
  // replace all whitespace and linebreaks with single space
  return str.replace(/\s+/g, " ");
}

/* test 1 */
const testNode = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",
  itemSpacing: 5,
  parent: {},
};

test("displayProp: horizontal and centered", () => {
  expect(normalizeString(displayProp(testNode))).toBe(
    normalizeString(`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    justify-content: center;
  `)
  );
});
