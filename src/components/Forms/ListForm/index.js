import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useUpdateSignatureList } from '../../../hooks/api/updateSignatures';

const ListForm = () => {
  //states for the form
  const [listId, setListId] = useState('');
  const [count, setCount] = useState(5);
  const [mixed, setMixed] = useState(false);

  const [state, updateSignatureList] = useUpdateSignatureList();

  //reset list id and checkbox if user was successfully added
  useEffect(() => {
    if (state === 'saved') {
      console.log('resetting list');
      setListId('');
      setMixed(false);
      //focus on input element again
      document.querySelector('#list-id-input').focus();
    }
  }, [state]);

  return (
    <>
      {state === 'saving' && <p>Wird gespeichert...</p>}
      {state === 'countTooHigh' && <p>Anzahl darf nicht höher als 200 sein!</p>}

      {state === 'notFound' && (
        <p>Es wurde keine Liste mit dieser ID gefunden</p>
      )}
      {state === 'error' && <p>Fehler!</p>}
      {state === 'saved' && <p>Liste erfolgreich aktualisiert</p>}

      <Form onSubmit={() => updateSignatureList(listId, count, mixed)}>
        <Form.Group>
          <Form.Input
            id="list-id-input"
            label="Listen ID"
            placeholder="Listen ID"
            value={listId}
            width={12}
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
        </Form.Group>

        <Form.Group>
          <Form.Checkbox
            width={12}
            className="inlineCheckbox"
            label="Mehrere Ämter"
            checked={mixed}
            onChange={() => {
              setMixed(!mixed);
            }}
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
