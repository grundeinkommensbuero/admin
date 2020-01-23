import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useSignatureListCount = () => {
  const [stats, setStats] = useState(() => {
    //get stats (object) { campaign1: {withMixed, withoutMixed}, campaign2: {...}}
    getRequest('/analytics/signatures/lists').then(data => setStats(data));
  });

  return stats;
};
