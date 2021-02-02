import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import campaigns from '../../../campaignConfig';
import { useCreateUser } from '../../../hooks/api/createUser';
import config from '../../../config';

const campaignOptions = campaigns.map((campaign) => ({
  key: campaign.code,
  text: campaign.name,
  value: campaign.code,
}));

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [extraInfo, setExtraInfo] = useState(false);
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
      {state === 'userExists' && (
        <p>
          User*in existiert bereits, Newslettereinstellungen wurden geupdated
        </p>
      )}
      {state === 'error' && <p>Fehler!</p>}

      <Form onSubmit={() => createUser(email, campaign, extraInfo)}>
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
          {config.IS_XBGE && (
            <Form.Checkbox
              className="inlineCheckbox"
              label="Aktiv"
              name="extraInfo"
              onClick={(event) => setExtraInfo(!extraInfo)}
            />
          )}
          <Form.Button className="inlineButton" type="submit">
            Eintragen
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default NewsletterForm;
