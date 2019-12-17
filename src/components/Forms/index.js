import React, { useState } from 'react';
import { Header, Form } from 'semantic-ui-react';
import ListForm from './ListForm';
import NewsletterForm from './NewsletterForm';
import './index.css';

const campaignOptions = [
  {
    key: 'schleswig-holstein-1',
    text: 'Schleswig Holstein 1',
    value: 'schleswig-holstein-1',
  },
];

const Forms = () => {
  const [campaign, setCampaign] = useState(campaignOptions[0].value);

  return (
    <>
      <Form>
        <Form.Dropdown
          placeholder="Kampagne auswählen"
          fluid
          selection
          options={campaignOptions}
          onChange={(event, data) => setCampaign(data.value)}
          label="Kampagne"
        />
      </Form>
      <Header color="orange">Unterschriften eintragen</Header>
      <ListForm />

      <Header color="orange">In den Newsletter eintragen</Header>
      <NewsletterForm campaign={campaign} />
    </>
  );
};

export default Forms;
