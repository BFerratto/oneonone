import React, { FC, useState, useEffect } from "react";
import { InputItem } from "./components/InputItem";
type Item = {
  value: string;
};
export interface Props {
  items?: Item[];
  onChange?: Function;
}
export const InputList: FC<Props> = ({ items, onChange }) => {
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    setCurrentItems(items || []);
  }, [items, setCurrentItems]);

  const handleNew = (newValue, clearValue) => {
    if (!newValue) return;
    setCurrentItems((previousItems) => {
      const newItems = previousItems.concat({ value: newValue });
      onChange?.(newItems);
      return newItems;
    });
    clearValue();
  };
  const handleDelete = (index: number) => {
    setCurrentItems((previousItems) => {
      const newItems = previousItems.slice(0);
      newItems.splice(index, 1);
      onChange?.(newItems);
      return newItems;
    });
  };
  const handleValueChange = (index: number, newValue: string) => {
    setCurrentItems((previousItems) => {
      const newItems = previousItems.slice(0);
      newItems[index] = { value: newValue };
      onChange?.(newItems);
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
          onChange={(newValue) => handleValueChange(index, newValue)}
        />
      ))}
      <InputItem label={"Add new"} id="newInputItem" onNew={handleNew} />
    </>
  );
};
