import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useEnableCirclesShop = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [state, (userId) => enableShop(userId, token, setState)];
};

const enableShop = async (userId, token, setState) => {
  setState('loading');
  try {
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users/${userId}/enable-shop`,
      request
    );

    if (response.status === 204) {
      setState('success');
    } else if (response.status === 400) {
      setState('noCircles');
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
