import React, { FC, useState } from "react";
import { FormLabel, Button, Input } from "@chakra-ui/core";

export interface Props {
  label?: string;
  value?: string;
  onChange?: Function;
  onNew?: Function;
}
export const InputItem: FC<Props> = ({
  label,
  value: initialValue,
  onChange,
  onNew,
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
      <Button onClick={() => onNew?.(value)}>Button</Button>
    </>
  );
};
