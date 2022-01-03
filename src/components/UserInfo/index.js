import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Loader, Modal, Table } from 'semantic-ui-react';
import { useSearchUser } from '../../hooks/api/searchUser';
import './index.css';
import { useCreateSignatureList } from '../../hooks/api/createSignatureList';
import { useUpdateUser } from '../../hooks/api/updateUser';
import { useDeleteUser } from '../../hooks/api/deleteUser';

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
  const [searchKey, setSearchKey] = useState('email');
  const [shouldTriggerSearch, setShouldTriggerSearch] = useState(false);
  const [state, users, searchUsers] = useSearchUser();
  const [listLimit, setListLimit] = useState(10);
  const [updateUserState, updateUser, setUpdateUserState] = useUpdateUser();

  const triggerSearch = useCallback(() => {
    if (shouldTriggerSearch) {
      if (searchKey === 'email') {
        searchUsers({ email });
      } else {
        searchUsers({ listId });
      }
    }
  }, [email, listId, shouldTriggerSearch, searchKey, searchUsers]);

  useEffect(() => {
    triggerSearch();
  }, [shouldTriggerSearch, triggerSearch]);

  useEffect(() => {
    // If user is updated, fetch data again by calling handleSubmit
    if (updateUserState === 'saved') {
      setShouldTriggerSearch(true);

      // We need to reset updateUserState,
      // otherwise a search would be triggered on every input change
      setUpdateUserState(null);
    }
  }, [updateUserState, setUpdateUserState]);

  return (
    <>
      <Form onSubmit={() => setShouldTriggerSearch(true)}>
        <Form.Group>
          <Form.Input
            label="Suche nach E-Mail"
            placeholder="E-Mail-Adresse"
            value={email}
            width={6}
            onChange={(event) => {
              setEmail(event.target.value);
              setSearchKey('email');
              setShouldTriggerSearch(false);
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
              setShouldTriggerSearch(false);
            }}
          />

          <Form.Button className="inlineButton" type="submit">
            Suche {searchKey === 'email' ? 'nach E-Mail' : 'nach Listen Id'}
          </Form.Button>
        </Form.Group>
      </Form>

      {/* If data is refetched (meaning users is not null) we don't want to show the loading indicator */}
      {state === 'loading' && !users && <Loader active inline="centered" />}

      {shouldTriggerSearch &&
        state === 'noUsersFound' &&
        searchKey === 'email' &&
        'Kein*e User*in gefunden'}

      {shouldTriggerSearch &&
        state === 'noUsersFound' &&
        searchKey === 'listId' && (
          <>
            <p>Kein*e User*in gefunden. Die Liste war wohl anonym.</p>
            <CreateListForm />
          </>
        )}

      {/* We don't make the following render dependant on state because of the possibility to refetch data */}
      {users && (
        <>
          <CreateListForm userId={users[0].cognitoId} />

          {updateUserState === 'error' && (
            <p>Fehler beim Austragen aus dem Newsletter!</p>
          )}

          <div className="userInfoTable">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>E-Mail-Adresse</Table.HeaderCell>
                  <Table.HeaderCell>UserId</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Postleitzahl</Table.HeaderCell>
                  <Table.HeaderCell>Allgemeiner Newsletter</Table.HeaderCell>
                  <Table.HeaderCell>Orts-Newsletter</Table.HeaderCell>
                  <Table.HeaderCell>Erstellt am</Table.HeaderCell>
                  <Table.HeaderCell>Listen</Table.HeaderCell>
                  <Table.HeaderCell>Unterschriften angekommen</Table.HeaderCell>
                  <Table.HeaderCell>
                    Unterschriften eingetragen
                  </Table.HeaderCell>
                  <Table.HeaderCell>Aktionen</Table.HeaderCell>
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
                    <Table.Cell>
                      {user.customNewsletters?.map((newsletter) =>
                        newsletter.value
                          ? `${newsletter.name}${
                              newsletter.extraInfo ? ' (+aktiv)' : ''
                            },`
                          : ''
                      ) || 'Keine'}
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
                    <Table.Cell className="tableButtons">
                      {isSubscribedToAnyNewsletter(user) && (
                        <Button
                          loading={updateUserState === 'saving'}
                          onClick={() => {
                            // We need to reset email to this user's email
                            // otherwise, if in the meantime the input was changed,
                            // the new email would be searched.
                            setEmail(user.email);
                            setShouldTriggerSearch(false);
                            updateUser(user.cognitoId, {
                              newsletterConsent: false,
                            });
                          }}
                        >
                          Aus Newsletter entfernen
                        </Button>
                      )}
                      <ConfirmationModal
                        trigger={<Button negative>User*in löschen</Button>}
                        userId={user.cognitoId}
                        on
                        onSuccess={() => setShouldTriggerSearch(true)}
                        // Need to set state to false on open, so effect is triggered onsuccess
                        onOpen={() => setShouldTriggerSearch(false)}
                      />
                    </Table.Cell>
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

const ConfirmationModal = ({ trigger, userId, onSuccess, onOpen }) => {
  const [open, setOpen] = useState(false);
  const [state, deleteUser] = useDeleteUser();

  useEffect(() => {
    if (state === 'success') {
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state, setOpen, onSuccess]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        if (onOpen) {
          onOpen();
        }
      }}
      open={open}
      trigger={trigger}
      size="tiny"
      className="modal"
      dimmer="blurring"
    >
      <Modal.Header>User*in löschen</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Bist du dir sicher? Dies kann nicht rückgängig gemacht werden.</p>
          {state === 'error' && <p>Fehler!</p>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Doch nicht</Button>
        <Button
          negative
          loading={state === 'loading'}
          content="Ja, ich bin mir sicher"
          onClick={() => deleteUser(userId)}
        />
      </Modal.Actions>
    </Modal>
  );
};

const isSubscribedToAnyNewsletter = ({
  newsletterConsent,
  customNewsletters,
  reminderMails,
}) => {
  return (
    newsletterConsent.value ||
    reminderMails.value ||
    (customNewsletters &&
      customNewsletters.find((newsletter) => newsletter.value))
  );
};

export default UserInfo;
