import { useState, useContext } from 'react';
import config from '../../../config';
import AuthContext from '../../../context/authentication';

export const useUpdateSignatureList = () => {
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [
    state,
    (listId, count, mixed) =>
      updateSignatureList(listId, count, mixed, token, setState),
  ];
};

const updateSignatureList = async (listId, count, mixed, token, setState) => {
  setState('saving');
  try {
    //make api call to set signature count
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ count, mixed }),
    };

    const response = await fetch(
      `${config.api.invokeUrl}/admin/signatures/${listId}`,
      request
    );

    if (response.status === 204) {
      setState('saved');
    } else {
      console.log('response status', response.status);
      setState('error');
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
