import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useUpdateUser = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [state, (userId, data) => updateUser(userId, data, token, setState)];
};

//makes an api call to create a user (in cognito and dynamo)
const updateUser = async (userId, data, token, setState) => {
  setState('saving');
  try {
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users/${userId}`,
      request
    );

    if (response.status === 204) {
      setState('saved');
    } else {
      const json = await response.json();
      console.log('error', json);
      setState('error');
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
