import { Table } from 'semantic-ui-react';
import React from 'react';

const SignatureCountTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Inklusive gemischte Ämter</Table.HeaderCell>
          <Table.HeaderCell>Exklusive gemischte Ämter</Table.HeaderCell>
          <Table.HeaderCell>Von User*in gescannt</Table.HeaderCell>
          <Table.HeaderCell>
            Berechnet aus angekommen und gescannt
          </Table.HeaderCell>
          <Table.HeaderCell>Gescannt und nicht angekommen</Table.HeaderCell>

          <Table.HeaderCell>Inklusive Contentfuladdition</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(stats).map((campaign, index) => (
          <Table.Row key={index}>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{stats[campaign].withMixed}</Table.Cell>
            <Table.Cell>{stats[campaign].withoutMixed}</Table.Cell>
            <Table.Cell>{stats[campaign].scannedByUser}</Table.Cell>
            <Table.Cell>{stats[campaign].computed}</Table.Cell>
            <Table.Cell>
              {stats[campaign].computed - stats[campaign].withMixed}
            </Table.Cell>
            <Table.Cell>{stats[campaign].withContentful}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureCountTable;
