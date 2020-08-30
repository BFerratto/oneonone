import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { List } from "./components/contextual/account/List";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BigGoals } from "./pages/BigGoals";
import { ThemeProvider } from "@chakra-ui/core";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const Main = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <h1>1on1 Helper</h1>
          <Switch>
            <Route path="/account">
              <List />
            </Route>
            <Route path="/bigGoals">
              <BigGoals />
            </Route>
            <Route path="/smallGoals/:bigGoalId">
              <h1>Smal GOALS GENTEEE</h1>
            </Route>
            <Route path="/">
              <h1>HOME</h1>
            </Route>
          </Switch>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
};
ReactDOM.render(<Main />, document.getElementById("app"));
