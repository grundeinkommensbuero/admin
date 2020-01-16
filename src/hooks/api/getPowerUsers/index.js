import { useState, useContext, useEffect } from 'react';
import CONFIG from '../../../config';
import AuthContext from '../../../context/authentication';

export const usePowerUsers = () => {
  const [users, setUsers] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  // Difficult to use lazy loading state, because token
  // might not be accessible in the beginning
  useEffect(() => {
    // Only proceed if token is not null and if users is not set
    // (because we only want to do it once)
    if (token && !users) {
      getPowerUsers(token).then(data => setUsers(data.users));
    }
  }, [token, users]); // dependency array to call use effect when token was set

  return users;
};

//gets stats (count of signatures) for each campaign
const getPowerUsers = async token => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users?minimum=10`,
      request
    );

    if (response.status === 200) {
      //get stats (object) by parsing json { users: [] }
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting power users', error);
    return [];
  }
};
