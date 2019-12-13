import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const ChallengeForm = ({ handleSubmit }) => {
  const [code, setCode] = useState('');

  return (
    <Form onSubmit={() => handleSubmit(code)}>
      <Form.Input
        label="Code"
        placeholder="Code"
        value={code}
        onChange={event => setCode(event.target.value)}
      />
      <Form.Button type="submit">Code senden</Form.Button>
    </Form>
  );
};

export default ChallengeForm;
