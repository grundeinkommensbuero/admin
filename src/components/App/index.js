import React from 'react';
import './index.css';
import Nav from '../Nav';
import ListForm from '../ListForm';

const App = () => {
  return (
    <div className="app">
      <Nav />
      <div className="content">
        <ListForm />
      </div>
    </div>
  );
};

export default App;
