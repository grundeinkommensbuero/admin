import React, { useState } from 'react';
import { Form, Loader, Table } from 'semantic-ui-react';
import { useSearchUser } from '../../hooks/api/searchUser';
import './index.css';

const searchOptions = [
  { key: 'listId', text: 'Listen Id', value: 'listId' },
  { key: 'email', text: 'E-Mail-Adresse', value: 'email' },
];

const UserInfo = () => {
  const [email, setEmail] = useState('');
  const [listId, setListId] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [state, users, searchUsers] = useSearchUser();
  const [listLimit, setListLimit] = useState(10);

  const handleSearchKeyChange = (value) => {
    setSearchKey(value);

    setEmail('');
    setListId('');
  };

  return (
    <>
      <Form onSubmit={() => searchUsers({ email, listId })}>
        <Form.Group>
          <Form.Dropdown
            placeholder="Listen Id/E-Mail"
            fluid
            selection
            width={6}
            options={searchOptions}
            onChange={(event, data) => handleSearchKeyChange(data.value)}
            label="Nach Listen Id oder E-Mail-Adresse suchen"
          />

          {searchKey === 'email' && (
            <Form.Input
              label="Suche nach E-Mail"
              placeholder="E-Mail-Adresse"
              value={email}
              width={6}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}

          {searchKey === 'listId' && (
            <Form.Input
              label="Suche nach Listen Id"
              placeholder="Listen Id"
              value={listId}
              width={6}
              onChange={(event) => setListId(event.target.value)}
            />
          )}

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
