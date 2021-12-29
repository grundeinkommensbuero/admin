import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useActiveUserCount = () => {
  const [stats, setStats] = useState(() => {
    getRequest('/analytics/active-users').then(({ data }) => setStats(data));
  });

  return stats;
};
