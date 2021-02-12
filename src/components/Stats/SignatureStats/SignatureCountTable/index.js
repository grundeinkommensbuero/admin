import { Table } from 'semantic-ui-react';
import React from 'react';
import config from '../../../../config';

const SignatureCountTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Angekommen</Table.HeaderCell>
          <Table.HeaderCell>Von User*in eingetragen</Table.HeaderCell>
          <Table.HeaderCell>
            Berechnet aus angekommen und eingetragen
          </Table.HeaderCell>
          <Table.HeaderCell>Eingetragen und nicht angekommen</Table.HeaderCell>

          {config.IS_XBGE && (
            <Table.HeaderCell>Inklusive Contentfuladdition</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(stats).map((campaign, index) => (
          <Table.Row key={index}>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{stats[campaign].withMixed}</Table.Cell>
            <Table.Cell>{stats[campaign].scannedByUser}</Table.Cell>
            <Table.Cell>{stats[campaign].computed}</Table.Cell>
            <Table.Cell>
              {stats[campaign].computed - stats[campaign].withMixed}
            </Table.Cell>
            {config.IS_XBGE && (
              <Table.Cell>{stats[campaign].withContentful}</Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureCountTable;
