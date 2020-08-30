import express from "express";
import { createTestClient as apolloCreateTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";

type GetTestServerArgs = {
  typeDefs: any;
  queries: any;
  mutations: any;
};
export function getApolloTestServerStarter({
  typeDefs: partialDefs,
  mutations,
  queries,
}: GetTestServerArgs) {
  const typeDefs = gql`
    type Query {
      _empty: String
    }
    type Mutation {
      _empty: String
    }
    ${partialDefs}
  `;

  const resolvers = {
    Query: {
      ...queries,
    },
    Mutation: {
      ...mutations,
    },
  };

  async function startTestServer() {
    const app = express();
    const apolloServer: any = new ApolloServer({ typeDefs, resolvers });

    apolloServer.applyMiddleware({ app });
    const httpServer = await app.listen(0);

    const createTestClient = () => {
      return apolloCreateTestClient(apolloServer);
    };
    return { httpServer, createTestClient };
  }

  return { startTestServer };
}
