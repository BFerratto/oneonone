import React, { FC, useState } from "react";
import { FormLabel, Button, Input } from "@chakra-ui/core";

export interface Props {
  label?: string;
  value?: string;
  onChange?: Function;
  onNew?: Function;
  removable?: boolean;
  onDelete?: Function;
}
export const InputItem: FC<Props> = ({
  label,
  value: initialValue,
  onChange,
  onNew,
  removable,
  onDelete,
}) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = ({ target }) => {
    setValue(target.value);
    onChange?.(target.value);
  };
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={handleChange} />
      {removable && <Button onClick={() => onDelete?.()}>Delete</Button>}
      {!removable && <Button onClick={() => onNew?.(value)}>Add New</Button>}
    </>
  );
};
