import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Account {
    id: ID!
    email: String!
  }
  type Query {
    account: [Account]
  }
  type Mutation {
    addAccount(email: String!): Account
  }
`;
