import React from 'react';
import { useSignIn, useAnswerChallenge } from '../../hooks/authentication';
import SignInForm from './SignInForm';
import ChallengeForm from './ChallengeForm';

const SignIn = ({ finishSignIn }) => {
  //use hook to sign in user
  const [signInState, signIn] = useSignIn();

  //use hook to later answer custom challenge
  const [challengeState, answerChallenge] = useAnswerChallenge();

  //if the state is success we call finishSignIn
  if (challengeState.state === 'success') {
    finishSignIn(challengeState.user);
  }

  console.log('sign in state', signInState);

  //for the first step just render the email form
  if (signInState.state !== 'success') {
    return (
      <>
        {signInState.state === 'error' && <p>Fehler!</p>}
        {signInState.state === 'userNotFound' && (
          <p>Es wurde kein*e Nutzer*in gefunden</p>
        )}

        <SignInForm handleSubmit={email => signIn(email)} />
      </>
    );
  }

  //if the first step is successful we render the challenge form
  if (signInState.state === 'success') {
    return (
      <>
        {challengeState.state === 'wrongCode' && <p>Falscher Code!</p>}

        <ChallengeForm
          handleSubmit={code => answerChallenge(signInState.user, code)}
        />
      </>
    );
  }
};

export default SignIn;
