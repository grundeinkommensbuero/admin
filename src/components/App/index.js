import React, { useEffect, useState } from 'react';
import './index.css';
import Nav from '../Nav';
import ListForm from '../ListForm';
import Auth from '@aws-amplify/auth';
import config from '../../config';
import SignIn from '../SignIn';

//configure cognito
Auth.configure(config.cognito);

const App = () => {
  const [user, setUser] = useState(null);

  //check if user is authenticated upon mount
  useEffect(() => {
    //declare function inside, because useEffect cannot be async
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log('user', user);
        setUser(user);
      } catch (error) {
        //error is thrown if user is not authenticated
        setUser(null);
      }
    };
    updateUser();
  }, []); //empty array to only run effect once

  return (
    <div className="app">
      {user && (
        <>
          <Nav />
          <div className="content">
            <ListForm />
          </div>
        </>
      )}
      {!user && (
        <div className="signIn">
          <SignIn finishSignIn={user => setUser(user)} />
        </div>
      )}
    </div>
  );
};

export default App;
