import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";
import Users from "./Users";
import AuthorizedUser from "./Users/AuthorizedUser";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const initialState = {};
  const apolloClient = useApollo(initialState);

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthorizedUser />
        <hr />
        <Users />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
