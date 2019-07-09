import React from "react";
import { Route, Switch } from "react-router-dom";
import RubroForm from "../components/RubroJuicio/RubroForm";

const Dashboard = () => {
  return (
    <Switch>
      <Route exact path="/" component={RubroForm} />
    </Switch>
  );
};

export default Dashboard;
