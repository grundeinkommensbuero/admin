import React from 'react';
import { useSignIn, useAnswerChallenge } from '../../hooks/authentication';
import SignInForm from './SignInForm';
import ChallengeForm from './ChallengeForm';

const SignIn = () => {
  //use hook to sign in user
  const [signInState, signIn] = useSignIn();

  //use hook to later answer custom challenge
  const [challengeState, answerChallenge] = useAnswerChallenge();

  //for the first step just render the email form
  if (signInState !== 'success') {
    return (
      <>
        {signInState === 'loading' && <p>Einen Moment...</p>}
        {signInState === 'error' && <p>Fehler!</p>}
        {signInState === 'userNotFound' && (
          <p>Es wurde kein*e Nutzer*in gefunden</p>
        )}
        <h2>Willkommen im Admin-Panel!</h2>
        <p>Login mit Expeditions-Email-Adresse:</p>
        <SignInForm handleSubmit={email => signIn(email)} />
      </>
    );
  }

  //if the first step is successful we render the challenge form
  if (signInState === 'success') {
    return (
      <>
        {challengeState === 'loading' && <p>Einen Moment...</p>}
        {challengeState === 'wrongCode' && <p>Falscher Code!</p>}

        <ChallengeForm handleSubmit={code => answerChallenge(code)} />
      </>
    );
  }
};

export default SignIn;
