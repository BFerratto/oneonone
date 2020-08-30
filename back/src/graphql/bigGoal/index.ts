import { gql } from "apollo-server-express";
import { saveBigGoals, getBigGoals } from "../../services/bigGoal";
export const queries = {
  async bigGoals() {
    return getBigGoals();
  },
};
type AddBigGoalArgs = {
  goals: string[];
};
export const mutations = {
  async addBigGoals(root: any, args: AddBigGoalArgs) {
    return saveBigGoals(args.goals);
  },
};

export const typeDefs = gql`
  type BigGoal {
    id: ID!
    title: String!
  }
  extend type Query {
    bigGoals: [BigGoal]
  }
  extend type Mutation {
    """
    Adds a list of string as goals
    """
    addBigGoals(goals: [String]!): [BigGoal]
  }
`;
