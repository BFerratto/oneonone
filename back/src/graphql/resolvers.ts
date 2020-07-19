import "reflect-metadata";
import { getAccounts, saveAccount } from "../services/account";

export const resolvers = {
  Query: {
    account() {
      return getAccounts();
    },
  },
  Mutation: {
    addAccount(_: any, args: { email: string }) {
      return saveAccount(args);
    },
  },
};
