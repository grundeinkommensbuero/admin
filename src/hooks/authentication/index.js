/**
 * This file holds several hook functions regarding everything concerning authentication
 */
import Auth from '@aws-amplify/auth';
import { useState } from 'react';

export const useSignIn = () => {
  const [state, setState] = useState({});
  return [state, email => signIn(email, setState)];
};

export const useAnswerChallenge = () => {
  const [state, setState] = useState({});
  return [
    state,
    (user, answer) => answerCustomChallenge(user, answer, setState),
  ];
};

// Function to send login code to aws
const answerCustomChallenge = async (user, answer, setState) => {
  // Send the answer to the User Pool
  try {
    setState({ state: 'loading' });
    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    user = await Auth.sendCustomChallengeAnswer(user, answer);

    console.log('user after sending challenge', user);
    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
      //User is now signed in
      setState({ state: 'success', user: user });
    } catch (error) {
      setState({ state: 'wrongCode' });
      console.log('Apparently the user did not enter the right code', error);
    }
  } catch (error) {
    setState({ state: 'wrongCode' });
    console.log(
      'User entered wrong code three times or user was never set',
      error
    );
  }
};

// Sign in user through AWS Cognito (passwordless)
const signIn = async (email, setState) => {
  try {
    setState({ state: 'loading' });
    // This will initiate the custom flow, which will lead to the user receiving a mail.
    // The code will timeout after 3 minutes (enforced server side by AWS Cognito).
    const user = await Auth.signIn(email);
    console.log('called Auth.signIn()', user);
    //we already set the user here, because we need the object in answerCustomChallenge()
    setState({ state: 'success', user: user });
  } catch (error) {
    setState({ state: 'error' });
    console.log('Error while signing in', error);
  }
};

//Function, which uses the amplify api to sign out user
export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('Error while signing out', error);
  }
};
