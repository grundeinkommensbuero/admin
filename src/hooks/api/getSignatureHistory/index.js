import { useState } from 'react';
import CONFIG from '../../../config';

export const useSignatureHistory = () => {
  const [state, setState] = useState();

  const [history, setHistory] = useState(() => {
    setState('loading');
    getSignatureHistory({}).then((data) => {
      setHistory(data.history);
      setState('success');
    });
  });

  return [
    state,
    history,
    (dates) => {
      console.log({ dates });
      setState('loading');
      getSignatureHistory(dates).then((data) => {
        setHistory(data.history);
        setState('success');
      });
    },
  ];
};

export const getSignatureHistory = async ({ startDate, endDate }) => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let params = '';

    if (startDate && endDate) {
      params = `?start=${startDate}&end=${endDate}`;
    } else if (startDate) {
      params = `?start=${startDate}`;
    } else if (endDate) {
      params = `?end=${endDate}`;
    }

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/signatures/history${params}`,
      request
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while making get request', error);
  }
};
