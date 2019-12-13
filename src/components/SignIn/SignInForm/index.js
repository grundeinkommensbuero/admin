import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const SignInForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');

  return (
    <Form onSubmit={() => handleSubmit(email)}>
      <Form.Input
        label="E-Mail"
        placeholder="E-Mail"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Form.Button type="submit">Login</Form.Button>
    </Form>
  );
};

export default SignInForm;
