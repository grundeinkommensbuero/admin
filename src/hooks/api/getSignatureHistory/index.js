import { useState } from 'react';
import CONFIG from '../../../config';

export const useSignatureHistory = () => {
  const [stats, setStats] = useState(() => {
    getSignatureHistory({}).then((data) => setStats(data.history));
  });

  return [
    stats,
    (dates) =>
      getSignatureHistory(dates).then((data) => setStats(data.history)),
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
