const config = require('./config');
const pkg = require('../package');
const voice = require('./voice');

module.exports.authorize = (event, context, callback) => {
  const digits = event.body.Digits;
  let attempt = event.query.attempt || 1;

  switch (digits) {
    case '0':
      callback(null, voice.transferOperator().toString());
      return;
    case config.passcode:
      callback(null, voice.accessGranted().toString());
      return;
    default:
      if (attempt >= config.maxAttempts) {
        callback(null, voice.goodbye().toString());
        return;
      }

      attempt += 1;

      callback(null, voice.incorrectPasscode(attempt).toString());
  }
};

module.exports.hello = (event, context, callback) => {
  callback(null, voice.enterPasscode().toString());
};

module.exports.version = (event, context, callback) => {
  callback(null, {
    version: pkg.version,
  });
};
