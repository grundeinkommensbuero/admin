console.log('env', process.env.NODE_ENV);
export default {
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://ftwey058f0.execute-api.eu-central-1.amazonaws.com/dev'
        : ' https://9jvbvaehkd.execute-api.eu-central-1.amazonaws.com/prod',
  },
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_C37zRqIwu'
        : 'eu-central-1_bKQCTFOsz',
    USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
};
