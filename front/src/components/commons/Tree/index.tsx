import React, { FC } from "react";
import { Directory, Item } from "./styles";
export type ContentData = {
  title: string;
  contents?: ContentData[];
};
export interface Props extends ContentData {}

export const Tree: FC<Props> = ({ title, contents }) => {
  return (
    <Directory>
      <Item>
        <span>{title}</span>
      </Item>
      {contents?.length &&
        contents.map((content, index) => (
          <Item key={index}>{<Tree {...content} />}</Item>
        ))}
    </Directory>
  );
};
