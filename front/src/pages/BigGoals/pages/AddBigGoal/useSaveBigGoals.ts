import { useMutation } from "@apollo/client";
import { SAVE_BIG_GOALS } from "./queries";

export function useSaveBigGoals() {
  const [saveBigGoal, { data }] = useMutation(SAVE_BIG_GOALS);
  console.log({ data });
  return async (goals: string[]) => {
    const saveResult = saveBigGoal({ variables: { goals } });
    console.log({ data });
    console.log(saveResult);
  };
}
