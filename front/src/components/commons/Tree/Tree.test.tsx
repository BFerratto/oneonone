import { render, screen } from "@testing-library/react";
import { Props, ContentData } from "./";
import React from "react";

describe("<Tree />", () => {
  it("renders with only title ", () => {
    getSystemUnderTest({});
    screen.getByText(mockTitle);
  });
  it("Renders with children", () => {
    const contents = [
      {
        title: "Folder 1",
        contents: [
          { title: "subfolder 1", contents: [{ title: "item 1" }] },
          { title: "subfolder 2", contents: [{ title: "item 2" }] },
        ],
      },
      {
        title: "Folder 2",
      },
    ];
    getSystemUnderTest({ contents });
    function getTexts(data: ContentData) {
      screen.getByText(data.title);
      if (!data.contents?.length) {
        return;
      }
      data.contents.forEach((content) => {
        getTexts(content);
      });
    }
    getTexts({ title: mockTitle, contents });
  });
});
const mockTitle = "mockTitle";
const defaultProps: Partial<Props> = {
  title: mockTitle,
};
function getSystemUnderTest(props: Partial<Props> = {}) {
  const { Tree } = require("./");
  const allProps: Props = { ...defaultProps, ...props } as Props;
  return render(<Tree {...allProps} />);
}
