import { getAccounts, saveAccount } from "../../services/account";

export const queries = {
  account: getAccounts,
};

export const mutations = {
  async addAccount(_: any, args: { email: string }) {
    const result = await saveAccount(args);
    return result;
  },
};

export const typeDefs = {
  query: `
      account: [Account]
    `,
  mutation: `
        addAccount(email: String!): Account
    `,
  type: `
    type Account {
        id: ID!
        email: String!
    }
    `,
};
