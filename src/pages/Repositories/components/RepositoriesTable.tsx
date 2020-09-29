import React from 'react';
import {
  Link,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { RepositoryStatsFragment } from '../../../graphql/generated';

export interface Props {
  data: { node: RepositoryStatsFragment }[];
}

export const RepositoriesTable = ({ data }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Name</TableCell>
            <TableCell component="th">
              <span role="img" aria-label="star">
                🌟
              </span>
              Stars
            </TableCell>
            <TableCell component="th">
              <span role="img" aria-label="fork">
                🍴
              </span>
              Forks
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ node }) => (
            <TableRow key={node.id} hover tabIndex={-1}>
              <TableCell>
                <Link href={node.url}>{node.name}</Link>
              </TableCell>
              <TableCell>{node.stargazerCount}</TableCell>
              <TableCell>{node.forkCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
