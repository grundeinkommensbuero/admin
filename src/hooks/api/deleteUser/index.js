import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useDeleteUser = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [state, (userId) => deleteUser(userId, token, setState)];
};

//makes an api call to create a user (in cognito and dynamo)
const deleteUser = async (userId, token, setState) => {
  setState('loading');
  try {
    const request = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users/${userId}`,
      request
    );

    if (response.status === 204) {
      setState('success');
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
