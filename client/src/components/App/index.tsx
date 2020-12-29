import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";

import React from "react";
import Users from "./Users";

const App = () => {
  const initialState = {};
  const apolloClient = useApollo(initialState);

  return (
    <ApolloProvider client={apolloClient}>
      <Users />
    </ApolloProvider>
  );
};

export default App;
