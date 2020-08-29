---
to: <%= creationPath %>/<%= componentName %>.test.tsx
---
import { render, screen } from "@testing-library/react";
import { Props } from "./";
import React from "react";

describe("<<%= componentName%> />", () => {
  it("renders ", () => {
    getSystemUnderTest({});
  });
});

const defaultProps: Partial<Props> = {
};
function getSystemUnderTest(props: Partial<Props> = {}) {
  const { <%= componentName%> } = require("./");
  const allProps: Props = { ...defaultProps, ...props } as Props;
  return render(<<%= componentName%> {...allProps} />);
}
