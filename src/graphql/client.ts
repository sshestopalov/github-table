import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_ENDPOINT =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.github.com/graphql';

export const createApolloClient = (authToken?: string) => {
  if (!authToken) {
    throw Error(
      'You should provide auth token via REACT_APP_AUTH_TOKEN env variable'
    );
  }
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};
