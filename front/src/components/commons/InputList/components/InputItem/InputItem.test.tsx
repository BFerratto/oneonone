import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Props } from ".";
import {
  renderWithTheme,
  rerenderWithTheme,
} from "../../../../../../__tests__/utils";

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
  it("fires onNew and can clear", () => {
    const mockOnNew = jest.fn();
    const { input } = getSystemUnderTest({
      onNew: mockOnNew,
      value: mockValue,
    });
    const mockChangedValue = "mockChangedValue";
    fireEvent.change(input, { target: { value: mockChangedValue } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const [onNewArgs] = mockOnNew.mock.calls;
    expect(onNewArgs[0]).toBe(mockChangedValue);
    const clearValue = onNewArgs[1];
    clearValue();
    expect(input.value).toBe("");
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
      id: mockid,
    };
    const { input } = getSystemUnderTest(allProps);
    expect(input.value).toBe(mockValue);

    fireEvent.change(input, { target: { value: mockChangedValue } });
    expect(input.value).toBe(mockChangedValue);
    expect(mockOnChange).toHaveBeenCalledWith(mockChangedValue);

    const button = screen.getByRole("button", { name: /add new/i });
    fireEvent.click(button);
    const [onNewArgs] = mockOnNew.mock.calls;

    expect(onNewArgs[0]).toBe(mockChangedValue);
  });
  it("Rerenders if value change", () => {
    const { input, rerender, InputItem, container } = getSystemUnderTest({
      value: mockValue,
    });
    expect(input.value).toBe(mockValue);
    rerenderWithTheme(rerender, <InputItem value={mockChangedValue} />);
    const rerenderedInput = container.querySelector("input");
    expect(rerenderedInput.value).toBe(mockChangedValue);
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
const mockid = "mockId";
const mockChangedValue = "mockChangedValue";

function getSystemUnderTest(props: Partial<Props> = {}) {
  const allProps: Props = { ...defaultProps, ...props } as Props;
  const { InputItem } = require("./");
  const result = renderWithTheme(<InputItem {...allProps} />);
  // Since we will always have an input we get here as a convenience and returns
  const input = result.container.querySelector("input");
  return { ...result, input, InputItem };
}
