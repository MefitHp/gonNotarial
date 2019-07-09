import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import theme from "./utils/theme";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "./aws-exports";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

Amplify.configure(awsConfig);

const client = new AWSAppSyncClient({
  url:
    "https://fqi74jmjpbhijg2tamcfwfvrt4.appsync-api.us-east-1.amazonaws.com/graphql",
  region: "us-east-1",
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

let App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
