import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form, Props } from "../../../src/components/commons/Form";

describe("<Form />", () => {
  const mockSubmit = jest.fn();
  const defaultProps: Partial<Props> = {
    onSubmit: mockSubmit,
    initialValues: {},
  };
  beforeEach(() => {
    mockSubmit.mockClear();
  });
  function getSystemUnderTest(props: Partial<Props> = {}) {
    const propsToUse = { ...defaultProps, ...props } as Props;
    return render(<Form {...propsToUse} />);
  }
  it("Renders", async () => {
    getSystemUnderTest();
    const submit = screen.getByRole("button");
    // Formik is async so we need to wait for the submit, otherwise the function will not be ready to be checked
    await waitFor(() => {
      fireEvent.click(submit);
    });
    expect(mockSubmit).toHaveBeenCalled();
  });
});
