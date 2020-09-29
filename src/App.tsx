import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { RepositoriesContainer } from './pages/Repositories/RepositoriesContainer';

import { createApolloClient } from './graphql/client';

const authToken = process.env.REACT_APP_AUTH_TOKEN;

const client = createApolloClient(authToken);

function App() {
  return (
    <ApolloProvider client={client}>
      <RepositoriesContainer />
    </ApolloProvider>
  );
}

export default App;
