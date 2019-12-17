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
    } else if (response.status === 200) {
      //api returns 200 if user exists
      setState('userExists');
    } else {
      console.log('response status', response.status);
      setState('error');
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
