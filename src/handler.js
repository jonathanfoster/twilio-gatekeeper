const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports.health = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
  });
};

module.exports.hello = (event, context, callback) => {
  const res = new VoiceResponse();

  res.say({ voice: 'alice' }, 'Please enter the passcode.');

  callback(null, res.toString());
};
