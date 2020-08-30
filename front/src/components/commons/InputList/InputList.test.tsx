import { render, screen, fireEvent, within } from "@testing-library/react";
import { Props } from "../InputList";
import React from "react";
import { renderWithTheme } from "../../../../__tests__/utils";

describe("<InputList />", () => {
  it("renders empty ", () => {
    getSystemUnderTest();
    screen.getByRole("button", { name: /add new/i });
    screen.getByLabelText("Add new");
  });
  it("Can't add new if value is empty", () => {
    const { getAllByTestId } = getSystemUnderTest();
    const button = screen.getByRole("button", { name: /add new/i });
    fireEvent.click(button);
    const items = getAllByTestId("InputItem");
    expect(items.length).toBe(1);
  });
  it("add new", () => {
    const { getAllByTestId, getByTestId } = getSystemUnderTest();
    const button = screen.getByRole("button", { name: /add new/i });
    const maininput = screen.getByLabelText("Add new") as HTMLInputElement;
    const mockNewValue = "mockNewValue";
    fireEvent.change(maininput, { target: { value: mockNewValue } });
    fireEvent.click(button);
    const items = getAllByTestId("InputItem");
    expect(items.length).toBe(2);
    const addNewInputs = screen.getAllByLabelText("Add new");
    expect(addNewInputs.length).toBe(1);
    expect(maininput.value).toBe("");
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBe(1);
  });
  it("Start with initial values", () => {
    const { getAllByTestId } = getSystemUnderTest({ items: mockInitialValues });
    const items = getAllByTestId("InputItem");
    mockInitialValues.forEach(({ value }, index) => {
      const input = items[index].querySelector("input");
      expect(input.value).toBe(value);
      within(items[index]).getByRole("button", { name: /delete/i });
    });
    const addNewInputs = screen.getAllByLabelText("Add new");
    const lastItem = mockInitialValues.length;
    const deleteButton = within(items[lastItem]).queryByRole("button", {
      name: /delete/i,
    });
    expect(deleteButton).not.toBeInTheDocument();
    within(items[lastItem]).getByRole("button", {
      name: /add new/i,
    });
    expect(addNewInputs.length).toBe(1);
  });

  it("Can edit a previously added value", () => {
    const { getAllByTestId } = getSystemUnderTest({ items: mockInitialValues });
    const items = getAllByTestId("InputItem");
    const targetInput = 1;
    const input = items[targetInput].querySelector("input");
    fireEvent.change(input, { target: { value: mockNewValue } });
    expect(input.value).toBe(mockNewValue);
  });
  it("Can remove", () => {
    const { getAllByTestId, container } = getSystemUnderTest({
      items: mockInitialValues,
    });
    const items = getAllByTestId("InputItem");
    const totalItems = items.length;
    const targetInput = 1;
    const targetValue = mockInitialValues[targetInput].value;
    const deleteButton = within(items[targetInput]).getByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(deleteButton);
    const allInputs = container.querySelectorAll("input");
    const valueIsDeleted = Array.from(allInputs).every(
      (input) => targetValue !== input.value
    );
    expect(valueIsDeleted).toBe(true);
    const newTotalItems = getAllByTestId("InputItem").length;
    expect(newTotalItems).toBe(totalItems - 1);
  });
});

const defaultProps: Partial<Props> = {
  items: [],
};
const mockInitialValues = [
  { value: "mock Value1" },
  { value: "mock Value2" },
  { value: "mock Value3" },
];
const mockNewValue = "mockNewValue";
function getSystemUnderTest(props: Partial<Props> = {}) {
  const { InputList } = require("./");
  const allProps: Props = { ...defaultProps, ...props } as Props;
  return renderWithTheme(<InputList {...allProps} />);
}
