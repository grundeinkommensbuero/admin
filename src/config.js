console.log('env', process.env.NODE_ENV);
const config = {
  API: {
    INVOKE_URL: process.env.REACT_APP_API_URL,
  },
  COGNITO: {
    REGION: process.env.REACT_APP_COGNITO_REGION,
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
  IS_XBGE: true,
};

export default config;
