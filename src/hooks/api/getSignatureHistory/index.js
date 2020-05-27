import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useSignatureHistory = () => {
  const [stats, setStats] = useState(() => {
    getRequest('/analytics/signatures/history').then(data =>
      setStats(data.history)
    );
  });

  return stats;
};
