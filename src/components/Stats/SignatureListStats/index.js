import React from 'react';
import { Header, Loader, Table } from 'semantic-ui-react';
import { useSignatureListCount } from '../../../hooks/api/getSignatureListCount';

const SignatureListStats = () => {
  const stats = useSignatureListCount();

  return (
    <>
      <Header color="orange">Gesamtanzahl Unterschriftenlisten</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <SignatureListStatsTable stats={stats} />}
    </>
  );
};

const SignatureListStatsTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Anzahl Listen Gesamt</Table.HeaderCell>
          <Table.HeaderCell>Anzahl Downloads Gesamt</Table.HeaderCell>
          <Table.HeaderCell>Anzahl Listen von User*innen</Table.HeaderCell>
          <Table.HeaderCell>Anzahl Downloads von User*innen</Table.HeaderCell>
          <Table.HeaderCell>Anzahl anonyme Listen</Table.HeaderCell>
          <Table.HeaderCell>Downloads anonyme Listen</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.keys(stats).map((campaign, index) => (
          <Table.Row key={index}>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{stats[campaign].total.lists}</Table.Cell>
            <Table.Cell>{stats[campaign].total.downloads}</Table.Cell>
            <Table.Cell>{stats[campaign].byUser.lists}</Table.Cell>
            <Table.Cell>{stats[campaign].byUser.downloads}</Table.Cell>
            <Table.Cell>{stats[campaign].anonymous.lists}</Table.Cell>
            <Table.Cell>{stats[campaign].anonymous.downloads}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureListStats;
