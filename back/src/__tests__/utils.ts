import express from "express";
import { createTestClient as apolloCreateTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";

type GetTestServerArgs = {
  typeDefs: any;
  resolvers: any;
};
export function getApolloTestServerStarter({
  typeDefs,
  resolvers,
}: GetTestServerArgs) {
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
