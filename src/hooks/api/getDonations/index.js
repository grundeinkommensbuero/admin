import { useCallback, useContext, useEffect, useState } from 'react';
import CONFIG from '../../../config';
import AuthContext from '../../../context/authentication';

// useDonations returns array of donations and a function to refetch donations.
// Function does not have to be executed, donations are getting fetched on first render.
export const useDonations = () => {
  const [donations, setDonations] = useState();

  //get auth token from global context
  const { token } = useContext(AuthContext);

  const fetchDonations = useCallback(() => {
    getDonations(token).then((data) => setDonations(data.donations));
  }, [token]);

  // Difficult to use lazy loading state, because token
  // might not be accessible in the beginning
  useEffect(() => {
    // Only proceed if token is not null and if users is not set
    // (because we only want to do it once)
    if (token && !donations) {
      fetchDonations();
    }
  }, [token, donations, fetchDonations]); // dependency array to call use effect when token was set

  return [donations, fetchDonations];
};

//gets stats (count of signatures) for each campaign
const getDonations = async (token) => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/donations`,
      request
    );

    if (response.status === 200) {
      //get stats (object) by parsing json { donations: [] }
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting power users', error);
    return [];
  }
};
