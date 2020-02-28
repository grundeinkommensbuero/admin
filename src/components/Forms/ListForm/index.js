import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useUpdateSignatureList } from '../../../hooks/api/updateSignatures';

const ListForm = () => {
  //states for the form
  const [isTyping, setIsTyping] = useState(false);
  const [listId, setListId] = useState('');
  const [count, setCount] = useState(5);
  const [mixed, setMixed] = useState(false);
  // We need to following to save the last list id
  // after saving, so we can add it to the mailTo link
  const [lastListId, setLastListId] = useState('');

  const [state, updateSignatureList] = useUpdateSignatureList();

  //reset list id and checkbox if user was successfully added
  useEffect(() => {
    if (state.state === 'saved') {
      console.log('resetting list');
      setIsTyping(false);
      setLastListId(listId);
      setListId('');
      setMixed(false);
      //focus on input element again
      document.querySelector('#list-id-input').focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleListIdChange = event => {
    setListId(event.target.value);
    setIsTyping(true);
  };

  return (
    <>
      {state.state === 'saving' && <p>Wird gespeichert...</p>}
      {state.state === 'countTooHigh' && (
        <p>Anzahl darf nicht höher als 500 sein!</p>
      )}

      {state.state === 'notFound' && (
        <p>Es wurde keine Liste mit dieser ID gefunden</p>
      )}
      {state.state === 'error' && <p>Fehler!</p>}
      {state.state === 'saved' && !isTyping && (
        <p>Liste erfolgreich aktualisiert</p>
      )}
      {state.isAnonymous && !isTyping && (
        <p>
          Die Liste ist anonym. Wenn die Anzahl mehr als 20 betrug, schicke
          bitte eine Mail, indem du{' '}
          <a
            href={`mailto:valentin@expedition-grundeinkommen.de?subject=Anonyme%20Liste%20wurde%20gescannt&body=Es%20wurde%20eine%20anonyme%20Liste%20gescannt%3A%0D%0AListen%20ID%3A%20${lastListId}%0D%0AAnzahl%20Unterschriften%3A%20${count}%0D%0A%0D%0ABitte%20ausf%C3%BCllen!%0D%0AEmail%3A%20...%0D%0AName%20(falls%20Email%20nicht%20vorhanden)%3A%20...%0D%0A`}
            target="_blank"
            rel="noopener noreferrer"
          >
            hier klickst
          </a>
          . Bitte trage den Namen und wenn vorhanden die E-Mail-Adresse des
          Absenders der Liste ein.
        </p>
      )}

      <Form onSubmit={() => updateSignatureList(listId, count, mixed)}>
        <Form.Group>
          <Form.Input
            id="list-id-input"
            label="Listen ID"
            placeholder="Listen ID"
            value={listId}
            width={12}
            onChange={event => handleListIdChange(event)}
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
