import React from "react";
import { render, screen } from "@testing-library/react";
import { List, Props } from "../../../src/components/commons/List";

describe("<List />", () => {
  const defaultProps: Partial<Props> = {
    items: ["item 1", "item 2", "item 33"],
  };
  function getSystemUnderTest(props: Partial<Props> = {}) {
    return render(<List {...defaultProps} {...props} />);
  }
  it("Renders", () => {
    getSystemUnderTest({ items: undefined });
  });
  it("Renders loading", () => {
    getSystemUnderTest({ items: undefined, loading: true });
    screen.getByRole("progressbar");
  });
  it("Renders with items", () => {
    const { getByText } = getSystemUnderTest();
    const { items } = defaultProps;
    items.forEach((item) => {
      getByText(item as string);
    });
  });
});
