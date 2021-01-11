import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useCreateUser = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [
    state,
    (email, campaignCode, extraInfo) =>
      createUser(email, campaignCode, extraInfo, token, setState),
  ];
};

//makes an api call to create a user (in cognito and dynamo)
const createUser = async (email, campaignCode, extraInfo, token, setState) => {
  setState('saving');
  try {
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ email, campaignCode, extraInfo }),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else if (response.status === 200) {
      setState('userExists');
    } else {
      const { error } = await response.json();
      console.log('error', response.status, error);
      console.log('code', error.code);
      if (error.code === 'InvalidParameterException') {
        //btw: api returns 400 if email is invalid
        setState('invalidEmail');
      } else {
        setState('error');
      }
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
