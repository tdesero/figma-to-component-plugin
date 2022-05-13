import borderRadiusProp from "../borderRadiusProp";

const testNode = {
  cornerRadius: 0,
};

test("borderRadius: returns empty string", () => {
  expect(borderRadiusProp(testNode)).toBe("");
});

const testNode2 = {
  cornerRadius: 5,
};

test("borderRadius: 5px", () => {
  expect(borderRadiusProp(testNode2)).toBe("border-radius: 5px;");
});
