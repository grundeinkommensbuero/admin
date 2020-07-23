import React, { useState } from 'react';
import { Form, Loader, Table } from 'semantic-ui-react';
import { useSearchUser } from '../../hooks/api/searchUser';
import './index.css';

const UserInfo = () => {
  const [email, setEmail] = useState('');
  const [state, users, searchUsers] = useSearchUser();
  const [listLimit, setListLimit] = useState(10);

  return (
    <>
      <Form onSubmit={() => searchUsers(email)}>
        <Form.Group>
          <Form.Input
            label="Suche nach E-Mail"
            placeholder="E-Mail-Adresse"
            value={email}
            width={10}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Input>
          <Form.Button className="inlineButton" type="submit">
            Suchen
          </Form.Button>
        </Form.Group>
      </Form>

      {state === 'loading' && <Loader active inline="centered" />}

      {state === 'noUsersFound' && 'Kein*e User*in gefunden'}

      {users && (
        <div className="userInfoTable">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>E-Mail-Adresse</Table.HeaderCell>
                <Table.HeaderCell>UserId</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Postleitzahl</Table.HeaderCell>
                <Table.HeaderCell>Newsletter</Table.HeaderCell>
                <Table.HeaderCell>Erstellt am</Table.HeaderCell>
                <Table.HeaderCell>Listen</Table.HeaderCell>
                <Table.HeaderCell>Unterschriften angekommen</Table.HeaderCell>
                <Table.HeaderCell>Unterschriften eingetragen</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.cognitoId}>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.cognitoId}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.zipCode}</Table.Cell>
                  <Table.Cell>
                    {user.newsletterConsent.value ? 'Ja' : 'Nein'},{' '}
                    {user.newsletterConsent.timestamp}
                  </Table.Cell>
                  <Table.Cell>{user.createdAt}</Table.Cell>
                  <Table.Cell>
                    {user.signatureLists.map(
                      (list, index) =>
                        index < listLimit && <span>{list.id}, </span>
                    )}

                    {user.signatureLists.length > listLimit}
                    <span
                      className="clickableText"
                      onClick={() => setListLimit(listLimit + 10)}
                    >
                      Mehr sehen
                    </span>
                  </Table.Cell>
                  <Table.Cell>{user.signatureCount.received}</Table.Cell>
                  <Table.Cell>{user.signatureCount.scannedByUser}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default UserInfo;
