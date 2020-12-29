import { useMemo } from "react";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { from } from "apollo-link";
import { mergeDeep } from "@apollo/client/utilities";

type CacheState = Record<string, any> | null;

const cache = new InMemoryCache();

const link = from([
  createHttpLink({
    uri: "http://localhost:4000/graphql",
  }),
]);

function createApolloClient() {
  return new ApolloClient({
    link: (link as unknown) as ApolloLink,
    cache: cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
    },
  });
}

let apolloClient: ReturnType<typeof createApolloClient>;

export function initializeApollo(
  initialState: CacheState = null
): ApolloClient<CacheState> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: CacheState): ApolloClient<CacheState> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
