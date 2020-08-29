import React, { FC, Fragment } from "react";
import { Item } from "./styles";

export interface Props {
  items?: Array<React.ReactNode>;
  separator?: React.ReactNode;
}
export const Breadcrumbs: FC<Props> = ({
  items = [],
  separator = defaultSeparator,
}) => {
  const size = items.length;
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>
          <Item>{item}</Item>
          {index < size - 1 && separator}
        </Fragment>
      ))}
    </>
  );
};

export const defaultSeparator = ">";
