console.log('env', process.env.NODE_ENV);
export default {
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://vmhbaao23c.execute-api.eu-central-1.amazonaws.com/dev'
        : 'https://vmhbaao23c.execute-api.eu-central-1.amazonaws.com/prod',
  },
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_u8qvswCdL',
    USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
};
