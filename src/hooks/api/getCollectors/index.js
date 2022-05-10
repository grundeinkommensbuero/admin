import { useState, useContext, useEffect } from 'react';
import CONFIG from '../../../config';
import AuthContext from '../../../context/authentication';

export const useCollectors = () => {
  const [collectors, setCollectors] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  // Difficult to use lazy loading state, because token
  // might not be accessible in the beginning
  useEffect(() => {
    // Only proceed if token is not null and if collectors is not set
    // (because we only want to do it once)
    if (token && !collectors) {
      getCollectors(token).then(({ data }) => setCollectors(data));
    }
  }, [token, collectors]); // dependency array to call use effect when token was set

  return collectors;
};

// Gets collectors
const getCollectors = async (token) => {
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
      `${CONFIG.API.INVOKE_URL}/admin/collectors`,
      request
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting collectors', error);
    return [];
  }
};
