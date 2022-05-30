import React from 'react';
import { Table } from 'semantic-ui-react';
import { numberWithDots } from '../../../../utils';

const PowerUsersTable = ({ powerUsers, campaign }) => {
  // filter powerUsers for this specific campaign
  const users = powerUsers.filter((user) => campaign in user.signatureCount);

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
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Unterschriften angekommen</Table.HeaderCell>
            <Table.HeaderCell>
              Unterschriften von User*in eingetragen
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                {user.stillExists ? user.email : 'Wurde gelöscht'}
              </Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                {numberWithDots(user.signatureCount[campaign].received)}
              </Table.Cell>
              <Table.Cell>
                {numberWithDots(user.signatureCount[campaign].scannedByUser)}
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

export default PowerUsersTable;
