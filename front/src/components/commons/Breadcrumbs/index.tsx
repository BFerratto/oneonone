import React, { FC, Fragment } from "react";
import {
  Breadcrumb as Container,
  BreadcrumbItem as Item,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/core";
export interface Props {
  items?: Array<React.ReactNode>;
  separator?: React.ReactNode;
}
export const Breadcrumbs: FC<Props> = ({ items = [], separator }) => {
  const size = items.length;

  return (
    <Container>
      {items.map((item, index) => (
        <Fragment key={index}>
          <Item>
            <BreadcrumbLink href="#">{item}</BreadcrumbLink>
            {index < size - 1 && (
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            )}
          </Item>
        </Fragment>
      ))}
    </Container>
  );
};
