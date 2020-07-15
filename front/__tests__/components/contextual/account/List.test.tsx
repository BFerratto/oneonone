import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  List,
  Props,
  GET_ACCOUNTS,
} from "../../../../src/components/contextual/account/List";

describe("<List />", () => {
  const defaultProps: Partial<Props> = {};
  const mockEmail = "sometest@email.com";
  const mocks = [
    {
      request: {
        query: GET_ACCOUNTS,
      },
      result: {
        data: {
          account: [{ id: "1", email: mockEmail }],
        },
      },
    },
  ];
  function getSystemUnderTest(props: Partial<Props> = {}) {
    return render(
      <MockedProvider mocks={mocks}>
        <List {...defaultProps} {...props} />
      </MockedProvider>
    );
  }
  it("Renders", async () => {
    const {} = getSystemUnderTest({ items: undefined });
    screen.getByRole("progressbar");
    const foundEmail = await screen.findByText(mockEmail);
    expect(foundEmail).toBeTruthy();
  });
});
