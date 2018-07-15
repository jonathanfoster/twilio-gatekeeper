const { VoiceResponse } = require('twilio').twiml;
const config = require('./config');
const messages = require('./messages');

const authorizeURL = `${config.baseURL}/authorize`;

module.exports.accessGranted = () => {
  const response = new VoiceResponse();

  response.say(messages.accessGranted);
  response.play({ digits: `${config.accessTone}` });
  response.hangup();

  return response;
};

module.exports.enterPasscode = () => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: authorizeURL,
    method: 'POST',
  });

  gather.say(messages.enterPasscode);
  response.say(messages.goodbye);

  return response;
};

module.exports.goodbye = () => {
  const response = new VoiceResponse();

  response.say(messages.goodbye);
  response.hangup();

  return response;
};

module.exports.incorrectPasscode = (attempt) => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: `${authorizeURL}?attempt=${attempt}`,
    method: 'POST',
  });

  gather.say(messages.passcodeIncorrect);
  response.say(messages.goodbye);

  return response;
};

module.exports.transferOperator = () => {
  const response = new VoiceResponse();

  response.say(messages.transferOperator);
  response.dial(config.operator);

  return response;
};
