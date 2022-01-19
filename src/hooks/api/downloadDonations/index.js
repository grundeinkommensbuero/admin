import { useContext, useState } from 'react';
import CONFIG from '../../../config';
import AuthContext from '../../../context/authentication';
import { saveAs } from 'file-saver';

// useDonations returns array of donations and a function to refetch donations.
// Function does not have to be executed, donations are getting fetched on first render.
export const useDownloadDonations = () => {
  const [state, setState] = useState();

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [state, () => downloadDonations(token, setState)];
};

//gets stats (count of signatures) for each campaign
const downloadDonations = async (token, setState) => {
  try {
    setState('loading');

    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: token,
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/donations/export`,
      request
    );

    if (response.status === 200) {
      setState('success');

      const csv = await response.blob();
      saveAs(csv, 'spenden.csv');
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting power users', error);
    return [];
  }
};
