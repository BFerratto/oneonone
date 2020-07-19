import { getAccounts, saveAccount } from "../../services/account";
import { gql } from "apollo-server-express";

export const queries = {
  account: getAccounts,
};

export const mutations = {
  async addAccount(_: any, args: { email: string }) {
    const result = await saveAccount(args);
    return result;
  },
};

export const typeDefs = gql`
  type Account {
    id: ID!
    email: String!
  }
  extend type Query {
    account: [Account]
  }
  extend type Mutation {
    addAccount(email: String!): Account
  }
`;
