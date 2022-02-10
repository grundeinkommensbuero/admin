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
  {
    key: 'other-1',
    text: 'Andere',
    value: 'other-1',
  },
];

const NewsletterForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [extraInfo, setExtraInfo] = useState(false);
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const [state, message, createUser] = useCreateUser();

  //reset email if user was successfully added
  useEffect(() => {
    if (state === 'saved' || state === 'userExists') {
      setEmailInput('');
      //focus on input element again
      document.querySelector('#email-input').focus();
    }
  }, [state]);

  return (
    <>
      {state === 'loading' && <p>Wird gespeichert...</p>}
      {state === 'success' && message && (
        <>
          <p>Erfolg!</p>
          <NewlineText>{message}</NewlineText>
        </>
      )}
      {state === 'invalidEmail' && <p>Ungültige E-Mail-Adresse</p>}
      {state === 'error' && <p>Fehler: {message}</p>}

      <Form
        onSubmit={() => {
          const emails = emailInput.split('\n');
          createUser(emails, campaign, extraInfo);
        }}
      >
        <Form.Dropdown
          placeholder="Kampagne auswählen"
          fluid
          selection
          options={campaignOptions}
          onChange={(event, data) => setCampaign(data.value)}
          label="Kampagne"
        />

        <Form.Group>
          <Form.TextArea
            id="email-input"
            label="E-Mail-Adressen"
            placeholder="Gib eine oder mehrere E-Mail-Adressen an. Pro Zeile eine Adresse."
            width={12}
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
          />
          <Form.Checkbox
            className="inlineCheckbox"
            label="Aktiv"
            name="extraInfo"
            onClick={(event) => setExtraInfo(!extraInfo)}
          />
          <Form.Button className="inlineButton" type="submit">
            Eintragen
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
};

// Takes text with line breaks (\n) and transforms it correctly
const NewlineText = ({ children }) =>
  children.split('\n').map((str) => <p>{str}</p>);

export default NewsletterForm;
