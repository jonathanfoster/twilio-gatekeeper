module.exports = {
  accessTone: process.env.GATEKEEPER_ACCESS_TONE || '9',
  baseURL: process.env.GATEKEEPER_URL || 'https://gatekeeper.jonathanfoster.io',
  passcode: process.env.GATEKEEPER_PASSCODE || '1234',
};
