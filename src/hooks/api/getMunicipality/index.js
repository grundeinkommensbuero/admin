import { useState } from 'react';
import { getRequest } from '../shared/requests';

export const useMunicipality = (ags) => {
  const [municipality, setMunicipality] = useState(() => {
    getMunicipality(ags).then((data) => setMunicipality(data));
  });

  return municipality;
};

export const getMunicipality = async (ags) => {
  const { data } = await getRequest(`/municipalities/${ags}`);

  return data;
};
