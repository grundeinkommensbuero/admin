console.log('env', process.env.NODE_ENV);
const config = {
  api: {
    invokeUrl: 'https://vmhbaao23c.execute-api.eu-central-1.amazonaws.com/dev',
  },
  cognito: {
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_u8qvswCdL',
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  },
};

export default config;
