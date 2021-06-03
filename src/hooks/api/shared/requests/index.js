import CONFIG from '../../../../config';

// Makes a get Request to a specific endpoint
export const getRequest = async (endpoint) => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}${endpoint}`,
      request
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
      return {};
    }
  } catch (error) {
    console.log('Error while making get request', error);
  }
};
