/**
 *  This file holds a hook which serves as api call to create a signature list
 *  in the backend
 */

import { useState } from 'react';
import CONFIG from '../../../config';

export const useCreateSignatureList = () => {
  const [state, setState] = useState();
  const [pdf, setPdf] = useState({});

  return [state, pdf, (data) => createSignatureList(data, setState, setPdf)];
};

// Function to create (or get) a signature list
// userId is passed for non anonymous mail
const createSignatureList = async (data, setState, setPdf) => {
  try {
    setState('loading');

    // call function to make api request, returns signature list if successful (throws error otherwise)
    const signatureList = await makeApiCall(data);

    setState('success');
    setPdf(signatureList);
  } catch (error) {
    console.log('Error while creating signature list', error);
    setState('error');
  }
};

// Returns the list {id, url} or null
const makeApiCall = async (data) => {
  // Make api call to create new singature list and get pdf
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, triggeredByAdmin: true }),
  };

  const response = await fetch(`${CONFIG.API.INVOKE_URL}/signatures`, request);
  const json = await response.json();

  // Status might also be 200 in case there already was an existing pdf
  if (response.status === 201 || response.status === 200) {
    return json.signatureList;
  }

  throw Object.assign(
    new Error(`Api did not respond with list, status is ${response.status}`),
    {
      status: response.status,
    }
  );
};
