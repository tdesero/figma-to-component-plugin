import { eraseDuplicateCSS } from "../eraseDuplicateCSS";

function normalizeString(str) {
  // replace all whitespace and linebreaks with single space
  return str.replace(/\s+/g, " ");
}

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

test("css must be unset 2", () => {
  expect(
    normalizeString(
      eraseDuplicateCSS(
        `
      background: #ffffff;
      border-radius: 16px;
      border: solid #dddddd;
      border-width: 1px;
      display: flex;
      flex-direction: row;
      gap: 0px;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      overflow: hidden;
      `,
        `
      background: #ffffff;
      border-radius: 16px;
      border: solid #dddddd;
      border-width: 1px;
      display: flex;
      flex-direction: column;
      gap: 0px;
      align-items: flex-start;
      justify-content: flex-start;
      width: 300px;
      position: relative;
      overflow: hidden;
      color: green;
    `
      )
    )
  ).toBe(normalizeString(`flex-direction: row;width: unset;color: unset;`));
});
