/**
 * This file holds several hook functions regarding everything concerning authentication
 */
import Auth from '@aws-amplify/auth';
import { useState, useContext } from 'react';
import AuthContext from '../../context/authentication';

export const useSignIn = () => {
  const [state, setState] = useState({});

  //get global context
  const context = useContext(AuthContext);

  return [state, email => signIn(email, setState, context)];
};

export const useAnswerChallenge = () => {
  const [state, setState] = useState({});

  //get global context
  const context = useContext(AuthContext);

  return [state, answer => answerCustomChallenge(answer, setState, context)];
};

// hook for signing out
// in comparison to other hooks we only return the function, no state
export const useSignOut = () => {
  //get global context
  const context = useContext(AuthContext);

  return () => signOut(context);
};

// Function to send login code to aws
const answerCustomChallenge = async (
  answer,
  setState,
  { user, setUser, setIsAuthenticated }
) => {
  // Send the answer to the User Pool
  try {
    setState('loading');
    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    const tempUser = await Auth.sendCustomChallengeAnswer(user, answer);

    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
      //User is now signed in
      setState('success');

      //use context to set user in global state
      setIsAuthenticated(true);
      setUser(tempUser);
    } catch (error) {
      setState('wrongCode');
      console.log('Apparently the user did not enter the right code', error);
    }
  } catch (error) {
    setState('wrongCode');
    console.log(
      'User entered wrong code three times or user was never set',
      error
    );
  }
};

// Sign in user through AWS Cognito (passwordless)
const signIn = async (email, setState, { setUser }) => {
  try {
    setState('loading');
    // This will initiate the custom flow, which will lead to the user receiving a mail.
    // The code will timeout after 3 minutes (enforced server side by AWS Cognito).
    const user = await Auth.signIn(email);
    console.log('called Auth.signIn()', user);

    //we already set the user here, because we need the object in answerCustomChallenge()
    setUser(user);
    setState('success');
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      setState('userNotFound');
    } else {
      setState('error');
    }
    console.log('Error while signing in', error);
  }
};

//Function, which uses the amplify api to sign out user
const signOut = async ({ setUser, setIsAuthenticated }) => {
  try {
    await Auth.signOut();

    //use context to set user in global state
    setIsAuthenticated(false);
    setUser(null);
  } catch (error) {
    console.log('Error while signing out', error);
  }
};
