import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useSignatureCount = () => {
  const [stats, setStats] = useState(() => {
    //get stats (object) { campaign1: {withMixed, withoutMixed}, campaign2: {...}}
    getRequest('/analytics/signatures').then(data => setStats(data));
  });

  return stats;
};
