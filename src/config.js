console.log('env', process.env.NODE_ENV);
export default {
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
        : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod',
  },
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_R7ucfhvJM'
        : 'eu-central-1_q89dI31Fh',
    USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
};
