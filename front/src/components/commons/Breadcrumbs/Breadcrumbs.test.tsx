import { render, screen } from "@testing-library/react";
import { Props } from "./";
import React from "react";

describe("<Breadcrumbs />", () => {
  it("renders empty", () => {
    getSystemUnderTest({ items: [] });
  });
  it("renders with items", () => {
    getSystemUnderTest();
    defaultItems.forEach((item) => {
      screen.getByText(item);
    });
  });
  it("renders with a custom separator", () => {
    const customSeparator = <span>{"|"}</span>;
    getSystemUnderTest({ separator: customSeparator });
    const separators = screen.getAllByText("|");
    expect(separators.length).toBe(defaultItems.length - 1);
  });
});
/**
 * for the vars being below the tests, read scopes and closure on the book You Don't Know JS
 *  @see {@link https://github.com/getify/You-Dont-Know-JS}
 * */
const defaultItems = ["Big goal", "Company goal", "Small goal", "habit"];
const defaultProps: Partial<Props> = {
  items: defaultItems,
};
function getSystemUnderTest(props: Partial<Props> = {}) {
  const { Breadcrumbs } = require("./");
  const allProps: Props = { ...defaultProps, ...props } as Props;
  return render(<Breadcrumbs {...allProps} />);
}
