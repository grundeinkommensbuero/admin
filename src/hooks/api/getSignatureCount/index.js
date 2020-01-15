import { useState } from 'react';
import CONFIG from '../../../config';

export const useSignatureCount = () => {
  const [stats, setStats] = useState(() => {
    getSignatureCount().then(data => setStats(data));
  });

  return stats;
};

//gets stats (count of signatures) for each campaign
const getSignatureCount = async () => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/signatures`,
      request
    );

    if (response.status === 200) {
      //get stats (object) by parsing json { campaign1: {withMixed, withoutMixed}, campaign2: {...}}
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting signature count', error);
  }
};
