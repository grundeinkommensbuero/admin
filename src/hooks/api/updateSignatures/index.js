import { useState } from 'react';
import config from '../../../config';

const useUpdateSignatureList = () => {
  const [state, setState] = useState(null);
  return [state, data => updateSignatureList(data, setState)];
};
export default useUpdateSignatureList;
const updateSignatureList = async (data, setState) => {
  setState('saving');
  try {
    //make api call to set signature count
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      config.api.invokeUrl + '/admin/signatures',
      request
    );
    if (response.status === 204) {
      setState('saved');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
