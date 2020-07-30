import React, { useState } from 'react';
import { Form, Loader, Table, Button } from 'semantic-ui-react';
import { useSearchUser } from '../../hooks/api/searchUser';
import './index.css';
import { useCreateSignatureList } from '../../hooks/api/createSignatureList';

const searchOptions = [
  { key: 'listId', text: 'Listen Id', value: 'listId' },
  { key: 'email', text: 'E-Mail-Adresse', value: 'email' },
];

const campaignOptions = [
  {
    key: 'schleswig-holstein-1',
    text: 'Schleswig Holstein 1',
    value: 'schleswig-holstein-1',
  },
  {
    key: 'brandenburg-1',
    text: 'Brandenburg 1',
    value: 'brandenburg-1',
  },
  {
    key: 'hamburg-1',
    text: 'Hamburg 1',
    value: 'hamburg-1',
  },
  {
    key: 'berlin-1',
    text: 'Berlin 1',
    value: 'berlin-1',
  },
  {
    key: 'bremen-1',
    text: 'Bremen 1',
    value: 'bremen-1',
  },
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

      {state === 'noUsersFound' && email !== '' && 'Kein*e User*in gefunden'}

      {state === 'noUsersFound' && listId !== '' && (
        <>
          <p>Kein*e User*in gefunden. Die Liste war wohl anonym.</p>
          <CreateListForm />
        </>
      )}

      {users && (
        <>
          <CreateListForm userId={users[0].cognitoId} />

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
                  <Table.HeaderCell>
                    Unterschriften eingetragen
                  </Table.HeaderCell>
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
        </>
      )}
    </>
  );
};

const CreateListForm = ({ userId }) => {
  const [campaign, setCampaign] = useState('');
  const [state, pdf, createSignatureList] = useCreateSignatureList();
  const [formError, setFormError] = useState(false);

  const handleClick = () => {
    if (campaign !== '') {
      setFormError(false);
      createSignatureList({ userId, campaignCode: campaign });
    } else {
      setFormError(true);
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Dropdown
          placeholder="Kampagne"
          fluid
          selection
          width={6}
          options={campaignOptions}
          onChange={(event, data) => setCampaign(data.value)}
          error={
            formError && {
              content: 'Bitte eine Kampagne auswählen',
              pointing: 'above',
            }
          }
          label="Kampagne"
        />
        <Form.Button className="inlineButton" onClick={() => handleClick()}>
          {!userId && 'Anonyme'} Liste generieren
        </Form.Button>

        {(state === 'loading' || state === 'success') && (
          <Form.Button
            color="orange"
            className="inlineButton"
            onClick={() => window.open(pdf.url)}
            loading={state === 'loading'}
          >
            PDF öffnen
          </Form.Button>
        )}
      </Form.Group>
    </Form>
  );
};

export default UserInfo;
