import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useCreateUser } from '../../../hooks/api/createUser';

const NewsletterForm = ({ campaign }) => {
  const [email, setEmail] = useState('');
  const [state, createUser] = useCreateUser();

  return (
    <>
      {state === 'saving' && <p>Wird gespeichert...</p>}
      {state === 'error' && <p>Fehler!</p>}
      {state === 'userExists' && <p>User*in existiert bereits</p>}
      {state === 'saved' && <p>User*in erfolgreich eingetragen</p>}

      <Form onSubmit={() => createUser(email, campaign)}>
        <Form.Group>
          <Form.Input
            label="E-Mail-Adresse"
            placeholder="E-Mail-Adresse"
            width={12}
            value={email}
            onChange={event => setEmail(event.target.value)}
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
