const json = require('./campaigns.json');

const campaigns = json.campaigns.map(({ name, round }) => ({
  name: `${name} ${round}`,
  code: `${name}-${round}`,
}));

export default campaigns;
