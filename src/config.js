console.log('env', process.env.NODE_ENV);
export default {
  API: {
    INVOKE_URL: process.env.REACT_APP_API_URL,
  },
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
};
