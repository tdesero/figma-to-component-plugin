import { eraseDuplicateCSS } from "../eraseDuplicateCSS";

test("css is same", () => {
  expect(
    eraseDuplicateCSS(
      "color: green; background: white;",
      "color: green; background: white;"
    )
  ).toBe("");
});

test("css is different", () => {
  expect(
    eraseDuplicateCSS(
      "color: blue; background: white;",
      "color: green; background: white;"
    )
  ).toBe("color: blue;");
});

test("css must be unset", () => {
  expect(
    eraseDuplicateCSS("background: white;", "width: 100px; background: white;")
  ).toBe("width: unset;");
});
