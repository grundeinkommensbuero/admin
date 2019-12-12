import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import './index.css';
import { useUpdateSignatureList } from '../../hooks/updateSignatures';

const ListForm = () => {
  const [formState, setFormState] = useState({
    count: 0,
    listId: '',
  });

  const [state, updateSignatureList] = useUpdateSignatureList();

  console.log('state', state);

  return (
    <Form onSubmit={updateSignatureList(formState)}>
      <Form.Group>
        <Form.Input
          label="Listen ID"
          placeholder="Listen ID"
          width="12"
          value={formState.listId}
          onChange={event => setFormState({ listId: event.target.value })}
        />
        <Form.Input
          label="Anzahl"
          placeholder="Anzahl"
          type="number"
          width="4"
          value={formState.count}
          onChange={event => setFormState({ count: event.target.value })}
        />
      </Form.Group>
      <Form.Button type="submit">Speichern</Form.Button>
    </Form>
  );
};

export default ListForm;
