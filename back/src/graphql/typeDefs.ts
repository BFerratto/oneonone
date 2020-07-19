import { gql } from "apollo-server-express";
import { typeDefs as account } from "./account";
export const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${account}
`;
