const { assert } = require('chai');
const messages = require('../../src/messages');

describe('messages', () => {
  it('access granted should exist', () => {
    assert.exists(messages.accessGranted);
  });

  it('enter passcode should exist', () => {
    assert.exists(messages.enterPasscode);
  });

  it('goodbye should exist', () => {
    assert.exists(messages.goodbye);
  });

  it('passcode incorrect should exist', () => {
    assert.exists(messages.passcodeIncorrect);
  });

  it('transfer operator should exist', () => {
    assert.exists(messages.transferOperator);
  });
});
