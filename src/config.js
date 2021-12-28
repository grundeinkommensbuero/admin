console.log('env', process.env.NODE_ENV);
console.log('use dev backend', process.env.REACT_APP_USE_DEV_BACKEND);
const useDevBackend =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_USE_DEV_BACKEND === 'override';

const config = {
  API: {
    INVOKE_URL: useDevBackend
      ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
      : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod',
  },
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: useDevBackend
      ? 'eu-central-1_R7ucfhvJM'
      : 'eu-central-1_q89dI31Fh',
    USER_POOL_CLIENT_ID: useDevBackend
      ? process.env.REACT_APP_DEV_COGNITO_CLIENT_ID
      : process.env.REACT_APP_PROD_COGNITO_CLIENT_ID,
  },
};

export default config;
