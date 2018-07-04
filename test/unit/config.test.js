const { assert } = require('chai');
const config = require('../../src/config');

describe('config', () => {
  it('should default access tone to `9`', () => {
    assert.equal(config.accessTone, '9');
  });

  it('should default base URL to `https://gatekeeper.jonathanfoster.io`', () => {
    assert.equal(config.baseURL, 'https://gatekeeper.jonathanfoster.io');
  });

  it('should default operator to `786-355-8794`', () => {
    assert.equal(config.operator, '786-355-8794');
  });

  it('should default passcode to `1234`', () => {
    assert.equal(config.passcode, '1234');
  });
});
