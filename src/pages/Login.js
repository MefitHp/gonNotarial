import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import { AuthProvider } from "../context/AuthContext";

const Login = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </AuthProvider>
  );
};

export default Login;
