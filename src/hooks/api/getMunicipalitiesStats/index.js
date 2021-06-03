import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useMunicipalitiesStats = () => {
  const [stats, setStats] = useState(() => {
    //get stats (object) { campaign1: {verifiedUsers, ...}, campaign2: {...}}
    getRequest('/analytics/municipalities').then((data) => setStats(data));
  });

  return stats;
};
