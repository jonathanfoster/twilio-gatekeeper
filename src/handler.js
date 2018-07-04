const { VoiceResponse } = require('twilio').twiml;
const config = require('./config');

module.exports.authorize = (event, context, callback) => {
  const digits = event.body.Digits;
  const response = new VoiceResponse();

  if (digits === config.passcode) {
    response.play({ digits: `${config.accessTone}` });
    response.say('Access granted. Goodbye.');
  } else {
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

  gather.say('Please enter your passcode followed by the pound sign.');
  response.say('Goodbye.');

  callback(null, response.toString());
};
