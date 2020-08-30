import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Props } from "./InputItem";
import { renderWithTheme } from "../../../../../__tests__/utils";

describe("<InputItem />", () => {
  it("renders", () => {
    getSystemUnderTest();
  });
  it("renders with label", () => {
    getSystemUnderTest({ label: mockLabel });
    screen.getByText(mockLabel);
  });
  it("renders with  value", () => {
    const { input } = getSystemUnderTest({ value: mockValue });
    expect(input.value).toBe(mockValue);
  });
  it("Changes the input value even if no onChange is passed", () => {
    const { input } = getSystemUnderTest({ value: mockValue });
    const mockChangedValue = "mockChangedValue";
    fireEvent.change(input, { target: { value: mockChangedValue } });
    expect(input.value).toBe(mockChangedValue);
  });
  it("fires onChange", () => {
    const mockOnChange = jest.fn();
    const { input } = getSystemUnderTest({
      onChange: mockOnChange,
      value: mockValue,
    });
    const mockChangedValue = "mockChangedValue";
    fireEvent.change(input, { target: { value: mockChangedValue } });
    expect(mockOnChange).toHaveBeenCalledWith(mockChangedValue);
  });
  it("fires onNew", () => {
    const mockOnNew = jest.fn();
    const { input } = getSystemUnderTest({
      onNew: mockOnNew,
      value: mockValue,
    });
    const mockChangedValue = "mockChangedValue";
    fireEvent.change(input, { target: { value: mockChangedValue } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnNew).toHaveBeenCalledWith(mockChangedValue);
  });
  it("renders with all values", () => {
    const mockOnChange = jest.fn();
    const mockOnNew = jest.fn();
    const mockOnDelete = jest.fn();
    const allProps: Required<Props> = {
      label: mockLabel,
      value: mockValue,
      onNew: mockOnNew,
      onChange: mockOnChange,
      removable: false,
      onDelete: mockOnDelete,
    };
    const { input } = getSystemUnderTest(allProps);
    expect(input.value).toBe(mockValue);

    const mockChangedValue = "mockChangedValue";
    fireEvent.change(input, { target: { value: mockChangedValue } });
    expect(input.value).toBe(mockChangedValue);
    expect(mockOnChange).toHaveBeenCalledWith(mockChangedValue);

    const button = screen.getByRole("button", { name: /add new/i });
    fireEvent.click(button);
    expect(mockOnNew).toHaveBeenCalledWith(mockChangedValue);
  });
  describe("Removable", () => {
    it("Renders on removable mode", () => {
      getSystemUnderTest({ removable: true });
      const { input } = getSystemUnderTest({ value: mockValue });
      expect(input.value).toBe(mockValue);
      screen.getByRole("button", { name: /delete/i });
    });
    it("Calls onDelete", () => {
      const mockOnDelete = jest.fn();
      getSystemUnderTest({ removable: true, onDelete: mockOnDelete });
      const { input } = getSystemUnderTest({ value: mockValue });
      expect(input.value).toBe(mockValue);
      const button = screen.getByRole("button", { name: /delete/i });
      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });
});
const defaultProps: Partial<Props> = {};
const mockLabel = "mockLabel";
const mockValue = "mockValue";

function getSystemUnderTest(props: Partial<Props> = {}) {
  const allProps: Props = { ...defaultProps, ...props } as Props;
  const { InputItem } = require("./InputItem");
  const result = renderWithTheme(<InputItem {...allProps} />);
  // Since we will always have an input we get here as a convenience and returns
  const input = result.container.querySelector("input");
  return { ...result, input };
}
