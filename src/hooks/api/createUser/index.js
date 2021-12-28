import { useContext, useState } from 'react';
import AuthContext from '../../../context/authentication';
import CONFIG from '../../../config';

export const useCreateUser = () => {
  const [state, setState] = useState(null);
  const [message, setMessage] = useState(null);

  //get auth token from global context
  const { token } = useContext(AuthContext);

  return [
    state,
    message,
    (emails, campaignCode, extraInfo) =>
      createUser(emails, campaignCode, extraInfo, token, setState, setMessage),
  ];
};

//makes an api call to create a user (in cognito and dynamo)
const createUser = async (
  emails,
  campaignCode,
  extraInfo,
  token,
  setState,
  setMessage
) => {
  setState('loading');
  try {
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ emails, campaignCode, extraInfo }),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/admin/users`,
      request
    );

    if (response.status === 200) {
      setState('success');
      const json = await response.json();
      setMessage(json.message);
    } else {
      const { message, error } = await response.json();
      setMessage(error || message);
      console.log('error', response.status, error);
      if (error.code === 'InvalidParameterException') {
        //btw: api returns 400 if email is invalid
        setState('invalidEmail');
      } else {
        setState('error');
      }
    }
  } catch (error) {
    console.log(error);
    setState('error');
  }
};
