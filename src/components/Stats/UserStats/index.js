import React, { useState } from 'react';
import { Header, Table, Loader, Dropdown } from 'semantic-ui-react';
import { useUserCount } from '../../../hooks/api/getUserCount';
import campaignOptions from '../campaignOptions';

const UserStats = () => {
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const stats = useUserCount();

  return (
    <>
      <Header color="orange">User*innen</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <UserStatsTable stats={stats} />}

      <Header color="orange">Wieviele Menschen haben wieviel gepledgt?</Header>
      <Dropdown
        placeholder="Kampagne auswählen"
        selection
        fluid
        search
        value={campaign}
        options={campaignOptions}
        onChange={(event, { value }) => setCampaign(value)}
        label="Kampagne"
      />

      {stats && <PledgeMapTable stats={stats} campaign={campaign} />}
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

const PledgeMapTable = ({ stats, campaign }) => {
  if (stats[campaign]) {
    return (
      <Table celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Unterschriften gepledgt</Table.HeaderCell>
            <Table.HeaderCell>Anzahl User*innen</Table.HeaderCell>
            <Table.HeaderCell>Prozentteil User*innen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(stats[campaign].pledgesMap).map(signatureCount => (
            <Table.Row>
              <Table.Cell>{signatureCount}</Table.Cell>
              <Table.Cell>
                {stats[campaign].pledgesMap[signatureCount]}
              </Table.Cell>
              <Table.Cell>
                {/* Use .round to cut off after 1 decimal */}
                {Math.round(
                  (stats[campaign].pledgesMap[signatureCount] /
                    stats[campaign].verifiedUsers.count) *
                    1000
                ) / 10}
                %
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  return (
    <>
      <br />
      <p>Noch keine Daten für diese Kampagne</p>
    </>
  );
};
export default UserStats;
