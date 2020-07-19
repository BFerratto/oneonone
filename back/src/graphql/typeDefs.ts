import { gql } from "apollo-server-express";
import { typeDefs as account } from "./account";
export const typeDefs = gql`
    ${account.type}
    type Query {
        ${account.query}
    }
    type Mutation {
        ${account.mutation}
    }
`;
