import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import config from '../../../config';

export const useCreateUser = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [
    state,
    (email, campaignCode) => createUser(email, campaignCode, token, setState),
  ];
};

//makes an api call to create a user (in cognito and dynamo)
const createUser = async (email, campaignCode, token, setState) => {
  setState('saving');
  try {
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ email, campaignCode }),
    };

    const response = await fetch(
      `${config.api.invokeUrl}/admin/users`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else {
      const { error } = await response.json();
      console.log('error', response.status, error);
      console.log('code', error.code);
      if (error.code === 'InvalidParameterException') {
        //btw: api returns 400 if email is invalid
        setState('invalidEmail');
      } else if (error.code === 'UsernameExistsException') {
        //btw: api returns 200 if user exists
        setState('userExists');
      } else {
        setState('error');
      }
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
