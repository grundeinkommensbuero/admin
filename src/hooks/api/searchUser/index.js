import { useState, useContext, useCallback } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useSearchUser = () => {
  const [state, setState] = useState(null);
  const [users, setUsers] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  const triggerSearch = useCallback(
    (searchParams) => searchUser(searchParams, token, setState, setUsers),
    [token]
  );

  return [state, users, triggerSearch];
};

// makes an api call to create a user (in cognito and dynamo)
const searchUser = async ({ email, listId }, token, setState, setUsers) => {
  setState('loading');

  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const urlParams = email ? `email=${email}` : `listId=${listId}`;

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users?${urlParams}`,
      request
    );

    if (response.status === 200) {
      const { users } = await response.json();

      setUsers(users);
      setState('success');
    } else if (response.status === 404) {
      setState('noUsersFound');
      // Need to reset users here because of refetching data after deletion
      setUsers(null);
    } else {
      setState('error');
      setUsers(null);
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
