import express from "express";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { typeDefs, resolvers } from "./graphql";

async function startServer() {
  await createConnection();

  const app = express();
  app.get("/status", (req, res) => {
    res.send("ok");
  });
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listening on ${port}`));
}
startServer();
