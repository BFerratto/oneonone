import React, { FC, useState, useEffect } from "react";
import { InputItem } from "./components/InputItem";
type Item = {
  value: string;
};
export interface Props {
  items?: Item[];
}
export const InputList: FC<Props> = ({ items }) => {
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    setCurrentItems(items || []);
  }, [items, setCurrentItems]);

  const handleNew = (newValue, clearValue) => {
    if (!newValue) return;
    setCurrentItems((previousItems) =>
      previousItems.concat({ value: newValue })
    );
    clearValue();
  };
  const handleDelete = (index: number) => {
    setCurrentItems((previousItems) => {
      const newItems = previousItems.slice(0);
      newItems.splice(index, 1);
      return newItems;
    });
  };
  return (
    <>
      {currentItems.map(({ value }, index) => (
        <InputItem
          id={`item${index}`}
          key={index}
          value={value}
          removable
          onDelete={() => handleDelete(index)}
        />
      ))}
      <InputItem label={"Add new"} id="newInputItem" onNew={handleNew} />
    </>
  );
};
