import React, { FC, useState, useEffect } from "react";
import { FormLabel, Button, Input } from "@chakra-ui/core";
import { Container } from "./styles";

export interface Props {
  label?: string;
  value?: string;
  onChange?: Function;
  onNew?: Function;
  removable?: boolean;
  onDelete?: Function;
  id?: string;
}
export const InputItem: FC<Props> = ({
  label,
  value: initialValue,
  onChange,
  onNew,
  removable,
  onDelete,
  id,
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue, setValue]);
  const handleChange = ({ target }) => {
    setValue(target.value);
    onChange?.(target.value);
  };
  const clearValue = () => setValue("");
  return (
    <Container data-testid="InputItem">
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Input id={id} value={value} onChange={handleChange} />
      {removable && (
        <Button aria-label="delete" onClick={() => onDelete?.()}>
          -
        </Button>
      )}
      {!removable && (
        <Button aria-label="add new" onClick={() => onNew?.(value, clearValue)}>
          +
        </Button>
      )}
    </Container>
  );
};
