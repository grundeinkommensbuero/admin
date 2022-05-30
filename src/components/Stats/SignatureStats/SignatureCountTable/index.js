import { Table } from 'semantic-ui-react';
import React from 'react';
import { numberWithDots } from '../../../../utils';

const SignatureCountTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Angekommen</Table.HeaderCell>
          <Table.HeaderCell>Angekommen (ohne anonyme)</Table.HeaderCell>
          <Table.HeaderCell>Von User*in eingetragen</Table.HeaderCell>
          <Table.HeaderCell>
            Berechnet aus angekommen und von User*in eingetragen
          </Table.HeaderCell>
          <Table.HeaderCell>
            Von User*in eingetragen und nicht angekommen
          </Table.HeaderCell>

          <Table.HeaderCell>Inklusive Contentfuladdition</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(stats).map((campaign, index) => (
          <Table.Row key={index}>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{numberWithDots(stats[campaign].withMixed)}</Table.Cell>
            <Table.Cell>
              {numberWithDots(stats[campaign].withoutAnonymous)}
            </Table.Cell>
            <Table.Cell>
              {numberWithDots(stats[campaign].scannedByUser)}
            </Table.Cell>
            <Table.Cell>{numberWithDots(stats[campaign].computed)}</Table.Cell>
            <Table.Cell>
              {numberWithDots(
                stats[campaign].computed - stats[campaign].withMixed
              )}
            </Table.Cell>
            <Table.Cell>
              {numberWithDots(stats[campaign].withContentful)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureCountTable;
