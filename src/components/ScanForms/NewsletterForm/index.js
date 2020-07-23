import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useCreateUser } from '../../../hooks/api/createUser';

const campaignOptions = [
  {
    key: 'schleswig-holstein-1',
    text: 'Schleswig Holstein 1',
    value: 'schleswig-holstein-1',
  },
  {
    key: 'berlin-0',
    text: 'Berlin Veranstaltung',
    value: 'berlin-0',
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

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const [state, createUser] = useCreateUser();

  //reset email if user was successfully added
  useEffect(() => {
    if (state === 'saved' || state === 'userExists') {
      setEmail('');
      //focus on input element again
      document.querySelector('#email-input').focus();
    }
  }, [state]);

  return (
    <>
      {state === 'saving' && <p>Wird gespeichert...</p>}
      {state === 'saved' && <p>User*in erfolgreich eingetragen</p>}
      {state === 'invalidEmail' && <p>Ungültige E-Mail-Adresse</p>}
      {state === 'userExists' && <p>User*in existiert bereits</p>}
      {state === 'error' && <p>Fehler!</p>}

      <Form onSubmit={() => createUser(email, campaign)}>
        <Form.Dropdown
          placeholder="Kampagne auswählen"
          fluid
          selection
          options={campaignOptions}
          onChange={(event, data) => setCampaign(data.value)}
          label="Kampagne"
        />

        <Form.Group>
          <Form.Input
            id="email-input"
            label="E-Mail-Adresse"
            placeholder="E-Mail-Adresse"
            width={12}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Button className="inlineButton" type="submit">
            Eintragen
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default NewsletterForm;
