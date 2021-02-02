const campaigns = require('../campaigns.json');

const campaignConfig = campaigns.map(({ name, round }) => ({
  name: `${name} ${round}`,
  code: `${name}-${round}`,
}));

export default campaignConfig;
