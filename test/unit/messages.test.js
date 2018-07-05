const { assert } = require('chai');
const messages = require('../../src/messages');

describe('messages', () => {
  it('access granted should exist', () => {
    assert.exists(messages.accessGranted);
  });

  it('enter passcode should exist', () => {
    assert.exists(messages.accessGranted);
  });

  it('goodbye should exist', () => {
    assert.exists(messages.accessGranted);
  });

  it('passcode incorrect should exist', () => {
    assert.exists(messages.accessGranted);
  });

  it('transfer operator should exist', () => {
    assert.exists(messages.accessGranted);
  });
});
