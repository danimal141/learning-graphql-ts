import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./lib/apolloClient";
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const initialState = {};
  const apolloClient = useApollo(initialState);

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
