import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { List } from "./components/contextual/account/List";
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <h1>1on1 Helper</h1>
      <List />
    </ApolloProvider>
  );
};
ReactDOM.render(<Main />, document.getElementById("app"));
