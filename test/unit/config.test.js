const { assert } = require('chai');
const config = require('../../src/config');

describe('config', () => {
  it('should default access tone to `9`', () => {
    assert.equal(config.accessTone, '9');
  });

  it('should default base URL to `https://gatekeeper.jonathanfoster.io`', () => {
    assert.equal(config.baseURL, 'https://gatekeeper.jonathanfoster.io');
  });

  it('should default max attempts to 3', () => {
    assert.equal(config.maxAttempts, 3);
  });

  it('should default operator to `202-297-6584`', () => {
    assert.equal(config.operator, '202-297-6584');
  });

  it('should default passcode to `1234`', () => {
    assert.equal(config.passcode, '1234');
  });
});
