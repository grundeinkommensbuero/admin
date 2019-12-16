import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import './index.css';
import { useUpdateSignatureList } from '../../hooks/api/updateSignatures';

const ListForm = () => {
  //states for the form
  const [listId, setListId] = useState('');
  const [count, setCount] = useState(0);

  const [state, updateSignatureList] = useUpdateSignatureList();

  console.log('state', state);

  return (
    <>
      {state === 'error' && <p>Fehler!</p>}
      {state === 'saved' && <p>Liste erfolgreich aktualisiert</p>}
      <Form onSubmit={() => updateSignatureList(count, listId)}>
        <Form.Group>
          <Form.Input
            label="Listen ID"
            placeholder="Listen ID"
            width="12"
            value={listId}
            onChange={event => setListId(event.target.value)}
          />
          <Form.Input
            label="Anzahl"
            placeholder="Anzahl"
            type="number"
            width="4"
            value={count}
            onChange={event => setCount(event.target.value)}
          />
        </Form.Group>
        <Form.Button type="submit">Speichern</Form.Button>
      </Form>
    </>
  );
};

export default ListForm;
