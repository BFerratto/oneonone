import "reflect-metadata";
import * as account from "./account";
import * as bigGoal from "./bigGoal";

export const resolvers = {
  Query: {
    ...account.queries,
    ...bigGoal.queries,
  },
  Mutation: {
    ...account.mutations,
    ...bigGoal.mutations,
  },
};
