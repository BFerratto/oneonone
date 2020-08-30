import { gql } from "apollo-boost";
export const SAVE_BIG_GOALS = gql`
  mutation saveBigGoals($goals: [String]!) {
    addBigGoals(goals: $goals) {
      id
      title
    }
  }
`;
