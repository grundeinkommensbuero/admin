import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useUpdateSignatureList } from '../../../hooks/api/updateSignatures';

const ListForm = () => {
  //states for the form
  const [listId, setListId] = useState('');
  const [count, setCount] = useState(5);

  const [state, updateSignatureList] = useUpdateSignatureList();

  return (
    <>
      {state === 'saving' && <p>Wird gespeichert...</p>}
      {state === 'error' && <p>Fehler!</p>}
      {state === 'saved' && <p>Liste erfolgreich aktualisiert</p>}

      <Form onSubmit={() => updateSignatureList(count, listId)}>
        <Form.Group>
          <Form.Input
            label="Listen ID"
            placeholder="Listen ID"
            value={listId}
            width={8}
            onChange={event => setListId(event.target.value)}
          />
          <Form.Input
            label="Anzahl"
            placeholder="Anzahl"
            type="number"
            width={4}
            value={count}
            onChange={event => setCount(event.target.value)}
          />
          <Form.Button width={4} className="inlineButton" type="submit">
            Speichern
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default ListForm;
