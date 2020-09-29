import React, { useCallback, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import throttle from 'lodash/throttle';
import { makeStyles, Paper, TextField } from '@material-ui/core';

import { SearchRepositoriesQuery } from '../../graphql/generated';
import { RepositoriesTable } from './components/RepositoriesTable';
import { InfiniteScroll } from '../../components/InfiniteScroll';
import { Loader } from '../../components/Loader';

const SEARCH_REPOSITORIES = gql`
  fragment RepositoryStats on Repository {
    id
    name
    url
    forkCount
    stargazerCount
  }

  query SearchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, first: $first, type: REPOSITORY, after: $after) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ...RepositoryStats
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  loading: {
    padding: theme.spacing(2),
  },
}));

export const RepositoriesContainer = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('language:javascript stars:>=1000');

  const { data, loading, error, fetchMore } = useQuery<SearchRepositoriesQuery>(
    SEARCH_REPOSITORIES,
    {
      variables: {
        query,
        first: 10,
        after: null,
      },
    }
  );

  const pageInfo = data?.search.pageInfo;
  const onFetchMore = useCallback(() => {
    const hasNextPage = pageInfo?.hasNextPage;
    const cursor = pageInfo?.endCursor;

    if (hasNextPage && !loading) {
      fetchMore({
        variables: {
          after: cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult?.search.edges;
          const newPageInfo = fetchMoreResult?.search.pageInfo;

          return newEdges?.length && newPageInfo && previousResult.search
            ? {
                search: {
                  __typename: previousResult.search.__typename,
                  edges: [...previousResult.search.edges, ...newEdges],
                  pageInfo: newPageInfo,
                },
              }
            : previousResult;
        },
      });
    }
  }, [pageInfo, loading, fetchMore]);

  if (error) {
    return <div>Error: {error && error.message}</div>;
  }

  return (
    <div className={classes.root}>
      <Paper elevation={4}>
        <TextField
          fullWidth
          variant="filled"
          value={query}
          onChange={throttle((event) => setQuery(event.target.value), 2000)}
        />
        <InfiniteScroll onFetchMore={onFetchMore}>
          <RepositoriesTable data={data?.search.edges || []} />
        </InfiniteScroll>
        {loading ? <Loader /> : null}
      </Paper>
    </div>
  );
};
