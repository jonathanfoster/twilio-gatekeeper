module.exports = {
  accessTone: process.env.GATEKEEPER_ACCESS_TONE || '9',
  baseURL: process.env.GATEKEEPER_URL || 'https://gatekeeper.jonathanfoster.io',
  maxAttempts: process.env.GATEKEEPER_MAX_ATTEMPTS || 3,
  operator: process.env.GATEKEEPER_OPERATOR || '786-355-8794',
  passcode: process.env.GATEKEEPER_PASSCODE || '1234',
};
