import dimensions from "../dimensions";

/* test 1 */
const testNode = {
  width: 20,
  height: 20,
  parent: {},
};

test("dimensions: default width and height", () => {
  expect(dimensions(testNode)).toBe(`width: 20px; height: 20px;`);
});

/* test 2 */
const testNode2 = {
  width: 20,
  height: 20,
  parent: {
    layoutMode: "HORIZONTAL",
  },
};

test("dimensions: parent layoutmode horizontal", () => {
  expect(dimensions(testNode2)).toBe(`width: 20px; height: 20px;`);
});

/* test 3 */
const testNode3 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "AUTO",
  parent: {},
  children: [testNode, testNode2],
};

test("dimensions: layoutMode horizontal & sizingMode auto (with children)", () => {
  expect(dimensions(testNode3)).toBe(`height: 20px;`);
});

/* test 4 */
const testNode4 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "AUTO",
  parent: {},
  children: [],
};

test("dimensions: layoutMode horizontal & sizingMode auto (without children)", () => {
  expect(dimensions(testNode4)).toBe(`width: 20px; height: 20px;`);
});

/* test 5 */
const testNode5 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "FIXED",
  parent: {},
  children: [testNode, testNode2],
};

test("dimensions: layoutmode horizontal & sizingMode fixed", () => {
  expect(dimensions(testNode5)).toBe(`width: 20px; height: 20px;`);
});

/* test 6 */
const testNode6 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "FIXED",
  layoutAlign: "STRETCH",
  parent: { layoutMode: "VERTICAL" },
  children: [],
};

test("dimensions: layoutAlign stretch (parent layoutMode vertical)", () => {
  expect(dimensions(testNode6)).toBe(`height: 20px;`);
});

/* test 7 */
const testNode7 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "FIXED",
  layoutAlign: "STRETCH",
  parent: { layoutMode: "HORIZONTAL" },
  children: [],
};

test("dimensions: layoutAlign stretch (parent layoutMode horizontal)", () => {
  expect(dimensions(testNode7)).toBe(`width: 20px;`);
});
