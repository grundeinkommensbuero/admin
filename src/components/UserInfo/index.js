import React, { useState } from 'react';
import { Form, Loader, Table } from 'semantic-ui-react';
import { useSearchUser } from '../../hooks/api/searchUser';
import './index.css';
import { useCreateSignatureList } from '../../hooks/api/createSignatureList';
import campaignConfig from '../../campaignConfig';

const campaignOptions = campaignConfig.campaigns.map((campaign) => ({
  key: campaign.code,
  text: campaign.name,
  value: campaign.code,
}));

const UserInfo = () => {
  const [email, setEmail] = useState('');
  const [listId, setListId] = useState('');
  const [searchKey, setSearchKey] = useState('email');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [state, users, searchUsers] = useSearchUser();
  const [listLimit, setListLimit] = useState(10);

  const handleSubmit = () => {
    setHasSubmitted(true);

    console.log({ searchKey });
    if (searchKey === 'email') {
      searchUsers({ email });
    } else {
      searchUsers({ listId });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            label="Suche nach E-Mail"
            placeholder="E-Mail-Adresse"
            value={email}
            width={6}
            onChange={(event) => {
              setEmail(event.target.value);
              setSearchKey('email');
              setHasSubmitted(false);
            }}
          />

          <Form.Input
            label="Suche nach Listen Id"
            placeholder="Listen Id"
            value={listId}
            width={6}
            onChange={(event) => {
              setListId(event.target.value);
              setSearchKey('listId');
              setHasSubmitted(false);
            }}
          />

          <Form.Button className="inlineButton" type="submit">
            Suche {searchKey === 'email' ? 'nach E-Mail' : 'nach Listen Id'}
          </Form.Button>
        </Form.Group>
      </Form>

      {state === 'loading' && <Loader active inline="centered" />}

      {hasSubmitted &&
        state === 'noUsersFound' &&
        searchKey === 'email' &&
        'Kein*e User*in gefunden'}

      {hasSubmitted && state === 'noUsersFound' && searchKey === 'listId' && (
        <>
          <p>Kein*e User*in gefunden. Die Liste war wohl anonym.</p>
          <CreateListForm />
        </>
      )}

      {state === 'success' && users && (
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
