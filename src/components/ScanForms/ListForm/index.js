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
      new Audio(
        'data:audio/wav;base64,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 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
      ).play();
      setIsTyping(false);
      setLastListId(listId);
      setListId('');
      setMixed(false);
      //focus on input element again
      document.querySelector('#list-id-input').focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleListIdChange = (event) => {
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
          Die Liste wurde anonym heruntergeladen und kann deshalb keiner
          E-Mail-Adresse zugeordnet werden. Wenn die Anzahl der Unterschriften,
          die dieser Listen-Id zugehörig sind, mehr als 10 beträgt, schicke
          bitte eine Mail an Valentin, indem du{' '}
          <a
            href={`mailto:valentin@expedition-grundeinkommen.de?subject=Anonyme%20Liste%20wurde%20gescannt&body=Es%20wurde%20eine%20anonyme%20Liste%20gescannt%3A%0D%0AListen%20ID%3A%20${lastListId}%0D%0AAnzahl%20Unterschriften%3A%20${count}%0D%0A%0D%0ABitte%20ausf%C3%BCllen!%0D%0AEmail%3A%20...%0D%0AName%20(falls%20Email%20nicht%20vorhanden)%3A%20...%0D%0A`}
            target="_blank"
            rel="noopener noreferrer"
          >
            hier klickst
          </a>
          . Bitte trage in der Mail den Namen und wenn vorhanden die
          E-Mail-Adresse des Absenders oder der Absenderin der Listen ein. Falls
          der Absender oder die Absenderin der Listen nicht mehr bekannt ist,
          kann diese Nachricht ignoriert werden.
        </p>
      )}

      {state.mailMissing && !isTyping && (
        <p>
          Die Liste ist von einer Person, die für die Briefaktion aufgrund des
          Fehlers keine E-Mail-Adresse angegeben hat. Schicke bitte eine Mail an
          Valentin, indem du{' '}
          <a
            href={`mailto:valentin@expedition-grundeinkommen.de?subject=Liste%20von%20Briefaktion%20gescannt&body=Liste%20von%20Briefaktion%20ohne%20E-Mail-Adresse%0D%0AListen%20ID%3A%20${lastListId}%0D%0AE-Mail-Adresse%3A%20...`}
            target="_blank"
            rel="noopener noreferrer"
          >
            hier klickst
          </a>
          . Bitte trage in der Mail die E-Mail-Adresse des Absenders oder der
          Absenderin der Liste ein. Die Listen ID wird automatisch übergeben.
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
            onChange={(event) => handleListIdChange(event)}
          />
          <Form.Input
            label="Anzahl"
            placeholder="Anzahl"
            type="number"
            width={4}
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Button width={4} className="inlineButton" type="submit">
            Speichern
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default ListForm;
