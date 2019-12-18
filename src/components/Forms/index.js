import React from 'react';
import { Header } from 'semantic-ui-react';
import ListForm from './ListForm';
import NewsletterForm from './NewsletterForm';
import './index.css';

const Forms = () => {
  return (
    <>
      <Header color="orange">Unterschriften eintragen</Header>
      <ListForm />
      <br />
      <br />
      <Header color="orange">In den Newsletter eintragen</Header>
      <NewsletterForm />
    </>
  );
};

export default Forms;
