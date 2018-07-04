const { VoiceResponse } = require('twilio').twiml;
const config = require('./config');

module.exports.authorize = (event, context, callback) => {
  const digits = event.body.Digits;
  const response = new VoiceResponse();

  switch (digits) {
    case 0:
      // Forward call to operator
      response.say('Transferring to an operator.');
      response.dial(config.operator);
      response.say('Goodbye.');
      break;
    case config.passcode:
      // Grant access
      response.say('Access granted.');
      response.play({ digits: `${config.accessTone}` });
      response.say('Goodbye.');
      break;
    // eslint-disable-next-line no-case-declarations
    default:
      // Retry passcode
      const gather = response.gather({
        action: `${config.baseURL}/authorize`,
        method: 'POST',
      });

      gather.say('The passcode you entered is incorrect. Please try again.');
      response.say('Goodbye.');
  }

  callback(null, response.toString());
};

module.exports.hello = (event, context, callback) => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: `${config.baseURL}/authorize`,
    method: 'POST',
  });

  gather.say('Please enter your passcode followed by the pound sign. Press 0 to speak with an operator.');
  response.say('Goodbye.');

  callback(null, response.toString());
};
