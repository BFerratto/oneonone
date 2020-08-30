import React, { FC } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { AddBigGoal } from "./pages";

export interface Props {}
export const BigGoals: FC<Props> = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/add`}>
        <AddBigGoal />
      </Route>
      <Route path={match.path}>
        <h1>All your big goals</h1>
      </Route>
    </Switch>
  );
};
