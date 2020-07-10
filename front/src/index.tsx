import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <h1>Funciona!.</h1>
    </ApolloProvider>
  );
};
ReactDOM.render(<Main />, document.getElementById("app"));
