import dimensions from "../dimensions";

const testNode = {
  width: 20,
  height: 20,
  parent: {},
};

test("dimensions: default width and height", () => {
  expect(dimensions(testNode)).toBe(`width: 20px; height: 20px;`);
});

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

// Following test needs children
const testNode3 = {
  width: 20,
  height: 20,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "AUTO",
  parent: {},
  children: [testNode, testNode2],
};

test("dimensions: layoutMode horizontal & sizingMode auto (with children)", () => {
  expect(dimensions(testNode3)).toBe(`width: auto; height: 20px;`);
});

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
  expect(dimensions(testNode6)).toBe(`width: auto; height: 20px;`);
});
