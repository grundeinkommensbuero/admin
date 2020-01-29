import React, { useState } from 'react';
import { useSignatureCount } from '../../../hooks/api/getSignatureCount';
import { usePowerUsers } from '../../../hooks/api/getPowerUsers';
import { Table, Dropdown, Header, Loader } from 'semantic-ui-react';
import campaignOptions from '../campaignOptions';

const SignatureStats = () => {
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const stats = useSignatureCount();
  const powerUsers = usePowerUsers();

  return (
    <>
      <Header color="orange">Gesamtanzahl Unterschriften</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <CountTable stats={stats} />}

      <Header color="orange">Powersammler*innen</Header>
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

      {!powerUsers && <Loader active inline="centered" />}
      {powerUsers && (
        <PowerUsersTable powerUsers={powerUsers} campaign={campaign} />
      )}
    </>
  );
};

const PowerUsersTable = ({ powerUsers, campaign }) => {
  // filter powerUsers for this specific campaign
  const users = powerUsers.filter(user => campaign in user.signatureCount);

  if (users.length > 0) {
    // Sort users array by received signatures
    users.sort(
      (user1, user2) =>
        user2.signatureCount[campaign].received -
        user1.signatureCount[campaign].received
    );

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>Unterschriften angekommen</Table.HeaderCell>
            <Table.HeaderCell>
              Unterschriften von User*in gescannt
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.cognitoId}>
              <Table.Cell>
                {user.stillExists ? user.email : 'Wurde gelöscht'}
              </Table.Cell>
              <Table.Cell>{user.signatureCount[campaign].received}</Table.Cell>
              <Table.Cell>
                {user.signatureCount[campaign].scannedByUser}
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
      <p>Noch keine Powersammler*innen für diese Kampagne</p>
    </>
  );
};

const CountTable = ({ stats }) => {
  return (
    <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kampagne</Table.HeaderCell>
          <Table.HeaderCell>Inklusive gemischte Ämter</Table.HeaderCell>
          <Table.HeaderCell>Exklusive gemischte Ämter</Table.HeaderCell>
          <Table.HeaderCell>
            Unterschriften von User*in gescannt
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(stats).map(campaign => (
          <Table.Row>
            <Table.Cell>{campaign}</Table.Cell>
            <Table.Cell>{stats[campaign].withMixed}</Table.Cell>
            <Table.Cell>{stats[campaign].withoutMixed}</Table.Cell>
            <Table.Cell>{stats[campaign].scannedByUser}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureStats;
