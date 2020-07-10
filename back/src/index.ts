import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { getAccounts, saveAccount } from "./services/account";

const typeDefs = gql`
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

async function startServer() {
  await createConnection();

  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
  app.get("/status", (req, res) => {
    res.send("ok");
  });
  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listening on ${port}`));
}
startServer();
