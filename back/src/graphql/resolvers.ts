import "reflect-metadata";
import * as account from "./account";

export const resolvers = {
  Query: {
    ...account.queries,
  },
  Mutation: {
    ...account.mutations,
  },
};
