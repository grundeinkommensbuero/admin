import React from 'react';
import { Header, Table, Loader } from 'semantic-ui-react';
import { useUserCount } from '../../../hooks/api/getUserCount';

const UserStats = () => {
  const stats = useUserCount();

  return (
    <>
      <Header color="orange">User*innen</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <UserStatsTable stats={stats} />}
    </>
  );
};

const UserStatsTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Verifiziert</Table.HeaderCell>
          <Table.HeaderCell>Gepledgte Unterschriften</Table.HeaderCell>
          <Table.HeaderCell>Verifiziert mit NC</Table.HeaderCell>
          <Table.HeaderCell>Gepledgte Unterschriften (mit NC)</Table.HeaderCell>
          <Table.HeaderCell>Nicht verifiziert</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.keys(stats).map(campaign => (
          <Table.Row>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{stats[campaign].verifiedUsers.count}</Table.Cell>
            <Table.Cell>{stats[campaign].verifiedUsers.signatures}</Table.Cell>
            <Table.Cell>
              {stats[campaign].usersWithNewsletterConsent.count}
            </Table.Cell>
            <Table.Cell>
              {stats[campaign].usersWithNewsletterConsent.signatures}
            </Table.Cell>
            <Table.Cell>{stats[campaign].unverifiedUsers.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserStats;
