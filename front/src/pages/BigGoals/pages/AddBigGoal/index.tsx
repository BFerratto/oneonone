import React, { FC, useState } from "react";
import { InputList } from "../../../../components/commons/InputList";
import { Button } from "@chakra-ui/core";
import { useSaveBigGoals } from "./useSaveBigGoals";

export interface Props {}
export const AddBigGoal: FC<Props> = () => {
  const [goals, setGoals] = useState<string[]>([]);

  const executeSave = useSaveBigGoals();

  const handleListChange = (valuesList: { value: string }[]) => {
    setGoals(valuesList.map(({ value }) => value));
  };
  const handleSave = () => {
    executeSave(goals);
  };
  return (
    <section>
      <h1>Add big goals</h1>
      <InputList onChange={handleListChange} />
      <Button onClick={handleSave}>Save</Button>
    </section>
  );
};
