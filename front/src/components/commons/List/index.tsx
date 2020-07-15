import React, { FC } from "react";

export interface Props {
  items?: React.ReactNode[];
  loading?: boolean;
}
export const List: FC<Props> = ({ items, loading }) => {
  if (loading) {
    return <div role="progressbar">Loading...</div>;
  }
  return (
    <ol>
      {items?.map((i, index) => (
        <li key={index}>{i}</li>
      ))}
    </ol>
  );
};
